import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Search, Sparkles, ShieldCheck, Lock, Clock, Calendar } from "lucide-react";
import { getLocale, getDict, pick } from "@/lib/i18n";
import { getSession } from "@/lib/auth/session";
import { templates } from "@/lib/templates/catalog";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "120 Validated Enterprise Workflow Solutions | Atlas",
    description:
      "Explore 120 battle-tested business automation solutions across 12 commercial industries: sales, marketing, customer support, real estate, automotive, finance, and recruitment. 5-day turnkey deployment under strict NDA.",
    alternates: {
      canonical: "https://atlas-automation.vercel.app/templates",
    },
  };
}

interface Props {
  searchParams: Promise<{ category?: string; q?: string }>;
}

export default async function TemplatesPage({ searchParams }: Props) {
  const { category, q } = await searchParams;
  const locale = await getLocale();
  const { t } = await getDict();
  const session = await getSession();
  const isEn = locale === "en";

  const query = (q || "").trim().toLowerCase();
  const selectedCat = category || "all";

  const filtered = templates.filter((tpl) => {
    const matchesCat = selectedCat === "all" || tpl.category === selectedCat;
    const name = pick(tpl.name, locale).toLowerCase();
    const summary = pick(tpl.summary, locale).toLowerCase();
    const matchesQuery = !query || name.includes(query) || summary.includes(query) || tpl.tags.some((t) => t.includes(query));
    return matchesCat && matchesQuery;
  });

  const categories = [
    { id: "all", label: t.templates.all },
    { id: "sales", label: t.templates.sales },
    { id: "marketing", label: t.templates.marketing },
    { id: "support", label: t.templates.support },
    { id: "property", label: t.templates.property },
    { id: "dealer", label: t.templates.dealer },
    { id: "education", label: t.templates.education },
    { id: "travel", label: t.templates.travel },
    { id: "agency", label: t.templates.agency },
    { id: "recruiting", label: t.templates.recruiting },
    { id: "finance", label: t.templates.finance },
    { id: "ecommerce", label: t.templates.ecommerce },
    { id: "services", label: t.templates.services },
    { id: "operations", label: t.templates.operations },
  ];

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Navbar locale={locale} dict={t} isAuthenticated={!!session} />

      <main id="main-content" style={{ flex: 1, padding: "var(--space-8) 0" }}>
        <div className="container" style={{ display: "grid", gap: "var(--space-6)" }}>
          {/* Commercial Header & Proposition */}
          <div style={{ display: "grid", gap: "var(--space-3)" }}>
            <div style={{ display: "inline-flex" }}>
              <span className="badge badge-accent">
                <Sparkles size={12} aria-hidden="true" />
                <span>
                  {isEn
                    ? "TURNKEY ENTERPRISE CATALOG • 5-DAY IMPLEMENTATION SPRINT"
                    : "KATALOG SOLUSI ENTERPRISE • SPRINT TURNKEY 5 HARI"}
                </span>
              </span>
            </div>

            <h1 style={{ fontSize: "clamp(2rem, 3.4vw, 2.75rem)", fontWeight: 750, letterSpacing: "-0.025em" }}>
              {isEn
                ? "120 Validated Business Workflow Solutions"
                : "120 Solusi Alur Kerja Bisnis Siap Implementasi"}
            </h1>

            <p className="muted" style={{ fontSize: "var(--text-16)", maxWidth: "780px", lineHeight: 1.6 }}>
              {isEn
                ? "Every blueprint below is fully production-verified. We adapt each workflow to your exact qualification rubrics, connect your existing tools (WhatsApp, CRM, Sheets), and hand over a live supervised system in 5 business days for a fixed fee of Rp7.500.000."
                : "Seluruh blueprint di bawah ini siap kami terapkan secara turnkey ke sistem operasional perusahaan Anda. Kami mengaudit alur Anda, menyambungkan kanal resmi (WhatsApp, CRM, Sheets), dan menyerahkan sistem yang sudah berjalan dalam 5 hari kerja (Rp7.500.000 flat) di bawah jaminan NDA resmi."}
            </p>

            {/* Commercial Trust Strip */}
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                alignItems: "center",
                gap: "var(--space-4)",
                fontSize: "var(--text-12)",
                color: "var(--color-muted)",
                paddingTop: "var(--space-2)",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "var(--space-1)" }}>
                <Clock size={14} style={{ color: "var(--color-accent)" }} aria-hidden="true" />
                <span>{isEn ? "5-Day Handover Guaranteed" : "Garansi Serah Terima 5 Hari"}</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "var(--space-1)" }}>
                <ShieldCheck size={14} style={{ color: "var(--color-success)" }} aria-hidden="true" />
                <span>{isEn ? "Mandatory Human Review Gate" : "Gerbang Persetujuan Tim Wajib"}</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "var(--space-1)" }}>
                <Lock size={14} style={{ color: "var(--color-accent)" }} aria-hidden="true" />
                <span>{isEn ? "Mutual NDA & 100% Data Ownership" : "NDA Resmi & Data Milik Klien 100%"}</span>
              </div>
            </div>
          </div>

          {/* Search & Industry Filter Bar */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "var(--space-4)",
              borderBottom: "1px solid var(--color-border)",
              paddingBottom: "var(--space-4)",
            }}
          >
            <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--space-2)" }}>
              {categories.map((c) => (
                <Link
                  key={c.id}
                  href={`/templates?category=${c.id}${query ? `&q=${encodeURIComponent(query)}` : ""}`}
                  className={`btn btn-sm ${selectedCat === c.id ? "btn-primary" : "btn-secondary"}`}
                  style={{ textDecoration: "none" }}
                >
                  {c.label}
                </Link>
              ))}
            </div>

            <form method="GET" action="/templates" style={{ display: "flex", gap: "var(--space-2)", minWidth: "260px" }}>
              {selectedCat !== "all" && <input type="hidden" name="category" value={selectedCat} />}
              <div style={{ position: "relative", width: "100%" }}>
                <Search
                  size={16}
                  aria-hidden="true"
                  style={{ position: "absolute", left: "12px", top: "14px", color: "var(--color-muted)" }}
                />
                <input
                  type="search"
                  name="q"
                  defaultValue={query}
                  placeholder={isEn ? "Search by keyword or vertical..." : "Cari berdasarkan kata kunci atau industri..."}
                  aria-label={t.templates.search}
                  className="input"
                  style={{ paddingLeft: "36px", minHeight: "44px" }}
                />
              </div>
            </form>
          </div>

          {/* Templates Grid */}
          {filtered.length === 0 ? (
            <div className="empty">
              <p>{t.templates.empty}</p>
              <Link href="/templates" className="btn btn-secondary btn-sm">
                {isEn ? "Show all solutions" : "Tampilkan semua solusi"}
              </Link>
            </div>
          ) : (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
                gap: "var(--space-4)",
              }}
            >
              {filtered.map((template) => (
                <div
                  key={template.id}
                  className="bento-card"
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    gap: "var(--space-4)",
                  }}
                >
                  <div style={{ display: "grid", gap: "var(--space-2)" }}>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                      <span className="badge badge-accent" style={{ textTransform: "capitalize" }}>
                        {template.category}
                      </span>
                      <span className="badge" style={{ fontSize: "11px" }}>
                        {isEn ? "5-Day Sprint" : "Sprint 5 Hari"}
                      </span>
                    </div>

                    <h2 style={{ fontSize: "var(--text-18)", fontWeight: 700 }}>
                      <Link
                        href={`/templates/${template.slug}`}
                        style={{ textDecoration: "none" }}
                      >
                        {pick(template.name, locale)}
                      </Link>
                    </h2>

                    <p className="muted" style={{ fontSize: "var(--text-14)", lineHeight: 1.5 }}>
                      {pick(template.summary, locale)}
                    </p>
                  </div>

                  <div
                    style={{
                      borderTop: "1px solid var(--color-border)",
                      paddingTop: "var(--space-3)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      fontSize: "var(--text-12)",
                    }}
                  >
                    <span className="muted" style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                      <ShieldCheck size={13} style={{ color: "var(--color-success)" }} aria-hidden="true" />
                      <span>{isEn ? "Human Review Gate" : "Izin Tim Wajib"}</span>
                    </span>

                    <Link
                      href={`/templates/${template.slug}`}
                      className="btn btn-primary btn-sm"
                    >
                      <span>{isEn ? "View Solution Specs" : "Lihat Spesifikasi Layanan"}</span>
                      <ArrowRight size={14} aria-hidden="true" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer dict={t} />
    </div>
  );
}
