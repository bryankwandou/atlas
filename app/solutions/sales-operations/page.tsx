import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle2, ShieldCheck, Sparkles, Target, Zap, Clock, Lock, Users } from "lucide-react";
import { getLocale, getDict } from "@/lib/i18n";
import { getSession } from "@/lib/auth/session";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { LeadCaptureForm } from "@/components/LeadCaptureForm";
import { SchemaOrgJsonLd } from "@/components/SchemaOrgJsonLd";
import { OrbitalRings } from "@/components/OrbitalRings";
import { OperatorConsoleMockup } from "@/components/OperatorConsoleMockup";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Sales Operations & Inbound Triage Automation | Atlas",
    description:
      "Empower your RevOps team with deterministic lead scoring, instant pipeline updates, and supervised outreach drafts in under 60 seconds.",
    alternates: {
      canonical: "https://atlas-automation.vercel.app/solutions/sales-operations",
    },
  };
}

export default async function SalesOperationsSolutionPage() {
  const locale = await getLocale();
  const { t } = await getDict();
  const session = await getSession();
  const isEn = locale === "en";

  return (
    <div className="atelier-dark-page" style={{ display: "flex", flexDirection: "column" }}>
      <SchemaOrgJsonLd type="software" />
      <Navbar locale={locale} dict={t} isAuthenticated={!!session} />

      <main id="main-content" style={{ flex: 1 }}>
        {/* Hero Section with Orbital Glow & Operator Console Mockup */}
        <section className="atelier-glow-hero" style={{ padding: "clamp(56px, 8vw, 96px) 0 clamp(48px, 6vw, 72px) 0" }}>
          <div style={{ position: "absolute", right: "-120px", top: "-100px", pointerEvents: "none" }}>
            <OrbitalRings size={800} />
          </div>

          <div className="container" style={{ position: "relative", zIndex: 10, display: "grid", gap: "var(--space-7)" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1.05fr 0.95fr", gap: "var(--space-6)", alignItems: "center" }}>
              {/* Left Column: Commercial Pitch */}
              <div style={{ display: "grid", gap: "var(--space-4)" }}>
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
                    {isEn ? "Sales Operations Infrastructure · 5-Day Sprint" : "Infrastruktur Sales Ops · Sprint Produksi 5 Hari"}
                  </span>
                </div>

                <h1
                  className="font-display"
                  style={{
                    fontSize: "clamp(2.4rem, 4.5vw, 3.8rem)",
                    lineHeight: 1.05,
                    letterSpacing: "-0.04em",
                    fontWeight: 900,
                  }}
                >
                  {isEn ? (
                    <>
                      Qualify Inbound Leads &amp; Route Deals in Under{" "}
                      <span className="font-serif italic font-normal">
                        60 Seconds
                      </span>
                      .
                    </>
                  ) : (
                    <>
                      Respon Setiap Peluang Penjualan dalam Waktu Kurang dari{" "}
                      <span className="font-serif italic font-normal">
                        60 Detik
                      </span>
                      .
                    </>
                  )}
                </h1>

                <p style={{ fontSize: "17px", lineHeight: 1.6, color: "#a8a397", maxWidth: "520px" }}>
                  {isEn
                    ? "78% of B2B enterprise buyers purchase from the vendor that responds first. Atlas enriches inbound records, scores buyer urgency against locked rubrics, and prepares approved WhatsApp outreach awaiting one-click signoff."
                    : "Riset membuktikan 78% pembeli B2B bertransaksi dengan pihak pertama yang merespon. Atlas mengotomatisasi pengayaan profil lead, penilaian budget, dan penyiapan draf follow-up WhatsApp dengan izin 1 klik sales rep Anda."}
                </p>

                <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "var(--space-3)", paddingTop: "var(--space-2)" }}>
                  <a
                    href="#audit-form"
                    className="btn btn-primary"
                    style={{ borderRadius: "9999px", padding: "0 24px", fontWeight: 700 }}
                  >
                    <span>{isEn ? "Deploy 5-Day Sales Sprint (Rp7.5M)" : "Deploy Sprint Sales (Rp7.5jt)"}</span>
                    <ArrowRight size={16} aria-hidden="true" />
                  </a>
                  <a
                    href="#architecture"
                    className="btn btn-secondary"
                    style={{
                      borderRadius: "9999px",
                      padding: "0 20px",
                      background: "rgba(255, 255, 255, 0.05)",
                      color: "#f4efe6",
                      borderColor: "rgba(255, 255, 255, 0.15)",
                    }}
                  >
                    <span>{isEn ? "Inspect Architecture" : "Inspeksi Arsitektur"}</span>
                  </a>
                </div>

                {/* Telemetry Stats Strip */}
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(3, 1fr)",
                    gap: "var(--space-4)",
                    paddingTop: "var(--space-4)",
                    borderTop: "1px solid rgba(255, 255, 255, 0.08)",
                  }}
                >
                  <div>
                    <span className="font-display" style={{ display: "block", fontSize: "22px", fontWeight: 800 }}>
                      &lt; 60s
                    </span>
                    <span className="font-mono text-12" style={{ color: "#8a857b", textTransform: "uppercase", fontSize: "10px" }}>
                      {isEn ? "First Touch Window" : "Jendela Respon"}
                    </span>
                  </div>
                  <div>
                    <span className="font-display" style={{ display: "block", fontSize: "22px", fontWeight: 800, color: "#10b981" }}>
                      100%
                    </span>
                    <span className="font-mono text-12" style={{ color: "#8a857b", textTransform: "uppercase", fontSize: "10px" }}>
                      {isEn ? "Human Signoff" : "Verifikasi Sales"}
                    </span>
                  </div>
                  <div>
                    <span className="font-display" style={{ display: "block", fontSize: "22px", fontWeight: 800 }}>
                      2-Way
                    </span>
                    <span className="font-mono text-12" style={{ color: "#8a857b", textTransform: "uppercase", fontSize: "10px" }}>
                      {isEn ? "CRM Sync Active" : "Sinkronisasi CRM"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Right Column: High-Fidelity Console Mockup */}
              <div>
                <OperatorConsoleMockup isEn={isEn} />
              </div>
            </div>
          </div>
        </section>

        {/* Sales Operations Architecture */}
        <section id="architecture" style={{ padding: "var(--space-8) 0", borderBottom: "1px solid rgba(255, 255, 255, 0.08)" }}>
          <div className="container" style={{ display: "grid", gap: "var(--space-6)" }}>
            <div>
              <div className="font-mono text-12" style={{ color: "var(--color-accent)", letterSpacing: "0.14em", textTransform: "uppercase", fontWeight: 700 }}>
                REVOPS PIPELINE ACCELERATION
              </div>
              <h2 className="font-display" style={{ fontSize: "clamp(28px, 3.5vw, 42px)", fontWeight: 800, marginTop: "var(--space-2)" }}>
                {isEn ? "Zero Inbound Decay. 100% Rep Accountability." : "Nol Keterlambatan Respon. 100% Akuntabilitas Tim."}
              </h2>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "var(--space-4)" }}>
              <div className="atelier-dossier-card">
                <div>
                  <span className="font-mono text-12" style={{ color: "var(--color-accent)", fontWeight: 700 }}>01 · FAST QUALIFICATION</span>
                  <h3 className="font-display" style={{ fontSize: "19px", fontWeight: 800, marginTop: "8px" }}>
                    {isEn ? "Deterministic Lead Scoring" : "Skoring Kualifikasi Deterministik"}
                  </h3>
                  <p style={{ color: "#9c978e", fontSize: "14px", marginTop: "8px", lineHeight: 1.6 }}>
                    {isEn
                      ? "Evaluates incoming deal sizes, budget parameters, and organizational authority against your exact sales rubrics in under 2 seconds."
                      : "Mengevaluasi nilai kesepakatan, parameter anggaran, dan otoritas pengambil keputusan sesuai kriteria penjualan Anda dalam waktu kurang dari 2 detik."}
                  </p>
                </div>
              </div>

              <div className="atelier-dossier-card">
                <div>
                  <span className="font-mono text-12" style={{ color: "var(--color-accent)", fontWeight: 700 }}>02 · REP EMPOWERMENT</span>
                  <h3 className="font-display" style={{ fontSize: "19px", fontWeight: 800, marginTop: "8px" }}>
                    {isEn ? "Context-Aware WhatsApp Drafts" : "Draf Respon Terkontekstual"}
                  </h3>
                  <p style={{ color: "#9c978e", fontSize: "14px", marginTop: "8px", lineHeight: 1.6 }}>
                    {isEn
                      ? "Sales representatives don't waste time typing greetings. A tailored response is pre-loaded in their console, ready for review and transmission."
                      : "Sales rep tidak perlu membuang waktu mengetik pesan pembuka manual. Respon personal telah disiapkan di konsol, siap dikirim setelah diperiksa."}
                  </p>
                </div>
              </div>

              <div className="atelier-dossier-card">
                <div>
                  <span className="font-mono text-12" style={{ color: "var(--color-accent)", fontWeight: 700 }}>03 · DUPLICATE PREVENTION</span>
                  <h3 className="font-display" style={{ fontSize: "19px", fontWeight: 800, marginTop: "8px" }}>
                    {isEn ? "Cross-Channel Deduplication" : "Proteksi Anti-Duplikasi"}
                  </h3>
                  <p style={{ color: "#9c978e", fontSize: "14px", marginTop: "8px", lineHeight: 1.6 }}>
                    {isEn
                      ? "Identifies returning contacts across forms, email, and WhatsApp to prevent awkward multiple dispatches from different reps."
                      : "Mendeteksi kontak lama di seluruh form, email, dan WhatsApp agar tidak terjadi pengiriman pesan ganda yang canggung dari staf berbeda."}
                  </p>
                </div>
              </div>

              <div className="atelier-dossier-card">
                <div>
                  <span className="font-mono text-12" style={{ color: "var(--color-accent)", fontWeight: 700 }}>04 · PIPELINE INTEGRITY</span>
                  <h3 className="font-display" style={{ fontSize: "19px", fontWeight: 800, marginTop: "8px" }}>
                    {isEn ? "Synchronous CRM Progression" : "Pembaruan Pipeline Sinkron"}
                  </h3>
                  <p style={{ color: "#9c978e", fontSize: "14px", marginTop: "8px", lineHeight: 1.6 }}>
                    {isEn
                      ? "HubSpot, Pipedrive, and Slack channels update simultaneously with full audit logs and qualification tags for every deal."
                      : "HubSpot, Pipedrive, dan notifikasi Slack diperbarui secara simultan lengkap dengan jejak audit dan tag kualifikasi setiap deal."}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Embedded Lead Capture Funnel */}
        <section id="audit-form" style={{ padding: "var(--space-8) 0" }}>
          <div className="container" style={{ maxWidth: "680px" }}>
            <div style={{ textAlign: "center", marginBottom: "var(--space-5)" }}>
              <span className="font-mono text-12" style={{ color: "var(--color-accent)", textTransform: "uppercase", letterSpacing: "0.14em", fontWeight: 700 }}>
                {isEn ? "RESERVE YOUR SALES SPRINT" : "KONSULTASI & BOOKING SPRINT"}
              </span>
              <h2 className="font-display" style={{ fontSize: "var(--text-32)", fontWeight: 800, marginTop: "var(--space-2)" }}>
                {isEn ? "Book Your 30-Minute Architecture Audit" : "Jadwalkan Audit Arsitektur 30 Menit"}
              </h2>
              <p style={{ color: "#9c978e", fontSize: "15px", marginTop: "var(--space-2)" }}>
                {isEn
                  ? "We evaluate your RevOps workflow and design a 5-day turnkey implementation tailored to your sales process."
                  : "Kami mengaudit alur RevOps Anda dan merancang implementasi 5 hari kerja yang disesuaikan dengan proses penjualan Anda."}
              </p>
            </div>

            <LeadCaptureForm locale={locale} source="solution_sales_operations" />
          </div>
        </section>
      </main>

      <Footer dict={t} />
    </div>
  );
}
