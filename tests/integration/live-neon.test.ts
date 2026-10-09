import { describe, expect, it } from "vitest";
import { NeonPostgresStore } from "@/lib/db/neon";
import { WorkflowRuntime } from "@/lib/workflows/runtime";
import { MockProvider } from "@/lib/ai/providers";
import { installTemplate } from "@/lib/workflows/service";
import { newId, now } from "@/lib/db/store";

const neonUrl = process.env.DATABASE_URL;
const suite = neonUrl ? describe : describe.skip;

suite("Live Neon PostgreSQL Cross-Container Durability", () => {
  it(
    "persists run state, approvals, and idempotent side effects across separate store instances",
    async () => {
      // Instance 1: Initial state & run initiation
      const container1 = new NeonPostgresStore(neonUrl!);
    expect(await container1.ping()).toBe(true);
    expect(container1.getStorageType()).toBe("postgres");

    const workspaceId = newId("ws_live_audit");
    await container1.mutate((db) => {
      db.workspaces.push({
        id: workspaceId,
        name: "Audit Agency WS",
        monthlyBudgetUsd: 100,
        privacyMode: "FULL",
        createdAt: now(),
      });
    });

    const wf = await installTemplate(container1, workspaceId, "inbound-lead-qualification");
    expect(wf.id).toBeDefined();

    const rt1 = new WorkflowRuntime(container1, new MockProvider());
    const initialRun = await rt1.start({
      workspaceId,
      workflowId: wf.id,
      input: {
        name: "Budi Santoso (Live Test)",
        email: "budi@ptmaju.id",
        message: "Halo kami ada anggaran 100 juta butuh penawaran segera bulan depan untuk kantor baru.",
      },
    });

    expect(initialRun.status).toBe("awaiting_approval");
    expect(initialRun.agentOutput?.score).toBeGreaterThanOrEqual(70);

    // Instance 2: Brand new store instance representing a separate Serverless execution container
    const container2 = new NeonPostgresStore(neonUrl!);
    const pendingApprovals = await container2.read((db) =>
      db.approvals.filter((a) => a.workspaceId === workspaceId && a.status === "pending")
    );

    expect(pendingApprovals).toHaveLength(1);
    const approval = pendingApprovals[0];
    expect(approval.runId).toBe(initialRun.id);

    // Resolve approval on Container 2
    const rt2 = new WorkflowRuntime(container2, new MockProvider());
    const finishedRun = await rt2.decide({
      workspaceId,
      approvalId: approval.id,
      userId: "usr_admin",
      decision: "approved",
    });

    expect(finishedRun.status).toBe("succeeded");
    expect(finishedRun.cursor).toBeNull();

    // Verify side effect and idempotency record written to Neon
    const sideEffects = await container2.read((db) =>
      db.sideEffects.filter((s) => s.workspaceId === workspaceId && s.runId === initialRun.id)
    );
    expect(sideEffects).toHaveLength(1);
    expect(sideEffects[0].idempotencyKey).toBe(`${initialRun.id}:act`);
    expect(sideEffects[0].integration).toBe("mock_whatsapp");
  }, 120_000);
});
