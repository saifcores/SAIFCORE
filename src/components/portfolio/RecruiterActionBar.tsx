import { getLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { getLinkedinUrl } from "@/site";
import {
  getResumeDownloadFilename,
  getResumeUrl,
  isLocalResume,
} from "@/server/resume";

export type ActionBarVariant = "recruiter" | "client" | "balanced";

type Props = {
  className?: string;
  /**
   * recruiter — CV + LinkedIn (experience / certs)
   * client — Contact + CV (consulting is not offered on this site)
   * balanced — Contact + CV (about)
   */
  variant?: ActionBarVariant;
};

export async function RecruiterActionBar({
  className = "",
  variant = "balanced",
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
      {variant === "recruiter" && resumeUrl && resumeProps ? (
        <a
          href={resumeUrl}
          className="btn-primary inline-flex min-h-11 w-full items-center justify-center px-5 text-sm xs:w-auto"
          {...resumeProps}
        >
          {t("downloadCv")}
        </a>
      ) : null}

      {variant === "recruiter" && linkedinUrl ? (
        <a
          href={linkedinUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-outline inline-flex min-h-11 w-full items-center justify-center rounded-xl px-5 text-sm font-semibold xs:w-auto"
        >
          {t("linkedin")}
        </a>
      ) : null}

      {variant === "client" ? (
        <>
          <Link
            href="/contact"
            className="btn-primary inline-flex min-h-11 w-full items-center justify-center px-5 text-sm xs:w-auto"
          >
            {tNav("contact")}
          </Link>
          {resumeUrl && resumeProps ? (
            <a
              href={resumeUrl}
              className="btn-outline inline-flex min-h-11 w-full items-center justify-center rounded-xl px-5 text-sm font-semibold xs:w-auto"
              {...resumeProps}
            >
              {tNav("resume")}
            </a>
          ) : null}
        </>
      ) : null}

      {variant === "balanced" ? (
        <>
          <Link
            href="/contact"
            className="btn-primary inline-flex min-h-11 w-full items-center justify-center px-5 text-sm xs:w-auto"
          >
            {tNav("contact")}
          </Link>
          {resumeUrl && resumeProps ? (
            <a
              href={resumeUrl}
              className="btn-outline inline-flex min-h-11 w-full items-center justify-center rounded-xl px-5 text-sm font-semibold xs:w-auto"
              {...resumeProps}
            >
              {tNav("resume")}
            </a>
          ) : null}
        </>
      ) : null}
    </div>
  );
}
