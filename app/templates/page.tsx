import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Search } from "lucide-react";
import { getLocale, getDict, pick } from "@/lib/i18n";
import { getSession } from "@/lib/auth/session";
import { templates } from "@/lib/templates/catalog";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Katalog 120+ Blueprint Workflow AI Teruji | Atlas",
    description:
      "Jelajahi 120 template alur kerja AI teruji di 12 kategori industri: penjualan, pemasaran, agensi, properti, dealer, support, dan rekrutmen.",
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
          <div>
            <div className="eyebrow" style={{ marginBottom: "var(--space-2)" }}>Katalog Produksi</div>
            <h1 style={{ fontSize: "var(--text-32)" }}>{t.templates.title}</h1>
            <p className="muted" style={{ fontSize: "var(--text-16)", maxWidth: "640px", marginTop: "var(--space-2)" }}>
              {t.templates.lead}
            </p>
          </div>

          {/* Search & Filter Bar */}
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
                  placeholder={t.templates.search}
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
                Tampilkan semua template
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
                  className="panel"
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
                      <span className="badge">v{template.version}</span>
                    </div>

                    <h2 style={{ fontSize: "var(--text-18)" }}>
                      <Link
                        href={`/templates/${template.slug}`}
                        style={{ textDecoration: "none" }}
                      >
                        {pick(template.name, locale)}
                      </Link>
                    </h2>

                    <p className="muted" style={{ fontSize: "var(--text-14)" }}>
                      {pick(template.summary, locale)}
                    </p>

                    <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--space-1)", marginTop: "var(--space-1)" }}>
                      {template.tags.map((tag) => (
                        <span key={tag} className="badge" style={{ fontSize: "11px" }}>
                          #{tag}
                        </span>
                      ))}
                    </div>
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
                    <span className="muted">
                      {template.nodes.length} {t.templates.steps} &bull; {t.templates.approval}
                    </span>
                    <Link
                      href={`/templates/${template.slug}`}
                      className="btn btn-primary btn-sm"
                    >
                      <span>Lihat detail</span>
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
