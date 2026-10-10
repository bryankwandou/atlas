"use client";

import { useState } from "react";
import { ShieldCheck, Cpu, Sliders, CheckCircle2, Lock, ArrowRight, Zap, RefreshCw } from "lucide-react";

interface Props {
  isEn?: boolean;
}

export function GovernanceDial({ isEn = true }: Props) {
  const [volume, setVolume] = useState<number>(3500);
  const [tier, setTier] = useState<"standard" | "enterprise" | "airgapped">("enterprise");

  // Dynamic calculations
  const hoursReclaimed = Math.round((volume * 7.5) / 60);
  const avgCostPerRun = tier === "airgapped" ? "$0.0014" : tier === "enterprise" ? "$0.0008" : "$0.0004";
  const monthlySavings = (hoursReclaimed * 24).toLocaleString();
  const latency = tier === "airgapped" ? "850 ms" : tier === "enterprise" ? "1.2 s" : "1.8 s";

  return (
    <div
      id="simulator"
      style={{
        background: "var(--color-surface)",
        border: "1px solid var(--color-border)",
        borderRadius: "var(--radius-lg)",
        padding: "var(--space-6)",
        boxShadow: "var(--shadow-raised)",
      }}
    >
      <div className="dial-grid">
        {/* Left Column: Interactive Controls */}
        <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-5)" }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <span className="font-mono text-12" style={{ textTransform: "uppercase", letterSpacing: "0.14em", color: "var(--color-accent)", fontWeight: 700 }}>
                {isEn ? "Interactive Architecture Dial" : "Simulator Kendali Arsitektur"}
              </span>
            </div>
            <h3 className="font-display" style={{ fontSize: "var(--text-32)", fontWeight: 800, marginTop: "var(--space-2)" }}>
              {isEn ? "Tune your operational governance." : "Sesuaikan tingkat kendali sistem Anda."}
            </h3>
            <p style={{ color: "var(--color-muted)", fontSize: "var(--text-14)", marginTop: "var(--space-2)", maxWidth: "52ch" }}>
              {isEn
                ? "Every Atlas pipeline balances execution throughput with strict human oversight. Drag the volume slider to inspect your projected resource allocation and safety envelope."
                : "Setiap alur kerja Atlas menyeimbangkan kecepatan komputasi dengan persetujuan manusia wajib. Geser slider volume untuk melihat proyeksi alokasi sumber daya dan pagar pengaman operasional."}
            </p>
          </div>

          {/* Volume Range Slider */}
          <div style={{ display: "grid", gap: "var(--space-2)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
              <label htmlFor="volume-slider" style={{ fontSize: "var(--text-14)", fontWeight: 700 }}>
                {isEn ? "Monthly Inbound Workflow Runs" : "Volume Eksekusi Masuk Bulanan"}
              </label>
              <span className="font-mono" style={{ fontSize: "var(--text-20)", fontWeight: 800, color: "var(--color-accent)" }}>
                {volume.toLocaleString()} {isEn ? "runs/mo" : "alur/bln"}
              </span>
            </div>
            <input
              id="volume-slider"
              type="range"
              min="500"
              max="30000"
              step="500"
              value={volume}
              onChange={(e) => setVolume(Number(e.target.value))}
              style={{
                width: "100%",
                accentColor: "var(--color-accent)",
                cursor: "pointer",
                height: "8px",
              }}
            />
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "11px", color: "var(--color-muted)" }} className="font-mono">
              <span>500</span>
              <span>7,500</span>
              <span>15,000</span>
              <span>30,000+</span>
            </div>
          </div>

          {/* Governance Tier Selection */}
          <div style={{ display: "grid", gap: "var(--space-2)" }}>
            <span style={{ fontSize: "var(--text-14)", fontWeight: 700 }}>
              {isEn ? "Governance Strictness Tier" : "Tingkat Ketatnya Tata Kelola"}
            </span>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "var(--space-2)" }}>
              <button
                type="button"
                onClick={() => setTier("standard")}
                className="btn btn-sm"
                style={{
                  background: tier === "standard" ? "var(--color-text)" : "var(--color-surface-2)",
                  color: tier === "standard" ? "var(--color-bg)" : "var(--color-text)",
                  border: "1px solid var(--color-border)",
                  borderRadius: "var(--radius-md)",
                  fontWeight: 700,
                  fontSize: "12px",
                }}
              >
                {isEn ? "Standard" : "Standar"}
              </button>
              <button
                type="button"
                onClick={() => setTier("enterprise")}
                className="btn btn-sm"
                style={{
                  background: tier === "enterprise" ? "var(--color-accent)" : "var(--color-surface-2)",
                  color: tier === "enterprise" ? "#ffffff" : "var(--color-text)",
                  border: "1px solid var(--color-border)",
                  borderRadius: "var(--radius-md)",
                  fontWeight: 700,
                  fontSize: "12px",
                }}
              >
                {isEn ? "Enterprise Gate" : "Gerbang Enterprise"}
              </button>
              <button
                type="button"
                onClick={() => setTier("airgapped")}
                className="btn btn-sm"
                style={{
                  background: tier === "airgapped" ? "var(--color-text)" : "var(--color-surface-2)",
                  color: tier === "airgapped" ? "var(--color-bg)" : "var(--color-text)",
                  border: "1px solid var(--color-border)",
                  borderRadius: "var(--radius-md)",
                  fontWeight: 700,
                  fontSize: "12px",
                }}
              >
                {isEn ? "Airgapped Sovereign" : "Sovereign Airgap"}
              </button>
            </div>
          </div>

          {/* Live Calculated Telemetry */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              gap: "1px",
              background: "var(--color-border)",
              border: "1px solid var(--color-border)",
              borderRadius: "var(--radius-md)",
              overflow: "hidden",
            }}
          >
            <div style={{ background: "var(--color-surface)", padding: "var(--space-3)" }}>
              <span className="font-mono text-12" style={{ color: "var(--color-muted)", textTransform: "uppercase" }}>
                {isEn ? "Staff Hours Saved" : "Jam Kerja Dihemat"}
              </span>
              <div className="font-display" style={{ fontSize: "var(--text-24)", fontWeight: 800, marginTop: "2px" }}>
                {hoursReclaimed.toLocaleString()} <span style={{ fontSize: "14px", fontWeight: 600 }}>{isEn ? "hrs/mo" : "jam/bln"}</span>
              </div>
            </div>

            <div style={{ background: "var(--color-surface)", padding: "var(--space-3)" }}>
              <span className="font-mono text-12" style={{ color: "var(--color-muted)", textTransform: "uppercase" }}>
                {isEn ? "Avg Ingestion Latency" : "Latensi Ingestion"}
              </span>
              <div className="font-display" style={{ fontSize: "var(--text-24)", fontWeight: 800, marginTop: "2px" }}>
                {latency}
              </div>
            </div>

            <div style={{ background: "var(--color-surface)", padding: "var(--space-3)" }}>
              <span className="font-mono text-12" style={{ color: "var(--color-muted)", textTransform: "uppercase" }}>
                {isEn ? "Outbound Accuracy" : "Akurasi Pesan Keluar"}
              </span>
              <div className="font-display" style={{ fontSize: "var(--text-24)", fontWeight: 800, marginTop: "2px", color: "var(--color-success)" }}>
                100% <span style={{ fontSize: "12px", fontWeight: 600, color: "var(--color-muted)" }}>{isEn ? "Human Verified" : "Terverifikasi"}</span>
              </div>
            </div>

            <div style={{ background: "var(--color-surface)", padding: "var(--space-3)" }}>
              <span className="font-mono text-12" style={{ color: "var(--color-muted)", textTransform: "uppercase" }}>
                {isEn ? "Compute Footprint" : "Biaya Komputasi"}
              </span>
              <div className="font-display" style={{ fontSize: "var(--text-24)", fontWeight: 800, marginTop: "2px" }}>
                {avgCostPerRun} <span style={{ fontSize: "12px", fontWeight: 600, color: "var(--color-muted)" }}>/ run</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Simulated Live Envelope Preview */}
        <div
          style={{
            background: "var(--color-surface-2)",
            border: "1px solid var(--color-border)",
            borderRadius: "var(--radius-lg)",
            padding: "var(--space-5)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            gap: "var(--space-4)",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span className="font-mono text-12" style={{ color: "var(--color-muted)", textTransform: "uppercase", letterSpacing: "0.1em" }}>
              {isEn ? "Live Telemetry Envelope" : "Amplop Telemetri Langsung"}
            </span>
            <span className="badge badge-accent" style={{ fontSize: "10px", fontWeight: 700 }}>
              {tier.toUpperCase()}
            </span>
          </div>

          <div
            style={{
              background: "var(--color-surface)",
              border: "1px solid var(--color-border)",
              borderRadius: "var(--radius-md)",
              padding: "var(--space-4)",
              display: "grid",
              gap: "var(--space-3)",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "var(--color-success)" }}></div>
              <span style={{ fontSize: "13px", fontWeight: 700 }}>
                {isEn ? "Inbound Ingestion Payload" : "Payload Data Masuk"}
              </span>
              <span className="font-mono text-12" style={{ marginLeft: "auto", color: "var(--color-muted)" }}>
                ID: ATLS-{volume.toString().slice(0, 3)}
              </span>
            </div>

            <div style={{ fontSize: "12px", color: "var(--color-muted)", display: "grid", gap: "4px" }} className="font-mono">
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span>Source Channel:</span>
                <span style={{ color: "var(--color-text)", fontWeight: 600 }}>Meta Lead Ads / WhatsApp</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span>Rubric Qualification:</span>
                <span style={{ color: "var(--color-success)", fontWeight: 600 }}>HIGH INTENT (92/100)</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span>Outbound Gatekeeper:</span>
                <span style={{ color: "var(--color-accent)", fontWeight: 700 }}>AWAITING OPERATOR SIGN-OFF</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span>Audit Signature:</span>
                <span style={{ color: "var(--color-muted)" }}>sha256:7e91...4bc0</span>
              </div>
            </div>

            <div
              style={{
                borderTop: "1px solid var(--color-border)",
                paddingTop: "var(--space-2)",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "12px", color: "var(--color-success)", fontWeight: 600 }}>
                <ShieldCheck size={14} />
                <span>{isEn ? "Zero Hallucination Lock Active" : "Kunci Anti-Halusinasi Aktif"}</span>
              </div>
              <span className="font-mono text-12" style={{ color: "var(--color-muted)" }}>
                {latency}
              </span>
            </div>
          </div>

          <div style={{ borderTop: "1px solid var(--color-border)", paddingTop: "var(--space-3)" }}>
            <p style={{ fontSize: "13px", color: "var(--color-muted)", lineHeight: 1.5 }}>
              {isEn
                ? "All outbound actions remain strictly contained in private tenant boundaries until explicitly authorized by a human operator in your console."
                : "Semua tindakan keluar tertahan secara aman di dalam batas privat sistem Anda sampai disetujui secara eksplisit oleh anggota tim di konsol."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
