"use client";

import { useEffect, useState } from "react";
import {
  Play,
  Pause,
  RotateCcw,
  Volume2,
  VolumeX,
  CheckCircle2,
  ShieldCheck,
  Clock,
  Sparkles,
  Layers,
  FileText,
  Activity,
  Send,
  Cpu,
  Smartphone,
  CheckCheck,
  Lock,
  ArrowRight,
  Database,
  FastForward,
} from "lucide-react";
import type { Locale } from "@/lib/i18n/locales";

interface Props {
  locale?: Locale;
}

export function VideoWalkthrough({ locale = "en" }: Props) {
  const isEn = locale !== "id";
  const [isPlaying, setIsPlaying] = useState(true);
  const [playbackSpeed, setPlaybackSpeed] = useState<1 | 1.5 | 2>(1);
  const [isMuted, setIsMuted] = useState(true);
  const [elapsed, setElapsed] = useState(0);
  const TOTAL = 80;
  const starts = [0, 16, 32, 50, 66];
  const activeChapter = starts.reduce((acc, s, i) => (elapsed >= s ? i : acc), 0);
  const setActiveChapter = (i: number) => setElapsed(starts[i]);
  const fmt = (s: number) => `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;

  useEffect(() => {
    if (!isPlaying) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const intervalMs = Math.round(1000 / playbackSpeed);
    const id = window.setInterval(() => {
      setElapsed((e) => (e + 1 >= TOTAL ? 0 : e + 1));
    }, intervalMs);
    return () => window.clearInterval(id);
  }, [isPlaying, playbackSpeed]);

  const chapters = [
    {
      time: "00:00",
      step: 1,
      title: isEn ? "Intake & Schema Gateway" : "Intake & Gerbang Skema",
      desc: isEn
        ? "Inbound lead payload captured from Meta Ads webhook and sanitized through strict schema gateways in 142ms."
        : "Payload prospek dari webhook iklan Meta disanitasi melalui gerbang skema ketat dalam 142ms.",
      badge: isEn ? "Gateway Validated" : "Skema Terverifikasi",
    },
    {
      time: "00:16",
      step: 2,
      title: isEn ? "AI Rubric Fit Evaluation" : "Evaluasi Kriteria AI",
      desc: isEn
        ? "Deterministic scoring algorithm evaluates budget, urgency, and company size against business rules."
        : "Algoritma skoring terarah mengevaluasi anggaran, urgensi, dan profil perusahaan sesuai aturan bisnis.",
      badge: isEn ? "Fit Score: 85/100" : "Skor Kelayakan: 85/100",
    },
    {
      time: "00:32",
      step: 3,
      title: isEn ? "Human Review Drawer Gate" : "Gerbang Persetujuan Tim",
      desc: isEn
        ? "Outbound execution halts at the operator approval gate. Authorized team reviews AI-drafted reply before dispatch."
        : "Eksekusi keluar berhenti di gerbang persetujuan. Tim memeriksa draf pesan AI sebelum diteruskan ke klien.",
      badge: isEn ? "Awaiting Operator Sign-off" : "Menunggu Izin Operator",
    },
    {
      time: "00:50",
      step: 4,
      title: isEn ? "Omnichannel Live Dispatch" : "Eksekusi Multi-Kanal",
      desc: isEn
        ? "Approved response sent via official WhatsApp Cloud API and pipeline stage updated synchronously in HubSpot CRM."
        : "Pesan yang disetujui terkirim melalui WhatsApp Cloud API resmi dan status diperbarui langsung di HubSpot CRM.",
      badge: isEn ? "WhatsApp & CRM Synced" : "WhatsApp & CRM Tersinkron",
    },
    {
      time: "00:66",
      step: 5,
      title: isEn ? "Immutable Event Ledger" : "Catatan Jejak Audit",
      desc: isEn
        ? "Cryptographic SHA-256 audit record stored permanently for regulatory compliance, latency, and cost accounting."
        : "Catatan audit kriptografis SHA-256 disimpan permanen untuk kepatuhan hukum, latensi, dan transparansi biaya.",
      badge: isEn ? "SHA-256 Committed" : "Audit Hash Terverifikasi",
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
      {/* Video Player Top Chrome */}
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
            <span style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#ef4444", display: "inline-block" }} />
            <span style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#f59e0b", display: "inline-block" }} />
            <span style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#10b981", display: "inline-block" }} />
          </div>

          <span style={{ fontSize: "var(--text-13)", fontWeight: 700, letterSpacing: "-0.01em" }}>
            {isEn ? "Atlas Automated Workflow Engine Walkthrough" : "Tur Demonstrasi Mesin Alur Kerja Otomatis Atlas"}
          </span>

          <span
            className="font-mono"
            style={{
              fontSize: "10px",
              padding: "2px 8px",
              borderRadius: "9999px",
              background: "color-mix(in srgb, var(--color-success) 15%, transparent)",
              color: "var(--color-success)",
              border: "1px solid color-mix(in srgb, var(--color-success) 30%, transparent)",
              display: "inline-flex",
              alignItems: "center",
              gap: "4px",
            }}
          >
            <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "var(--color-success)" }} />
            REC ● LIVE RUN
          </span>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "var(--space-2)" }}>
          <button
            type="button"
            className="icon-btn"
            style={{ fontSize: "11px", padding: "2px 8px", minHeight: "26px", borderRadius: "9999px" }}
            onClick={() => setPlaybackSpeed(playbackSpeed === 1 ? 1.5 : playbackSpeed === 1.5 ? 2 : 1)}
            title="Toggle playback speed"
          >
            {playbackSpeed}x
          </button>
          <span className="badge badge-accent" style={{ fontSize: "11px" }}>
            {isEn ? "Automated Live Simulation" : "Simulasi Otomatis Berjalan"}
          </span>
          <span className="badge" style={{ fontSize: "11px", fontFamily: "var(--font-mono)" }}>
            {fmt(elapsed)} / {fmt(TOTAL)}
          </span>
        </div>
      </div>

      {/* Real-time Video Canvas Screen */}
      <div
        style={{
          padding: "clamp(24px, 4vw, 40px) var(--space-5)",
          background: "radial-gradient(ellipse at center, var(--color-surface-2), var(--color-bg))",
          minHeight: "380px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          position: "relative",
        }}
      >
        {/* Dynamic Interactive Stage Card */}
        <div
          style={{
            maxWidth: "760px",
            width: "100%",
            background: "var(--color-surface)",
            border: "1px solid var(--color-border-strong)",
            borderRadius: "var(--radius-md)",
            padding: "var(--space-5)",
            boxShadow: "var(--shadow-raised)",
            display: "grid",
            gap: "var(--space-4)",
            position: "relative",
            zIndex: 1,
          }}
        >
          {/* Header row with step info & status */}
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", gap: "var(--space-2)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "var(--space-2)" }}>
              <span className="sprint-day-num" style={{ minWidth: "80px", textAlign: "center" }}>
                {isEn ? `Phase 0${chapters[activeChapter].step}` : `Tahap 0${chapters[activeChapter].step}`}
              </span>
              <div>
                <span style={{ fontWeight: 800, fontSize: "var(--text-16)", display: "block" }}>
                  {chapters[activeChapter].title}
                </span>
                <span className="muted" style={{ fontSize: "12px" }}>
                  {isEn ? "Autonomous Pipeline Execution" : "Eksekusi Alur Kerja Terpandu"}
                </span>
              </div>
            </div>
            <span className="badge badge-accent" style={{ fontWeight: 700 }}>
              {chapters[activeChapter].badge}
            </span>
          </div>

          <p className="muted" style={{ fontSize: "var(--text-14)", lineHeight: 1.6, margin: 0 }}>
            {chapters[activeChapter].desc}
          </p>

          {/* Interactive Dynamic Display based on active chapter */}
          <div
            style={{
              background: "var(--color-surface-2)",
              border: "1px solid var(--color-border)",
              borderRadius: "var(--radius-sm)",
              padding: "var(--space-4)",
              fontFamily: "var(--font-mono)",
              fontSize: "var(--text-12)",
              display: "grid",
              gap: "var(--space-3)",
            }}
          >
            {/* Phase 01: Intake Webhook Payload */}
            {activeChapter === 0 && (
              <div style={{ display: "grid", gap: "var(--space-2)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", color: "var(--color-success)", fontWeight: 700 }}>
                  <span>HTTP POST 200 OK · INBOUND_HOOK</span>
                  <span>LATENCY: 142ms</span>
                </div>
                <div style={{ background: "var(--color-surface)", padding: "var(--space-3)", borderRadius: "4px", border: "1px solid var(--color-border)", color: "var(--color-text)", lineHeight: 1.5 }}>
                  <div>&#123;</div>
                  <div style={{ paddingLeft: "16px" }}>&quot;event&quot;: &quot;meta_lead_ads_inbound&quot;,</div>
                  <div style={{ paddingLeft: "16px" }}>&quot;lead_name&quot;: &quot;Sarah Jenkins (Director of Ops)&quot;,</div>
                  <div style={{ paddingLeft: "16px" }}>&quot;company&quot;: &quot;Apex Logistics Group&quot;,</div>
                  <div style={{ paddingLeft: "16px" }}>&quot;monthly_budget&quot;: &quot;$25,000+&quot;,</div>
                  <div style={{ paddingLeft: "16px" }}>&quot;schema_check&quot;: &quot;PASSED (0 injection vectors detected)&quot;</div>
                  <div>&#125;</div>
                </div>
              </div>
            )}

            {/* Phase 02: AI Rubric Scoring */}
            {activeChapter === 1 && (
              <div style={{ display: "grid", gap: "var(--space-2)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", color: "var(--color-accent)", fontWeight: 700 }}>
                  <span>RUBRIC_FIT_EVALUATOR · DETERMINISTIC AI</span>
                  <span>SCORE: 85/100 (HIGH PRIORITY)</span>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "var(--space-2)" }}>
                  <div style={{ background: "var(--color-surface)", padding: "8px 12px", borderRadius: "4px", border: "1px solid var(--color-border)" }}>
                    <div className="muted" style={{ fontSize: "11px" }}>BUDGET FIT</div>
                    <div style={{ fontWeight: 700, color: "var(--color-success)" }}>100% · $25k+ Validated</div>
                  </div>
                  <div style={{ background: "var(--color-surface)", padding: "8px 12px", borderRadius: "4px", border: "1px solid var(--color-border)" }}>
                    <div className="muted" style={{ fontSize: "11px" }}>URGENCY LEVEL</div>
                    <div style={{ fontWeight: 700, color: "var(--color-success)" }}>IMMEDIATE (&lt;5 Days)</div>
                  </div>
                  <div style={{ background: "var(--color-surface)", padding: "8px 12px", borderRadius: "4px", border: "1px solid var(--color-border)" }}>
                    <div className="muted" style={{ fontSize: "11px" }}>ROUTING DESTINATION</div>
                    <div style={{ fontWeight: 700, color: "var(--color-accent)" }}>Executive Review Queue</div>
                  </div>
                </div>
              </div>
            )}

            {/* Phase 03: Human Review Drawer Gate */}
            {activeChapter === 2 && (
              <div style={{ display: "grid", gap: "var(--space-2)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", color: "var(--color-warning)", fontWeight: 700 }}>
                  <span>APPROVAL_GATE_HELD · ACTION PAUSED</span>
                  <span>GATEKEEPER: OPERATOR REQUIRED</span>
                </div>
                <div style={{ background: "var(--color-surface)", padding: "var(--space-3)", borderRadius: "4px", border: "1px solid var(--color-warning)" }}>
                  <div style={{ fontSize: "11px", color: "var(--color-warning)", fontWeight: 700, marginBottom: "4px" }}>
                    PROPOSED OUTBOUND WHATSAPP DRAFT:
                  </div>
                  <div style={{ color: "var(--color-text)", fontStyle: "italic", lineHeight: 1.4, marginBottom: "8px" }}>
                    &quot;Hi Sarah, thanks for inquiring about Atlas automation for Apex Logistics. We’ve matched your workflow to Blueprint #014. Shall we schedule your 30-min architecture review tomorrow at 2 PM?&quot;
                  </div>
                  <div style={{ display: "flex", gap: "8px" }}>
                    <span className="badge badge-accent" style={{ background: "var(--color-success)", color: "#fff", cursor: "pointer" }}>
                      Approve & Dispatch
                    </span>
                    <span className="badge" style={{ cursor: "pointer" }}>
                      Edit Draft
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* Phase 04: Omnichannel Live Dispatch */}
            {activeChapter === 3 && (
              <div style={{ display: "grid", gap: "var(--space-2)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", color: "var(--color-success)", fontWeight: 700 }}>
                  <span>DISPATCH_SUCCESS · 2-WAY SYNC</span>
                  <span>WHATSAPP CLOUD API 200 OK</span>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "var(--space-2)" }}>
                  <div style={{ background: "var(--color-surface)", padding: "10px", borderRadius: "4px", border: "1px solid var(--color-border)" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "4px", color: "#22c55e", fontWeight: 700, fontSize: "11px", marginBottom: "4px" }}>
                      <Smartphone size={12} /> WHATSAPP OUTBOUND
                    </div>
                    <div style={{ color: "var(--color-text)", fontSize: "11px" }}>Delivered & Read in 1.4s</div>
                    <div style={{ color: "#3b82f6", display: "flex", alignItems: "center", gap: "4px", fontSize: "10px", marginTop: "4px" }}>
                      <CheckCheck size={12} /> Read receipt confirmed
                    </div>
                  </div>
                  <div style={{ background: "var(--color-surface)", padding: "10px", borderRadius: "4px", border: "1px solid var(--color-border)" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "4px", color: "#f97316", fontWeight: 700, fontSize: "11px", marginBottom: "4px" }}>
                      <Database size={12} /> HUBSPOT CRM SYNC
                    </div>
                    <div style={{ color: "var(--color-text)", fontSize: "11px" }}>Stage: Qualified Deal</div>
                    <div style={{ color: "var(--color-success)", fontSize: "10px", marginTop: "4px" }}>
                      Owner: Enterprise Sales Team
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Phase 05: Immutable Event Ledger */}
            {activeChapter === 4 && (
              <div style={{ display: "grid", gap: "var(--space-2)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", color: "var(--color-accent)", fontWeight: 700 }}>
                  <span>AUDIT_LEDGER_COMMITTED · ZERO LEAKS</span>
                  <span>TAMPER_PROOF_HASH</span>
                </div>
                <div style={{ background: "var(--color-surface)", padding: "var(--space-3)", borderRadius: "4px", border: "1px solid var(--color-border)", color: "var(--color-text)" }}>
                  <div>[BLOCK_ID] #run_00854_lead_triage</div>
                  <div>[HASH] e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855</div>
                  <div>[SIGN_OFF] Operator @vincentius (ID: auth_usr_981)</div>
                  <div style={{ color: "var(--color-success)", marginTop: "4px" }}>
                    STATUS: 100% REGULATORY AUDIT COMPLIANT · SOC2 READY
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Video Timeline Progress Scrubber Bar */}
        <div
          style={{
            position: "absolute",
            bottom: "0",
            left: "0",
            right: "0",
            height: "4px",
            background: "var(--color-border)",
            cursor: "pointer",
          }}
          onClick={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            const clickX = e.clientX - rect.left;
            const pct = Math.max(0, Math.min(1, clickX / rect.width));
            setElapsed(Math.round(pct * TOTAL));
          }}
        >
          <div
            style={{
              height: "100%",
              width: `${(elapsed / TOTAL) * 100}%`,
              background: "var(--color-accent)",
              transition: "width 200ms linear",
            }}
          />
        </div>

        {/* Overlay Floating Controls */}
        <div
          style={{
            position: "absolute",
            bottom: "var(--space-3)",
            display: "flex",
            alignItems: "center",
            gap: "var(--space-3)",
            background: "rgba(0, 0, 0, 0.8)",
            backdropFilter: "blur(12px)",
            padding: "6px 16px",
            borderRadius: "var(--radius-full)",
            color: "#ffffff",
            zIndex: 2,
            boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
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
            onClick={() => setElapsed(0)}
          >
            <RotateCcw size={14} aria-hidden="true" />
          </button>

          <span style={{ fontSize: "var(--text-12)", fontFamily: "var(--font-mono)" }}>
            {fmt(elapsed)}
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
          gridTemplateColumns: "repeat(auto-fit, minmax(135px, 1fr))",
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
            <span style={{ fontSize: "10px", fontFamily: "var(--font-mono)", color: activeChapter === idx ? "var(--color-accent)" : "var(--color-muted)" }}>
              {ch.time} · {isEn ? `Phase 0${ch.step}` : `Tahap 0${ch.step}`}
            </span>
            <span
              style={{
                fontSize: "var(--text-12)",
                fontWeight: activeChapter === idx ? 750 : 500,
                color: activeChapter === idx ? "var(--color-accent)" : "var(--color-text)",
                lineHeight: 1.3,
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
