import { getLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import {
  getResumeDownloadFilename,
  getResumeUrl,
  isLocalResume,
} from "@/server/resume";
import { BookCallLink } from "./BookCallLink";
import { Reveal } from "./Reveal";

type Props = {
  namespace: "experiencePage" | "systemsPage";
};

/**
 * Compact dual-audience CTA between proof content and depth sections.
 */
export async function MidPageCta({ namespace }: Props) {
  const t = await getTranslations(namespace);
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
    <section className="border-b border-[var(--border-subtle)] px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
      <div className="mx-auto max-w-[1280px]">
        <Reveal>
          <div className="flex flex-col gap-4 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-elevated)]/15 px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6">
            <div className="min-w-0">
              <p className="text-sm font-semibold text-[var(--text-primary)]">
                {t("midCtaTitle")}
              </p>
              <p className="mt-1 text-sm text-[var(--text-secondary)]">
                {t("midCtaSubtitle")}
              </p>
            </div>
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
              {namespace === "experiencePage" && resumeUrl && resumeProps ? (
                <a
                  href={resumeUrl}
                  className="btn-primary inline-flex min-h-11 items-center justify-center px-5 text-sm"
                  {...resumeProps}
                >
                  {tNav("resume")}
                </a>
              ) : (
                <BookCallLink className="btn-primary inline-flex min-h-11 items-center justify-center px-5 text-sm">
                  {tNav("bookCall")}
                </BookCallLink>
              )}
              <Link
                href="/#offers"
                className="btn-outline inline-flex min-h-11 items-center justify-center rounded-xl px-5 text-sm font-semibold"
              >
                {t("midCtaSecondary")}
              </Link>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
