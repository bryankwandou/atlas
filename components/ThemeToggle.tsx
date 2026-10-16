"use client";

import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

interface Props {
  ariaLabel?: string;
}

export function ThemeToggle({ ariaLabel }: Props) {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [isId, setIsId] = useState(false);
  const label = ariaLabel ?? (isId ? "Ganti tema tampilan" : "Change color theme");
  const toLight = isId ? "Beralih ke mode terang" : "Switch to light mode";
  const toDark = isId ? "Beralih ke mode gelap" : "Switch to dark mode";

  useEffect(() => {
    setIsId(document.documentElement.lang === "id");
    const current = document.documentElement.getAttribute("data-theme") as "light" | "dark" | null;
    if (current) {
      setTheme(current);
    } else {
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      setTheme(prefersDark ? "dark" : "light");
    }
  }, []);

  function toggle() {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.setAttribute("data-theme", next);
    try {
      localStorage.setItem("theme", next);
    } catch {}
  }

  return (
    <button
      type="button"
      onClick={toggle}
      className="icon-btn"
      aria-label={`${label}: ${theme === "dark" ? toLight : toDark}`}
      title={theme === "dark" ? toLight : toDark}
      style={{ minWidth: "44px", minHeight: "44px" }}
    >
      {theme === "dark" ? (
        <Sun size={18} aria-hidden="true" />
      ) : (
        <Moon size={18} aria-hidden="true" />
      )}
      <span className="visually-hidden">
        {theme === "dark" ? toLight : toDark}
      </span>
    </button>
  );
}
