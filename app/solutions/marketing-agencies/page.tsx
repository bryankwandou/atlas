import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle2, ShieldCheck, Sparkles, Building2, TrendingUp, Layers, Users } from "lucide-react";
import { getLocale, getDict } from "@/lib/i18n";
import { getSession } from "@/lib/auth/session";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { LeadCaptureForm } from "@/components/LeadCaptureForm";
import { SchemaOrgJsonLd } from "@/components/SchemaOrgJsonLd";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Marketing Agency Workflow Automation & Lead Qualification | Atlas",
    description:
      "Automate inbound lead triage, budget scoring, and WhatsApp follow-up drafting for your marketing agency. 100% human-approved before sending.",
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
                <span>SOLUSI UNTUK AGENSI PEMASARAN</span>
              </span>
            </div>

            <h1 style={{ fontSize: "clamp(2.2rem, 5vw, 3.4rem)", lineHeight: 1.15, letterSpacing: "-0.02em" }}>
              {isEn
                ? "Scale Your Marketing Agency Without Adding Administrative Overhead."
                : "Skalakan Kapasitas Klien Agensi Anda Tanpa Menambah Karyawan Admin."}
            </h1>

            <p className="muted" style={{ fontSize: "var(--text-18)", lineHeight: 1.6 }}>
              {isEn
                ? "Inbound leads from ad campaigns decay within hours. Atlas qualifies prospect fit, scores budgets, and drafts personalized follow-up messages in seconds—requiring your approval with one click before sending."
                : "Lead iklan yang masuk sering terabaikan karena staf sibuk. Atlas mengkualifikasi profil prospek, menganalisis anggaran, dan menyiapkan draf pesan follow-up dalam hitungan detik—dengan izin satu klik tim Anda."}
            </p>

            <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "var(--space-4)", paddingTop: "var(--space-2)" }}>
              <Link href="/services/implementation-sprint" className="btn btn-primary">
                <span>{isEn ? "Deploy 5-Day Agency Sprint (Rp7.5M)" : "Deploy 5-Day Agency Sprint (Rp7.5jt)"}</span>
                <ArrowRight size={16} aria-hidden="true" />
              </Link>
              <Link href="/templates/inbound-lead-qualification" className="btn btn-secondary">
                <span>{isEn ? "View Template Blueprint" : "Lihat Blueprint Template"}</span>
              </Link>
            </div>
          </div>
        </section>

        {/* 3 Core Agency Leverages */}
        <section style={{ padding: "var(--space-8) 0", borderBottom: "1px solid var(--color-border)" }}>
          <div className="container" style={{ display: "grid", gap: "var(--space-6)" }}>
            <div>
              <div className="eyebrow" style={{ marginBottom: "var(--space-2)" }}>THE AGENCY LEVERAGE ENGINE</div>
              <h2 style={{ fontSize: "var(--text-28)" }}>
                {isEn ? "Engineered for Multi-Client Agency Operations" : "Dirancang untuk Efisiensi Agensi Multi-Klien"}
              </h2>
            </div>

            <div className="bento-grid">
              <div className="panel" style={{ display: "grid", gap: "var(--space-3)" }}>
                <TrendingUp size={24} style={{ color: "var(--color-accent)" }} aria-hidden="true" />
                <h3 style={{ fontSize: "var(--text-18)", fontWeight: 700 }}>
                  {isEn ? "Sub-60s Speed to Lead" : "Respon Lead di Bawah 60 Detik"}
                </h3>
                <p className="muted" style={{ fontSize: "var(--text-14)", lineHeight: 1.5 }}>
                  {isEn
                    ? "Eliminate lead decay from Facebook, Google, and TikTok ad campaigns. Every prospect is evaluated against your ideal client profile immediately."
                    : "Hapus jeda respon pada kampanye iklan Meta dan Google. Setiap prospek langsung dianalisis kelayakannya terhadap target profil klien Anda."}
                </p>
              </div>

              <div className="panel" style={{ display: "grid", gap: "var(--space-3)" }}>
                <ShieldCheck size={24} style={{ color: "var(--color-accent)" }} aria-hidden="true" />
                <h3 style={{ fontSize: "var(--text-18)", fontWeight: 700 }}>
                  {isEn ? "Zero Hallucination Risk" : "Bebas Resiko Halusinasi AI"}
                </h3>
                <p className="muted" style={{ fontSize: "var(--text-14)", lineHeight: 1.5 }}>
                  {isEn
                    ? "Your agency reputation is protected. AI only prepares the draft; your account manager approves or edits the message in the review drawer."
                    : "Reputasi agensi Anda aman. AI hanya menyiapkan draf rekomendasi; account manager Anda yang menyetujui atau mengedit sebelum dikirim."}
                </p>
              </div>

              <div className="panel" style={{ display: "grid", gap: "var(--space-3)" }}>
                <Users size={24} style={{ color: "var(--color-accent)" }} aria-hidden="true" />
                <h3 style={{ fontSize: "var(--text-18)", fontWeight: 700 }}>
                  {isEn ? "Higher Retainer Capacity" : "Tingkatkan Kapasitas Retainer"}
                </h3>
                <p className="muted" style={{ fontSize: "var(--text-14)", lineHeight: 1.5 }}>
                  {isEn
                    ? "Manage 30+ client retainer accounts with the same core team. Eliminate 15+ weekly hours of repetitive data entry per employee."
                    : "Kelola 30+ akun retainer dengan ukuran tim yang sama. Hilangkan 15+ jam input data dan copy-paste manual per staf setiap minggu."}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Embedded Booking */}
        <section style={{ padding: "var(--space-8) 0" }}>
          <div className="container" style={{ maxWidth: "680px" }}>
            <LeadCaptureForm locale={locale} source="marketing_agency_page" />
          </div>
        </section>
      </main>

      <Footer dict={t} />
    </div>
  );
}
