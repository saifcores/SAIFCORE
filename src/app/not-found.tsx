import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { routing } from "@/i18n/routing";

/**
 * Root-level 404 — rendered outside the `[locale]` layout (no i18n provider).
 * Localized 404s use `[locale]/not-found.tsx` with full site chrome.
 */
export default async function GlobalNotFound() {
  const t = await getTranslations({
    locale: routing.defaultLocale,
    namespace: "notFound",
  });

  return (
    <div className="relative flex min-h-[70vh] flex-col items-center justify-center overflow-hidden bg-[var(--bg-base)] px-4 py-16 text-[var(--text-primary)]">
      <div className="relative w-full max-w-md text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--text-muted)]">
          {t("kicker")}
        </p>
        <h1 className="mt-3 font-display text-pretty text-3xl font-medium tracking-tight sm:text-4xl">
          {t("title")}
        </h1>
        <p className="mt-4 text-pretty leading-relaxed text-[var(--text-secondary)]">
          {t("description")}
        </p>
        <div className="mt-10 flex justify-center">
          <Link
            href="/"
            className="btn-primary inline-flex h-12 items-center justify-center px-8 text-sm"
          >
            {t("backHome")}
          </Link>
        </div>
      </div>
    </div>
  );
}
