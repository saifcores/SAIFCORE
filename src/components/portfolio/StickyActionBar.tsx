"use client";

import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { Link } from "@/i18n/navigation";
import { BookCallLink } from "./BookCallLink";

/**
 * Mobile: after scroll — Packages (clients), Book a call.
 * CV stays in the navbar so the bar stays freelance-first.
 */
export function StickyActionBar() {
  const t = useTranslations("actionBar");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 320);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const barLabel = `${t("packages")} · ${t("bookCall")}`;

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
        <Link
          href="/#offers"
          className="btn-outline inline-flex min-h-12 min-w-0 flex-1 items-center justify-center rounded-xl bg-[var(--bg-elevated)]/80 px-1.5 text-[11px] font-semibold sm:px-3 sm:text-sm"
        >
          {t("packages")}
        </Link>
        <BookCallLink className="btn-primary inline-flex min-h-12 min-w-0 flex-1 items-center justify-center px-1.5 text-[11px] sm:px-3 sm:text-sm">
          {t("bookCall")}
        </BookCallLink>
      </div>
    </div>
  );
}
