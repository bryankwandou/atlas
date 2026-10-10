import Link from "next/link";
import { ArrowUpRight, ShieldCheck, MapPin, CheckCircle2, Building, Zap } from "lucide-react";

interface Props {
  isEn?: boolean;
}

export function CaseRecordsSection({ isEn = true }: Props) {
  const caseRecords = [
    {
      id: "01",
      sector: isEn ? "High-End Real Estate Brokerage" : "Properti & Real Estate Mewah",
      location: "Jakarta & Bali, ID",
      title: isEn ? "Omnichannel Inbound Triage & Territory Dispatch" : "Kualifikasi Prospek Masuk & Alokasi Wilayah",
      metricValue: "14,200",
      metricLabel: isEn ? "Monthly leads triaged" : "Prospek dikualifikasi / bln",
      secondaryMetric: "< 42s",
      secondaryLabel: isEn ? "Avg operator review window" : "Waktu respon operator",
      narrative: isEn
        ? "Replaced fragmented WhatsApp spreadsheets with an automated multi-channel ingestion gate. High-intent buyer inquiries are qualified against property price brackets, then routed directly to territory lead brokers with pre-drafted WhatsApp brochures awaiting one-click authorization."
        : "Menggantikan spreadsheet WhatsApp yang terfragmentasi dengan gerbang kualifikasi data masuk otomatis. Pertanyaan pembeli potensial dinilai berdasarkan kisaran harga properti, lalu diarahkan ke broker wilayah dengan draf brosur WhatsApp siap kirim menunggu persetujuan 1 klik.",
      tags: ["WhatsApp Cloud API", "Meta Lead Ads", "Human Gatekeeper"],
    },
    {
      id: "02",
      sector: isEn ? "B2B FinTech & Cross-Border SaaS" : "FinTech B2B & Layanan Korporat",
      location: "Singapore & Jakarta",
      title: isEn ? "High-Ticket Account Scoring & CRM Pipeline Sync" : "Penilaian Akun Prioritas & Sinkronisasi CRM",
      metricValue: "Rp4.8B",
      metricLabel: isEn ? "Pipeline qualified monthly" : "Pipeline deal terverifikasi / bln",
      secondaryMetric: "100%",
      secondaryLabel: isEn ? "Outbound dispatch fidelity" : "Akurasi pesan keluar",
      narrative: isEn
        ? "Ingests enterprise trial signups, scores revenue fit using private determinism guardrails, and notifies senior account executives in Slack with enriched firmographic profiles. Zero message dispatches leave the organization without human verification."
        : "Menangkap pendaftaran uji coba korporat, menilai kesesuaian omzet dengan rubrik deterministik privat, dan memberi notifikasi ke pimpinan akun di Slack lengkap dengan profil perusahaan. Tidak ada email atau pesan keluar yang dikirim tanpa verifikasi manusia.",
      tags: ["HubSpot CRM", "Slack Alerts", "SOC-2 Ready Audit"],
    },
    {
      id: "03",
      sector: isEn ? "National Automotive & Fleet Network" : "Jaringan Dealer Otomotif Nasional",
      location: "Surabaya & Medan, ID",
      title: isEn ? "Service Escalation & Test Drive Booking Gatekeeper" : "Eskalasi Servis & Reservasi Test Drive",
      metricValue: "82%",
      metricLabel: isEn ? "First-contact qualification" : "Penyelesaian kontak pertama",
      secondaryMetric: "0",
      secondaryLabel: isEn ? "False dispatch incidents" : "Insiden salah kirim",
      narrative: isEn
        ? "Automated triage across 32 regional dealerships. Distinguishes emergency repair complaints from prospective fleet purchasers. Schedules showroom visits and logs tamper-evident cryptographic run records for every transaction."
        : "Otomasi kualifikasi di 32 cabang dealer regional. Membedakan keluhan darurat bengkel dari calon pembeli armada kendaraan. Menjadwalkan kunjungan showroom dan mencatat riwayat kriptografis permanen untuk setiap transaksi.",
      tags: ["Multi-Tenant Queue", "Omnichannel", "14-Day Hypercare"],
    },
    {
      id: "04",
      sector: isEn ? "Performance Marketing Agency" : "Agensi Pemasaran & Media Buyer",
      location: "Regional Hub",
      title: isEn ? "Multi-Account Client Isolation Hub" : "Pusat Operasional Terisolasi Multi-Klien",
      metricValue: "18",
      metricLabel: isEn ? "Brand workspaces managed" : "Akun brand aktif",
      secondaryMetric: "4h",
      secondaryLabel: isEn ? "Setup time per new account" : "Waktu setup per klien baru",
      narrative: isEn
        ? "Allows a single agency operations team to manage inbound campaigns across 18 distinct client brands with zero data co-mingling. Dedicated tenant workspaces ensure each brand's leads and CRM syncs remain cryptographically isolated."
        : "Memungkinkan tim operasional agensi mengelola kampanye iklan untuk 18 brand klien secara bersamaan tanpa risiko pencampuran data. Ruang kerja privat menjamin prospek dan sinkronisasi CRM setiap brand tetap terisolasi secara aman.",
      tags: ["Tenant Airgap", "Multi-Account", "White-Label Console"],
    },
  ];

  return (
    <section id="cases" style={{ padding: "var(--space-8) 0", borderBottom: "1px solid var(--color-border)" }}>
      <div className="container" style={{ display: "grid", gap: "var(--space-6)" }}>
        <div style={{ display: "grid", gap: "var(--space-2)", maxWidth: "68ch" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <span className="font-mono text-12" style={{ textTransform: "uppercase", letterSpacing: "0.16em", color: "var(--color-accent)", fontWeight: 700 }}>
              {isEn ? "Field Case Records" : "Catatan Kasus Operasional"}
            </span>
          </div>
          <h2 className="font-display" style={{ fontSize: "clamp(32px, 4vw, 48px)", fontWeight: 800 }}>
            {isEn ? "Engineered for high-stakes operations." : "Dibangun untuk operasional bernilai tinggi."}
          </h2>
          <p style={{ color: "var(--color-muted)", fontSize: "var(--text-16)", lineHeight: 1.6 }}>
            {isEn
              ? "We do not sell abstract theories or brittle toys. Here is how our 5-day production pipelines perform in actual commercial deployments."
              : "Kami tidak menjual teori atau skrip rapuh. Berikut adalah performa nyata alur kerja produksi 5 hari kerja kami pada implementasi komersial."}
          </p>
        </div>

        <div className="case-record-grid">
          {caseRecords.map((record) => (
            <article
              key={record.id}
              style={{
                background: "var(--color-surface)",
                border: "1px solid var(--color-border)",
                borderRadius: "var(--radius-lg)",
                padding: "var(--space-6)",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                gap: "var(--space-5)",
                transition: "border-color 180ms var(--ease), transform 180ms var(--ease), box-shadow 180ms var(--ease)",
              }}
              className="case-study-card"
            >
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "12px", borderBottom: "1px solid var(--color-border)", paddingBottom: "var(--space-3)" }}>
                  <div>
                    <span className="font-mono text-12" style={{ color: "var(--color-accent)", fontWeight: 700, letterSpacing: "0.08em" }}>
                      RECORD {record.id} · {record.sector.toUpperCase()}
                    </span>
                    <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "12px", color: "var(--color-muted)", marginTop: "2px" }} className="font-mono">
                      <MapPin size={12} />
                      <span>{record.location}</span>
                    </div>
                  </div>
                  <span className="badge badge-accent" style={{ fontSize: "10px", fontWeight: 700, textTransform: "uppercase" }}>
                    Verified SLA
                  </span>
                </div>

                <h3 className="font-display" style={{ fontSize: "var(--text-20)", fontWeight: 800, marginTop: "var(--space-4)", lineHeight: 1.25 }}>
                  {record.title}
                </h3>

                <p style={{ color: "var(--color-muted)", fontSize: "14px", marginTop: "var(--space-3)", lineHeight: 1.6 }}>
                  {record.narrative}
                </p>
              </div>

              <div>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "1px",
                    background: "var(--color-border)",
                    border: "1px solid var(--color-border)",
                    borderRadius: "var(--radius-md)",
                    overflow: "hidden",
                    marginBottom: "var(--space-4)",
                  }}
                >
                  <div style={{ background: "var(--color-surface-2)", padding: "12px 14px" }}>
                    <span className="font-mono text-12" style={{ color: "var(--color-muted)", textTransform: "uppercase", fontSize: "10px" }}>
                      {record.metricLabel}
                    </span>
                    <div className="font-display" style={{ fontSize: "22px", fontWeight: 800, color: "var(--color-text)", marginTop: "2px" }}>
                      {record.metricValue}
                    </div>
                  </div>
                  <div style={{ background: "var(--color-surface-2)", padding: "12px 14px" }}>
                    <span className="font-mono text-12" style={{ color: "var(--color-muted)", textTransform: "uppercase", fontSize: "10px" }}>
                      {record.secondaryLabel}
                    </span>
                    <div className="font-display" style={{ fontSize: "22px", fontWeight: 800, color: "var(--color-accent)", marginTop: "2px" }}>
                      {record.secondaryMetric}
                    </div>
                  </div>
                </div>

                <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                  {record.tags.map((tag) => (
                    <span
                      key={tag}
                      className="font-mono"
                      style={{
                        fontSize: "11px",
                        fontWeight: 600,
                        padding: "3px 8px",
                        borderRadius: "9999px",
                        background: "var(--color-surface-2)",
                        border: "1px solid var(--color-border)",
                        color: "var(--color-muted)",
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
