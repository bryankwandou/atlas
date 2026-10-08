import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Power, History, ShieldAlert, Sparkles } from "lucide-react";
import { requireSession } from "@/lib/auth/session";
import { getLocale, getDict, pick } from "@/lib/i18n";
import { getStore } from "@/lib/db/store";
import { toggleWorkflowAction } from "@/app/actions";
import { WorkflowRunner } from "@/components/WorkflowRunner";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function WorkflowDetailPage({ params }: Props) {
  const { id } = await params;
  const session = await requireSession();
  const locale = await getLocale();
  const { t } = await getDict();

  const data = await getStore().read((db) => {
    const wf = db.workflows.find((w) => w.id === id && w.workspaceId === session.workspace.id);
    if (!wf) return null;
    const runs = db.runs
      .filter((r) => r.workflowId === id && r.workspaceId === session.workspace.id)
      .sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt))
      .slice(0, 5);
    return { wf, runs };
  });

  if (!data) notFound();
  const { wf, runs } = data;

  return (
    <div style={{ display: "grid", gap: "var(--space-6)" }}>
      {/* Header */}
      <div>
        <Link
          href="/app/workflows"
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
          <span>Kembali ke daftar workflow</span>
        </Link>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "flex-start",
            justifyContent: "space-between",
            gap: "var(--space-4)",
          }}
        >
          <div style={{ display: "grid", gap: "var(--space-2)", maxWidth: "700px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "var(--space-2)" }}>
              <span className={`badge ${wf.enabled ? "badge-success" : ""}`}>
                {wf.enabled ? t.wf.enabled : t.wf.disabled}
              </span>
              <span className="badge">v{wf.templateVersion}</span>
              <span className="badge" style={{ textTransform: "capitalize" }}>
                {wf.definition.category}
              </span>
            </div>

            <h1 style={{ fontSize: "var(--text-28)" }}>{wf.name}</h1>
            <p className="muted" style={{ fontSize: "var(--text-14)" }}>
              {pick(wf.definition.summary, locale)}
            </p>
          </div>

          <div>
            <form action={toggleWorkflowAction}>
              <input type="hidden" name="workflowId" value={wf.id} />
              <input type="hidden" name="enabled" value={wf.enabled ? "false" : "true"} />
              <button
                type="submit"
                className={`btn btn-sm ${wf.enabled ? "btn-secondary" : "btn-primary"}`}
              >
                <Power size={14} aria-hidden="true" />
                <span>{wf.enabled ? t.wf.disable : t.wf.enable}</span>
              </button>
            </form>
          </div>
        </div>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
          gap: "var(--space-6)",
          alignItems: "start",
        }}
      >
        {/* Left: Test Run Runner */}
        <WorkflowRunner
          workflowId={wf.id}
          inputs={wf.definition.inputs}
          sampleInput={wf.definition.sampleInput}
          enabled={wf.enabled}
          dict={t}
          locale={locale}
        />

        {/* Right: Step Nodes & Run History */}
        <div style={{ display: "grid", gap: "var(--space-5)" }}>
          {/* Steps visualization */}
          <div className="panel" style={{ display: "grid", gap: "var(--space-3)" }}>
            <h2 style={{ fontSize: "var(--text-18)" }}>
              {t.wf.nodes} ({wf.definition.nodes.length} Langkah)
            </h2>

            <div style={{ display: "grid", gap: "var(--space-2)" }}>
              {wf.definition.nodes.map((node, i) => (
                <div
                  key={node.id}
                  style={{
                    padding: "var(--space-3)",
                    border: "1px solid var(--color-border)",
                    borderRadius: "var(--radius-md)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    background: "var(--color-surface-2)",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "var(--space-3)" }}>
                    <span className="mono" style={{ fontSize: "var(--text-12)", color: "var(--color-muted)" }}>
                      0{i + 1}
                    </span>
                    <div>
                      <div style={{ fontWeight: 600, fontSize: "var(--text-14)" }}>
                        {pick(node.label, locale)}
                      </div>
                      <div className="muted" style={{ fontSize: "var(--text-12)" }}>
                        <code>{node.type}</code>
                        {node.type === "agent" && ` &bull; ${node.agent}`}
                        {node.type === "approval" && " &bull; butuh persetujuan"}
                      </div>
                    </div>
                  </div>

                  {node.type === "approval" && (
                    <span className="badge badge-warning">
                      <ShieldAlert size={12} aria-hidden="true" />
                      <span>Gate</span>
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Recent runs */}
          <div className="panel" style={{ display: "grid", gap: "var(--space-3)" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <h2 style={{ fontSize: "var(--text-18)" }}>{t.wf.runs}</h2>
              <Link href="/app/runs" className="btn btn-ghost btn-sm">
                Lihat riwayat
              </Link>
            </div>

            {runs.length === 0 ? (
              <p className="muted" style={{ fontSize: "var(--text-14)" }}>
                Belum ada run untuk workflow ini. Jalankan uji coba di samping.
              </p>
            ) : (
              <div style={{ display: "grid", gap: "var(--space-2)" }}>
                {runs.map((r) => (
                  <Link
                    key={r.id}
                    href={`/app/runs/${r.id}`}
                    style={{
                      padding: "var(--space-3)",
                      borderRadius: "var(--radius-md)",
                      border: "1px solid var(--color-border)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      textDecoration: "none",
                      color: "inherit",
                      background: "var(--color-surface)",
                    }}
                  >
                    <div>
                      <div style={{ display: "flex", alignItems: "center", gap: "var(--space-2)" }}>
                        <span className={`badge ${r.status === "succeeded" ? "badge-success" : r.status === "awaiting_approval" ? "badge-warning" : r.status === "failed" ? "badge-danger" : ""}`}>
                          {r.status}
                        </span>
                        <code style={{ fontSize: "var(--text-12)" }}>{r.id.slice(0, 12)}...</code>
                      </div>
                      <div className="muted" style={{ fontSize: "var(--text-12)", marginTop: "var(--space-1)" }}>
                        {new Date(r.createdAt).toLocaleString(locale === "id" ? "id-ID" : "en-US")}
                      </div>
                    </div>

                    <div style={{ textAlign: "right" }}>
                      <div style={{ fontWeight: 600, fontSize: "var(--text-14)" }}>
                        ${r.costUsd.toFixed(6)}
                      </div>
                      <div className="muted" style={{ fontSize: "var(--text-12)" }}>
                        {r.stepCount} langkah
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
