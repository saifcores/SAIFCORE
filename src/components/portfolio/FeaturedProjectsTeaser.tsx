import { getMessages, getTranslations } from "next-intl/server";
import { ArrowUpRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { projectStatusRank, sortProjectsLiveFirst } from "@/data/case-studies";
import { caseStudySlug } from "@/seo";
import { Reveal } from "./Reveal";

function faviconForUrl(url: string): string | null {
  try {
    const host = new URL(url).hostname;
    return `https://www.google.com/s2/favicons?domain=${host}&sz=64`;
  } catch {
    return null;
  }
}

export async function FeaturedProjectsTeaser() {
  const messages = await getMessages();
  const items = sortProjectsLiveFirst(messages.featuredProjects.items).slice(
    0,
    3,
  );
  const t = await getTranslations("featuredProjects");
  const tCommon = await getTranslations("common");
  const opensInNewTab = tCommon("opensInNewTab");

  return (
    <section
      id="work"
      className="border-b border-[var(--border-subtle)] px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24"
    >
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div className="min-w-0 flex-1">
              <p className="mb-2 text-xs font-medium uppercase tracking-[0.18em] text-[var(--text-muted)]">
                {t("title")}
              </p>
              <h2 className="max-w-2xl font-display text-pretty text-2xl font-medium tracking-tight text-[var(--text-primary)] sm:text-3xl md:text-4xl">
                {t("heading")}
              </h2>
              <p className="mt-3 max-w-xl text-pretty text-sm text-[var(--text-secondary)] sm:text-base">
                {t("subtitle")}
              </p>
            </div>
            <Link
              href="/systems"
              className="inline-flex min-h-10 shrink-0 items-center gap-1.5 text-sm font-medium text-[var(--text-secondary)] transition hover:text-[var(--text-primary)]"
            >
              {t("viewAll")}
              <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
            </Link>
          </div>
        </Reveal>

        <ul className="mt-10 grid gap-4 sm:mt-12 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
          {items.map((item, i) => {
            const caseStudyHref =
              `/systems#case-${caseStudySlug(item.title)}` as const;
            const isShipped = projectStatusRank(item.status) === 0;
            const liveHref = item.href?.trim() || "";
            const liveLabel = item.linkLabel?.trim() || t("viewProduct");
            const favicon = liveHref ? faviconForUrl(liveHref) : null;

            return (
              <li key={item.title} className="min-h-0">
                <Reveal delay={i * 60} className="h-full">
                  <article className="group flex h-full flex-col rounded-[12px] border border-[var(--border-subtle)] bg-[var(--bg-elevated)]/30 p-5 transition-colors duration-300 hover:border-[var(--border-hover)] sm:p-6">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <span className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-[10px] border border-[var(--border-subtle)] bg-[var(--bg-base)]">
                          {favicon ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img
                              src={favicon}
                              alt=""
                              width={24}
                              height={24}
                              className="h-6 w-6"
                              loading="lazy"
                            />
                          ) : (
                            <span className="font-display text-sm font-medium text-[var(--text-muted)]">
                              {item.title.slice(0, 1)}
                            </span>
                          )}
                        </span>
                        <div>
                          <h3 className="text-base font-semibold text-[var(--text-primary)]">
                            {item.title}
                          </h3>
                          {item.status ? (
                            <p
                              className={`mt-0.5 text-[11px] font-medium ${
                                isShipped
                                  ? "text-[var(--accent-strong)]"
                                  : "text-[var(--text-muted)]"
                              }`}
                            >
                              {item.status}
                            </p>
                          ) : null}
                        </div>
                      </div>
                    </div>

                    <p className="mt-4 line-clamp-3 flex-1 text-sm leading-relaxed text-[var(--text-secondary)]">
                      {item.problem}
                    </p>
                    <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-[var(--text-muted)]">
                      {item.impact || item.solution}
                    </p>

                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {item.stacks.slice(0, 3).map((tech) => (
                        <span
                          key={tech}
                          className="rounded-full border border-[var(--border-subtle)] px-2.5 py-0.5 text-[11px] text-[var(--text-muted)]"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    <div className="mt-5 flex flex-wrap items-center gap-3 border-t border-[var(--border-subtle)] pt-4">
                      {liveHref ? (
                        <a
                          href={liveHref}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`${liveLabel} (${opensInNewTab})`}
                          className="inline-flex items-center gap-1 text-xs font-semibold text-[var(--text-primary)] transition hover:opacity-70"
                        >
                          {liveLabel}
                          <ArrowUpRight className="h-3 w-3" aria-hidden />
                        </a>
                      ) : null}
                      <Link
                        href={caseStudyHref}
                        className="text-xs font-medium text-[var(--text-secondary)] transition hover:text-[var(--text-primary)]"
                      >
                        {t("readCaseStudy")}
                      </Link>
                    </div>
                  </article>
                </Reveal>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
