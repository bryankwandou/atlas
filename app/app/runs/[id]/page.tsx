import { notFound } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  CheckCircle2,
  AlertCircle,
  ShieldAlert,
  Clock,
  Coins,
  Cpu,
  Layers,
  Check,
  X,
} from "lucide-react";
import { requireSession } from "@/lib/auth/session";
import { getLocale, getDict } from "@/lib/i18n";
import { getStore } from "@/lib/db/store";
import { decideApprovalAction } from "@/app/actions";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function RunDetailPage({ params }: Props) {
  const { id } = await params;
  const session = await requireSession();
  const locale = await getLocale();
  const { t } = await getDict();

  const data = await getStore().read((db) => {
    const run = db.runs.find((r) => r.id === id && r.workspaceId === session.workspace.id);
    if (!run) return null;
    const workflow = db.workflows.find((w) => w.id === run.workflowId && w.workspaceId === session.workspace.id);
    const events = db.events
      .filter((e) => e.runId === run.id && e.workspaceId === session.workspace.id)
      .sort((a, b) => a.seq - b.seq);
    const approval = db.approvals.find((a) => a.runId === run.id && a.workspaceId === session.workspace.id);
    const usage = db.usage.find((u) => u.runId === run.id && u.workspaceId === session.workspace.id);
    const sideEffects = db.sideEffects.filter((s) => s.runId === run.id && s.workspaceId === session.workspace.id);

    return { run, workflow, events, approval, usage, sideEffects };
  });

  if (!data) notFound();
  const { run, workflow, events, approval, usage, sideEffects } = data;

  return (
    <div style={{ display: "grid", gap: "var(--space-6)" }}>
      {/* Header */}
      <div>
        <Link
          href="/app/runs"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "var(--space-2)",
            fontSize: "var(--text-14)",
            fontWeight: 600,
            textDecoration: "none",
            color: "var(--color-muted)",
            marginBottom: "var(--space-3)",
          }}
        >
          <ArrowLeft size={16} aria-hidden="true" />
          <span>Kembali ke riwayat run</span>
        </Link>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "var(--space-4)",
          }}
        >
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "var(--space-2)", marginBottom: "var(--space-1)" }}>
              <span className={`badge ${run.status === "succeeded" ? "badge-success" : run.status === "awaiting_approval" ? "badge-warning" : run.status === "failed" ? "badge-danger" : ""}`}>
                {run.status}
              </span>
              {run.isDemo && <span className="badge">Data Demo</span>}
              <span className="muted" style={{ fontSize: "var(--text-12)" }}>
                Dibuat {new Date(run.createdAt).toLocaleString(locale === "id" ? "id-ID" : "en-US")}
              </span>
            </div>

            <h1 style={{ fontSize: "var(--text-28)" }}>
              {workflow ? workflow.name : "Workflow Run"}
            </h1>
            <p className="muted" style={{ fontSize: "var(--text-14)" }}>
              Run ID: <code>{run.id}</code> &bull; Versi Workflow: <code>v{run.workflowVersion}</code>
            </p>
          </div>

          <div style={{ display: "flex", gap: "var(--space-3)" }}>
            <div style={{ textAlign: "right" }}>
              <div className="muted" style={{ fontSize: "var(--text-12)" }}>Biaya AI</div>
              <div style={{ fontSize: "var(--text-20)", fontWeight: 700 }}>${run.costUsd.toFixed(6)}</div>
            </div>
            <div style={{ textAlign: "right" }}>
              <div className="muted" style={{ fontSize: "var(--text-12)" }}>Langkah Selesai</div>
              <div style={{ fontSize: "var(--text-20)", fontWeight: 700 }}>{run.stepCount}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Pending Approval Alert & Action Box */}
      {approval && approval.status === "pending" && (
        <div
          className="panel"
          style={{
            borderColor: "var(--color-warning)",
            background: "var(--color-warning-soft)",
            display: "grid",
            gap: "var(--space-4)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "var(--space-2)" }}>
            <ShieldAlert size={20} aria-hidden="true" style={{ color: "var(--color-warning)" }} />
            <h2 style={{ fontSize: "var(--text-18)", fontWeight: 700 }}>
              Persetujuan Manusia Diperlukan
            </h2>
          </div>

          <p style={{ fontSize: "var(--text-14)" }}>
            {approval.reason}
          </p>

          <div
            style={{
              padding: "var(--space-4)",
              background: "var(--color-surface)",
              border: "1px solid var(--color-border)",
              borderRadius: "var(--radius-md)",
            }}
          >
            <div className="eyebrow" style={{ marginBottom: "var(--space-2)" }}>Draf Pesan Keluar</div>
            <pre style={{ whiteSpace: "pre-wrap", fontFamily: "inherit", margin: 0, fontSize: "var(--text-14)" }}>
              {approval.draft}
            </pre>
          </div>

          <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--space-3)", alignItems: "center" }}>
            <form action={decideApprovalAction}>
              <input type="hidden" name="approvalId" value={approval.id} />
              <input type="hidden" name="decision" value="approved" />
              <input type="hidden" name="redirect" value="run" />
              <button type="submit" className="btn btn-primary">
                <Check size={16} aria-hidden="true" />
                <span>{t.approvals.approve}</span>
              </button>
            </form>

            <form action={decideApprovalAction}>
              <input type="hidden" name="approvalId" value={approval.id} />
              <input type="hidden" name="decision" value="rejected" />
              <input type="hidden" name="redirect" value="run" />
              <button type="submit" className="btn btn-secondary">
                <X size={16} aria-hidden="true" />
                <span>{t.approvals.reject}</span>
              </button>
            </form>

            <span className="muted" style={{ fontSize: "var(--text-12)" }}>
              Kedaluwarsa pada: {new Date(approval.expiresAt).toLocaleString(locale === "id" ? "id-ID" : "en-US")}
            </span>
          </div>
        </div>
      )}

      {/* Failure reason if failed */}
      {run.status === "failed" && (
        <div className="alert alert-danger">
          <strong>Alasan Kegagalan:</strong> {run.error}
        </div>
      )}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
          gap: "var(--space-6)",
          alignItems: "start",
        }}
      >
        {/* Left: Input & Agent Output */}
        <div style={{ display: "grid", gap: "var(--space-5)" }}>
          {/* Input Data */}
          <div className="panel" style={{ display: "grid", gap: "var(--space-3)" }}>
            <h2 style={{ fontSize: "var(--text-18)" }}>Data Input</h2>
            <div style={{ display: "grid", gap: "var(--space-2)" }}>
              {Object.entries(run.input).map(([k, v]) => (
                <div key={k} style={{ padding: "var(--space-2)", background: "var(--color-surface-2)", borderRadius: "var(--radius-sm)" }}>
                  <span className="muted" style={{ fontSize: "var(--text-12)", textTransform: "uppercase" }}>{k}:</span>
                  <div style={{ fontSize: "var(--text-14)", marginTop: "2px" }}>{v}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Agent Output */}
          {run.agentOutput && (
            <div className="panel" style={{ display: "grid", gap: "var(--space-3)" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <h2 style={{ fontSize: "var(--text-18)" }}>{t.runs.output}</h2>
                <span className="badge badge-accent">
                  Skor: {run.agentOutput.score}/100 ({run.agentOutput.category})
                </span>
              </div>

              <div>
                <span className="muted" style={{ fontSize: "var(--text-12)" }}>Ringkasan Agen:</span>
                <p style={{ fontSize: "var(--text-14)", marginTop: "2px" }}>{run.agentOutput.summary}</p>
              </div>

              {run.agentOutput.draft && (
                <div
                  style={{
                    padding: "var(--space-3)",
                    background: "var(--color-surface-2)",
                    border: "1px solid var(--color-border)",
                    borderRadius: "var(--radius-md)",
                  }}
                >
                  <span className="muted" style={{ fontSize: "var(--text-12)" }}>Draf Hasil:</span>
                  <pre style={{ whiteSpace: "pre-wrap", fontFamily: "inherit", margin: "var(--space-1) 0 0 0", fontSize: "var(--text-14)" }}>
                    {run.agentOutput.draft}
                  </pre>
                </div>
              )}
            </div>
          )}

          {/* Usage & Idempotency */}
          {usage && (
            <div className="panel" style={{ display: "grid", gap: "var(--space-3)" }}>
              <h2 style={{ fontSize: "var(--text-18)" }}>Telemetri &amp; Efek Samping</h2>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "var(--space-2)", fontSize: "var(--text-14)" }}>
                <div>
                  <span className="muted">Penyedia:</span> <code>{usage.provider}</code>
                </div>
                <div>
                  <span className="muted">Model:</span> <code>{usage.model}</code>
                </div>
                <div>
                  <span className="muted">Token:</span> {usage.inputTokens} in / {usage.outputTokens} out
                </div>
                <div>
                  <span className="muted">Latensi:</span> {usage.latencyMs}ms
                </div>
              </div>

              {sideEffects.length > 0 && (
                <div style={{ borderTop: "1px solid var(--color-border)", paddingTop: "var(--space-2)" }}>
                  <span className="muted" style={{ fontSize: "var(--text-12)" }}>Efek Samping Eksternal (Idempoten):</span>
                  {sideEffects.map((s) => (
                    <div key={s.idempotencyKey} style={{ fontSize: "var(--text-12)", marginTop: "4px" }}>
                      Kunci: <code>{s.idempotencyKey}</code> &bull; Saluran: <code>{s.integration}</code>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Right: Execution Timeline Events */}
        <div className="panel" style={{ display: "grid", gap: "var(--space-3)" }}>
          <h2 style={{ fontSize: "var(--text-18)" }}>{t.runs.timeline} ({events.length} Peristiwa)</h2>

          <div style={{ display: "grid", gap: "var(--space-3)", position: "relative" }}>
            {events.map((ev) => (
              <div
                key={ev.id}
                style={{
                  padding: "var(--space-3)",
                  border: "1px solid var(--color-border)",
                  borderRadius: "var(--radius-md)",
                  background: "var(--color-surface-2)",
                  display: "grid",
                  gap: "var(--space-1)",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "var(--space-2)" }}>
                    <span className="mono" style={{ fontSize: "var(--text-12)", color: "var(--color-muted)" }}>
                      #{ev.seq}
                    </span>
                    <span style={{ fontWeight: 600, fontSize: "var(--text-14)" }}>
                      {ev.type}
                    </span>
                  </div>
                  <span className="badge">Node: {ev.nodeId}</span>
                </div>

                <div className="muted" style={{ fontSize: "var(--text-12)" }}>
                  {new Date(ev.at).toLocaleTimeString(locale === "id" ? "id-ID" : "en-US", { hour12: false, fractionalSecondDigits: 3 })}
                  {ev.attempt > 1 && ` &bull; ${t.runs.attempt} ${ev.attempt}`}
                </div>

                {Object.keys(ev.detail).length > 0 && (
                  <pre
                    style={{
                      margin: 0,
                      padding: "var(--space-2)",
                      background: "var(--color-surface)",
                      borderRadius: "var(--radius-sm)",
                      border: "1px solid var(--color-border)",
                      fontSize: "11px",
                      overflowX: "auto",
                    }}
                  >
                    {JSON.stringify(ev.detail, null, 2)}
                  </pre>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
