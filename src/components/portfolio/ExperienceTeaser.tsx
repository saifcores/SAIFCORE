import { getLocale, getMessages, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import type { ExperienceEntry } from "@/types/messages";
import {
  getResumeDownloadFilename,
  getResumeUrl,
  isLocalResume,
} from "@/server/resume";
import { Reveal } from "./Reveal";

const TEASER_COUNT = 3;

function firstBullet(entry: ExperienceEntry): string {
  return entry.bullet0.trim();
}

function isCurrentRole(period: string): boolean {
  return /\b(present|présent|actuel|current)\b/i.test(period);
}

export async function ExperienceTeaser() {
  const messages = await getMessages();
  const { experience } = messages;
  const t = await getTranslations("experience");
  const locale = await getLocale();
  const items = experience.items.slice(0, TEASER_COUNT);
  const resumeUrl = getResumeUrl(locale);
  const resumeDownload = getResumeDownloadFilename(locale);
  const resumeProps = resumeUrl
    ? isLocalResume(resumeUrl)
      ? { download: resumeDownload }
      : ({ target: "_blank" as const, rel: "noopener noreferrer" } as const)
    : null;

  return (
    <section
      id="experience"
      className="scroll-mt-24 border-b border-[var(--border-subtle)] px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20 xl:scroll-mt-28"
    >
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div className="min-w-0">
              <p className="mb-2 text-xs font-medium uppercase tracking-[0.18em] text-[var(--text-muted)]">
                {t("title")}
              </p>
              <h2 className="max-w-2xl font-display text-pretty text-2xl font-medium tracking-tight text-[var(--text-primary)] sm:text-3xl">
                {t("subtitle")}
              </h2>
              <p className="mt-2 max-w-xl text-pretty text-sm leading-relaxed text-[var(--text-secondary)]">
                {t("hiringLine")}
              </p>
            </div>
            <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-4">
              {resumeUrl && resumeProps ? (
                <a
                  href={resumeUrl}
                  className="inline-flex min-h-11 shrink-0 items-center text-sm font-medium text-[var(--text-secondary)] transition hover:text-[var(--text-primary)] sm:min-h-10"
                  {...resumeProps}
                >
                  {t("downloadCv")}
                </a>
              ) : null}
              <Link
                href="/experience"
                className="inline-flex min-h-11 shrink-0 items-center gap-1.5 text-sm font-medium text-[var(--text-primary)] transition hover:opacity-70 sm:min-h-10"
              >
                {t("viewAll")}
                <span aria-hidden>→</span>
              </Link>
            </div>
          </div>
        </Reveal>

        <ul className="mt-6 list-none space-y-0 divide-y divide-[var(--border-subtle)] p-0 sm:mt-8">
          {items.map((item, i) => {
            const isFirst = i === 0;
            const bullet = firstBullet(item);
            const isCurrent = isCurrentRole(item.period);
            const client = item.client?.trim();
            return (
              <li key={`${item.role}|${item.company}`}>
                <Reveal delay={i * 50}>
                  <div className="flex flex-col gap-2 py-4 sm:flex-row sm:items-start sm:gap-5 sm:py-4">
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-col gap-1 sm:flex-row sm:flex-wrap sm:items-baseline sm:justify-between sm:gap-x-3">
                        <div className="min-w-0">
                          <div className="flex flex-wrap items-center gap-2">
                            <span
                              className={`text-sm font-semibold ${isFirst ? "text-[var(--text-primary)]" : "text-[var(--text-secondary)]"}`}
                            >
                              {item.company}
                            </span>
                            {isCurrent ? (
                              <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[var(--accent-strong)]">
                                {t("currentRole")}
                              </span>
                            ) : null}
                          </div>
                          <p className="mt-0.5 text-sm font-medium text-[var(--text-primary)]">
                            {item.role}
                          </p>
                          {client ? (
                            <p className="mt-0.5 text-xs text-[var(--text-muted)]">
                              <span className="font-medium uppercase tracking-[0.12em]">
                                {t("clientLabel")}
                              </span>
                              {": "}
                              {client}
                            </p>
                          ) : null}
                        </div>
                        <span className="font-mono text-[11px] tabular-nums text-[var(--text-muted)] sm:shrink-0">
                          {item.period}
                        </span>
                      </div>
                      {bullet ? (
                        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-[var(--text-secondary)]">
                          {bullet}
                        </p>
                      ) : null}
                    </div>
                  </div>
                </Reveal>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
