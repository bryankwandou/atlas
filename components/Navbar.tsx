"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, ArrowRight, Sparkles } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { LocaleToggle } from "./LocaleToggle";
import type { Locale, Dict } from "@/lib/i18n";

interface Props {
  locale: Locale;
  dict: Dict;
  isAuthenticated?: boolean;
}

export function Navbar({ locale, dict, isAuthenticated = false }: Props) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const isEn = locale === "en";

  return (
    <header role="banner" className="nav-pill-wrapper">
      <div className="nav-pill">
        <div style={{ display: "flex", alignItems: "center", gap: "var(--space-4)" }}>
          <Link
            href="/"
            style={{
              textDecoration: "none",
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              fontWeight: 800,
              fontSize: "17px",
              letterSpacing: "-0.03em",
              color: "var(--color-text)",
            }}
          >
            <span style={{ display: "inline-block", width: "9px", height: "9px", borderRadius: "50%", background: "var(--color-accent)" }}></span>
            <span className="font-display">Atlas</span>
            <span
              className="badge badge-accent"
              style={{ fontSize: "10px", fontWeight: 700, padding: "1px 6px", textTransform: "uppercase", letterSpacing: "0.06em" }}
            >
              Enterprise
            </span>
          </Link>

          <nav
            role="navigation"
            aria-label="Navigasi utama"
            className="desktop-nav"
            style={{ display: "flex", alignItems: "center", gap: "var(--space-4)" }}
          >
            <Link
              href="/services/implementation-sprint"
              style={{
                fontSize: "13px",
                fontWeight: 600,
                textDecoration: "none",
                color: "var(--color-muted)",
                transition: "color 150ms var(--ease)",
              }}
            >
              {isEn ? "5-Day Sprint" : "5-Day Sprint"}
            </Link>
            <Link
              href="/#cases"
              style={{
                fontSize: "13px",
                fontWeight: 600,
                textDecoration: "none",
                color: "var(--color-muted)",
              }}
            >
              {isEn ? "Case Records" : "Catatan Kasus"}
            </Link>
            <Link
              href="/#simulator"
              style={{
                fontSize: "13px",
                fontWeight: 600,
                textDecoration: "none",
                color: "var(--color-muted)",
              }}
            >
              {isEn ? "Governance Dial" : "Simulator Kendali"}
            </Link>
            <Link
              href="/templates"
              style={{
                fontSize: "13px",
                fontWeight: 600,
                textDecoration: "none",
                color: "var(--color-muted)",
              }}
            >
              {isEn ? "120 Templates" : "120 Solusi"}
            </Link>
            <Link
              href="/pricing"
              style={{
                fontSize: "13px",
                fontWeight: 600,
                textDecoration: "none",
                color: "var(--color-muted)",
              }}
            >
              {dict.nav.pricing}
            </Link>
            <Link
              href="/security"
              style={{
                fontSize: "13px",
                fontWeight: 600,
                textDecoration: "none",
                color: "var(--color-muted)",
              }}
            >
              {dict.nav.security}
            </Link>
          </nav>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "var(--space-2)" }}>
          <div className="desktop-controls" style={{ display: "flex", alignItems: "center", gap: "var(--space-2)" }}>
            <LocaleToggle currentLocale={locale} />
            <ThemeToggle ariaLabel={isEn ? "Toggle dark/light theme" : "Ganti tema tampilan"} />

            {isAuthenticated ? (
              <Link href="/app" className="btn btn-secondary btn-sm" style={{ borderRadius: "9999px", padding: "0 14px" }}>
                <span>{dict.nav.dashboard}</span>
                <ArrowRight size={14} aria-hidden="true" />
              </Link>
            ) : (
              <Link
                href="/services/automation-audit"
                className="btn btn-primary btn-sm"
                style={{ borderRadius: "9999px", padding: "0 14px", textDecoration: "none", fontWeight: 700, fontSize: "13px" }}
              >
                <Sparkles size={13} aria-hidden="true" />
                <span>{isEn ? "Book Audit" : "Audit Arsitektur"}</span>
              </Link>
            )}
          </div>

          <button
            type="button"
            className="icon-btn mobile-toggle"
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            aria-label={mobileOpen ? (isEn ? "Close menu" : "Tutup menu") : (isEn ? "Open menu" : "Buka menu")}
            onClick={() => setMobileOpen(!mobileOpen)}
            style={{ width: "38px", height: "38px", borderRadius: "9999px" }}
          >
            {mobileOpen ? <X size={18} aria-hidden="true" /> : <Menu size={18} aria-hidden="true" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileOpen && (
        <div
          id="mobile-menu"
          style={{
            borderTop: "1px solid var(--color-border)",
            background: "var(--color-surface)",
            padding: "var(--space-5)",
            display: "grid",
            gap: "var(--space-3)",
          }}
        >
          <Link
            href="/services/implementation-sprint"
            className="btn btn-ghost"
            style={{ justifyContent: "flex-start" }}
            onClick={() => setMobileOpen(false)}
          >
            {isEn ? "5-Day Done-For-You Sprint (Rp7.5M)" : "5-Day Sprint Implementasi (Rp7.5jt)"}
          </Link>
          <Link
            href="/solutions/marketing-agencies"
            className="btn btn-ghost"
            style={{ justifyContent: "flex-start" }}
            onClick={() => setMobileOpen(false)}
          >
            {isEn ? "Solutions for Marketing Agencies" : "Solusi untuk Agensi Pemasaran"}
          </Link>
          <Link
            href="/solutions/sales-operations"
            className="btn btn-ghost"
            style={{ justifyContent: "flex-start" }}
            onClick={() => setMobileOpen(false)}
          >
            {isEn ? "Sales Operations & Inbound Triage" : "Operasi Penjualan & Kualifikasi Lead"}
          </Link>
          <Link
            href="/templates"
            className="btn btn-ghost"
            style={{ justifyContent: "flex-start" }}
            onClick={() => setMobileOpen(false)}
          >
            {isEn ? "120 Workflow Templates" : "Katalog 120 Template"}
          </Link>
          <Link
            href="/pricing"
            className="btn btn-ghost"
            style={{ justifyContent: "flex-start" }}
            onClick={() => setMobileOpen(false)}
          >
            {dict.nav.pricing}
          </Link>
          <Link
            href="/security"
            className="btn btn-ghost"
            style={{ justifyContent: "flex-start" }}
            onClick={() => setMobileOpen(false)}
          >
            {dict.nav.security}
          </Link>

          <div
            style={{
              borderTop: "1px solid var(--color-border)",
              paddingTop: "var(--space-3)",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <LocaleToggle currentLocale={locale} />
            <ThemeToggle ariaLabel={isEn ? "Toggle dark/light theme" : "Ganti tema tampilan"} />
          </div>

          <Link
            href="/services/automation-audit"
            className="btn btn-primary"
            style={{ marginTop: "var(--space-2)" }}
            onClick={() => setMobileOpen(false)}
          >
            <Sparkles size={16} aria-hidden="true" />
            <span>{isEn ? "Book Free Audit (30 Min)" : "Jadwalkan Audit Gratis (30 Menit)"}</span>
          </Link>
        </div>
      )}
    </header>
  );
}
