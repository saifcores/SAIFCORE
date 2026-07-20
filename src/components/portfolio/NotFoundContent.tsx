import type { Locale } from "next-intl";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";

type Props = {
  locale: Locale;
};

/** Shared 404 copy and actions — safe inside `NextIntlClientProvider`. */
export async function NotFoundContent({ locale }: Props) {
  const t = await getTranslations({ locale, namespace: "notFound" });
  const tNav = await getTranslations({ locale, namespace: "nav" });

  return (
    <div className="relative w-full max-w-md text-center">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--text-muted)]">
        {t("kicker")}
      </p>
      <h1 className="mt-3 text-pretty text-3xl font-bold tracking-tight text-[var(--text-primary)] sm:text-4xl">
        {t("title")}
      </h1>
      <p className="mt-4 text-pretty leading-relaxed text-[var(--text-secondary)]">
        {t("description")}
      </p>
      <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:justify-center">
        <Link
          href="/"
          className="btn-primary inline-flex h-12 items-center justify-center px-8 text-sm"
        >
          {t("backHome")}
        </Link>
        <Link
          href="/#contact"
          className="btn-outline inline-flex h-12 items-center justify-center rounded-xl px-8 text-sm font-semibold"
        >
          {t("contact")}
        </Link>
      </div>
      <nav
        aria-label={t("exploreLabel")}
        className="mt-8 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-sm"
      >
        <Link
          href="/experience"
          className="inline-flex min-h-11 items-center font-medium text-[var(--text-muted)] transition hover:text-[var(--text-primary)]"
        >
          {tNav("experience")}
        </Link>
        <Link
          href="/systems"
          className="inline-flex min-h-11 items-center font-medium text-[var(--text-muted)] transition hover:text-[var(--text-primary)]"
        >
          {tNav("systems")}
        </Link>
        <Link
          href="/about"
          className="inline-flex min-h-11 items-center font-medium text-[var(--text-muted)] transition hover:text-[var(--text-primary)]"
        >
          {tNav("about")}
        </Link>
      </nav>
    </div>
  );
}
