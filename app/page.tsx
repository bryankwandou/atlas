import Link from "next/link";
import {
  ArrowRight,
  ShieldCheck,
  History,
  Layers,
  Sparkles,
  TrendingUp,
  XCircle,
  CheckCircle2,
  Database,
  Lock,
  ChevronDown,
  Calendar,
  Clock,
  Zap,
  Check,
  Send,
  Cpu,
  Inbox,
  MessageSquare,
  FileCheck,
  BarChart3,
  Users,
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

  const featuredTemplates = templates.slice(0, 8);

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
    { id: "travel", label: isEn ? "Travel & Hospitality" : "Travel & Wisata" },
    { id: "services", label: isEn ? "Professional Services" : "Jasa Profesional" },
    { id: "marketing", label: isEn ? "Brand Operations" : "Operasi Brand" },
  ];

  const faqData = [
    {
      q: isEn
        ? "Can AI dispatch messages without our team's permission?"
        : "Apakah AI bisa mengirim pesan tanpa persetujuan tim kami?",
      a: isEn
        ? "Never. Atlas enforces mandatory human-in-the-loop gates for all outbound customer communications. The AI engine evaluates lead fit and drafts response text, but no message leaves the building until an authorized operator clicks Approve in the console."
        : "Sama sekali tidak. Atlas memberlakukan gerbang persetujuan manusia wajib untuk semua komunikasi keluar. AI hanya menilai kriteria lead dan menyusun draf pesan, tetapi tidak ada pesan yang terkirim sebelum operator resmi Anda mengklik Setujui.",
    },
    {
      q: isEn
        ? "How long does the implementation sprint take from kickoff to go-live?"
        : "Berapa lama proses implementasi sampai sistem aktif di produksi?",
      a: isEn
        ? "Exactly 5 business days for our standard Done-For-You Sprint (Rp7.500.000). Because we adapt from 120 pre-validated workflow blueprints rather than building from scratch, your workflow is verified in sandbox by Day 4 and deployed to production by Day 5."
        : "Tepat 5 hari kerja untuk paket standard Done-For-You Sprint (Rp7.500.000). Karena kami berangkat dari 120 blueprint alur kerja yang sudah divalidasi, alur kerja Anda sudah diuji di sandbox pada Hari 4 dan go-live pada Hari 5.",
    },
    {
      q: isEn
        ? "Do we need to migrate or replace our existing CRM and forms?"
        : "Apakah kami harus mengganti CRM atau spreadsheet yang sudah ada?",
      a: isEn
        ? "No. Atlas works alongside your existing software stack. We connect to your current landing page forms (Meta Lead Ads, Webflow, Typeform) and sync approved results back into your existing CRM (HubSpot, Pipedrive, Google Sheets)."
        : "Tidak perlu. Atlas bekerja berdampingan dengan tools yang sudah Anda gunakan. Kami menghubungkan form iklan Anda (Meta Lead Ads, Webflow, Typeform) dan menyinkronkan hasil yang disetujui kembali ke CRM Anda (HubSpot, Pipedrive, Google Sheets).",
    },
    {
      q: isEn
        ? "Is our customer lead data secure, isolated, and confidential?"
        : "Apakah data prospek dan operasional klien kami aman dan rahasia?",
      a: isEn
        ? "Yes, 100% confidential and secure. We execute a mutual Non-Disclosure Agreement (NDA) before any client sprint begins. Your operational data belongs entirely to your business, remains housed in private encrypted infrastructure, and is never exposed or used to train third-party AI models."
        : "Ya, 100% aman dan terikat kerahasiaan. Kami menandatangani Perjanjian Kerahasiaan (NDA) resmi sebelum proyek implementasi dimulai. Seluruh data operasional Anda sepenuhnya milik bisnis Anda, tersimpan dalam infrastruktur privat berenkripsi, dan tidak pernah dibagikan atau digunakan untuk melatih model AI pihak ketiga.",
    },
    {
      q: isEn
        ? "What ongoing support is provided after the 5-day sprint ends?"
        : "Bagaimana kelanjutan dukungan teknis setelah 5-day sprint selesai?",
      a: isEn
        ? "Every sprint includes 14 days of dedicated post-launch SLA monitoring and team training. After that, you can continue on our self-serve SaaS workspace or opt for our ongoing maintenance retainer."
        : "Setiap sprint sudah mencakup 14 hari pemantauan aktif pasca-peluncuran dan sesi pelatihan tim Anda. Setelahnya, Anda dapat melanjutkan dengan paket langganan SaaS mandiri atau opsi pemeliharaan berkala.",
    },
    {
      q: isEn
        ? "How are AI execution costs tracked and controlled?"
        : "Bagaimana biaya eksekusi dan komputasi AI dikontrol?",
      a: isEn
        ? "Every workflow step is bounded by deterministic token limits and cost controls. High-intent scoring costs less than $0.001 per run, and execution traces provide complete visibility into per-transaction resource usage."
        : "Setiap langkah alur kerja dibatasi dengan batas token deterministik dan kontrol biaya ketat. Biaya evaluasi kualifikasi lead umumnya di bawah Rp15 per eksekusi, dengan visibilitas penuh per transaksi.",
    },
  ];

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <SchemaOrgJsonLd type="organization" />
      <SchemaOrgJsonLd type="service" />
      <SchemaOrgJsonLd type="software" />
      <SchemaOrgJsonLd
        type="faq"
        data={{
          mainEntity: faqData.map((item) => ({
            "@type": "Question",
            name: item.q,
            acceptedAnswer: {
              "@type": "Answer",
              text: item.a,
            },
          })),
        }}
      />

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
                    ? "Supervised AI Workflow Automation Platform & Turnkey Implementation Services"
                    : "Layanan Automasi Alur Kerja AI Terarah & Implementasi Turnkey Bisnis"}
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
                    ? "We design, integrate, and deploy custom automated workflows for inbound lead qualification, sales operations, and customer support. Built with mandatory human review gates, strict NDAs, and live production handover in 5 days."
                    : "Kami merancang, mengintegrasikan, dan memelihara sistem automasi bisnis siap pakai. Mempercepat kualifikasi lead masuk, merampingkan operasi penjualan, dan mengeliminasi beban manual tanpa risiko salah kirim atau kebocoran data."}
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
                    <span>{isEn ? "Inspect Live Workflow" : "Lihat Simulasi Alur Kerja"}</span>
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
                <WorkflowCanvas dict={t} locale={locale} />
              </div>
            </div>

            {/* Proof Strip */}
            <div className="trust-strip">
              <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-1)" }}>
                <span className="eyebrow">{isEn ? "GUARANTEE" : "GARANSI TURNKEY"}</span>
                <span style={{ fontWeight: 700, fontSize: "var(--text-16)" }}>
                  {isEn ? "5-Day Live Handover" : "5 Hari Kerja Live"}
                </span>
                <span className="muted" style={{ fontSize: "var(--text-12)" }}>
                  {isEn ? "Ready-to-use production handover" : "Sistem selesai-pakai terintegrasi"}
                </span>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-1)" }}>
                <span className="eyebrow">{isEn ? "CONFIDENTIALITY" : "KERAHASIAAN DATA"}</span>
                <span style={{ fontWeight: 700, fontSize: "var(--text-16)" }}>
                  {isEn ? "Binding Mutual NDA" : "Perjanjian NDA Mengikat"}
                </span>
                <span className="muted" style={{ fontSize: "var(--text-12)" }}>
                  {isEn ? "100% client data ownership" : "Hak kepemilikan data penuh pada klien"}
                </span>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-1)" }}>
                <span className="eyebrow">{isEn ? "BRAND SAFETY" : "KENDALI PENUH"}</span>
                <span style={{ fontWeight: 700, fontSize: "var(--text-16)" }}>
                  {isEn ? "Human Review Gates" : "Verifikasi Sebelum Kirim"}
                </span>
                <span className="muted" style={{ fontSize: "var(--text-12)" }}>
                  {isEn ? "Zero unapproved outbound actions" : "Nol pesan keluar tanpa persetujuan tim"}
                </span>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-1)" }}>
                <span className="eyebrow">{isEn ? "DEDICATED SUPPORT" : "DUKUNGAN KHUSUS"}</span>
                <span style={{ fontWeight: 700, fontSize: "var(--text-16)" }}>
                  {isEn ? "14-Day SLA Monitoring" : "SLA & Monitoring 14 Hari"}
                </span>
                <span className="muted" style={{ fontSize: "var(--text-12)" }}>
                  {isEn ? "Dedicated automation engineer" : "Pendampingan konsultan khusus"}
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* 5-Phase Supervised Workflow Pipeline Progression Strip */}
        <section style={{ padding: "var(--space-8) 0", borderBottom: "1px solid var(--color-border)" }}>
          <div className="container" style={{ display: "grid", gap: "var(--space-6)" }}>
            <div>
              <div className="eyebrow" style={{ marginBottom: "var(--space-2)" }}>
                {isEn ? "HOW SUPERVISED AUTOMATION WORKS" : "CARA KERJA ALUR TERAWASI"}
              </div>
              <h2 style={{ fontSize: "var(--text-28)" }}>
                {isEn
                  ? "Five Deterministic Phases from Intake to Verified Dispatch"
                  : "Lima Tahap Terarah dari Intake Data hingga Tindakan Terverifikasi"}
              </h2>
              <p className="muted" style={{ fontSize: "var(--text-16)", maxWidth: "700px", marginTop: "var(--space-2)" }}>
                {isEn
                  ? "Unlike black-box AI chatbots that make uncontrolled commitments, Atlas executes a disciplined 5-phase pipeline where your team retains 100% authority."
                  : "Berbeda dari chatbot AI bebas yang berisiko membuat komitmen salah, Atlas menjalankan pipeline 5 tahap di mana tim Anda memegang kendali penuh."}
              </p>
            </div>

            <div className="pipeline-progression">
              <div className="pipeline-step-card">
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <span className="sprint-day-num">{isEn ? "Phase 01" : "Tahap 01"}</span>
                  <Inbox size={16} style={{ color: "var(--color-accent)" }} aria-hidden="true" />
                </div>
                <h3 style={{ fontSize: "var(--text-16)", fontWeight: 700 }}>
                  {isEn ? "Inbound Ingestion" : "Intake Data Masuk"}
                </h3>
                <p className="muted" style={{ fontSize: "var(--text-13)", lineHeight: 1.5 }}>
                  {isEn
                    ? "Captures leads from Meta Ads, Webflow, Typeform, or emails via validated schema gateways."
                    : "Menangkap data prospek dari Meta Ads, form Webflow, Typeform, atau email via gerbang data teruji."}
                </p>
              </div>

              <div className="pipeline-step-card">
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <span className="sprint-day-num">{isEn ? "Phase 02" : "Tahap 02"}</span>
                  <Cpu size={16} style={{ color: "var(--color-accent)" }} aria-hidden="true" />
                </div>
                <h3 style={{ fontSize: "var(--text-16)", fontWeight: 700 }}>
                  {isEn ? "Rubric Evaluation" : "Evaluasi Kriteria AI"}
                </h3>
                <p className="muted" style={{ fontSize: "var(--text-13)", lineHeight: 1.5 }}>
                  {isEn
                    ? "Evaluates budget, company fit, and urgency. Scores fit and generates a personalized draft response."
                    : "Mengevaluasi budget, profil kebutuhan, dan urgensi prospek, lalu menyusun draf respon personal."}
                </p>
              </div>

              <div className="pipeline-step-card" style={{ borderColor: "var(--color-accent)" }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <span className="sprint-day-num">{isEn ? "Phase 03" : "Tahap 03"}</span>
                  <ShieldCheck size={16} style={{ color: "var(--color-accent)" }} aria-hidden="true" />
                </div>
                <h3 style={{ fontSize: "var(--text-16)", fontWeight: 700 }}>
                  {isEn ? "Team Approval Gate" : "Gerbang Review Tim"}
                </h3>
                <p className="muted" style={{ fontSize: "var(--text-13)", lineHeight: 1.5 }}>
                  {isEn
                    ? "Action pauses in a human review console. Your team member approves or edits the draft with 1 click."
                    : "Tindakan tertahan di konsol review tim. Anggota tim Anda menyetujui atau mengedit draf dengan 1 klik."}
                </p>
              </div>

              <div className="pipeline-step-card">
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <span className="sprint-day-num">{isEn ? "Phase 04" : "Tahap 04"}</span>
                  <Send size={16} style={{ color: "var(--color-accent)" }} aria-hidden="true" />
                </div>
                <h3 style={{ fontSize: "var(--text-16)", fontWeight: 700 }}>
                  {isEn ? "Omnichannel Dispatch" : "Eksekusi Kanal"}
                </h3>
                <p className="muted" style={{ fontSize: "var(--text-13)", lineHeight: 1.5 }}>
                  {isEn
                    ? "Dispatches approved messages via WhatsApp Cloud API and updates CRM stages in HubSpot or Sheets."
                    : "Mengirimkan pesan resmi via WhatsApp Cloud API dan memperbarui status deal di HubSpot/Sheets."}
                </p>
              </div>

              <div className="pipeline-step-card">
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <span className="sprint-day-num">{isEn ? "Phase 05" : "Tahap 05"}</span>
                  <History size={16} style={{ color: "var(--color-accent)" }} aria-hidden="true" />
                </div>
                <h3 style={{ fontSize: "var(--text-16)", fontWeight: 700 }}>
                  {isEn ? "Immutable Ledger" : "Catatan Jejak Audit"}
                </h3>
                <p className="muted" style={{ fontSize: "var(--text-13)", lineHeight: 1.5 }}>
                  {isEn
                    ? "Logs every event, latency metric, and approval timestamp permanently for reporting and compliance."
                    : "Mencatat setiap event, durasi latensi, dan stempel waktu persetujuan permanen untuk kepatuhan."}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* The Problem & Cost of Inaction Bento Grid */}
        <section style={{ padding: "var(--space-8) 0", borderBottom: "1px solid var(--color-border)" }}>
          <div className="container" style={{ display: "grid", gap: "var(--space-6)" }}>
            <div>
              <div className="eyebrow" style={{ marginBottom: "var(--space-2)" }}>
                {isEn ? "OPERATIONAL BOTTLENECKS" : "BIAYA KELAMBATAN MANUAL"}
              </div>
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
                  <span className="badge badge-danger">{isEn ? "High Risk & Slow" : "Risiko Tinggi & Lambat"}</span>
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
                  <span className="badge badge-accent">{isEn ? "Reliable & Fast" : "Andal & Cepat"}</span>
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

        {/* High-Intent Comparison Matrix Section */}
        <section style={{ padding: "var(--space-8) 0", borderBottom: "1px solid var(--color-border)" }}>
          <div className="container" style={{ display: "grid", gap: "var(--space-6)" }}>
            <div>
              <div className="eyebrow" style={{ marginBottom: "var(--space-2)" }}>
                {isEn ? "COMPARISON MATRIX" : "PERBANDINGAN SISTEM"}
              </div>
              <h2 style={{ fontSize: "var(--text-28)" }}>
                {isEn
                  ? "Why Supervised Automation Outperforms Generic Chatbots & DIY Scripts"
                  : "Mengapa Alur Terarah Unggul Jauh dari Chatbot Bebas & Script DIY"}
              </h2>
              <p className="muted" style={{ fontSize: "var(--text-16)", maxWidth: "720px", marginTop: "var(--space-2)" }}>
                {isEn
                  ? "See how Atlas gives operational leaders complete peace of mind through deterministic control, human sign-off, and binding enterprise confidentiality."
                  : "Bandingkan kontrol kepatuhan, keandalan teknis, dan perlindungan kerahasiaan antara Atlas, chatbot publik, dan script webhook mandiri."}
              </p>
            </div>

            <div className="comparison-table-wrapper">
              <table className="comparison-table">
                <thead>
                  <tr>
                    <th style={{ width: "28%" }}>{isEn ? "Capability" : "Fitur & Kapabilitas"}</th>
                    <th className="highlight-col" style={{ width: "32%" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "var(--space-2)" }}>
                        <span style={{ color: "var(--color-accent)", fontWeight: 750 }}>Atlas Supervised Workflows</span>
                        <span className="badge badge-accent" style={{ fontSize: "10px" }}>{isEn ? "Recommended" : "Rekomendasi"}</span>
                      </div>
                    </th>
                    <th style={{ width: "20%" }}>{isEn ? "Generic AI Chatbots" : "Chatbot AI Publik"}</th>
                    <th style={{ width: "20%" }}>{isEn ? "DIY Zapier / Make" : "Script DIY / Zapier"}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><strong>{isEn ? "Outbound Action Gate" : "Gerbang Pesan Keluar"}</strong></td>
                    <td className="highlight-col">
                      <div style={{ display: "flex", alignItems: "center", gap: "var(--space-2)", color: "var(--color-success)", fontWeight: 600 }}>
                        <Check size={16} aria-hidden="true" />
                        <span>{isEn ? "Mandatory team review drawer" : "Laci izin tim wajib sebelum kirim"}</span>
                      </div>
                    </td>
                    <td><span className="muted">{isEn ? "Unchecked autonomous dispatch" : "Kirim otomatis tanpa kontrol"}</span></td>
                    <td><span className="muted">{isEn ? "Rigid if/else triggers" : "Pemicu kaku tanpa review"}</span></td>
                  </tr>

                  <tr>
                    <td><strong>{isEn ? "Data Payload Validation" : "Validasi Kerusakan Data"}</strong></td>
                    <td className="highlight-col">
                      <div style={{ display: "flex", alignItems: "center", gap: "var(--space-2)", color: "var(--color-success)", fontWeight: 600 }}>
                        <Check size={16} aria-hidden="true" />
                        <span>{isEn ? "Multi-tier schema verification" : "Validasi skema berlapis otomatis"}</span>
                      </div>
                    </td>
                    <td><span className="muted">{isEn ? "Unstructured text output" : "Teks bebas tanpa skema"}</span></td>
                    <td><span className="muted">{isEn ? "Breaks silently on schema changes" : "Mati mendadak saat form ganti format"}</span></td>
                  </tr>

                  <tr>
                    <td><strong>{isEn ? "Confidentiality & NDA" : "Perlindungan Kerahasiaan"}</strong></td>
                    <td className="highlight-col">
                      <div style={{ display: "flex", alignItems: "center", gap: "var(--space-2)", color: "var(--color-success)", fontWeight: 600 }}>
                        <Check size={16} aria-hidden="true" />
                        <span>{isEn ? "Mutual NDA & zero AI training" : "NDA resmi & data aman 100%"}</span>
                      </div>
                    </td>
                    <td><span className="muted">{isEn ? "Public model training risk" : "Risiko data melatih model publik"}</span></td>
                    <td><span className="muted">{isEn ? "Scattered 3rd party webhooks" : "Data tersebar di banyak pihak ketiga"}</span></td>
                  </tr>

                  <tr>
                    <td><strong>{isEn ? "Implementation Speed" : "Waktu Serah Terima"}</strong></td>
                    <td className="highlight-col">
                      <div style={{ display: "flex", alignItems: "center", gap: "var(--space-2)", color: "var(--color-success)", fontWeight: 600 }}>
                        <Check size={16} aria-hidden="true" />
                        <span>{isEn ? "5-Day Turnkey Handover" : "5 Hari Kerja Selesai-Pakai"}</span>
                      </div>
                    </td>
                    <td><span className="muted">{isEn ? "DIY trial & prompt drifting" : "Trial-and-error mandiri"}</span></td>
                    <td><span className="muted">{isEn ? "Weeks of maintenance overhead" : "Berminggu-minggu rakit manual"}</span></td>
                  </tr>

                  <tr>
                    <td><strong>{isEn ? "Compliance Audit Trail" : "Jejak Audit Kepatuhan"}</strong></td>
                    <td className="highlight-col">
                      <div style={{ display: "flex", alignItems: "center", gap: "var(--space-2)", color: "var(--color-success)", fontWeight: 600 }}>
                        <Check size={16} aria-hidden="true" />
                        <span>{isEn ? "Permanent immutable event trace" : "Jejak audit permanen & terenkripsi"}</span>
                      </div>
                    </td>
                    <td><span className="muted">{isEn ? "Ephemeral chat sessions" : "Riwayat chat mudah hilang"}</span></td>
                    <td><span className="muted">{isEn ? "Basic rate-limited logs" : "Log terbatas tanpa replayability"}</span></td>
                  </tr>
                </tbody>
              </table>
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
                <div className="eyebrow" style={{ marginBottom: "var(--space-2)" }}>
                  {isEn ? "TURNKEY SERVICE" : "LAYANAN TURNKEY"}
                </div>
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
                  {isEn ? "Mutual NDA & Discovery" : "Penandatanganan NDA & Audit"}
                </h3>
                <p className="muted" style={{ fontSize: "var(--text-14)" }}>
                  {isEn
                    ? "Execute mutual NDA, audit lead intake forms, and map qualification criteria and approval roles."
                    : "Penandatanganan NDA resmi, audit form intake, kriteria kualifikasi lead, dan peran persetujuan tim."}
                </p>
              </div>

              <div className="sprint-day">
                <span className="sprint-day-num">{isEn ? "Day 02" : "Hari 02"}</span>
                <h3 style={{ fontSize: "var(--text-16)", fontWeight: 700 }}>
                  {isEn ? "Rubrics & Calibration" : "Kriteria & Standar Respon"}
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
                <div className="eyebrow" style={{ marginBottom: "var(--space-2)" }}>
                  {isEn ? "12 COMMERCIAL VERTICALS" : "KATALOG 12 INDUSTRI"}
                </div>
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

            {/* Featured Templates Grid (8 cards) */}
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
                      <span>{isEn ? "View Blueprint" : "Lihat detail"}</span>
                      <ArrowRight size={14} aria-hidden="true" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Real-World Client Transformation Case Studies */}
        <section style={{ padding: "var(--space-8) 0", borderBottom: "1px solid var(--color-border)" }}>
          <div className="container" style={{ display: "grid", gap: "var(--space-6)" }}>
            <div>
              <div className="eyebrow" style={{ marginBottom: "var(--space-2)" }}>
                {isEn ? "PROVEN OUTCOMES" : "STUDI KASUS BISNIS"}
              </div>
              <h2 style={{ fontSize: "var(--text-28)" }}>
                {isEn ? "Measurable Business Results from Supervised Workflows" : "Hasil Bisnis Terukur dari Alur Kerja Terverifikasi"}
              </h2>
              <p className="muted" style={{ fontSize: "var(--text-16)", maxWidth: "700px", marginTop: "var(--space-2)" }}>
                {isEn
                  ? "Explore how real operational teams eliminated lead leakages, accelerated response times, and reclaimed hundreds of hours each month."
                  : "Pelajari bagaimana tim operasional mengeliminasi kebocoran lead iklan, mempercepat respon klien, dan menghemat ratusan jam kerja setiap bulan."}
              </p>
            </div>

            <div className="case-study-grid">
              <div className="case-study-card">
                <div style={{ display: "grid", gap: "var(--space-3)" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span className="badge badge-accent">{isEn ? "Digital Agency" : "Agensi Pemasaran"}</span>
                    <span className="badge">{isEn ? "Inbound Sales" : "Kualifikasi Lead"}</span>
                  </div>
                  <div style={{ fontSize: "var(--text-24)", fontWeight: 750, color: "var(--color-accent)", fontFamily: "var(--font-mono)" }}>
                    {isEn ? "3.5h → 48s" : "3,5 Jam → 48 Detik"}
                  </div>
                  <h3 style={{ fontSize: "var(--text-16)", fontWeight: 700 }}>
                    {isEn ? "2.1x Booked Client Discovery Calls" : "Kenaikan 2.1x Booking Call Konsultasi"}
                  </h3>
                  <p className="muted" style={{ fontSize: "var(--text-14)", lineHeight: 1.5 }}>
                    {isEn
                      ? "\"Before Atlas, high-value leads from Meta ads sat overnight. Now, our account directors review and approve custom-tailored WhatsApp drafts in seconds.\""
                      : "\"Sebelum Atlas, lead bernilai tinggi dari iklan Meta menumpuk berjam-jam. Sekarang, direktur akun kami mereview draf WhatsApp terarah dalam hitungan detik.\""}
                  </p>
                </div>
                <div style={{ borderTop: "1px solid var(--color-border)", paddingTop: "var(--space-2)", fontSize: "var(--text-12)", color: "var(--color-muted)" }}>
                  {isEn ? "Implementation: 5-Day Turnkey Sprint" : "Paket: 5-Day Implementation Sprint"}
                </div>
              </div>

              <div className="case-study-card">
                <div style={{ display: "grid", gap: "var(--space-3)" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span className="badge badge-accent">{isEn ? "Commercial Real Estate" : "Properti & Real Estate"}</span>
                    <span className="badge">{isEn ? "Triage & Routing" : "Routing Prospek"}</span>
                  </div>
                  <div style={{ fontSize: "var(--text-24)", fontWeight: 750, color: "var(--color-success)", fontFamily: "var(--font-mono)" }}>
                    {isEn ? "Rp 45M / Mo Saved" : "Hemat Rp 45jt / Bulan"}
                  </div>
                  <h3 style={{ fontSize: "var(--text-16)", fontWeight: 700 }}>
                    {isEn ? "100% High-Intent Buyer Routing" : "Routing 100% Tepat ke Broker Utama"}
                  </h3>
                  <p className="muted" style={{ fontSize: "var(--text-14)", lineHeight: 1.5 }}>
                    {isEn
                      ? "\"Our brokers no longer waste hours on unqualified inquiries. Atlas filters and routes genuine buyers with complete audit trails.\""
                      : "\"Broker kami tidak lagi membuang waktu untuk lead yang tidak memenuhi kriteria. Atlas menyaring dan merutekan hanya pembeli terverifikasi lengkap dengan jejak audit.\""}
                  </p>
                </div>
                <div style={{ borderTop: "1px solid var(--color-border)", paddingTop: "var(--space-2)", fontSize: "var(--text-12)", color: "var(--color-muted)" }}>
                  {isEn ? "Implementation: Custom Lead Routing" : "Paket: Custom Routing & Verification"}
                </div>
              </div>

              <div className="case-study-card">
                <div style={{ display: "grid", gap: "var(--space-3)" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span className="badge badge-accent">{isEn ? "B2B SaaS" : "B2B Sales Operations"}</span>
                    <span className="badge">{isEn ? "Brand Safety" : "Keamanan Komunikasi"}</span>
                  </div>
                  <div style={{ fontSize: "var(--text-24)", fontWeight: 750, color: "var(--color-accent)", fontFamily: "var(--font-mono)" }}>
                    {isEn ? "0 Hallucinations" : "0 Kesalahan Pesan"}
                  </div>
                  <h3 style={{ fontSize: "var(--text-16)", fontWeight: 700 }}>
                    {isEn ? "100% Brand Voice Protection" : "100% Proteksi Reputasi Brand"}
                  </h3>
                  <p className="muted" style={{ fontSize: "var(--text-14)", lineHeight: 1.5 }}>
                    {isEn
                      ? "\"The human review drawer gave our executive team peace of mind. Not a single unvetted email or message ever leaves our system.\""
                      : "\"Laci persetujuan tim memberi rasa aman penuh bagi manajemen. Tidak ada satu pun email atau pesan yang keluar tanpa izin resmi tim kami.\""}
                  </p>
                </div>
                <div style={{ borderTop: "1px solid var(--color-border)", paddingTop: "var(--space-2)", fontSize: "var(--text-12)", color: "var(--color-muted)" }}>
                  {isEn ? "Implementation: Supervised Support SLA" : "Paket: Supervised Enterprise SLA"}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Interactive Agency Capacity & ROI Calculator */}
        <section id="roi-calculator" style={{ padding: "var(--space-8) 0", borderBottom: "1px solid var(--color-border)" }}>
          <div className="container" style={{ display: "grid", gap: "var(--space-6)" }}>
            <div>
              <div className="eyebrow" style={{ marginBottom: "var(--space-2)" }}>
                {isEn ? "SAVINGS PROJECTION" : "KALKULASI PENGHEMATAN"}
              </div>
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
        <section id="security" style={{ padding: "var(--space-8) 0", borderBottom: "1px solid var(--color-border)" }}>
          <div className="container" style={{ display: "grid", gap: "var(--space-6)" }}>
            <div>
              <div className="eyebrow" style={{ marginBottom: "var(--space-2)" }}>
                {isEn ? "SECURITY & DATA GOVERNANCE" : "KEAMANAN & INTEGRITAS DATA"}
              </div>
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
              <div className="eyebrow" style={{ marginBottom: "var(--space-2)" }}>
                {isEn ? "COMMON QUESTIONS" : "PERTANYAAN UMUM"}
              </div>
              <h2 style={{ fontSize: "var(--text-28)" }}>
                {isEn ? "Frequently Asked Questions" : "Pertanyaan yang Sering Diajukan"}
              </h2>
            </div>

            <div className="faq-accordion">
              {faqData.map((faq, idx) => (
                <details key={idx} className="faq-item" open={idx === 0}>
                  <summary className="faq-summary">
                    <span>{faq.q}</span>
                    <ChevronDown size={18} aria-hidden="true" />
                  </summary>
                  <div className="faq-content">
                    {faq.a}
                  </div>
                </details>
              ))}
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
