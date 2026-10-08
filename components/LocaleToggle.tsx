"use client";

import { useTransition } from "react";
import { Languages } from "lucide-react";
import { setLocaleAction } from "@/app/actions";
import type { Locale } from "@/lib/i18n";

interface Props {
  currentLocale: Locale;
  ariaLabel?: string;
}

export function LocaleToggle({ currentLocale, ariaLabel = "Pilih bahasa" }: Props) {
  const [isPending, startTransition] = useTransition();

  function onSelect(e: React.ChangeEvent<HTMLSelectElement>) {
    const next = e.target.value;
    startTransition(async () => {
      await setLocaleAction(next);
    });
  }

  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "var(--space-2)",
        position: "relative",
      }}
    >
      <Languages size={18} aria-hidden="true" style={{ color: "var(--color-muted)" }} />
      <label htmlFor="locale-select" className="visually-hidden">
        {ariaLabel}
      </label>
      <select
        id="locale-select"
        value={currentLocale}
        onChange={onSelect}
        disabled={isPending}
        className="select"
        style={{
          minHeight: "44px",
          padding: "var(--space-1) var(--space-3)",
          fontSize: "var(--text-14)",
          fontWeight: 600,
          borderRadius: "var(--radius-md)",
          width: "auto",
          cursor: "pointer",
        }}
      >
        <option value="id">Bahasa Indonesia</option>
        <option value="en">English</option>
      </select>
    </div>
  );
}
