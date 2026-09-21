import { getLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import {
  getResumeDownloadFilename,
  getResumeUrl,
  isLocalResume,
} from "@/server/resume";
import { BookCallLink } from "./BookCallLink";
import { Reveal } from "./Reveal";

type Namespace =
  | "articlesPage"
  | "insights"
  | "systemsPage"
  | "experiencePage"
  | "aboutPage"
  | "certificationsPage"
  | "caseStudyEcom360"
  | "caseStudyPaymentDisasterLab"
  | "caseStudyDoubleEntryLedger";

type Props = {
  ns: Namespace;
  /** Show a link to freelance packages (client-oriented pages). */
  showPackages?: boolean;
  /** Client pages close on the architecture sprint; hiring pages stay on contact. */
  primaryHref?: "/#contact" | "/#architecture-sprint";
};

export async function ContactBridgeStrip({
  ns,
  showPackages = false,
  primaryHref = "/#contact",
}: Props) {
  const t = await getTranslations(ns);
  const tNav = await getTranslations("nav");
  const tHeader = await getTranslations("pageHeader");
  const locale = await getLocale();
  const resumeUrl = getResumeUrl(locale);
  const resumeDownload = getResumeDownloadFilename(locale);
  const resumeProps = resumeUrl
    ? isLocalResume(resumeUrl)
      ? { download: resumeDownload }
      : ({ target: "_blank" as const, rel: "noopener noreferrer" } as const)
    : null;

  return (
    <section
      className="rounded-[16px] border border-[var(--border-subtle)] bg-[var(--bg-elevated)]/25 px-5 py-10 sm:px-10 sm:py-12"
      aria-labelledby={`contact-bridge-${ns}`}
    >
      <Reveal>
        <div className="mx-auto max-w-[680px] text-center">
          <h2
            id={`contact-bridge-${ns}`}
            className="font-display text-pretty text-lg font-medium tracking-tight text-[var(--text-primary)] sm:text-xl md:text-2xl"
          >
            {t("endCtaTitle")}
          </h2>
          <p className="mt-3 text-pretty text-sm leading-relaxed text-[var(--text-secondary)] sm:text-base">
            {t("endCtaSubtitle")}
          </p>
          <div className="mt-6 flex flex-col items-stretch gap-2.5 sm:mt-8 sm:flex-row sm:flex-wrap sm:items-center sm:justify-center sm:gap-3">
            <Link
              href={primaryHref}
              className="btn-primary btn-primary-lg inline-flex h-12 w-full items-center justify-center px-8 text-sm sm:min-w-[200px] sm:w-auto"
            >
              {t("endCtaButton")}
            </Link>
            <BookCallLink className="btn-outline inline-flex h-12 w-full items-center justify-center px-6 text-sm font-medium sm:w-auto">
              {tNav("bookCall")}
            </BookCallLink>
            {showPackages ? (
              <Link
                href="/#offers"
                className="btn-outline inline-flex h-12 w-full items-center justify-center px-6 text-sm font-medium sm:w-auto"
              >
                {tHeader("seePackages")}
              </Link>
            ) : null}
            {resumeUrl && resumeProps ? (
              <a
                href={resumeUrl}
                className="btn-outline inline-flex h-12 w-full items-center justify-center px-6 text-sm font-medium sm:w-auto"
                {...resumeProps}
              >
                {tNav("resume")}
              </a>
            ) : null}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
