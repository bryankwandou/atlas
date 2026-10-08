import Link from "next/link";
import { Check, ArrowRight, Coins, ShieldCheck, Sparkles } from "lucide-react";
import { getLocale, getDict } from "@/lib/i18n";
import { getSession } from "@/lib/auth/session";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

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
                    <span>Estimasi ROI dan biaya token model</span>
                  </li>
                </ul>
              </div>

              <Link href="/signup" className="btn btn-secondary" style={{ width: "100%" }}>
                <span>Mulai audit</span>
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
                  <span className="eyebrow">Paling Populer</span>
                  <span className="badge badge-accent">Done-for-you</span>
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
                    <span>Uji coba end-to-end data sintetis</span>
                  </li>
                  <li style={{ display: "flex", gap: "var(--space-2)" }}>
                    <Check size={16} aria-hidden="true" style={{ color: "var(--color-success)" }} />
                    <span>Gerbang persetujuan manusia &amp; integrasi saluran</span>
                  </li>
                  <li style={{ display: "flex", gap: "var(--space-2)" }}>
                    <Check size={16} aria-hidden="true" style={{ color: "var(--color-success)" }} />
                    <span>Pelatihan tim 1 sesi &amp; garansi revisi</span>
                  </li>
                </ul>
              </div>

              <Link href="/signup" className="btn btn-primary" style={{ width: "100%" }}>
                <span>Daftar Sprint</span>
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
                    <span>Pemantauan kesehatan &amp; kegagalan run</span>
                  </li>
                  <li style={{ display: "flex", gap: "var(--space-2)" }}>
                    <Check size={16} aria-hidden="true" style={{ color: "var(--color-success)" }} />
                    <span>Penyesuaian prompt &amp; ambang batas</span>
                  </li>
                  <li style={{ display: "flex", gap: "var(--space-2)" }}>
                    <Check size={16} aria-hidden="true" style={{ color: "var(--color-success)" }} />
                    <span>Laporan performa &amp; biaya token bulanan</span>
                  </li>
                </ul>
              </div>

              <Link href="/signup" className="btn btn-secondary" style={{ width: "100%" }}>
                <span>Konsultasi perawatan</span>
              </Link>
            </div>
          </div>

          {/* AI Token Economics & BYOK note */}
          <div
            className="panel"
            style={{
              background: "var(--color-surface-2)",
              display: "grid",
              gap: "var(--space-3)",
              padding: "var(--space-6)",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "var(--space-2)" }}>
              <Coins size={18} aria-hidden="true" style={{ color: "var(--color-accent)" }} />
              <h3 style={{ fontSize: "var(--text-16)", fontWeight: 700 }}>Kebijakan &amp; Biaya Model AI</h3>
            </div>
            <p className="muted" style={{ fontSize: "var(--text-14)", maxWidth: "800px", lineHeight: 1.6 }}>
              {t.pricing.aiNote}
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--space-4)", fontSize: "var(--text-12)", marginTop: "var(--space-2)" }}>
              <span className="badge">Tier Low (Luna): ~$0.001 / run</span>
              <span className="badge">Tier Balanced (Terra): ~$0.05 / run</span>
              <span className="badge">Kredit Platform Tersedia di MVP</span>
            </div>
          </div>
        </div>
      </main>

      <Footer dict={t} />
    </div>
  );
}
