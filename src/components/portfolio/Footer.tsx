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

type FooterLink = {
  href: string;
  label: string;
  external?: boolean;
};

function FooterNavLink({
  link,
  opensInNewTab,
}: {
  link: FooterLink;
  opensInNewTab: string;
}) {
  const className =
    "inline-flex min-h-10 items-center text-sm font-medium text-[var(--text-secondary)] transition hover:text-[var(--text-primary)] sm:min-h-11";

  if (link.external) {
    return (
      <a
        href={link.href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`${link.label} (${opensInNewTab})`}
        className={className}
      >
        {link.label}
      </a>
    );
  }

  return (
    <Link href={link.href} className={className}>
      {link.label}
    </Link>
  );
}

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

  const pageLinks: FooterLink[] = [
    { href: "/about", label: t("about") },
    { href: "/experience", label: t("experience") },
    { href: "/systems", label: t("systems") },
    ...(hasObtainedCertifications()
      ? [{ href: "/certifications", label: t("credentials") }]
      : []),
    ...(blogIndexUrl
      ? [{ href: blogIndexUrl, label: t("blog"), external: true }]
      : [{ href: "/articles", label: t("articles") }]),
    { href: "/#contact", label: t("contact") },
  ];

  const homeSectionLinks: FooterLink[] = [
    { href: "/#work", label: t("work") },
    { href: "/#services", label: t("services") },
    { href: "/#offers", label: t("offers") },
    { href: "/#process", label: t("process") },
    { href: "/#faq", label: t("faq") },
  ];

  return (
    <footer className="border-t border-[var(--border-subtle)] px-4 py-10 pb-[max(2.5rem,env(safe-area-inset-bottom))] sm:px-6 sm:py-12 lg:px-8">
      <div className="mx-auto max-w-[1280px]">
        <div className="flex flex-col gap-8 sm:gap-10 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm">
            <p className="text-sm font-bold tracking-tight">
              <span className="text-[var(--text-primary)]">SAIF</span>
              <span className="text-gradient">CORE</span>
            </p>
            <p className="mt-3 text-pretty text-sm leading-relaxed text-[var(--text-muted)]">
              {t("tagline")}
            </p>
            <p className="mt-4 text-pretty text-xs leading-relaxed text-[var(--text-muted)]">
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

          <div className="grid grid-cols-2 gap-6 sm:gap-8 md:flex md:flex-wrap md:gap-12 lg:gap-16">
            <nav aria-label={t("pagesLabel")} className="min-w-0">
              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--text-muted)]">
                {t("pagesLabel")}
              </p>
              <ul className="mt-3 space-y-1 sm:mt-4 sm:space-y-2">
                {pageLinks.map((link) => (
                  <li key={`${link.href}-${link.label}`}>
                    <FooterNavLink link={link} opensInNewTab={opensInNewTab} />
                  </li>
                ))}
              </ul>
            </nav>

            <nav
              aria-label={t("homeSectionsLabel")}
              className="col-span-2 min-w-0 md:col-span-1"
            >
              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--text-muted)]">
                {t("homeSectionsLabel")}
              </p>
              <ul className="mt-3 space-y-1 sm:mt-4 sm:space-y-2">
                {homeSectionLinks.map((link) => (
                  <li key={link.href}>
                    <FooterNavLink link={link} opensInNewTab={opensInNewTab} />
                  </li>
                ))}
              </ul>
            </nav>

            <div className="min-w-0">
              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--text-muted)]">
                {t("connectLabel")}
              </p>
              <ul className="mt-3 space-y-1 sm:mt-4 sm:space-y-2">
                {linkedinUrl ? (
                  <li>
                    <a
                      href={linkedinUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${t("linkedin")} (${opensInNewTab})`}
                      className="inline-flex min-h-10 items-center text-sm font-medium text-[var(--text-secondary)] transition hover:text-[var(--text-primary)] sm:min-h-11"
                    >
                      {t("linkedin")}
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
                      className="inline-flex min-h-10 items-center text-sm font-medium text-[var(--text-secondary)] transition hover:text-[var(--text-primary)] sm:min-h-11"
                    >
                      {t("github")}
                    </a>
                  </li>
                ) : null}
                {resumeUrl ? (
                  <li>
                    <a
                      href={resumeUrl}
                      className="inline-flex min-h-10 items-center text-sm font-medium text-[var(--text-secondary)] transition hover:text-[var(--text-primary)] sm:min-h-11"
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
