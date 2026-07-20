"use client";

import { useTranslations } from "next-intl";
import { ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";

export function BackToTop() {
  const t = useTranslations("common");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 640);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label={t("backToTop")}
      className={`fixed right-4 z-40 flex h-11 w-11 items-center justify-center rounded-full border border-[var(--border-subtle)] bg-[var(--bg-elevated)]/90 text-[var(--text-secondary)] shadow-[var(--shadow-panel)] backdrop-blur-xl transition-[transform,opacity] duration-300 hover:border-[var(--border-hover)] hover:text-[var(--text-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/40 xl:right-6 ${
        visible
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-4 opacity-0"
      } bottom-[calc(5.5rem+env(safe-area-inset-bottom))] xl:bottom-6`}
    >
      <ArrowUp className="h-5 w-5" strokeWidth={2} aria-hidden />
    </button>
  );
}
