import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { getGithubUrl, getLinkedinUrl } from "@/site";
import { getResumeUrl, isLocalResume } from "@/server/resume";

export async function Footer() {
  const t = await getTranslations("footer");
  const year = new Date().getFullYear();
  const resumeUrl = getResumeUrl();

  const pageLinks = [
    { href: "/about" as const, label: t("about") },
    { href: "/certifications" as const, label: t("credentials") },
    { href: "/systems" as const, label: t("systems") },
    { href: "/experience" as const, label: t("experience") },
    { href: "/articles" as const, label: t("articles") },
  ];

  return (
    <footer className="border-t border-[var(--border-subtle)] px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-[1280px]">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-sm">
            <p className="text-sm font-bold tracking-tight">
              <span className="text-[var(--text-primary)]">SAIF</span>
              <span className="text-gradient">CORE</span>
            </p>
            <p className="mt-3 text-sm leading-relaxed text-[var(--text-muted)]">
              {t("tagline")}
            </p>
            <p className="mt-4 text-xs text-[var(--text-muted)]">
              {t("rights", { year })}
            </p>
          </div>

          <div className="flex flex-wrap gap-12 sm:gap-16">
            <nav aria-label={t("pagesLabel")}>
              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--text-muted)]">
                {t("pagesLabel")}
              </p>
              <ul className="mt-4 space-y-2.5">
                {pageLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm font-medium text-[var(--text-secondary)] transition hover:text-[var(--text-primary)]"
                    >
                      {link.label}
                    </Link>
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
                        ? { download: "SAIFCORE-resume.pdf" }
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
