import { redirect } from "next/navigation";
import Link from "next/link";
import { getLocale, getDict } from "@/lib/i18n";
import { getSession } from "@/lib/auth/session";
import { SignupForm } from "@/components/SignupForm";
import { ThemeToggle } from "@/components/ThemeToggle";
import { LocaleToggle } from "@/components/LocaleToggle";

export default async function SignupPage() {
  const session = await getSession();
  if (session) redirect("/app");

  const locale = await getLocale();
  const { t } = await getDict();

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        background: "radial-gradient(ellipse at top, var(--color-surface-2), var(--color-bg))",
      }}
    >
      <header
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "var(--space-4) var(--space-5)",
        }}
      >
        <Link
          href="/"
          style={{
            textDecoration: "none",
            fontWeight: 700,
            fontSize: "var(--text-20)",
            letterSpacing: "-0.03em",
          }}
        >
          Atlas
        </Link>
        <div style={{ display: "flex", alignItems: "center", gap: "var(--space-2)" }}>
          <LocaleToggle currentLocale={locale} />
          <ThemeToggle />
        </div>
      </header>

      <main
        id="main-content"
        style={{
          width: "100%",
          maxWidth: "460px",
          margin: "0 auto",
          padding: "var(--space-5)",
        }}
      >
        <div className="panel" style={{ display: "grid", gap: "var(--space-5)", boxShadow: "var(--shadow-raised)" }}>
          <div style={{ textAlign: "center", display: "grid", gap: "var(--space-1)" }}>
            <h1 style={{ fontSize: "var(--text-24)" }}>{t.auth.signupTitle}</h1>
            <p className="muted" style={{ fontSize: "var(--text-14)" }}>
              Daftar dan aktifkan workspace pertama Anda dalam 1 menit
            </p>
          </div>

          <SignupForm dict={t} />
        </div>
      </main>

      <footer style={{ textAlign: "center", padding: "var(--space-4)", fontSize: "var(--text-12)", color: "var(--color-muted)" }}>
        Atlas &bull; Supervised AI Workflows
      </footer>
    </div>
  );
}
