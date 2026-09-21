import { getLocale, getMessages, getTranslations } from "next-intl/server";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "./Reveal";
import { TrustMotion } from "./TrustMotion";
import { trustBrands } from "@/data/trust-brands";
import {
  getGithubUrl,
  getLinkedinUrl,
} from "@/site";
import {
  getResumeDownloadFilename,
  getResumeUrl,
  isLocalResume,
} from "@/server/resume";

const LIVE_PRODUCT_URL = "https://ecom360pme.com/";

export async function Trust() {
  const t = await getTranslations("trust");
  const tCommon = await getTranslations("common");
  const messages = await getMessages();
  const locale = await getLocale();
  const industries = messages.trust.industries;
  const facts = messages.trust.facts;
  const specialtyLine = messages.trust.specialtyLine;
  const slaLine = messages.collaboration.slaLine;
  const linkedinUrl = getLinkedinUrl();
  const githubUrl = getGithubUrl();
  const resumeUrl = getResumeUrl(locale);
  const resumeDownload = getResumeDownloadFilename(locale);
  const opensInNewTab = tCommon("opensInNewTab");

  const verifyLinks = [
    linkedinUrl
      ? {
          key: "linkedin",
          href: linkedinUrl,
          label: t("verifyLinkedin"),
          external: true,
        }
      : null,
    githubUrl
      ? {
          key: "github",
          href: githubUrl,
          label: t("verifyGithub"),
          external: true,
        }
      : null,
    {
      key: "live",
      href: LIVE_PRODUCT_URL,
      label: t("verifyLive"),
      external: true,
    },
    resumeUrl
      ? {
          key: "resume",
          href: resumeUrl,
          label: t("verifyResume"),
          external: !isLocalResume(resumeUrl),
          download: isLocalResume(resumeUrl) ? resumeDownload : undefined,
        }
      : null,
  ].filter(Boolean) as readonly {
    key: string;
    href: string;
    label: string;
    external: boolean;
    download?: string;
  }[];

  return (
    <section className="relative overflow-hidden border-b border-[var(--border-subtle)] px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-[radial-gradient(ellipse_at_top,var(--glow-primary),transparent_65%)] opacity-70"
        aria-hidden
      />
      <div className="relative mx-auto max-w-7xl">
        <Reveal>
          <p className="mb-3 text-pretty text-center text-[11px] font-medium uppercase tracking-[0.18em] text-[var(--text-muted)] sm:mb-4 sm:text-xs sm:tracking-[0.2em]">
            {t("heading")}
          </p>
          <p className="mx-auto mb-5 max-w-2xl text-pretty text-center text-sm font-medium text-[var(--text-secondary)] sm:mb-6 sm:text-base">
            {specialtyLine}
          </p>
          <ul className="mx-auto mb-8 flex max-w-3xl list-none flex-wrap items-center justify-center gap-x-1 gap-y-1 p-0 sm:mb-10 sm:gap-x-2">
            {industries.map((industry, index) => (
              <li
                key={industry}
                className="flex items-center text-[11px] font-medium text-[var(--text-secondary)] sm:text-xs"
              >
                {index > 0 ? (
                  <span
                    className="mx-1.5 text-[var(--border-hover)] sm:mx-2"
                    aria-hidden
                  >
                    ·
                  </span>
                ) : null}
                <span>{industry}</span>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={60}>
          <ul className="mx-auto mb-8 grid max-w-4xl list-none grid-cols-2 gap-x-4 gap-y-6 border-y border-[var(--border-subtle)] py-6 p-0 sm:mb-10 sm:grid-cols-4 sm:gap-x-6 sm:py-8">
            {facts.map((fact) => (
              <li key={fact.label} className="text-center">
                <p className="font-display text-2xl font-medium tracking-tight text-[var(--text-primary)] sm:text-3xl">
                  {fact.value}
                </p>
                <p className="mt-1.5 text-[11px] font-medium leading-snug text-[var(--text-muted)] sm:text-xs">
                  {fact.label}
                </p>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={100}>
          <p className="mb-3 text-center text-[10px] font-medium uppercase tracking-[0.18em] text-[var(--text-muted)] sm:mb-4">
            {t("companiesLabel")}
          </p>
          <TrustMotion brands={trustBrands} />
          <p className="mx-auto mt-4 max-w-xl text-pretty text-center text-xs leading-relaxed text-[var(--text-muted)] sm:mt-5 sm:text-sm">
            {t("deliveryNote")}
          </p>
          <p className="mx-auto mt-2 max-w-xl text-pretty text-center text-xs font-medium text-[var(--text-secondary)] sm:text-sm">
            {slaLine}
          </p>
        </Reveal>

        {verifyLinks.length > 0 ? (
          <Reveal delay={140}>
            <div className="mx-auto mt-8 max-w-3xl border-t border-[var(--border-subtle)] pt-6 sm:mt-10 sm:pt-8">
              <p className="mb-3 text-center text-[10px] font-medium uppercase tracking-[0.18em] text-[var(--text-muted)]">
                {t("verifyHeading")}
              </p>
              <ul className="flex list-none flex-wrap items-center justify-center gap-x-4 gap-y-2 p-0 sm:gap-x-6">
                {verifyLinks.map((link) => (
                  <li key={link.key}>
                    <a
                      href={link.href}
                      {...(link.external
                        ? {
                            target: "_blank",
                            rel: "noopener noreferrer",
                            "aria-label": `${link.label} (${opensInNewTab})`,
                          }
                        : {})}
                      {...(link.download
                        ? { download: link.download }
                        : {})}
                      className="inline-flex min-h-10 items-center gap-1 text-sm font-medium text-[var(--text-secondary)] underline decoration-[var(--border-subtle)] underline-offset-4 transition hover:text-[var(--text-primary)] hover:decoration-[var(--border-hover)]"
                    >
                      {link.label}
                      {link.external ? (
                        <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
                      ) : null}
                    </a>
                  </li>
                ))}
              </ul>
              <p className="mx-auto mt-3 max-w-lg text-pretty text-center text-[11px] leading-relaxed text-[var(--text-muted)] sm:text-xs">
                {t("verifyNote")}
              </p>
            </div>
          </Reveal>
        ) : null}
      </div>
    </section>
  );
}
