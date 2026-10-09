"use client";

import { useState } from "react";
import { Play, RotateCcw, CheckCircle2, ShieldAlert, Coins, Cpu, Send, Inbox, MessageSquare, ThumbsUp, ThumbsDown } from "lucide-react";
import type { Dict } from "@/lib/i18n";

interface Props {
  dict: Dict;
}

type Step = "idle" | "trigger" | "agent" | "condition" | "approval" | "action" | "done";

export function WorkflowCanvas({ dict }: Props) {
  const [currentStep, setCurrentStep] = useState<Step>("approval");
  const [approved, setApproved] = useState(false);
  const [rejected, setRejected] = useState(false);

  function reset() {
    setCurrentStep("idle");
    setApproved(false);
    setRejected(false);
  }

  function runSimulation() {
    setCurrentStep("trigger");
    setApproved(false);
    setRejected(false);
    setTimeout(() => setCurrentStep("agent"), 500);
    setTimeout(() => setCurrentStep("condition"), 1100);
    setTimeout(() => setCurrentStep("approval"), 1700);
  }

  function handleApprove() {
    setApproved(true);
    setRejected(false);
    setCurrentStep("action");
    setTimeout(() => setCurrentStep("done"), 700);
  }

  function handleReject() {
    setRejected(true);
    setApproved(false);
    setCurrentStep("done");
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
          gridTemplateColumns: "repeat(auto-fit, minmax(170px, 1fr))",
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
                : rejected
                ? "var(--color-danger)"
                : "var(--color-border)",
            background:
              currentStep === "approval"
                ? "var(--color-warning-soft)"
                : approved
                ? "var(--color-success-soft)"
                : rejected
                ? "var(--color-danger-soft)"
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
              <span className="badge badge-success">{dict.canvas.approvedBadge}</span>
            ) : rejected ? (
              <span className="badge badge-danger">Ditolak oleh Operator</span>
            ) : currentStep === "approval" ? (
              <span className="badge badge-warning">Menunggu Tinjauan</span>
            ) : (
              <span className="muted">{dict.canvas.awaitingQueue}</span>
            )}
          </div>
        </div>

        {/* Node 4: Action */}
        <div
          style={{
            padding: "var(--space-3)",
            borderRadius: "var(--radius-md)",
            border: "1px solid",
            borderColor: ["action", "done"].includes(currentStep) && approved ? "var(--color-success)" : "var(--color-border)",
            background: ["action", "done"].includes(currentStep) && approved ? "var(--color-surface-2)" : "var(--color-surface)",
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
            {approved ? dict.canvas.actionDone : rejected ? "Aksi Dibatalkan" : dict.canvas.actionLocked}
          </div>
        </div>
      </div>

      {/* Human Approval Review Drawer (Visible when in approval state or approved) */}
      <div
        style={{
          border: "1px solid var(--color-border)",
          borderRadius: "var(--radius-md)",
          background: "var(--color-surface-2)",
          padding: "var(--space-4)",
          display: "grid",
          gap: "var(--space-3)",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "var(--space-2)" }}>
            <MessageSquare size={16} style={{ color: "var(--color-accent)" }} aria-hidden="true" />
            <span style={{ fontWeight: 650, fontSize: "var(--text-14)" }}>
              Draf Respon WhatsApp Otomatis (Menunggu Izin Operator)
            </span>
          </div>
          <span className="badge badge-accent">Skor Kualifikasi: 85/100</span>
        </div>

        <div
          style={{
            background: "var(--color-surface)",
            border: "1px solid var(--color-border-strong)",
            borderRadius: "var(--radius-sm)",
            padding: "var(--space-3)",
            fontSize: "var(--text-14)",
            lineHeight: 1.5,
            fontFamily: "var(--font-sans)",
          }}
        >
          &quot;Halo Bu Rina, salam kenal dari tim agensi. Terkait kebutuhan kampanye lead generation dengan alokasi budget Rp150.000.000, kami telah menyiapkan blueprint awal dan portofolio industri serupa. Apakah ada waktu luang 15 menit besok siang untuk sinkronisasi singkat?&quot;
        </div>

        {currentStep === "approval" && !approved && !rejected && (
          <div style={{ display: "flex", gap: "var(--space-3)", justifyContent: "flex-end" }}>
            <button
              type="button"
              className="btn btn-secondary btn-sm"
              onClick={handleReject}
            >
              <ThumbsDown size={14} aria-hidden="true" />
              <span>Tolak Draf</span>
            </button>
            <button
              type="button"
              className="btn btn-primary btn-sm"
              onClick={handleApprove}
            >
              <ThumbsUp size={14} aria-hidden="true" />
              <span>Setujui &amp; Kirim (Sandbox)</span>
            </button>
          </div>
        )}

        {approved && (
          <div style={{ display: "flex", alignItems: "center", gap: "var(--space-2)", fontSize: "var(--text-12)", color: "var(--color-success)" }}>
            <CheckCircle2 size={14} aria-hidden="true" />
            <span>Disetujui oleh operator pada {new Date().toLocaleTimeString()} &bull; Tercatat di audit log</span>
          </div>
        )}
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
            <span className="muted">Penyimpanan:</span>
            <code>PostgreSQL (Neon Durable)</code>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "var(--space-1)" }}>
            <CheckCircle2 size={14} aria-hidden="true" style={{ color: "var(--color-success)" }} />
            <span className="muted">Status:</span>
            <span>
              {currentStep === "done" && approved
                ? "Selesai & Tercatat di Log"
                : currentStep === "done" && rejected
                ? "Dibatalkan & Diarsipkan"
                : currentStep === "approval"
                ? "Menunggu persetujuan manusia"
                : "Diproses"}
            </span>
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "var(--space-2)" }}>
          <span className="badge">Idempotency Key: run_lead_qual_085</span>
        </div>
      </div>
    </div>
  );
}
