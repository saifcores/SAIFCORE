"use client";

import { useTranslations } from "next-intl";
import { useCallback, useEffect, useId, useState } from "react";
import { Link } from "@/i18n/navigation";
import { BookCallLink } from "./BookCallLink";
import { LocaleSwitcher } from "./LocaleSwitcher";
import { ThemeToggle } from "./ThemeToggle";

const navLinks = [
  { href: "/#work" as const, labelKey: "work" as const },
  { href: "/#process" as const, labelKey: "process" as const },
  { href: "/#about" as const, labelKey: "about" as const },
  { href: "/articles" as const, labelKey: "insights" as const },
  { href: "/#contact" as const, labelKey: "contact" as const },
];

export function Navbar() {
  const t = useTranslations("nav");
  const [open, setOpen] = useState(false);
  const panelId = useId();

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, close]);

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--border-subtle)] bg-[var(--bg-base)]/75 backdrop-blur-xl backdrop-saturate-150">
      <div className="mx-auto flex h-16 max-w-[1280px] items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="text-sm font-semibold tracking-tight text-[var(--text-primary)] transition hover:text-[var(--accent-indigo)]"
          onClick={close}
        >
          SAIFCORE
        </Link>
        <nav
          className="hidden items-center gap-8 md:flex"
          aria-label={t("primary")}
        >
          {navLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-sm font-medium text-[var(--text-secondary)] transition hover:text-[var(--text-primary)]"
            >
              {t(l.labelKey)}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2 sm:gap-3">
          <LocaleSwitcher
            navLabel={t("language")}
            labels={{ en: t("localeEn"), fr: t("localeFr") }}
          />
          <ThemeToggle />
          <BookCallLink className="hidden rounded-xl bg-gradient-to-r from-[#3b82f6] to-[#6366f1] px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-indigo-500/25 transition hover:brightness-110 sm:inline-flex">
            {t("bookCall")}
          </BookCallLink>
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-elevated)]/50 text-[var(--text-primary)] transition hover:border-[var(--accent-indigo)]/35 md:hidden"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls={panelId}
            aria-label={open ? t("closeMenu") : t("openMenu")}
          >
            {open ? (
              <svg
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.8}
                aria-hidden
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.8}
                aria-hidden
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>
        </div>
      </div>

      {open ? (
        <>
          <button
            type="button"
            className="fixed inset-0 top-16 z-40 bg-black/50 backdrop-blur-[2px] md:hidden"
            aria-hidden
            tabIndex={-1}
            onClick={close}
          />
          <div
            id={panelId}
            className="fixed inset-x-0 top-16 z-50 max-h-[calc(100dvh-4rem)] overflow-y-auto border-b border-[var(--border-subtle)] bg-[var(--bg-base)]/98 shadow-[0_24px_48px_-12px_rgba(0,0,0,0.45)] backdrop-blur-xl md:hidden"
            role="dialog"
            aria-modal="true"
            aria-label={t("siteNavigation")}
          >
            <nav className="mx-auto flex max-w-[1280px] flex-col gap-1 px-4 py-4 sm:px-6">
              {navLinks.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="rounded-xl px-4 py-3 text-base font-medium text-[var(--text-secondary)] transition hover:bg-[var(--bg-elevated)] hover:text-[var(--text-primary)]"
                  onClick={close}
                >
                  {t(l.labelKey)}
                </Link>
              ))}
              <BookCallLink
                className="mt-2 inline-flex h-12 items-center justify-center rounded-2xl bg-gradient-to-r from-[#3b82f6] to-[#6366f1] px-4 text-base font-semibold text-white shadow-lg shadow-indigo-500/25"
                onClick={close}
              >
                {t("bookCall")}
              </BookCallLink>
            </nav>
          </div>
        </>
      ) : null}
    </header>
  );
}
