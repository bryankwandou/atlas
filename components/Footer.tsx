import Link from "next/link";
import { ShieldCheck, Database, Layers } from "lucide-react";
import type { Dict } from "@/lib/i18n/locales";

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
        marginTop: "var(--space-8)",
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
          {/* Brand Column */}
          <div style={{ display: "grid", gap: "var(--space-3)" }}>
            <div
              style={{
                fontWeight: 750,
                fontSize: "var(--text-20)",
                letterSpacing: "-0.03em",
                display: "flex",
                alignItems: "center",
                gap: "var(--space-2)",
              }}
            >
              <span>Atlas</span>
              <span className="badge badge-accent">Enterprise</span>
            </div>
            <p className="muted" style={{ fontSize: "var(--text-14)", maxWidth: "280px", lineHeight: 1.6 }}>
              {dict.meta.description}
            </p>
            <div style={{ display: "flex", alignItems: "center", gap: "var(--space-2)", fontSize: "var(--text-12)", color: "var(--color-muted)" }}>
              <Database size={14} style={{ color: "var(--color-success)" }} aria-hidden="true" />
              <span>Durable PostgreSQL State Active</span>
            </div>
          </div>

          {/* Solutions Column */}
          <div>
            <div
              style={{
                fontWeight: 650,
                fontSize: "var(--text-14)",
                textTransform: "uppercase",
                letterSpacing: "0.05em",
                color: "var(--color-muted)",
                marginBottom: "var(--space-3)",
              }}
            >
              Solusi Industri
            </div>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gap: "var(--space-2)", fontSize: "var(--text-14)" }}>
              <li>
                <Link href="/solutions/marketing-agencies" className="muted" style={{ textDecoration: "none" }}>
                  Agensi Pemasaran
                </Link>
              </li>
              <li>
                <Link href="/solutions/sales-operations" className="muted" style={{ textDecoration: "none" }}>
                  Sales Ops &amp; Triage
                </Link>
              </li>
              <li>
                <Link href="/solutions/customer-support" className="muted" style={{ textDecoration: "none" }}>
                  Customer Support Escalation
                </Link>
              </li>
              <li>
                <Link href="/templates" className="muted" style={{ textDecoration: "none" }}>
                  120 Template Bisnis
                </Link>
              </li>
            </ul>
          </div>

          {/* Services Column */}
          <div>
            <div
              style={{
                fontWeight: 650,
                fontSize: "var(--text-14)",
                textTransform: "uppercase",
                letterSpacing: "0.05em",
                color: "var(--color-muted)",
                marginBottom: "var(--space-3)",
              }}
            >
              Layanan &amp; Sprint
            </div>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gap: "var(--space-2)", fontSize: "var(--text-14)" }}>
              <li>
                <Link href="/services/implementation-sprint" className="muted" style={{ textDecoration: "none" }}>
                  5-Day Implementation Sprint (Rp7.5M)
                </Link>
              </li>
              <li>
                <Link href="/services/automation-audit" className="muted" style={{ textDecoration: "none" }}>
                  Workflow Discovery Audit (30 Min)
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="muted" style={{ textDecoration: "none" }}>
                  Paket Biaya &amp; Langganan
                </Link>
              </li>
              <li>
                <a href="#roi-calculator" className="muted" style={{ textDecoration: "none" }}>
                  Kalkulator Penghematan Agensi
                </a>
              </li>
            </ul>
          </div>

          {/* Security & Governance Column */}
          <div>
            <div
              style={{
                fontWeight: 650,
                fontSize: "var(--text-14)",
                textTransform: "uppercase",
                letterSpacing: "0.05em",
                color: "var(--color-muted)",
                marginBottom: "var(--space-3)",
              }}
            >
              Keamanan &amp; Tata Kelola
            </div>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gap: "var(--space-2)", fontSize: "var(--text-14)" }}>
              <li>
                <Link href="/security" className="muted" style={{ textDecoration: "none" }}>
                  {dict.security.title}
                </Link>
              </li>
              <li>
                <a
                  href="https://github.com/bryankwandou/atlas"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="muted"
                  style={{ textDecoration: "none" }}
                >
                  GitHub Repository
                </a>
              </li>
              <li>
                <Link href="/api/health" className="muted" style={{ textDecoration: "none" }}>
                  Health Check Endpoint
                </Link>
              </li>
              <li>
                <a href="#honesty" className="muted" style={{ textDecoration: "none" }}>
                  Transparansi &amp; Batasan Sandbox
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
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
          <div style={{ display: "flex", alignItems: "center", gap: "var(--space-2)" }}>
            <ShieldCheck size={14} style={{ color: "var(--color-accent)" }} aria-hidden="true" />
            <span className="muted">
              Persetujuan manusia wajib untuk setiap aksi keluar &bull; Tanpa pelatihan AI pada data klien
            </span>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "var(--space-3)" }}>
            <span className="badge badge-success">
              120 Templates Verified
            </span>
            <span className="badge">
              Neon Serverless Postgres
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
