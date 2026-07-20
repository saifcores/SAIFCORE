import { getLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { getLinkedinUrl } from "@/site";
import {
  getResumeDownloadFilename,
  getResumeUrl,
  isLocalResume,
} from "@/server/resume";
import { BookCallLink } from "./BookCallLink";

type Props = {
  className?: string;
  /** Hide the text contact link (e.g. on article reading pages). */
  hideContactLink?: boolean;
};

export async function RecruiterActionBar({
  className = "",
  hideContactLink = false,
}: Props) {
  const t = await getTranslations("pageHeader");
  const tNav = await getTranslations("nav");
  const locale = await getLocale();
  const resumeUrl = getResumeUrl(locale);
  const resumeDownload = getResumeDownloadFilename(locale);
  const linkedinUrl = getLinkedinUrl();

  const resumeProps = resumeUrl
    ? isLocalResume(resumeUrl)
      ? { download: resumeDownload }
      : ({ target: "_blank" as const, rel: "noopener noreferrer" } as const)
    : null;

  return (
    <div
      className={`grid grid-cols-1 gap-2.5 xs:grid-cols-2 sm:flex sm:flex-wrap sm:items-center sm:gap-3 ${className}`}
    >
      {resumeUrl && resumeProps ? (
        <a
          href={resumeUrl}
          className="btn-primary inline-flex min-h-11 w-full items-center justify-center px-5 text-sm xs:w-auto"
          {...resumeProps}
        >
          {tNav("resume")}
        </a>
      ) : null}
      <BookCallLink className="btn-outline inline-flex min-h-11 w-full items-center justify-center rounded-xl px-5 text-sm font-semibold xs:w-auto">
        {tNav("bookCall")}
      </BookCallLink>
      {linkedinUrl ? (
        <a
          href={linkedinUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-outline inline-flex min-h-11 w-full items-center justify-center rounded-xl px-5 text-sm font-semibold xs:w-auto"
        >
          {t("linkedin")}
        </a>
      ) : null}
      {hideContactLink ? null : (
        <Link
          href="/#contact"
          className="inline-flex min-h-11 w-full items-center justify-center px-2 text-sm font-semibold text-[var(--text-secondary)] underline decoration-white/15 underline-offset-4 transition hover:text-[var(--text-primary)] hover:decoration-white/35 xs:col-span-2 xs:w-auto sm:col-span-1"
        >
          {tNav("contact")}
        </Link>
      )}
    </div>
  );
}
