"use client";

import { useLocale, useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { Link } from "@/i18n/navigation";
import {
  getResumeDownloadFilename,
  getResumeUrl,
  isLocalResume,
} from "@/server/resume";

/**
 * Mobile / tablet: after scroll — architecture sprint + CV.
 * Hides near the contact section and on xl+ (desktop CTAs cover it).
 */
export function StickyActionBar() {
  const t = useTranslations("actionBar");
  const locale = useLocale();
  const [visible, setVisible] = useState(false);
  const [nearContact, setNearContact] = useState(false);
  const resumeUrl = getResumeUrl(locale);
  const resumeDownload = getResumeDownloadFilename(locale);
  const resumeProps = resumeUrl
    ? isLocalResume(resumeUrl)
      ? { download: resumeDownload }
      : ({ target: "_blank" as const, rel: "noopener noreferrer" } as const)
    : null;

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 280);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const contact = document.getElementById("contact");
    if (!contact) return;

    const observer = new IntersectionObserver(
      ([entry]) => setNearContact(entry.isIntersecting),
      { rootMargin: "0px 0px -20% 0px", threshold: 0.15 },
    );
    observer.observe(contact);
    return () => observer.disconnect();
  }, []);

  const show = visible && !nearContact;
  const barLabel = resumeUrl ? `${t("sprint")} · ${t("resume")}` : t("sprint");

  return (
    <div
      role="region"
      aria-label={barLabel}
      className={`fixed inset-x-0 bottom-0 z-40 border-t border-[var(--border-subtle)] bg-[var(--bg-base)]/95 pb-[max(0.625rem,env(safe-area-inset-bottom))] pt-2 backdrop-blur-sm transition-transform duration-300 xl:hidden ${
        show ? "translate-y-0" : "translate-y-full"
      }`}
      aria-hidden={!show}
    >
      <div className="mx-auto flex max-w-7xl gap-2 px-3 min-[400px]:gap-2.5 min-[400px]:px-4">
        {resumeUrl && resumeProps ? (
          <a
            href={resumeUrl}
            className="btn-outline inline-flex min-h-11 min-w-0 flex-1 items-center justify-center px-2.5 text-sm font-medium min-[400px]:min-h-12 min-[400px]:px-3"
            {...resumeProps}
          >
            {t("resume")}
          </a>
        ) : null}
        <Link
          href="/#architecture-sprint"
          className="btn-primary inline-flex min-h-11 min-w-0 flex-[1.15] items-center justify-center px-2.5 text-sm min-[400px]:min-h-12 min-[400px]:px-3"
        >
          {t("sprint")}
        </Link>
      </div>
    </div>
  );
}
