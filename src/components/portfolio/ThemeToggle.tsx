"use client";

import { useTranslations } from "next-intl";
import { useTheme } from "./ThemeProvider";

export function ThemeToggle() {
  const t = useTranslations("theme");
  const { theme, toggle } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggle}
      role="switch"
      aria-checked={!isDark}
      aria-label={isDark ? t("toLight") : t("toDark")}
      className={`relative flex h-[30px] w-[54px] shrink-0 cursor-pointer items-center rounded-full border p-[3px] transition-colors duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent-blue)] ${
        isDark
          ? "border-white/10 bg-[#18181f]"
          : "border-black/10 bg-[#e4e8f0] shadow-[inset_0_1px_2px_rgba(0,0,0,0.08)]"
      }`}
    >
      <span className="sr-only">{t("toggle")}</span>

      {/* Sliding thumb */}
      <span
        className={`relative flex h-6 w-6 items-center justify-center rounded-full shadow-sm transition-all duration-300 ${
          isDark
            ? "translate-x-0 bg-[#1e293b] text-[#94a3b8]"
            : "translate-x-[24px] bg-white text-amber-500 shadow-[0_1px_4px_rgba(0,0,0,0.15)]"
        }`}
        aria-hidden
      >
        {isDark ? (
          /* Moon */
          <svg
            className="h-[13px] w-[13px]"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden
          >
            <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
          </svg>
        ) : (
          /* Sun */
          <svg
            className="h-[13px] w-[13px]"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden
          >
            <path
              fillRule="evenodd"
              d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
              clipRule="evenodd"
            />
          </svg>
        )}
      </span>
    </button>
  );
}
