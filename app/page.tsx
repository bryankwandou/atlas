import Link from "next/link";
import {
  ArrowRight,
  ShieldCheck,
  Coins,
  History,
  Layers,
  Sparkles,
  Building2,
  TrendingUp,
  XCircle,
  CheckCircle2,
  ExternalLink,
} from "lucide-react";
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

  const industryList = [
    { id: "sales", label: t.templates.sales },
    { id: "marketing", label: t.templates.marketing },
    { id: "support", label: t.templates.support },
    { id: "property", label: t.templates.property },
    { id: "dealer", label: t.templates.dealer },
    { id: "education", label: t.templates.education },
    { id: "travel", label: t.templates.travel },
    { id: "agency", label: t.templates.agency },
    { id: "recruiting", label: t.templates.recruiting },
    { id: "finance", label: t.templates.finance },
    { id: "ecommerce", label: t.templates.ecommerce },
    { id: "services", label: t.templates.services },
  ];

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
            <div style={{ maxWidth: "860px", display: "grid", gap: "var(--space-4)" }}>
              <div style={{ display: "inline-flex" }}>
                <span className="badge badge-accent">
                  <Sparkles size={12} aria-hidden="true" />
                  <span>{t.home.eyebrow}</span>
                </span>
              </div>

              <h1 style={{ fontSize: "clamp(2.2rem, 5vw, 3.4rem)", lineHeight: 1.12, letterSpacing: "-0.02em" }}>
                {t.home.title}
              </h1>

              <p className="muted" style={{ fontSize: "var(--text-18)", maxWidth: "720px", lineHeight: 1.6 }}>
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
            <div id="demo" style={{ marginTop: "var(--space-2)" }}>
              <WorkflowCanvas dict={t} />
            </div>

            {/* Proof Strip */}
            <div
              className="panel"
              style={{
                background: "var(--color-surface)",
                borderColor: "var(--color-border-strong)",
                padding: "var(--space-3) var(--space-4)",
                display: "flex",
                flexWrap: "wrap",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "var(--space-3)",
                fontSize: "var(--text-12)",
                fontWeight: 600,
                letterSpacing: "0.04em",
              }}
            >
              <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--space-4)", alignItems: "center" }}>
                <span style={{ color: "var(--color-accent)", textTransform: "uppercase" }}>
                  {t.home.proofPillars}
                </span>
              </div>
              <span className="badge">v1.2 Production Specs</span>
            </div>

            {/* Works-with rail */}
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                alignItems: "center",
                gap: "var(--space-3)",
                fontSize: "var(--text-12)",
              }}
            >
              <span className="muted">Integrasi siap pakai (simulasi MVP sandbox):</span>
              <span className="badge">WhatsApp Business</span>
              <span className="badge">Google Sheets</span>
              <span className="badge">Gmail</span>
              <span className="badge">HubSpot / CRM</span>
              <span className="badge">Slack / Chat</span>
              <span className="badge">Webhooks &amp; HTTP API</span>
            </div>
          </div>
        </section>

        {/* Comparison: AI Chat vs Supervised Workflows */}
        <section style={{ padding: "var(--space-8) 0", borderBottom: "1px solid var(--color-border)" }}>
          <div className="container" style={{ display: "grid", gap: "var(--space-6)" }}>
            <div>
              <div className="eyebrow" style={{ marginBottom: "var(--space-2)" }}>DETERMINISME VS HALUSINASI</div>
              <h2 style={{ fontSize: "var(--text-28)" }}>{t.home.comparisonTitle}</h2>
              <p className="muted" style={{ fontSize: "var(--text-16)", maxWidth: "700px", marginTop: "var(--space-2)" }}>
                {t.home.comparisonSubtitle}
              </p>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
                gap: "var(--space-5)",
              }}
            >
              {/* Conventional AI Chat */}
              <div
                className="panel"
                style={{
                  display: "grid",
                  gap: "var(--space-4)",
                  background: "var(--color-surface-2)",
                  borderColor: "var(--color-border)",
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <h3 style={{ fontSize: "var(--text-18)", color: "var(--color-muted)" }}>{t.home.chatTitle}</h3>
                  <span className="badge" style={{ color: "var(--color-danger)", borderColor: "var(--color-danger)" }}>
                    {t.home.chatBadge}
                  </span>
                </div>

                <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gap: "var(--space-3)" }}>
                  {[
                    t.home.chatPoint1,
                    t.home.chatPoint2,
                    t.home.chatPoint3,
                    t.home.chatPoint4,
                    t.home.chatPoint5,
                  ].map((pt, idx) => (
                    <li key={idx} style={{ display: "flex", gap: "var(--space-3)", alignItems: "flex-start", fontSize: "var(--text-14)" }}>
                      <XCircle size={18} aria-hidden="true" style={{ color: "var(--color-danger)", flexShrink: 0, marginTop: "2px" }} />
                      <span className="muted">{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Atlas Supervised Workflows */}
              <div
                className="panel"
                style={{
                  display: "grid",
                  gap: "var(--space-4)",
                  background: "var(--color-surface)",
                  borderColor: "var(--color-accent)",
                  boxShadow: "var(--shadow-raised)",
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <h3 style={{ fontSize: "var(--text-18)", color: "var(--color-text)", fontWeight: 700 }}>
                    {t.home.wfTitle}
                  </h3>
                  <span className="badge badge-accent">
                    {t.home.wfBadge}
                  </span>
                </div>

                <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gap: "var(--space-3)" }}>
                  {[
                    t.home.wfPoint1,
                    t.home.wfPoint2,
                    t.home.wfPoint3,
                    t.home.wfPoint4,
                    t.home.wfPoint5,
                  ].map((pt, idx) => (
                    <li key={idx} style={{ display: "flex", gap: "var(--space-3)", alignItems: "flex-start", fontSize: "var(--text-14)" }}>
                      <CheckCircle2 size={18} aria-hidden="true" style={{ color: "var(--color-success)", flexShrink: 0, marginTop: "2px" }} />
                      <span style={{ fontWeight: 500 }}>{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Agency Multiplier Section */}
        <section
          style={{
            padding: "var(--space-8) 0",
            borderBottom: "1px solid var(--color-border)",
            background: "radial-gradient(ellipse at bottom, var(--color-surface-2), var(--color-bg))",
          }}
        >
          <div className="container" style={{ display: "grid", gap: "var(--space-6)" }}>
            <div>
              <div className="eyebrow" style={{ marginBottom: "var(--space-2)" }}>THE AGENCY LEVERAGE ENGINE</div>
              <h2 style={{ fontSize: "var(--text-28)" }}>{t.home.agencyTitle}</h2>
              <p className="muted" style={{ fontSize: "var(--text-16)", maxWidth: "700px", marginTop: "var(--space-2)" }}>
                {t.home.agencySubtitle}
              </p>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                gap: "var(--space-5)",
              }}
            >
              <div className="panel" style={{ display: "grid", gap: "var(--space-3)" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "var(--space-2)" }}>
                  <Building2 size={20} aria-hidden="true" style={{ color: "var(--color-accent)" }} />
                  <h3 style={{ fontSize: "var(--text-18)" }}>{t.home.agencyPoint1Title}</h3>
                </div>
                <p className="muted" style={{ fontSize: "var(--text-14)" }}>
                  {t.home.agencyPoint1Body}
                </p>
              </div>

              <div className="panel" style={{ display: "grid", gap: "var(--space-3)" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "var(--space-2)" }}>
                  <TrendingUp size={20} aria-hidden="true" style={{ color: "var(--color-accent)" }} />
                  <h3 style={{ fontSize: "var(--text-18)" }}>{t.home.agencyPoint2Title}</h3>
                </div>
                <p className="muted" style={{ fontSize: "var(--text-14)" }}>
                  {t.home.agencyPoint2Body}
                </p>
              </div>

              <div className="panel" style={{ display: "grid", gap: "var(--space-3)" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "var(--space-2)" }}>
                  <Layers size={20} aria-hidden="true" style={{ color: "var(--color-accent)" }} />
                  <h3 style={{ fontSize: "var(--text-18)" }}>{t.home.agencyPoint3Title}</h3>
                </div>
                <p className="muted" style={{ fontSize: "var(--text-14)" }}>
                  {t.home.agencyPoint3Body}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 12 Industries & 120+ Templates */}
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
                <div className="eyebrow" style={{ marginBottom: "var(--space-2)" }}>KATALOG MULTI-INDUSTRI</div>
                <h2 style={{ fontSize: "var(--text-28)" }}>{t.home.industriesTitle}</h2>
                <p className="muted" style={{ fontSize: "var(--text-16)", maxWidth: "600px", marginTop: "var(--space-2)" }}>
                  {t.home.industriesSubtitle}
                </p>
              </div>

              <Link href="/templates" className="btn btn-secondary btn-sm">
                <span>{t.home.catalogLink}</span>
                <ArrowRight size={14} aria-hidden="true" />
              </Link>
            </div>

            {/* 12 Industry Pills */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--space-2)" }}>
              {industryList.map((ind) => (
                <Link
                  key={ind.id}
                  href={`/templates?category=${ind.id}`}
                  className="btn btn-secondary btn-sm"
                  style={{ textDecoration: "none" }}
                >
                  <span>{ind.label}</span>
                  <span className="badge badge-accent" style={{ marginLeft: "var(--space-1)", padding: "2px 6px" }}>
                    10
                  </span>
                </Link>
              ))}
            </div>

            {/* Featured Templates Grid */}
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

        {/* Dual Pricing Preview Section */}
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
                <div className="eyebrow" style={{ marginBottom: "var(--space-2)" }}>INVESTASI &amp; SKALA BISNIS</div>
                <h2 style={{ fontSize: "var(--text-28)" }}>{t.home.pricingTitle}</h2>
                <p className="muted" style={{ fontSize: "var(--text-16)", maxWidth: "600px", marginTop: "var(--space-2)" }}>
                  {t.home.pricingSubtitle}
                </p>
              </div>

              <Link href="/pricing" className="btn btn-secondary btn-sm">
                <span>{t.home.viewPricingDetails}</span>
                <ArrowRight size={14} aria-hidden="true" />
              </Link>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
                gap: "var(--space-5)",
              }}
            >
              {/* SaaS Subscription Tiers */}
              <div
                className="panel"
                style={{
                  display: "grid",
                  gap: "var(--space-4)",
                  background: "var(--color-surface)",
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <h3 style={{ fontSize: "var(--text-18)", fontWeight: 700 }}>{t.home.saasHeading}</h3>
                  <span className="badge">Self-Serve</span>
                </div>

                <div style={{ display: "grid", gap: "var(--space-3)" }}>
                  <div style={{ borderBottom: "1px solid var(--color-border)", paddingBottom: "var(--space-2)" }}>
                    <div style={{ fontWeight: 600, fontSize: "var(--text-14)" }}>{t.home.planFree}</div>
                    <div className="muted" style={{ fontSize: "var(--text-12)" }}>{t.home.planFreeDesc}</div>
                  </div>
                  <div style={{ borderBottom: "1px solid var(--color-border)", paddingBottom: "var(--space-2)" }}>
                    <div style={{ fontWeight: 600, fontSize: "var(--text-14)" }}>{t.home.planStarter}</div>
                    <div className="muted" style={{ fontSize: "var(--text-12)" }}>{t.home.planStarterDesc}</div>
                  </div>
                  <div style={{ borderBottom: "1px solid var(--color-border)", paddingBottom: "var(--space-2)" }}>
                    <div style={{ fontWeight: 600, fontSize: "var(--text-14)" }}>{t.home.planGrowth}</div>
                    <div className="muted" style={{ fontSize: "var(--text-12)" }}>{t.home.planGrowthDesc}</div>
                  </div>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: "var(--text-14)" }}>{t.home.planAgency}</div>
                    <div className="muted" style={{ fontSize: "var(--text-12)" }}>{t.home.planAgencyDesc}</div>
                  </div>
                </div>

                <Link href="/signup" className="btn btn-primary btn-sm" style={{ justifySelf: "start" }}>
                  <span>Daftar workspace</span>
                </Link>
              </div>

              {/* Done-For-You Sprints */}
              <div
                className="panel"
                style={{
                  display: "grid",
                  gap: "var(--space-4)",
                  background: "var(--color-surface-2)",
                  borderColor: "var(--color-accent)",
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <h3 style={{ fontSize: "var(--text-18)", fontWeight: 700 }}>{t.home.dfyHeading}</h3>
                  <span className="badge badge-accent">Turnkey Execution</span>
                </div>

                <div style={{ display: "grid", gap: "var(--space-3)" }}>
                  <div style={{ borderBottom: "1px solid var(--color-border)", paddingBottom: "var(--space-2)" }}>
                    <div style={{ fontWeight: 600, fontSize: "var(--text-14)" }}>{t.home.dfyAudit}</div>
                    <div className="muted" style={{ fontSize: "var(--text-12)" }}>{t.home.dfyAuditDesc}</div>
                  </div>
                  <div style={{ borderBottom: "1px solid var(--color-border)", paddingBottom: "var(--space-2)" }}>
                    <div style={{ fontWeight: 600, fontSize: "var(--text-14)" }}>{t.home.dfySprint}</div>
                    <div className="muted" style={{ fontSize: "var(--text-12)" }}>{t.home.dfySprintDesc}</div>
                  </div>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: "var(--text-14)" }}>{t.home.dfyRetainer}</div>
                    <div className="muted" style={{ fontSize: "var(--text-12)" }}>{t.home.dfyRetainerDesc}</div>
                  </div>
                </div>

                <Link href="/pricing" className="btn btn-secondary btn-sm" style={{ justifySelf: "start" }}>
                  <span>Pesan jadwal sprint</span>
                </Link>
              </div>
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
                <span>Jelajahi 120 template</span>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer dict={t} />
    </div>
  );
}
