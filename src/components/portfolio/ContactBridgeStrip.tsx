import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Reveal } from "./Reveal";

type Namespace = "articlesPage" | "insights";

export async function ContactBridgeStrip({ ns }: { ns: Namespace }) {
  const t = await getTranslations(ns);

  return (
    <section
      className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-elevated)]/20 px-6 py-12 sm:px-10 sm:py-14"
      aria-labelledby={`contact-bridge-${ns}`}
    >
      <Reveal>
        <div className="mx-auto max-w-[680px] text-center">
          <h2
            id={`contact-bridge-${ns}`}
            className="text-xl font-bold tracking-tight text-[var(--text-primary)] sm:text-2xl"
          >
            {t("endCtaTitle")}
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-[var(--text-secondary)] sm:text-base">
            {t("endCtaSubtitle")}
          </p>
          <Link
            href="/#contact"
            className="mt-8 inline-flex h-12 min-w-[200px] items-center justify-center rounded-xl bg-gradient-to-r from-[#2563EB] to-[#10B981] px-8 text-sm font-semibold text-white shadow-[0_0_32px_-8px_rgba(37,99,235,0.45)] transition hover:brightness-110 active:scale-[0.98]"
          >
            {t("endCtaButton")}
          </Link>
        </div>
      </Reveal>
    </section>
  );
}
