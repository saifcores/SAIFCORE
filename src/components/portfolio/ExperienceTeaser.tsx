import { getLocale, getMessages, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import type { ExperienceEntry } from "@/types/messages";
import { getGithubUrl, getLinkedinUrl } from "@/site";
import {
  getResumeDownloadFilename,
  getResumeUrl,
  isLocalResume,
} from "@/server/resume";
import { ECOM_360_CASE_STUDY_PATH } from "@/data/case-studies";
import { Reveal } from "./Reveal";

const TEASER_COUNT = 3;

function linkedinRecommendationsUrl(profile: string): string {
  const base = profile.replace(/\/+$/, "");
  if (base.includes("/details/recommendations")) return base;
  return `${base}/details/recommendations/`;
}

function firstBullet(entry: ExperienceEntry): string {
  return entry.summary.trim() || entry.highlights[0]?.trim() || "";
}

export async function ExperienceTeaser() {
  const messages = await getMessages();
  const t = await getTranslations("experience");
  const tTrust = await getTranslations("trust");
  const tCommon = await getTranslations("common");
  const locale = await getLocale();
  const items = messages.experience.items.slice(0, TEASER_COUNT);
  const opensInNewTab = tCommon("opensInNewTab");
  const linkedinUrl = getLinkedinUrl();
  const githubUrl = getGithubUrl();
  const resumeUrl = getResumeUrl(locale);
  const resumeDownload = getResumeDownloadFilename(locale);
  const ecom = messages.featuredProjects.items.find(
    (item) => item.id === "ecom-360-pme",
  );
  const ecomLiveHref = ecom?.href?.trim() || "";

  const verifyLinks = [
    linkedinUrl
      ? {
          href: linkedinRecommendationsUrl(linkedinUrl),
          label: tTrust("verifyRecommendations"),
          external: true,
        }
      : null,
    githubUrl
      ? { href: githubUrl, label: tTrust("verifyGithub"), external: true }
      : null,
    ecomLiveHref
      ? { href: ecomLiveHref, label: tTrust("verifyLive"), external: true }
      : {
          href: ECOM_360_CASE_STUDY_PATH,
          label: tTrust("verifyLive"),
          external: false,
        },
    resumeUrl
      ? {
          href: resumeUrl,
          label: tTrust("verifyResume"),
          external: !isLocalResume(resumeUrl),
          download: isLocalResume(resumeUrl) ? resumeDownload : undefined,
        }
      : null,
  ].filter((link): link is NonNullable<typeof link> => link != null);

  return (
    <section
      id="experience"
      className="section-home scroll-mt-24 xl:scroll-mt-28"
    >
      <div className="page-container grid gap-10 lg:grid-cols-2 lg:gap-16">
        <Reveal>
          <div className="flex flex-col gap-4">
            <p className="site-kicker">{t("title")}</p>
            <h2 className="section-heading">{t("subtitle")}</h2>
            <p className="max-w-[44ch] text-[15px] text-[var(--text-muted)]">
              {t("hiringLine")}
            </p>
            <div className="mt-2 flex flex-col border-t border-[var(--border-subtle)]">
              {verifyLinks.map((link) =>
                link.external ? (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${link.label} (${opensInNewTab})`}
                    className="flex justify-between border-b border-[var(--border-subtle)] py-3 text-sm text-[var(--text-primary)] transition-colors hover:text-[var(--accent)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus-ring)]"
                  >
                    {link.label}
                    <span
                      className="font-mono text-[var(--text-muted)]"
                      aria-hidden
                    >
                      ↗
                    </span>
                  </a>
                ) : (
                  <a
                    key={link.label}
                    href={link.href}
                    className="flex justify-between border-b border-[var(--border-subtle)] py-3 text-sm text-[var(--text-primary)] transition-colors hover:text-[var(--accent)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus-ring)]"
                    {...("download" in link && link.download
                      ? { download: link.download }
                      : {})}
                  >
                    {link.label}
                    <span
                      className="font-mono text-[var(--text-muted)]"
                      aria-hidden
                    >
                      {"download" in link && link.download ? "↓" : "↗"}
                    </span>
                  </a>
                ),
              )}
            </div>
          </div>
        </Reveal>

        <ol className="m-0 flex list-none flex-col p-0">
          {items.map((item, i) => {
            const bullet = firstBullet(item);
            return (
              <li
                key={`${item.role}|${item.company}`}
                className="grid gap-1.5 border-b border-[var(--border-subtle)] py-4"
              >
                <Reveal delay={i * 50}>
                  <div className="flex flex-wrap justify-between gap-4">
                    <span className="font-semibold text-[var(--text-primary)]">
                      {item.company}
                    </span>
                    <span className="font-mono text-xs text-[var(--text-muted)]">
                      {item.period}
                    </span>
                  </div>
                  <div className="text-sm text-[var(--accent)]">
                    {item.role}
                  </div>
                  {bullet ? (
                    <div className="text-pretty text-sm text-[var(--text-muted)]">
                      {bullet}
                    </div>
                  ) : null}
                </Reveal>
              </li>
            );
          })}
          <li className="pt-4">
            <Link href="/experience" className="link-more" data-arrow>
              {t("viewAll")}
            </Link>
          </li>
        </ol>
      </div>
    </section>
  );
}
