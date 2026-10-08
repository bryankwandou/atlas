import { describe, expect, it, beforeEach, afterEach } from "vitest";
import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { JsonStore, now, newId } from "@/lib/db/store";
import { MockProvider } from "@/lib/ai/providers";
import { WorkflowRuntime } from "@/lib/workflows/runtime";
import { installTemplate } from "@/lib/workflows/service";
import { hashPassword, verifyPassword } from "@/lib/auth/password";
import { encodeSession, decodeSession } from "@/lib/auth/token";

let dir: string;
let store: JsonStore;

beforeEach(() => {
  dir = mkdtempSync(path.join(tmpdir(), "atlas-integration-"));
  store = new JsonStore(path.join(dir, "db.json"));
});
afterEach(() => rmSync(dir, { recursive: true, force: true }));

describe("End-to-End MVP Integration Flow", () => {
  it("complete lifecycle: user registration, template install, run test, approval gate, side effect execution, usage accounting", async () => {
    // 1. User & Workspace Registration
    const userId = newId("usr");
    const workspaceId = newId("ws");
    const passwordHash = await hashPassword("super-secure-password-123");

    await store.mutate((db) => {
      db.users.push({
        id: userId,
        email: "founder@agensi.co.id",
        name: "Budi Santoso",
        passwordHash,
        createdAt: now(),
      });
      db.workspaces.push({
        id: workspaceId,
        name: "Agensi Maju Bersama",
        monthlyBudgetUsd: 10,
        privacyMode: "REDACTED",
        createdAt: now(),
      });
      db.memberships.push({
        userId,
        workspaceId,
        role: "owner",
      });
    });

    // Verify password verification works
    expect(await verifyPassword("super-secure-password-123", passwordHash)).toBe(true);

    // 2. Install Template into Workspace
    const wf = await installTemplate(store, workspaceId, "inbound-lead-qualification");
    expect(wf.id).toBeDefined();
    expect(wf.workspaceId).toBe(workspaceId);
    expect(wf.enabled).toBe(true);
    expect(wf.definition.nodes.length).toBe(7);

    // 3. Start Workflow Run with Synthetic Sample Input
    const runtime = new WorkflowRuntime(store, new MockProvider());
    const hotLead = {
      name: "Rina Kusuma (data demo)",
      email: "rina@example.com",
      message: "Halo, kami butuh 3 unit untuk kantor baru bulan depan. Budget sekitar 150 juta. Bisa kirim penawaran minggu ini?",
    };

    const initialRun = await runtime.start({
      workspaceId,
      workflowId: wf.id,
      input: hotLead,
      isDemo: true,
    });

    // 4. Verification: Run should stop at approval gate
    expect(initialRun.status).toBe("awaiting_approval");
    expect(initialRun.agentOutput).not.toBeNull();
    expect(initialRun.agentOutput?.score).toBeGreaterThanOrEqual(60);
    expect(initialRun.costUsd).toBeGreaterThan(0);

    // Verify Approval record created in workspace
    const pendingApprovals = await store.read((db) =>
      db.approvals.filter((a) => a.workspaceId === workspaceId && a.status === "pending")
    );
    expect(pendingApprovals).toHaveLength(1);
    const approval = pendingApprovals[0];
    expect(approval.runId).toBe(initialRun.id);
    expect(approval.draft).toContain("Halo Rina Kusuma");

    // 5. Decide Approval: Approve and continue
    const finishedRun = await runtime.decide({
      workspaceId,
      approvalId: approval.id,
      userId,
      decision: "approved",
    });

    // 6. Verification: Run completes with status succeeded
    expect(finishedRun.status).toBe("succeeded");
    expect(finishedRun.cursor).toBeNull();
    expect(finishedRun.finishedAt).not.toBeNull();

    // 7. Verify Side Effect logged with unique Idempotency Key
    const sideEffects = await store.read((db) =>
      db.sideEffects.filter((s) => s.workspaceId === workspaceId && s.runId === initialRun.id)
    );
    expect(sideEffects).toHaveLength(1);
    expect(sideEffects[0].idempotencyKey).toBe(`${initialRun.id}:act`);
    expect(sideEffects[0].integration).toBe("mock_email");

    // 8. Verify Usage Accounting
    const usage = await store.read((db) =>
      db.usage.filter((u) => u.workspaceId === workspaceId && u.runId === initialRun.id)
    );
    expect(usage).toHaveLength(1);
    expect(usage[0].costUsd).toBe(finishedRun.costUsd);
    expect(usage[0].inputTokens).toBeGreaterThan(0);
    expect(usage[0].outputTokens).toBeGreaterThan(0);

    // 9. Verify Event Stream sequence
    const events = await store.read((db) =>
      db.events.filter((e) => e.workspaceId === workspaceId && e.runId === initialRun.id)
    );
    expect(events.length).toBeGreaterThanOrEqual(6);
    const seqs = events.map((e) => e.seq);
    expect(seqs).toEqual([...Array(events.length).keys()].map((i) => i + 1));
  });
});
