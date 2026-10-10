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
  Workflow,
  Globe,
  Share2,
  Bot,
} from "lucide-react";
import { getLocale, getDict, pick } from "@/lib/i18n";
import { getSession } from "@/lib/auth/session";
import { templates } from "@/lib/templates/catalog";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { WorkflowCanvas } from "@/components/WorkflowCanvas";
import { VideoWalkthrough } from "@/components/VideoWalkthrough";
import { RoiCalculator } from "@/components/RoiCalculator";
import { LeadCaptureForm } from "@/components/LeadCaptureForm";
import { SchemaOrgJsonLd } from "@/components/SchemaOrgJsonLd";
import { GovernanceDial } from "@/components/GovernanceDial";
import { CaseRecordsSection } from "@/components/CaseRecordsSection";
import { ArchitectureModuleDemo } from "@/components/ArchitectureModuleDemo";
import { OperatorConsoleMockup } from "@/components/OperatorConsoleMockup";
import { OrbitalRings } from "@/components/OrbitalRings";

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

  const integrationList = [
    { name: "Meta Lead Ads", type: isEn ? "Inbound Forms" : "Form Iklan Masuk", desc: isEn ? "Instant webhook sync <2s" : "Sinkronisasi webhook <2s" },
    { name: "WhatsApp Cloud API", type: isEn ? "Messaging Channel" : "Kanal Pesan Resmi", desc: isEn ? "Verified template dispatches" : "Kirim pesan template resmi" },
    { name: "HubSpot CRM", type: isEn ? "Pipeline & Deals" : "CRM & Manajemen Deal", desc: isEn ? "Two-way stage updates" : "Pembaruan status dua arah" },
    { name: "Typeform & Webflow", type: isEn ? "Landing Ingestion" : "Formulir Landing Page", desc: isEn ? "Multi-tier payload checks" : "Validasi data berlapis" },
    { name: "Google Sheets", type: isEn ? "Spreadsheet Ledger" : "Buku Kerja Spreadsheet", desc: isEn ? "Automated row appending" : "Pencatatan baris otomatis" },
    { name: "Slack & Email", type: isEn ? "Internal Alerts" : "Notifikasi Tim Internal", desc: isEn ? "High-priority triage alerts" : "Peringatan prospek prioritas" },
    { name: "PostgreSQL Database", type: isEn ? "Durable Persistence" : "Penyimpanan Terenkripsi", desc: isEn ? "Tenant-isolated state" : "Isolasi data privat" },
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
    <div className="atelier-dark-page" style={{ display: "flex", flexDirection: "column" }}>
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
        {/* 01 — Hero Section: Client Acquisition Showcase */}
        <section
          style={{
            padding: "clamp(48px, 8vw, 84px) 0 clamp(40px, 6vw, 64px) 0",
            borderBottom: "1px solid var(--color-border)",
            background: "radial-gradient(ellipse at top, var(--color-surface-2), var(--color-bg))",
            position: "relative",
          }}
        >
          <div className="container" style={{ display: "grid", gap: "var(--space-7)" }}>
            <div className="hero-grid" style={{ alignItems: "center" }}>
              {/* Left Column: Commercial Pitch */}
              <div style={{ display: "grid", gap: "var(--space-4)" }}>
                <div style={{ display: "inline-flex" }}>
                  <span
                    className="font-mono"
                    style={{
                      fontSize: "11px",
                      fontWeight: 700,
                      letterSpacing: "0.14em",
                      textTransform: "uppercase",
                      color: "var(--color-accent)",
                      background: "var(--color-surface)",
                      border: "1px solid var(--color-border)",
                      padding: "4px 12px",
                      borderRadius: "9999px",
                    }}
                  >
                    {isEn
                      ? "Bespoke Automation Atelier · 5-Day Turnkey Sprints"
                      : "Atelier Otomasi Enterprise · Sprint Produksi 5 Hari"}
                  </span>
                </div>

                <h1
                  className="font-display"
                  style={{
                    fontSize: "clamp(2.5rem, 5vw, 4.2rem)",
                    lineHeight: 1.04,
                    letterSpacing: "-0.04em",
                    fontWeight: 900,
                  }}
                >
                  {isEn ? (
                    <>
                      AI Workflows That Actually{" "}
                      <span className="font-serif italic font-normal" style={{ letterSpacing: "-0.02em" }}>
                        Finish the Work
                      </span>
                      .
                    </>
                  ) : (
                    <>
                      Alur Kerja AI yang Menyelesaikan{" "}
                      <span className="font-serif italic font-normal">
                        Pekerjaan Nyata
                      </span>
                      .
                    </>
                  )}
                </h1>

                <p
                  style={{
                    fontSize: "clamp(16px, 1.3vw, 18px)",
                    lineHeight: 1.6,
                    maxWidth: "540px",
                    color: "var(--color-muted)",
                  }}
                >
                  {isEn
                    ? "We engineer, calibrate, and deploy production-grade automation pipelines into your WhatsApp and CRM infrastructure in 5 days flat. Zero hallucinations, mandatory human approval gates, and 100% client code ownership."
                    : "Kami merancang, menguji, dan meluncurkan alur kerja otomasi produksi ke infrastruktur WhatsApp dan CRM Anda dalam 5 hari kerja. Nol halusinasi, izin persetujuan tim wajib, dan 100% kepemilikan kode milik klien."}
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
                  <a
                    href="#audit-form"
                    className="btn btn-primary"
                    style={{ borderRadius: "9999px", padding: "0 24px", fontWeight: 700 }}
                  >
                    <span>{isEn ? "Book Architecture Audit" : "Jadwalkan Audit Arsitektur"}</span>
                    <ArrowRight size={16} aria-hidden="true" />
                  </a>

                  <Link
                    href="/services/implementation-sprint"
                    className="btn btn-secondary"
                    style={{ borderRadius: "9999px", padding: "0 20px", fontWeight: 600 }}
                  >
                    <span>{isEn ? "5-Day Sprint (Rp7.5M)" : "Sprint 5 Hari (Rp7.5jt)"}</span>
                  </Link>
                </div>

                {/* Meta Stats Row (Inspired by Splicecraft / Augmenta) */}
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "var(--space-5)",
                    paddingTop: "var(--space-3)",
                    borderTop: "1px solid var(--color-border)",
                  }}
                >
                  <div>
                    <span className="font-display" style={{ display: "block", fontSize: "24px", fontWeight: 900 }}>
                      5 Days
                    </span>
                    <span className="font-mono text-12" style={{ color: "var(--color-muted)", textTransform: "uppercase" }}>
                      {isEn ? "Turnkey Delivery" : "Serah Terima"}
                    </span>
                  </div>
                  <div>
                    <span className="font-display" style={{ display: "block", fontSize: "24px", fontWeight: 900, color: "var(--color-success)" }}>
                      100%
                    </span>
                    <span className="font-mono text-12" style={{ color: "var(--color-muted)", textTransform: "uppercase" }}>
                      {isEn ? "Human Gatekeeper" : "Persetujuan Tim"}
                    </span>
                  </div>
                  <div>
                    <span className="font-display" style={{ display: "block", fontSize: "24px", fontWeight: 900 }}>
                      120
                    </span>
                    <span className="font-mono text-12" style={{ color: "var(--color-muted)", textTransform: "uppercase" }}>
                      {isEn ? "Proven Blueprints" : "Blueprint Teruji"}
                    </span>
                  </div>
                  <div>
                    <span className="font-display" style={{ display: "block", fontSize: "24px", fontWeight: 900, color: "var(--color-accent)" }}>
                      0
                    </span>
                    <span className="font-mono text-12" style={{ color: "var(--color-muted)", textTransform: "uppercase" }}>
                      {isEn ? "Outbound Leaks" : "Salah Kirim"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Right Column: Interactive Airgapped Operator Console */}
              <div id="demo" style={{ position: "relative" }}>
                <div
                  style={{
                    position: "absolute",
                    top: "-12%",
                    right: "-12%",
                    width: "124%",
                    height: "124%",
                    pointerEvents: "none",
                    zIndex: 0,
                    opacity: 0.45,
                    color: "var(--color-accent)",
                  }}
                >
                  <OrbitalRings size={560} />
                </div>
                <div style={{ position: "relative", zIndex: 1 }}>
                  <OperatorConsoleMockup isEn={isEn} />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 02 — Marquee Ticker Strip (Splicecraft capability tape) */}
        <div className="ticker-container" aria-hidden="true">
          <div className="ticker-track">
            <span className="ticker-item"><span className="ticker-diamond">◆</span>DETERMINISTIC GUARDRAILS</span>
            <span className="ticker-item"><span className="ticker-diamond">◆</span>SUB-SECOND INGESTION</span>
            <span className="ticker-item"><span className="ticker-diamond">◆</span>AIRGAPPED TENANT ISOLATION</span>
            <span className="ticker-item"><span className="ticker-diamond">◆</span>MANDATORY HUMAN APPROVAL GATES</span>
            <span className="ticker-item"><span className="ticker-diamond">◆</span>CRYPTOGRAPHIC AUDIT TRAILS</span>
            <span className="ticker-item"><span className="ticker-diamond">◆</span>OFFICIAL WHATSAPP CLOUD API</span>
            <span className="ticker-item"><span className="ticker-diamond">◆</span>TWO-WAY CRM SYNCHRONIZATION</span>
            <span className="ticker-item"><span className="ticker-diamond">◆</span>ZERO-HALLUCINATION GUARANTEE</span>
            <span className="ticker-item"><span className="ticker-diamond">◆</span>100% CLIENT CODE OWNERSHIP</span>
            <span className="ticker-item"><span className="ticker-diamond">◆</span>5-DAY PRODUCTION SPRINT</span>
            <span className="ticker-item"><span className="ticker-diamond">◆</span>DETERMINISTIC GUARDRAILS</span>
            <span className="ticker-item"><span className="ticker-diamond">◆</span>SUB-SECOND INGESTION</span>
            <span className="ticker-item"><span className="ticker-diamond">◆</span>AIRGAPPED TENANT ISOLATION</span>
            <span className="ticker-item"><span className="ticker-diamond">◆</span>MANDATORY HUMAN APPROVAL GATES</span>
            <span className="ticker-item"><span className="ticker-diamond">◆</span>CRYPTOGRAPHIC AUDIT TRAILS</span>
            <span className="ticker-item"><span className="ticker-diamond">◆</span>OFFICIAL WHATSAPP CLOUD API</span>
            <span className="ticker-item"><span className="ticker-diamond">◆</span>TWO-WAY CRM SYNCHRONIZATION</span>
            <span className="ticker-item"><span className="ticker-diamond">◆</span>ZERO-HALLUCINATION GUARANTEE</span>
            <span className="ticker-item"><span className="ticker-diamond">◆</span>100% CLIENT CODE OWNERSHIP</span>
            <span className="ticker-item"><span className="ticker-diamond">◆</span>5-DAY PRODUCTION SPRINT</span>
          </div>
        </div>

        {/* 02 — Product Tour & Interactive Video Walkthrough */}
        <section id="walkthrough" style={{ padding: "var(--space-8) 0", borderBottom: "1px solid var(--color-border)" }}>
          <div className="container" style={{ display: "grid", gap: "var(--space-6)" }}>
            <div style={{ textAlign: "center", display: "grid", gap: "var(--space-2)", justifyItems: "center" }}>
              <div className="eyebrow">{isEn ? "INTERACTIVE PRODUCT TOUR" : "TUR DEMO PRODUK"}</div>
              <h2 style={{ fontSize: "var(--text-28)", maxWidth: "680px" }}>
                {isEn ? "See How Atlas Executes Workflows Step-by-Step" : "Saksikan Cara Kerja Alur Atlas Tahap demi Tahap"}
              </h2>
              <p className="muted" style={{ fontSize: "var(--text-16)", maxWidth: "620px" }}>
                {isEn
                  ? "Explore the 5-phase execution lifecycle in our interactive sandbox walkthrough player with real payload inspection."
                  : "Pelajari siklus hidup eksekusi 5 tahap melalui video walkthrough interaktif lengkap dengan inspeksi payload nyata."}
              </p>
            </div>

            <VideoWalkthrough locale={locale} />
          </div>
        </section>

        {/* 03 — Interactive Architecture Governance Dial Simulator */}
        <section style={{ padding: "var(--space-8) 0", borderBottom: "1px solid var(--color-border)" }}>
          <div className="container">
            <GovernanceDial isEn={isEn} />
          </div>
        </section>

        {/* 04 — High-Impact Field Case Records */}
        <CaseRecordsSection isEn={isEn} />

        {/* 05 — Live Architecture Telemetry & Module Specifications */}
        <ArchitectureModuleDemo isEn={isEn} />

        {/* 06 — The Difference: AI Chat vs AI Workflow */}
        <section style={{ padding: "var(--space-8) 0", borderBottom: "1px solid var(--color-border)" }}>
          <div className="container" style={{ display: "grid", gap: "var(--space-6)" }}>
            <div>
              <div className="eyebrow" style={{ marginBottom: "var(--space-2)" }}>
                {isEn ? "SYSTEM ARCHITECTURE" : "PERBEDAAN ARSITEKTUR"}
              </div>
              <h2 style={{ fontSize: "var(--text-28)" }}>
                {isEn ? "The Fundamental Difference: AI Chat vs. AI Workflow" : "Perbedaan Mendasar: Chatbot AI vs. Alur Kerja AI"}
              </h2>
              <p className="muted" style={{ fontSize: "var(--text-16)", maxWidth: "700px", marginTop: "var(--space-2)" }}>
                {isEn
                  ? "Open-ended chatbots are designed for casual talk. Business operations require deterministic data structures, human approval gates, and compliance guarantees."
                  : "Chatbot percakapan bebas dirancang untuk dialog santai. Operasional bisnis membutuhkan struktur data deterministik, izin manusia wajib, dan kepatuhan hukum."}
              </p>
            </div>

            <div className="bento-grid">
              {/* Unsupervised AI Chatbot Card */}
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
                  <div style={{ display: "flex", alignItems: "center", gap: "var(--space-2)" }}>
                    <Bot size={20} style={{ color: "var(--color-danger)" }} aria-hidden="true" />
                    <h3 style={{ fontSize: "var(--text-18)", color: "var(--color-muted)", fontWeight: 700 }}>
                      {isEn ? "Conventional AI Chatbots" : "Chatbot AI Konvensional"}
                    </h3>
                  </div>
                  <span className="badge badge-danger">{isEn ? "High Risk" : "Risiko Tinggi"}</span>
                </div>

                <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gap: "var(--space-3)", fontSize: "var(--text-14)" }}>
                  {[
                    isEn ? "Unstructured freeform text that cannot reliably map to CRM databases" : "Output teks bebas yang sulit disinkronkan ke CRM dan database",
                    isEn ? "Hallucination risks committing unauthorized pricing or dates directly to clients" : "Halusinasi berisiko memberikan harga salah langsung ke klien",
                    isEn ? "Unpredictable per-conversation token expenses with no budget ceiling" : "Biaya token tidak terduga tanpa batas anggaran per transaksi",
                    isEn ? "Ephemeral chat transcripts with no compliance or dispute audit trail" : "Riwayat chat sementara tanpa jejak audit resmi untuk kepatuhan",
                    isEn ? "Constant manual firefighting required when wrong replies are dispatched" : "Perlu penanganan manual berulang saat bot mengirim jawaban salah",
                  ].map((pt, idx) => (
                    <li key={idx} style={{ display: "flex", gap: "var(--space-3)", alignItems: "flex-start" }}>
                      <XCircle size={18} aria-hidden="true" style={{ color: "var(--color-danger)", flexShrink: 0, marginTop: "2px" }} />
                      <span className="muted">{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Supervised AI Workflow Card */}
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
                  <div style={{ display: "flex", alignItems: "center", gap: "var(--space-2)" }}>
                    <Workflow size={20} style={{ color: "var(--color-accent)" }} aria-hidden="true" />
                    <h3 style={{ fontSize: "var(--text-18)", color: "var(--color-text)", fontWeight: 750 }}>
                      {isEn ? "Atlas Supervised Workflows" : "Alur Kerja Terarah Atlas"}
                    </h3>
                  </div>
                  <span className="badge badge-accent">{isEn ? "Enterprise Safe" : "Aman & Terarah"}</span>
                </div>

                <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gap: "var(--space-3)", fontSize: "var(--text-14)" }}>
                  {[
                    isEn ? "Strict multi-tier schema validation rejects corrupt payloads at the gateway" : "Validasi skema data berlapis menolak form spam sebelum eksekusi",
                    isEn ? "Mandatory human review drawer ensures 100% brand voice safety before dispatch" : "Laci izin tim internal memastikan 100% keamanan komunikasi brand",
                    isEn ? "Bounded prompt tiers keep scoring costs under $0.001 per inbound transaction" : "Tingkat prompt terarah menjaga biaya eksekusi di bawah Rp15/transaksi",
                    isEn ? "Cryptographically verifiable event traces preserved permanently in storage" : "Catatan jejak audit permanen terenkripsi untuk pelaporan kepatuhan",
                    isEn ? "Idempotency keys prevent accidental duplicates during network retries" : "Kunci idempoten mencegah pesan ganda saat koneksi jaringan terputus",
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

        {/* 04 — Template-First Workflow Creation & Agency Multi-Client Scaling */}
        <section style={{ padding: "var(--space-8) 0", borderBottom: "1px solid var(--color-border)" }}>
          <div className="container" style={{ display: "grid", gap: "var(--space-6)" }}>
            <div>
              <div className="eyebrow" style={{ marginBottom: "var(--space-2)" }}>
                {isEn ? "TEMPLATE-FIRST VELOCITY" : "KECEPATAN BERBASIS BLUEPRINT"}
              </div>
              <h2 style={{ fontSize: "var(--text-28)" }}>
                {isEn
                  ? "Launch in Days, Not Quarters: Template-First Architecture"
                  : "Aktif dalam Hitungan Hari: Arsitektur Berbasis Template Teruji"}
              </h2>
              <p className="muted" style={{ fontSize: "var(--text-16)", maxWidth: "720px", marginTop: "var(--space-2)" }}>
                {isEn
                  ? "Building custom automation from scratch takes months of debugging. Atlas provides 120 battle-tested blueprints that can be adapted, calibrated, and deployed in 5 days."
                  : "Membangun automasi dari nol memakan waktu berbulan-bulan. Atlas menyediakan 120 blueprint bisnis tervalidasi yang siap disesuaikan dan diterapkan dalam 5 hari kerja."}
              </p>
            </div>

            <div className="bento-grid">
              <div className="panel" style={{ display: "grid", gap: "var(--space-3)" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "var(--space-2)" }}>
                  <Layers size={20} style={{ color: "var(--color-accent)" }} aria-hidden="true" />
                  <h3 style={{ fontSize: "var(--text-18)", fontWeight: 700 }}>
                    {isEn ? "120 Pre-Validated Blueprints" : "120 Blueprint Siap Pakai"}
                  </h3>
                </div>
                <p className="muted" style={{ fontSize: "var(--text-14)", lineHeight: 1.5 }}>
                  {isEn
                    ? "Each blueprint features deterministic routing, bounded token limits, and verified approval thresholds across 12 commercial industries."
                    : "Setiap blueprint memiliki alur terarah, batas token teruji, dan ambang batas izin manusia untuk 12 sektor industri komersial."}
                </p>
              </div>

              <div className="panel" style={{ display: "grid", gap: "var(--space-3)" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "var(--space-2)" }}>
                  <Users size={20} style={{ color: "var(--color-accent)" }} aria-hidden="true" />
                  <h3 style={{ fontSize: "var(--text-18)", fontWeight: 700 }}>
                    {isEn ? "Multi-Account Agency Isolation" : "Isolasi Akun Klien Agensi"}
                  </h3>
                </div>
                <p className="muted" style={{ fontSize: "var(--text-14)", lineHeight: 1.5 }}>
                  {isEn
                    ? "Marketing agencies can deploy customized workflows across multiple client accounts with dedicated private workspaces and zero data bleed."
                    : "Agensi pemasaran dapat menerapkan alur kerja kustom ke portofolio klien dengan isolasi data ketat dan ruang kerja mandiri."}
                </p>
              </div>

              <div className="panel" style={{ display: "grid", gap: "var(--space-3)" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "var(--space-2)" }}>
                  <Share2 size={20} style={{ color: "var(--color-accent)" }} aria-hidden="true" />
                  <h3 style={{ fontSize: "var(--text-18)", fontWeight: 700 }}>
                    {isEn ? "Zero Vendor Lock-In" : "Bebas Keterikatan Vendor"}
                  </h3>
                </div>
                <p className="muted" style={{ fontSize: "var(--text-14)", lineHeight: 1.5 }}>
                  {isEn
                    ? "You own your workflows and customer data 100%. Dispatches connect directly to your official Meta, CRM, and database credentials."
                    : "Anda memiliki alur kerja dan data bisnis 100%. Integrasi terhubung langsung ke kredensial resmi Meta dan CRM milik Anda."}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 05 — Integration Ecosystem */}
        <section style={{ padding: "var(--space-8) 0", borderBottom: "1px solid var(--color-border)" }}>
          <div className="container" style={{ display: "grid", gap: "var(--space-6)" }}>
            <div style={{ textAlign: "center", display: "grid", gap: "var(--space-2)", justifyItems: "center" }}>
              <div className="eyebrow">{isEn ? "INTEGRATION ARCHITECTURE" : "ARSITEKTUR INTEGRASI"}</div>
              <h2 style={{ fontSize: "var(--text-28)", maxWidth: "680px" }}>
                {isEn ? "Connects Seamlessly with Your Existing Stack" : "Terhubung Mulus dengan Tools yang Sudah Anda Gunakan"}
              </h2>
              <p className="muted" style={{ fontSize: "var(--text-16)", maxWidth: "600px" }}>
                {isEn
                  ? "No need to rip and replace. Atlas wires into your landing pages, CRM, messaging channels, and spreadsheets via secure APIs."
                  : "Tidak perlu mengganti sistem lama. Atlas tersambung langsung ke landing page, CRM, kanal pesan, dan database Anda via API resmi."}
              </p>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
                gap: "var(--space-3)",
              }}
            >
              {integrationList.map((item, idx) => (
                <div
                  key={idx}
                  className="panel"
                  style={{
                    padding: "var(--space-4)",
                    background: "var(--color-surface)",
                    display: "grid",
                    gap: "var(--space-1)",
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontWeight: 700, fontSize: "var(--text-14)" }}>{item.name}</span>
                    <span className="badge badge-accent" style={{ fontSize: "10px" }}>{item.type}</span>
                  </div>
                  <span className="muted" style={{ fontSize: "var(--text-12)" }}>{item.desc}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 06 — 5-Day Done-For-You Implementation Sprint Section */}
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
                    ? "We don't just sell you software. We audit your lead process, configure custom nodes, test edge cases, and hand over a live, working system in 5 business days."
                    : "Kami tidak hanya menjual software. Kami mengaudit alur kualifikasi lead Anda, menyambungkan kanal pesan, menguji skenario batas, dan menyerahkan sistem yang sudah berjalan dalam 5 hari kerja."}
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

        {/* 07 — 12 Industries & 120 Validated Templates */}
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

        {/* 08 — Interactive Agency Capacity & ROI Calculator */}
        <section id="roi-calculator" style={{ padding: "var(--space-8) 0", borderBottom: "1px solid var(--color-border)" }}>
          <div className="container" style={{ display: "grid", gap: "var(--space-6)" }}>
            <div>
              <div className="eyebrow" style={{ marginBottom: "var(--space-2)" }}>
                {isEn ? "RUN-COST & CAPACITY ESTIMATOR" : "KALKULATOR KAPASITAS & BIAYA"}
              </div>
              <h2 style={{ fontSize: "var(--text-28)" }}>
                {isEn ? "Illustrative Run-Cost & ROI Estimator" : "Estimasi Penghematan Waktu & Biaya Tim Anda"}
              </h2>
              <p className="muted" style={{ fontSize: "var(--text-16)", maxWidth: "700px", marginTop: "var(--space-2)" }}>
                {isEn
                  ? "Adjust lead volumes and staff wage parameters to project how quickly an Atlas implementation sprint pays for itself (labeled as example)."
                  : "Geser parameter volume lead dan beban gaji tim untuk melihat seberapa cepat investasi implementasi Atlas balik modal (ilustrasi perkiraan)."}
              </p>
            </div>

            <RoiCalculator dict={{}} locale={locale} />
          </div>
        </section>

        {/* 09 — Enterprise Governance, Durability & Trust */}
        <section id="security" style={{ padding: "var(--space-8) 0", borderBottom: "1px solid var(--color-border)" }}>
          <div className="container" style={{ display: "grid", gap: "var(--space-6)" }}>
            <div>
              <div className="eyebrow" style={{ marginBottom: "var(--space-2)" }}>
                {isEn ? "SECURITY & DATA GOVERNANCE" : "KEAMANAN & INTEGRITAS DATA"}
              </div>
              <h2 style={{ fontSize: "var(--text-28)" }}>
                {isEn ? "Enterprise Governance: Built for Real Business" : "Fondasi Operasi Bisnis Nyata: Fakta Terverifikasi"}
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

        {/* 10 — Enterprise FAQ Accordion with FAQPage Schema */}
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

        {/* 11 — Embedded High-Converting Lead Capture Form */}
        <section id="audit-form" style={{ padding: "var(--space-8) 0", background: "var(--color-surface-2)" }}>
          <div className="container" style={{ maxWidth: "680px" }}>
            <LeadCaptureForm locale={locale} source="homepage_main" />
          </div>
        </section>

        {/* 12 — Engineering Truthfulness & Sandbox Transparency Box */}
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

        {/* 13 — Final CTA Banner */}
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
                ? "Start with a Proven Workflow Template Today"
                : "Mulai dari Template Alur Kerja Teruji Sekarang"}
            </h2>
            <p className="muted" style={{ fontSize: "var(--text-16)", maxWidth: "560px" }}>
              {isEn
                ? "Browse our catalog of 120 validated industry workflows or book a free 30-minute operational discovery audit."
                : "Jelajahi katalog 120 template alur kerja tervalidasi atau jadwalkan sesi audit diagnostik 30 menit tanpa biaya."}
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--space-3)", marginTop: "var(--space-2)", justifyContent: "center" }}>
              <Link href="/templates" className="btn btn-primary">
                <span>{isEn ? "Browse 120 Templates" : "Jelajahi 120 Template"}</span>
                <ArrowRight size={16} aria-hidden="true" />
              </Link>
              <a href="#audit-form" className="btn btn-secondary">
                <span>{isEn ? "Book Free Discovery Audit" : "Jadwalkan Audit Gratis"}</span>
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer dict={t} />
    </div>
  );
}
