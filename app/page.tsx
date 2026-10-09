import Link from "next/link";
import {
  ArrowRight,
  ShieldCheck,
  Coins,
  History,
  Layers,
  Sparkles,
  Building2,
  TrendingUp,
  XCircle,
  CheckCircle2,
  Database,
  Lock,
  ChevronDown,
  Calendar,
  Clock,
  Zap,
} from "lucide-react";
import { getLocale, getDict, pick } from "@/lib/i18n";
import { getSession } from "@/lib/auth/session";
import { templates } from "@/lib/templates/catalog";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { WorkflowCanvas } from "@/components/WorkflowCanvas";
import { RoiCalculator } from "@/components/RoiCalculator";
import { LeadCaptureForm } from "@/components/LeadCaptureForm";
import { SchemaOrgJsonLd } from "@/components/SchemaOrgJsonLd";

export default async function HomePage() {
  const locale = await getLocale();
  const { t } = await getDict();
  const session = await getSession();
  const isEn = locale === "en";

  const featuredTemplates = templates.slice(0, 6);

  const industryList = [
    { id: "agency", label: isEn ? "Marketing Agencies" : "Agensi Pemasaran" },
    { id: "sales", label: isEn ? "Inbound Sales" : "Penjualan Inbound" },
    { id: "support", label: isEn ? "Customer Support" : "Customer Support" },
    { id: "property", label: isEn ? "Real Estate" : "Properti & Real Estate" },
    { id: "dealer", label: isEn ? "Automotive" : "Dealer Otomotif" },
    { id: "finance", label: isEn ? "Financial Services" : "Layanan Keuangan" },
    { id: "ecommerce", label: isEn ? "E-Commerce" : "E-Commerce" },
    { id: "recruiting", label: isEn ? "Recruitment" : "Rekrutmen & HR" },
    { id: "education", label: isEn ? "Education" : "Pendidikan" },
    { id: "travel", label: isEn ? "Travel & Tours" : "Travel & Wisata" },
    { id: "services", label: isEn ? "Professional Services" : "Jasa Profesional" },
    { id: "marketing", label: isEn ? "Brand Operations" : "Operasi Brand" },
  ];

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <SchemaOrgJsonLd type="organization" />
      <SchemaOrgJsonLd type="service" />
      <Navbar locale={locale} dict={t} isAuthenticated={!!session} />

      <main id="main-content" style={{ flex: 1 }}>
        {/* Hero Section: Client Acquisition Showcase */}
        <section
          style={{
            padding: "var(--space-6) 0 var(--space-6) 0",
            borderBottom: "1px solid var(--color-border)",
            background: "radial-gradient(ellipse at top, var(--color-surface-2), var(--color-bg))",
          }}
        >
          <div className="container" style={{ display: "grid", gap: "var(--space-6)" }}>
            <div className="hero-grid">
              {/* Left Column: Commercial Outcome Pitch */}
              <div style={{ display: "grid", gap: "var(--space-3)" }}>
                <div style={{ display: "inline-flex" }}>
                  <span className="badge badge-accent">
                    <Sparkles size={12} aria-hidden="true" />
                    <span>
                      {isEn
                        ? "ENTERPRISE AUTOMATION SERVICES • 5-DAY TURNKEY SPRINT"
                        : "JASA KONSULTASI & IMPLEMENTASI AUTOMASI ENTERPRISE"}
                    </span>
                  </span>
                </div>

                <h1
                  style={{
                    fontSize: "clamp(2rem, 3.4vw, 2.85rem)",
                    lineHeight: 1.15,
                    letterSpacing: "-0.025em",
                    fontWeight: 750,
                  }}
                >
                  {isEn
                    ? "Turnkey Business Automation Services Built with Supervised AI."
                    : "Jasa Implementasi Automasi Alur Kerja AI untuk Operasional Bisnis Anda."}
                </h1>

                <p
                  className="muted"
                  style={{
                    fontSize: "var(--text-16)",
                    lineHeight: 1.6,
                    maxWidth: "580px",
                  }}
                >
                  {isEn
                    ? "We design, integrate, and maintain custom automated workflows for inbound lead qualification, sales operations, and customer support—with mandatory human review gates, strict NDAs, and live handover in 5 days."
                    : "Kami merancang, mengintegrasikan, dan memelihara sistem automasi bisnis siap pakai—mempercepat kualifikasi lead masuk, merampingkan operasi penjualan, dan mengeliminasi beban manual tanpa risiko salah kirim atau kebocoran data."}
                </p>

                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    alignItems: "center",
                    gap: "var(--space-3)",
                    paddingTop: "var(--space-2)",
                  }}
                >
                  <a href="#audit-form" className="btn btn-primary">
                    <span>{isEn ? "Book Free 30-Min Audit" : "Konsultasi & Audit Gratis (30 Menit)"}</span>
                    <ArrowRight size={16} aria-hidden="true" />
                  </a>

                  <a href="#demo" className="btn btn-secondary">
                    <span>{isEn ? "View Workflow Simulation" : "Lihat Simulasi Alur Kerja"}</span>
                  </a>
                </div>

                {/* Trust Micro-Copy */}
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
                    <ShieldCheck size={14} style={{ color: "var(--color-accent)" }} aria-hidden="true" />
                    <span>{isEn ? "Mandatory team sign-off" : "Verifikasi tim sebelum eksekusi"}</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "var(--space-1)" }}>
                    <Lock size={14} style={{ color: "var(--color-success)" }} aria-hidden="true" />
                    <span>{isEn ? "Protected under enterprise NDA" : "Kerahasiaan terikat NDA resmi"}</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "var(--space-1)" }}>
                    <Database size={14} style={{ color: "var(--color-accent)" }} aria-hidden="true" />
                    <span>{isEn ? "Zero AI training on client data" : "Data bisnis tidak melatih model"}</span>
                  </div>
                </div>
              </div>

              {/* Right Column: Interactive Workflow Demo */}
              <div id="demo">
                <WorkflowCanvas dict={t} />
              </div>
            </div>

            {/* Proof Strip */}
            <div className="trust-strip">
              <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-1)" }}>
                <span className="eyebrow">{isEn ? "GUARANTEE" : "GARANSI TURNKEY"}</span>
                <span style={{ fontWeight: 700, fontSize: "var(--text-16)" }}>5 Hari Kerja Live</span>
                <span className="muted" style={{ fontSize: "var(--text-12)" }}>
                  {isEn ? "Ready-to-use production handover" : "Sistem selesai-pakai terintegrasi"}
                </span>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-1)" }}>
                <span className="eyebrow">{isEn ? "CONFIDENTIALITY" : "KERAHASIAAN DATA"}</span>
                <span style={{ fontWeight: 700, fontSize: "var(--text-16)" }}>Perjanjian NDA Mengikat</span>
                <span className="muted" style={{ fontSize: "var(--text-12)" }}>
                  {isEn ? "100% client data ownership" : "Hak kepemilikan data penuh pada klien"}
                </span>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-1)" }}>
                <span className="eyebrow">{isEn ? "BRAND SAFETY" : "KENDALI PENUH"}</span>
                <span style={{ fontWeight: 700, fontSize: "var(--text-16)" }}>Verifikasi Sebelum Kirim</span>
                <span className="muted" style={{ fontSize: "var(--text-12)" }}>
                  {isEn ? "Zero unapproved outbound actions" : "Nol pesan keluar tanpa persetujuan tim"}
                </span>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-1)" }}>
                <span className="eyebrow">{isEn ? "DEDICATED SUPPORT" : "DUKUNGAN KHUSUS"}</span>
                <span style={{ fontWeight: 700, fontSize: "var(--text-16)" }}>SLA &amp; Monitoring 14 Hari</span>
                <span className="muted" style={{ fontSize: "var(--text-12)" }}>
                  {isEn ? "Dedicated automation engineer" : "Pendampingan konsultan khusus"}
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* The Problem & Cost of Inaction */}
        <section style={{ padding: "var(--space-8) 0", borderBottom: "1px solid var(--color-border)" }}>
          <div className="container" style={{ display: "grid", gap: "var(--space-6)" }}>
            <div>
              <div className="eyebrow" style={{ marginBottom: "var(--space-2)" }}>BIAYA KELAMBATAN MANUAL</div>
              <h2 style={{ fontSize: "var(--text-28)" }}>
                {isEn
                  ? "Why Manual Processes and Fragile Scripts Leak Client Revenue"
                  : "Mengapa Proses Manual & Webhook Rentan Membuat Klien Lari"}
              </h2>
              <p className="muted" style={{ fontSize: "var(--text-16)", maxWidth: "700px", marginTop: "var(--space-2)" }}>
                {isEn
                  ? "When high-intent leads arrive from paid ad campaigns, every minute of delay reduces qualification rates. Unsupervised chatbots risk your brand reputation, while fragile DIY scripts break silently."
                  : "Ketika prospek bernilai tinggi masuk dari iklan, setiap menit keterlambatan menurunkan peluang closing. Chatbot tanpa pengawasan membahayakan reputasi agensi, sedangkan webhook DIY sering mati mendadak."}
              </p>
            </div>

            <div className="bento-grid">
              {/* Status Quo Card */}
              <div
                className="panel"
                style={{
                  display: "grid",
                  gap: "var(--space-4)",
                  background: "var(--color-surface-2)",
                  borderColor: "var(--color-border)",
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <h3 style={{ fontSize: "var(--text-18)", color: "var(--color-muted)", fontWeight: 700 }}>
                    {isEn ? "Status Quo: Manual & Fragile Tools" : "Proses Manual & Script Rentan"}
                  </h3>
                  <span className="badge badge-danger">High Risk &amp; Slow</span>
                </div>

                <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gap: "var(--space-3)", fontSize: "var(--text-14)" }}>
                  {[
                    isEn ? "Leads sit idle in spreadsheets or email inboxes for 4+ hours" : "Lead iklan menumpuk di spreadsheet atau email tanpa respon hingga 4+ jam",
                    isEn ? "Zapier/Make flows fail silently whenever a form field schema shifts" : "Alur Zapier/Make mati mendadak saat format data form sedikit berubah",
                    isEn ? "Unsupervised AI chatbots hallucinate wrong pricing and alienate buyers" : "Chatbot AI generik berhalusinasi memberikan harga salah ke klien",
                    isEn ? "Operations staff burned out from manual WhatsApp copy-paste routines" : "Staf operasional kelelahan menyalin data prospek manual ke WhatsApp & CRM",
                    isEn ? "Zero replayable audit trail when a critical deal slip through the cracks" : "Nol riwayat jejak audit saat prospek bernilai puluhan juta rupiah hilang",
                  ].map((pt, idx) => (
                    <li key={idx} style={{ display: "flex", gap: "var(--space-3)", alignItems: "flex-start" }}>
                      <XCircle size={18} aria-hidden="true" style={{ color: "var(--color-danger)", flexShrink: 0, marginTop: "2px" }} />
                      <span className="muted">{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Atlas Supervised Workflows */}
              <div
                className="panel"
                style={{
                  display: "grid",
                  gap: "var(--space-4)",
                  background: "var(--color-surface)",
                  borderColor: "var(--color-accent)",
                  boxShadow: "var(--shadow-raised)",
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <h3 style={{ fontSize: "var(--text-18)", color: "var(--color-text)", fontWeight: 750 }}>
                    {isEn ? "Atlas Supervised Workflows" : "Atlas: Alur Kerja Terverifikasi"}
                  </h3>
                  <span className="badge badge-accent">Reliable &amp; Fast</span>
                </div>

                <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gap: "var(--space-3)", fontSize: "var(--text-14)" }}>
                  {[
                    isEn ? "Instant lead fit evaluation & personalized draft prepared in <60 seconds" : "Evaluasi kualifikasi & draf respon terpersonalisasi siap dalam <60 detik",
                    isEn ? "Multi-tier data verification rejects corrupt payloads & form spam" : "Validasi data berlapis menolak form spam dan data rusak sebelum masuk ke alur kerja",
                    isEn ? "Mandatory human review gatekeeper ensures 100% brand voice safety" : "Gerbang review tim internal memastikan 100% keamanan komunikasi brand Anda",
                    isEn ? "Encrypted enterprise state storage preserves full business continuity" : "Penyimpanan data terisolasi & andal menjamin kelangsungan data operasional bisnis",
                    isEn ? "Immutable event audit trail for compliance and performance reporting" : "Catatan jejak audit komprehensif untuk pelaporan kepatuhan dan evaluasi bisnis",
                  ].map((pt, idx) => (
                    <li key={idx} style={{ display: "flex", gap: "var(--space-3)", alignItems: "flex-start" }}>
                      <CheckCircle2 size={18} aria-hidden="true" style={{ color: "var(--color-success)", flexShrink: 0, marginTop: "2px" }} />
                      <span style={{ fontWeight: 550 }}>{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* 5-Day Done-For-You Implementation Sprint Section */}
        <section
          id="services"
          style={{
            padding: "var(--space-8) 0",
            borderBottom: "1px solid var(--color-border)",
            background: "radial-gradient(ellipse at bottom, var(--color-surface-2), var(--color-bg))",
          }}
        >
          <div className="container" style={{ display: "grid", gap: "var(--space-6)" }}>
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "flex-end", gap: "var(--space-4)" }}>
              <div>
                <div className="eyebrow" style={{ marginBottom: "var(--space-2)" }}>LAYANAN TURNKEY</div>
                <h2 style={{ fontSize: "var(--text-28)" }}>
                  {isEn ? "5-Day Done-For-You Implementation Sprint" : "Sprint Implementasi Otomasi 5 Hari (Rp7.500.000)"}
                </h2>
                <p className="muted" style={{ fontSize: "var(--text-16)", maxWidth: "680px", marginTop: "var(--space-2)" }}>
                  {isEn
                    ? "We don't just sell you access to software. We audit your lead process, configure custom nodes, test edge cases, and hand over a live, working system in 5 business days."
                    : "Kami tidak hanya menjual akses software. Kami mengaudit alur kualifikasi lead Anda, menyambungkan kanal pesan, menguji skenario batas, dan menyerahkan sistem yang sudah berjalan dalam 5 hari kerja."}
                </p>
              </div>

              <Link href="/services/implementation-sprint" className="btn btn-secondary btn-sm">
                <span>{isEn ? "View Complete Sprint Specs" : "Lihat Spesifikasi Lengkap Sprint"}</span>
                <ArrowRight size={14} aria-hidden="true" />
              </Link>
            </div>

            <div className="sprint-timeline">
              <div className="sprint-day">
                <span className="sprint-day-num">{isEn ? "Day 01" : "Hari 01"}</span>
                <h3 style={{ fontSize: "var(--text-16)", fontWeight: 700 }}>
                  {isEn ? "Discovery & Audit" : "Discovery & Audit"}
                </h3>
                <p className="muted" style={{ fontSize: "var(--text-14)" }}>
                  {isEn
                    ? "Map current lead forms, qualification rules, and team approval roles."
                    : "Memetakan form intake, kriteria kualifikasi lead, dan peran persetujuan tim."}
                </p>
              </div>

              <div className="sprint-day">
                <span className="sprint-day-num">{isEn ? "Day 02" : "Hari 02"}</span>
                <h3 style={{ fontSize: "var(--text-16)", fontWeight: 700 }}>
                  {isEn ? "Rules & Calibration" : "Kriteria & Standar Respon"}
                </h3>
                <p className="muted" style={{ fontSize: "var(--text-14)" }}>
                  {isEn
                    ? "Define qualification rubrics, customize operational workflow logic, and calibrate response persona."
                    : "Merumuskan kriteria kualifikasi prospek, penyusunan persona respon resmi, dan kalibrasi akurasi alur."}
                </p>
              </div>

              <div className="sprint-day">
                <span className="sprint-day-num">{isEn ? "Day 03" : "Hari 03"}</span>
                <h3 style={{ fontSize: "var(--text-16)", fontWeight: 700 }}>
                  {isEn ? "Channel Wiring" : "Integrasi Kanal Operasional"}
                </h3>
                <p className="muted" style={{ fontSize: "var(--text-14)" }}>
                  {isEn
                    ? "Connect inbound form webhooks, CRM stages, and WhatsApp/Email draft actions."
                    : "Menghubungkan webhook form lead, pipeline CRM, dan draf pesan WhatsApp/Email."}
                </p>
              </div>

              <div className="sprint-day">
                <span className="sprint-day-num">{isEn ? "Day 04" : "Hari 04"}</span>
                <h3 style={{ fontSize: "var(--text-16)", fontWeight: 700 }}>
                  {isEn ? "Scenario Simulation" : "Simulasi & Verifikasi Tim"}
                </h3>
                <p className="muted" style={{ fontSize: "var(--text-14)" }}>
                  {isEn
                    ? "Run 20+ test scenarios, verify human approval flow, and test duplicate prevention."
                    : "Simulasi 20+ skenario batas, pengujian laci persetujuan tim, dan verifikasi anti-duplikasi."}
                </p>
              </div>

              <div className="sprint-day">
                <span className="sprint-day-num">{isEn ? "Day 05" : "Hari 05"}</span>
                <h3 style={{ fontSize: "var(--text-16)", fontWeight: 700 }}>
                  {isEn ? "Go-Live & Handover" : "Peluncuran & Handover"}
                </h3>
                <p className="muted" style={{ fontSize: "var(--text-14)" }}>
                  {isEn
                    ? "Deploy live to production, train operations team, start 14-day SLA monitoring."
                    : "Peluncuran live, pelatihan tim operasional Anda, dan pemantauan aktif 14 hari."}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 12 Industries & 120 Validated Templates */}
        <section id="templates" style={{ padding: "var(--space-8) 0", borderBottom: "1px solid var(--color-border)" }}>
          <div className="container" style={{ display: "grid", gap: "var(--space-6)" }}>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                alignItems: "flex-end",
                justifyContent: "space-between",
                gap: "var(--space-4)",
              }}
            >
              <div>
                <div className="eyebrow" style={{ marginBottom: "var(--space-2)" }}>KATALOG 12 INDUSTRI</div>
                <h2 style={{ fontSize: "var(--text-28)" }}>
                  {isEn ? "120 Validated Business Workflow Templates" : "120 Template Alur Kerja Bisnis Siap Pakai"}
                </h2>
                <p className="muted" style={{ fontSize: "var(--text-16)", maxWidth: "620px", marginTop: "var(--space-2)" }}>
                  {isEn
                    ? "Every blueprint is built on deterministic enterprise logic, strictly verified with automated schema validation and mandatory team approval gates."
                    : "Setiap blueprint dibangun dengan logika otomasi terarah, diverifikasi ketat dengan validasi data dan gerbang persetujuan tim resmi."}
                </p>
              </div>

              <Link href="/templates" className="btn btn-secondary btn-sm">
                <span>{isEn ? "Browse All 120 Templates" : "Jelajahi Seluruh 120 Template"}</span>
                <ArrowRight size={14} aria-hidden="true" />
              </Link>
            </div>

            {/* Industry Pills */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--space-2)" }}>
              {industryList.map((ind) => (
                <Link
                  key={ind.id}
                  href={`/templates?category=${ind.id}`}
                  className="btn btn-secondary btn-sm"
                  style={{ textDecoration: "none" }}
                >
                  <span>{ind.label}</span>
                  <span className="badge badge-accent" style={{ marginLeft: "var(--space-1)", padding: "2px 6px" }}>
                    10
                  </span>
                </Link>
              ))}
            </div>

            {/* Featured Templates Grid */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
                gap: "var(--space-4)",
              }}
            >
              {featuredTemplates.map((template) => (
                <div
                  key={template.id}
                  className="bento-card"
                >
                  <div style={{ display: "grid", gap: "var(--space-2)" }}>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                      <span className="badge badge-accent" style={{ textTransform: "capitalize" }}>
                        {template.category}
                      </span>
                      <span className="badge">v{template.version}</span>
                    </div>

                    <h3 style={{ fontSize: "var(--text-18)", fontWeight: 700 }}>
                      <Link
                        href={`/templates/${template.slug}`}
                        style={{ textDecoration: "none" }}
                      >
                        {pick(template.name, locale)}
                      </Link>
                    </h3>

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
                    <span className="muted">
                      {template.nodes.length} {t.templates.steps} &bull; {t.templates.approval}
                    </span>
                    <Link
                      href={`/templates/${template.slug}`}
                      className="btn btn-ghost btn-sm"
                      style={{ padding: "0 var(--space-2)" }}
                    >
                      <span>Lihat detail</span>
                      <ArrowRight size={14} aria-hidden="true" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Interactive Agency Capacity & ROI Calculator */}
        <section id="roi-calculator" style={{ padding: "var(--space-8) 0", borderBottom: "1px solid var(--color-border)" }}>
          <div className="container" style={{ display: "grid", gap: "var(--space-6)" }}>
            <div>
              <div className="eyebrow" style={{ marginBottom: "var(--space-2)" }}>KALKULASI PENGHEMATAN</div>
              <h2 style={{ fontSize: "var(--text-28)" }}>
                {isEn ? "Quantify Your Operational Time & Cost Savings" : "Hitung Nilai Penghematan Waktu & Biaya Tim Anda"}
              </h2>
              <p className="muted" style={{ fontSize: "var(--text-16)", maxWidth: "700px", marginTop: "var(--space-2)" }}>
                {isEn
                  ? "Adjust lead volumes and staff wage parameters to project how quickly an Atlas implementation sprint pays for itself."
                  : "Geser parameter volume lead dan beban gaji tim untuk melihat seberapa cepat investasi implementasi Atlas balik modal."}
              </p>
            </div>

            <RoiCalculator dict={{}} locale={locale} />
          </div>
        </section>

        {/* Enterprise Governance, Durability & Trust */}
        <section style={{ padding: "var(--space-8) 0", borderBottom: "1px solid var(--color-border)" }}>
          <div className="container" style={{ display: "grid", gap: "var(--space-6)" }}>
            <div>
              <div className="eyebrow" style={{ marginBottom: "var(--space-2)" }}>KEAMANAN &amp; INTEGRITAS DATA</div>
              <h2 style={{ fontSize: "var(--text-28)" }}>
                {isEn ? "Built for Real Business Operations: Verifiable Facts" : "Fondasi Operasi Bisnis Nyata: Fakta Terverifikasi"}
              </h2>
            </div>

            <div className="bento-grid">
              <div className="panel" style={{ display: "grid", gap: "var(--space-3)" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "var(--space-2)" }}>
                  <Database size={20} style={{ color: "var(--color-accent)" }} aria-hidden="true" />
                  <h3 style={{ fontSize: "var(--text-18)", fontWeight: 700 }}>
                    {isEn ? "Encrypted Isolated Architecture" : "Arsitektur Data Terenkripsi & Terisolasi"}
                  </h3>
                </div>
                <p className="muted" style={{ fontSize: "var(--text-14)", lineHeight: 1.5 }}>
                  {isEn
                    ? "Workflows, team approval queues, and operational logs reside in isolated private storage. Your proprietary client data is strictly protected and never shared or used for third-party model training."
                    : "Seluruh alur kerja, antrean izin tim, dan log operasional disimpan dalam lingkungan privat terenkripsi. Data bisnis Anda dilindungi penuh dan tidak pernah digunakan untuk melatih AI publik."}
                </p>
              </div>

              <div className="panel" style={{ display: "grid", gap: "var(--space-3)" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "var(--space-2)" }}>
                  <ShieldCheck size={20} style={{ color: "var(--color-accent)" }} aria-hidden="true" />
                  <h3 style={{ fontSize: "var(--text-18)", fontWeight: 700 }}>
                    {isEn ? "Strict Human Gatekeeper" : "Persetujuan Manusia Wajib"}
                  </h3>
                </div>
                <p className="muted" style={{ fontSize: "var(--text-14)", lineHeight: 1.5 }}>
                  {isEn
                    ? "Outbound messages to customers or CRM pipeline updates remain paused until an authorized team member clicks Approve in the console."
                    : "Pesan WhatsApp keluar atau update status CRM tetap tertahan di antrean sampai anggota tim Anda mengklik Setujui di konsol review."}
                </p>
              </div>

              <div className="panel" style={{ display: "grid", gap: "var(--space-3)" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "var(--space-2)" }}>
                  <History size={20} style={{ color: "var(--color-accent)" }} aria-hidden="true" />
                  <h3 style={{ fontSize: "var(--text-18)", fontWeight: 700 }}>
                    {isEn ? "Replayable Audit Trails" : "Catatan Jejak Audit Permanen"}
                  </h3>
                </div>
                <p className="muted" style={{ fontSize: "var(--text-14)", lineHeight: 1.5 }}>
                  {isEn
                    ? "Every input payload, AI evaluation score, latency metric, and approval timestamp is saved immutably for compliance and dispute resolution."
                    : "Setiap payload input, skor evaluasi AI, latensi, dan stempel waktu persetujuan dicatat secara permanen untuk audit kepatuhan."}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Enterprise FAQ Accordion */}
        <section style={{ padding: "var(--space-8) 0", borderBottom: "1px solid var(--color-border)" }}>
          <div className="container" style={{ display: "grid", gap: "var(--space-6)" }}>
            <div style={{ textAlign: "center" }}>
              <div className="eyebrow" style={{ marginBottom: "var(--space-2)" }}>PERTANYAAN UMUM</div>
              <h2 style={{ fontSize: "var(--text-28)" }}>
                {isEn ? "Frequently Asked Questions" : "Pertanyaan yang Sering Diajukan"}
              </h2>
            </div>

            <div className="faq-accordion">
              <details className="faq-item" open>
                <summary className="faq-summary">
                  <span>{isEn ? "Can AI send messages without our team's permission?" : "Apakah AI bisa mengirim pesan tanpa persetujuan tim kami?"}</span>
                  <ChevronDown size={18} aria-hidden="true" />
                </summary>
                <div className="faq-content">
                  {isEn
                    ? "Never. Atlas enforces mandatory human-in-the-loop gates for all outbound customer communications. The AI engine evaluates lead fit and drafts response text, but no message leaves the building until an authorized operator clicks Approve."
                    : "Sama sekali tidak. Atlas memberlakukan gerbang persetujuan manusia wajib untuk semua komunikasi keluar. AI hanya menilai kriteria lead dan menyusun draf pesan, tetapi tidak ada pesan yang terkirim sebelum operator resmi Anda mengklik Setujui."}
                </div>
              </details>

              <details className="faq-item">
                <summary className="faq-summary">
                  <span>{isEn ? "How long does the implementation take?" : "Berapa lama proses implementasi sampai sistem aktif?"}</span>
                  <ChevronDown size={18} aria-hidden="true" />
                </summary>
                <div className="faq-content">
                  {isEn
                    ? "Exactly 5 business days for our standard Done-For-You Sprint (Rp7.500.000). Because we adapt from 120 pre-validated workflow blueprints rather than building from scratch, your workflow is verified in sandbox by Day 4 and deployed by Day 5."
                    : "Tepat 5 hari kerja untuk paket standard Done-For-You Sprint (Rp7.500.000). Karena kami berangkat dari 120 blueprint alur kerja yang sudah divalidasi, alur kerja Anda sudah diuji di sandbox pada Hari 4 dan go-live pada Hari 5."}
                </div>
              </details>

              <details className="faq-item">
                <summary className="faq-summary">
                  <span>{isEn ? "Do we need to migrate or replace our existing CRM?" : "Apakah kami harus mengganti CRM atau spreadsheet yang sudah ada?"}</span>
                  <ChevronDown size={18} aria-hidden="true" />
                </summary>
                <div className="faq-content">
                  {isEn
                    ? "No. Atlas works alongside your existing stack. We connect to your current landing page forms (Meta Lead Ads, Webflow, Typeform) and sync approved results back into your existing CRM (HubSpot, Pipedrive, Google Sheets)."
                    : "Tidak perlu. Atlas bekerja berdampingan dengan tools yang sudah Anda gunakan. Kami menghubungkan form iklan Anda (Meta Lead Ads, Webflow, Typeform) dan menyinkronkan hasil yang disetujui kembali ke CRM Anda (HubSpot, Pipedrive, Google Sheets)."}
                </div>
              </details>

              <details className="faq-item">
                <summary className="faq-summary">
                  <span>{isEn ? "Is our customer lead data secure and confidential?" : "Apakah data prospek dan klien kami aman dan rahasia?"}</span>
                  <ChevronDown size={18} aria-hidden="true" />
                </summary>
                <div className="faq-content">
                  {isEn
                    ? "Yes, 100% confidential and secure. We execute a mutual Non-Disclosure Agreement (NDA) before any client sprint begins. Your operational data belongs entirely to your business, remains housed in private encrypted infrastructure, and is never exposed or used to train third-party AI models."
                    : "Ya, 100% aman dan terikat kerahasiaan. Kami menandatangani Perjanjian Kerahasiaan (NDA) resmi sebelum proyek implementasi dimulai. Seluruh data operasional Anda sepenuhnya milik bisnis Anda, tersimpan dalam infrastruktur privat berenkripsi, dan tidak pernah dibagikan atau digunakan untuk melatih model AI pihak ketiga."}
                </div>
              </details>

              <details className="faq-item">
                <summary className="faq-summary">
                  <span>{isEn ? "What happens after the 5-day sprint ends?" : "Bagaimana dukungan setelah 5-day sprint selesai?"}</span>
                  <ChevronDown size={18} aria-hidden="true" />
                </summary>
                <div className="faq-content">
                  {isEn
                    ? "Every sprint includes 14 days of dedicated post-launch SLA monitoring and team training. After that, you can continue on our self-serve SaaS workspace or opt for our ongoing maintenance retainer."
                    : "Setiap sprint sudah mencakup 14 hari pemantauan aktif pasca-peluncuran dan sesi pelatihan tim Anda. Setelahnya, Anda dapat melanjutkan dengan paket langganan SaaS mandiri atau opsi pemeliharaan berkala."}
                </div>
              </details>
            </div>
          </div>
        </section>

        {/* Embedded High-Converting Lead Capture Form */}
        <section id="audit-form" style={{ padding: "var(--space-8) 0", background: "var(--color-surface-2)" }}>
          <div className="container" style={{ maxWidth: "680px" }}>
            <LeadCaptureForm locale={locale} source="homepage_main" />
          </div>
        </section>

        {/* Honesty & Trust Section */}
        <section id="honesty" style={{ padding: "var(--space-7) 0" }}>
          <div className="container">
            <div
              className="panel"
              style={{
                background: "var(--color-surface)",
                border: "1px solid var(--color-border-strong)",
                display: "grid",
                gap: "var(--space-3)",
                padding: "var(--space-6)",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "var(--space-2)" }}>
                <ShieldCheck size={18} aria-hidden="true" style={{ color: "var(--color-accent)" }} />
                <h3 style={{ fontSize: "var(--text-16)", fontWeight: 700 }}>
                  {isEn ? "Transparency & Sandbox Reality Commitment" : "Komitmen Transparansi & Realitas Sandbox"}
                </h3>
              </div>
              <p className="muted" style={{ fontSize: "var(--text-14)", maxWidth: "840px", lineHeight: 1.6 }}>
                {isEn
                  ? "Atlas adheres to absolute engineering truthfulness: our public interactive demo operates in a secure sandbox simulation to prevent unauthorized outbound messages. In client production sprints, live adapters (WhatsApp Cloud API, HubSpot, Google Sheets) are wired with your authorized credentials after sandbox verification."
                  : "Atlas memegang teguh kejujuran teknis: demo kanvas interaktif di halaman ini beroperasi dalam simulasi sandbox tertutup agar tidak mengirim pesan keluar sembarangan. Pada implementasi klien nyata, adapter live (WhatsApp Cloud API, HubSpot, Google Sheets) dihubungkan menggunakan kredensial resmi Anda setelah verifikasi sandbox selesai."}
              </p>
            </div>
          </div>
        </section>

        {/* Final CTA Banner */}
        <section
          style={{
            padding: "var(--space-8) 0 var(--space-9) 0",
            borderTop: "1px solid var(--color-border)",
            background: "var(--color-surface)",
          }}
        >
          <div className="container" style={{ textAlign: "center", display: "grid", gap: "var(--space-4)", justifyItems: "center" }}>
            <h2 style={{ fontSize: "var(--text-32)", maxWidth: "640px" }}>
              {isEn
                ? "Ready to Automate Your Business Workflows with Confidence?"
                : "Siap Mengotomatisasi Alur Kerja Bisnis Anda dengan Aman?"}
            </h2>
            <p className="muted" style={{ fontSize: "var(--text-16)", maxWidth: "560px" }}>
              {isEn
                ? "Claim a free 30-minute discovery audit or lock in your 5-day implementation sprint today."
                : "Dapatkan sesi audit proses bisnis 30 menit tanpa biaya atau jadwalkan 5-day implementation sprint Anda sekarang."}
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--space-3)", marginTop: "var(--space-2)", justifyContent: "center" }}>
              <a href="#audit-form" className="btn btn-primary">
                <span>{isEn ? "Book Your Workflow Audit" : "Jadwalkan Audit Gratis"}</span>
                <ArrowRight size={16} aria-hidden="true" />
              </a>
              <Link href="/templates" className="btn btn-secondary">
                <span>{isEn ? "Browse 120 Templates" : "Jelajahi 120 Template"}</span>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer dict={t} />
    </div>
  );
}
