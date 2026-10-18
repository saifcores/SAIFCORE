"use client";

import { useLocale } from "next-intl";
import { getPathname, usePathname } from "@/i18n/navigation";
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
      className="flex h-8 overflow-hidden rounded-md border border-[var(--border-subtle)] font-mono text-xs"
      role="group"
      aria-label={navLabel}
    >
      {routing.locales.map((loc) => {
        const active = loc === locale;
        const href = getPathname({
          locale: loc,
          href: pathname,
          forcePrefix: true,
        });
        return (
          <a
            key={loc}
            href={href}
            lang={loc}
            aria-pressed={active}
            aria-current={active ? "page" : undefined}
            className={`inline-flex h-full items-center px-2.5 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[var(--focus-ring)] ${
              active
                ? "bg-[var(--bg-card)] text-[var(--text-primary)]"
                : "bg-transparent text-[var(--text-muted)] hover:text-[var(--text-primary)]"
            }`}
            onClick={(event) => {
              const suffix = `${window.location.search}${window.location.hash}`;
              if (!suffix) return;
              event.preventDefault();
              window.location.assign(`${href}${suffix}`);
            }}
          >
            {loc === "en" ? labels.en : labels.fr}
          </a>
        );
      })}
    </div>
  );
}
