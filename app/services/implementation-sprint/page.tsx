import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle2, ShieldCheck, Clock, Sparkles, XCircle, Calendar, FileText, Cpu, Send } from "lucide-react";
import { getLocale, getDict } from "@/lib/i18n";
import { getSession } from "@/lib/auth/session";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { LeadCaptureForm } from "@/components/LeadCaptureForm";
import { SchemaOrgJsonLd } from "@/components/SchemaOrgJsonLd";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "5-Day Automation Implementation Sprint (Rp7.5M) | Atlas",
    description:
      "Deploy a production-grade, supervised AI workflow with mandatory human approval in 5 business days. Fixed price Rp7.500.000 with complete documentation and monitoring.",
    alternates: {
      canonical: "https://atlas-automation.vercel.app/services/implementation-sprint",
    },
    openGraph: {
      title: "5-Day Automation Implementation Sprint | Atlas",
      description:
        "Full-cycle implementation: workflow audit, custom schema, channel integration, human approval drawer, and production deployment in 5 business days.",
      url: "https://atlas-automation.vercel.app/services/implementation-sprint",
      type: "website",
    },
  };
}

export default async function ImplementationSprintPage() {
  const locale = await getLocale();
  const { t } = await getDict();
  const session = await getSession();
  const isEn = locale === "en";

  const milestones = [
    {
      day: "Hari 01",
      dayEn: "Day 01",
      title: "Discovery & Audit Alur Kerja",
      titleEn: "Process Discovery & Workflow Audit",
      desc: "Wawancara mendalam dengan tim operasional untuk memetakan form intake, kriteria kualifikasi lead, dan peran persetujuan tim.",
      descEn: "In-depth interview with your operations team to map lead intake forms, qualification criteria, and approval roles.",
      icon: Calendar,
    },
    {
      day: "Hari 02",
      dayEn: "Day 02",
      title: "Pemilihan Template & Desain Skema Zod",
      titleEn: "Template Adaptation & Zod Schema Architecture",
      desc: "Menyesuaikan dari 120 template terverifikasi Atlas, menyusun validasi skema data, dan merumuskan prompt evaluasi AI terstruktur.",
      descEn: "Adapting from our 120 validated templates, defining strict Zod schemas, and configuring structured AI scoring rubrics.",
      icon: FileText,
    },
    {
      day: "Hari 03",
      dayEn: "Day 03",
      title: "Integrasi Kanal & Penyusunan Draf",
      titleEn: "Channel Integration & Outbox Wiring",
      desc: "Menghubungkan webhook sumber lead (form iklan/landing page), draf respon WhatsApp/Email, dan pipeline CRM yang sudah Anda pakai.",
      descEn: "Connecting lead intake webhooks, draft WhatsApp/Email responders, and existing CRM pipelines.",
      icon: Cpu,
    },
    {
      day: "Hari 04",
      dayEn: "Day 04",
      title: "Pengujian Sandbox & Tuning Gerbang Persetujuan",
      titleEn: "Sandbox Verification & Human Gate Tuning",
      desc: "Menjalankan 20+ simulasi skenario batas (edge-case), memastikan laci persetujuan manusia bekerja mulus, dan validasi idempotensi.",
      descEn: "Running 20+ synthetic edge cases, fine-tuning the review drawer thresholds, and verifying duplicate prevention.",
      icon: ShieldCheck,
    },
    {
      day: "Hari 05",
      dayEn: "Day 05",
      title: "Peluncuran Produksi, Serah Terima & Monitoring",
      titleEn: "Production Go-Live, Team Handover & SLA Monitoring",
      desc: "Aktivasi alur kerja di lingkungan produksi, pelatihan operator tim Anda, penyerahan dokumentasi, dan inisiasi monitoring 14 hari.",
      descEn: "Deploying to production, training your team on the review console, handing over documentation, and initiating 14-day monitoring.",
      icon: Send,
    },
  ];

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <SchemaOrgJsonLd type="service" />
      <Navbar locale={locale} dict={t} isAuthenticated={!!session} />

      <main id="main-content" style={{ flex: 1 }}>
        {/* Hero Header */}
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
                <span>5-DAY DONE-FOR-YOU IMPLEMENTATION SPRINT</span>
              </span>
            </div>

            <h1 style={{ fontSize: "clamp(2.2rem, 5vw, 3.4rem)", lineHeight: 1.15, letterSpacing: "-0.02em" }}>
              {isEn
                ? "Deploy a Supervised AI Workflow for Your Business in 5 Days."
                : "Layanan Implementasi Otomasi Alur Kerja Siap Pakai dalam 5 Hari Kerja."}
            </h1>

            <p className="muted" style={{ fontSize: "var(--text-18)", lineHeight: 1.6 }}>
              {isEn
                ? "Skip months of fragile DIY script building. Our automation specialists audit, architect, and deploy a production-grade workflow with mandatory human approval gates for a fixed price of Rp7.500.000."
                : "Hentikan pembuatan webhook mandiri yang rentan rusak. Tim spesialis otomasi Atlas mengaudit, merancang, dan meluncurkan alur kerja terverifikasi dengan izin manusia dalam 5 hari kerja dengan biaya tetap Rp7.500.000."}
            </p>

            <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "var(--space-4)", paddingTop: "var(--space-2)" }}>
              <a href="#booking-section" className="btn btn-primary">
                <span>{isEn ? "Claim Your 5-Day Sprint (Rp7.5M)" : "Klaim Jadwal Sprint (Rp7.5jt)"}</span>
                <ArrowRight size={16} aria-hidden="true" />
              </a>
              <Link href="/services/automation-audit" className="btn btn-secondary">
                <span>{isEn ? "Book Free 30-Min Audit First" : "Jadwalkan Audit Gratis Dahulu"}</span>
              </Link>
            </div>
          </div>
        </section>

        {/* Sprint Milestones Timeline */}
        <section style={{ padding: "var(--space-8) 0", borderBottom: "1px solid var(--color-border)" }}>
          <div className="container" style={{ display: "grid", gap: "var(--space-6)" }}>
            <div>
              <div className="eyebrow" style={{ marginBottom: "var(--space-2)" }}>JADWAL IMPLEMENTASI</div>
              <h2 style={{ fontSize: "var(--text-28)" }}>
                {isEn ? "Five Days from Discovery to Production Handover" : "Tahapan 5 Hari dari Analisis hingga Siap Pakai"}
              </h2>
              <p className="muted" style={{ fontSize: "var(--text-16)", maxWidth: "700px", marginTop: "var(--space-2)" }}>
                {isEn
                  ? "Every sprint follows a battle-tested milestone framework backed by 120 validated DAG templates."
                  : "Setiap sprint mengikuti metodologi teruji yang didukung oleh 120 template alur kerja yang sudah divalidasi."}
              </p>
            </div>

            <div className="sprint-timeline">
              {milestones.map((m, idx) => {
                const IconComponent = m.icon;
                return (
                  <div key={idx} className="sprint-day">
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <span className="sprint-day-num">{isEn ? m.dayEn : m.day}</span>
                      <IconComponent size={18} style={{ color: "var(--color-accent)" }} aria-hidden="true" />
                    </div>
                    <h3 style={{ fontSize: "var(--text-16)", fontWeight: 700, marginTop: "var(--space-1)" }}>
                      {isEn ? m.titleEn : m.title}
                    </h3>
                    <p className="muted" style={{ fontSize: "var(--text-14)", lineHeight: 1.5 }}>
                      {isEn ? m.descEn : m.desc}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Scope Boundaries: Inclusions vs Exclusions */}
        <section style={{ padding: "var(--space-8) 0", borderBottom: "1px solid var(--color-border)" }}>
          <div className="container" style={{ display: "grid", gap: "var(--space-6)" }}>
            <div>
              <div className="eyebrow" style={{ marginBottom: "var(--space-2)" }}>BATASAN RUANG LINGKUP</div>
              <h2 style={{ fontSize: "var(--text-28)" }}>
                {isEn ? "Clear Scope Guardrails: Zero Surprises" : "Ruang Lingkup Transparan: Tanpa Biaya Tersembunyi"}
              </h2>
            </div>

            <div className="bento-grid">
              {/* Inclusions */}
              <div className="panel" style={{ display: "grid", gap: "var(--space-4)", background: "var(--color-surface)" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "var(--space-2)" }}>
                  <CheckCircle2 size={20} style={{ color: "var(--color-success)" }} aria-hidden="true" />
                  <h3 style={{ fontSize: "var(--text-18)", fontWeight: 700 }}>
                    {isEn ? "What's Included in the Rp7.5M Sprint" : "Termasuk dalam Paket Rp7.500.000"}
                  </h3>
                </div>

                <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gap: "var(--space-3)", fontSize: "var(--text-14)" }}>
                  {[
                    isEn ? "1 Primary end-to-end workflow (e.g. Inbound Lead Qualification to WhatsApp)" : "1 Alur kerja utama end-to-end (misal: Kualifikasi Lead ke WhatsApp)",
                    isEn ? "Up to 3 integration endpoints (Form intake, CRM, Messaging)" : "Hingga 3 titik integrasi kanal (Form web, CRM, Pesan)",
                    isEn ? "Interactive human review & approval drawer console" : "Laci konsol persetujuan manusia untuk tinjauan pesan",
                    isEn ? "Type-safe Zod payload validation & error fallback" : "Validasi skema data Zod type-safe & penanganan error",
                    isEn ? "Durable PostgreSQL state & immutable audit trail logging" : "Penyimpanan durable PostgreSQL & catatan jejak audit",
                    isEn ? "Live handover session & 14 days of post-launch monitoring" : "Sesi pelatihan tim & pemantauan aktif 14 hari pasca-peluncuran",
                  ].map((item, idx) => (
                    <li key={idx} style={{ display: "flex", gap: "var(--space-2)", alignItems: "flex-start" }}>
                      <CheckCircle2 size={16} style={{ color: "var(--color-success)", flexShrink: 0, marginTop: "3px" }} aria-hidden="true" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Exclusions */}
              <div className="panel" style={{ display: "grid", gap: "var(--space-4)", background: "var(--color-surface-2)" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "var(--space-2)" }}>
                  <XCircle size={20} style={{ color: "var(--color-muted)" }} aria-hidden="true" />
                  <h3 style={{ fontSize: "var(--text-18)", fontWeight: 700, color: "var(--color-muted)" }}>
                    {isEn ? "What's Not Included (Separate Scope)" : "Tidak Termasuk (Ruang Lingkup Terpisah)"}
                  </h3>
                </div>

                <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gap: "var(--space-3)", fontSize: "var(--text-14)", color: "var(--color-muted)" }}>
                  {[
                    isEn ? "Custom on-premise ERP/SAP legacy driver development" : "Pembuatan adapter driver ERP/SAP legacy custom",
                    isEn ? "Fine-tuning custom LLM models on proprietary weights" : "Pelatihan model AI custom (fine-tuning mandiri)",
                    isEn ? "More than 1 primary business process in a single sprint" : "Lebih dari 1 proses bisnis utama dalam 1 sprint yang sama",
                    isEn ? "Third-party vendor API usage fees (OpenAI / Twilio bills)" : "Biaya langganan API pihak ketiga (tagihan OpenAI/WhatsApp)",
                  ].map((item, idx) => (
                    <li key={idx} style={{ display: "flex", gap: "var(--space-2)", alignItems: "flex-start" }}>
                      <XCircle size={16} style={{ color: "var(--color-muted)", flexShrink: 0, marginTop: "3px" }} aria-hidden="true" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Embedded Booking & Qualification Section */}
        <section id="booking-section" style={{ padding: "var(--space-8) 0" }}>
          <div className="container" style={{ maxWidth: "680px" }}>
            <LeadCaptureForm locale={locale} source="sprint_page" />
          </div>
        </section>
      </main>

      <Footer dict={t} />
    </div>
  );
}
