import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle2, ShieldCheck, Sparkles, Clock, FileCheck2, Calculator } from "lucide-react";
import { getLocale, getDict } from "@/lib/i18n";
import { getSession } from "@/lib/auth/session";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { LeadCaptureForm } from "@/components/LeadCaptureForm";
import { SchemaOrgJsonLd } from "@/components/SchemaOrgJsonLd";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Free 30-Minute Business Workflow Audit | Atlas",
    description:
      "Identify operational bottlenecks, calculate capacity gains, and receive a customized workflow automation blueprint. 100% confidential and free.",
    alternates: {
      canonical: "https://atlas-automation.vercel.app/services/automation-audit",
    },
  };
}

export default async function AutomationAuditPage() {
  const locale = await getLocale();
  const { t } = await getDict();
  const session = await getSession();
  const isEn = locale === "en";

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <SchemaOrgJsonLd type="service" />
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
                <span>FREE 30-MINUTE DISCOVERY SESSION</span>
              </span>
            </div>

            <h1 style={{ fontSize: "clamp(2.2rem, 5vw, 3.4rem)", lineHeight: 1.15, letterSpacing: "-0.02em" }}>
              {isEn
                ? "Uncover Your Operational Bottlenecks with a 30-Minute Workflow Audit."
                : "Temukan Titik Kebocoran Lead & Bottleneck Operasional dalam Audit 30 Menit."}
            </h1>

            <p className="muted" style={{ fontSize: "var(--text-18)", lineHeight: 1.6 }}>
              {isEn
                ? "Spend 30 minutes with an automation solutions engineer to diagnose your current lead handling and operational workflows. Receive a tailored workflow blueprint and ROI feasibility assessment—completely free."
                : "Diskusikan proses kualifikasi lead dan alur kerja manual Anda bersama tim spesialis otomasi Atlas. Dapatkan blueprint alur kerja terarah dan kalkulasi penghematan operasional tanpa biaya komitmen."}
            </p>
          </div>
        </section>

        {/* 3 Core Deliverables */}
        <section style={{ padding: "var(--space-8) 0", borderBottom: "1px solid var(--color-border)" }}>
          <div className="container" style={{ display: "grid", gap: "var(--space-6)" }}>
            <div>
              <div className="eyebrow" style={{ marginBottom: "var(--space-2)" }}>HASIL SESI AUDIT</div>
              <h2 style={{ fontSize: "var(--text-28)" }}>
                {isEn ? "What You Receive from the Session" : "Apa yang Anda Dapatkan dari Sesi Audit"}
              </h2>
            </div>

            <div className="bento-grid">
              <div className="panel" style={{ display: "grid", gap: "var(--space-3)" }}>
                <Clock size={24} style={{ color: "var(--color-accent)" }} aria-hidden="true" />
                <h3 style={{ fontSize: "var(--text-18)", fontWeight: 700 }}>
                  {isEn ? "Bottleneck Diagnostics" : "Diagnosa Bottleneck Operasional"}
                </h3>
                <p className="muted" style={{ fontSize: "var(--text-14)", lineHeight: 1.5 }}>
                  {isEn
                    ? "We audit where incoming leads stall, how much staff time is lost to copy-pasting, and why response times exceed 5 minutes."
                    : "Kami membedah di mana lead Anda tertahan, berapa jam staf habis untuk input data manual, dan mengapa waktu respon melambat."}
                </p>
              </div>

              <div className="panel" style={{ display: "grid", gap: "var(--space-3)" }}>
                <FileCheck2 size={24} style={{ color: "var(--color-accent)" }} aria-hidden="true" />
                <h3 style={{ fontSize: "var(--text-18)", fontWeight: 700 }}>
                  {isEn ? "Custom Workflow Blueprint" : "Blueprint Arsitektur Alur Kerja"}
                </h3>
                <p className="muted" style={{ fontSize: "var(--text-14)", lineHeight: 1.5 }}>
                  {isEn
                    ? "A comprehensive operational architecture mapping Inbound Triggers, Qualification Rules, Team Approval Gates, and Outbound Actions."
                    : "Rancangan arsitektur alur kerja bisnis memetakan Trigger Masuk, Kriteria Kualifikasi, Gerbang Persetujuan Tim, dan Aksi Keluar."}
                </p>
              </div>

              <div className="panel" style={{ display: "grid", gap: "var(--space-3)" }}>
                <Calculator size={24} style={{ color: "var(--color-accent)" }} aria-hidden="true" />
                <h3 style={{ fontSize: "var(--text-18)", fontWeight: 700 }}>
                  {isEn ? "Capacity & ROI Feasibility" : "Kalkulasi Kapasitas & Balik Modal"}
                </h3>
                <p className="muted" style={{ fontSize: "var(--text-14)", lineHeight: 1.5 }}>
                  {isEn
                    ? "A quantitative projection showing expected hours saved monthly, payroll reduction, and estimated payback timeframe."
                    : "Proyeksi terukur mengenai estimasi jam kerja yang dihemat per bulan, penghematan beban tim, dan waktu balik modal."}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Embedded Booking Form */}
        <section style={{ padding: "var(--space-8) 0" }}>
          <div className="container" style={{ maxWidth: "680px" }}>
            <LeadCaptureForm locale={locale} source="audit_page" />
          </div>
        </section>
      </main>

      <Footer dict={t} />
    </div>
  );
}
