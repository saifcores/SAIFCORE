"use client";

import { Moon, Sun } from "lucide-react";
import { useTranslations } from "next-intl";
import { useTheme } from "./ThemeProvider";

export function ThemeToggle() {
  const t = useTranslations("theme");
  const { theme, setPreference } = useTheme();
  const nextLabel = theme === "dark" ? t("light") : t("dark");

  return (
    <button
      type="button"
      onClick={() => setPreference(theme === "dark" ? "light" : "dark")}
      aria-label={`${t("toggle")}: ${nextLabel}`}
      title={nextLabel}
      className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-[var(--border-subtle)] text-[var(--text-muted)] transition hover:border-[var(--border-hover)] hover:text-[var(--text-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus-ring)]"
    >
      {theme === "dark" ? (
        <Sun className="h-3.5 w-3.5" strokeWidth={1.75} aria-hidden />
      ) : (
        <Moon className="h-3.5 w-3.5" strokeWidth={1.75} aria-hidden />
      )}
    </button>
  );
}
