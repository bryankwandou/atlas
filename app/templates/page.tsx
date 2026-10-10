import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Search, Sparkles, ShieldCheck, Lock, Clock, Calendar, Zap, CheckCircle2 } from "lucide-react";
import { getLocale, getDict, pick } from "@/lib/i18n";
import { getSession } from "@/lib/auth/session";
import { templates } from "@/lib/templates/catalog";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { OrbitalRings } from "@/components/OrbitalRings";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "120 Governed Operational Systems & Architecture Index | Atlas",
    description:
      "Explore 120 battle-tested enterprise automation architectures across 12 commercial industries. Deployed turnkey in 5 business days under strict mutual NDA.",
    alternates: {
      canonical: "https://atlas-automation.vercel.app/templates",
    },
  };
}

interface Props {
  searchParams: Promise<{ category?: string; q?: string }>;
}

export default async function TemplatesPage({ searchParams }: Props) {
  const { category, q } = await searchParams;
  const locale = await getLocale();
  const { t } = await getDict();
  const session = await getSession();
  const isEn = locale === "en";

  const query = (q || "").trim().toLowerCase();
  const selectedCat = category || "all";

  const filtered = templates.filter((tpl) => {
    const matchesCat = selectedCat === "all" || tpl.category === selectedCat;
    const name = pick(tpl.name, locale).toLowerCase();
    const summary = pick(tpl.summary, locale).toLowerCase();
    const matchesQuery = !query || name.includes(query) || summary.includes(query) || tpl.tags.some((t) => t.includes(query));
    return matchesCat && matchesQuery;
  });

  const categories = [
    { id: "all", label: isEn ? "All Verticals" : "Semua Vertikal" },
    { id: "sales", label: isEn ? "Inbound Sales" : "Penjualan Inbound" },
    { id: "agency", label: isEn ? "Marketing Agencies" : "Agensi Pemasaran" },
    { id: "support", label: isEn ? "Customer Support" : "Customer Support" },
    { id: "property", label: isEn ? "Real Estate & Assets" : "Properti & Real Estate" },
    { id: "dealer", label: isEn ? "Automotive Networks" : "Dealer Otomotif" },
    { id: "finance", label: isEn ? "Financial Services" : "Layanan Finansial" },
    { id: "recruiting", label: isEn ? "Recruitment & HR" : "Rekrutmen & HR" },
    { id: "ecommerce", label: isEn ? "E-Commerce" : "E-Commerce" },
    { id: "education", label: isEn ? "Education" : "Pendidikan" },
    { id: "travel", label: isEn ? "Travel & Hospitality" : "Travel & Wisata" },
    { id: "operations", label: isEn ? "Operations" : "Operasi Bisnis" },
  ];

  return (
    <div className="atelier-dark-page" style={{ display: "flex", flexDirection: "column" }}>
      <Navbar locale={locale} dict={t} isAuthenticated={!!session} />

      <main id="main-content" style={{ flex: 1 }}>
        {/* Hero Section with Orbital Glow */}
        <section className="atelier-glow-hero" style={{ padding: "clamp(56px, 8vw, 88px) 0 clamp(40px, 6vw, 64px) 0" }}>
          <div style={{ position: "absolute", right: "-140px", top: "-120px", pointerEvents: "none" }}>
            <OrbitalRings size={780} />
          </div>

          <div className="container" style={{ position: "relative", zIndex: 10, display: "grid", gap: "var(--space-5)" }}>
            <div style={{ display: "inline-flex" }}>
              <span
                className="font-mono"
                style={{
                  fontSize: "11px",
                  fontWeight: 700,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: "var(--color-accent)",
                  background: "rgba(255, 255, 255, 0.05)",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                  padding: "4px 12px",
                  borderRadius: "9999px",
                }}
              >
                {isEn ? "Enterprise Systems Index · 5-Day Turnkey Sprints" : "Indeks Arsitektur Enterprise · Sprint Turnkey 5 Hari"}
              </span>
            </div>

            <h1
              className="font-display"
              style={{
                fontSize: "clamp(2.5rem, 5vw, 4.2rem)",
                lineHeight: 1.05,
                letterSpacing: "-0.04em",
                fontWeight: 900,
                maxWidth: "960px",
              }}
            >
              {isEn ? (
                <>
                  120 Governed Operational Systems.{" "}
                  <span className="font-serif italic font-normal">
                    Zero DIY Scripts
                  </span>
                  .
                </>
              ) : (
                <>
                  120 Sistem Operasional Terkelola.{" "}
                  <span className="font-serif italic font-normal">
                    Bukan Skrip Mainan
                  </span>
                  .
                </>
              )}
            </h1>

            <p style={{ fontSize: "17px", lineHeight: 1.6, color: "#a8a397", maxWidth: "780px" }}>
              {isEn
                ? "Every blueprint below is deployed as a turnkey production pipeline with private tenant airgapping, custom qualification rubrics, and 14 days of dedicated SLA monitoring under mutual NDA. Fixed fee of Rp7.500.000 flat."
                : "Setiap sistem di bawah ini kami bangun dan terapkan secara turnkey ke infrastruktur perusahaan Anda dengan isolasi data privat, kalibrasi kriteria kualifikasi, dan 14 hari pemantauan SLA aktif di bawah jaminan NDA resmi (Rp7.500.000 flat)."}
            </p>

            {/* Commercial Trust Strip */}
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                alignItems: "center",
                gap: "var(--space-5)",
                paddingTop: "var(--space-3)",
                borderTop: "1px solid rgba(255, 255, 255, 0.08)",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "13px" }}>
                <Clock size={15} style={{ color: "var(--color-accent)" }} />
                <span>{isEn ? "5-Day Turnkey Handover" : "Garansi Serah Terima 5 Hari"}</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "13px" }}>
                <ShieldCheck size={15} style={{ color: "#10b981" }} />
                <span>{isEn ? "100% Human Review Gatekeeper" : "Gerbang Persetujuan Tim Wajib"}</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "13px" }}>
                <Lock size={15} style={{ color: "var(--color-accent)" }} />
                <span>{isEn ? "Mutual NDA & 100% Code Ownership" : "NDA Resmi & Kode Milik Klien 100%"}</span>
              </div>
            </div>
          </div>
        </section>

        {/* Catalog Search & Category Filter Section */}
        <section style={{ padding: "var(--space-7) 0 var(--space-9) 0" }}>
          <div className="container" style={{ display: "grid", gap: "var(--space-6)" }}>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "var(--space-4)",
                borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
                paddingBottom: "var(--space-4)",
              }}
            >
              {/* Category Filter Pills */}
              <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                {categories.map((c) => (
                  <Link
                    key={c.id}
                    href={`/templates?category=${c.id}${query ? `&q=${encodeURIComponent(query)}` : ""}`}
                    className="btn btn-sm"
                    style={{
                      textDecoration: "none",
                      borderRadius: "9999px",
                      fontSize: "12px",
                      fontWeight: 700,
                      background: selectedCat === c.id ? "var(--color-accent)" : "rgba(255, 255, 255, 0.05)",
                      color: selectedCat === c.id ? "#ffffff" : "#c4bfb6",
                      border: "1px solid rgba(255, 255, 255, 0.08)",
                      padding: "0 14px",
                    }}
                  >
                    {c.label}
                  </Link>
                ))}
              </div>

              {/* Search Field */}
              <form method="GET" action="/templates" style={{ display: "flex", gap: "var(--space-2)", minWidth: "260px" }}>
                {selectedCat !== "all" && <input type="hidden" name="category" value={selectedCat} />}
                <div style={{ position: "relative", width: "100%" }}>
                  <Search
                    size={16}
                    aria-hidden="true"
                    style={{ position: "absolute", left: "14px", top: "14px", color: "#8a857b" }}
                  />
                  <input
                    type="search"
                    name="q"
                    defaultValue={query}
                    placeholder={isEn ? "Search systems by industry or SLA..." : "Cari sistem berdasarkan industri..."}
                    aria-label={t.templates.search}
                    style={{
                      width: "100%",
                      minHeight: "44px",
                      paddingLeft: "38px",
                      paddingRight: "14px",
                      background: "#111215",
                      border: "1px solid rgba(255, 255, 255, 0.12)",
                      borderRadius: "9999px",
                      color: "#f4efe6",
                      outline: "none",
                      fontSize: "13px",
                    }}
                  />
                </div>
              </form>
            </div>

            {/* Dossier Cards Grid (Redesigned as Enterprise Systems) */}
            {filtered.length === 0 ? (
              <div style={{ textAlign: "center", padding: "64px 0", color: "#8a857b" }}>
                <p>{t.templates.empty}</p>
                <Link
                  href="/templates"
                  className="btn btn-secondary btn-sm"
                  style={{ marginTop: "12px", borderRadius: "9999px", background: "rgba(255, 255, 255, 0.06)", color: "#f4efe6" }}
                >
                  {isEn ? "Show all systems" : "Tampilkan semua sistem"}
                </Link>
              </div>
            ) : (
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))",
                  gap: "var(--space-5)",
                }}
              >
                {filtered.map((template, idx) => (
                  <article
                    key={template.id}
                    className="atelier-dossier-card"
                  >
                    <div>
                      {/* Dossier Header Strip */}
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "8px", borderBottom: "1px solid rgba(255, 255, 255, 0.06)", paddingBottom: "10px" }}>
                        <span className="font-mono" style={{ fontSize: "11px", color: "var(--color-accent)", fontWeight: 700, letterSpacing: "0.08em" }}>
                          DOSSIER // {template.category.toUpperCase()}-{(idx + 1).toString().padStart(2, "0")}
                        </span>
                        <span
                          className="badge"
                          style={{
                            background: "rgba(16, 185, 129, 0.12)",
                            color: "#34d399",
                            border: "1px solid rgba(16, 185, 129, 0.25)",
                            fontSize: "10px",
                            fontWeight: 700,
                          }}
                        >
                          AIRGAPPED SLA
                        </span>
                      </div>

                      {/* System Title */}
                      <h2 className="font-display" style={{ fontSize: "20px", fontWeight: 800, marginTop: "14px", lineHeight: 1.3 }}>
                        <Link
                          href={`/templates/${template.slug}`}
                          style={{ textDecoration: "none", color: "#f4efe6" }}
                        >
                          {pick(template.name, locale)}
                        </Link>
                      </h2>

                      {/* Executive Impact Summary */}
                      <p style={{ color: "#9c978e", fontSize: "14px", marginTop: "10px", lineHeight: 1.6 }}>
                        {pick(template.summary, locale)}
                      </p>
                    </div>

                    <div>
                      {/* Telemetry Metric Strip */}
                      <div
                        style={{
                          display: "grid",
                          gridTemplateColumns: "repeat(3, 1fr)",
                          gap: "1px",
                          background: "rgba(255, 255, 255, 0.08)",
                          border: "1px solid rgba(255, 255, 255, 0.08)",
                          borderRadius: "8px",
                          overflow: "hidden",
                          marginBottom: "14px",
                        }}
                      >
                        <div style={{ background: "rgba(255, 255, 255, 0.02)", padding: "8px 10px", textAlign: "center" }}>
                          <span className="font-mono" style={{ fontSize: "9px", color: "#8a857b", textTransform: "uppercase", display: "block" }}>
                            Intake
                          </span>
                          <span className="font-mono" style={{ fontSize: "11px", fontWeight: 700, color: "#f4efe6" }}>
                            &lt; 45s
                          </span>
                        </div>
                        <div style={{ background: "rgba(255, 255, 255, 0.02)", padding: "8px 10px", textAlign: "center" }}>
                          <span className="font-mono" style={{ fontSize: "9px", color: "#8a857b", textTransform: "uppercase", display: "block" }}>
                            Safety
                          </span>
                          <span className="font-mono" style={{ fontSize: "11px", fontWeight: 700, color: "#10b981" }}>
                            Zero-Leak
                          </span>
                        </div>
                        <div style={{ background: "rgba(255, 255, 255, 0.02)", padding: "8px 10px", textAlign: "center" }}>
                          <span className="font-mono" style={{ fontSize: "9px", color: "#8a857b", textTransform: "uppercase", display: "block" }}>
                            Sprint
                          </span>
                          <span className="font-mono" style={{ fontSize: "11px", fontWeight: 700, color: "var(--color-accent)" }}>
                            5 Days
                          </span>
                        </div>
                      </div>

                      {/* Action Links */}
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          borderTop: "1px solid rgba(255, 255, 255, 0.06)",
                          paddingTop: "12px",
                        }}
                      >
                        <span style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "12px", color: "#8a857b" }} className="font-mono">
                          <ShieldCheck size={13} style={{ color: "#10b981" }} />
                          <span>Human Gate</span>
                        </span>

                        <Link
                          href={`/templates/${template.slug}`}
                          className="btn btn-sm"
                          style={{
                            background: "var(--color-accent)",
                            color: "#ffffff",
                            borderRadius: "9999px",
                            padding: "0 14px",
                            fontSize: "12px",
                            fontWeight: 700,
                            textDecoration: "none",
                          }}
                        >
                          <span>{isEn ? "Commission (Rp7.5M)" : "Spesifikasi Sistem"}</span>
                          <ArrowRight size={13} aria-hidden="true" />
                        </Link>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer dict={t} />
    </div>
  );
}
