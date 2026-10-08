import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
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
        <span className="eyebrow">404 Tidak Ditemukan</span>
        <h1 style={{ fontSize: "var(--text-24)" }}>Halaman Tidak Ditemukan</h1>
        <p className="muted" style={{ fontSize: "var(--text-14)" }}>
          Tautan yang Anda tuju mungkin salah, telah dipindahkan, atau Anda tidak memiliki akses.
        </p>
        <div style={{ marginTop: "var(--space-2)" }}>
          <Link href="/" className="btn btn-primary btn-sm">
            <ArrowLeft size={16} aria-hidden="true" />
            <span>Kembali ke Beranda</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
