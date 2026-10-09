import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle2, ShieldCheck, Sparkles, Target, Zap, Clock } from "lucide-react";
import { getLocale, getDict } from "@/lib/i18n";
import { getSession } from "@/lib/auth/session";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { LeadCaptureForm } from "@/components/LeadCaptureForm";
import { SchemaOrgJsonLd } from "@/components/SchemaOrgJsonLd";

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
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <SchemaOrgJsonLd type="software" />
      <Navbar locale={locale} dict={t} isAuthenticated={!!session} />

      <main id="main-content" style={{ flex: 1 }}>
        <section
          style={{
            padding: "var(--space-8) 0 var(--space-7) 0",
            borderBottom: "1px solid var(--color-border)",
            background: "radial-gradient(ellipse at top, var(--color-surface-2), var(--color-bg))",
          }}
        >
          <div className="container" style={{ display: "grid", gap: "var(--space-5)", maxWidth: "860px" }}>
            <div style={{ display: "inline-flex" }}>
              <span className="badge badge-accent">
                <Sparkles size={12} aria-hidden="true" />
                <span>SOLUSI SALES OPERATIONS &amp; REVOPS</span>
              </span>
            </div>

            <h1 style={{ fontSize: "clamp(2.2rem, 5vw, 3.4rem)", lineHeight: 1.15, letterSpacing: "-0.02em" }}>
              {isEn
                ? "Qualify Sales Leads and Route Hot Inquiries in Under 60 Seconds."
                : "Respon Setiap Peluang Penjualan dalam Waktu Kurang dari 60 Detik."}
            </h1>

            <p className="muted" style={{ fontSize: "var(--text-18)", lineHeight: 1.6 }}>
              {isEn
                ? "Research shows 78% of B2B buyers purchase from the first vendor who responds. Atlas automates inbound lead enrichment, scoring, and follow-up draft preparation with human signoff."
                : "Riset membuktikan 78% pembeli B2B bertransaksi dengan pihak pertama yang merespon. Atlas mengotomatisasi pengayaan profil lead, penilaian budget, dan penyiapan draf follow-up dengan izin sales rep Anda."}
            </p>

            <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "var(--space-4)", paddingTop: "var(--space-2)" }}>
              <Link href="/services/implementation-sprint" className="btn btn-primary">
                <span>{isEn ? "Deploy 5-Day Sales Sprint" : "Deploy 5-Day Sales Sprint"}</span>
                <ArrowRight size={16} aria-hidden="true" />
              </Link>
              <Link href="/services/automation-audit" className="btn btn-secondary">
                <span>{isEn ? "Book Free Process Audit" : "Jadwalkan Audit Gratis"}</span>
              </Link>
            </div>
          </div>
        </section>

        {/* 3 Core Sales Pillars */}
        <section style={{ padding: "var(--space-8) 0", borderBottom: "1px solid var(--color-border)" }}>
          <div className="container" style={{ display: "grid", gap: "var(--space-6)" }}>
            <div>
              <div className="eyebrow" style={{ marginBottom: "var(--space-2)" }}>AKSELERASI PIPELINE</div>
              <h2 style={{ fontSize: "var(--text-28)" }}>
                {isEn ? "Stop Losing High-Ticket Opportunities" : "Hentikan Kehilangan Kesepakatan Berharga"}
              </h2>
            </div>

            <div className="bento-grid">
              <div className="panel" style={{ display: "grid", gap: "var(--space-3)" }}>
                <Clock size={24} style={{ color: "var(--color-accent)" }} aria-hidden="true" />
                <h3 style={{ fontSize: "var(--text-18)", fontWeight: 700 }}>
                  {isEn ? "Speed to Lead Advantage" : "Keunggulan Kecepatan Respon"}
                </h3>
                <p className="muted" style={{ fontSize: "var(--text-14)", lineHeight: 1.5 }}>
                  {isEn
                    ? "Respond while the prospect is still on your website. Cuts average response latency from 4 hours down to under 60 seconds."
                    : "Balas pesan saat calon klien masih membuka website Anda. Pangkas waktu respon rata-rata dari 4 jam menjadi di bawah 60 detik."}
                </p>
              </div>

              <div className="panel" style={{ display: "grid", gap: "var(--space-3)" }}>
                <Target size={24} style={{ color: "var(--color-accent)" }} aria-hidden="true" />
                <h3 style={{ fontSize: "var(--text-18)", fontWeight: 700 }}>
                  {isEn ? "Deterministic Scoring" : "Penilaian Skor Deterministik"}
                </h3>
                <p className="muted" style={{ fontSize: "var(--text-14)", lineHeight: 1.5 }}>
                  {isEn
                    ? "Strict threshold rules (e.g. Budget >= Rp50M, Timeline < 30 days) separate VIP buyers from casual inquiries instantly."
                    : "Aturan ambang batas ketat (misal: Budget >= Rp50M) memisahkan prospek VIP dengan penanya kasual secara instan."}
                </p>
              </div>

              <div className="panel" style={{ display: "grid", gap: "var(--space-3)" }}>
                <Zap size={24} style={{ color: "var(--color-accent)" }} aria-hidden="true" />
                <h3 style={{ fontSize: "var(--text-18)", fontWeight: 700 }}>
                  {isEn ? "1-Click Rep Approval" : "1-Klik Persetujuan Sales Rep"}
                </h3>
                <p className="muted" style={{ fontSize: "var(--text-14)", lineHeight: 1.5 }}>
                  {isEn
                    ? "Sales reps don't write cold drafts from scratch. Review the pre-crafted WhatsApp message in 5 seconds and click Approve."
                    : "Sales rep tidak perlu mengetik draf dari awal. Tinjau pesan rekomendasi dalam 5 detik dan klik Setujui."}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Embedded Booking */}
        <section style={{ padding: "var(--space-8) 0" }}>
          <div className="container" style={{ maxWidth: "680px" }}>
            <LeadCaptureForm locale={locale} source="sales_ops_page" />
          </div>
        </section>
      </main>

      <Footer dict={t} />
    </div>
  );
}
