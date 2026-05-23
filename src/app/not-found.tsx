import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";

export default async function GlobalNotFound() {
  const t = await getTranslations({
    locale: routing.defaultLocale,
    namespace: "notFound",
  });

  return (
    <div className="relative flex min-h-[70vh] flex-col items-center justify-center overflow-hidden px-4 py-16">
      <div className="bg-grid pointer-events-none absolute inset-0 opacity-30" />
      <div className="relative w-full max-w-md text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--text-muted)]">
          {t("kicker")}
        </p>
        <h1 className="mt-3 text-3xl font-bold tracking-tight text-[var(--text-primary)] sm:text-4xl">
          {t("title")}
        </h1>
        <p className="mt-4 text-[var(--text-secondary)] leading-relaxed">
          {t("description")}
        </p>
        <div className="mt-10 flex justify-center">
          <Link
            href="/"
            className="btn-primary inline-flex h-12 items-center justify-center rounded-2xl px-8 text-base"
          >
            {t("backHome")}
          </Link>
        </div>
      </div>
    </div>
  );
}
