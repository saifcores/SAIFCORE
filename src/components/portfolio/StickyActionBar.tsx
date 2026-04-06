"use client";

import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { Link } from "@/i18n/navigation";
import { BookCallLink } from "./BookCallLink";

/**
 * Mobile: appears after scroll so the primary conversion stays one tap away
 * without covering the hero.
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

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-40 border-t border-[var(--border-subtle)] bg-[var(--bg-base)]/95 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-2 backdrop-blur-xl transition-transform duration-300 md:hidden ${
        visible ? "translate-y-0" : "translate-y-full"
      }`}
      aria-hidden={!visible}
    >
      <div className="mx-auto flex max-w-[1280px] gap-2 px-4">
        <BookCallLink className="inline-flex min-h-12 min-w-0 flex-1 items-center justify-center rounded-xl bg-gradient-to-r from-[#2563eb] to-[#6366f1] px-3 text-sm font-semibold text-white shadow-lg shadow-indigo-500/25 transition hover:brightness-110 active:scale-[0.98]">
          {t("bookCall")}
        </BookCallLink>
        <Link
          href="/#contact"
          className="inline-flex min-h-12 min-w-0 flex-1 items-center justify-center rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-elevated)]/80 px-3 text-sm font-semibold text-[var(--text-primary)] transition hover:border-[var(--accent-indigo)]/35 active:scale-[0.98]"
        >
          {t("contact")}
        </Link>
      </div>
    </div>
  );
}
