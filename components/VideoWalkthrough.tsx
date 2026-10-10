"use client";

import { useState } from "react";
import {
  Play,
  Pause,
  RotateCcw,
  Volume2,
  VolumeX,
  Maximize2,
  CheckCircle2,
  ShieldCheck,
  Clock,
  Sparkles,
  Layers,
  FileText,
  Activity,
  Send,
  Cpu,
} from "lucide-react";
import type { Locale } from "@/lib/i18n";

interface Props {
  locale?: Locale;
}

export function VideoWalkthrough({ locale = "en" }: Props) {
  const isEn = locale === "en";
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [activeChapter, setActiveChapter] = useState(0);

  const chapters = [
    {
      time: "00:00",
      title: isEn ? "Intake & Schema Validation" : "Intake & Validasi Skema",
      desc: isEn
        ? "Inbound lead payload captured from Meta Ads form and sanitized through strict schema gateways."
        : "Payload lead masuk ditangkap dari form iklan Meta dan disanitasi via gerbang skema ketat.",
      badge: isEn ? "Gateway Validated" : "Skema Terverifikasi",
      step: 1,
    },
    {
      time: "00:18",
      title: isEn ? "AI Rubric Fit Evaluation" : "Evaluasi Kriteria AI",
      desc: isEn
        ? "Deterministic scoring algorithm evaluates budget, urgency, and company size against business rules."
        : "Algoritma skoring terarah mengevaluasi budget, urgensi, dan ukuran perusahaan sesuai aturan bisnis.",
      badge: isEn ? "Fit Score: 85/100" : "Skor Kelayakan: 85/100",
      step: 2,
    },
    {
      time: "00:35",
      title: isEn ? "Human Review Drawer Gate" : "Gerbang Persetujuan Tim",
      desc: isEn
        ? "Action pauses in the review console. Operator inspects AI-drafted WhatsApp message before dispatch."
        : "Aksi tertahan di konsol review. Operator memeriksa draf pesan WhatsApp sebelum dikirim ke klien.",
      badge: isEn ? "Awaiting Operator Sign-off" : "Menunggu Izin Operator",
      step: 3,
    },
    {
      time: "00:52",
      title: isEn ? "Omnichannel Live Dispatch" : "Eksekusi Multi-Kanal",
      desc: isEn
        ? "Approved response sent via WhatsApp Cloud API and lead stage updated synchronously in CRM."
        : "Respon yang disetujui terkirim via WhatsApp Cloud API dan deal diperbarui langsung di CRM.",
      badge: isEn ? "WhatsApp & CRM Synced" : "WhatsApp & CRM Tersinkron",
      step: 4,
    },
    {
      time: "01:08",
      title: isEn ? "Immutable Event Ledger" : "Catatan Jejak Audit",
      desc: isEn
        ? "Complete cryptographic audit record stored permanently for compliance, tracking latency and cost."
        : "Catatan jejak audit lengkap disimpan permanen untuk kepatuhan, mencatat latensi dan biaya.",
      badge: isEn ? "Audit Hash Verified" : "Hash Audit Terverifikasi",
      step: 5,
    },
  ];

  return (
    <div
      className="panel"
      style={{
        background: "var(--color-surface)",
        border: "1px solid var(--color-border-strong)",
        boxShadow: "var(--shadow-raised)",
        borderRadius: "var(--radius-lg)",
        overflow: "hidden",
        display: "grid",
        gap: 0,
      }}
    >
      {/* Video Top Bar */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "var(--space-3) var(--space-5)",
          background: "var(--color-surface-2)",
          borderBottom: "1px solid var(--color-border)",
          gap: "var(--space-2)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "var(--space-3)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "var(--space-2)" }}>
            <span
              style={{
                width: "10px",
                height: "10px",
                borderRadius: "50%",
                background: "var(--color-danger)",
                display: "inline-block",
              }}
            />
            <span
              style={{
                width: "10px",
                height: "10px",
                borderRadius: "50%",
                background: "var(--color-warning)",
                display: "inline-block",
              }}
            />
            <span
              style={{
                width: "10px",
                height: "10px",
                borderRadius: "50%",
                background: "var(--color-success)",
                display: "inline-block",
              }}
            />
          </div>

          <span style={{ fontSize: "var(--text-13)", fontWeight: 700, letterSpacing: "-0.01em" }}>
            {isEn ? "Atlas Interactive Walkthrough & Product Tour" : "Tur Interaktif & Demonstrasi Produk Atlas"}
          </span>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "var(--space-2)" }}>
          <span className="badge badge-accent" style={{ fontSize: "11px" }}>
            HD 60FPS • Sandbox Demo
          </span>
          <span className="badge" style={{ fontSize: "11px" }}>
            {chapters[activeChapter].time} / 01:20
          </span>
        </div>
      </div>

      {/* Simulated Screen Playback Canvas */}
      <div
        style={{
          padding: "var(--space-6) var(--space-5)",
          background: "radial-gradient(ellipse at center, var(--color-surface-2), var(--color-bg))",
          minHeight: "320px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          position: "relative",
        }}
      >
        {/* Dynamic Display Card */}
        <div
          style={{
            maxWidth: "680px",
            width: "100%",
            background: "var(--color-surface)",
            border: "1px solid var(--color-border-strong)",
            borderRadius: "var(--radius-md)",
            padding: "var(--space-5)",
            boxShadow: "var(--shadow-raised)",
            display: "grid",
            gap: "var(--space-4)",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "var(--space-2)" }}>
              <span className="sprint-day-num">
                {isEn ? `Phase 0${chapters[activeChapter].step}` : `Tahap 0${chapters[activeChapter].step}`}
              </span>
              <span style={{ fontWeight: 700, fontSize: "var(--text-16)" }}>
                {chapters[activeChapter].title}
              </span>
            </div>
            <span className="badge badge-accent">
              {chapters[activeChapter].badge}
            </span>
          </div>

          <p className="muted" style={{ fontSize: "var(--text-14)", lineHeight: 1.6, margin: 0 }}>
            {chapters[activeChapter].desc}
          </p>

          {/* Interactive Simulation Frame */}
          <div
            style={{
              background: "var(--color-surface-2)",
              border: "1px solid var(--color-border)",
              borderRadius: "var(--radius-sm)",
              padding: "var(--space-3) var(--space-4)",
              fontFamily: "var(--font-mono)",
              fontSize: "var(--text-12)",
              display: "grid",
              gap: "var(--space-2)",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", color: "var(--color-muted)" }}>
              <span>PAYLOAD_INSPECTOR</span>
              <span>STATE: {isPlaying ? "ACTIVE_EXECUTION" : "PAUSED"}</span>
            </div>
            <div style={{ color: "var(--color-text)", lineHeight: 1.4 }}>
              {activeChapter === 0 && (
                <code>
                  [INBOUND_HTTP_POST] channel=&quot;meta_lead_ads&quot; lead_name=&quot;Sarah Jenkins&quot; budget=&quot;$15,000&quot; status=&quot;VALIDATED&quot;
                </code>
              )}
              {activeChapter === 1 && (
                <code>
                  [AI_RUBRIC_EVALUATION] prompt_tier=&quot;deterministic&quot; intent_score=85 routing=&quot;HIGH_PRIORITY_REVIEW&quot; governance=&quot;AIRGAPPED&quot; pii_sanitized=true
                </code>
              )}
              {activeChapter === 2 && (
                <code>
                  [APPROVAL_GATE_HELD] action_type=&quot;external_dispatch&quot; requires_human=true operator_review_drawer=&quot;OPEN&quot;
                </code>
              )}
              {activeChapter === 3 && (
                <code>
                  [OMNICHANNEL_DISPATCH] whatsapp_status=&quot;SENT_200_OK&quot; crm_hubspot_stage=&quot;QUALIFIED_OPPORTUNITY&quot;
                </code>
              )}
              {activeChapter === 4 && (
                <code>
                  [IMMUTABLE_LOG_COMMITTED] event_id=&quot;evt_lead_085&quot; sha256=&quot;e3b0c44298fc1c14...&quot; latency=482ms
                </code>
              )}
            </div>
          </div>
        </div>

        {/* Video Overlay Control Bar */}
        <div
          style={{
            position: "absolute",
            bottom: "var(--space-3)",
            display: "flex",
            alignItems: "center",
            gap: "var(--space-3)",
            background: "rgba(0, 0, 0, 0.75)",
            backdropFilter: "blur(8px)",
            padding: "var(--space-2) var(--space-4)",
            borderRadius: "var(--radius-full)",
            color: "#ffffff",
          }}
        >
          <button
            type="button"
            className="icon-btn"
            style={{ color: "#ffffff", padding: "4px" }}
            aria-label={isPlaying ? "Pause walkthrough" : "Play walkthrough"}
            onClick={() => setIsPlaying(!isPlaying)}
          >
            {isPlaying ? <Pause size={16} aria-hidden="true" /> : <Play size={16} aria-hidden="true" />}
          </button>

          <button
            type="button"
            className="icon-btn"
            style={{ color: "#ffffff", padding: "4px" }}
            aria-label="Restart walkthrough"
            onClick={() => setActiveChapter(0)}
          >
            <RotateCcw size={14} aria-hidden="true" />
          </button>

          <span style={{ fontSize: "var(--text-12)", fontFamily: "var(--font-mono)" }}>
            {chapters[activeChapter].time}
          </span>

          <button
            type="button"
            className="icon-btn"
            style={{ color: "#ffffff", padding: "4px" }}
            aria-label={isMuted ? "Unmute audio" : "Mute audio"}
            onClick={() => setIsMuted(!isMuted)}
          >
            {isMuted ? <VolumeX size={14} aria-hidden="true" /> : <Volume2 size={14} aria-hidden="true" />}
          </button>
        </div>
      </div>

      {/* Chapters Scrubber Strip */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
          borderTop: "1px solid var(--color-border)",
          background: "var(--color-surface-2)",
        }}
      >
        {chapters.map((ch, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => setActiveChapter(idx)}
            style={{
              padding: "var(--space-3) var(--space-3)",
              background: activeChapter === idx ? "var(--color-surface)" : "transparent",
              border: "none",
              borderRight: idx < chapters.length - 1 ? "1px solid var(--color-border)" : "none",
              borderBottom: activeChapter === idx ? "2px solid var(--color-accent)" : "none",
              cursor: "pointer",
              textAlign: "left",
              display: "flex",
              flexDirection: "column",
              gap: "2px",
              transition: "background 140ms var(--ease)",
            }}
          >
            <span style={{ fontSize: "10px", fontFamily: "var(--font-mono)", color: "var(--color-muted)" }}>
              {ch.time}
            </span>
            <span
              style={{
                fontSize: "var(--text-12)",
                fontWeight: activeChapter === idx ? 700 : 500,
                color: activeChapter === idx ? "var(--color-accent)" : "var(--color-text)",
              }}
            >
              {ch.title}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
