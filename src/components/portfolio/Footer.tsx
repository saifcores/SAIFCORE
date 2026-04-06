import { getTranslations } from "next-intl/server";
import { getGithubUrl, getLinkedinUrl } from "@/site";
import { getResumeUrl, isLocalResume } from "@/server/resume";

export async function Footer() {
  const t = await getTranslations("footer");
  const year = new Date().getFullYear();
  const resumeUrl = getResumeUrl();

  return (
    <footer className="border-t border-[var(--border-subtle)] px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-[1280px] flex-col items-center justify-between gap-6 sm:flex-row">
        <p className="text-sm text-[var(--text-muted)]">
          {t("rights", { year })}
        </p>
        <div className="flex flex-wrap items-center justify-center gap-6">
          <a
            href={getLinkedinUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-[var(--text-secondary)] transition hover:text-[var(--text-primary)]"
          >
            {t("linkedin")}
          </a>
          <a
            href={getGithubUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-[var(--text-secondary)] transition hover:text-[var(--text-primary)]"
          >
            {t("github")}
          </a>
          {resumeUrl ? (
            <a
              href={resumeUrl}
              className="text-sm font-medium text-[var(--text-secondary)] transition hover:text-[var(--text-primary)]"
              {...(isLocalResume(resumeUrl)
                ? { download: "SAIFCORE-resume.pdf" }
                : { target: "_blank", rel: "noopener noreferrer" })}
            >
              {t("resume")}
            </a>
          ) : null}
        </div>
      </div>
    </footer>
  );
}
