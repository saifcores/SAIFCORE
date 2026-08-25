"use client";

import { useLocale, useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { BookCallLink } from "./BookCallLink";
import {
  getResumeDownloadFilename,
  getResumeUrl,
  isLocalResume,
} from "@/server/resume";

/**
 * Mobile: after scroll — Book a call (clients) and CV (recruiters).
 * Packages live in the primary nav.
 */
export function StickyActionBar() {
  const t = useTranslations("actionBar");
  const locale = useLocale();
  const [visible, setVisible] = useState(false);
  const resumeUrl = getResumeUrl(locale);
  const resumeDownload = getResumeDownloadFilename(locale);
  const resumeProps = resumeUrl
    ? isLocalResume(resumeUrl)
      ? { download: resumeDownload }
      : ({ target: "_blank" as const, rel: "noopener noreferrer" } as const)
    : null;

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 320);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const barLabel = resumeUrl
    ? `${t("bookCall")} · ${t("resume")}`
    : t("bookCall");

  return (
    <div
      role="region"
      aria-label={barLabel}
      className={`fixed inset-x-0 bottom-0 z-40 border-t border-[var(--border-subtle)] bg-[var(--bg-base)]/95 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-2 backdrop-blur-xl transition-transform duration-300 xl:hidden ${
        visible ? "translate-y-0" : "translate-y-full"
      }`}
      aria-hidden={!visible}
    >
      <div className="mx-auto flex max-w-[1280px] gap-1.5 px-3 sm:gap-2 sm:px-4">
        {resumeUrl && resumeProps ? (
          <a
            href={resumeUrl}
            className="btn-outline inline-flex min-h-12 min-w-0 flex-1 items-center justify-center rounded-xl bg-[var(--bg-elevated)]/80 px-1.5 text-[11px] font-semibold sm:px-3 sm:text-sm"
            {...resumeProps}
          >
            {t("resume")}
          </a>
        ) : null}
        <BookCallLink className="btn-primary inline-flex min-h-12 min-w-0 flex-1 items-center justify-center px-1.5 text-[11px] sm:px-3 sm:text-sm">
          {t("bookCall")}
        </BookCallLink>
      </div>
    </div>
  );
}
