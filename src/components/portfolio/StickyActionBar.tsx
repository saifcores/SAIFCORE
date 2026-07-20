"use client";

import { useLocale, useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import {
  getResumeDownloadFilename,
  getResumeUrl,
  isLocalResume,
} from "@/server/resume";
import { BookCallLink } from "./BookCallLink";

/**
 * Mobile: after scroll, keep recruiter CV + client booking one tap away.
 */
export function StickyActionBar() {
  const t = useTranslations("actionBar");
  const locale = useLocale();
  const [visible, setVisible] = useState(false);
  const resumeUrl = getResumeUrl(locale);
  const resumeDownload = getResumeDownloadFilename(locale);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 320);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const barLabel = resumeUrl
    ? `${t("resume")} · ${t("bookCall")}`
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
      <div className="mx-auto flex max-w-[1280px] gap-2 px-3 sm:px-4">
        {resumeUrl ? (
          <a
            href={resumeUrl}
            className="btn-outline inline-flex min-h-12 min-w-0 flex-1 items-center justify-center rounded-xl bg-[var(--bg-elevated)]/80 px-2 text-xs font-semibold sm:px-3 sm:text-sm"
            {...(isLocalResume(resumeUrl)
              ? { download: resumeDownload }
              : { target: "_blank", rel: "noopener noreferrer" })}
          >
            {t("resume")}
          </a>
        ) : null}
        <BookCallLink className="btn-primary inline-flex min-h-12 min-w-0 flex-1 items-center justify-center px-2 text-xs sm:px-3 sm:text-sm">
          {t("bookCall")}
        </BookCallLink>
      </div>
    </div>
  );
}
