import Link from "next/link";
import { History, ArrowRight } from "lucide-react";
import { requireSession } from "@/lib/auth/session";
import { getLocale, getDict } from "@/lib/i18n";
import { getStore } from "@/lib/db/store";

export default async function RunsPage() {
  const session = await requireSession();
  const locale = await getLocale();
  const { t } = await getDict();

  const data = await getStore().read((db) => {
    const wid = session.workspace.id;
    const workflows = db.workflows.filter((w) => w.workspaceId === wid);
    const runs = db.runs
      .filter((r) => r.workspaceId === wid)
      .sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt))
      .map((r) => {
        const wf = workflows.find((w) => w.id === r.workflowId);
        return {
          id: r.id,
          name: wf ? wf.name : "Workflow",
          workflowId: r.workflowId,
          status: r.status,
          costUsd: r.costUsd,
          stepCount: r.stepCount,
          isDemo: r.isDemo,
          createdAt: r.createdAt,
          error: r.error,
        };
      });
    return { runs };
  });

  return (
    <div style={{ display: "grid", gap: "var(--space-6)" }}>
      <div>
        <h1 style={{ fontSize: "var(--text-28)" }}>{t.runs.title}</h1>
        <p className="muted" style={{ fontSize: "var(--text-14)" }}>
          Semua jejak eksekusi workflow yang telah dijalankan di ruang kerja ini
        </p>
      </div>

      {data.runs.length === 0 ? (
        <div className="empty">
          <p>{t.runs.empty}</p>
          <Link href="/app/workflows" className="btn btn-primary btn-sm">
            Buka workflow untuk menjalankan uji coba
          </Link>
        </div>
      ) : (
        <div className="panel" style={{ padding: 0, overflow: "hidden" }}>
          <div className="table-wrap">
            <table className="table">
              <thead>
                <tr>
                  <th>Run ID</th>
                  <th>Workflow</th>
                  <th>Status</th>
                  <th>Biaya AI</th>
                  <th>Langkah</th>
                  <th>Waktu</th>
                  <th>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {data.runs.map((r) => (
                  <tr key={r.id}>
                    <td>
                      <code>{r.id.slice(0, 14)}...</code>
                    </td>
                    <td>
                      <span style={{ fontWeight: 600 }}>{r.name}</span>
                      {r.isDemo && (
                        <span className="badge" style={{ marginLeft: "var(--space-2)", fontSize: "10px" }}>
                          demo
                        </span>
                      )}
                    </td>
                    <td>
                      <span className={`badge ${r.status === "succeeded" ? "badge-success" : r.status === "awaiting_approval" ? "badge-warning" : r.status === "failed" ? "badge-danger" : ""}`}>
                        {r.status}
                      </span>
                    </td>
                    <td>
                      <code>${r.costUsd.toFixed(6)}</code>
                    </td>
                    <td>{r.stepCount}</td>
                    <td className="muted" style={{ fontSize: "var(--text-12)" }}>
                      {new Date(r.createdAt).toLocaleString(locale === "id" ? "id-ID" : "en-US")}
                    </td>
                    <td>
                      <Link href={`/app/runs/${r.id}`} className="btn btn-ghost btn-sm">
                        <span>Lihat jejak</span>
                        <ArrowRight size={14} aria-hidden="true" />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
