import Link from "next/link";
import { Plus, GitBranch, ArrowRight, Power } from "lucide-react";
import { requireSession } from "@/lib/auth/session";
import { getLocale, getDict, pick } from "@/lib/i18n";
import { getStore } from "@/lib/db/store";
import { toggleWorkflowAction } from "@/app/actions";

export default async function WorkflowsPage() {
  const session = await requireSession();
  const locale = await getLocale();
  const { t } = await getDict();

  const workflows = await getStore().read((db) =>
    db.workflows.filter((w) => w.workspaceId === session.workspace.id)
  );

  return (
    <div style={{ display: "grid", gap: "var(--space-6)" }}>
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
          <h1 style={{ fontSize: "var(--text-28)" }}>{t.wf.title}</h1>
          <p className="muted" style={{ fontSize: "var(--text-14)" }}>
            Daftar workflow aktif dan terpasang di ruang kerja Anda
          </p>
        </div>

        <Link href="/templates" className="btn btn-primary btn-sm">
          <Plus size={16} aria-hidden="true" />
          <span>Pasang dari template</span>
        </Link>
      </div>

      {workflows.length === 0 ? (
        <div className="empty">
          <p>{t.wf.empty}</p>
          <Link href="/templates" className="btn btn-primary btn-sm">
            <span>Jelajahi template</span>
          </Link>
        </div>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "var(--space-4)",
          }}
        >
          {workflows.map((wf) => (
            <div
              key={wf.id}
              className="panel"
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                gap: "var(--space-4)",
              }}
            >
              <div style={{ display: "grid", gap: "var(--space-2)" }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <span className={`badge ${wf.enabled ? "badge-success" : ""}`}>
                    {wf.enabled ? t.wf.enabled : t.wf.disabled}
                  </span>
                  <span className="badge">v{wf.templateVersion}</span>
                </div>

                <h2 style={{ fontSize: "var(--text-18)" }}>
                  <Link href={`/app/workflows/${wf.id}`} style={{ textDecoration: "none" }}>
                    {wf.name}
                  </Link>
                </h2>

                <p className="muted" style={{ fontSize: "var(--text-14)" }}>
                  {pick(wf.definition.summary, locale)}
                </p>

                <div className="muted" style={{ fontSize: "var(--text-12)", marginTop: "var(--space-1)" }}>
                  Template: <code>{wf.templateSlug}</code> &bull; {wf.definition.nodes.length} langkah
                </div>
              </div>

              <div
                style={{
                  borderTop: "1px solid var(--color-border)",
                  paddingTop: "var(--space-3)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <form action={toggleWorkflowAction}>
                  <input type="hidden" name="workflowId" value={wf.id} />
                  <input type="hidden" name="enabled" value={wf.enabled ? "false" : "true"} />
                  <button type="submit" className="btn btn-ghost btn-sm" title={wf.enabled ? t.wf.disable : t.wf.enable}>
                    <Power size={14} aria-hidden="true" />
                    <span>{wf.enabled ? t.wf.disable : t.wf.enable}</span>
                  </button>
                </form>

                <Link href={`/app/workflows/${wf.id}`} className="btn btn-secondary btn-sm">
                  <span>Buka &amp; Uji Coba</span>
                  <ArrowRight size={14} aria-hidden="true" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
