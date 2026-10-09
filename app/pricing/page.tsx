import type { Metadata } from "next";
import Link from "next/link";
import { Check, ArrowRight, Coins, ShieldCheck, Sparkles } from "lucide-react";
import { getLocale, getDict } from "@/lib/i18n";
import { getSession } from "@/lib/auth/session";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Paket & Harga Jasa Implementasi Automasi Alur Kerja | Atlas",
    description:
      "Transparansi biaya implementasi alur kerja AI: 5-Day Implementation Sprint Rp7.500.000 flat dan sesi Workflow Discovery Audit 30 menit gratis.",
    alternates: {
      canonical: "https://atlas-automation.vercel.app/pricing",
    },
  };
}

export default async function PricingPage() {
  const locale = await getLocale();
  const { t } = await getDict();
  const session = await getSession();

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Navbar locale={locale} dict={t} isAuthenticated={!!session} />

      <main id="main-content" style={{ flex: 1, padding: "var(--space-8) 0" }}>
        <div className="container" style={{ display: "grid", gap: "var(--space-8)" }}>
          <div style={{ textAlign: "center", maxWidth: "700px", margin: "0 auto", display: "grid", gap: "var(--space-3)" }}>
            <div style={{ display: "inline-flex", justifyContent: "center" }}>
              <span className="badge badge-accent">
                <Coins size={12} aria-hidden="true" />
                <span>Transparansi Biaya &amp; Investasi</span>
              </span>
            </div>
            <h1 style={{ fontSize: "var(--text-32)" }}>{t.pricing.title}</h1>
            <p className="muted" style={{ fontSize: "var(--text-16)" }}>
              {t.pricing.lead}
            </p>
          </div>

          {/* Pricing cards */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: "var(--space-5)",
              alignItems: "stretch",
            }}
          >
            {/* Audit */}
            <div
              className="panel"
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                gap: "var(--space-5)",
              }}
            >
              <div style={{ display: "grid", gap: "var(--space-3)" }}>
                <span className="eyebrow">Diagnostik Awal</span>
                <h2 style={{ fontSize: "var(--text-20)" }}>{t.pricing.auditName}</h2>
                <div style={{ fontSize: "var(--text-28)", fontWeight: 700 }}>{t.pricing.auditPrice}</div>
                <p className="muted" style={{ fontSize: "var(--text-14)" }}>{t.pricing.auditBody}</p>

                <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gap: "var(--space-2)", fontSize: "var(--text-14)" }}>
                  <li style={{ display: "flex", gap: "var(--space-2)" }}>
                    <Check size={16} aria-hidden="true" style={{ color: "var(--color-success)" }} />
                    <span>Pemetaan proses bisnis manual</span>
                  </li>
                  <li style={{ display: "flex", gap: "var(--space-2)" }}>
                    <Check size={16} aria-hidden="true" style={{ color: "var(--color-success)" }} />
                    <span>Katalog template rekomendasi</span>
                  </li>
                  <li style={{ display: "flex", gap: "var(--space-2)" }}>
                    <Check size={16} aria-hidden="true" style={{ color: "var(--color-success)" }} />
                    <span>Estimasi penghematan waktu &amp; kalkulasi ROI</span>
                  </li>
                </ul>
              </div>

              <Link href="/services/automation-audit" className="btn btn-secondary" style={{ width: "100%" }}>
                <span>Jadwalkan Audit Gratis</span>
              </Link>
            </div>

            {/* Sprint (Featured) */}
            <div
              className="panel"
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                gap: "var(--space-5)",
                borderColor: "var(--color-accent)",
                boxShadow: "var(--shadow-raised)",
                position: "relative",
              }}
            >
              <div style={{ display: "grid", gap: "var(--space-3)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span className="eyebrow">Layanan Utama</span>
                  <span className="badge badge-accent">5-Day Turnaround</span>
                </div>
                <h2 style={{ fontSize: "var(--text-20)" }}>{t.pricing.sprintName}</h2>
                <div style={{ fontSize: "var(--text-28)", fontWeight: 700 }}>{t.pricing.sprintPrice}</div>
                <p className="muted" style={{ fontSize: "var(--text-14)" }}>{t.pricing.sprintBody}</p>

                <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gap: "var(--space-2)", fontSize: "var(--text-14)" }}>
                  <li style={{ display: "flex", gap: "var(--space-2)" }}>
                    <Check size={16} aria-hidden="true" style={{ color: "var(--color-success)" }} />
                    <span>Pemasangan 1 workflow produksi kustom</span>
                  </li>
                  <li style={{ display: "flex", gap: "var(--space-2)" }}>
                    <Check size={16} aria-hidden="true" style={{ color: "var(--color-success)" }} />
                    <span>Simulasi menyeluruh &amp; verifikasi skenario batas</span>
                  </li>
                  <li style={{ display: "flex", gap: "var(--space-2)" }}>
                    <Check size={16} aria-hidden="true" style={{ color: "var(--color-success)" }} />
                    <span>Gerbang persetujuan tim &amp; integrasi kanal resmi</span>
                  </li>
                  <li style={{ display: "flex", gap: "var(--space-2)" }}>
                    <Check size={16} aria-hidden="true" style={{ color: "var(--color-success)" }} />
                    <span>Pelatihan tim 1 sesi &amp; 14 hari pemantauan SLA aktif</span>
                  </li>
                </ul>
              </div>

              <Link href="/services/implementation-sprint" className="btn btn-primary" style={{ width: "100%" }}>
                <span>Detail &amp; Daftar Sprint</span>
                <ArrowRight size={16} aria-hidden="true" />
              </Link>
            </div>

            {/* Care */}
            <div
              className="panel"
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                gap: "var(--space-5)",
              }}
            >
              <div style={{ display: "grid", gap: "var(--space-3)" }}>
                <span className="eyebrow">Operasional Berkelanjutan</span>
                <h2 style={{ fontSize: "var(--text-20)" }}>{t.pricing.careName}</h2>
                <div style={{ fontSize: "var(--text-28)", fontWeight: 700 }}>{t.pricing.carePrice}</div>
                <p className="muted" style={{ fontSize: "var(--text-14)" }}>{t.pricing.careBody}</p>

                <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gap: "var(--space-2)", fontSize: "var(--text-14)" }}>
                  <li style={{ display: "flex", gap: "var(--space-2)" }}>
                    <Check size={16} aria-hidden="true" style={{ color: "var(--color-success)" }} />
                    <span>Pemantauan kesehatan &amp; kelancaran alur kerja</span>
                  </li>
                  <li style={{ display: "flex", gap: "var(--space-2)" }}>
                    <Check size={16} aria-hidden="true" style={{ color: "var(--color-success)" }} />
                    <span>Penyelarasan kriteria &amp; optimasi berkala</span>
                  </li>
                  <li style={{ display: "flex", gap: "var(--space-2)" }}>
                    <Check size={16} aria-hidden="true" style={{ color: "var(--color-success)" }} />
                    <span>Laporan performa alur kerja &amp; pemantauan SLA bulanan</span>
                  </li>
                </ul>
              </div>

              <Link href="/services/automation-audit" className="btn btn-secondary" style={{ width: "100%" }}>
                <span>Konsultasi Retainer</span>
              </Link>
            </div>
          </div>

          {/* Enterprise Governance, Confidentiality & NDA Guarantee */}
          <div
            className="panel"
            style={{
              background: "var(--color-surface)",
              border: "1px solid var(--color-border-strong)",
              display: "grid",
              gap: "var(--space-3)",
              padding: "var(--space-6)",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "var(--space-2)" }}>
              <ShieldCheck size={18} aria-hidden="true" style={{ color: "var(--color-accent)" }} />
              <h3 style={{ fontSize: "var(--text-16)", fontWeight: 700 }}>Komitmen Kerahasiaan &amp; Tata Kelola Enterprise</h3>
            </div>
            <p className="muted" style={{ fontSize: "var(--text-14)", maxWidth: "800px", lineHeight: 1.6 }}>
              {t.pricing.aiNote}
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--space-3)", fontSize: "var(--text-12)", marginTop: "var(--space-2)" }}>
              <span className="badge badge-accent">Non-Disclosure Agreement (NDA) Mengikat</span>
              <span className="badge">100% Hak Milik Data Klien</span>
              <span className="badge">Dukungan SLA Khusus</span>
            </div>
          </div>
        </div>
      </main>

      <Footer dict={t} />
    </div>
  );
}
