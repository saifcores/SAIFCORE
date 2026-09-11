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

/**
 * Dual-audience primary path (studio-sparse):
 * About · Case studies · Ways to work · Insights
 * Experience / Contact / CV live in mobile extras + CTAs.
 */
function buildPrimaryNav(locale: "en" | "fr"): NavItem[] {
  const blogIndexUrl = getBlogIndexUrl(locale);
  return [
    { href: "/about", labelKey: "about" },
    { href: "/systems", labelKey: "systems" },
    { href: "/#offers", labelKey: "offers" },
    blogIndexUrl
      ? { href: blogIndexUrl, labelKey: "insights", external: true }
      : { href: "/articles", labelKey: "insights" },
  ];
}

function buildMobileExtraNav(): NavItem[] {
  return [
    { href: "/experience", labelKey: "experience" },
    { href: "/#contact", labelKey: "contact" },
  ];
}

const homeHashSections = [
  "paths",
  "work",
  "experience",
  "offers",
  "insights",
  "faq",
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
  const pathOnly = href.split("#")[0] || href;
  return pathname === pathOnly || pathname.startsWith(`${pathOnly}/`);
}

function navLinkClass(active: boolean): string {
  return active
    ? "shrink-0 px-3 py-2 text-sm font-medium text-[var(--text-primary)]"
    : "shrink-0 px-3 py-2 text-sm text-[var(--text-secondary)] transition-colors duration-300 hover:text-[var(--text-primary)]";
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
  const primaryNav = useMemo(() => buildPrimaryNav(loc), [loc]);
  const extraNav = useMemo(() => buildMobileExtraNav(), []);

  const [activeHomeSection, setActiveHomeSection] =
    useState<HomeHashSection | null>(null);
  const navHomeSection = isHome ? activeHomeSection : null;

  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const panelId = useId();
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  const close = useCallback((restoreFocus = false) => {
    setOpen(false);
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
      className={`sticky top-0 z-50 border-b border-[var(--border-subtle)] backdrop-blur-sm transition-colors duration-300 ${
        scrolled ? "bg-[var(--bg-base)]/80" : "bg-[var(--bg-base)]/80"
      }`}
    >
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between gap-1.5 px-3 min-[380px]:gap-2 min-[380px]:px-4 sm:h-16 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="flex min-w-0 items-center gap-2 text-[var(--text-primary)] transition-opacity duration-300 hover:opacity-80 min-[380px]:gap-2.5"
          onClick={() => close(false)}
          aria-label={t("brandHomeLabel")}
        >
          <Image
            src="/profile.png"
            alt=""
            width={80}
            height={80}
            className="h-8 w-8 shrink-0 rounded-[10px] object-cover ring-1 ring-[var(--border-subtle)] sm:h-9 sm:w-9"
            priority
            sizes="36px"
          />
          <span className="min-w-0 truncate text-sm font-semibold tracking-tight text-[var(--text-primary)]">
            SAIFCORE
          </span>
        </Link>

        <nav
          className="hidden min-w-0 items-center gap-1 lg:flex"
          aria-label={t("primary")}
        >
          {primaryNav.map((l) =>
            l.external ? (
              <a
                key={l.href}
                href={l.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${t(l.labelKey)} (${opensInNewTab})`}
                className={navLinkClass(false)}
              >
                {t(l.labelKey)}
              </a>
            ) : (
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
            ),
          )}
        </nav>

        <div className="flex shrink-0 items-center gap-1 sm:gap-2">
          <LocaleSwitcher
            navLabel={t("language")}
            labels={{ en: t("localeEn"), fr: t("localeFr") }}
          />
          <div className="hidden min-[400px]:block">
            <ThemeToggle />
          </div>
          <BookCallLink className="btn-primary hidden h-10 items-center justify-center gap-1.5 px-4 text-sm lg:inline-flex">
            {t("bookCall")}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden
            >
              <path d="M7 7h10v10" />
              <path d="M7 17 17 7" />
            </svg>
          </BookCallLink>
          <button
            ref={menuButtonRef}
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-[12px] text-[var(--text-secondary)] transition-all duration-300 hover:bg-[var(--bg-elevated)] hover:text-[var(--text-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus-ring)] lg:hidden"
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
            className="fixed inset-0 top-14 z-40 bg-[var(--overlay-scrim)] backdrop-blur-[2px] sm:top-16 lg:hidden"
            aria-hidden
            tabIndex={-1}
            onClick={() => close(true)}
          />
          <div
            ref={panelRef}
            id={panelId}
            className="fixed inset-x-0 top-14 z-50 max-h-[calc(100dvh-3.5rem)] overflow-y-auto overscroll-contain border-b border-[var(--border-subtle)] bg-[var(--bg-elevated)] pb-[max(1rem,env(safe-area-inset-bottom))] shadow-[var(--shadow-panel)] backdrop-blur-xl sm:top-16 sm:max-h-[calc(100dvh-4rem)] lg:hidden"
            role="dialog"
            aria-modal="true"
            aria-label={t("siteNavigation")}
          >
            <nav className="mx-auto max-w-7xl px-3 py-4 sm:px-6">
              <ul className="space-y-0.5">
                {primaryNav.map((l) => (
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
                {extraNav.map((l) => (
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
                        className="block rounded-xl px-4 py-3.5 text-base font-medium text-[var(--text-secondary)] transition hover:bg-[var(--bg-elevated)] hover:text-[var(--text-primary)] min-[420px]:py-3"
                        onClick={() => close(false)}
                      >
                        {t(l.labelKey)}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>

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
