import Link from "next/link";
import type { Dict } from "@/lib/i18n";

interface Props {
  dict: Dict;
}

export function Footer({ dict }: Props) {
  return (
    <footer
      role="contentinfo"
      style={{
        borderTop: "1px solid var(--color-border)",
        background: "var(--color-surface)",
        padding: "var(--space-8) 0 var(--space-6) 0",
        marginTop: "var(--space-9)",
      }}
    >
      <div className="container" style={{ display: "grid", gap: "var(--space-7)" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "var(--space-6)",
          }}
        >
          <div>
            <div
              style={{
                fontWeight: 700,
                fontSize: "var(--text-18)",
                marginBottom: "var(--space-2)",
                letterSpacing: "-0.02em",
              }}
            >
              Atlas
            </div>
            <p className="muted" style={{ fontSize: "var(--text-14)", maxWidth: "280px" }}>
              {dict.meta.description}
            </p>
          </div>

          <div>
            <div
              style={{
                fontWeight: 600,
                fontSize: "var(--text-14)",
                textTransform: "uppercase",
                letterSpacing: "0.05em",
                color: "var(--color-muted)",
                marginBottom: "var(--space-3)",
              }}
            >
              {dict.footer.product}
            </div>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gap: "var(--space-2)", fontSize: "var(--text-14)" }}>
              <li>
                <Link href="/templates" className="muted" style={{ textDecoration: "none" }}>
                  {dict.nav.templates}
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="muted" style={{ textDecoration: "none" }}>
                  {dict.nav.pricing}
                </Link>
              </li>
              <li>
                <Link href="/security" className="muted" style={{ textDecoration: "none" }}>
                  {dict.nav.security}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <div
              style={{
                fontWeight: 600,
                fontSize: "var(--text-14)",
                textTransform: "uppercase",
                letterSpacing: "0.05em",
                color: "var(--color-muted)",
                marginBottom: "var(--space-3)",
              }}
            >
              {dict.footer.company}
            </div>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gap: "var(--space-2)", fontSize: "var(--text-14)" }}>
              <li>
                <Link href="/security" className="muted" style={{ textDecoration: "none" }}>
                  {dict.security.title}
                </Link>
              </li>
              <li>
                <a href="#honesty" className="muted" style={{ textDecoration: "none" }}>
                  Status &amp; Kejujuran Produk
                </a>
              </li>
            </ul>
          </div>

          <div>
            <div
              style={{
                fontWeight: 600,
                fontSize: "var(--text-14)",
                textTransform: "uppercase",
                letterSpacing: "0.05em",
                color: "var(--color-muted)",
                marginBottom: "var(--space-3)",
              }}
            >
              {dict.footer.legal}
            </div>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gap: "var(--space-2)", fontSize: "var(--text-14)" }}>
              <li>
                <span className="muted">{dict.footer.privacy}</span>
              </li>
              <li>
                <span className="muted">{dict.footer.terms}</span>
              </li>
            </ul>
          </div>
        </div>

        <div
          style={{
            borderTop: "1px solid var(--color-border)",
            paddingTop: "var(--space-4)",
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "var(--space-3)",
            fontSize: "var(--text-12)",
          }}
        >
          <p className="muted">{dict.footer.note}</p>
          <p className="muted">
            <span className="badge badge-success" style={{ marginRight: "var(--space-2)" }}>
              Runtime OK
            </span>
            Simulasi Offline &amp; Server-Side Guard
          </p>
        </div>
      </div>
    </footer>
  );
}
