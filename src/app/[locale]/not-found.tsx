import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";

export default async function NotFound() {
  const t = await getTranslations({
    locale: routing.defaultLocale,
    namespace: "notFound",
  });

  return (
    <div className="relative flex min-h-[70vh] flex-col items-center justify-center overflow-hidden px-4 py-16">
      <div className="bg-grid pointer-events-none absolute inset-0 opacity-40" />
      <div
        className="ambient-glow pointer-events-none absolute -top-24 left-1/2 h-72 w-[min(90vw,480px)] -translate-x-1/2 rounded-full bg-gradient-to-br from-blue-600/20 via-blue-500/8 to-transparent blur-3xl"
        aria-hidden
      />

      <div className="relative w-full max-w-md text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--text-muted)]">
          {t("kicker")}
        </p>
        <h1 className="mt-3 text-3xl font-bold tracking-tight text-[var(--text-primary)] sm:text-4xl">
          {t("title")}
        </h1>
        <p className="mt-4 leading-relaxed text-[var(--text-secondary)]">
          {t("description")}
        </p>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link
            href="/"
            className="inline-flex h-12 items-center justify-center rounded-xl bg-gradient-to-r from-[#2563EB] to-[#10B981] px-8 text-sm font-semibold text-white shadow-[0_0_24px_-6px_rgba(37,99,235,0.45)] transition hover:brightness-110 active:scale-[0.98]"
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
      </div>
    </div>
  );
}
