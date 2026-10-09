import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Check, ShieldAlert, Cpu, Inbox, Send, Sliders } from "lucide-react";
import { getLocale, getDict, pick } from "@/lib/i18n";
import { getSession } from "@/lib/auth/session";
import { getTemplate } from "@/lib/templates/catalog";
import { installTemplateAction } from "@/app/actions";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const template = getTemplate(slug);
  if (!template) return { title: "Template Tidak Ditemukan | Atlas" };

  return {
    title: `${template.name.id} — Template Alur Kerja AI | Atlas`,
    description: template.summary.id,
    alternates: {
      canonical: `https://atlas-automation.vercel.app/templates/${template.slug}`,
    },
  };
}

export default async function TemplateDetailPage({ params }: Props) {
  const { slug } = await params;
  const template = getTemplate(slug);
  if (!template) notFound();

  const locale = await getLocale();
  const { t } = await getDict();
  const session = await getSession();

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Navbar locale={locale} dict={t} isAuthenticated={!!session} />

      <main id="main-content" style={{ flex: 1, padding: "var(--space-8) 0" }}>
        <div className="container" style={{ display: "grid", gap: "var(--space-6)" }}>
          <div>
            <Link
              href="/templates"
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
              <span>Kembali ke katalog template</span>
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
                  <span className="badge badge-accent" style={{ textTransform: "capitalize" }}>
                    {template.category}
                  </span>
                  <span className="badge">v{template.version}</span>
                  <span className="badge">Status: {template.status}</span>
                </div>

                <h1 style={{ fontSize: "var(--text-32)" }}>{pick(template.name, locale)}</h1>
                <p className="muted" style={{ fontSize: "var(--text-16)" }}>
                  {pick(template.summary, locale)}
                </p>
              </div>

              <div>
                {session ? (
                  <form action={installTemplateAction}>
                    <input type="hidden" name="slug" value={template.slug} />
                    <button type="submit" className="btn btn-primary">
                      <span>{t.templates.install}</span>
                    </button>
                  </form>
                ) : (
                  <Link href={`/login?redirect=/templates/${template.slug}`} className="btn btn-primary">
                    <span>Masuk untuk memasang</span>
                  </Link>
                )}
              </div>
            </div>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
              gap: "var(--space-6)",
            }}
          >
            {/* Left: Explanation & Flow */}
            <div style={{ display: "grid", gap: "var(--space-5)" }}>
              {/* Business owner explanation */}
              <div className="panel" style={{ display: "grid", gap: "var(--space-2)" }}>
                <div className="eyebrow">{t.templates.detailWhat}</div>
                <h2 style={{ fontSize: "var(--text-18)" }}>Penjelasan untuk Pemilik Bisnis</h2>
                <p className="muted" style={{ fontSize: "var(--text-14)", lineHeight: 1.6 }}>
                  {pick(template.ownerExplanation, locale)}
                </p>
              </div>

              {/* Node steps */}
              <div className="panel" style={{ display: "grid", gap: "var(--space-3)" }}>
                <div className="eyebrow">{t.templates.detailFlow}</div>
                <h2 style={{ fontSize: "var(--text-18)" }}>Alur Eksekusi ({template.nodes.length} Langkah)</h2>

                <div style={{ display: "grid", gap: "var(--space-2)" }}>
                  {template.nodes.map((node, i) => (
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
                            Tipe: <code>{node.type}</code>
                            {node.type === "agent" && ` (${node.agent}, tier: ${node.tier})`}
                            {node.type === "condition" && ` (${node.field} ${node.operator} ${node.value})`}
                            {node.type === "approval" && ` (Maks ${node.expiresInHours} jam)`}
                            {node.type === "action" && ` (${node.integration}, efek: ${node.sideEffect})`}
                          </div>
                        </div>
                      </div>

                      {node.type === "approval" && (
                        <span className="badge badge-warning">
                          <ShieldAlert size={12} aria-hidden="true" />
                          <span>Persetujuan Manusia</span>
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: Inputs, KPIs & Limits */}
            <div style={{ display: "grid", gap: "var(--space-5)" }}>
              {/* Inputs */}
              <div className="panel" style={{ display: "grid", gap: "var(--space-3)" }}>
                <div className="eyebrow">{t.templates.detailInputs}</div>
                <h2 style={{ fontSize: "var(--text-18)" }}>Data Input yang Dibutuhkan</h2>

                <div className="table-wrap">
                  <table className="table">
                    <thead>
                      <tr>
                        <th>Kunci</th>
                        <th>Label</th>
                        <th>Tipe</th>
                        <th>Wajib</th>
                      </tr>
                    </thead>
                    <tbody>
                      {template.inputs.map((inp) => (
                        <tr key={inp.key}>
                          <td><code>{inp.key}</code></td>
                          <td>{pick(inp.label, locale)}</td>
                          <td><span className="badge">{inp.type}</span></td>
                          <td>
                            {inp.required ? (
                              <span className="badge badge-accent">Ya</span>
                            ) : (
                              <span className="muted">Opsional</span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Execution limits & KPIs */}
              <div className="panel" style={{ display: "grid", gap: "var(--space-3)" }}>
                <div className="eyebrow">{t.templates.detailLimits}</div>
                <h2 style={{ fontSize: "var(--text-18)" }}>Batas Aman &amp; Metrik</h2>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "var(--space-3)" }}>
                  <div style={{ padding: "var(--space-3)", background: "var(--color-surface-2)", borderRadius: "var(--radius-md)" }}>
                    <div className="muted" style={{ fontSize: "var(--text-12)" }}>{t.templates.timeout}</div>
                    <div style={{ fontWeight: 700, fontSize: "var(--text-18)" }}>{template.limits.timeoutMs / 1000}s</div>
                  </div>
                  <div style={{ padding: "var(--space-3)", background: "var(--color-surface-2)", borderRadius: "var(--radius-md)" }}>
                    <div className="muted" style={{ fontSize: "var(--text-12)" }}>{t.templates.maxCost}</div>
                    <div style={{ fontWeight: 700, fontSize: "var(--text-18)" }}>${template.limits.maxCostUsd}</div>
                  </div>
                </div>

                <div style={{ borderTop: "1px solid var(--color-border)", paddingTop: "var(--space-3)" }}>
                  <div className="muted" style={{ fontSize: "var(--text-12)", marginBottom: "var(--space-2)" }}>
                    {t.templates.detailKpis}:
                  </div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--space-1)" }}>
                    {template.kpis.map((kpi) => (
                      <span key={kpi} className="badge">
                        <code>{kpi}</code>
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer dict={t} />
    </div>
  );
}
