import { getLocale, getTranslations } from "next-intl/server";
import { getPathname } from "@/i18n/navigation";
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

const PROJECT_NAMESPACES = new Set<Namespace>([
  "systemsPage",
  "collaboratePage",
  "expertisePage",
  "labPage",
  "insights",
  "articlesPage",
  "caseStudyEcom360",
  "caseStudyPaymentDisasterLab",
  "caseStudyDoubleEntryLedger",
]);

export async function ContactBridgeStrip({ ns }: Props) {
  const t = await getTranslations(ns);
  const locale = await getLocale();
  const contactPath = getPathname({
    href: "/contact",
    locale: locale === "fr" ? "fr" : "en",
  });
  const intent = PROJECT_NAMESPACES.has(ns)
    ? "freelance"
    : ns === "experiencePage"
      ? "hiring"
      : null;
  const href = intent ? `${contactPath}?intent=${intent}` : contactPath;

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
          <a
            href={href}
            className="btn-primary inline-flex h-12 w-full shrink-0 items-center justify-center px-8 text-sm sm:min-w-[200px] sm:w-auto"
          >
            {t("endCtaButton")}
          </a>
        </div>
      </Reveal>
    </section>
  );
}
