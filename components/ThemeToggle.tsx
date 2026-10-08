"use client";

import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

interface Props {
  ariaLabel?: string;
}

export function ThemeToggle({ ariaLabel = "Ganti tema tampilan" }: Props) {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
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
      aria-label={`${ariaLabel} (${theme === "dark" ? "Mode gelap" : "Mode terang"})`}
      title={theme === "dark" ? "Mode terang" : "Mode gelap"}
      style={{ minWidth: "44px", minHeight: "44px" }}
    >
      {theme === "dark" ? (
        <Sun size={18} aria-hidden="true" />
      ) : (
        <Moon size={18} aria-hidden="true" />
      )}
      <span className="visually-hidden">
        {theme === "dark" ? "Beralih ke mode terang" : "Beralih ke mode gelap"}
      </span>
    </button>
  );
}
