"use client";

import { useState } from "react";
import { ShieldCheck, Check, X, Lock, Send, Clock, Zap, MessageSquare, AlertCircle, Building2, UserCheck, Shield } from "lucide-react";

interface Props {
  isEn?: boolean;
}

interface Scenario {
  id: string;
  tabLabel: string;
  leadCode: string;
  ingestedTime: string;
  channel: string;
  leadName: string;
  company: string;
  dealSize: string;
  intentScore: number;
  tierBadge: string;
  draftTextEn: string;
  draftTextId: string;
  tone: string;
  auditHash: string;
}

export function OperatorConsoleMockup({ isEn = true }: Props) {
  const [approved, setApproved] = useState(false);
  const [activeScenarioIdx, setActiveScenarioIdx] = useState(0);

  const scenarios: Scenario[] = [
    {
      id: "logistics",
      tabLabel: isEn ? "01 // LOGISTICS FLEET" : "01 // ARMADA LOGISTIK",
      leadCode: "QUEUE ITEM #1402",
      ingestedTime: isEn ? "Ingested 18s ago" : "Diterima 18 dtk lalu",
      channel: "Meta Lead Ads (Verified Webhook)",
      leadName: "Bambang Soedirjo",
      company: "PT Nusantara Logistik",
      dealSize: "Rp 180.000.000 (Fleet 50+ Units)",
      intentScore: 94,
      tierBadge: "HIGH-TICKET TIER",
      draftTextEn:
        '"Good morning Mr. Bambang, thank you for contacting our sales engineering team regarding fleet telemetry automation for 50+ units. Based on your dispatch scope, our architecture team has prepared a custom preliminary dossier. Would tomorrow at 2:00 PM WIB suit you for a 15-minute alignment?"',
      draftTextId:
        '"Selamat pagi Pak Bambang, terima kasih telah menghubungi tim sales engineering kami terkait otomasi telemetri armada 50+ unit. Berdasarkan cakupan operasional Anda, tim arsitektur kami telah menyiapkan dokumen rancangan awal. Apakah besok jam 14.00 WIB waktu yang tepat untuk sinkronisasi singkat 15 menit?"',
      tone: "Executive Formal",
      auditHash: "sha256:4a8c901...3f18",
    },
    {
      id: "fintech",
      tabLabel: isEn ? "02 // CROSS-BORDER FINTECH" : "02 // FINTECH CROSS-BORDER",
      leadCode: "QUEUE ITEM #1403",
      ingestedTime: isEn ? "Ingested 34s ago" : "Diterima 34 dtk lalu",
      channel: "HubSpot High-Intent Webhook",
      leadName: "Julian Chen",
      company: "Apex Global Payments Pte Ltd",
      dealSize: "$24,000 / Mo. Cross-Border Volume",
      intentScore: 98,
      tierBadge: "ENTERPRISE CORE",
      draftTextEn:
        '"Dear Julian, our enterprise architecture unit has received your inquiry regarding SOC-2 compliant cross-border reconciliation pipelines. We have benchmarked a dedicated airgapped topology for multi-currency settlement. Would Thursday at 10:30 AM SGT work for a technical walkthrough?"',
      draftTextId:
        '"Yth. Julian, tim arsitektur enterprise kami telah menerima permintaan Anda terkait pipeline rekonsiliasi lintas-negara standar SOC-2. Kami telah memvalidasi topologi terisolasi untuk penyelesaian multi-mata uang. Apakah hari Kamis pukul 10:30 SGT waktu yang sesuai untuk walkthrough teknis?"',
      tone: "Institutional C-Level",
      auditHash: "sha256:8b1e442...9c04",
    },
    {
      id: "hospitality",
      tabLabel: isEn ? "03 // LUXURY RESORT" : "03 // HOSPITALITY RESORT",
      leadCode: "QUEUE ITEM #1404",
      ingestedTime: isEn ? "Ingested 52s ago" : "Diterima 52 dtk lalu",
      channel: "Typeform VIP Corporate Intake",
      leadName: "Elena Rostova",
      company: "Samadhi Luxury Bali Estates",
      dealSize: "Rp 320.000.000 (Annual Retainer)",
      intentScore: 92,
      tierBadge: "VIP ACCOUNT",
      draftTextEn:
        '"Hello Elena, thank you for reaching out regarding our multi-property VIP guest concierge automation. We have prepared an architecture brief covering PMS integration and instant WhatsApp Cloud dispatch. Would Friday at 3:00 PM WITA work for a short executive briefing?"',
      draftTextId:
        '"Halo Ibu Elena, terima kasih telah menghubungi kami terkait otomasi concierge VIP untuk portofolio multi-properti. Kami telah menyiapkan brief arsitektur integrasi sistem PMS dan kanal WhatsApp Cloud resmi. Apakah hari Jumat jam 15.00 WITA sesuai untuk sesi briefing singkat?"',
      tone: "Luxury Hospitality",
      auditHash: "sha256:d29a107...fe55",
    },
  ];

  const current = scenarios[activeScenarioIdx];

  function handleSwitchScenario(idx: number) {
    setActiveScenarioIdx(idx);
    setApproved(false);
  }

  return (
    <div
      style={{
        background: "#0c0d12",
        border: "1px solid rgba(255, 255, 255, 0.12)",
        borderRadius: "20px",
        overflow: "hidden",
        boxShadow: "0 30px 80px -20px rgba(0, 0, 0, 0.9), 0 0 0 1px rgba(255, 255, 255, 0.06) inset",
        color: "#f4efe6",
        fontFamily: "var(--font-sans)",
      }}
    >
      {/* Console Window Header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "12px 18px",
          background: "rgba(255, 255, 255, 0.03)",
          borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <span style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#ff5f56", display: "inline-block" }}></span>
          <span style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#ffbd2e", display: "inline-block" }}></span>
          <span style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#27c93f", display: "inline-block" }}></span>
          <span className="font-mono" style={{ fontSize: "11px", color: "#8a857b", marginLeft: "10px", letterSpacing: "0.08em" }}>
            ATLAS GATEKEEPER // AIRGAPPED TENANT CONSOLE
          </span>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
          <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#10b981", animation: "pulse 2s infinite" }}></span>
          <span className="font-mono text-12" style={{ color: "#10b981", fontSize: "11px", fontWeight: 700, letterSpacing: "0.06em" }}>
            ZERO-LEAK ENCLAVE
          </span>
        </div>
      </div>

      {/* Scenario Selector Tabs */}
      <div
        style={{
          display: "flex",
          borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
          background: "rgba(0, 0, 0, 0.4)",
          overflowX: "auto",
        }}
      >
        {scenarios.map((sc, idx) => (
          <button
            key={sc.id}
            type="button"
            onClick={() => handleSwitchScenario(idx)}
            className="font-mono"
            style={{
              padding: "10px 16px",
              fontSize: "11px",
              fontWeight: 700,
              letterSpacing: "0.06em",
              color: activeScenarioIdx === idx ? "var(--color-accent)" : "#8a857b",
              background: activeScenarioIdx === idx ? "rgba(255, 255, 255, 0.04)" : "transparent",
              border: "none",
              borderBottom: activeScenarioIdx === idx ? "2px solid var(--color-accent)" : "2px solid transparent",
              cursor: "pointer",
              whiteSpace: "nowrap",
              transition: "all 150ms ease",
            }}
          >
            {sc.tabLabel}
          </button>
        ))}
      </div>

      {/* Console Body */}
      <div style={{ padding: "20px 22px", display: "grid", gap: "16px" }}>
        {/* Lead Intake & Confidence Score Bar */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "12px",
            background: "rgba(255, 255, 255, 0.04)",
            border: "1px solid rgba(255, 255, 255, 0.08)",
            borderRadius: "12px",
            padding: "14px 16px",
          }}
        >
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <span className="font-mono text-12" style={{ color: "var(--color-accent)", fontWeight: 700 }}>
                {current.leadCode}
              </span>
              <span style={{ fontSize: "11px", color: "#8a857b" }} className="font-mono">
                · {current.ingestedTime} via {current.channel}
              </span>
            </div>
            <div className="font-display" style={{ fontSize: "17px", fontWeight: 800, marginTop: "4px" }}>
              {current.leadName} · <span style={{ color: "#c5c0b6" }}>{current.company}</span>
            </div>
            <div className="font-mono" style={{ fontSize: "11px", color: "#8a857b", marginTop: "2px" }}>
              Deal Scope: <span style={{ color: "#f4efe6", fontWeight: 600 }}>{current.dealSize}</span>
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div style={{ textAlign: "right" }}>
              <span className="font-mono" style={{ fontSize: "10px", color: "#8a857b", textTransform: "uppercase" }}>
                Intent Rubric
              </span>
              <div className="font-display" style={{ fontSize: "20px", fontWeight: 900, color: "#10b981" }}>
                {current.intentScore} / 100
              </div>
            </div>
            <span
              className="badge"
              style={{
                background: "rgba(16, 185, 129, 0.15)",
                color: "#34d399",
                border: "1px solid rgba(16, 185, 129, 0.3)",
                fontSize: "11px",
                fontWeight: 700,
                letterSpacing: "0.04em",
              }}
            >
              {current.tierBadge}
            </span>
          </div>
        </div>

        {/* Governed Response Draft */}
        <div
          style={{
            background: "rgba(0, 0, 0, 0.5)",
            border: "1px solid rgba(255, 255, 255, 0.08)",
            borderRadius: "14px",
            padding: "16px 18px",
            display: "grid",
            gap: "10px",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "8px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "12px", color: "var(--color-accent)", fontWeight: 700 }}>
              <MessageSquare size={13} />
              <span className="font-mono">WHATSAPP OFFICIAL HSM // MANDATORY HUMAN SIGN-OFF</span>
            </div>
            <span className="font-mono" style={{ fontSize: "11px", color: "#10b981" }}>
              AIRGAPPED PRIVATE VAULT
            </span>
          </div>

          <p style={{ fontSize: "14px", lineHeight: 1.6, color: "#e5e0d8", margin: 0, fontStyle: "normal" }}>
            {isEn ? current.draftTextEn : current.draftTextId}
          </p>

          <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", paddingTop: "4px" }}>
            <span className="font-mono" style={{ fontSize: "10px", padding: "2px 8px", borderRadius: "4px", background: "rgba(255, 255, 255, 0.06)", color: "#8a857b" }}>
              Tone: {current.tone}
            </span>
            <span className="font-mono" style={{ fontSize: "10px", padding: "2px 8px", borderRadius: "4px", background: "rgba(16, 185, 129, 0.1)", color: "#34d399" }}>
              Hallucination Guardrail: 100% PASSED
            </span>
            <span className="font-mono" style={{ fontSize: "10px", padding: "2px 8px", borderRadius: "4px", background: "rgba(255, 255, 255, 0.06)", color: "#8a857b" }}>
              CRM Sync: Stage Staged
            </span>
            <span className="font-mono" style={{ fontSize: "10px", padding: "2px 8px", borderRadius: "4px", background: "rgba(255, 255, 255, 0.06)", color: "#8a857b" }}>
              Zero Public AI Training
            </span>
          </div>
        </div>

        {/* Human Gatekeeper Action Buttons */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "12px",
            borderTop: "1px solid rgba(255, 255, 255, 0.08)",
            paddingTop: "14px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <span className="font-mono" style={{ fontSize: "11px", color: "#8a857b" }}>
              {isEn ? "Operator Action:" : "Tindakan Operator:"}
            </span>
            <span
              style={{
                fontSize: "11px",
                fontWeight: 700,
                color: approved ? "#10b981" : "var(--color-accent)",
              }}
              className="font-mono"
            >
              {approved
                ? (isEn ? "COMMITTED & DISPATCHED" : "TEROTORISASI & TERKIRIM")
                : (isEn ? "AWAITING HUMAN SIGN-OFF" : "MENUNGGU PERSETUJUAN TIM")}
            </span>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            {approved && (
              <button
                type="button"
                onClick={() => setApproved(false)}
                className="btn btn-sm"
                style={{
                  background: "rgba(255, 255, 255, 0.06)",
                  color: "#8a857b",
                  border: "1px solid rgba(255, 255, 255, 0.12)",
                  borderRadius: "9999px",
                  fontSize: "11px",
                  fontWeight: 600,
                  cursor: "pointer",
                }}
              >
                {isEn ? "Reset State" : "Reset Simulasi"}
              </button>
            )}

            <button
              type="button"
              onClick={() => setApproved(!approved)}
              className="btn btn-sm"
              style={{
                background: approved ? "#10b981" : "var(--color-accent)",
                color: approved ? "#09090b" : "#ffffff",
                border: "none",
                borderRadius: "9999px",
                padding: "8px 20px",
                fontWeight: 750,
                fontSize: "13px",
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                cursor: "pointer",
                transition: "all 180ms ease",
                boxShadow: approved ? "0 0 20px rgba(16, 185, 129, 0.4)" : "0 0 20px rgba(245, 158, 11, 0.3)",
              }}
            >
              {approved ? (
                <>
                  <Check size={15} />
                  <span>{isEn ? "Dispatched to WhatsApp Cloud API" : "Terkirim ke WhatsApp Cloud API"}</span>
                </>
              ) : (
                <>
                  <ShieldCheck size={15} />
                  <span>{isEn ? "Approve & Dispatch (1-Click)" : "Setujui & Kirim Pesan Resmi"}</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Cryptographic Proof Footer */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "10px 20px",
          background: "rgba(0, 0, 0, 0.6)",
          borderTop: "1px solid rgba(255, 255, 255, 0.06)",
          fontSize: "11px",
          color: "#8a857b",
        }}
        className="font-mono"
      >
        <span>AUDIT SIGNATURE: {current.auditHash}</span>
        <span>GATEWAY SLA: &lt; 45 SECONDS COMPLIANCE</span>
      </div>
    </div>
  );
}
