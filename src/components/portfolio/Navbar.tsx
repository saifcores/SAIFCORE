"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import { Link } from "@/i18n/navigation";
import type { NavPrimaryLinkKey } from "@/types/messages";
import { hasObtainedCertifications } from "@/data/certifications";
import { BookCallLink } from "./BookCallLink";
import { LocaleSwitcher } from "./LocaleSwitcher";
import { ThemeToggle } from "./ThemeToggle";

type NavItem = {
  href: string;
  labelKey: NavPrimaryLinkKey;
};

const showCredentialsNav = hasObtainedCertifications();

function navWithoutCredentials(items: NavItem[]): NavItem[] {
  return showCredentialsNav
    ? items
    : items.filter((item) => item.labelKey !== "credentials");
}

const primaryNav = navWithoutCredentials([
  { href: "/#work", labelKey: "work" },
  { href: "/#services", labelKey: "services" },
  { href: "/#expertise", labelKey: "expertise" },
  { href: "/#certifications", labelKey: "credentials" },
  { href: "/#process", labelKey: "process" },
  { href: "/#contact", labelKey: "contact" },
]);

const moreNav = navWithoutCredentials([
  { href: "/about", labelKey: "about" },
  { href: "/systems", labelKey: "systems" },
  { href: "/experience", labelKey: "experience" },
  { href: "/articles", labelKey: "insights" },
]);

const mobileGroups: {
  labelKey: "groupExplore" | "groupProfile";
  links: NavItem[];
}[] = [
  {
    labelKey: "groupExplore",
    links: navWithoutCredentials([
      { href: "/#work", labelKey: "work" },
      { href: "/#services", labelKey: "services" },
      { href: "/#expertise", labelKey: "expertise" },
      { href: "/#process", labelKey: "process" },
    ]),
  },
  {
    labelKey: "groupProfile",
    links: navWithoutCredentials([
      { href: "/about", labelKey: "about" },
      { href: "/systems", labelKey: "systems" },
      { href: "/experience", labelKey: "experience" },
      { href: "/articles", labelKey: "insights" },
    ]),
  },
];

export function Navbar() {
  const t = useTranslations("nav");
  const [open, setOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const panelId = useId();
  const moreRef = useRef<HTMLDivElement>(null);

  const close = useCallback(() => {
    setOpen(false);
    setMoreOpen(false);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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

  useEffect(() => {
    if (!moreOpen) return;
    const onPointer = (e: MouseEvent) => {
      if (moreRef.current && !moreRef.current.contains(e.target as Node)) {
        setMoreOpen(false);
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMoreOpen(false);
    };
    document.addEventListener("mousedown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [moreOpen]);

  return (
    <header
      className={`sticky top-0 z-50 border-b border-[var(--border-subtle)] backdrop-blur-xl backdrop-saturate-150 transition-colors duration-200 ${
        scrolled ? "bg-[var(--bg-base)]/90" : "bg-[var(--bg-base)]/60"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-[1280px] items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="flex items-center gap-2.5 text-[var(--text-primary)] transition hover:opacity-90"
          onClick={close}
          aria-label="SAIFCORE — home"
        >
          <Image
            src="/profile.png"
            alt=""
            width={80}
            height={80}
            className="h-8 w-8 shrink-0 rounded-lg object-cover ring-1 ring-[var(--border-subtle)] sm:h-9 sm:w-9"
            priority
            sizes="36px"
          />
          <span className="text-sm font-bold tracking-tight">
            <span className="text-[var(--text-primary)]">SAIF</span>
            <span className="text-gradient">CORE</span>
          </span>
        </Link>

        <nav
          className="hidden items-center gap-3 md:flex xl:gap-6"
          aria-label={t("primary")}
        >
          {primaryNav.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`shrink-0 text-xs font-medium text-[var(--text-muted)] transition hover:text-[var(--text-primary)] xl:text-sm ${
                l.labelKey === "process" || l.labelKey === "credentials"
                  ? "hidden xl:inline"
                  : ""
              }`}
            >
              {t(l.labelKey)}
            </Link>
          ))}

          <div ref={moreRef} className="relative">
            <button
              type="button"
              className="inline-flex items-center gap-1 text-sm font-medium text-[var(--text-muted)] transition hover:text-[var(--text-primary)]"
              aria-expanded={moreOpen}
              aria-haspopup="true"
              onClick={() => setMoreOpen((o) => !o)}
            >
              {t("more")}
              <svg
                className={`h-3.5 w-3.5 transition ${moreOpen ? "rotate-180" : ""}`}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                aria-hidden
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 9l6 6 6-6"
                />
              </svg>
            </button>
            {moreOpen ? (
              <div
                className="absolute right-0 top-full z-50 mt-2 min-w-[180px] rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-elevated)] py-1.5 shadow-[var(--shadow-dropdown)] backdrop-blur-xl"
                role="menu"
              >
                {moreNav.map((l) => (
                  <Link
                    key={l.href}
                    href={l.href}
                    role="menuitem"
                    className="block px-4 py-2.5 text-sm font-medium text-[var(--text-secondary)] transition hover:bg-[var(--bg-elevated)] hover:text-[var(--text-primary)]"
                    onClick={() => setMoreOpen(false)}
                  >
                    {t(l.labelKey)}
                  </Link>
                ))}
              </div>
            ) : null}
          </div>
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <LocaleSwitcher
            navLabel={t("language")}
            labels={{ en: t("localeEn"), fr: t("localeFr") }}
          />
          <ThemeToggle />
          <BookCallLink className="btn-primary hidden px-3 py-2 text-xs md:inline-flex xl:px-4 xl:text-sm">
            {t("bookCall")}
          </BookCallLink>
          <button
            type="button"
            className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-elevated)]/50 text-[var(--text-primary)] transition hover:border-[var(--border-hover)] md:hidden"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls={panelId}
            aria-label={open ? t("closeMenu") : t("openMenu")}
          >
            {open ? (
              <svg
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
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
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
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
            className="fixed inset-0 top-16 z-40 bg-[var(--overlay-scrim)] backdrop-blur-[2px] md:hidden"
            aria-hidden
            tabIndex={-1}
            onClick={close}
          />
          <div
            id={panelId}
            className="fixed inset-x-0 top-16 z-50 max-h-[calc(100dvh-4rem)] overflow-y-auto border-b border-[var(--border-subtle)] bg-[var(--bg-elevated)] shadow-[var(--shadow-panel)] backdrop-blur-xl md:hidden"
            role="dialog"
            aria-modal="true"
            aria-label={t("siteNavigation")}
          >
            <nav className="mx-auto max-w-[1280px] px-4 py-4 sm:px-6">
              {mobileGroups.map((group) => (
                <div key={group.labelKey} className="mb-4 last:mb-0">
                  <p className="px-4 pb-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--text-muted)]">
                    {t(group.labelKey)}
                  </p>
                  <ul className="space-y-0.5">
                    {group.links.map((l) => (
                      <li key={l.href}>
                        <Link
                          href={l.href}
                          className="block rounded-xl px-4 py-3 text-base font-medium text-[var(--text-secondary)] transition hover:bg-[var(--bg-elevated)] hover:text-[var(--text-primary)]"
                          onClick={close}
                        >
                          {t(l.labelKey)}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}

              <p className="mt-2 px-4 pb-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--text-muted)]">
                {t("groupConnect")}
              </p>
              <Link
                href="/#contact"
                className="block rounded-xl px-4 py-3 text-base font-medium text-[var(--text-secondary)] transition hover:bg-[var(--bg-elevated)] hover:text-[var(--text-primary)]"
                onClick={close}
              >
                {t("contact")}
              </Link>

              <BookCallLink
                className="btn-primary inline-flex h-12 w-full items-center justify-center px-4 text-base"
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
