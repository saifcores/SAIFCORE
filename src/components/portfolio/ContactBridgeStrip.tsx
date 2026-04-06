import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Reveal } from "./Reveal";

type Namespace = "articlesPage" | "insights";

/**
 * Shared “next step” strip toward `#contact` — keeps conversion paths on inner pages.
 */
export async function ContactBridgeStrip({ ns }: { ns: Namespace }) {
  const t = await getTranslations(ns);

  return (
    <section
      className="rounded-[24px] border border-[var(--border-subtle)] bg-gradient-to-br from-indigo-600/10 via-[var(--bg-base)]/40 to-cyan-500/5 px-4 py-12 sm:px-8 sm:py-14"
      aria-labelledby={`contact-bridge-${ns}`}
    >
      <Reveal>
        <div className="mx-auto max-w-[720px] text-center">
          <h2
            id={`contact-bridge-${ns}`}
            className="text-xl font-semibold tracking-tight text-[var(--text-primary)] sm:text-2xl"
          >
            {t("endCtaTitle")}
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-[var(--text-secondary)] sm:text-base">
            {t("endCtaSubtitle")}
          </p>
          <Link
            href="/#contact"
            className="mt-6 inline-flex h-12 min-w-[200px] items-center justify-center rounded-2xl bg-gradient-to-r from-[#2563eb] to-[#6366f1] px-8 text-sm font-semibold text-white shadow-lg shadow-indigo-500/25 transition hover:brightness-110 active:scale-[0.98]"
          >
            {t("endCtaButton")}
          </Link>
        </div>
      </Reveal>
    </section>
  );
}
