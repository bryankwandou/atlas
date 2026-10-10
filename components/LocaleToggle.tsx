"use client";

import { useTransition } from "react";
import { Languages, ChevronDown } from "lucide-react";
import { setLocaleAction } from "@/app/actions";
import { supportedLocales, type Locale } from "@/lib/i18n/locales";

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
        gap: "6px",
        position: "relative",
      }}
    >
      <Languages size={16} aria-hidden="true" style={{ color: "var(--color-muted)", flexShrink: 0 }} />
      <label htmlFor="locale-select" className="visually-hidden">
        {ariaLabel}
      </label>
      <div style={{ position: "relative", display: "inline-flex", alignItems: "center" }}>
        <select
          id="locale-select"
          value={currentLocale}
          onChange={onSelect}
          disabled={isPending}
          className="select"
          style={{
            minHeight: "36px",
            padding: "4px 26px 4px 10px",
            fontSize: "12px",
            fontWeight: 650,
            borderRadius: "9999px",
            background: "color-mix(in srgb, var(--color-surface) 90%, transparent)",
            color: "var(--color-text)",
            border: "1px solid var(--color-border)",
            cursor: "pointer",
            appearance: "none",
            WebkitAppearance: "none",
            outline: "none",
            maxWidth: "140px",
          }}
        >
          {supportedLocales.map((loc) => (
            <option key={loc.code} value={loc.code} style={{ background: "var(--color-surface)", color: "var(--color-text)" }}>
              {loc.native} ({loc.region})
            </option>
          ))}
        </select>
        <ChevronDown
          size={12}
          aria-hidden="true"
          style={{
            position: "absolute",
            right: "8px",
            pointerEvents: "none",
            color: "var(--color-muted)",
          }}
        />
      </div>
    </div>
  );
}
