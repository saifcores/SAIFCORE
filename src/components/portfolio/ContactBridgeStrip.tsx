import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Reveal } from "./Reveal";

type Namespace =
  | "articlesPage"
  | "insights"
  | "systemsPage"
  | "experiencePage"
  | "aboutPage"
  | "collaboratePage"
  | "certificationsPage"
  | "expertisePage"
  | "labPage"
  | "caseStudyEcom360"
  | "caseStudyPaymentDisasterLab"
  | "caseStudyDoubleEntryLedger";

type Props = {
  ns: Namespace;
};

export async function ContactBridgeStrip({ ns }: Props) {
  const t = await getTranslations(ns);

  return (
    <section
      className="relative overflow-hidden rounded-[16px] border border-[var(--border-subtle)] bg-[var(--bg-elevated)] px-5 py-8 shadow-[var(--shadow-card)] sm:px-10 sm:py-10"
      aria-labelledby={`contact-bridge-${ns}`}
    >
      <div
        className="absolute inset-y-0 left-0 w-[3px] bg-[var(--accent)]"
        aria-hidden
      />
      <Reveal>
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="max-w-[640px]">
            <h2
              id={`contact-bridge-${ns}`}
              className="font-display text-pretty text-lg font-medium tracking-tight text-[var(--text-primary)] sm:text-xl md:text-2xl"
            >
              {t("endCtaTitle")}
            </h2>
            <p className="mt-2 text-pretty text-sm leading-relaxed text-[var(--text-secondary)] sm:text-base">
              {t("endCtaSubtitle")}
            </p>
          </div>
          <Link
            href="/contact"
            className="btn-primary inline-flex h-12 w-full shrink-0 items-center justify-center px-8 text-sm sm:min-w-[200px] sm:w-auto"
          >
            {t("endCtaButton")}
          </Link>
        </div>
      </Reveal>
    </section>
  );
}
