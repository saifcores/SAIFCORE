import { getLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import type { SitePath } from "@/seo";
import {
  getBlogIndexUrl,
  getGithubUrl,
  getLinkedinUrl,
  getProfileDisplayName,
} from "@/site";
import {
  getResumeUrl,
  getResumeDownloadFilename,
  isLocalResume,
} from "@/server/resume";

export async function Footer() {
  const t = await getTranslations("footer");
  const tCommon = await getTranslations("common");
  const locale = await getLocale();
  const loc = locale === "fr" ? "fr" : "en";
  const year = new Date().getFullYear();
  const resumeUrl = getResumeUrl(locale);
  const resumeDownload = getResumeDownloadFilename(locale);
  const profileName = getProfileDisplayName();
  const blogIndexUrl = getBlogIndexUrl(loc);
  const linkedinUrl = getLinkedinUrl();
  const githubUrl = getGithubUrl();
  const opensInNewTab = tCommon("opensInNewTab");
  const ownerLabel =
    profileName !== "SAIFCORE"
      ? t("rightsOwner", { name: profileName })
      : "SAIFCORE";

  const explore: { href: SitePath; label: string }[] = [
    { href: "/systems", label: t("systems") },
    { href: "/expertise", label: t("expertise") },
    { href: "/lab", label: t("lab") },
    { href: "/experience", label: t("experience") },
    { href: "/about", label: t("about") },
  ];

  return (
    <footer className="border-t border-[var(--border-subtle)]">
      <div className="page-container grid gap-10 py-12 lg:grid-cols-[minmax(0,1.2fr)_repeat(2,minmax(0,1fr))]">
        <div className="flex max-w-sm flex-col gap-3 text-[13px] text-[var(--text-muted)]">
          <span className="text-base font-semibold text-[var(--text-primary)]">
            SAIF<span className="text-[var(--accent)]">CORE</span>
          </span>
          <span>{t("tagline")}</span>
          <Link
            href="/contact"
            className="link-more w-fit text-[var(--text-primary)]"
            data-arrow
          >
            {t("contact")}
          </Link>
          <span>
            {t("rights", { year, owner: ownerLabel })}{" "}
            <span aria-hidden>·</span>{" "}
            <Link
              href="/license"
              className="rounded-sm hover:text-[var(--text-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus-ring)]"
            >
              {t("license")}
            </Link>
          </span>
        </div>

        <nav aria-label={t("pagesLabel")}>
          <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.08em] text-[var(--text-muted)]">
            {t("pagesLabel")}
          </p>
          <ul className="flex flex-col gap-2 text-[13px] text-[var(--text-muted)]">
            {explore.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="rounded-sm hover:text-[var(--text-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus-ring)]"
                >
                  {item.label}
                </Link>
              </li>
            ))}
            {blogIndexUrl ? (
              <li>
                <a
                  href={blogIndexUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${t("blog")} (${opensInNewTab})`}
                  className="rounded-sm hover:text-[var(--text-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus-ring)]"
                >
                  {t("insights")}
                </a>
              </li>
            ) : (
              <li>
                <Link
                  href="/articles"
                  className="rounded-sm hover:text-[var(--text-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus-ring)]"
                >
                  {t("articles")}
                </Link>
              </li>
            )}
          </ul>
        </nav>

        <nav aria-label={t("connectLabel")}>
          <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.08em] text-[var(--text-muted)]">
            {t("connectLabel")}
          </p>
          <ul className="flex flex-col gap-2 text-[13px] text-[var(--text-muted)]">
            <li>
              <Link
                href="/contact"
                className="rounded-sm hover:text-[var(--text-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus-ring)]"
              >
                {t("contact")}
              </Link>
            </li>
            {linkedinUrl ? (
              <li>
                <a
                  href={linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${t("linkedin")} (${opensInNewTab})`}
                  className="rounded-sm hover:text-[var(--text-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus-ring)]"
                >
                  LinkedIn
                </a>
              </li>
            ) : null}
            {githubUrl ? (
              <li>
                <a
                  href={githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${t("github")} (${opensInNewTab})`}
                  className="rounded-sm hover:text-[var(--text-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus-ring)]"
                >
                  GitHub
                </a>
              </li>
            ) : null}
            {resumeUrl ? (
              <li>
                <a
                  href={resumeUrl}
                  className="rounded-sm hover:text-[var(--text-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus-ring)]"
                  {...(isLocalResume(resumeUrl)
                    ? { download: resumeDownload }
                    : { target: "_blank", rel: "noopener noreferrer" })}
                >
                  {t("resume")}
                </a>
              </li>
            ) : null}
          </ul>
        </nav>
      </div>
    </footer>
  );
}
