import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  ShieldCheck,
  Lock,
  Clock,
  Calendar,
  Sparkles,
  Zap,
  Layers,
  Database,
  Building2,
  Send,
  Cpu,
  Inbox,
  History,
} from "lucide-react";
import { getLocale, getDict, pick } from "@/lib/i18n";
import { getSession } from "@/lib/auth/session";
import { getTemplate } from "@/lib/templates/catalog";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { LeadCaptureForm } from "@/components/LeadCaptureForm";
import { SchemaOrgJsonLd } from "@/components/SchemaOrgJsonLd";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const template = getTemplate(slug);
  if (!template) return { title: "Template Tidak Ditemukan | Atlas" };

  return {
    title: `${template.name.en || template.name.id} — Enterprise Workflow Implementation | Atlas`,
    description: template.summary.en || template.summary.id,
    alternates: {
      canonical: `https://atlas-automation.vercel.app/templates/${template.slug}`,
    },
  };
}

export default async function TemplateDetailPage({ params }: Props) {
  const { slug } = await params;
  const template = getTemplate(slug);
  if (!template) notFound();

  const locale = await getLocale();
  const { t } = await getDict();
  const session = await getSession();
  const isEn = locale === "en";

  const workflowPhases = [
    {
      step: "01",
      title: isEn ? "Multi-Channel Inbound & Gateway Verification" : "Intake Multi-Kanal & Verifikasi Gerbang Data",
      desc: isEn
        ? "Captures incoming data from your landing pages, ads, or forms and validates payloads to prevent corrupt records."
        : "Menangkap data masuk dari form iklan, landing page, atau email dan memverifikasi integritas payload.",
      icon: Inbox,
    },
    {
      step: "02",
      title: isEn ? "Deterministic Evaluation & Response Draft" : "Evaluasi Kriteria Kelayakan & Draf Respon",
      desc: isEn
        ? "Evaluates urgency, qualification rubrics, and criteria, then prepares an approved brand-voice response draft."
        : "Mengevaluasi kriteria kelayakan dan urgensi, lalu menyusun draf respon terpersonalisasi sesuai persona resmi.",
      icon: Cpu,
    },
    {
      step: "03",
      title: isEn ? "Mandatory Team Review Gatekeeper" : "Gerbang Persetujuan Tim Internal Wajib",
      desc: isEn
        ? "Action pauses in a human review console. Your operator approves or modifies the draft before any external dispatch."
        : "Tindakan tertahan di konsol review tim. Anggota tim Anda menyetujui atau mengedit draf dengan 1 klik sebelum terkirim.",
      icon: ShieldCheck,
    },
    {
      step: "04",
      title: isEn ? "Omnichannel Production Dispatch" : "Eksekusi Kanal Operasional Resmi",
      desc: isEn
        ? "Transmits verified messages via official WhatsApp Cloud API and updates deal stages synchronously in your CRM."
        : "Mengirimkan pesan resmi via WhatsApp Cloud API dan memperbarui status deal secara langsung di CRM Anda.",
      icon: Send,
    },
    {
      step: "05",
      title: isEn ? "Cryptographic Compliance Audit Trail" : "Catatan Jejak Audit Permanen",
      desc: isEn
        ? "Immutably records every payload, operator decision, timestamp, and latency metric for compliance review."
        : "Mencatat setiap payload, keputusan operator, stempel waktu, dan latensi secara permanen untuk audit kepatuhan.",
      icon: History,
    },
  ];

  const sprintDeliverables = [
    isEn
      ? "Turnkey 5-day implementation with dedicated automation engineer"
      : "Implementasi selesai-pakai 5 hari kerja dengan konsultan otomasi khusus",
    isEn
      ? "End-to-end integration with your existing CRM (HubSpot, Pipedrive, Sheets)"
      : "Integrasi penuh dengan CRM dan database yang sudah Anda gunakan",
    isEn
      ? "Official WhatsApp Cloud API / Meta Lead Ads webhook wiring"
      : "Penyambungan webhook resmi Meta Lead Ads dan WhatsApp Cloud API",
    isEn
      ? "Custom team approval console tailored to your operational roles"
      : "Laci konsol persetujuan manusia disesuaikan dengan peran tim Anda",
    isEn
      ? "Edge-case scenario simulation and duplicate prevention testing"
      : "Pengujian 20+ skenario batas dan verifikasi proteksi anti-duplikasi",
    isEn
      ? "Staff handover training and 14 days of active SLA monitoring"
      : "Sesi pelatihan tim operasional dan 14 hari pemantauan aktif SLA",
  ];

  return (
    <div className="atelier-dark-page" style={{ display: "flex", flexDirection: "column" }}>
      <SchemaOrgJsonLd type="service" />
      <Navbar locale={locale} dict={t} isAuthenticated={!!session} />

      <main id="main-content" style={{ flex: 1, padding: "var(--space-8) 0" }}>
        <div className="container" style={{ display: "grid", gap: "var(--space-6)" }}>
          {/* Back Navigation */}
          <div>
            <Link
              href="/templates"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "var(--space-2)",
                fontSize: "var(--text-14)",
                fontWeight: 600,
                textDecoration: "none",
                color: "var(--color-muted)",
                marginBottom: "var(--space-3)",
              }}
            >
              <ArrowLeft size={16} aria-hidden="true" />
              <span>{isEn ? "Back to Workflow Catalog" : "Kembali ke katalog template"}</span>
            </Link>

            {/* Service Header */}
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                alignItems: "flex-start",
                justifyContent: "space-between",
                gap: "var(--space-5)",
                borderBottom: "1px solid var(--color-border)",
                paddingBottom: "var(--space-6)",
              }}
            >
              <div style={{ display: "grid", gap: "var(--space-3)", maxWidth: "760px" }}>
                <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "var(--space-2)" }}>
                  <span className="badge badge-accent">
                    <Sparkles size={12} aria-hidden="true" />
                    <span>{isEn ? "TURNKEY ENTERPRISE SOLUTION" : "LAYANAN IMPLEMENTASI TURNKEY"}</span>
                  </span>
                  <span className="badge" style={{ textTransform: "capitalize" }}>
                    {template.category}
                  </span>
                  <span className="badge">5-Day Sprint</span>
                </div>

                <h1 style={{ fontSize: "clamp(1.85rem, 3.2vw, 2.6rem)", fontWeight: 750, lineHeight: 1.2 }}>
                  {pick(template.name, locale)}
                </h1>

                <p className="muted" style={{ fontSize: "var(--text-16)", lineHeight: 1.6 }}>
                  {pick(template.summary, locale)}
                </p>

                {/* Trust Badges */}
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    alignItems: "center",
                    gap: "var(--space-4)",
                    fontSize: "var(--text-12)",
                    color: "var(--color-muted)",
                    paddingTop: "var(--space-1)",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "var(--space-1)" }}>
                    <ShieldCheck size={14} style={{ color: "var(--color-accent)" }} aria-hidden="true" />
                    <span>{isEn ? "Human Review Gatekeeper" : "Gerbang Persetujuan Tim"}</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "var(--space-1)" }}>
                    <Lock size={14} style={{ color: "var(--color-success)" }} aria-hidden="true" />
                    <span>{isEn ? "Binding Mutual NDA" : "Perjanjian Kerahasiaan (NDA)"}</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "var(--space-1)" }}>
                    <Database size={14} style={{ color: "var(--color-accent)" }} aria-hidden="true" />
                    <span>{isEn ? "100% Client Data Ownership" : "Hak Milik Data 100% pada Klien"}</span>
                  </div>
                </div>
              </div>

              {/* Commercial Order Box */}
              <div
                className="panel"
                style={{
                  background: "var(--color-surface)",
                  borderColor: "var(--color-accent)",
                  boxShadow: "var(--shadow-raised)",
                  padding: "var(--space-5)",
                  display: "grid",
                  gap: "var(--space-3)",
                  minWidth: "280px",
                  maxWidth: "340px",
                }}
              >
                <div className="eyebrow">{isEn ? "IMPLEMENTATION PACKAGE" : "PAKET IMPLEMENTASI"}</div>
                <div style={{ fontSize: "var(--text-24)", fontWeight: 750, color: "var(--color-accent)", fontFamily: "var(--font-mono)" }}>
                  Rp 7.500.000
                </div>
                <div className="muted" style={{ fontSize: "var(--text-12)" }}>
                  {isEn
                    ? "Fixed flat fee • 5 business days turnkey handover • 14 days SLA monitoring included"
                    : "Biaya pasti selesai-pakai • 5 hari kerja live • Termasuk 14 hari pemantauan aktif SLA"}
                </div>

                <a href="#consult-form" className="btn btn-primary" style={{ textAlign: "center" }}>
                  <span>{isEn ? "Deploy in 5 Days" : "Implementasikan Alur Ini"}</span>
                  <ArrowRight size={15} aria-hidden="true" />
                </a>

                <a href="#consult-form" className="btn btn-secondary btn-sm" style={{ textAlign: "center" }}>
                  <span>{isEn ? "Book Free 30-Min Audit" : "Konsultasi & Audit Gratis"}</span>
                </a>
              </div>
            </div>
          </div>

          {/* Two-Column Solution Details */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
              gap: "var(--space-6)",
            }}
          >
            {/* Left Column: Business Problem & Operational Architecture */}
            <div style={{ display: "grid", gap: "var(--space-5)" }}>
              {/* Executive Business Solution */}
              <div className="panel" style={{ display: "grid", gap: "var(--space-3)" }}>
                <div className="eyebrow">{isEn ? "EXECUTIVE PROBLEM & OUTCOME" : "SOLUSI UNTUK PEMILIK BISNIS"}</div>
                <h2 style={{ fontSize: "var(--text-20)", fontWeight: 700 }}>
                  {isEn ? "Business Challenge & Operational Solution" : "Tantangan Operasional & Solusi Nyata"}
                </h2>
                <p className="muted" style={{ fontSize: "var(--text-14)", lineHeight: 1.6 }}>
                  {pick(template.ownerExplanation, locale)}
                </p>
              </div>

              {/* High-Level Operational Architecture (No internal code leaks) */}
              <div className="panel" style={{ display: "grid", gap: "var(--space-3)" }}>
                <div className="eyebrow">{isEn ? "OPERATIONAL TOPOLOGY" : "ARSITEKTUR ALUR OPERASIONAL"}</div>
                <h2 style={{ fontSize: "var(--text-20)", fontWeight: 700 }}>
                  {isEn ? "Five-Phase Governed Execution" : "Lima Tahap Eksekusi Terarah"}
                </h2>

                <div style={{ display: "grid", gap: "var(--space-3)" }}>
                  {workflowPhases.map((phase, idx) => {
                    const IconComp = phase.icon;
                    return (
                      <div
                        key={idx}
                        style={{
                          padding: "var(--space-3) var(--space-4)",
                          border: "1px solid var(--color-border)",
                          borderRadius: "var(--radius-md)",
                          display: "flex",
                          alignItems: "flex-start",
                          gap: "var(--space-3)",
                          background: "var(--color-surface-2)",
                        }}
                      >
                        <span className="sprint-day-num" style={{ marginTop: "2px" }}>
                          {phase.step}
                        </span>
                        <div style={{ display: "grid", gap: "2px" }}>
                          <div style={{ fontWeight: 650, fontSize: "var(--text-14)", display: "flex", alignItems: "center", gap: "var(--space-2)" }}>
                            <IconComp size={15} style={{ color: "var(--color-accent)" }} aria-hidden="true" />
                            <span>{phase.title}</span>
                          </div>
                          <p className="muted" style={{ fontSize: "var(--text-13)", lineHeight: 1.5, margin: 0 }}>
                            {phase.desc}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Right Column: Sprint Deliverables & SLA Guarantees */}
            <div style={{ display: "grid", gap: "var(--space-5)" }}>
              {/* Deliverables Checklist */}
              <div className="panel" style={{ display: "grid", gap: "var(--space-3)" }}>
                <div className="eyebrow">{isEn ? "SCOPE OF WORK" : "RUANG LINGKUP IMPLEMENTASI"}</div>
                <h2 style={{ fontSize: "var(--text-20)", fontWeight: 700 }}>
                  {isEn ? "What's Included in Your 5-Day Sprint" : "Termasuk dalam Paket Sprint 5 Hari"}
                </h2>

                <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gap: "var(--space-3)" }}>
                  {sprintDeliverables.map((item, idx) => (
                    <li key={idx} style={{ display: "flex", gap: "var(--space-2)", alignItems: "flex-start", fontSize: "var(--text-14)" }}>
                      <CheckCircle2 size={16} style={{ color: "var(--color-success)", flexShrink: 0, marginTop: "3px" }} aria-hidden="true" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Confidentiality & Security Standards */}
              <div
                className="panel"
                style={{
                  display: "grid",
                  gap: "var(--space-3)",
                  background: "var(--color-surface)",
                  border: "1px solid var(--color-border-strong)",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "var(--space-2)" }}>
                  <Lock size={18} style={{ color: "var(--color-accent)" }} aria-hidden="true" />
                  <h3 style={{ fontSize: "var(--text-16)", fontWeight: 700 }}>
                    {isEn ? "Confidentiality & Compliance SLA" : "Kerahasiaan & Jaminan Kepatuhan"}
                  </h3>
                </div>

                <p className="muted" style={{ fontSize: "var(--text-13)", lineHeight: 1.6, margin: 0 }}>
                  {isEn
                    ? "All client engagements execute a formal mutual Non-Disclosure Agreement (NDA). Your operational workflows, customer databases, and correspondence remain strictly confidential in private encrypted infrastructure. Zero client data is ever used to train public AI models."
                    : "Seluruh proyek implementasi dilindungi Perjanjian Kerahasiaan (NDA) resmi yang mengikat secara hukum. Alur kerja operasional dan database kontak Anda tetap terisolasi dalam infrastruktur privat berenkripsi, dan dijamin 100% tidak pernah digunakan untuk melatih model AI pihak ketiga."}
                </p>

                <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--space-2)", paddingTop: "var(--space-1)" }}>
                  <span className="badge badge-accent">{isEn ? "Mutual NDA Guaranteed" : "Garansi NDA Resmi"}</span>
                  <span className="badge">{isEn ? "Dedicated Engineer" : "Konsultan Khusus"}</span>
                  <span className="badge">{isEn ? "14-Day SLA" : "SLA 14 Hari"}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Embedded Consultation & Booking Form */}
          <div id="consult-form" style={{ marginTop: "var(--space-6)" }}>
            <div className="panel" style={{ maxWidth: "720px", margin: "0 auto", padding: "var(--space-6)" }}>
              <div style={{ textAlign: "center", marginBottom: "var(--space-4)" }}>
                <span className="eyebrow">{isEn ? "SCHEDULE KICKOFF" : "MULAI IMPLEMENTASI"}</span>
                <h2 style={{ fontSize: "var(--text-24)", fontWeight: 700, marginTop: "var(--space-1)" }}>
                  {isEn
                    ? `Deploy "${pick(template.name, locale)}" in 5 Days`
                    : `Jadwalkan Implementasi "${pick(template.name, locale)}"`}
                </h2>
                <p className="muted" style={{ fontSize: "var(--text-14)", marginTop: "var(--space-1)" }}>
                  {isEn
                    ? "Claim your free 30-minute architecture audit or lock in a 5-day implementation sprint."
                    : "Dapatkan sesi audit arsitektur alur 30 menit gratis atau amankan jadwal sprint implementasi 5 hari Anda."}
                </p>
              </div>

              <LeadCaptureForm locale={locale} source={`template_${template.slug}`} />
            </div>
          </div>
        </div>
      </main>

      <Footer dict={t} />
    </div>
  );
}
