"use client";

import { useState } from "react";
import { ShieldCheck, Check, X, Lock, Send, Clock, Zap, MessageSquare, AlertCircle } from "lucide-react";

interface Props {
  isEn?: boolean;
}

export function OperatorConsoleMockup({ isEn = true }: Props) {
  const [approved, setApproved] = useState(false);

  return (
    <div
      style={{
        background: "#0c0d10",
        border: "1px solid rgba(255, 255, 255, 0.12)",
        borderRadius: "20px",
        overflow: "hidden",
        boxShadow: "0 30px 70px -20px rgba(0, 0, 0, 0.8), 0 0 0 1px rgba(255, 255, 255, 0.05) inset",
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
          <span className="font-mono text-12" style={{ color: "#10b981", fontSize: "11px", fontWeight: 700 }}>
            ZERO-LEAK ENCLAVE
          </span>
        </div>
      </div>

      {/* Console Body */}
      <div style={{ padding: "20px 24px", display: "grid", gap: "18px" }}>
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
            padding: "12px 16px",
          }}
        >
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <span className="font-mono text-12" style={{ color: "var(--color-accent)", fontWeight: 700 }}>
                QUEUE ITEM #1402
              </span>
              <span style={{ fontSize: "11px", color: "#8a857b" }} className="font-mono">
                · Ingested 18s ago via Meta Lead Ads
              </span>
            </div>
            <div className="font-display" style={{ fontSize: "17px", fontWeight: 800, marginTop: "2px" }}>
              Bambang Soedirjo · PT Nusantara Logistik
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div style={{ textAlign: "right" }}>
              <span className="font-mono" style={{ fontSize: "10px", color: "#8a857b", textTransform: "uppercase" }}>
                Intent Rubric
              </span>
              <div className="font-display" style={{ fontSize: "18px", fontWeight: 900, color: "#10b981" }}>
                94 / 100
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
              }}
            >
              HIGH-TICKET DEAL
            </span>
          </div>
        </div>

        {/* Synthesized Response Draft */}
        <div
          style={{
            background: "rgba(0, 0, 0, 0.4)",
            border: "1px solid rgba(255, 255, 255, 0.08)",
            borderRadius: "14px",
            padding: "16px 18px",
            display: "grid",
            gap: "10px",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "12px", color: "var(--color-accent)", fontWeight: 700 }}>
              <MessageSquare size={13} />
              <span className="font-mono">WHATSAPP OFFICIAL DRAFT // HUMAN SIGN-OFF REQUIRED</span>
            </div>
            <span className="font-mono" style={{ fontSize: "11px", color: "#8a857b" }}>
              42 tokens · $0.0004
            </span>
          </div>

          <p style={{ fontSize: "14px", lineHeight: 1.6, color: "#e5e0d8", margin: 0, fontStyle: "normal" }}>
            {isEn
              ? '"Selamat pagi Pak Bambang, terima kasih telah menghubungi tim sales kami terkait implementasi sistem armada 50+ unit. Berdasarkan kebutuhan Anda, tim kami telah menyiapkan proposal kustom. Apakah besok jam 14.00 WIB waktu yang tepat untuk sesi konsultasi 15 menit?"'
              : '"Selamat pagi Pak Bambang, terima kasih telah menghubungi tim sales kami terkait implementasi sistem armada 50+ unit. Berdasarkan kebutuhan Anda, tim kami telah menyiapkan proposal kustom. Apakah besok jam 14.00 WIB waktu yang tepat untuk sesi konsultasi 15 menit?"'}
          </p>

          <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", paddingTop: "4px" }}>
            <span className="font-mono" style={{ fontSize: "10px", padding: "2px 6px", borderRadius: "4px", background: "rgba(255, 255, 255, 0.06)", color: "#8a857b" }}>
              Tone: Executive Formal
            </span>
            <span className="font-mono" style={{ fontSize: "10px", padding: "2px 6px", borderRadius: "4px", background: "rgba(16, 185, 129, 0.1)", color: "#34d399" }}>
              Hallucination Check: PASSED
            </span>
            <span className="font-mono" style={{ fontSize: "10px", padding: "2px 6px", borderRadius: "4px", background: "rgba(255, 255, 255, 0.06)", color: "#8a857b" }}>
              CRM Sync: HubSpot Pending
            </span>
          </div>
        </div>

        {/* Human Gatekeeper Action Buttons */}
        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "12px", borderTop: "1px solid rgba(255, 255, 255, 0.08)", paddingTop: "14px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <button
              type="button"
              className="btn btn-sm"
              style={{
                background: "rgba(255, 255, 255, 0.06)",
                color: "#e5e0d8",
                border: "1px solid rgba(255, 255, 255, 0.12)",
                borderRadius: "9999px",
                fontSize: "12px",
                fontWeight: 600,
              }}
            >
              {isEn ? "Edit Draft" : "Edit Draf"}
            </button>
            <button
              type="button"
              className="btn btn-sm"
              style={{
                background: "transparent",
                color: "#ef4444",
                border: "1px solid rgba(239, 68, 68, 0.3)",
                borderRadius: "9999px",
                fontSize: "12px",
                fontWeight: 600,
              }}
            >
              {isEn ? "Reject" : "Tolak"}
            </button>
          </div>

          <button
            type="button"
            onClick={() => setApproved(!approved)}
            className="btn btn-sm"
            style={{
              background: approved ? "#10b981" : "var(--color-accent)",
              color: "#ffffff",
              border: "none",
              borderRadius: "9999px",
              padding: "0 18px",
              fontWeight: 750,
              fontSize: "13px",
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              cursor: "pointer",
              transition: "all 180ms ease",
            }}
          >
            {approved ? (
              <>
                <Check size={14} />
                <span>{isEn ? "Dispatched to WhatsApp Cloud API" : "Terkirim ke WhatsApp Cloud API"}</span>
              </>
            ) : (
              <>
                <ShieldCheck size={14} />
                <span>{isEn ? "Approve & Dispatch (1-Click)" : "Setujui & Kirim Pesan"}</span>
              </>
            )}
          </button>
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
          background: "rgba(0, 0, 0, 0.5)",
          borderTop: "1px solid rgba(255, 255, 255, 0.06)",
          fontSize: "11px",
          color: "#8a857b",
        }}
        className="font-mono"
      >
        <span>AUDIT SIGNATURE: sha256:4a8c901...3f18</span>
        <span>SLA RESPONSE WINDOW: 42 SECONDS REMAINING</span>
      </div>
    </div>
  );
}
