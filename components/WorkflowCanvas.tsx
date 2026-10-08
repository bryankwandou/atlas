"use client";

import { useState } from "react";
import { Play, RotateCcw, CheckCircle2, ShieldAlert, Coins, Cpu, Send, Inbox, ArrowRight } from "lucide-react";
import type { Dict } from "@/lib/i18n";

interface Props {
  dict: Dict;
}

type Step = "idle" | "trigger" | "agent" | "condition" | "approval" | "action" | "done";

export function WorkflowCanvas({ dict }: Props) {
  const [currentStep, setCurrentStep] = useState<Step>("approval");
  const [approved, setApproved] = useState(false);

  function reset() {
    setCurrentStep("idle");
    setApproved(false);
  }

  function runSimulation() {
    setCurrentStep("trigger");
    setApproved(false);
    setTimeout(() => setCurrentStep("agent"), 500);
    setTimeout(() => setCurrentStep("condition"), 1100);
    setTimeout(() => setCurrentStep("approval"), 1700);
  }

  function handleApprove() {
    setApproved(true);
    setCurrentStep("action");
    setTimeout(() => setCurrentStep("done"), 700);
  }

  return (
    <div
      className="panel"
      style={{
        boxShadow: "var(--shadow-raised)",
        border: "1px solid var(--color-border-strong)",
        background: "var(--color-surface)",
        padding: "var(--space-5)",
        display: "grid",
        gap: "var(--space-4)",
      }}
    >
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "var(--space-3)",
          borderBottom: "1px solid var(--color-border)",
          paddingBottom: "var(--space-3)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "var(--space-2)" }}>
          <span className="badge badge-accent">Demo Kanvas Interaktif</span>
          <span className="muted" style={{ fontSize: "var(--text-12)" }}>
            {dict.home.canvasCaption}
          </span>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "var(--space-2)" }}>
          {currentStep === "idle" ? (
            <button
              type="button"
              className="btn btn-primary btn-sm"
              onClick={runSimulation}
            >
              <Play size={14} aria-hidden="true" />
              <span>Jalankan simulasi</span>
            </button>
          ) : (
            <button
              type="button"
              className="btn btn-secondary btn-sm"
              onClick={reset}
            >
              <RotateCcw size={14} aria-hidden="true" />
              <span>Mulai ulang</span>
            </button>
          )}
        </div>
      </div>

      {/* Nodes visual flow */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
          gap: "var(--space-3)",
          alignItems: "stretch",
        }}
      >
        {/* Node 1: Trigger */}
        <div
          style={{
            padding: "var(--space-3)",
            borderRadius: "var(--radius-md)",
            border: "1px solid",
            borderColor: currentStep !== "idle" ? "var(--color-accent)" : "var(--color-border)",
            background: currentStep !== "idle" ? "var(--color-surface-2)" : "var(--color-surface)",
            display: "grid",
            gap: "var(--space-2)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <span className="eyebrow" style={{ fontSize: "10px" }}>01. Trigger</span>
            <Inbox size={14} aria-hidden="true" style={{ color: "var(--color-accent)" }} />
          </div>
          <div style={{ fontWeight: 600, fontSize: "var(--text-14)" }}>{dict.canvas.trigger}</div>
          <div className="muted" style={{ fontSize: "var(--text-12)" }}>
            Formulir masuk: &quot;Rina, budget 150 jt...&quot;
          </div>
        </div>

        {/* Node 2: Agent */}
        <div
          style={{
            padding: "var(--space-3)",
            borderRadius: "var(--radius-md)",
            border: "1px solid",
            borderColor: ["agent", "condition", "approval", "action", "done"].includes(currentStep)
              ? "var(--color-accent)"
              : "var(--color-border)",
            background: ["agent", "condition", "approval", "action", "done"].includes(currentStep)
              ? "var(--color-surface-2)"
              : "var(--color-surface)",
            display: "grid",
            gap: "var(--space-2)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <span className="eyebrow" style={{ fontSize: "10px" }}>02. Agent</span>
            <Cpu size={14} aria-hidden="true" style={{ color: "var(--color-accent)" }} />
          </div>
          <div style={{ fontWeight: 600, fontSize: "var(--text-14)" }}>{dict.canvas.agent}</div>
          <div className="muted" style={{ fontSize: "var(--text-12)" }}>
            Skor: <strong>85/100</strong> (Tinggi) &bull; Draf siap
          </div>
        </div>

        {/* Node 3: Approval Gate */}
        <div
          style={{
            padding: "var(--space-3)",
            borderRadius: "var(--radius-md)",
            border: "1px solid",
            borderColor:
              currentStep === "approval"
                ? "var(--color-warning)"
                : approved
                ? "var(--color-success)"
                : "var(--color-border)",
            background:
              currentStep === "approval"
                ? "var(--color-warning-soft)"
                : approved
                ? "var(--color-success-soft)"
                : "var(--color-surface)",
            display: "grid",
            gap: "var(--space-2)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <span className="eyebrow" style={{ fontSize: "10px" }}>03. Persetujuan</span>
            <ShieldAlert size={14} aria-hidden="true" style={{ color: "var(--color-warning)" }} />
          </div>
          <div style={{ fontWeight: 600, fontSize: "var(--text-14)" }}>{dict.canvas.approval}</div>
          <div style={{ fontSize: "var(--text-12)" }}>
            {approved ? (
              <span className="badge badge-success">Disetujui manusia</span>
            ) : currentStep === "approval" ? (
              <button
                type="button"
                className="btn btn-primary btn-sm"
                onClick={handleApprove}
                style={{ width: "100%", marginTop: "var(--space-1)" }}
              >
                Setujui sekarang
              </button>
            ) : (
              <span className="muted">Menunggu antrean</span>
            )}
          </div>
        </div>

        {/* Node 4: Action */}
        <div
          style={{
            padding: "var(--space-3)",
            borderRadius: "var(--radius-md)",
            border: "1px solid",
            borderColor: ["action", "done"].includes(currentStep) ? "var(--color-success)" : "var(--color-border)",
            background: ["action", "done"].includes(currentStep) ? "var(--color-surface-2)" : "var(--color-surface)",
            display: "grid",
            gap: "var(--space-2)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <span className="eyebrow" style={{ fontSize: "10px" }}>04. Aksi Eksternal</span>
            <Send size={14} aria-hidden="true" style={{ color: "var(--color-success)" }} />
          </div>
          <div style={{ fontWeight: 600, fontSize: "var(--text-14)" }}>{dict.canvas.action}</div>
          <div className="muted" style={{ fontSize: "var(--text-12)" }}>
            {approved ? "Email simulasi dikirim &amp; dicatat" : "Terkunci persetujuan"}
          </div>
        </div>
      </div>

      {/* Metrics & Trace bar */}
      <div
        style={{
          borderTop: "1px solid var(--color-border)",
          paddingTop: "var(--space-3)",
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "var(--space-4)",
          fontSize: "var(--text-12)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "var(--space-4)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "var(--space-1)" }}>
            <Coins size={14} aria-hidden="true" style={{ color: "var(--color-muted)" }} />
            <span className="muted">Biaya AI:</span>
            <strong>$0.000452 (~Rp 8)</strong>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "var(--space-1)" }}>
            <Cpu size={14} aria-hidden="true" style={{ color: "var(--color-muted)" }} />
            <span className="muted">Model:</span>
            <code>mock-low (Luna tier)</code>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "var(--space-1)" }}>
            <CheckCircle2 size={14} aria-hidden="true" style={{ color: "var(--color-success)" }} />
            <span className="muted">Status:</span>
            <span>{currentStep === "done" ? "Selesai &amp; Tercatat" : currentStep === "approval" ? "Menunggu persetujuan" : "Diproses"}</span>
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "var(--space-2)" }}>
          <span className="badge">Idempotency Key: run_001:act</span>
        </div>
      </div>
    </div>
  );
}
