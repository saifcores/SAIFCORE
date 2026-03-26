"use client";

import { useLocale } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";

type Props = {
  labels: { en: string; fr: string };
  navLabel: string;
};

export function LocaleSwitcher({ labels, navLabel }: Props) {
  const pathname = usePathname();
  const locale = useLocale();

  return (
    <div
      className="flex items-center gap-1 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-elevated)]/50 p-0.5 text-xs font-medium"
      role="navigation"
      aria-label={navLabel}
    >
      {routing.locales.map((loc) => {
        const active = loc === locale;
        return (
          <Link
            key={loc}
            href={pathname}
            locale={loc}
            className={`rounded-lg px-2.5 py-1.5 transition ${
              active
                ? "bg-[var(--bg-base)] text-[var(--text-primary)] shadow-sm"
                : "text-[var(--text-muted)] hover:text-[var(--text-primary)]"
            }`}
            hrefLang={loc}
          >
            {loc === "en" ? labels.en : labels.fr}
          </Link>
        );
      })}
    </div>
  );
}
