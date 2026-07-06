import { getLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { hasObtainedCertifications } from "@/data/certifications";
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
  const resumeUrl = getResumeUrl();
  const resumeDownload = getResumeDownloadFilename();
  const profileName = getProfileDisplayName();
  const blogIndexUrl = getBlogIndexUrl(loc);
  const opensInNewTab = tCommon("opensInNewTab");
  const ownerLabel =
    profileName !== "SAIFCORE"
      ? t("rightsOwner", { name: profileName })
      : "SAIFCORE";

  const pageLinks = [
    { href: "/about" as const, label: t("about"), external: false },
    ...(hasObtainedCertifications()
      ? [
          {
            href: "/certifications" as const,
            label: t("credentials"),
            external: false,
          },
        ]
      : []),
    { href: "/systems" as const, label: t("systems"), external: false },
    { href: "/experience" as const, label: t("experience"), external: false },
    {
      href: blogIndexUrl ?? "/articles",
      label: t("articles"),
      external: !!blogIndexUrl,
    },
  ];

  return (
    <footer className="border-t border-[var(--border-subtle)] px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-[1280px]">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm">
            <p className="text-sm font-bold tracking-tight">
              <span className="text-[var(--text-primary)]">SAIF</span>
              <span className="text-gradient">CORE</span>
            </p>
            <p className="mt-3 text-sm leading-relaxed text-[var(--text-muted)]">
              {t("tagline")}
            </p>
            <p className="mt-4 text-xs text-[var(--text-muted)]">
              {t("rights", { year, owner: ownerLabel })}{" "}
              <span aria-hidden="true">·</span>{" "}
              <Link
                href="/license"
                className="underline-offset-2 transition hover:text-[var(--text-secondary)] hover:underline"
              >
                {t("license")}
              </Link>
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:flex sm:flex-wrap sm:gap-12 md:gap-16">
            <nav aria-label={t("pagesLabel")}>
              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--text-muted)]">
                {t("pagesLabel")}
              </p>
              <ul className="mt-4 space-y-2.5">
                {pageLinks.map((link) => (
                  <li key={link.href}>
                    {link.external ? (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${link.label} (${opensInNewTab})`}
                        className="text-sm font-medium text-[var(--text-secondary)] transition hover:text-[var(--text-primary)]"
                      >
                        {link.label}
                      </a>
                    ) : (
                      <Link
                        href={link.href}
                        className="text-sm font-medium text-[var(--text-secondary)] transition hover:text-[var(--text-primary)]"
                      >
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
                <li>
                  <Link
                    href="/#contact"
                    className="text-sm font-medium text-[var(--text-secondary)] transition hover:text-[var(--text-primary)]"
                  >
                    {t("contact")}
                  </Link>
                </li>
              </ul>
            </nav>

            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--text-muted)]">
                {t("connectLabel")}
              </p>
              <ul className="mt-4 space-y-2.5">
                <li>
                  <a
                    href={getLinkedinUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${t("linkedin")} (${opensInNewTab})`}
                    className="text-sm font-medium text-[var(--text-secondary)] transition hover:text-[var(--text-primary)]"
                  >
                    {t("linkedin")}
                  </a>
                </li>
                <li>
                  <a
                    href={getGithubUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${t("github")} (${opensInNewTab})`}
                    className="text-sm font-medium text-[var(--text-secondary)] transition hover:text-[var(--text-primary)]"
                  >
                    {t("github")}
                  </a>
                </li>
                {resumeUrl ? (
                  <li>
                    <a
                      href={resumeUrl}
                      className="text-sm font-medium text-[var(--text-secondary)] transition hover:text-[var(--text-primary)]"
                      {...(isLocalResume(resumeUrl)
                        ? { download: resumeDownload }
                        : {
                            target: "_blank",
                            rel: "noopener noreferrer",
                          })}
                    >
                      {t("resume")}
                    </a>
                  </li>
                ) : null}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
