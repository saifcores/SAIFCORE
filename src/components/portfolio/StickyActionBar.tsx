"use client";

import { useLocale, useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { Link, usePathname } from "@/i18n/navigation";
import {
  getResumeDownloadFilename,
  getResumeUrl,
  isLocalResume,
} from "@/server/resume";

/**
 * Mobile / tablet: after 40% of the page — CV + contact.
 * Hides near the contact section and on xl+ (desktop CTAs cover it).
 */
export function StickyActionBar() {
  const t = useTranslations("actionBar");
  const locale = useLocale();
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);
  const [nearContact, setNearContact] = useState(false);
  const isContactPage = pathname === "/contact";
  const resumeUrl = getResumeUrl(locale);
  const resumeDownload = getResumeDownloadFilename(locale);
  const resumeProps = resumeUrl
    ? isLocalResume(resumeUrl)
      ? { download: resumeDownload }
      : ({ target: "_blank" as const, rel: "noopener noreferrer" } as const)
    : null;

  useEffect(() => {
    const onScroll = () => {
      const doc = document.documentElement;
      const scrollable = Math.max(doc.scrollHeight - window.innerHeight, 1);
      setVisible(window.scrollY > scrollable * 0.28);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
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

  const show = visible && !nearContact && !isContactPage;
  const barLabel = resumeUrl
    ? `${t("contact")} · ${t("resume")}`
    : t("contact");

  return (
    <div
      role="region"
      aria-label={barLabel}
      className={`fixed inset-x-0 bottom-0 z-40 border-t border-[var(--border-subtle)] bg-[var(--bg-base)]/90 pb-[max(0.625rem,env(safe-area-inset-bottom))] pt-2 shadow-[0_-12px_32px_rgba(0,0,0,0.18)] backdrop-blur-xl transition-transform duration-300 xl:hidden ${
        show ? "translate-y-0" : "translate-y-full"
      }`}
      aria-hidden={!show}
    >
      <div className="page-container flex gap-2 min-[400px]:gap-2.5">
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
          href="/contact"
          className="btn-primary inline-flex min-h-11 min-w-0 flex-[1.15] items-center justify-center px-2.5 text-sm min-[400px]:min-h-12 min-[400px]:px-3"
        >
          {t("contact")}
        </Link>
      </div>
    </div>
  );
}
