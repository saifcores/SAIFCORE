"use client";

import { useTranslations, useLocale } from "next-intl";
import Image from "next/image";
import {
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from "react";
import { Link, usePathname } from "@/i18n/navigation";
import type { NavPrimaryLinkKey } from "@/types/messages";
import { hasObtainedCertifications } from "@/data/certifications";
import { getBlogIndexUrl, getGithubUrl, getLinkedinUrl } from "@/site";
import {
  getResumeDownloadFilename,
  getResumeUrl,
  isLocalResume,
} from "@/server/resume";
import { BookCallLink } from "./BookCallLink";
import { LocaleSwitcher } from "./LocaleSwitcher";
import { ThemeToggle } from "./ThemeToggle";

type NavItem = {
  href: string;
  labelKey: NavPrimaryLinkKey;
  external?: boolean;
};

const showCredentialsNav = hasObtainedCertifications();

function insightsNavItems(locale: "en" | "fr"): NavItem[] {
  const blogUrl = getBlogIndexUrl(locale);
  if (blogUrl) {
    return [
      { href: "/#insights", labelKey: "insights" },
      { href: blogUrl, labelKey: "blog", external: true },
    ];
  }
  return [{ href: "/articles", labelKey: "insights" }];
}

function navWithoutCredentials(items: NavItem[]): NavItem[] {
  return showCredentialsNav
    ? items
    : items.filter((item) => item.labelKey !== "credentials");
}

/**
 * Recruiter / client primary path — full pages first so decision-makers
 * land on scannable profiles, not mid-page anchors.
 */
const primaryNav: NavItem[] = [
  { href: "/experience", labelKey: "experience" },
  { href: "/systems", labelKey: "systems" },
  { href: "/#services", labelKey: "services" },
  { href: "/about", labelKey: "about" },
  { href: "/#contact", labelKey: "contact" },
];

const homeHashSections = [
  "experience",
  "work",
  "services",
  "expertise",
  "certifications",
  "process",
  "insights",
  "contact",
] as const;
type HomeHashSection = (typeof homeHashSections)[number];

function isNavItemActive(
  pathname: string,
  href: string,
  activeHomeSection: HomeHashSection | null,
): boolean {
  if (href.startsWith("/#")) {
    if (pathname !== "/") return false;
    const section = href.slice(2) as HomeHashSection;
    return activeHomeSection === section;
  }
  return pathname === href || pathname.startsWith(`${href}/`);
}

function navLinkClass(active: boolean): string {
  return active
    ? "shrink-0 rounded-lg bg-[var(--bg-elevated)]/80 px-2 py-1.5 text-[11px] font-semibold text-[var(--text-primary)] ring-1 ring-[var(--border-subtle)] xl:px-2.5 xl:text-xs 2xl:px-3 2xl:text-sm"
    : "shrink-0 rounded-lg px-2 py-1.5 text-[11px] font-medium text-[var(--text-muted)] transition hover:bg-[var(--bg-elevated)]/60 hover:text-[var(--text-primary)] xl:px-2.5 xl:text-xs 2xl:px-3 2xl:text-sm";
}

export function Navbar() {
  const t = useTranslations("nav");
  const tCommon = useTranslations("common");
  const locale = useLocale();
  const pathname = usePathname();
  const loc = locale === "fr" ? "fr" : "en";
  const opensInNewTab = tCommon("opensInNewTab");
  const resumeUrl = getResumeUrl(locale);
  const resumeDownload = getResumeDownloadFilename(locale);
  const linkedinUrl = getLinkedinUrl();
  const githubUrl = getGithubUrl();
  const isHome = pathname === "/";

  const [activeHomeSection, setActiveHomeSection] =
    useState<HomeHashSection | null>(null);
  const navHomeSection = isHome ? activeHomeSection : null;

  const moreNav = useMemo(
    () =>
      navWithoutCredentials([
        { href: "/#work", labelKey: "work" },
        { href: "/#expertise", labelKey: "expertise" },
        { href: "/#certifications", labelKey: "credentials" },
        { href: "/#process", labelKey: "process" },
        ...insightsNavItems(loc),
      ]),
    [loc],
  );

  const mobilePriorityNav = useMemo(
    (): NavItem[] => [
      { href: "/experience", labelKey: "experience" },
      { href: "/systems", labelKey: "systems" },
      { href: "/#services", labelKey: "services" },
      { href: "/about", labelKey: "about" },
      { href: "/#contact", labelKey: "contact" },
    ],
    [],
  );

  const mobileMoreNav = useMemo(
    () =>
      navWithoutCredentials([
        { href: "/#work", labelKey: "work" },
        { href: "/#expertise", labelKey: "expertise" },
        { href: "/#certifications", labelKey: "credentials" },
        { href: "/#process", labelKey: "process" },
        ...insightsNavItems(loc),
      ]),
    [loc],
  );

  const [open, setOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const panelId = useId();
  const moreRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  const close = useCallback((restoreFocus = false) => {
    setOpen(false);
    setMoreOpen(false);
    if (restoreFocus) {
      menuButtonRef.current?.focus();
    }
  }, []);

  useEffect(() => {
    if (!open) return;
    const frame = requestAnimationFrame(() => {
      panelRef.current
        ?.querySelector<HTMLElement>("nav a, nav button")
        ?.focus();
    });
    return () => cancelAnimationFrame(frame);
  }, [open]);

  useEffect(() => {
    setOpen(false);
    setMoreOpen(false);
  }, [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!isHome) return;

    const syncFromHash = () => {
      const hash = window.location.hash.slice(1);
      if (homeHashSections.includes(hash as HomeHashSection)) {
        setActiveHomeSection(hash as HomeHashSection);
      } else if (!hash) {
        setActiveHomeSection(null);
      }
    };

    syncFromHash();
    window.addEventListener("hashchange", syncFromHash);

    const elements = homeHashSections
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => !!el);

    if (!elements.length) {
      return () => window.removeEventListener("hashchange", syncFromHash);
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible[0]?.target.id) {
          setActiveHomeSection(visible[0].target.id as HomeHashSection);
        } else if (window.scrollY < 160) {
          setActiveHomeSection(null);
        }
      },
      { rootMargin: "-35% 0px -50% 0px", threshold: [0, 0.2, 0.45] },
    );

    elements.forEach((el) => observer.observe(el));

    return () => {
      observer.disconnect();
      window.removeEventListener("hashchange", syncFromHash);
    };
  }, [isHome]);

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
      if (e.key === "Escape") close(true);
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

  const resumeLinkProps = resumeUrl
    ? isLocalResume(resumeUrl)
      ? { download: resumeDownload }
      : ({
          target: "_blank" as const,
          rel: "noopener noreferrer",
        } as const)
    : null;

  return (
    <header
      className={`sticky top-0 z-50 border-b border-[var(--border-subtle)] backdrop-blur-xl backdrop-saturate-150 transition-colors duration-200 ${
        scrolled ? "bg-[var(--bg-base)]/90" : "bg-[var(--bg-base)]/60"
      }`}
    >
      <div className="mx-auto flex h-14 max-w-[1280px] items-center justify-between gap-2 px-3 sm:h-16 sm:gap-3 sm:px-6 xl:px-8">
        <Link
          href="/"
          className="flex min-w-0 items-center gap-2.5 text-[var(--text-primary)] transition hover:opacity-90"
          onClick={() => close(false)}
          aria-label={t("brandHomeLabel")}
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
          <span className="min-w-0">
            <span className="block text-sm font-bold tracking-tight">
              <span className="text-[var(--text-primary)]">SAIF</span>
              <span className="text-gradient">CORE</span>
            </span>
            <span className="mt-0.5 hidden max-w-[9rem] truncate text-[10px] font-medium tracking-wide text-[var(--text-muted)] xl:block">
              {t("brandRole")}
            </span>
          </span>
        </Link>

        <nav
          className="hidden min-w-0 items-center gap-0.5 xl:flex 2xl:gap-1"
          aria-label={t("primary")}
        >
          {primaryNav.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={navLinkClass(
                isNavItemActive(pathname, l.href, navHomeSection),
              )}
              aria-current={
                isNavItemActive(pathname, l.href, navHomeSection)
                  ? "page"
                  : undefined
              }
            >
              {t(l.labelKey)}
            </Link>
          ))}

          {moreNav.length > 0 ? (
            <div ref={moreRef} className="relative">
              <button
                type="button"
                className="inline-flex items-center gap-1 rounded-lg px-2.5 py-1.5 text-xs font-medium text-[var(--text-muted)] transition hover:bg-[var(--bg-elevated)]/60 hover:text-[var(--text-primary)] xl:px-3 xl:text-sm"
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
                  className="absolute right-0 top-full z-50 mt-2 min-w-[200px] rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-elevated)] py-1.5 shadow-[var(--shadow-dropdown)] backdrop-blur-xl"
                  role="menu"
                >
                  <p className="px-4 pb-1 pt-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-[var(--text-muted)]">
                    {t("groupMore")}
                  </p>
                  {moreNav.map((l) =>
                    l.external ? (
                      <a
                        key={l.href}
                        href={l.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        role="menuitem"
                        aria-label={`${t(l.labelKey)} (${opensInNewTab})`}
                        className="block px-4 py-2.5 text-sm font-medium text-[var(--text-secondary)] transition hover:bg-[var(--bg-elevated)] hover:text-[var(--text-primary)]"
                        onClick={() => setMoreOpen(false)}
                      >
                        {t(l.labelKey)}
                      </a>
                    ) : (
                      <Link
                        key={l.href}
                        href={l.href}
                        role="menuitem"
                        className={`block px-4 py-2.5 text-sm font-medium transition hover:bg-[var(--bg-elevated)] hover:text-[var(--text-primary)] ${
                          isNavItemActive(pathname, l.href, navHomeSection)
                            ? "bg-[var(--bg-elevated)]/80 text-[var(--text-primary)]"
                            : "text-[var(--text-secondary)]"
                        }`}
                        aria-current={
                          isNavItemActive(pathname, l.href, navHomeSection)
                            ? "page"
                            : undefined
                        }
                        onClick={() => setMoreOpen(false)}
                      >
                        {t(l.labelKey)}
                      </Link>
                    ),
                  )}
                </div>
              ) : null}
            </div>
          ) : null}
        </nav>

        <div className="flex shrink-0 items-center gap-1 sm:gap-1.5 xl:gap-2">
          <LocaleSwitcher
            navLabel={t("language")}
            labels={{ en: t("localeEn"), fr: t("localeFr") }}
          />
          <div className="hidden min-[400px]:block">
            <ThemeToggle />
          </div>
          {linkedinUrl ? (
            <a
              href={linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden h-9 w-9 items-center justify-center rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-elevated)]/50 text-[var(--text-secondary)] transition hover:border-[var(--border-hover)] hover:text-[var(--text-primary)] xl:inline-flex"
              aria-label={`${t("linkedin")} (${opensInNewTab})`}
            >
              <svg
                className="h-4 w-4"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden
              >
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 114.126 0 2.062 2.062 0 01-2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </a>
          ) : null}
          {githubUrl ? (
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden h-9 w-9 items-center justify-center rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-elevated)]/50 text-[var(--text-secondary)] transition hover:border-[var(--border-hover)] hover:text-[var(--text-primary)] xl:inline-flex"
              aria-label={`${t("github")} (${opensInNewTab})`}
            >
              <svg
                className="h-4 w-4"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden
              >
                <path d="M12 0C5.37 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.82-.26.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.108-.775.418-1.305.762-1.606-2.665-.303-5.466-1.332-5.466-5.93 0-1.31.468-2.38 1.236-3.22-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23a11.5 11.5 0 013.003-.404c1.019.005 2.047.138 3.003.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.652.242 2.873.118 3.176.77.84 1.235 1.91 1.235 3.22 0 4.61-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222 0 1.606-.015 2.896-.015 3.286 0 .315.216.694.825.576C20.565 21.796 24 17.299 24 12 24 5.373 18.627 0 12 0z" />
              </svg>
            </a>
          ) : null}
          {resumeUrl && resumeLinkProps ? (
            <a
              href={resumeUrl}
              className="btn-outline hidden h-9 items-center justify-center rounded-xl px-3 text-xs font-semibold xl:inline-flex 2xl:px-3.5 2xl:text-sm"
              {...resumeLinkProps}
            >
              {t("resume")}
            </a>
          ) : null}
          <BookCallLink className="btn-primary hidden h-9 items-center justify-center px-3 text-xs xl:inline-flex 2xl:px-4 2xl:text-sm">
            {t("bookCall")}
          </BookCallLink>
          <button
            ref={menuButtonRef}
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-elevated)]/50 text-[var(--text-primary)] transition hover:border-[var(--border-hover)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/40 xl:hidden"
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
            className="fixed inset-0 top-14 z-40 bg-[var(--overlay-scrim)] backdrop-blur-[2px] sm:top-16 xl:hidden"
            aria-hidden
            tabIndex={-1}
            onClick={() => close(true)}
          />
          <div
            ref={panelRef}
            id={panelId}
            className="fixed inset-x-0 top-14 z-50 max-h-[calc(100dvh-3.5rem)] overflow-y-auto overscroll-contain border-b border-[var(--border-subtle)] bg-[var(--bg-elevated)] pb-[max(1rem,env(safe-area-inset-bottom))] shadow-[var(--shadow-panel)] backdrop-blur-xl sm:top-16 sm:max-h-[calc(100dvh-4rem)] xl:hidden"
            role="dialog"
            aria-modal="true"
            aria-label={t("siteNavigation")}
          >
            <nav className="mx-auto max-w-[1280px] px-3 py-4 sm:px-6">
              <p className="px-4 pb-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--text-muted)]">
                {t("groupPriority")}
              </p>
              <ul className="space-y-0.5">
                {mobilePriorityNav.map((l) => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      className={`block rounded-xl px-4 py-3.5 text-base font-medium transition hover:bg-[var(--bg-elevated)] hover:text-[var(--text-primary)] min-[420px]:py-3 ${
                        isNavItemActive(pathname, l.href, navHomeSection)
                          ? "bg-[var(--bg-elevated)]/80 text-[var(--text-primary)] ring-1 ring-[var(--border-subtle)]"
                          : "text-[var(--text-secondary)]"
                      }`}
                      aria-current={
                        isNavItemActive(pathname, l.href, navHomeSection)
                          ? "page"
                          : undefined
                      }
                      onClick={() => close(false)}
                    >
                      {t(l.labelKey)}
                    </Link>
                  </li>
                ))}
              </ul>

              {mobileMoreNav.length > 0 ? (
                <div className="mt-4">
                  <p className="px-4 pb-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--text-muted)]">
                    {t("groupMore")}
                  </p>
                  <ul className="space-y-0.5">
                    {mobileMoreNav.map((l) => (
                      <li key={l.href}>
                        {l.external ? (
                          <a
                            href={l.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`${t(l.labelKey)} (${opensInNewTab})`}
                            className="block rounded-xl px-4 py-3.5 text-base font-medium text-[var(--text-secondary)] transition hover:bg-[var(--bg-elevated)] hover:text-[var(--text-primary)] min-[420px]:py-3"
                            onClick={() => close(false)}
                          >
                            {t(l.labelKey)}
                          </a>
                        ) : (
                          <Link
                            href={l.href}
                            className={`block rounded-xl px-4 py-3.5 text-base font-medium transition hover:bg-[var(--bg-elevated)] hover:text-[var(--text-primary)] min-[420px]:py-3 ${
                              isNavItemActive(pathname, l.href, navHomeSection)
                                ? "bg-[var(--bg-elevated)]/80 text-[var(--text-primary)] ring-1 ring-[var(--border-subtle)]"
                                : "text-[var(--text-secondary)]"
                            }`}
                            aria-current={
                              isNavItemActive(pathname, l.href, navHomeSection)
                                ? "page"
                                : undefined
                            }
                            onClick={() => close(false)}
                          >
                            {t(l.labelKey)}
                          </Link>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}

              <div className="mt-5 border-t border-[var(--border-subtle)] pt-4 min-[400px]:hidden">
                <ThemeToggle />
              </div>

              <div className="mt-5 grid grid-cols-1 gap-2 sm:grid-cols-2">
                {linkedinUrl ? (
                  <a
                    href={linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-outline inline-flex min-h-12 w-full items-center justify-center rounded-xl px-4 text-base font-semibold sm:text-sm"
                    aria-label={`${t("linkedin")} (${opensInNewTab})`}
                    onClick={() => close(false)}
                  >
                    {t("linkedin")}
                  </a>
                ) : null}
                {githubUrl ? (
                  <a
                    href={githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-outline inline-flex min-h-12 w-full items-center justify-center rounded-xl px-4 text-base font-semibold sm:text-sm"
                    aria-label={`${t("github")} (${opensInNewTab})`}
                    onClick={() => close(false)}
                  >
                    {t("github")}
                  </a>
                ) : null}
                {resumeUrl && resumeLinkProps ? (
                  <a
                    href={resumeUrl}
                    className="btn-outline inline-flex min-h-12 w-full items-center justify-center rounded-xl px-4 text-base font-semibold sm:text-sm"
                    onClick={() => close(false)}
                    {...resumeLinkProps}
                  >
                    {t("resume")}
                  </a>
                ) : null}
                <BookCallLink
                  className={`btn-primary inline-flex min-h-12 w-full items-center justify-center px-4 text-base sm:text-sm ${
                    linkedinUrl && resumeUrl ? "sm:col-span-2" : ""
                  }`}
                  onClick={() => close(false)}
                >
                  {t("bookCall")}
                </BookCallLink>
              </div>
            </nav>
          </div>
        </>
      ) : null}
    </header>
  );
}
