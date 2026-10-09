import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle2, ShieldCheck, Sparkles, Headphones, AlertTriangle, Clock } from "lucide-react";
import { getLocale, getDict } from "@/lib/i18n";
import { getSession } from "@/lib/auth/session";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { LeadCaptureForm } from "@/components/LeadCaptureForm";
import { SchemaOrgJsonLd } from "@/components/SchemaOrgJsonLd";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Supervised Customer Support & Ticket Escalation | Atlas",
    description:
      "Triage urgent support tickets, categorize sentiment, and draft expert responses with mandatory human review before customer dispatch.",
    alternates: {
      canonical: "https://atlas-automation.vercel.app/solutions/customer-support",
    },
  };
}

export default async function CustomerSupportSolutionPage() {
  const locale = await getLocale();
  const { t } = await getDict();
  const session = await getSession();
  const isEn = locale === "en";

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <SchemaOrgJsonLd type="software" />
      <Navbar locale={locale} dict={t} isAuthenticated={!!session} />

      <main id="main-content" style={{ flex: 1 }}>
        <section
          style={{
            padding: "var(--space-8) 0 var(--space-7) 0",
            borderBottom: "1px solid var(--color-border)",
            background: "radial-gradient(ellipse at top, var(--color-surface-2), var(--color-bg))",
          }}
        >
          <div className="container" style={{ display: "grid", gap: "var(--space-5)", maxWidth: "860px" }}>
            <div style={{ display: "inline-flex" }}>
              <span className="badge badge-accent">
                <Sparkles size={12} aria-hidden="true" />
                <span>SOLUSI CUSTOMER SUPPORT &amp; ESKALASI</span>
              </span>
            </div>

            <h1 style={{ fontSize: "clamp(2.2rem, 5vw, 3.4rem)", lineHeight: 1.15, letterSpacing: "-0.02em" }}>
              {isEn
                ? "Resolve Support Inquiries Faster Without Sacrificing the Human Touch."
                : "Selesaikan Tiket Dukungan Pelanggan Lebih Cepat Tanpa Kehilangan Sentuhan Manusia."}
            </h1>

            <p className="muted" style={{ fontSize: "var(--text-18)", lineHeight: 1.6 }}>
              {isEn
                ? "Generic AI chatbots frustrate customers with incorrect policy answers. Atlas analyzes sentiment, categorizes urgent issues, and drafts contextual replies that your support staff approves before sending."
                : "Chatbot generik sering membuat pelanggan kesal karena jawaban yang salah. Atlas menganalisis sentimen, mengelompokkan masalah darurat, dan menyiapkan draf jawaban yang ditinjau agen Anda sebelum dikirim."}
            </p>

            <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "var(--space-4)", paddingTop: "var(--space-2)" }}>
              <Link href="/services/implementation-sprint" className="btn btn-primary">
                <span>{isEn ? "Deploy 5-Day Support Sprint" : "Deploy 5-Day Support Sprint"}</span>
                <ArrowRight size={16} aria-hidden="true" />
              </Link>
              <Link href="/services/automation-audit" className="btn btn-secondary">
                <span>{isEn ? "Book Process Audit" : "Jadwalkan Audit Alur Kerja"}</span>
              </Link>
            </div>
          </div>
        </section>

        {/* 3 Pillars */}
        <section style={{ padding: "var(--space-8) 0", borderBottom: "1px solid var(--color-border)" }}>
          <div className="container" style={{ display: "grid", gap: "var(--space-6)" }}>
            <div>
              <div className="eyebrow" style={{ marginBottom: "var(--space-2)" }}>DUKUNGAN PELANGGAN TERKONTROL</div>
              <h2 style={{ fontSize: "var(--text-28)" }}>
                {isEn ? "Human Oversight for High-Stakes Customer Care" : "Pengawasan Manusia untuk Menjaga Kepuasan Pelanggan"}
              </h2>
            </div>

            <div className="bento-grid">
              <div className="panel" style={{ display: "grid", gap: "var(--space-3)" }}>
                <AlertTriangle size={24} style={{ color: "var(--color-warning)" }} aria-hidden="true" />
                <h3 style={{ fontSize: "var(--text-18)", fontWeight: 700 }}>
                  {isEn ? "Sentiment & Urgent Triage" : "Triage Sentimen & Darurat"}
                </h3>
                <p className="muted" style={{ fontSize: "var(--text-14)", lineHeight: 1.5 }}>
                  {isEn
                    ? "Frustrated clients or VIP accounts are tagged and escalated instantly to senior leads, bypassing standard queues."
                    : "Keluhan mendesak atau akun prioritas langsung diberi tag darurat dan dieskalasikan ke tim senior."}
                </p>
              </div>

              <div className="panel" style={{ display: "grid", gap: "var(--space-3)" }}>
                <Headphones size={24} style={{ color: "var(--color-accent)" }} aria-hidden="true" />
                <h3 style={{ fontSize: "var(--text-18)", fontWeight: 700 }}>
                  {isEn ? "Knowledge-Grounded Drafts" : "Draf Berdasarkan SOP Terverifikasi"}
                </h3>
                <p className="muted" style={{ fontSize: "var(--text-14)", lineHeight: 1.5 }}>
                  {isEn
                    ? "AI generates response drafts strictly constrained by your approved FAQs and knowledge base guidelines."
                    : "AI menyusun draf jawaban hanya berdasarkan pedoman SOP dan FAQ resmi yang disetujui perusahaan Anda."}
                </p>
              </div>

              <div className="panel" style={{ display: "grid", gap: "var(--space-3)" }}>
                <ShieldCheck size={24} style={{ color: "var(--color-success)" }} aria-hidden="true" />
                <h3 style={{ fontSize: "var(--text-18)", fontWeight: 700 }}>
                  {isEn ? "Zero Embarrassing AI Errors" : "Nol Kesalahan Memalukan"}
                </h3>
                <p className="muted" style={{ fontSize: "var(--text-14)", lineHeight: 1.5 }}>
                  {isEn
                    ? "No message is sent without your agent's one-click signoff, preserving customer trust and empathy."
                    : "Tidak ada pesan keluar tanpa persetujuan agen Anda, menjaga empati dan integritas pelayanan."}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Embedded Booking */}
        <section style={{ padding: "var(--space-8) 0" }}>
          <div className="container" style={{ maxWidth: "680px" }}>
            <LeadCaptureForm locale={locale} source="customer_support_page" />
          </div>
        </section>
      </main>

      <Footer dict={t} />
    </div>
  );
}
