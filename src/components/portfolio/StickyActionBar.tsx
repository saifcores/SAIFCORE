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
        <BookCallLink className="btn-primary inline-flex min-h-12 min-w-0 flex-1 items-center justify-center px-3 text-sm">
          {t("bookCall")}
        </BookCallLink>
        <Link
          href="/#contact"
          className="btn-outline inline-flex min-h-12 min-w-0 flex-1 items-center justify-center rounded-xl bg-[var(--bg-elevated)]/80 px-3 text-sm font-semibold"
        >
          {t("contact")}
        </Link>
      </div>
    </div>
  );
}
