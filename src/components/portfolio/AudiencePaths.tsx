import { getLocale, getTranslations } from "next-intl/server";
import { ArrowRight, Briefcase, Building2 } from "lucide-react";
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
      icon: Building2,
      title: t("recruiterTitle"),
      description: t("recruiterDescription"),
      links: [
        { href: "/experience", label: t("recruiterLinkExperience") },
        { href: "/systems", label: t("recruiterLinkSystems") },
        { href: "/about", label: t("recruiterLinkAbout") },
      ],
      primaryHref: "/experience",
      primaryLabel: t("recruiterCta"),
      resume: true as const,
    },
    {
      key: "client",
      icon: Briefcase,
      title: t("clientTitle"),
      description: t("clientDescription"),
      links: [
        { href: "/#services", label: t("clientLinkServices") },
        { href: "/#offers", label: t("clientLinkOffers") },
        { href: "/#process", label: t("clientLinkProcess") },
      ],
      primaryHref: "/#offers",
      primaryLabel: t("clientCta"),
      resume: false as const,
    },
  ] as const;

  return (
    <section
      id="paths"
      aria-labelledby="audience-paths-heading"
      className="border-b border-[var(--border-subtle)] px-4 py-8 sm:px-6 sm:py-10 lg:px-8"
    >
      <div className="mx-auto max-w-[1280px]">
        <MotionReveal>
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.18em] text-[var(--text-muted)]">
            {t("title")}
          </p>
          <h2
            id="audience-paths-heading"
            className="max-w-2xl text-pretty text-xl font-bold tracking-tight text-[var(--text-primary)] sm:text-2xl"
          >
            {t("subtitle")}
          </h2>
        </MotionReveal>

        <div className="mt-8 grid gap-0 overflow-hidden rounded-2xl border border-[var(--border-subtle)] md:grid-cols-2">
          {paths.map((path, index) => {
            const Icon = path.icon;
            return (
              <MotionReveal key={path.key} delay={index * 60}>
                <div
                  className={`flex h-full flex-col bg-[var(--bg-elevated)]/15 p-5 sm:p-6 ${
                    index === 0
                      ? "border-b border-[var(--border-subtle)] md:border-b-0 md:border-r"
                      : ""
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="inline-flex rounded-lg border border-blue-500/20 bg-gradient-to-br from-blue-500/12 to-emerald-500/8 p-2 text-accent">
                      <Icon className="h-4 w-4" strokeWidth={1.6} aria-hidden />
                    </div>
                    <div>
                      <h3 className="text-base font-semibold text-[var(--text-primary)]">
                        {path.title}
                      </h3>
                      <p className="mt-1.5 text-sm leading-relaxed text-[var(--text-secondary)]">
                        {path.description}
                      </p>
                    </div>
                  </div>

                  <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-sm">
                    {path.links.map((link) => (
                      <li key={link.href}>
                        <Link
                          href={link.href}
                          className="font-medium text-[var(--text-muted)] underline decoration-[var(--border-subtle)] underline-offset-4 transition hover:text-accent hover:decoration-accent/40"
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-5 flex flex-wrap gap-2">
                    {path.resume && resumeUrl ? (
                      <a
                        href={resumeUrl}
                        className="btn-primary inline-flex min-h-11 items-center justify-center gap-2 px-4 text-sm"
                        {...(isLocalResume(resumeUrl)
                          ? { download: resumeDownload }
                          : {
                              target: "_blank",
                              rel: "noopener noreferrer",
                            })}
                      >
                        {path.primaryLabel}
                        <ArrowRight className="h-4 w-4" aria-hidden />
                      </a>
                    ) : path.resume ? (
                      <Link
                        href={path.primaryHref}
                        className="btn-primary inline-flex min-h-11 items-center justify-center gap-2 px-4 text-sm"
                      >
                        {path.primaryLabel}
                        <ArrowRight className="h-4 w-4" aria-hidden />
                      </Link>
                    ) : (
                      <BookCallLink className="btn-primary inline-flex min-h-11 items-center justify-center gap-2 px-4 text-sm">
                        {path.primaryLabel}
                        <ArrowRight className="h-4 w-4" aria-hidden />
                      </BookCallLink>
                    )}
                    {!path.resume ? (
                      <Link
                        href={path.primaryHref}
                        className="btn-outline inline-flex min-h-11 items-center justify-center rounded-xl px-4 text-sm font-semibold"
                      >
                        {t("clientSecondaryCta")}
                      </Link>
                    ) : (
                      <Link
                        href="/experience"
                        className="btn-outline inline-flex min-h-11 items-center justify-center rounded-xl px-4 text-sm font-semibold"
                      >
                        {t("recruiterSecondaryCta")}
                      </Link>
                    )}
                  </div>
                </div>
              </MotionReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
