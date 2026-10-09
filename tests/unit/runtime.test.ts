import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { JsonStore, now } from "@/lib/db/store";
import { MockProvider } from "@/lib/ai/providers";
import { ProviderError, type AIProvider } from "@/lib/ai/types";
import { WorkflowRuntime, RuntimeError } from "@/lib/workflows/runtime";
import { installTemplate } from "@/lib/workflows/service";
import { templates } from "@/lib/templates/catalog";
import { validateTemplateGraph } from "@/lib/templates/schema";

let dir: string;
let store: JsonStore;

async function seedWorkspace(id: string, budget = 5) {
  await store.mutate((db) => {
    db.workspaces.push({ id, name: id, monthlyBudgetUsd: budget, privacyMode: "FULL", createdAt: now() });
  });
}

const hot = {
  name: "Rina",
  email: "rina@example.com",
  message: "Kami butuh 3 unit bulan depan, budget 150 juta, mohon penawaran minggu ini segera.",
};
const cold = { name: "X", email: "x@example.com", message: "halo" };

beforeEach(() => {
  dir = mkdtempSync(path.join(tmpdir(), "atlas-test-"));
  store = new JsonStore(path.join(dir, "db.json"));
});
afterEach(() => rmSync(dir, { recursive: true, force: true }));

describe("template catalog", () => {
  it("every seeded template passes static graph validation", () => {
    expect(templates.length).toBeGreaterThanOrEqual(120);
    for (const t of templates) expect(validateTemplateGraph(t)).toEqual([]);
  });

  it("detects cycles", () => {
    const t = structuredClone(templates[0]);
    t.edges.push(["done", "trigger"]);
    expect(validateTemplateGraph(t).some((i) => i.message === "cycle detected")).toBe(true);
  });

  it("rejects external side effects without approval", () => {
    const t = structuredClone(templates[0]);
    const act = t.nodes.find((n) => n.id === "act");
    if (act?.type === "action") act.requiresApproval = false;
    expect(validateTemplateGraph(t).length).toBeGreaterThan(0);
  });
});

describe("workflow runtime", () => {
  it("pauses high-score runs for approval, then completes with one side effect", async () => {
    await seedWorkspace("ws_a");
    const wf = await installTemplate(store, "ws_a", "inbound-lead-qualification");
    const rt = new WorkflowRuntime(store, new MockProvider());
    const run = await rt.start({ workspaceId: "ws_a", workflowId: wf.id, input: hot });
    expect(run.status).toBe("awaiting_approval");
    expect(run.costUsd).toBeGreaterThan(0);

    const approval = await store.read((db) => db.approvals.find((a) => a.runId === run.id)!);
    const done = await rt.decide({ workspaceId: "ws_a", approvalId: approval.id, userId: "u1", decision: "approved" });
    expect(done.status).toBe("succeeded");

    const effects = await store.read((db) => db.sideEffects.filter((s) => s.runId === run.id));
    expect(effects).toHaveLength(1);
    const events = await store.read((db) => db.events.filter((e) => e.runId === run.id));
    expect(events.map((e) => e.seq)).toEqual(events.map((_, i) => i + 1));
    await expect(rt.decide({ workspaceId: "ws_a", approvalId: approval.id, userId: "u1", decision: "approved" })).rejects.toThrow(RuntimeError);
  });

  it("routes low-score runs to the internal path without approval", async () => {
    await seedWorkspace("ws_a");
    const wf = await installTemplate(store, "ws_a", "inbound-lead-qualification");
    const run = await new WorkflowRuntime(store, new MockProvider()).start({ workspaceId: "ws_a", workflowId: wf.id, input: cold });
    expect(run.status).toBe("succeeded");
    expect(await store.read((db) => db.approvals.length)).toBe(0);
  });

  it("rejection stops downstream side effects", async () => {
    await seedWorkspace("ws_a");
    const wf = await installTemplate(store, "ws_a", "inbound-lead-qualification");
    const rt = new WorkflowRuntime(store, new MockProvider());
    const run = await rt.start({ workspaceId: "ws_a", workflowId: wf.id, input: hot });
    const approval = await store.read((db) => db.approvals[0]);
    const result = await rt.decide({ workspaceId: "ws_a", approvalId: approval.id, userId: "u1", decision: "rejected" });
    expect(result.status).toBe("rejected");
    expect(await store.read((db) => db.sideEffects.filter((s) => s.runId === run.id).length)).toBe(0);
  });

  it("validates input server-side", async () => {
    await seedWorkspace("ws_a");
    const wf = await installTemplate(store, "ws_a", "inbound-lead-qualification");
    const rt = new WorkflowRuntime(store, new MockProvider());
    await expect(rt.start({ workspaceId: "ws_a", workflowId: wf.id, input: { ...hot, email: "not-an-email" } })).rejects.toThrow(/email/);
    await expect(rt.start({ workspaceId: "ws_a", workflowId: wf.id, input: { ...hot, extra: "x" } })).rejects.toThrow(RuntimeError);
  });

  it("isolates tenants: another workspace cannot run or approve", async () => {
    await seedWorkspace("ws_a");
    await seedWorkspace("ws_b");
    const wf = await installTemplate(store, "ws_a", "inbound-lead-qualification");
    const rt = new WorkflowRuntime(store, new MockProvider());
    await expect(rt.start({ workspaceId: "ws_b", workflowId: wf.id, input: hot })).rejects.toThrow(/not found/);
    await rt.start({ workspaceId: "ws_a", workflowId: wf.id, input: hot });
    const approval = await store.read((db) => db.approvals[0]);
    await expect(rt.decide({ workspaceId: "ws_b", approvalId: approval.id, userId: "u2", decision: "approved" })).rejects.toThrow(/not found/);
  });

  it("stops before a model call when workspace budget is exhausted", async () => {
    await seedWorkspace("ws_a", 0);
    const wf = await installTemplate(store, "ws_a", "inbound-lead-qualification");
    const run = await new WorkflowRuntime(store, new MockProvider()).start({ workspaceId: "ws_a", workflowId: wf.id, input: hot });
    expect(run.status).toBe("failed");
    expect(run.error).toBe("workspace_budget_exceeded");
    expect(await store.read((db) => db.usage.length)).toBe(0);
  });

  it("retries retryable provider errors once, then fails cleanly", async () => {
    await seedWorkspace("ws_a");
    const wf = await installTemplate(store, "ws_a", "inbound-lead-qualification");
    let calls = 0;
    const flaky: AIProvider = {
      name: "flaky",
      run: async () => {
        calls++;
        throw new ProviderError("timeout", "timeout", true);
      },
    };
    const run = await new WorkflowRuntime(store, flaky).start({ workspaceId: "ws_a", workflowId: wf.id, input: hot });
    expect(calls).toBe(2);
    expect(run.status).toBe("failed");
    expect(run.error).toBe("provider_timeout");
  });

  it("does not retry non-retryable errors", async () => {
    await seedWorkspace("ws_a");
    const wf = await installTemplate(store, "ws_a", "inbound-lead-qualification");
    let calls = 0;
    const broken: AIProvider = {
      name: "broken",
      run: async () => {
        calls++;
        throw new ProviderError("invalid_output", "bad", false);
      },
    };
    const run = await new WorkflowRuntime(store, broken).start({ workspaceId: "ws_a", workflowId: wf.id, input: hot });
    expect(calls).toBe(1);
    expect(run.error).toBe("provider_invalid_output");
  });

  it("representative seeded templates across all 12 categories run end-to-end with sample inputs", async () => {
    await seedWorkspace("ws_a", 100);
    const rt = new WorkflowRuntime(store, new MockProvider());
    const categories = [
      "sales",
      "marketing",
      "support",
      "property",
      "dealer",
      "education",
      "travel",
      "agency",
      "recruiting",
      "finance",
      "ecommerce",
      "services",
    ] as const;
    for (const cat of categories) {
      const t = templates.find((item) => item.category === cat);
      expect(t).toBeDefined();
      if (!t) continue;
      const wf = await installTemplate(store, "ws_a", t.slug);
      const run = await rt.start({ workspaceId: "ws_a", workflowId: wf.id, input: t.sampleInput });
      expect(["succeeded", "awaiting_approval"]).toContain(run.status);
    }
  });
});
