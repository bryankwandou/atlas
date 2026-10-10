import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle2, ShieldCheck, Sparkles, Headphones, AlertTriangle, Clock, Lock, Users } from "lucide-react";
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
    title: "Supervised Customer Support & Ticket Escalation | Atlas",
    description:
      "Triage urgent support tickets, categorize sentiment, and draft expert responses with mandatory human review before customer dispatch.",
    alternates: {
      canonical: "https://atlas-automation.vercel.app/solutions/customer-support",
    },
  };
}

export default async function CustomerSupportSolutionPage() {
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
                    {isEn ? "Enterprise Support Architecture · 5-Day Sprint" : "Infrastruktur Dukungan Enterprise · Sprint 5 Hari"}
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
                      Resolve Support Tickets Faster Without Losing the{" "}
                      <span className="font-serif italic font-normal">
                        Human Touch
                      </span>
                      .
                    </>
                  ) : (
                    <>
                      Selesaikan Tiket Dukungan Pelanggan Lebih Cepat Tanpa Kehilangan{" "}
                      <span className="font-serif italic font-normal">
                        Sentuhan Manusia
                      </span>
                      .
                    </>
                  )}
                </h1>

                <p style={{ fontSize: "17px", lineHeight: 1.6, color: "#a8a397", maxWidth: "520px" }}>
                  {isEn
                    ? "Unsupervised chatbots alienate high-value clients with incorrect policy answers. Atlas classifies urgency, summarizes conversation histories, and drafts contextual replies awaiting agent signoff."
                    : "Chatbot liar tanpa pengawasan membuat pelanggan kesal karena jawaban yang salah. Atlas menganalisis urgensi, merangkum riwayat percakapan, dan menyiapkan draf jawaban berbobot yang ditinjau staf Anda sebelum dikirim."}
                </p>

                <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "var(--space-3)", paddingTop: "var(--space-2)" }}>
                  <a
                    href="#audit-form"
                    className="btn btn-primary"
                    style={{ borderRadius: "9999px", padding: "0 24px", fontWeight: 700 }}
                  >
                    <span>{isEn ? "Deploy 5-Day Support Sprint (Rp7.5M)" : "Deploy Sprint Support (Rp7.5jt)"}</span>
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
                      82%
                    </span>
                    <span className="font-mono text-12" style={{ color: "#8a857b", textTransform: "uppercase", fontSize: "10px" }}>
                      {isEn ? "Draft Automation" : "Otomasi Draf"}
                    </span>
                  </div>
                  <div>
                    <span className="font-display" style={{ display: "block", fontSize: "22px", fontWeight: 800, color: "#10b981" }}>
                      0
                    </span>
                    <span className="font-mono text-12" style={{ color: "#8a857b", textTransform: "uppercase", fontSize: "10px" }}>
                      {isEn ? "Hallucination Leaks" : "Pesan Salah Kirim"}
                    </span>
                  </div>
                  <div>
                    <span className="font-display" style={{ display: "block", fontSize: "22px", fontWeight: 800 }}>
                      14-Day
                    </span>
                    <span className="font-mono text-12" style={{ color: "#8a857b", textTransform: "uppercase", fontSize: "10px" }}>
                      {isEn ? "SLA Hypercare" : "Pemantauan SLA"}
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

        {/* Support Architecture Features */}
        <section id="architecture" style={{ padding: "var(--space-8) 0", borderBottom: "1px solid rgba(255, 255, 255, 0.08)" }}>
          <div className="container" style={{ display: "grid", gap: "var(--space-6)" }}>
            <div>
              <div className="font-mono text-12" style={{ color: "var(--color-accent)", letterSpacing: "0.14em", textTransform: "uppercase", fontWeight: 700 }}>
                CRITICAL SUPPORT ESCALATION MESH
              </div>
              <h2 className="font-display" style={{ fontSize: "clamp(28px, 3.5vw, 42px)", fontWeight: 800, marginTop: "var(--space-2)" }}>
                {isEn ? "Immediate Triage. Zero Accidental Outbounds." : "Triage Kilat. Nol Pesan Salah Kirim."}
              </h2>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "var(--space-4)" }}>
              <div className="atelier-dossier-card">
                <div>
                  <span className="font-mono text-12" style={{ color: "var(--color-accent)", fontWeight: 700 }}>01 · SENTIMENT TRIAGE</span>
                  <h3 className="font-display" style={{ fontSize: "19px", fontWeight: 800, marginTop: "8px" }}>
                    {isEn ? "Emergency Priority Detection" : "Deteksi Isu Darurat Prioritas"}
                  </h3>
                  <p style={{ color: "#9c978e", fontSize: "14px", marginTop: "8px", lineHeight: 1.6 }}>
                    {isEn
                      ? "Identifies churn threats and frustrated customer language immediately, moving urgent complaints to the front of the senior agent queue."
                      : "Mendeteksi risiko churn dan nada komplain pelanggan secara instan, memindahkan tiket kritis ke urutan teratas antrean supervisor."}
                  </p>
                </div>
              </div>

              <div className="atelier-dossier-card">
                <div>
                  <span className="font-mono text-12" style={{ color: "var(--color-accent)", fontWeight: 700 }}>02 · POLICY ACCURACY</span>
                  <h3 className="font-display" style={{ fontSize: "19px", fontWeight: 800, marginTop: "8px" }}>
                    {isEn ? "Grounded Knowledge Retrieval" : "Rujukan Kebijakan Resmi"}
                  </h3>
                  <p style={{ color: "#9c978e", fontSize: "14px", marginTop: "8px", lineHeight: 1.6 }}>
                    {isEn
                      ? "AI drafts responses strictly using your approved operational documentation and refund protocols—never guessing or making unauthorized promises."
                      : "AI menyusun draf respon mengacu murni pada dokumen SOP dan protokol pengembalian resmi—tidak pernah menebak atau memberi janji di luar wewenang."}
                  </p>
                </div>
              </div>

              <div className="atelier-dossier-card">
                <div>
                  <span className="font-mono text-12" style={{ color: "var(--color-accent)", fontWeight: 700 }}>03 · SPEED TO RESOLUTION</span>
                  <h3 className="font-display" style={{ fontSize: "19px", fontWeight: 800, marginTop: "8px" }}>
                    {isEn ? "1-Click Dispatch Console" : "Konsol Eksekusi 1-Klik"}
                  </h3>
                  <p style={{ color: "#9c978e", fontSize: "14px", marginTop: "8px", lineHeight: 1.6 }}>
                    {isEn
                      ? "Support agents review pre-composed WhatsApp responses, make quick tweaks if necessary, and approve sending in under 5 seconds."
                      : "Staf dukungan memeriksa draf pesan WhatsApp yang telah disiapkan, melakukan revisi cepat bila perlu, dan menyetujui pengiriman di bawah 5 detik."}
                  </p>
                </div>
              </div>

              <div className="atelier-dossier-card">
                <div>
                  <span className="font-mono text-12" style={{ color: "var(--color-accent)", fontWeight: 700 }}>04 · AUDIT TRAIL</span>
                  <h3 className="font-display" style={{ fontSize: "19px", fontWeight: 800, marginTop: "8px" }}>
                    {isEn ? "Cryptographic Resolution Logs" : "Jejak Audit Penyelesaian Permanen"}
                  </h3>
                  <p style={{ color: "#9c978e", fontSize: "14px", marginTop: "8px", lineHeight: 1.6 }}>
                    {isEn
                      ? "Every ticket resolution, timestamp, operator identity, and outbound payload is immutably stored for quality assurance."
                      : "Setiap penyelesaian tiket, stempel waktu, identitas operator, dan isi pesan dicatat secara permanen untuk jaminan kualitas."}
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
                {isEn ? "RESERVE YOUR SUPPORT SPRINT" : "KONSULTASI & BOOKING SPRINT"}
              </span>
              <h2 className="font-display" style={{ fontSize: "var(--text-32)", fontWeight: 800, marginTop: "var(--space-2)" }}>
                {isEn ? "Book Your 30-Minute Architecture Audit" : "Jadwalkan Audit Arsitektur 30 Menit"}
              </h2>
              <p style={{ color: "#9c978e", fontSize: "15px", marginTop: "var(--space-2)" }}>
                {isEn
                  ? "We evaluate your ticket escalation topology and map out a 5-day turnkey implementation for your support operations."
                  : "Kami mengaudit topologi eskalasi tiket Anda dan menyusun rencana implementasi 5 hari kerja yang siap pakai."}
              </p>
            </div>

            <LeadCaptureForm locale={locale} source="solution_customer_support" />
          </div>
        </section>
      </main>

      <Footer dict={t} />
    </div>
  );
}
