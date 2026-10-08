import Link from "next/link";
import { ShieldAlert, Check, X, Clock, ArrowRight } from "lucide-react";
import { requireSession } from "@/lib/auth/session";
import { getLocale, getDict } from "@/lib/i18n";
import { getStore } from "@/lib/db/store";
import { decideApprovalAction } from "@/app/actions";

export default async function ApprovalsPage() {
  const session = await requireSession();
  const locale = await getLocale();
  const { t } = await getDict();

  const data = await getStore().read((db) => {
    const wid = session.workspace.id;
    const approvals = db.approvals.filter((a) => a.workspaceId === wid);
    const workflows = db.workflows.filter((w) => w.workspaceId === wid);
    const runs = db.runs.filter((r) => r.workspaceId === wid);

    const pending = approvals
      .filter((a) => a.status === "pending")
      .map((a) => {
        const run = runs.find((r) => r.id === a.runId);
        const wf = run && workflows.find((w) => w.id === run.workflowId);
        return { ...a, workflowName: wf ? wf.name : "Workflow" };
      });

    const history = approvals
      .filter((a) => a.status !== "pending")
      .sort((a, b) => Date.parse(b.decidedAt || b.createdAt) - Date.parse(a.decidedAt || a.createdAt))
      .map((a) => {
        const run = runs.find((r) => r.id === a.runId);
        const wf = run && workflows.find((w) => w.id === run.workflowId);
        return { ...a, workflowName: wf ? wf.name : "Workflow" };
      });

    return { pending, history };
  });

  return (
    <div style={{ display: "grid", gap: "var(--space-6)" }}>
      <div>
        <h1 style={{ fontSize: "var(--text-28)" }}>{t.approvals.title}</h1>
        <p className="muted" style={{ fontSize: "var(--text-14)" }}>
          Semua aksi eksternal yang memerlukan tinjauan manusia sebelum dikirim ke pelanggan
        </p>
      </div>

      {/* Pending Queue */}
      <div className="panel" style={{ display: "grid", gap: "var(--space-4)" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "var(--space-2)" }}>
            <ShieldAlert size={18} aria-hidden="true" style={{ color: "var(--color-warning)" }} />
            <h2 style={{ fontSize: "var(--text-18)" }}>
              Menunggu Keputusan ({data.pending.length})
            </h2>
          </div>
        </div>

        {data.pending.length === 0 ? (
          <div className="empty">
            <p>{t.approvals.empty}</p>
          </div>
        ) : (
          <div style={{ display: "grid", gap: "var(--space-4)" }}>
            {data.pending.map((item) => (
              <div
                key={item.id}
                style={{
                  padding: "var(--space-4)",
                  border: "1px solid var(--color-warning)",
                  borderRadius: "var(--radius-md)",
                  background: "var(--color-surface-2)",
                  display: "grid",
                  gap: "var(--space-3)",
                }}
              >
                <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "var(--space-2)" }}>
                  <div>
                    <span style={{ fontWeight: 600, fontSize: "var(--text-16)" }}>
                      {item.workflowName}
                    </span>
                    <span className="muted" style={{ fontSize: "var(--text-12)", marginLeft: "var(--space-2)" }}>
                      Node: <code>{item.nodeId}</code> &bull; Run: <code>{item.runId.slice(0, 12)}...</code>
                    </span>
                  </div>

                  <span className="muted" style={{ fontSize: "var(--text-12)" }}>
                    {t.approvals.expires}: {new Date(item.expiresAt).toLocaleString(locale === "id" ? "id-ID" : "en-US")}
                  </span>
                </div>

                <p style={{ fontSize: "var(--text-14)" }}>
                  {item.reason}
                </p>

                {item.draft && (
                  <div
                    style={{
                      padding: "var(--space-3)",
                      background: "var(--color-surface)",
                      border: "1px solid var(--color-border)",
                      borderRadius: "var(--radius-sm)",
                    }}
                  >
                    <div className="eyebrow" style={{ fontSize: "11px", marginBottom: "var(--space-1)" }}>
                      {t.approvals.draft}
                    </div>
                    <pre style={{ whiteSpace: "pre-wrap", fontFamily: "inherit", margin: 0, fontSize: "var(--text-14)" }}>
                      {item.draft}
                    </pre>
                  </div>
                )}

                <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "var(--space-3)" }}>
                  <form action={decideApprovalAction}>
                    <input type="hidden" name="approvalId" value={item.id} />
                    <input type="hidden" name="decision" value="approved" />
                    <button type="submit" className="btn btn-primary btn-sm">
                      <Check size={14} aria-hidden="true" />
                      <span>{t.approvals.approve}</span>
                    </button>
                  </form>

                  <form action={decideApprovalAction}>
                    <input type="hidden" name="approvalId" value={item.id} />
                    <input type="hidden" name="decision" value="rejected" />
                    <button type="submit" className="btn btn-secondary btn-sm">
                      <X size={14} aria-hidden="true" />
                      <span>{t.approvals.reject}</span>
                    </button>
                  </form>

                  <Link href={`/app/runs/${item.runId}`} className="btn btn-ghost btn-sm">
                    <span>Lihat detail run</span>
                    <ArrowRight size={14} aria-hidden="true" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* History */}
      <div className="panel" style={{ display: "grid", gap: "var(--space-3)" }}>
        <h2 style={{ fontSize: "var(--text-18)" }}>{t.approvals.history}</h2>

        {data.history.length === 0 ? (
          <p className="muted" style={{ fontSize: "var(--text-14)" }}>Belum ada riwayat keputusan.</p>
        ) : (
          <div className="table-wrap">
            <table className="table">
              <thead>
                <tr>
                  <th>Workflow</th>
                  <th>Status</th>
                  <th>Alasan</th>
                  <th>Waktu Keputusan</th>
                  <th>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {data.history.map((h) => (
                  <tr key={h.id}>
                    <td><span style={{ fontWeight: 600 }}>{h.workflowName}</span></td>
                    <td>
                      <span className={`badge ${h.status === "approved" ? "badge-success" : h.status === "rejected" ? "badge-danger" : ""}`}>
                        {h.status}
                      </span>
                    </td>
                    <td className="muted" style={{ fontSize: "var(--text-12)", maxWidth: "250px" }}>{h.reason}</td>
                    <td className="muted" style={{ fontSize: "var(--text-12)" }}>
                      {h.decidedAt ? new Date(h.decidedAt).toLocaleString(locale === "id" ? "id-ID" : "en-US") : "-"}
                    </td>
                    <td>
                      <Link href={`/app/runs/${h.runId}`} className="btn btn-ghost btn-sm">
                        Detail run
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
