"use client";

import { useTranslations, useLocale } from "next-intl";
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
import { getBlogIndexUrl } from "@/site";
import {
  getResumeDownloadFilename,
  getResumeUrl,
  isLocalResume,
} from "@/server/resume";
import { LocaleSwitcher } from "./LocaleSwitcher";
import { ThemeToggle } from "./ThemeToggle";

type NavItem = {
  href: string;
  labelKey: NavPrimaryLinkKey;
  external?: boolean;
};

function writingNavItem(locale: "en" | "fr"): NavItem {
  const blogIndexUrl = getBlogIndexUrl(locale);
  return blogIndexUrl
    ? { href: blogIndexUrl, labelKey: "insights", external: true }
    : { href: "/articles", labelKey: "insights" };
}

/**
 * Projects · Expertise · Experience · Lab · About
 * Contact is the header CTA. Writing lives in the mobile menu and footer.
 */
function buildDesktopNav(): NavItem[] {
  return [
    { href: "/systems", labelKey: "systems" },
    { href: "/expertise", labelKey: "expertise" },
    { href: "/experience", labelKey: "experience" },
    { href: "/lab", labelKey: "lab" },
    { href: "/about", labelKey: "about" },
  ];
}

function buildMobileNav(locale: "en" | "fr"): NavItem[] {
  return [
    ...buildDesktopNav(),
    writingNavItem(locale),
    { href: "/contact", labelKey: "contact" },
  ];
}

function isNavItemActive(pathname: string, href: string): boolean {
  const pathOnly = href.split("#")[0] || href;
  return pathname === pathOnly || pathname.startsWith(`${pathOnly}/`);
}

function navLinkClass(active: boolean): string {
  return active
    ? "nav-link shrink-0 rounded-md px-2.5 py-1.5 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus-ring)]"
    : "nav-link shrink-0 rounded-md px-2.5 py-1.5 text-sm text-[var(--text-muted)] transition-colors hover:bg-[var(--bg-card)]/60 hover:text-[var(--text-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus-ring)]";
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
  const desktopNav = useMemo(() => buildDesktopNav(), []);
  const mobileNav = useMemo(() => buildMobileNav(loc), [loc]);

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
    onScroll();
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

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        close(true);
        return;
      }
      if (event.key !== "Tab") return;

      const panel = panelRef.current;
      if (!panel) return;

      const panelItems = [
        ...panel.querySelectorAll<HTMLElement>(
          "a[href], button:not([disabled])",
        ),
      ].filter((el) => el.tabIndex !== -1);
      const items = [
        ...(menuButtonRef.current ? [menuButtonRef.current] : []),
        ...panelItems,
      ];
      if (items.length === 0) return;

      const index = items.indexOf(document.activeElement as HTMLElement);
      const first = items[0];
      const last = items[items.length - 1];

      if (event.shiftKey) {
        if (index <= 0) {
          event.preventDefault();
          last.focus();
        }
        return;
      }

      if (index === -1 || index === items.length - 1) {
        event.preventDefault();
        first.focus();
      }
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
    <header className="site-header sticky top-0 z-50" data-scrolled={scrolled}>
      <div className="page-container flex flex-wrap items-center gap-3 py-3 sm:gap-4 sm:py-3.5">
        <Link
          href="/"
          className="flex items-center gap-2.5 text-base font-semibold tracking-tight text-[var(--text-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus-ring)]"
          onClick={() => close(false)}
          aria-label={t("brandHomeLabel")}
        >
          <span
            className="grid h-[22px] w-[22px] place-items-center rounded-md border-[1.5px] border-[var(--accent)]"
            aria-hidden
          >
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
          </span>
          <span>
            SAIF<span className="text-[var(--accent)]">CORE</span>
          </span>
        </Link>

        <nav
          className="hidden min-w-0 flex-1 flex-wrap items-center gap-1 lg:flex"
          aria-label={t("primary")}
        >
          {desktopNav.map((l) =>
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
                className={navLinkClass(isNavItemActive(pathname, l.href))}
                data-active={isNavItemActive(pathname, l.href) || undefined}
                aria-current={
                  isNavItemActive(pathname, l.href) ? "page" : undefined
                }
              >
                {t(l.labelKey)}
              </Link>
            ),
          )}
        </nav>

        <div className="ml-auto flex shrink-0 items-center gap-2">
          <LocaleSwitcher
            navLabel={t("language")}
            labels={{ en: t("localeEn"), fr: t("localeFr") }}
          />
          <ThemeToggle />
          {resumeUrl && resumeLinkProps ? (
            <a
              href={resumeUrl}
              className="btn-outline hidden h-8 items-center justify-center px-3 text-[13px] lg:inline-flex"
              {...resumeLinkProps}
            >
              {t("resume")}
            </a>
          ) : null}
          <Link
            href="/contact"
            className="btn-primary hidden h-8 items-center justify-center px-3.5 text-[13px] md:inline-flex"
          >
            {t("contact")}
          </Link>
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
            className="fixed inset-0 top-[3.25rem] z-40 bg-[var(--overlay-scrim)] backdrop-blur-[2px] sm:top-14 lg:hidden"
            aria-label={t("closeMenu")}
            tabIndex={-1}
            onClick={() => close(true)}
          />
          <div
            ref={panelRef}
            id={panelId}
            className="fixed inset-x-0 top-[3.25rem] z-50 max-h-[calc(100dvh-3.25rem)] overflow-y-auto overscroll-contain border-b border-[var(--border-subtle)] bg-[var(--bg-elevated)] pb-[max(1rem,env(safe-area-inset-bottom))] shadow-[var(--shadow-panel)] backdrop-blur-xl sm:top-14 sm:max-h-[calc(100dvh-3.5rem)] lg:hidden"
            role="dialog"
            aria-modal="true"
            aria-label={t("siteNavigation")}
          >
            <nav className="page-container py-4">
              <ul className="space-y-0.5">
                {mobileNav.map((l) => (
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
                        className={`block rounded-xl px-4 py-3.5 text-base font-medium transition hover:bg-[color-mix(in_srgb,var(--accent)_8%,transparent)] hover:text-[var(--text-primary)] min-[420px]:py-3 ${
                          isNavItemActive(pathname, l.href)
                            ? "border-l-2 border-[var(--accent)] bg-[color-mix(in_srgb,var(--accent)_10%,transparent)] pl-[14px] text-[var(--text-primary)]"
                            : "text-[var(--text-secondary)]"
                        }`}
                        aria-current={
                          isNavItemActive(pathname, l.href) ? "page" : undefined
                        }
                        onClick={() => close(false)}
                      >
                        {t(l.labelKey)}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>

              <div className="mt-5 grid grid-cols-1 gap-2 sm:grid-cols-2">
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
                <Link
                  href="/contact"
                  className={`btn-primary inline-flex min-h-12 w-full items-center justify-center px-4 text-base sm:text-sm ${
                    resumeUrl ? "" : "sm:col-span-2"
                  }`}
                  onClick={() => close(false)}
                >
                  {t("contact")}
                </Link>
              </div>
            </nav>
          </div>
        </>
      ) : null}
    </header>
  );
}
