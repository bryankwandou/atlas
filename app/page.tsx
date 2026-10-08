import Link from "next/link";
import { ArrowRight, ShieldCheck, Coins, History, Layers, Check, Sparkles } from "lucide-react";
import { getLocale, getDict, pick } from "@/lib/i18n";
import { getSession } from "@/lib/auth/session";
import { templates } from "@/lib/templates/catalog";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { WorkflowCanvas } from "@/components/WorkflowCanvas";

export default async function HomePage() {
  const locale = await getLocale();
  const { t } = await getDict();
  const session = await getSession();

  const featuredTemplates = templates.slice(0, 6);

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Navbar locale={locale} dict={t} isAuthenticated={!!session} />

      <main id="main-content" style={{ flex: 1 }}>
        {/* Hero Section */}
        <section
          style={{
            padding: "var(--space-8) 0 var(--space-7) 0",
            borderBottom: "1px solid var(--color-border)",
            background: "radial-gradient(ellipse at top, var(--color-surface-2), var(--color-bg))",
          }}
        >
          <div className="container" style={{ display: "grid", gap: "var(--space-6)" }}>
            <div style={{ maxWidth: "800px", display: "grid", gap: "var(--space-4)" }}>
              <div style={{ display: "inline-flex" }}>
                <span className="badge badge-accent">
                  <Sparkles size={12} aria-hidden="true" />
                  <span>{t.home.eyebrow}</span>
                </span>
              </div>

              <h1 style={{ fontSize: "clamp(2rem, 5vw, 3.25rem)", lineHeight: 1.1 }}>
                {t.home.title}
              </h1>

              <p className="muted" style={{ fontSize: "var(--text-18)", maxWidth: "680px" }}>
                {t.home.lead}
              </p>

              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  alignItems: "center",
                  gap: "var(--space-3)",
                  paddingTop: "var(--space-2)",
                }}
              >
                <Link href="/templates" className="btn btn-primary">
                  <span>{t.home.ctaPrimary}</span>
                  <ArrowRight size={16} aria-hidden="true" />
                </Link>

                <a href="#demo" className="btn btn-secondary">
                  <span>{t.home.ctaSecondary}</span>
                </a>
              </div>
            </div>

            {/* Interactive Canvas Demo */}
            <div id="demo" style={{ marginTop: "var(--space-4)" }}>
              <WorkflowCanvas dict={t} />
            </div>

            {/* Works-with rail */}
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                alignItems: "center",
                gap: "var(--space-3)",
                paddingTop: "var(--space-2)",
                fontSize: "var(--text-12)",
              }}
            >
              <span className="muted">Integrasi siap pakai (simulasi MVP):</span>
              <span className="badge">Google Sheets</span>
              <span className="badge">Gmail</span>
              <span className="badge">Slack / Chat</span>
              <span className="badge">HubSpot / CRM</span>
              <span className="badge">Webhook &amp; HTTP</span>
            </div>
          </div>
        </section>

        {/* 4 Steps Section */}
        <section style={{ padding: "var(--space-8) 0", borderBottom: "1px solid var(--color-border)" }}>
          <div className="container" style={{ display: "grid", gap: "var(--space-6)" }}>
            <div>
              <div className="eyebrow" style={{ marginBottom: "var(--space-2)" }}>Alur Kerja</div>
              <h2 style={{ fontSize: "var(--text-28)" }}>{t.home.stepsTitle}</h2>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
                gap: "var(--space-4)",
              }}
            >
              <div className="panel" style={{ display: "grid", gap: "var(--space-2)" }}>
                <span className="eyebrow">Langkah 01</span>
                <h3 style={{ fontSize: "var(--text-18)" }}>{t.home.step1t}</h3>
                <p className="muted" style={{ fontSize: "var(--text-14)" }}>{t.home.step1d}</p>
              </div>

              <div className="panel" style={{ display: "grid", gap: "var(--space-2)" }}>
                <span className="eyebrow">Langkah 02</span>
                <h3 style={{ fontSize: "var(--text-18)" }}>{t.home.step2t}</h3>
                <p className="muted" style={{ fontSize: "var(--text-14)" }}>{t.home.step2d}</p>
              </div>

              <div className="panel" style={{ display: "grid", gap: "var(--space-2)" }}>
                <span className="eyebrow">Langkah 03</span>
                <h3 style={{ fontSize: "var(--text-18)" }}>{t.home.step3t}</h3>
                <p className="muted" style={{ fontSize: "var(--text-14)" }}>{t.home.step3d}</p>
              </div>

              <div className="panel" style={{ display: "grid", gap: "var(--space-2)" }}>
                <span className="eyebrow">Langkah 04</span>
                <h3 style={{ fontSize: "var(--text-18)" }}>{t.home.step4t}</h3>
                <p className="muted" style={{ fontSize: "var(--text-14)" }}>{t.home.step4d}</p>
              </div>
            </div>
          </div>
        </section>

        {/* 3 Pillars: Human Control, Cost Awareness, Replayability */}
        <section style={{ padding: "var(--space-8) 0", borderBottom: "1px solid var(--color-border)" }}>
          <div className="container" style={{ display: "grid", gap: "var(--space-6)" }}>
            <div>
              <div className="eyebrow" style={{ marginBottom: "var(--space-2)" }}>Fondasi Kepercayaan</div>
              <h2 style={{ fontSize: "var(--text-28)" }}>Dirancang untuk Operasi Bisnis Nyata</h2>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                gap: "var(--space-5)",
              }}
            >
              <div className="panel" style={{ display: "grid", gap: "var(--space-3)" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "var(--space-2)" }}>
                  <ShieldCheck size={20} aria-hidden="true" style={{ color: "var(--color-accent)" }} />
                  <h3 style={{ fontSize: "var(--text-18)" }}>{t.home.controlTitle}</h3>
                </div>
                <p className="muted" style={{ fontSize: "var(--text-14)" }}>{t.home.controlBody}</p>
              </div>

              <div className="panel" style={{ display: "grid", gap: "var(--space-3)" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "var(--space-2)" }}>
                  <Coins size={20} aria-hidden="true" style={{ color: "var(--color-accent)" }} />
                  <h3 style={{ fontSize: "var(--text-18)" }}>{t.home.costTitle}</h3>
                </div>
                <p className="muted" style={{ fontSize: "var(--text-14)" }}>{t.home.costBody}</p>
              </div>

              <div className="panel" style={{ display: "grid", gap: "var(--space-3)" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "var(--space-2)" }}>
                  <History size={20} aria-hidden="true" style={{ color: "var(--color-accent)" }} />
                  <h3 style={{ fontSize: "var(--text-18)" }}>{t.home.traceTitle}</h3>
                </div>
                <p className="muted" style={{ fontSize: "var(--text-14)" }}>{t.home.traceBody}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Template Catalog */}
        <section style={{ padding: "var(--space-8) 0", borderBottom: "1px solid var(--color-border)" }}>
          <div className="container" style={{ display: "grid", gap: "var(--space-6)" }}>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                alignItems: "flex-end",
                justifyContent: "space-between",
                gap: "var(--space-4)",
              }}
            >
              <div>
                <div className="eyebrow" style={{ marginBottom: "var(--space-2)" }}>Katalog Siap Pakai</div>
                <h2 style={{ fontSize: "var(--text-28)" }}>{t.home.catalogTitle}</h2>
              </div>

              <Link href="/templates" className="btn btn-secondary btn-sm">
                <span>{t.home.catalogLink}</span>
                <ArrowRight size={14} aria-hidden="true" />
              </Link>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
                gap: "var(--space-4)",
              }}
            >
              {featuredTemplates.map((template) => (
                <div
                  key={template.id}
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
                      <span className="badge badge-accent" style={{ textTransform: "capitalize" }}>
                        {template.category}
                      </span>
                      <span className="badge">v{template.version}</span>
                    </div>

                    <h3 style={{ fontSize: "var(--text-18)" }}>
                      <Link
                        href={`/templates/${template.slug}`}
                        style={{ textDecoration: "none" }}
                      >
                        {pick(template.name, locale)}
                      </Link>
                    </h3>

                    <p className="muted" style={{ fontSize: "var(--text-14)" }}>
                      {pick(template.summary, locale)}
                    </p>
                  </div>

                  <div
                    style={{
                      borderTop: "1px solid var(--color-border)",
                      paddingTop: "var(--space-3)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      fontSize: "var(--text-12)",
                    }}
                  >
                    <span className="muted">
                      {template.nodes.length} {t.templates.steps} &bull; {t.templates.approval}
                    </span>
                    <Link
                      href={`/templates/${template.slug}`}
                      className="btn btn-ghost btn-sm"
                      style={{ padding: "0 var(--space-2)" }}
                    >
                      <span>Lihat detail</span>
                      <ArrowRight size={14} aria-hidden="true" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Honesty & Trust Section */}
        <section id="honesty" style={{ padding: "var(--space-7) 0" }}>
          <div className="container">
            <div
              className="panel"
              style={{
                background: "var(--color-surface-2)",
                border: "1px solid var(--color-border-strong)",
                display: "grid",
                gap: "var(--space-3)",
                padding: "var(--space-6)",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "var(--space-2)" }}>
                <ShieldCheck size={18} aria-hidden="true" style={{ color: "var(--color-accent)" }} />
                <h3 style={{ fontSize: "var(--text-16)", fontWeight: 700 }}>
                  Komitmen Transparansi &amp; Realitas MVP
                </h3>
              </div>
              <p className="muted" style={{ fontSize: "var(--text-14)", maxWidth: "800px" }}>
                {t.home.honesty}
              </p>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section
          style={{
            padding: "var(--space-8) 0 var(--space-9) 0",
            borderTop: "1px solid var(--color-border)",
            background: "var(--color-surface)",
          }}
        >
          <div className="container" style={{ textAlign: "center", display: "grid", gap: "var(--space-4)", justifyItems: "center" }}>
            <h2 style={{ fontSize: "var(--text-32)", maxWidth: "600px" }}>
              {t.home.finalTitle}
            </h2>
            <p className="muted" style={{ fontSize: "var(--text-16)", maxWidth: "540px" }}>
              {t.home.finalBody}
            </p>
            <div style={{ display: "flex", gap: "var(--space-3)", marginTop: "var(--space-2)" }}>
              <Link href="/signup" className="btn btn-primary">
                <span>Mulai sekarang gratis</span>
                <ArrowRight size={16} aria-hidden="true" />
              </Link>
              <Link href="/templates" className="btn btn-secondary">
                <span>Jelajahi template</span>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer dict={t} />
    </div>
  );
}
