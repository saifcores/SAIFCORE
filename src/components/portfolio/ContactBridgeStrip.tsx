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
  | "certificationsPage";

export async function ContactBridgeStrip({ ns }: { ns: Namespace }) {
  const t = await getTranslations(ns);
  const tNav = await getTranslations("nav");
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
      className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-elevated)]/20 px-4 py-10 sm:px-10 sm:py-14"
      aria-labelledby={`contact-bridge-${ns}`}
    >
      <Reveal>
        <div className="mx-auto max-w-[680px] text-center">
          <h2
            id={`contact-bridge-${ns}`}
            className="text-pretty text-lg font-bold tracking-tight text-[var(--text-primary)] sm:text-xl md:text-2xl"
          >
            {t("endCtaTitle")}
          </h2>
          <p className="mt-3 text-pretty text-sm leading-relaxed text-[var(--text-secondary)] sm:text-base">
            {t("endCtaSubtitle")}
          </p>
          <div className="mt-6 flex flex-col items-stretch gap-2.5 sm:mt-8 sm:flex-row sm:flex-wrap sm:items-center sm:justify-center sm:gap-3">
            <Link
              href="/#contact"
              className="btn-primary btn-primary-lg inline-flex h-12 w-full items-center justify-center px-8 text-sm sm:min-w-[200px] sm:w-auto"
            >
              {t("endCtaButton")}
            </Link>
            <BookCallLink className="btn-outline inline-flex h-12 w-full items-center justify-center rounded-xl px-6 text-sm font-semibold sm:w-auto">
              {tNav("bookCall")}
            </BookCallLink>
            {resumeUrl && resumeProps ? (
              <a
                href={resumeUrl}
                className="btn-outline inline-flex h-12 w-full items-center justify-center rounded-xl px-6 text-sm font-semibold sm:w-auto"
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
