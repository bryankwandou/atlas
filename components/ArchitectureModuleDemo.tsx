"use client";

import { useState } from "react";
import { Inbox, Cpu, ShieldCheck, Send, CheckCircle2, Lock, History, ArrowRight } from "lucide-react";

interface Props {
  isEn?: boolean;
}

export function ArchitectureModuleDemo({ isEn = true }: Props) {
  const [activeModule, setActiveModule] = useState<number>(0);

  const modules = [
    {
      step: "01",
      name: isEn ? "Ingestion Gateway Mesh" : "Gerbang Intake Data Multi-Kanal",
      subtitle: isEn ? "Sub-second webhook & schema validation" : "Validasi payload webhook sub-detik",
      icon: Inbox,
      telemetry: {
        latency: "< 340 ms",
        verification: isEn ? "Signature Verified" : "Tanda Tangan Terverifikasi",
        isolation: isEn ? "Encrypted Ingestion" : "Enkripsi Transit",
        capacity: isEn ? "10,000 req/sec" : "10.000 req/dtk",
      },
      summary: isEn
        ? "Ingests raw submissions from Meta Lead Ads, Typeform, Webflow, and direct webhooks. Validates email formats, cleans malicious injection, deduplicates previous contacts, and issues an immutable ingestion receipt."
        : "Menangkap data masuk mentah dari Meta Lead Ads, Typeform, Webflow, dan webhook langsung. Memvalidasi format email, membersihkan karakter berbahaya, mencegah duplikasi kontak lama, dan menerbitkan struk intake permanen.",
      benefits: [
        isEn ? "Prevents corrupted data from polluting your downstream CRM" : "Mencegah data rusak atau spam mengotori CRM Anda",
        isEn ? "Immediate deduplication against your historical lead records" : "Deduplikasi instan terhadap basis data prospek historis",
        isEn ? "Cryptographic timestamping for strict SLA compliance" : "Stempel waktu kriptografis untuk kepatuhan SLA ketat",
      ],
    },
    {
      step: "02",
      name: isEn ? "Deterministic Evaluation Engine" : "Mesin Evaluasi Kriteria & Scoring",
      subtitle: isEn ? "Bounded rubric qualification & draft synthesis" : "Evaluasi rubrik berpagar & penyusunan draf",
      icon: Cpu,
      telemetry: {
        latency: "1.1 s",
        verification: isEn ? "Deterministic Rubric" : "Rubrik Deterministik",
        isolation: isEn ? "Zero Model Training" : "Tanpa Training Pihak Ketiga",
        capacity: isEn ? "$0.0008 / execution" : "Rp12 / eksekusi",
      },
      summary: isEn
        ? "Scores buyer intent against your bespoke qualification rules (budget, timeline, location, fit). Synthesizes an executive response draft adhering to your official brand tone without creative deviations or hallucinations."
        : "Menilai keseriusan prospek berdasarkan aturan kualifikasi kustom Anda (anggaran, lini masa, domisili, kebutuhan). Menyusun draf respon eksekutif sesuai persona brand resmi tanpa deviasi atau halusinasi.",
      benefits: [
        isEn ? "Locked prompt parameters enforce deterministic criteria scoring" : "Parameter prompt terkunci menegakkan penilaian kualifikasi objektif",
        isEn ? "Custom tailored to your high-ticket service offering" : "Disesuaikan secara spesifik dengan penawaran jasa bernilai tinggi Anda",
        isEn ? "Strict token budget prevents computational cost runaway" : "Batas token ketat mencegah pembengkakan biaya komputasi",
      ],
    },
    {
      step: "03",
      name: isEn ? "Zero-Trust Human Gatekeeper" : "Gerbang Persetujuan Manusia Zero-Trust",
      subtitle: isEn ? "Mandatory one-click authorization console" : "Konsol otorisasi 1-klik tim internal",
      icon: ShieldCheck,
      telemetry: {
        latency: isEn ? "Operator Bound" : "Sesuai Operator",
        verification: isEn ? "Dual-Key Signoff" : "Persetujuan Berlapis",
        isolation: isEn ? "Tenant Console Airgap" : "Konsol Terisolasi",
        capacity: isEn ? "100% Zero-Leak" : "100% Bebas Salah Kirim",
      },
      summary: isEn
        ? "The pivotal enterprise safeguard. No message, email, or webhook is ever dispatched automatically to a client. The evaluated draft pauses in your secure team queue where an authorized operator clicks Approve, Edits text, or Rejects."
        : "Benteng utama keamanan enterprise. Tidak ada pesan, email, atau webhook yang terkirim otomatis ke klien. Draf tertahan di antrean tim privat di mana operator resmi mengklik Setujui, Edit teks, atau Tolak.",
      benefits: [
        isEn ? "Zero possibility of rogue AI communication reaching your clients" : "Nol kemungkinan pesan AI liar atau salah sampai ke klien Anda",
        isEn ? "Operators retain complete executive veto and editing rights" : "Tim operasional memiliki hak veto dan edit penuh dalam 1 klik",
        isEn ? "Audit logs record exactly which team member signed off" : "Catatan audit merekam siapa anggota tim yang menyetujui pesan",
      ],
    },
    {
      step: "04",
      name: isEn ? "Omnichannel Production Dispatch" : "Jaringan Pengiriman Multi-Kanal Resmi",
      subtitle: isEn ? "Official Meta Cloud API & two-way CRM sync" : "API resmi Meta Cloud & sinkronisasi CRM dua arah",
      icon: Send,
      telemetry: {
        latency: "< 850 ms",
        verification: isEn ? "Verified Sender ID" : "ID Pengirim Terverifikasi",
        isolation: isEn ? "End-to-End Encrypted" : "Enkripsi Ujung-ke-Ujung",
        capacity: isEn ? "Unlimited Scale" : "Skala Tanpa Batas",
      },
      summary: isEn
        ? "Once approved, the verified message transmits via official WhatsApp Cloud API and updates deal stages synchronously in HubSpot, Pipedrive, or Google Sheets. Creates a closed loop with zero human data-entry drudgery."
        : "Setelah disetujui, pesan terverifikasi langsung terkirim via WhatsApp Cloud API resmi dan memperbarui status deal secara langsung di HubSpot, Pipedrive, atau Google Sheets. Menutup siklus tanpa pekerjaan ketik manual.",
      benefits: [
        isEn ? "Meta green-tick verified sender compatibility" : "Kompatibel dengan akun centang hijau resmi Meta",
        isEn ? "Synchronous two-way stage progression in your CRM" : "Pembaruan status deal otomatis dan sinkron di CRM Anda",
        isEn ? "SHA-256 cryptographic proof recorded permanently" : "Bukti permanen SHA-256 tersimpan untuk audit kepatuhan",
      ],
    },
  ];

  const current = modules[activeModule];

  return (
    <section style={{ padding: "var(--space-8) 0", borderBottom: "1px solid var(--color-border)", background: "var(--color-surface-2)" }}>
      <div className="container" style={{ display: "grid", gap: "var(--space-6)" }}>
        <div style={{ display: "grid", gap: "var(--space-2)", maxWidth: "68ch" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <span className="font-mono text-12" style={{ textTransform: "uppercase", letterSpacing: "0.16em", color: "var(--color-accent)", fontWeight: 700 }}>
              {isEn ? "Live Architecture Telemetry" : "Telemetri Arsitektur Produksi"}
            </span>
          </div>
          <h2 className="font-display" style={{ fontSize: "clamp(32px, 4vw, 48px)", fontWeight: 800 }}>
            {isEn ? "Four governed modules. One unified pipeline." : "Empat modul terkelola. Satu alur kerja terpadu."}
          </h2>
          <p style={{ color: "var(--color-muted)", fontSize: "var(--text-16)", lineHeight: 1.6 }}>
            {isEn
              ? "Select an architecture module below to inspect its operational telemetry, latency envelope, and enterprise safety guarantees."
              : "Pilih modul arsitektur di bawah untuk melihat telemetri operasional, batas latensi, dan jaminan keamanan enterprise-nya."}
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1.35fr", gap: "var(--space-6)", alignItems: "stretch" }}>
          {/* Module Selector Navigation */}
          <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-2)" }}>
            {modules.map((mod, index) => {
              const isActive = index === activeModule;
              const IconComp = mod.icon;
              return (
                <button
                  key={mod.step}
                  type="button"
                  onClick={() => setActiveModule(index)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "var(--space-4)",
                    padding: "var(--space-4) var(--space-5)",
                    borderRadius: "var(--radius-lg)",
                    border: isActive ? "1px solid var(--color-accent)" : "1px solid var(--color-border)",
                    background: isActive ? "var(--color-surface)" : "transparent",
                    color: "var(--color-text)",
                    textAlign: "left",
                    cursor: "pointer",
                    boxShadow: isActive ? "var(--shadow-raised)" : "none",
                    transition: "all 150ms var(--ease)",
                  }}
                >
                  <span
                    className="font-mono"
                    style={{
                      fontSize: "14px",
                      fontWeight: 800,
                      color: isActive ? "var(--color-accent)" : "var(--color-muted)",
                    }}
                  >
                    {mod.step}
                  </span>

                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 800, fontSize: "15px" }} className="font-display">
                      {mod.name}
                    </div>
                    <div style={{ fontSize: "12px", color: "var(--color-muted)", marginTop: "2px" }}>
                      {mod.subtitle}
                    </div>
                  </div>

                  <IconComp size={18} style={{ color: isActive ? "var(--color-accent)" : "var(--color-muted)" }} />
                </button>
              );
            })}
          </div>

          {/* Module Detail Card */}
          <div
            style={{
              background: "var(--color-surface)",
              border: "1px solid var(--color-border)",
              borderRadius: "var(--radius-lg)",
              padding: "var(--space-6)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              gap: "var(--space-5)",
              boxShadow: "var(--shadow-raised)",
            }}
          >
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid var(--color-border)", paddingBottom: "var(--space-3)" }}>
                <span className="font-mono text-12" style={{ color: "var(--color-accent)", fontWeight: 700, letterSpacing: "0.12em" }}>
                  MODULE {current.step} SPECIFICATION
                </span>
                <span className="badge badge-accent" style={{ fontSize: "10px", fontWeight: 700 }}>
                  ACTIVE IN PRODUCTION
                </span>
              </div>

              <h3 className="font-display" style={{ fontSize: "var(--text-24)", fontWeight: 800, marginTop: "var(--space-4)" }}>
                {current.name}
              </h3>

              <p style={{ color: "var(--color-muted)", fontSize: "14px", marginTop: "var(--space-2)", lineHeight: 1.6 }}>
                {current.summary}
              </p>

              <div style={{ marginTop: "var(--space-4)", display: "grid", gap: "var(--space-2)" }}>
                {current.benefits.map((b, idx) => (
                  <div key={idx} style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "13px" }}>
                    <CheckCircle2 size={15} style={{ color: "var(--color-success)", flexShrink: 0 }} />
                    <span>{b}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Live Telemetry Box */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(4, 1fr)",
                gap: "1px",
                background: "var(--color-border)",
                border: "1px solid var(--color-border)",
                borderRadius: "var(--radius-md)",
                overflow: "hidden",
              }}
            >
              <div style={{ background: "var(--color-surface-2)", padding: "10px 12px" }}>
                <span className="font-mono text-12" style={{ color: "var(--color-muted)", textTransform: "uppercase", fontSize: "10px" }}>
                  Latency
                </span>
                <div className="font-display" style={{ fontSize: "16px", fontWeight: 800, marginTop: "2px" }}>
                  {current.telemetry.latency}
                </div>
              </div>
              <div style={{ background: "var(--color-surface-2)", padding: "10px 12px" }}>
                <span className="font-mono text-12" style={{ color: "var(--color-muted)", textTransform: "uppercase", fontSize: "10px" }}>
                  Security
                </span>
                <div className="font-display" style={{ fontSize: "16px", fontWeight: 800, marginTop: "2px", color: "var(--color-accent)" }}>
                  {current.telemetry.verification}
                </div>
              </div>
              <div style={{ background: "var(--color-surface-2)", padding: "10px 12px" }}>
                <span className="font-mono text-12" style={{ color: "var(--color-muted)", textTransform: "uppercase", fontSize: "10px" }}>
                  Airgap
                </span>
                <div className="font-display" style={{ fontSize: "16px", fontWeight: 800, marginTop: "2px" }}>
                  {current.telemetry.isolation}
                </div>
              </div>
              <div style={{ background: "var(--color-surface-2)", padding: "10px 12px" }}>
                <span className="font-mono text-12" style={{ color: "var(--color-muted)", textTransform: "uppercase", fontSize: "10px" }}>
                  Scale
                </span>
                <div className="font-display" style={{ fontSize: "16px", fontWeight: 800, marginTop: "2px" }}>
                  {current.telemetry.capacity}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
