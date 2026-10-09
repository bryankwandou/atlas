import type { Metadata } from "next";
import { ShieldCheck, Lock, KeyRound, EyeOff, Layers, CheckCircle2 } from "lucide-react";
import { getLocale, getDict } from "@/lib/i18n";
import { getSession } from "@/lib/auth/session";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Keamanan, Tata Kelola Data & Human-in-the-Loop | Atlas",
    description:
      "Standar keamanan Atlas: isolasi tenant server-side, hashing sandi scrypt, gerbang persetujuan manusia wajib, dan penyimpanan database PostgreSQL terisolasi.",
    alternates: {
      canonical: "https://atlas-automation.vercel.app/security",
    },
  };
}

export default async function SecurityPage() {
  const locale = await getLocale();
  const { t } = await getDict();
  const session = await getSession();

  const items = [
    {
      icon: Layers,
      title: t.security.i1t,
      desc: t.security.i1d,
    },
    {
      icon: KeyRound,
      title: t.security.i2t,
      desc: t.security.i2d,
    },
    {
      icon: ShieldCheck,
      title: t.security.i3t,
      desc: t.security.i3d,
    },
    {
      icon: CheckCircle2,
      title: t.security.i4t,
      desc: t.security.i4d,
    },
    {
      icon: EyeOff,
      title: t.security.i5t,
      desc: t.security.i5d,
    },
    {
      icon: Lock,
      title: t.security.i6t,
      desc: t.security.i6d,
    },
  ];

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Navbar locale={locale} dict={t} isAuthenticated={!!session} />

      <main id="main-content" style={{ flex: 1, padding: "var(--space-8) 0" }}>
        <div className="container" style={{ display: "grid", gap: "var(--space-8)" }}>
          <div style={{ maxWidth: "700px", display: "grid", gap: "var(--space-3)" }}>
            <div style={{ display: "inline-flex" }}>
              <span className="badge badge-accent">
                <ShieldCheck size={12} aria-hidden="true" />
                <span>Prinsip Keamanan Tanpa Klaim Palsu</span>
              </span>
            </div>
            <h1 style={{ fontSize: "var(--text-32)" }}>{t.security.title}</h1>
            <p className="muted" style={{ fontSize: "var(--text-16)" }}>
              {t.security.lead}
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
              gap: "var(--space-5)",
            }}
          >
            {items.map((item, i) => {
              const Icon = item.icon;
              return (
                <div key={i} className="panel" style={{ display: "grid", gap: "var(--space-3)" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "var(--space-3)" }}>
                    <div
                      style={{
                        padding: "var(--space-2)",
                        borderRadius: "var(--radius-md)",
                        background: "var(--color-surface-2)",
                        border: "1px solid var(--color-border)",
                        display: "grid",
                        placeItems: "center",
                      }}
                    >
                      <Icon size={20} aria-hidden="true" style={{ color: "var(--color-accent)" }} />
                    </div>
                    <h2 style={{ fontSize: "var(--text-18)" }}>{item.title}</h2>
                  </div>
                  <p className="muted" style={{ fontSize: "var(--text-14)", lineHeight: 1.6 }}>
                    {item.desc}
                  </p>
                </div>
              );
            })}
          </div>

          <div
            className="panel"
            style={{
              background: "var(--color-surface-2)",
              display: "grid",
              gap: "var(--space-3)",
              padding: "var(--space-6)",
            }}
          >
            <h2 style={{ fontSize: "var(--text-18)", fontWeight: 700 }}>
              Audit &amp; Verifikasi Otomatis
            </h2>
            <p className="muted" style={{ fontSize: "var(--text-14)", maxWidth: "800px", lineHeight: 1.6 }}>
              Setiap rilis diuji oleh pengujian unit otomatis yang mencakup penolakan manipulasi token sesi,
              isolasi lintas-workspace (tenant isolation), pembatasan anggaran AI sebelum panggilan eksternal,
              dan validasi graf siklus template.
            </p>
            <div style={{ fontSize: "var(--text-12)", color: "var(--color-muted)" }}>
              {t.security.contact}
            </div>
          </div>
        </div>
      </main>

      <Footer dict={t} />
    </div>
  );
}
