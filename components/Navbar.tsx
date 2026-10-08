"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, ArrowRight } from "lucide-react";
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

  return (
    <header
      role="banner"
      style={{
        borderBottom: "1px solid var(--color-border)",
        background: "var(--color-surface)",
        position: "sticky",
        top: 0,
        zIndex: 40,
      }}
    >
      <div
        className="container"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: "64px",
          gap: "var(--space-4)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "var(--space-6)" }}>
          <Link
            href="/"
            style={{
              textDecoration: "none",
              display: "inline-flex",
              alignItems: "center",
              gap: "var(--space-2)",
              fontWeight: 700,
              fontSize: "var(--text-20)",
              letterSpacing: "-0.03em",
            }}
          >
            <span>Atlas</span>
            <span className="badge">MVP</span>
          </Link>

          <nav
            role="navigation"
            aria-label="Navigasi utama"
            className="desktop-nav"
          >
            <Link
              href="/templates"
              style={{
                fontSize: "var(--text-14)",
                fontWeight: 600,
                textDecoration: "none",
                color: "var(--color-muted)",
              }}
            >
              {dict.nav.templates}
            </Link>
            <Link
              href="/pricing"
              style={{
                fontSize: "var(--text-14)",
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
                fontSize: "var(--text-14)",
                fontWeight: 600,
                textDecoration: "none",
                color: "var(--color-muted)",
              }}
            >
              {dict.nav.security}
            </Link>
          </nav>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "var(--space-3)" }}>
          <div className="desktop-controls">
            <LocaleToggle currentLocale={locale} />
            <ThemeToggle />

            {isAuthenticated ? (
              <Link href="/app" className="btn btn-primary btn-sm">
                <span>{dict.nav.dashboard}</span>
                <ArrowRight size={16} aria-hidden="true" />
              </Link>
            ) : (
              <div style={{ display: "flex", alignItems: "center", gap: "var(--space-2)" }}>
                <Link href="/login" className="btn btn-ghost btn-sm">
                  {dict.nav.login}
                </Link>
                <Link href="/signup" className="btn btn-primary btn-sm">
                  {dict.nav.signup}
                </Link>
              </div>
            )}
          </div>

          <button
            type="button"
            className="icon-btn mobile-toggle"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-expanded={mobileOpen}
            aria-label={mobileOpen ? "Tutup menu" : "Buka menu"}
            style={{ minWidth: "44px", minHeight: "44px" }}
          >
            {mobileOpen ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div
          role="dialog"
          aria-label="Menu navigasi ponsel"
          style={{
            borderTop: "1px solid var(--color-border)",
            background: "var(--color-surface)",
            padding: "var(--space-5)",
            display: "grid",
            gap: "var(--space-4)",
          }}
        >
          <nav
            style={{ display: "grid", gap: "var(--space-3)" }}
            aria-label="Tautan seluler"
          >
            <Link
              href="/templates"
              onClick={() => setMobileOpen(false)}
              style={{
                fontSize: "var(--text-16)",
                fontWeight: 600,
                textDecoration: "none",
                padding: "var(--space-2) 0",
              }}
            >
              {dict.nav.templates}
            </Link>
            <Link
              href="/pricing"
              onClick={() => setMobileOpen(false)}
              style={{
                fontSize: "var(--text-16)",
                fontWeight: 600,
                textDecoration: "none",
                padding: "var(--space-2) 0",
              }}
            >
              {dict.nav.pricing}
            </Link>
            <Link
              href="/security"
              onClick={() => setMobileOpen(false)}
              style={{
                fontSize: "var(--text-16)",
                fontWeight: 600,
                textDecoration: "none",
                padding: "var(--space-2) 0",
              }}
            >
              {dict.nav.security}
            </Link>
          </nav>

          <hr style={{ border: 0, borderTop: "1px solid var(--color-border)", margin: 0 }} />

          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <LocaleToggle currentLocale={locale} />
            <ThemeToggle />
          </div>

          <div style={{ display: "grid", gap: "var(--space-2)", marginTop: "var(--space-2)" }}>
            {isAuthenticated ? (
              <Link href="/app" className="btn btn-primary" onClick={() => setMobileOpen(false)}>
                <span>{dict.nav.dashboard}</span>
                <ArrowRight size={16} aria-hidden="true" />
              </Link>
            ) : (
              <>
                <Link href="/login" className="btn btn-secondary" onClick={() => setMobileOpen(false)}>
                  {dict.nav.login}
                </Link>
                <Link href="/signup" className="btn btn-primary" onClick={() => setMobileOpen(false)}>
                  {dict.nav.signup}
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
