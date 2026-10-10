import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle2, ShieldCheck, Sparkles, Building2, TrendingUp, Layers, Users, Lock, Clock } from "lucide-react";
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
    title: "Marketing Agency Workflow Automation & Inbound Triage | Atlas",
    description:
      "Automate inbound lead triage, budget scoring, and WhatsApp follow-up drafting across multi-client retainer accounts. 100% human-approved before sending.",
    alternates: {
      canonical: "https://atlas-automation.vercel.app/solutions/marketing-agencies",
    },
  };
}

export default async function MarketingAgenciesSolutionPage() {
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
                    {isEn ? "Agency Infrastructure · 5-Day Production Sprint" : "Infrastruktur Agensi · Sprint Produksi 5 Hari"}
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
                      Scale Your Agency Capacity Without Adding{" "}
                      <span className="font-serif italic font-normal">
                        Admin Overhead
                      </span>
                      .
                    </>
                  ) : (
                    <>
                      Skalakan Portofolio Klien Agensi Tanpa Menambah{" "}
                      <span className="font-serif italic font-normal">
                        Beban Karyawan
                      </span>
                      .
                    </>
                  )}
                </h1>

                <p style={{ fontSize: "17px", lineHeight: 1.6, color: "#a8a397", maxWidth: "520px" }}>
                  {isEn
                    ? "Inbound ad leads decay within minutes. Atlas ingests Meta and TikTok campaign forms, qualifies prospect budgets, and synthesizes branded WhatsApp drafts—requiring only one click from your account manager to dispatch."
                    : "Lead iklan yang masuk sering terlambat direspon. Atlas menangkap form iklan Meta dan TikTok, menilai kelayakan anggaran prospek, dan menyiapkan draf WhatsApp resmi—hanya butuh satu klik dari account manager Anda untuk terkirim."}
                </p>

                <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "var(--space-3)", paddingTop: "var(--space-2)" }}>
                  <a
                    href="#audit-form"
                    className="btn btn-primary"
                    style={{ borderRadius: "9999px", padding: "0 24px", fontWeight: 700 }}
                  >
                    <span>{isEn ? "Deploy 5-Day Sprint (Rp7.5M)" : "Deploy Sprint Agensi (Rp7.5jt)"}</span>
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
                      &lt; 45s
                    </span>
                    <span className="font-mono text-12" style={{ color: "#8a857b", textTransform: "uppercase", fontSize: "10px" }}>
                      {isEn ? "Speed to Lead" : "Kecepatan Respon"}
                    </span>
                  </div>
                  <div>
                    <span className="font-display" style={{ display: "block", fontSize: "22px", fontWeight: 800, color: "#10b981" }}>
                      100%
                    </span>
                    <span className="font-mono text-12" style={{ color: "#8a857b", textTransform: "uppercase", fontSize: "10px" }}>
                      {isEn ? "Human Review Gate" : "Verifikasi Manusia"}
                    </span>
                  </div>
                  <div>
                    <span className="font-display" style={{ display: "block", fontSize: "22px", fontWeight: 800 }}>
                      30+
                    </span>
                    <span className="font-mono text-12" style={{ color: "#8a857b", textTransform: "uppercase", fontSize: "10px" }}>
                      {isEn ? "Clients per Team" : "Kapasitas Akun"}
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

        {/* 4 Core Agency Leverages */}
        <section id="architecture" style={{ padding: "var(--space-8) 0", borderBottom: "1px solid rgba(255, 255, 255, 0.08)" }}>
          <div className="container" style={{ display: "grid", gap: "var(--space-6)" }}>
            <div>
              <div className="font-mono text-12" style={{ color: "var(--color-accent)", letterSpacing: "0.14em", textTransform: "uppercase", fontWeight: 700 }}>
                THE AGENCY LEVERAGE ENGINE
              </div>
              <h2 className="font-display" style={{ fontSize: "clamp(28px, 3.5vw, 42px)", fontWeight: 800, marginTop: "var(--space-2)" }}>
                {isEn ? "Engineered for Multi-Client Retainer Operations" : "Dirancang untuk Efisiensi Operasi Multi-Klien"}
              </h2>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "var(--space-4)" }}>
              <div className="atelier-dossier-card">
                <div>
                  <span className="font-mono text-12" style={{ color: "var(--color-accent)", fontWeight: 700 }}>01 · AIRGAP ISOLATION</span>
                  <h3 className="font-display" style={{ fontSize: "19px", fontWeight: 800, marginTop: "8px" }}>
                    {isEn ? "Tenant Data Airgap" : "Isolasi Data Antar Klien"}
                  </h3>
                  <p style={{ color: "#9c978e", fontSize: "14px", marginTop: "8px", lineHeight: 1.6 }}>
                    {isEn
                      ? "Manage 30+ client brands simultaneously with zero data co-mingling. Each client operates in a cryptographically isolated workspace with private CRM credentials."
                      : "Kelola 30+ brand klien secara bersamaan tanpa risiko kebocoran data. Setiap klien berjalan dalam ruang kerja terisolasi dengan kredensial CRM privat masing-masing."}
                  </p>
                </div>
              </div>

              <div className="atelier-dossier-card">
                <div>
                  <span className="font-mono text-12" style={{ color: "var(--color-accent)", fontWeight: 700 }}>02 · ZERO HALLUCINATION</span>
                  <h3 className="font-display" style={{ fontSize: "19px", fontWeight: 800, marginTop: "8px" }}>
                    {isEn ? "Mandatory Operator Sign-off" : "Persetujuan Tim 1-Klik"}
                  </h3>
                  <p style={{ color: "#9c978e", fontSize: "14px", marginTop: "8px", lineHeight: 1.6 }}>
                    {isEn
                      ? "Your agency reputation remains safe. AI only drafts responses against locked rubrics; your account manager approves or modifies with a single click."
                      : "Reputasi agensi Anda terlindungi penuh. AI hanya menyusun draf sesuai batasan resmi; account manager Anda yang menyetujui atau mengedit draf tersebut."}
                  </p>
                </div>
              </div>

              <div className="atelier-dossier-card">
                <div>
                  <span className="font-mono text-12" style={{ color: "var(--color-accent)", fontWeight: 700 }}>03 · SPEED TO LEAD</span>
                  <h3 className="font-display" style={{ fontSize: "19px", fontWeight: 800, marginTop: "8px" }}>
                    {isEn ? "Sub-60s Inbound Response" : "Respon Cepat Sub-60 Detik"}
                  </h3>
                  <p style={{ color: "#9c978e", fontSize: "14px", marginTop: "8px", lineHeight: 1.6 }}>
                    {isEn
                      ? "Eliminate lead decay from Facebook, Google, and TikTok ad campaigns. Hot buyers receive immediate engagement while purchase intent is at its peak."
                      : "Hapus jeda respon pada prospek kampanye iklan Meta dan TikTok. Pembeli potensial segera mendapatkan respon saat minat beli mereka masih tinggi."}
                  </p>
                </div>
              </div>

              <div className="atelier-dossier-card">
                <div>
                  <span className="font-mono text-12" style={{ color: "var(--color-accent)", fontWeight: 700 }}>04 · TWO-WAY SYNC</span>
                  <h3 className="font-display" style={{ fontSize: "19px", fontWeight: 800, marginTop: "8px" }}>
                    {isEn ? "Automated CRM Stage Pipeline" : "Sinkronisasi CRM Otomatis"}
                  </h3>
                  <p style={{ color: "#9c978e", fontSize: "14px", marginTop: "8px", lineHeight: 1.6 }}>
                    {isEn
                      ? "Approved dispatches instantly update deal stages in HubSpot, Pipedrive, or Google Sheets without administrative copy-pasting."
                      : "Pesan yang disetujui secara otomatis memperbarui status peluang di HubSpot, Pipedrive, atau Google Sheets tanpa ketik manual."}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 5-Day Sprint Package Deliverables */}
        <section style={{ padding: "var(--space-8) 0", borderBottom: "1px solid rgba(255, 255, 255, 0.08)", background: "rgba(255, 255, 255, 0.02)" }}>
          <div className="container" style={{ display: "grid", gap: "var(--space-6)", maxWidth: "900px" }}>
            <div style={{ textAlign: "center", display: "grid", gap: "var(--space-2)" }}>
              <div className="font-mono text-12" style={{ color: "var(--color-accent)", letterSpacing: "0.14em", textTransform: "uppercase", fontWeight: 700 }}>
                TURNKEY COMMERCIAL SPECIFICATION
              </div>
              <h2 className="font-display" style={{ fontSize: "clamp(28px, 3.5vw, 38px)", fontWeight: 800 }}>
                {isEn ? "What Your Agency Receives in the 5-Day Sprint" : "Apa yang Diterima Agensi Anda dalam Sprint 5 Hari"}
              </h2>
              <p style={{ color: "#9c978e", fontSize: "15px" }}>
                {isEn
                  ? "Fixed fee of Rp7.500.000 flat. Backed by Mutual NDA and 100% Client Code Ownership."
                  : "Investasi pasti Rp7.500.000 flat. Dilindungi Mutual NDA resmi dan 100% kepemilikan kode milik klien."}
              </p>
            </div>

            <div
              style={{
                background: "#111215",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                borderRadius: "16px",
                padding: "28px",
                display: "grid",
                gap: "16px",
              }}
            >
              {[
                isEn ? "Complete webhook intake setup for Meta Lead Ads, Webflow, and TikTok" : "Penyambungan intake webhook resmi Meta Lead Ads, Webflow, dan TikTok",
                isEn ? "Custom qualification rubrics calibrated to your client's ideal buyer persona" : "Kalibrasi kriteria evaluasi lead sesuai target profil pembeli klien Anda",
                isEn ? "Official WhatsApp Cloud API wiring with verified green-tick sender compatibility" : "Integrasi resmi WhatsApp Cloud API dengan kompatibilitas centang hijau",
                isEn ? "White-labeled human approval console tailored to your agency account managers" : "Konsol persetujuan manusia khusus disesuaikan dengan peran tim agensi Anda",
                isEn ? "20+ edge-case scenario simulations and duplicate contact prevention testing" : "Simulasi 20+ skenario batas dan verifikasi sistem proteksi anti-duplikasi",
                isEn ? "Staff training session and 14 days of dedicated post-launch SLA monitoring" : "Sesi pelatihan tim agensi dan 14 hari pemantauan aktif pasca-peluncuran",
              ].map((item, idx) => (
                <div key={idx} style={{ display: "flex", alignItems: "center", gap: "12px", fontSize: "14px" }}>
                  <CheckCircle2 size={16} style={{ color: "#10b981", flexShrink: 0 }} />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Embedded Lead Capture Funnel */}
        <section id="audit-form" style={{ padding: "var(--space-8) 0" }}>
          <div className="container" style={{ maxWidth: "680px" }}>
            <div style={{ textAlign: "center", marginBottom: "var(--space-5)" }}>
              <span className="font-mono text-12" style={{ color: "var(--color-accent)", textTransform: "uppercase", letterSpacing: "0.14em", fontWeight: 700 }}>
                {isEn ? "RESERVE YOUR AGENCY SPRINT" : "KONSULTASI & BOOKING SPRINT"}
              </span>
              <h2 className="font-display" style={{ fontSize: "var(--text-32)", fontWeight: 800, marginTop: "var(--space-2)" }}>
                {isEn ? "Book Your 30-Minute Architecture Audit" : "Jadwalkan Audit Arsitektur 30 Menit"}
              </h2>
              <p style={{ color: "#9c978e", fontSize: "15px", marginTop: "var(--space-2)" }}>
                {isEn
                  ? "We evaluate your current lead flow, recommend the ideal pipeline topology, and map out your 5-day implementation roadmap."
                  : "Kami mengaudit alur prospek Anda saat ini, merekomendasikan topologi alur kerja terbaik, dan menyusun peta jalan 5 hari kerja."}
              </p>
            </div>

            <LeadCaptureForm locale={locale} source="solution_marketing_agencies" />
          </div>
        </section>
      </main>

      <Footer dict={t} />
    </div>
  );
}
