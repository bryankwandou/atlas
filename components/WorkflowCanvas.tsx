"use client";

import { useState } from "react";
import {
  Play,
  RotateCcw,
  CheckCircle2,
  ShieldAlert,
  Coins,
  Cpu,
  Send,
  Inbox,
  MessageSquare,
  ThumbsUp,
  ThumbsDown,
  Clock,
  XCircle,
  ShieldCheck,
} from "lucide-react";
import type { Dict, Locale } from "@/lib/i18n/locales";

interface Props {
  dict: Dict;
  locale?: Locale;
}

type Step = "idle" | "trigger" | "agent" | "condition" | "approval" | "action" | "done";

export function WorkflowCanvas({ dict, locale = "en" }: Props) {
  const isEn = locale === "en";
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
    setTimeout(() => setCurrentStep("agent"), 450);
    setTimeout(() => setCurrentStep("condition"), 900);
    setTimeout(() => setCurrentStep("approval"), 1400);
  }

  function handleApprove() {
    setApproved(true);
    setRejected(false);
    setCurrentStep("action");
    setTimeout(() => setCurrentStep("done"), 600);
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
        padding: "var(--space-4)",
        display: "grid",
        gap: "var(--space-3)",
      }}
    >
      {/* Header Bar */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "var(--space-2)",
          borderBottom: "1px solid var(--color-border)",
          paddingBottom: "var(--space-3)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "var(--space-2)" }}>
          <span className="badge badge-accent">{isEn ? "Live Workflow Demo" : "Demo Alur Kerja"}</span>
          <span style={{ fontWeight: 650, fontSize: "var(--text-14)" }}>
            {isEn ? "Inbound Lead Qualification & Draft Response" : "Kualifikasi Inbound Lead & Draf Respon"}
          </span>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "var(--space-2)" }}>
          {approved ? (
            <span className="badge badge-success">
              <CheckCircle2 size={12} aria-hidden="true" />
              <span>{isEn ? "Approved in Sandbox" : "Disetujui di Sandbox"}</span>
            </span>
          ) : rejected ? (
            <span className="badge badge-danger">
              <XCircle size={12} aria-hidden="true" />
              <span>{isEn ? "Rejected by Operator" : "Ditolak Operator"}</span>
            </span>
          ) : currentStep === "approval" ? (
            <span className="badge badge-warning">
              <Clock size={12} aria-hidden="true" />
              <span>{isEn ? "Pending Review" : "Menunggu Tinjauan"}</span>
            </span>
          ) : (
            <span className="badge">{isEn ? "Simulation Running" : "Simulasi Berjalan"}</span>
          )}

          {currentStep === "idle" ? (
            <button
              type="button"
              className="btn btn-primary btn-sm"
              onClick={runSimulation}
            >
              <Play size={13} aria-hidden="true" />
              <span>{isEn ? "Run Simulation" : "Jalankan Simulasi"}</span>
            </button>
          ) : (
            <button
              type="button"
              className="btn btn-secondary btn-sm"
              onClick={reset}
            >
              <RotateCcw size={13} aria-hidden="true" />
              <span>{isEn ? "Reset Flow" : "Mulai Ulang"}</span>
            </button>
          )}
        </div>
      </div>

      {/* 4-Step Compact Pipeline Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))",
          gap: "var(--space-2)",
        }}
      >
        {/* Step 1: Inbound Lead Trigger */}
        <div
          style={{
            padding: "var(--space-2) var(--space-3)",
            borderRadius: "var(--radius-md)",
            border: "1px solid",
            borderColor: currentStep !== "idle" ? "var(--color-accent)" : "var(--color-border)",
            background: currentStep !== "idle" ? "var(--color-surface-2)" : "var(--color-surface)",
            display: "grid",
            gap: "2px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <span className="eyebrow" style={{ fontSize: "10px" }}>01. {isEn ? "Input" : "Input"}</span>
            <Inbox size={13} aria-hidden="true" style={{ color: "var(--color-accent)" }} />
          </div>
          <div style={{ fontWeight: 650, fontSize: "var(--text-12)" }}>
            {isEn ? "Inbound Lead" : "Lead Masuk"}
          </div>
          <div className="muted" style={{ fontSize: "11px", lineHeight: 1.3 }}>
            {isEn ? "Sarah ($15k Budget)" : "Rina (Budget 150jt)"}
          </div>
        </div>

        {/* Step 2: Bounded AI Classifier */}
        <div
          style={{
            padding: "var(--space-2) var(--space-3)",
            borderRadius: "var(--radius-md)",
            border: "1px solid",
            borderColor: ["agent", "condition", "approval", "action", "done"].includes(currentStep)
              ? "var(--color-accent)"
              : "var(--color-border)",
            background: ["agent", "condition", "approval", "action", "done"].includes(currentStep)
              ? "var(--color-surface-2)"
              : "var(--color-surface)",
            display: "grid",
            gap: "2px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <span className="eyebrow" style={{ fontSize: "10px" }}>02. {isEn ? "AI Scoring" : "AI Evaluasi"}</span>
            <Cpu size={13} aria-hidden="true" style={{ color: "var(--color-accent)" }} />
          </div>
          <div style={{ fontWeight: 650, fontSize: "var(--text-12)" }}>
            {isEn ? "Fit Evaluation" : "Skor Kualifikasi"}
          </div>
          <div style={{ fontSize: "11px", color: "var(--color-accent)", fontWeight: 700 }}>
            {isEn ? "85/100 (High Fit)" : "85/100 (Prioritas)"}
          </div>
        </div>

        {/* Step 3: Human Approval Gate */}
        <div
          style={{
            padding: "var(--space-2) var(--space-3)",
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
            gap: "2px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <span className="eyebrow" style={{ fontSize: "10px" }}>03. {isEn ? "Control" : "Kontrol"}</span>
            <ShieldAlert
              size={13}
              aria-hidden="true"
              style={{
                color: approved
                  ? "var(--color-success)"
                  : rejected
                  ? "var(--color-danger)"
                  : "var(--color-warning)",
              }}
            />
          </div>
          <div style={{ fontWeight: 650, fontSize: "var(--text-12)" }}>
            {isEn ? "Team Sign-Off" : "Izin Operator"}
          </div>
          <div style={{ fontSize: "11px" }}>
            {approved ? (
              <span style={{ color: "var(--color-success)", fontWeight: 600 }}>
                {isEn ? "Approved" : "Disetujui"}
              </span>
            ) : rejected ? (
              <span style={{ color: "var(--color-danger)", fontWeight: 600 }}>
                {isEn ? "Rejected" : "Ditolak"}
              </span>
            ) : currentStep === "approval" ? (
              <span style={{ color: "var(--color-warning)", fontWeight: 600 }}>
                {isEn ? "Awaiting Sign-Off" : "Menunggu Izin"}
              </span>
            ) : (
              <span className="muted">{isEn ? "Queued" : "Antrean"}</span>
            )}
          </div>
        </div>

        {/* Step 4: External Action Dispatch */}
        <div
          style={{
            padding: "var(--space-2) var(--space-3)",
            borderRadius: "var(--radius-md)",
            border: "1px solid",
            borderColor:
              ["action", "done"].includes(currentStep) && approved
                ? "var(--color-success)"
                : rejected
                ? "var(--color-border)"
                : "var(--color-border)",
            background:
              ["action", "done"].includes(currentStep) && approved
                ? "var(--color-surface-2)"
                : "var(--color-surface)",
            display: "grid",
            gap: "2px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <span className="eyebrow" style={{ fontSize: "10px" }}>04. {isEn ? "Dispatch" : "Aksi"}</span>
            <Send
              size={13}
              aria-hidden="true"
              style={{
                color: approved ? "var(--color-success)" : "var(--color-muted)",
              }}
            />
          </div>
          <div style={{ fontWeight: 650, fontSize: "var(--text-12)" }}>WhatsApp &amp; CRM</div>
          <div className="muted" style={{ fontSize: "11px", lineHeight: 1.3 }}>
            {approved
              ? (isEn ? "Dispatched in Sandbox" : "Terkirim di Sandbox")
              : rejected
              ? (isEn ? "Action Cancelled" : "Aksi Dibatalkan")
              : (isEn ? "Gate Paused" : "Tertahan Izin")}
          </div>
        </div>
      </div>

      {/* Human Approval Review Drawer */}
      <div
        style={{
          border: "1px solid var(--color-border)",
          borderRadius: "var(--radius-md)",
          background: "var(--color-surface-2)",
          padding: "var(--space-3) var(--space-4)",
          display: "grid",
          gap: "var(--space-3)",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "var(--space-2)" }}>
            <MessageSquare size={15} style={{ color: "var(--color-accent)" }} aria-hidden="true" />
            <span style={{ fontWeight: 650, fontSize: "var(--text-13)" }}>
              {isEn
                ? "WhatsApp Draft (Dispatched Only After Team Approval)"
                : "Draf Respon WhatsApp (Hanya Dikirim Setelah Izin Manusia)"}
            </span>
          </div>
          <span className="badge" style={{ fontSize: "11px" }}>
            {isEn ? "Demo Payload • Qualified Lead" : "Data Demo • Prospek Panas"}
          </span>
        </div>

        <div
          style={{
            background: "var(--color-surface)",
            border: "1px solid var(--color-border-strong)",
            borderRadius: "var(--radius-sm)",
            padding: "var(--space-3)",
            fontSize: "var(--text-13)",
            lineHeight: 1.5,
            color: "var(--color-text)",
          }}
        >
          {isEn
            ? "\"Hello Sarah, thank you for reaching out to our agency. Regarding your inbound lead generation campaign with a $15,000 monthly allocation, our solutions team has prepared a tailored workflow blueprint and benchmark portfolio. Do you have 15 minutes tomorrow afternoon for a brief alignment?\""
            : "\"Halo Bu Rina, salam kenal dari tim agensi. Terkait kebutuhan kampanye lead generation dengan alokasi budget Rp150.000.000, kami telah menyiapkan blueprint awal dan portofolio industri serupa. Apakah ada waktu luang 15 menit besok siang untuk sinkronisasi singkat?\""}
        </div>

        {currentStep === "approval" && !approved && !rejected && (
          <div style={{ display: "flex", gap: "var(--space-2)", justifyContent: "flex-end" }}>
            <button
              type="button"
              className="btn btn-secondary btn-sm"
              onClick={handleReject}
            >
              <ThumbsDown size={13} aria-hidden="true" />
              <span>{isEn ? "Reject Draft" : "Tolak Draf"}</span>
            </button>
            <button
              type="button"
              className="btn btn-primary btn-sm"
              onClick={handleApprove}
            >
              <ThumbsUp size={13} aria-hidden="true" />
              <span>{isEn ? "Approve & Dispatch (Sandbox)" : "Setujui & Jalankan (Sandbox)"}</span>
            </button>
          </div>
        )}

        {approved && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "var(--space-2)",
              fontSize: "var(--text-12)",
              color: "var(--color-success)",
              fontWeight: 600,
            }}
          >
            <CheckCircle2 size={14} aria-hidden="true" />
            <span>
              {isEn
                ? "Approved by operator • Immutably stored in audit log"
                : "Disetujui oleh operator • Dicatat permanen di audit log"}
            </span>
          </div>
        )}

        {rejected && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "var(--space-2)",
              fontSize: "var(--text-12)",
              color: "var(--color-danger)",
              fontWeight: 600,
            }}
          >
            <XCircle size={14} aria-hidden="true" />
            <span>
              {isEn
                ? "Draft rejected by operator • Zero outbound action taken"
                : "Draf ditolak oleh operator • Nol aksi keluar dilakukan"}
            </span>
          </div>
        )}
      </div>

      {/* Metrics & Status Bar */}
      <div
        style={{
          borderTop: "1px solid var(--color-border)",
          paddingTop: "var(--space-2)",
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "var(--space-3)",
          fontSize: "var(--text-12)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "var(--space-3)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "var(--space-1)" }}>
            <Clock size={13} aria-hidden="true" style={{ color: "var(--color-muted)" }} />
            <span className="muted">{isEn ? "Response Time:" : "Waktu Respon:"}</span>
            <strong>&lt; 60 {isEn ? "Seconds" : "Detik"}</strong>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "var(--space-1)" }}>
            <ShieldCheck size={13} aria-hidden="true" style={{ color: "var(--color-success)" }} />
            <span className="muted">{isEn ? "Governance:" : "Kontrol:"}</span>
            <span>{isEn ? "Mandatory Sign-Off" : "Verifikasi Tim Wajib"}</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "var(--space-1)" }}>
            {approved ? (
              <CheckCircle2 size={13} aria-hidden="true" style={{ color: "var(--color-success)" }} />
            ) : rejected ? (
              <XCircle size={13} aria-hidden="true" style={{ color: "var(--color-danger)" }} />
            ) : (
              <ShieldAlert size={13} aria-hidden="true" style={{ color: "var(--color-warning)" }} />
            )}
            <span className="muted">{isEn ? "Status:" : "Status:"}</span>
            <span
              style={{
                color: approved
                  ? "var(--color-success)"
                  : rejected
                  ? "var(--color-danger)"
                  : "var(--color-warning)",
                fontWeight: 600,
              }}
            >
              {approved
                ? (isEn ? "Completed & Logged" : "Selesai & Dicatat di Log")
                : rejected
                ? (isEn ? "Cancelled & Archived" : "Dibatalkan & Diarsipkan")
                : (isEn ? "Awaiting Team Decision" : "Menunggu Keputusan Tim")}
            </span>
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "var(--space-2)" }}>
          <span className="badge badge-accent" style={{ fontSize: "10px" }}>
            {isEn ? "Active Deduplication Protection" : "Proteksi Anti-Duplikasi Aktif"}
          </span>
        </div>
      </div>

      {/* Transparency Microcopy */}
      <div
        className="muted"
        style={{
          fontSize: "11px",
          textAlign: "center",
          borderTop: "1px dashed var(--color-border)",
          paddingTop: "var(--space-2)",
        }}
      >
        {isEn
          ? "Interactive simulation using synthetic test data. Zero external messages are transmitted without authorized production credentials."
          : "Simulasi interaktif menggunakan data demo. Tidak ada pesan riil yang dikirim tanpa otorisasi sistem produksi."}
      </div>
    </div>
  );
}
