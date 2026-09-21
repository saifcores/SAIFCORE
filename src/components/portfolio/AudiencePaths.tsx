import { getLocale, getTranslations } from "next-intl/server";
import { ArrowUpRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import {
  getResumeDownloadFilename,
  getResumeUrl,
  isLocalResume,
} from "@/server/resume";
import { BookCallLink } from "@/components/portfolio/BookCallLink";
import { MotionReveal } from "@/components/portfolio/motion/MotionReveal";

export async function AudiencePaths() {
  const t = await getTranslations("audiencePaths");
  const locale = await getLocale();
  const resumeUrl = getResumeUrl(locale);
  const resumeDownload = getResumeDownloadFilename(locale);

  const paths = [
    {
      key: "recruiter",
      title: t("recruiterTitle"),
      description: t("recruiterDescription"),
      links: [
        { href: "/#experience", label: t("recruiterLinkExperience") },
        { href: "/systems", label: t("recruiterLinkSystems") },
        { href: "/about", label: t("recruiterLinkAbout") },
      ],
      primaryHref: "/experience" as const,
      primaryLabel: t("recruiterCta"),
      secondaryHref: "/#experience" as const,
      secondaryLabel: t("recruiterSecondaryCta"),
      resume: true as const,
    },
    {
      key: "client",
      title: t("clientTitle"),
      description: t("clientDescription"),
      links: [
        { href: "/systems", label: t("clientLinkServices") },
        { href: "/#offers", label: t("clientLinkOffers") },
        { href: "/#contact", label: t("clientLinkContact") },
      ],
      primaryHref: "/#architecture-sprint" as const,
      primaryLabel: t("clientCta"),
      secondaryHref: "/#contact" as const,
      secondaryLabel: t("clientSecondaryCta"),
      resume: false as const,
    },
  ] as const;

  return (
    <section
      id="paths"
      aria-labelledby="audience-paths-heading"
      className="scroll-mt-24 border-b border-[var(--border-subtle)] px-4 py-12 sm:px-6 sm:py-16 lg:px-8 xl:scroll-mt-28"
    >
      <div className="mx-auto max-w-7xl">
        <MotionReveal>
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.18em] text-[var(--text-muted)]">
            {t("title")}
          </p>
          <h2
            id="audience-paths-heading"
            className="max-w-2xl font-display text-pretty text-2xl font-medium tracking-tight text-[var(--text-primary)] sm:text-3xl"
          >
            {t("subtitle")}
          </h2>
        </MotionReveal>

        <div className="mt-8 grid gap-0 overflow-hidden rounded-[16px] border border-[var(--border-subtle)] sm:mt-10 md:grid-cols-2">
          {paths.map((path, index) => (
            <MotionReveal key={path.key} delay={index * 60}>
              <div
                className={`flex h-full flex-col bg-[var(--bg-elevated)]/20 p-5 sm:p-7 lg:p-8 ${
                  index === 0
                    ? "border-b border-[var(--border-subtle)] md:border-b-0 md:border-r"
                    : ""
                }`}
              >
                <h3 className="text-lg font-semibold text-[var(--text-primary)]">
                  {path.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[var(--text-secondary)]">
                  {path.description}
                </p>

                <ul className="mt-5 flex flex-wrap gap-x-4 gap-y-1 text-sm">
                  {path.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="inline-flex min-h-10 items-center font-medium text-[var(--text-muted)] underline decoration-[var(--border-subtle)] underline-offset-4 transition hover:text-[var(--text-primary)] hover:decoration-[var(--border-hover)]"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>

                <div className="mt-auto flex flex-col gap-2 pt-6 min-[420px]:flex-row min-[420px]:flex-wrap">
                  {path.resume && resumeUrl ? (
                    <a
                      href={resumeUrl}
                      className="btn-primary inline-flex min-h-11 w-full items-center justify-center gap-2 px-5 text-sm min-[420px]:w-auto"
                      {...(isLocalResume(resumeUrl)
                        ? { download: resumeDownload }
                        : {
                            target: "_blank",
                            rel: "noopener noreferrer",
                          })}
                    >
                      {path.primaryLabel}
                      <ArrowUpRight className="h-4 w-4" aria-hidden />
                    </a>
                  ) : path.resume ? (
                    <Link
                      href={path.primaryHref}
                      className="btn-primary inline-flex min-h-11 w-full items-center justify-center gap-2 px-5 text-sm min-[420px]:w-auto"
                    >
                      {path.primaryLabel}
                      <ArrowUpRight className="h-4 w-4" aria-hidden />
                    </Link>
                  ) : (
                    <Link
                      href={path.primaryHref}
                      className="btn-primary inline-flex min-h-11 w-full items-center justify-center gap-2 px-5 text-sm min-[420px]:w-auto"
                    >
                      {path.primaryLabel}
                      <ArrowUpRight className="h-4 w-4" aria-hidden />
                    </Link>
                  )}
                  {path.key === "client" ? (
                    <BookCallLink className="btn-outline inline-flex min-h-11 w-full items-center justify-center px-5 text-sm font-medium min-[420px]:w-auto">
                      {path.secondaryLabel}
                    </BookCallLink>
                  ) : (
                    <Link
                      href={path.secondaryHref}
                      className="btn-outline inline-flex min-h-11 w-full items-center justify-center px-5 text-sm font-medium min-[420px]:w-auto"
                    >
                      {path.secondaryLabel}
                    </Link>
                  )}
                </div>
              </div>
            </MotionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
