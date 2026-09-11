"use client";

import { useEffect, useState } from "react";
import { useLocale } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";

type Props = {
  labels: { en: string; fr: string };
  navLabel: string;
};

/**
 * Locale toggle that keeps the current path, query, and hash
 * (e.g. /#offers → /fr#offers).
 */
export function LocaleSwitcher({ labels, navLabel }: Props) {
  const pathname = usePathname();
  const locale = useLocale();
  const [suffix, setSuffix] = useState("");

  useEffect(() => {
    const sync = () => {
      setSuffix(`${window.location.search}${window.location.hash}`);
    };
    sync();
    window.addEventListener("hashchange", sync);
    window.addEventListener("popstate", sync);
    return () => {
      window.removeEventListener("hashchange", sync);
      window.removeEventListener("popstate", sync);
    };
  }, [pathname]);

  return (
    <div
      className="flex shrink-0 items-center gap-0.5 rounded-[12px] border border-[var(--border-subtle)] bg-[var(--bg-elevated)]/50 p-0.5 text-[10px] font-medium sm:gap-1 sm:text-xs"
      role="navigation"
      aria-label={navLabel}
    >
      {routing.locales.map((loc) => {
        const active = loc === locale;
        const href = `${pathname}${suffix}`;
        return (
          <Link
            key={loc}
            // Hash/query are appended for in-page anchors across locales.
            href={href as typeof pathname}
            locale={loc}
            className={`inline-flex min-h-10 items-center rounded-lg px-1.5 py-1.5 transition min-[380px]:min-h-11 min-[380px]:px-2 min-[380px]:py-2 sm:px-2.5 sm:py-1.5 ${
              active
                ? "bg-[var(--bg-elevated)] text-[var(--text-primary)] shadow-[var(--shadow-card)] ring-1 ring-[var(--border-subtle)]"
                : "text-[var(--text-muted)] hover:bg-[var(--bg-elevated)]/60 hover:text-[var(--text-primary)]"
            }`}
            hrefLang={loc}
            aria-current={active ? "page" : undefined}
            lang={loc}
          >
            {loc === "en" ? labels.en : labels.fr}
          </Link>
        );
      })}
    </div>
  );
}
