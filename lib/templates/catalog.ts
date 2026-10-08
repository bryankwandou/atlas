import { templateSchema, validateTemplateGraph, type WorkflowTemplate, type TemplateField } from "./schema";

type L = { id: string; en: string };

interface Spec {
  num: string;
  slug: string;
  category: WorkflowTemplate["category"];
  name: L;
  summary: L;
  ownerExplanation: L;
  tags: string[];
  inputs: TemplateField[];
  agent: "qualification" | "copywriting" | "operations" | "summarizer";
  agentLabel: L;
  instruction: string;
  threshold: number;
  integration: "mock_email" | "mock_crm" | "mock_sheet" | "mock_chat";
  actionLabel: L;
  lowPathLabel: L;
  lowIntegration: "mock_email" | "mock_crm" | "mock_sheet" | "mock_chat";
  kpis: string[];
  sampleInput: Record<string, string>;
}

const field = (key: string, id: string, en: string, type: TemplateField["type"], required = true): TemplateField => ({
  key,
  label: { id, en },
  type,
  required,
  maxLength: type === "longtext" ? 4000 : 300,
});

/**
 * All templates share one runtime shape:
 * trigger -> agent -> condition(score) -> [approval -> external action] | [internal action] -> output.
 * Templates differ by data only; no template has bespoke code.
 */
function build(s: Spec): WorkflowTemplate {
  const tpl: WorkflowTemplate = {
    id: `tpl_${s.num}`,
    slug: s.slug,
    version: "1.0.0",
    status: "published",
    category: s.category,
    name: s.name,
    summary: s.summary,
    ownerExplanation: s.ownerExplanation,
    tags: s.tags,
    inputs: s.inputs,
    nodes: [
      { id: "trigger", type: "trigger", label: { id: "Data masuk", en: "Input received" } },
      {
        id: "agent",
        type: "agent",
        label: s.agentLabel,
        agent: s.agent,
        tier: "low",
        maxOutputTokens: 600,
        instruction: s.instruction,
      },
      {
        id: "route",
        type: "condition",
        label: { id: `Skor >= ${s.threshold}?`, en: `Score >= ${s.threshold}?` },
        field: "score",
        operator: "gte",
        value: s.threshold,
        onTrue: "review",
        onFalse: "log_low",
      },
      {
        id: "review",
        type: "approval",
        label: { id: "Persetujuan manusia", en: "Human approval" },
        reason: {
          id: "Tindakan ini mengirim pesan ke pihak luar. Tinjau draf sebelum dikirim.",
          en: "This action reaches an external party. Review the draft before sending.",
        },
        expiresInHours: 48,
      },
      {
        id: "act",
        type: "action",
        label: s.actionLabel,
        integration: s.integration,
        sideEffect: "external",
        requiresApproval: true,
      },
      {
        id: "log_low",
        type: "action",
        label: s.lowPathLabel,
        integration: s.lowIntegration,
        sideEffect: "internal",
        requiresApproval: false,
      },
      { id: "done", type: "output", label: { id: "Selesai", en: "Done" } },
    ],
    edges: [
      ["trigger", "agent"],
      ["agent", "route"],
      ["review", "act"],
      ["act", "done"],
      ["log_low", "done"],
    ],
    kpis: s.kpis,
    limits: { timeoutMs: 60_000, maxSteps: 20, maxCostUsd: 0.05 },
    sampleInput: s.sampleInput,
  };
  return templateSchema.parse(tpl);
}

const leadInputs = [
  field("name", "Nama kontak", "Contact name", "text"),
  field("email", "Email", "Email", "email"),
  field("message", "Pesan masuk", "Inbound message", "longtext"),
];

const specs: Spec[] = [
  {
    num: "001",
    slug: "inbound-lead-qualification",
    category: "sales",
    name: { id: "Kualifikasi Lead Masuk", en: "Inbound Lead Qualification" },
    summary: {
      id: "Menilai lead baru, menyiapkan draf balasan, dan menunggu persetujuan sebelum dikirim.",
      en: "Scores new leads, drafts a reply, and waits for approval before sending.",
    },
    ownerExplanation: {
      id: "Setiap pesan dari formulir dinilai seberapa siap membeli. Lead yang serius mendapat draf balasan untuk Anda setujui. Lead lain dicatat ke CRM tanpa mengganggu tim.",
      en: "Every form message is scored for buying intent. Serious leads get a drafted reply for you to approve. Others are logged to the CRM without interrupting the team.",
    },
    tags: ["lead", "crm", "email"],
    inputs: leadInputs,
    agent: "qualification",
    agentLabel: { id: "Agen kualifikasi", en: "Qualification agent" },
    instruction: "Score buying intent 0-100 from budget, timeline, and specificity. Draft a short reply in the lead's language.",
    threshold: 60,
    integration: "mock_email",
    actionLabel: { id: "Kirim balasan email", en: "Send email reply" },
    lowPathLabel: { id: "Catat ke CRM", en: "Log to CRM" },
    lowIntegration: "mock_crm",
    kpis: ["qualified_rate", "time_to_first_reply", "approval_rate"],
    sampleInput: {
      name: "Rina (data demo)",
      email: "rina.demo@example.com",
      message: "Halo, kami butuh 3 unit untuk kantor baru bulan depan. Budget sekitar 150 juta. Bisa kirim penawaran minggu ini?",
    },
  },
  {
    num: "004",
    slug: "lead-follow-up-sequence",
    category: "sales",
    name: { id: "Urutan Follow-up Lead", en: "Lead Follow-up Sequence" },
    summary: {
      id: "Menyusun pesan follow-up yang sesuai konteks percakapan terakhir.",
      en: "Drafts a follow-up that fits the last conversation.",
    },
    ownerExplanation: {
      id: "Tempel catatan percakapan terakhir. Sistem menilai urgensi dan menyiapkan follow-up untuk Anda setujui.",
      en: "Paste the last conversation notes. The system rates urgency and prepares a follow-up for approval.",
    },
    tags: ["follow-up", "email"],
    inputs: [field("name", "Nama kontak", "Contact name", "text"), field("message", "Catatan terakhir", "Last notes", "longtext")],
    agent: "copywriting",
    agentLabel: { id: "Agen penulis", en: "Copywriting agent" },
    instruction: "Rate follow-up urgency 0-100 and draft a concise, polite follow-up message.",
    threshold: 40,
    integration: "mock_email",
    actionLabel: { id: "Kirim follow-up", en: "Send follow-up" },
    lowPathLabel: { id: "Jadwalkan ulang di sheet", en: "Reschedule in sheet" },
    lowIntegration: "mock_sheet",
    kpis: ["reply_rate", "follow_up_latency"],
    sampleInput: { name: "Budi (data demo)", message: "Sudah demo minggu lalu, tertarik tapi menunggu persetujuan atasan. Minta dihubungi lagi segera." },
  },
  {
    num: "006",
    slug: "dormant-lead-reactivation",
    category: "sales",
    name: { id: "Reaktivasi Lead Tidur", en: "Dormant Lead Reactivation" },
    summary: { id: "Menghidupkan kembali lead lama dengan pesan yang relevan.", en: "Re-engages old leads with relevant messaging." },
    ownerExplanation: {
      id: "Untuk lead yang lama tidak merespons, sistem menilai peluang dan menyiapkan pesan pembuka baru.",
      en: "For leads that went quiet, the system estimates the chance and drafts a fresh opener.",
    },
    tags: ["reactivation", "email"],
    inputs: [field("name", "Nama kontak", "Contact name", "text"), field("message", "Riwayat singkat", "Short history", "longtext")],
    agent: "copywriting",
    agentLabel: { id: "Agen penulis", en: "Copywriting agent" },
    instruction: "Estimate reactivation likelihood 0-100 and draft a low-pressure re-engagement message.",
    threshold: 50,
    integration: "mock_email",
    actionLabel: { id: "Kirim pesan reaktivasi", en: "Send reactivation message" },
    lowPathLabel: { id: "Arsipkan di CRM", en: "Archive in CRM" },
    lowIntegration: "mock_crm",
    kpis: ["reactivated_leads", "reply_rate"],
    sampleInput: { name: "PT Demo Sejahtera", message: "Minta penawaran 6 bulan lalu, sempat tertarik dengan paket premium, lalu tidak ada kabar." },
  },
  {
    num: "010",
    slug: "daily-sales-digest",
    category: "sales",
    name: { id: "Ringkasan Penjualan Harian", en: "Daily Sales Digest" },
    summary: { id: "Merangkum aktivitas penjualan menjadi digest untuk tim.", en: "Condenses sales activity into a team digest." },
    ownerExplanation: {
      id: "Tempel catatan aktivitas hari ini. Sistem merangkum dan menandai hal yang butuh perhatian.",
      en: "Paste today's activity notes. The system summarizes and flags what needs attention.",
    },
    tags: ["report", "digest"],
    inputs: [field("message", "Catatan aktivitas", "Activity notes", "longtext")],
    agent: "summarizer",
    agentLabel: { id: "Agen perangkum", en: "Summarizer agent" },
    instruction: "Summarize sales activity into bullet points. Score 0-100 how much attention is needed.",
    threshold: 70,
    integration: "mock_chat",
    actionLabel: { id: "Kirim ke kanal tim", en: "Post to team channel" },
    lowPathLabel: { id: "Simpan ke sheet", en: "Save to sheet" },
    lowIntegration: "mock_sheet",
    kpis: ["digest_delivery_rate"],
    sampleInput: { message: "5 demo selesai, 2 penawaran terkirim, 1 deal besar mundur karena harga, 3 lead baru dari iklan." },
  },
  {
    num: "013",
    slug: "faq-triage",
    category: "support",
    name: { id: "Triase FAQ", en: "FAQ Triage" },
    summary: { id: "Mengenali pertanyaan umum dan menyiapkan jawaban.", en: "Recognizes common questions and drafts answers." },
    ownerExplanation: {
      id: "Pertanyaan pelanggan dikelompokkan. Pertanyaan umum mendapat draf jawaban; yang rumit diteruskan ke tim.",
      en: "Customer questions are grouped. Common questions get a drafted answer; complex ones go to the team.",
    },
    tags: ["support", "faq"],
    inputs: leadInputs,
    agent: "qualification",
    agentLabel: { id: "Agen klasifikasi", en: "Classification agent" },
    instruction: "Score 0-100 how confidently this is a common FAQ. Draft an answer.",
    threshold: 65,
    integration: "mock_email",
    actionLabel: { id: "Kirim jawaban", en: "Send answer" },
    lowPathLabel: { id: "Teruskan ke tim support", en: "Forward to support team" },
    lowIntegration: "mock_chat",
    kpis: ["deflection_rate", "first_response_time"],
    sampleInput: { name: "Sari (data demo)", email: "sari.demo@example.com", message: "Jam operasional toko hari Minggu sampai jam berapa ya?" },
  },
  {
    num: "015",
    slug: "escalation-router",
    category: "support",
    name: { id: "Router Eskalasi", en: "Escalation Router" },
    summary: { id: "Mendeteksi tiket berisiko dan meminta eskalasi.", en: "Detects risky tickets and requests escalation." },
    ownerExplanation: {
      id: "Tiket dengan nada marah atau risiko kehilangan pelanggan ditandai dan disiapkan untuk eskalasi.",
      en: "Tickets with angry tone or churn risk are flagged and prepared for escalation.",
    },
    tags: ["support", "escalation"],
    inputs: leadInputs,
    agent: "qualification",
    agentLabel: { id: "Agen risiko", en: "Risk agent" },
    instruction: "Score escalation risk 0-100 from sentiment and churn signals. Draft an internal escalation note.",
    threshold: 60,
    integration: "mock_chat",
    actionLabel: { id: "Eskalasi ke manajer", en: "Escalate to manager" },
    lowPathLabel: { id: "Antrikan normal", en: "Queue normally" },
    lowIntegration: "mock_crm",
    kpis: ["escalation_precision", "time_to_escalation"],
    sampleInput: {
      name: "Andi (data demo)",
      email: "andi.demo@example.com",
      message: "Sudah 3 kali komplain, pesanan belum datang. Kalau besok belum ada kabar saya batalkan dan minta refund!",
    },
  },
  {
    num: "041",
    slug: "document-intake",
    category: "operations",
    name: { id: "Penerimaan Dokumen", en: "Document Intake" },
    summary: { id: "Mengekstrak inti dokumen dan memeriksa kelengkapan.", en: "Extracts document essentials and checks completeness." },
    ownerExplanation: {
      id: "Tempel isi dokumen. Sistem merangkum dan menilai kelengkapan sebelum diteruskan.",
      en: "Paste document text. The system summarizes it and rates completeness before forwarding.",
    },
    tags: ["documents", "operations"],
    inputs: [field("message", "Isi dokumen", "Document text", "longtext")],
    agent: "operations",
    agentLabel: { id: "Agen operasional", en: "Operations agent" },
    instruction: "Summarize the document and score completeness 0-100.",
    threshold: 70,
    integration: "mock_email",
    actionLabel: { id: "Kirim konfirmasi penerimaan", en: "Send receipt confirmation" },
    lowPathLabel: { id: "Tandai tidak lengkap", en: "Mark incomplete" },
    lowIntegration: "mock_sheet",
    kpis: ["completeness_rate", "processing_time"],
    sampleInput: { message: "Formulir pendaftaran vendor: nama perusahaan, NPWP, alamat, rekening bank terlampir. Tanda tangan direktur ada." },
  },
  {
    num: "044",
    slug: "meeting-action-extractor",
    category: "operations",
    name: { id: "Ekstraksi Aksi Rapat", en: "Meeting Action Extractor" },
    summary: { id: "Mengubah catatan rapat menjadi daftar tindakan.", en: "Turns meeting notes into action items." },
    ownerExplanation: {
      id: "Tempel notulen. Sistem mengambil siapa melakukan apa dan kapan, lalu menyiapkan email ringkasan.",
      en: "Paste minutes. The system extracts who does what by when, then drafts a recap email.",
    },
    tags: ["meeting", "tasks"],
    inputs: [field("message", "Catatan rapat", "Meeting notes", "longtext")],
    agent: "summarizer",
    agentLabel: { id: "Agen perangkum", en: "Summarizer agent" },
    instruction: "Extract action items with owner and deadline. Score 0-100 how actionable the notes are.",
    threshold: 50,
    integration: "mock_email",
    actionLabel: { id: "Kirim rekap ke peserta", en: "Send recap to attendees" },
    lowPathLabel: { id: "Simpan catatan", en: "Store notes" },
    lowIntegration: "mock_sheet",
    kpis: ["actions_extracted", "recap_latency"],
    sampleInput: { message: "Dina siapkan proposal sebelum Jumat. Raka cek stok gudang besok. Deadline peluncuran tanggal 20." },
  },
  {
    num: "036",
    slug: "weekly-kpi-report",
    category: "operations",
    name: { id: "Laporan KPI Mingguan", en: "Weekly KPI Report" },
    summary: { id: "Menyusun narasi KPI mingguan dari angka mentah.", en: "Writes a weekly KPI narrative from raw numbers." },
    ownerExplanation: {
      id: "Masukkan angka minggu ini. Sistem menulis ringkasan dan menandai penyimpangan.",
      en: "Enter this week's numbers. The system writes a summary and flags deviations.",
    },
    tags: ["kpi", "report"],
    inputs: [field("message", "Angka KPI", "KPI figures", "longtext")],
    agent: "summarizer",
    agentLabel: { id: "Agen perangkum", en: "Summarizer agent" },
    instruction: "Summarize KPI movement. Score 0-100 how significant the deviations are.",
    threshold: 60,
    integration: "mock_chat",
    actionLabel: { id: "Kirim ke manajemen", en: "Send to management" },
    lowPathLabel: { id: "Arsipkan laporan", en: "Archive report" },
    lowIntegration: "mock_sheet",
    kpis: ["report_on_time_rate"],
    sampleInput: { message: "Lead: 120 (minggu lalu 95). Closing: 8 (minggu lalu 12). Biaya iklan naik 30%." },
  },
  {
    num: "070",
    slug: "client-intake",
    category: "agency",
    name: { id: "Penerimaan Klien Agensi", en: "Agency Client Intake" },
    summary: { id: "Menilai brief klien baru dan menyiapkan langkah berikutnya.", en: "Assesses a new client brief and prepares next steps." },
    ownerExplanation: {
      id: "Brief klien dinilai kecocokannya dengan layanan Anda, lalu disiapkan email undangan kickoff.",
      en: "A client brief is scored for fit with your services, then a kickoff invitation is drafted.",
    },
    tags: ["agency", "onboarding"],
    inputs: leadInputs,
    agent: "qualification",
    agentLabel: { id: "Agen kualifikasi", en: "Qualification agent" },
    instruction: "Score service fit 0-100 and draft a kickoff invitation.",
    threshold: 55,
    integration: "mock_email",
    actionLabel: { id: "Kirim undangan kickoff", en: "Send kickoff invite" },
    lowPathLabel: { id: "Catat untuk ditinjau", en: "Log for review" },
    lowIntegration: "mock_crm",
    kpis: ["fit_rate", "kickoff_latency"],
    sampleInput: {
      name: "Klien Demo Studio",
      email: "klien.demo@example.com",
      message: "Butuh redesain website dan kampanye iklan 3 bulan. Budget 40 juta, mulai bulan depan.",
    },
  },
  {
    num: "005",
    slug: "proposal-follow-up",
    category: "sales",
    name: { id: "Follow-up Proposal", en: "Proposal Follow-up" },
    summary: { id: "Menindaklanjuti proposal yang belum dijawab.", en: "Follows up on unanswered proposals." },
    ownerExplanation: {
      id: "Untuk proposal yang belum dibalas, sistem menilai peluang dan menyiapkan pengingat sopan.",
      en: "For unanswered proposals, the system estimates the chance and drafts a polite reminder.",
    },
    tags: ["proposal", "email"],
    inputs: [field("name", "Nama kontak", "Contact name", "text"), field("message", "Ringkasan proposal", "Proposal summary", "longtext")],
    agent: "copywriting",
    agentLabel: { id: "Agen penulis", en: "Copywriting agent" },
    instruction: "Score close likelihood 0-100 and draft a polite proposal reminder.",
    threshold: 45,
    integration: "mock_email",
    actionLabel: { id: "Kirim pengingat", en: "Send reminder" },
    lowPathLabel: { id: "Perbarui status CRM", en: "Update CRM status" },
    lowIntegration: "mock_crm",
    kpis: ["proposal_win_rate"],
    sampleInput: { name: "Pak Joko (data demo)", message: "Proposal paket tahunan 90 juta dikirim 10 hari lalu, klien bilang akan diputuskan segera." },
  },
  {
    num: "080",
    slug: "customer-review-request",
    category: "marketing",
    name: { id: "Permintaan Ulasan Pelanggan", en: "Customer Review Request" },
    summary: { id: "Meminta ulasan hanya dari pelanggan yang puas.", en: "Asks for reviews only from satisfied customers." },
    ownerExplanation: {
      id: "Setelah layanan selesai, sistem menilai kepuasan. Pelanggan puas mendapat permintaan ulasan; lainnya diteruskan ke tim.",
      en: "After a job, the system rates satisfaction. Happy customers get a review request; others go to the team.",
    },
    tags: ["reviews", "marketing"],
    inputs: leadInputs,
    agent: "qualification",
    agentLabel: { id: "Agen sentimen", en: "Sentiment agent" },
    instruction: "Score customer satisfaction 0-100 and draft a short review request.",
    threshold: 70,
    integration: "mock_email",
    actionLabel: { id: "Kirim permintaan ulasan", en: "Send review request" },
    lowPathLabel: { id: "Teruskan ke tim layanan", en: "Forward to service team" },
    lowIntegration: "mock_chat",
    kpis: ["review_conversion", "negative_catch_rate"],
    sampleInput: {
      name: "Maya (data demo)",
      email: "maya.demo@example.com",
      message: "Terima kasih, teknisinya cepat dan rapi. Sangat puas dengan hasilnya!",
    },
  },
];

export const templates: WorkflowTemplate[] = specs.map(build);

for (const t of templates) {
  const issues = validateTemplateGraph(t);
  if (issues.length) throw new Error(`Template ${t.slug} invalid: ${JSON.stringify(issues)}`);
}

export function getTemplate(slug: string): WorkflowTemplate | undefined {
  return templates.find((t) => t.slug === slug);
}
