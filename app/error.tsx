"use client";

import { useEffect } from "react";
import { RotateCcw } from "lucide-react";

interface Props {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ErrorBoundary({ error, reset }: Props) {
  useEffect(() => {
    console.error("Unhandled route error:", error);
  }, [error]);

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "grid",
        placeItems: "center",
        padding: "var(--space-5)",
        textAlign: "center",
      }}
    >
      <div className="panel" style={{ maxWidth: "460px", display: "grid", gap: "var(--space-3)" }}>
        <span className="eyebrow" style={{ color: "var(--color-danger)" }}>Terjadi Kendala</span>
        <h1 style={{ fontSize: "var(--text-24)" }}>Terjadi Kesalahan Sistem</h1>
        <p className="muted" style={{ fontSize: "var(--text-14)" }}>
          Permintaan Anda tidak dapat diselesaikan saat ini. Silakan coba muat ulang atau periksa koneksi Anda.
        </p>
        <div style={{ marginTop: "var(--space-2)" }}>
          <button type="button" onClick={() => reset()} className="btn btn-primary btn-sm">
            <RotateCcw size={16} aria-hidden="true" />
            <span>Coba lagi</span>
          </button>
        </div>
      </div>
    </div>
  );
}
