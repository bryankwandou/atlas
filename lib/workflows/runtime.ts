import { z } from "zod";
import type { AIProvider } from "@/lib/ai/types";
import { ProviderError } from "@/lib/ai/types";
import type { WorkflowNode, WorkflowTemplate } from "@/lib/templates/schema";
import { newId, now, type IAtlasStore, type Run, type RunEvent, type Workflow, type Workspace } from "@/lib/db/store";

export class RuntimeError extends Error {
  constructor(
    public code: "invalid_input" | "not_found" | "disabled" | "budget_exceeded" | "invalid_state",
    message: string,
  ) {
    super(message);
  }
}

/** Builds a zod validator from the template's declared inputs. */
export function inputValidator(t: WorkflowTemplate) {
  const shape: Record<string, z.ZodType<string | undefined>> = {};
  for (const f of t.inputs) {
    let s = z.string().trim().max(f.maxLength);
    if (f.type === "email") s = s.email();
    shape[f.key] = f.required ? s.min(1) : s.optional();
  }
  return z.object(shape).strict();
}

function nextNode(t: WorkflowTemplate, fromId: string): string | null {
  const edge = t.edges.find(([from]) => from === fromId);
  return edge ? edge[1] : null;
}

function evaluate(node: Extract<WorkflowNode, { type: "condition" }>, data: Record<string, unknown>): boolean {
  const actual = data[node.field];
  switch (node.operator) {
    case "gte":
      return typeof actual === "number" && typeof node.value === "number" && actual >= node.value;
    case "lte":
      return typeof actual === "number" && typeof node.value === "number" && actual <= node.value;
    case "eq":
      return actual === node.value;
    case "neq":
      return actual !== node.value;
  }
}

function redact(input: Record<string, string>, mode: Workspace["privacyMode"]): Record<string, unknown> {
  if (mode === "MINIMAL") return { fields: Object.keys(input) };
  if (mode === "REDACTED") {
    return Object.fromEntries(
      Object.entries(input).map(([k, v]) => [k, v.replace(/[^\s@]+@[^\s@]+/g, "[email]").replace(/\+?\d[\d\s-]{7,}\d/g, "[phone]")]),
    );
  }
  return input;
}

export function monthlySpend(usage: { workspaceId: string; costUsd: number; at: string }[], workspaceId: string, ref = new Date()) {
  const prefix = ref.toISOString().slice(0, 7);
  return usage.filter((u) => u.workspaceId === workspaceId && u.at.startsWith(prefix)).reduce((s, u) => s + u.costUsd, 0);
}

export class WorkflowRuntime {
  constructor(
    private store: IAtlasStore,
    private provider: AIProvider,
  ) {}

  private async emit(run: Pick<Run, "id" | "workspaceId">, nodeId: string, type: RunEvent["type"], detail: Record<string, unknown> = {}, attempt = 1) {
    await this.store.mutate((db) => {
      const seq = db.events.filter((e) => e.runId === run.id).length + 1;
      db.events.push({ id: newId("evt"), workspaceId: run.workspaceId, runId: run.id, seq, nodeId, type, attempt, detail, at: now() });
    });
  }

  private async patchRun(runId: string, workspaceId: string, patch: Partial<Run>) {
    return this.store.mutate((db) => {
      const run = db.runs.find((r) => r.id === runId && r.workspaceId === workspaceId);
      if (!run) throw new RuntimeError("not_found", "run not found");
      Object.assign(run, patch);
      return { ...run };
    });
  }

  async start(params: { workspaceId: string; workflowId: string; input: unknown; isDemo?: boolean }): Promise<Run> {
    const { workflow, workspace } = await this.store.read((db) => ({
      workflow: db.workflows.find((w) => w.id === params.workflowId && w.workspaceId === params.workspaceId),
      workspace: db.workspaces.find((w) => w.id === params.workspaceId),
    }));
    if (!workflow || !workspace) throw new RuntimeError("not_found", "workflow not found");
    if (!workflow.enabled) throw new RuntimeError("disabled", "workflow is disabled");

    const parsed = inputValidator(workflow.definition).safeParse(params.input);
    if (!parsed.success) {
      throw new RuntimeError("invalid_input", parsed.error.issues.map((i) => `${i.path.join(".")}: ${i.message}`).join("; "));
    }
    const input = Object.fromEntries(Object.entries(parsed.data).filter(([, v]) => v !== undefined)) as Record<string, string>;

    const run: Run = {
      id: newId("run"),
      workspaceId: workflow.workspaceId,
      workflowId: workflow.id,
      workflowVersion: workflow.templateVersion,
      status: "running",
      input,
      cursor: "trigger",
      agentOutput: null,
      costUsd: 0,
      stepCount: 0,
      error: null,
      isDemo: params.isDemo ?? false,
      createdAt: now(),
      finishedAt: null,
    };
    await this.store.mutate((db) => {
      db.runs.push(run);
    });
    await this.emit(run, "trigger", "run_started", { input: redact(input, workspace.privacyMode), version: workflow.templateVersion });
    return this.advance(run.id, workflow.workspaceId);
  }

  /** Executes nodes from the run cursor until completion, failure, or an approval gate. */
  async advance(runId: string, workspaceId: string): Promise<Run> {
    const loaded = await this.store.read((db) => {
      const run = db.runs.find((r) => r.id === runId && r.workspaceId === workspaceId);
      const workflow = run && db.workflows.find((w) => w.id === run.workflowId && w.workspaceId === workspaceId);
      const workspace = db.workspaces.find((w) => w.id === workspaceId);
      return run && workflow && workspace ? { run: { ...run }, workflow, workspace, spent: monthlySpend(db.usage, workspaceId) } : null;
    });
    if (!loaded) throw new RuntimeError("not_found", "run not found");
    let { run } = loaded;
    const { workflow, workspace } = loaded;
    const def = workflow.definition;
    const deadline = Date.now() + def.limits.timeoutMs;
    let spent = loaded.spent;

    while (run.cursor && run.status === "running") {
      if (run.stepCount >= def.limits.maxSteps) return this.fail(run, run.cursor, "max_steps_exceeded");
      if (Date.now() > deadline) return this.fail(run, run.cursor, "timeout");

      const node = def.nodes.find((n) => n.id === run.cursor);
      if (!node) return this.fail(run, run.cursor, "unknown_node");
      run = await this.patchRun(run.id, workspaceId, { stepCount: run.stepCount + 1 });
      await this.emit(run, node.id, "step_started", { type: node.type });

      switch (node.type) {
        case "trigger":
        case "output": {
          await this.emit(run, node.id, "step_succeeded");
          run = await this.patchRun(run.id, workspaceId, { cursor: nextNode(def, node.id) });
          break;
        }
        case "agent": {
          if (run.costUsd >= def.limits.maxCostUsd) return this.fail(run, node.id, "run_budget_exceeded");
          if (spent >= workspace.monthlyBudgetUsd) return this.fail(run, node.id, "workspace_budget_exceeded");
          const result = await this.callAgent(run, node);
          if ("error" in result) return this.fail(run, node.id, result.error);
          spent += result.usage.costUsd;
          await this.store.mutate((db) => {
            db.usage.push({ id: newId("use"), workspaceId, runId: run.id, ...result.usage, at: now() });
          });
          await this.emit(run, node.id, "step_succeeded", {
            score: result.output.score,
            category: result.output.category,
            summary: workspace.privacyMode === "MINIMAL" ? undefined : result.output.summary,
            model: result.usage.model,
            provider: result.usage.provider,
            inputTokens: result.usage.inputTokens,
            outputTokens: result.usage.outputTokens,
            costUsd: result.usage.costUsd,
            latencyMs: result.usage.latencyMs,
          });
          run = await this.patchRun(run.id, workspaceId, {
            agentOutput: result.output,
            costUsd: Number((run.costUsd + result.usage.costUsd).toFixed(6)),
            cursor: nextNode(def, node.id),
          });
          break;
        }
        case "condition": {
          const passed = evaluate(node, (run.agentOutput ?? {}) as Record<string, unknown>);
          const target = passed ? node.onTrue : node.onFalse;
          await this.emit(run, node.id, "step_succeeded", { field: node.field, operator: node.operator, value: node.value, result: passed, next: target });
          run = await this.patchRun(run.id, workspaceId, { cursor: target });
          break;
        }
        case "approval": {
          const expiresAt = new Date(Date.now() + node.expiresInHours * 3600_000).toISOString();
          const approvalId = newId("apr");
          await this.store.mutate((db) => {
            db.approvals.push({
              id: approvalId,
              workspaceId,
              runId: run.id,
              nodeId: node.id,
              status: "pending",
              reason: node.reason.id,
              draft: run.agentOutput?.draft ?? "",
              expiresAt,
              decidedBy: null,
              decidedAt: null,
              createdAt: now(),
            });
          });
          await this.emit(run, node.id, "approval_requested", { approvalId, expiresAt });
          return this.patchRun(run.id, workspaceId, { status: "awaiting_approval", cursor: nextNode(def, node.id) });
        }
        case "action": {
          const idempotencyKey = `${run.id}:${node.id}`;
          const duplicate = await this.store.mutate((db) => {
            if (db.sideEffects.some((s) => s.idempotencyKey === idempotencyKey)) return true;
            db.sideEffects.push({ idempotencyKey, workspaceId, runId: run.id, integration: node.integration, at: now() });
            return false;
          });
          await this.emit(run, node.id, "step_succeeded", {
            integration: node.integration,
            sideEffect: node.sideEffect,
            idempotencyKey,
            deduplicated: duplicate,
            simulated: true,
          });
          run = await this.patchRun(run.id, workspaceId, { cursor: nextNode(def, node.id) });
          break;
        }
      }
    }

    if (run.status === "running") {
      run = await this.patchRun(run.id, workspaceId, { status: "succeeded", finishedAt: now(), cursor: null });
      await this.emit(run, "done", "run_finished", { status: "succeeded", costUsd: run.costUsd });
    }
    return run;
  }

  private async callAgent(run: Run, node: Extract<WorkflowNode, { type: "agent" }>) {
    const maxAttempts = 2;
    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
      try {
        return await this.provider.run({
          agent: node.agent,
          instruction: node.instruction,
          tier: node.tier,
          maxOutputTokens: node.maxOutputTokens,
          input: run.input,
        });
      } catch (err) {
        const pe = err instanceof ProviderError ? err : new ProviderError("unavailable", "unexpected provider error", false);
        await this.emit(run, node.id, "step_failed", { kind: pe.kind, message: pe.message, retryable: pe.retryable }, attempt);
        if (!pe.retryable || attempt === maxAttempts) return { error: `provider_${pe.kind}` };
      }
    }
    return { error: "provider_unavailable" };
  }

  private async fail(run: Run, nodeId: string, reason: string): Promise<Run> {
    const updated = await this.patchRun(run.id, run.workspaceId, { status: "failed", error: reason, finishedAt: now(), cursor: null });
    await this.emit(run, nodeId, "run_finished", { status: "failed", reason });
    return updated;
  }

  async decide(params: { workspaceId: string; approvalId: string; userId: string; decision: "approved" | "rejected" }): Promise<Run> {
    const approval = await this.store.mutate((db) => {
      const a = db.approvals.find((x) => x.id === params.approvalId && x.workspaceId === params.workspaceId);
      if (!a) throw new RuntimeError("not_found", "approval not found");
      if (a.status !== "pending") throw new RuntimeError("invalid_state", "approval already decided");
      const expired = Date.parse(a.expiresAt) < Date.now();
      a.status = expired ? "expired" : params.decision;
      a.decidedBy = params.userId;
      a.decidedAt = now();
      return { ...a };
    });
    const run = await this.store.read((db) => db.runs.find((r) => r.id === approval.runId && r.workspaceId === params.workspaceId));
    if (!run) throw new RuntimeError("not_found", "run not found");
    await this.emit(run, approval.nodeId, "approval_decided", { decision: approval.status, by: params.userId });

    if (approval.status !== "approved") {
      const status = approval.status === "expired" ? "cancelled" : "rejected";
      const updated = await this.patchRun(run.id, run.workspaceId, { status, finishedAt: now(), cursor: null });
      await this.emit(run, approval.nodeId, "run_finished", { status, reason: `approval_${approval.status}` });
      return updated;
    }
    await this.patchRun(run.id, run.workspaceId, { status: "running" });
    return this.advance(run.id, run.workspaceId);
  }
}

export type { Workflow };
