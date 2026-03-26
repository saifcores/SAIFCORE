import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { SystemDiagram } from "./SystemDiagram";

export async function Hero() {
  const t = await getTranslations("hero");

  return (
    <section className="relative overflow-hidden border-b border-[var(--border-subtle)] px-4 pb-24 pt-16 sm:px-6 sm:pb-32 sm:pt-20 lg:px-8">
      <div className="bg-grid pointer-events-none absolute inset-0 opacity-40" />
      <div
        className="pointer-events-none absolute -left-1/4 top-0 h-[520px] w-[80%] rounded-full bg-gradient-to-br from-indigo-600/25 via-blue-500/15 to-transparent blur-3xl animate-float-glow"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-1/4 bottom-0 h-[400px] w-[60%] rounded-full bg-gradient-to-tl from-cyan-500/15 via-purple-500/10 to-transparent blur-3xl animate-float-glow"
        style={{ animationDelay: "-4s" }}
        aria-hidden
      />
      <SystemDiagram />

      <div className="relative mx-auto max-w-[1280px]">
        <p className="mb-6 inline-flex items-center gap-2 rounded-full border border-[var(--border-subtle)] bg-[var(--bg-elevated)]/40 px-4 py-1.5 text-xs font-medium uppercase tracking-widest text-[var(--text-muted)] backdrop-blur-sm">
          <span
            className="h-1.5 w-1.5 rounded-full bg-gradient-to-r from-cyan-400 to-indigo-400"
            aria-hidden
          />
          {t("badge")}
        </p>
        <h1 className="max-w-4xl text-balance text-4xl font-bold tracking-tight text-[var(--text-primary)] sm:text-5xl lg:text-[3.5rem] lg:leading-[1.08]">
          {t("titleBefore")}{" "}
          <span className="text-gradient">{t("titleHighlight")}</span>
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-[var(--text-secondary)] sm:text-xl">
          {t("subtitle")}
        </p>
        <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
          <Link
            href="/#contact"
            className="inline-flex h-12 items-center justify-center rounded-2xl bg-gradient-to-r from-[#2563eb] to-[#6366f1] px-8 text-base font-semibold text-white shadow-lg shadow-indigo-500/30 transition hover:brightness-110 hover:shadow-indigo-500/45 active:scale-[0.98]"
          >
            {t("ctaPrimary")}
          </Link>
          <Link
            href="/#work"
            className="inline-flex h-12 items-center justify-center rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-elevated)]/50 px-8 text-base font-semibold text-[var(--text-primary)] backdrop-blur-sm transition hover:border-[var(--accent-indigo)]/35 hover:bg-[var(--bg-elevated)] active:scale-[0.98]"
          >
            {t("ctaSecondary")}
          </Link>
        </div>
      </div>
    </section>
  );
}
