import Link from "next/link";
import {
  ArrowRight,
  GitBranch,
  CheckCircle2,
  AlertCircle,
  ShieldAlert,
  Coins,
  Boxes,
  Plus,
  Play,
} from "lucide-react";
import { requireSession } from "@/lib/auth/session";
import { getLocale, getDict } from "@/lib/i18n";
import { getStore } from "@/lib/db/store";
import { monthlySpend } from "@/lib/workflows/runtime";

export default async function DashboardPage() {
  const session = await requireSession();
  const locale = await getLocale();
  const { t } = await getDict();

  const data = await getStore().read((db) => {
    const wid = session.workspace.id;
    const workflows = db.workflows.filter((w) => w.workspaceId === wid);
    const activeWorkflows = workflows.filter((w) => w.enabled).length;

    const sevenDaysAgo = Date.now() - 7 * 24 * 3600_000;
    const runs = db.runs.filter((r) => r.workspaceId === wid);
    const succeeded7d = runs.filter((r) => r.status === "succeeded" && Date.parse(r.createdAt) >= sevenDaysAgo).length;
    const failed7d = runs.filter((r) => r.status === "failed" && Date.parse(r.createdAt) >= sevenDaysAgo).length;

    const approvals = db.approvals.filter((a) => a.workspaceId === wid);
    const pendingApprovals = approvals.filter((a) => a.status === "pending").length;
    const decidedApprovals = approvals.filter((a) => a.status === "approved" || a.status === "rejected").length;

    const currentSpend = monthlySpend(db.usage, wid);

    const recentRuns = [...runs]
      .sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt))
      .slice(0, 5)
      .map((r) => {
        const wf = workflows.find((w) => w.id === r.workflowId);
        return {
          id: r.id,
          name: wf ? wf.name : "Workflow",
          status: r.status,
          costUsd: r.costUsd,
          createdAt: r.createdAt,
          isDemo: r.isDemo,
        };
      });

    return {
      totalWorkflows: workflows.length,
      activeWorkflows,
      succeeded7d,
      failed7d,
      pendingApprovals,
      decidedApprovals,
      currentSpend,
      recentRuns,
      totalRuns: runs.length,
    };
  });

  const budget = session.workspace.monthlyBudgetUsd;
  const budgetPercent = budget > 0 ? Math.min(100, Math.round((data.currentSpend / budget) * 100)) : 0;

  return (
    <div style={{ display: "grid", gap: "var(--space-6)" }}>
      {/* Greeting & Header */}
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
          <h1 style={{ fontSize: "var(--text-28)" }}>
            {t.dash.greeting}, {session.user.name}
          </h1>
          <p className="muted" style={{ fontSize: "var(--text-14)" }}>
            Ruang kerja <strong>{session.workspace.name}</strong> &bull; Mode Privasi: <code>{session.workspace.privacyMode}</code>
          </p>
        </div>

        <div style={{ display: "flex", gap: "var(--space-2)" }}>
          <Link href="/templates" className="btn btn-secondary btn-sm">
            <Boxes size={16} aria-hidden="true" />
            <span>{t.dash.browse}</span>
          </Link>
          <Link href="/app/workflows" className="btn btn-primary btn-sm">
            <GitBranch size={16} aria-hidden="true" />
            <span>Kelola workflow</span>
          </Link>
        </div>
      </div>

      {/* Outcome Cards Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "var(--space-4)",
        }}
      >
        <div className="panel" style={{ display: "grid", gap: "var(--space-1)" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <span className="muted" style={{ fontSize: "var(--text-12)" }}>{t.dash.activeWorkflows}</span>
            <GitBranch size={16} aria-hidden="true" style={{ color: "var(--color-accent)" }} />
          </div>
          <div style={{ fontSize: "var(--text-28)", fontWeight: 700 }}>
            {data.activeWorkflows} / {data.totalWorkflows}
          </div>
        </div>

        <div className="panel" style={{ display: "grid", gap: "var(--space-1)" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <span className="muted" style={{ fontSize: "var(--text-12)" }}>{t.dash.succeeded7d}</span>
            <CheckCircle2 size={16} aria-hidden="true" style={{ color: "var(--color-success)" }} />
          </div>
          <div style={{ fontSize: "var(--text-28)", fontWeight: 700 }}>
            {data.succeeded7d}
          </div>
        </div>

        <div className="panel" style={{ display: "grid", gap: "var(--space-1)" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <span className="muted" style={{ fontSize: "var(--text-12)" }}>{t.dash.pending}</span>
            <ShieldAlert size={16} aria-hidden="true" style={{ color: "var(--color-warning)" }} />
          </div>
          <div style={{ fontSize: "var(--text-28)", fontWeight: 700, color: data.pendingApprovals > 0 ? "var(--color-warning)" : "inherit" }}>
            {data.pendingApprovals}
          </div>
        </div>

        <div className="panel" style={{ display: "grid", gap: "var(--space-1)" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <span className="muted" style={{ fontSize: "var(--text-12)" }}>{t.dash.spend}</span>
            <Coins size={16} aria-hidden="true" style={{ color: "var(--color-accent)" }} />
          </div>
          <div style={{ fontSize: "var(--text-24)", fontWeight: 700 }}>
            ${data.currentSpend.toFixed(4)}
          </div>
          <div className="muted" style={{ fontSize: "var(--text-12)" }}>
            {budgetPercent}% {t.dash.ofBudget} (${budget})
          </div>
        </div>
      </div>

      {/* Setup Checklist (if workspace is new) */}
      <div className="panel" style={{ display: "grid", gap: "var(--space-3)" }}>
        <div className="eyebrow">{t.dash.setupTitle}</div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "var(--space-3)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "var(--space-2)" }}>
            <CheckCircle2 size={18} aria-hidden="true" style={{ color: "var(--color-success)" }} />
            <span style={{ fontSize: "var(--text-14)" }}>{t.dash.setup1}</span>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "var(--space-2)" }}>
            {data.totalWorkflows > 0 ? (
              <CheckCircle2 size={18} aria-hidden="true" style={{ color: "var(--color-success)" }} />
            ) : (
              <div style={{ width: 18, height: 18, borderRadius: "50%", border: "2px solid var(--color-border-strong)" }} />
            )}
            <span style={{ fontSize: "var(--text-14)" }}>
              <Link href="/templates" style={{ textDecoration: "underline" }}>
                {t.dash.setup2}
              </Link>
            </span>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "var(--space-2)" }}>
            {data.totalRuns > 0 ? (
              <CheckCircle2 size={18} aria-hidden="true" style={{ color: "var(--color-success)" }} />
            ) : (
              <div style={{ width: 18, height: 18, borderRadius: "50%", border: "2px solid var(--color-border-strong)" }} />
            )}
            <span style={{ fontSize: "var(--text-14)" }}>{t.dash.setup3}</span>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "var(--space-2)" }}>
            {data.decidedApprovals > 0 ? (
              <CheckCircle2 size={18} aria-hidden="true" style={{ color: "var(--color-success)" }} />
            ) : (
              <div style={{ width: 18, height: 18, borderRadius: "50%", border: "2px solid var(--color-border-strong)" }} />
            )}
            <span style={{ fontSize: "var(--text-14)" }}>{t.dash.setup4}</span>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="panel" style={{ display: "grid", gap: "var(--space-4)" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <h2 style={{ fontSize: "var(--text-18)" }}>{t.dash.recent}</h2>
          <Link href="/app/runs" className="btn btn-ghost btn-sm">
            <span>Lihat semua</span>
            <ArrowRight size={14} aria-hidden="true" />
          </Link>
        </div>

        {data.recentRuns.length === 0 ? (
          <div className="empty">
            <p>{t.dash.emptyRecent}</p>
            <Link href="/templates" className="btn btn-primary btn-sm">
              <span>{t.dash.browse}</span>
            </Link>
          </div>
        ) : (
          <div className="table-wrap">
            <table className="table">
              <thead>
                <tr>
                  <th>Workflow</th>
                  <th>Status</th>
                  <th>Biaya AI</th>
                  <th>Waktu</th>
                  <th>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {data.recentRuns.map((r) => (
                  <tr key={r.id}>
                    <td>
                      <span style={{ fontWeight: 600 }}>{r.name}</span>
                      {r.isDemo && <span className="badge" style={{ marginLeft: "var(--space-2)", fontSize: "10px" }}>demo</span>}
                    </td>
                    <td>
                      <span className={`badge ${r.status === "succeeded" ? "badge-success" : r.status === "awaiting_approval" ? "badge-warning" : r.status === "failed" ? "badge-danger" : ""}`}>
                        {r.status}
                      </span>
                    </td>
                    <td><code>${r.costUsd.toFixed(6)}</code></td>
                    <td className="muted" style={{ fontSize: "var(--text-12)" }}>
                      {new Date(r.createdAt).toLocaleString(locale === "id" ? "id-ID" : "en-US")}
                    </td>
                    <td>
                      <Link href={`/app/runs/${r.id}`} className="btn btn-ghost btn-sm">
                        <span>Detail</span>
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
