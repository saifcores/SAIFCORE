import { getMessages, getTranslations } from "next-intl/server";
import { ArrowUpRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import {
  getCaseStudyHref,
  hasDedicatedCaseStudyPage,
  projectStatusRank,
  sortProjectsForHomeTeaser,
} from "@/data/case-studies";
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
  const items = sortProjectsForHomeTeaser(messages.featuredProjects.items, 3);
  const t = await getTranslations("featuredProjects");
  const tCommon = await getTranslations("common");
  const opensInNewTab = tCommon("opensInNewTab");

  return (
    <section
      id="work"
      className="scroll-mt-24 border-b border-[var(--border-subtle)] px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-24 xl:scroll-mt-28"
    >
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
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
              className="inline-flex min-h-11 shrink-0 items-center gap-1.5 self-start text-sm font-medium text-[var(--text-secondary)] transition hover:text-[var(--text-primary)] sm:self-auto"
            >
              {t("viewAll")}
              <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
            </Link>
          </div>
        </Reveal>

        <ul className="mt-8 divide-y divide-[var(--border-subtle)] border-y border-[var(--border-subtle)] sm:mt-10 md:grid md:grid-cols-2 md:gap-0 md:divide-y-0 md:border md:border-[var(--border-subtle)] lg:mt-12 lg:grid-cols-3">
          {items.map((item, i) => {
            const caseStudyHref = getCaseStudyHref(item);
            const isShipped = projectStatusRank(item.status) === 0;
            const isDeep = hasDedicatedCaseStudyPage(item);
            const isConfidential = Boolean(item.disclosure?.trim());
            const liveHref = item.href?.trim() || "";
            const liveLabel = item.linkLabel?.trim() || t("viewProduct");
            const favicon = liveHref ? faviconForUrl(liveHref) : null;
            const primaryMetric = item.metrics?.[0];
            const outcome = item.impact || item.solution;
            const caseCta = isDeep
              ? t("readCaseStudy")
              : isConfidential
                ? t("readPatterns")
                : t("readCaseStudy");

            return (
              <li
                key={item.title}
                className={`min-h-0 ${
                  i === 2
                    ? "md:col-span-2 md:border-t md:border-[var(--border-subtle)] lg:col-span-1 lg:border-t-0 lg:border-l"
                    : i === 1
                      ? "md:border-l md:border-[var(--border-subtle)]"
                      : ""
                }`}
              >
                <Reveal delay={i * 60} className="h-full">
                  <article className="flex h-full flex-col py-6 md:px-5 md:py-7 lg:px-5 lg:py-8 xl:px-6">
                    <div className="flex items-center gap-3">
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-[10px] border border-[var(--border-subtle)] bg-[var(--bg-elevated)]/40">
                        {favicon ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={favicon}
                            alt=""
                            width={20}
                            height={20}
                            className="h-5 w-5"
                            loading="lazy"
                          />
                        ) : (
                          <span className="font-display text-sm font-medium text-[var(--text-muted)]">
                            {item.title.slice(0, 1)}
                          </span>
                        )}
                      </span>
                      <div className="min-w-0">
                        <h3 className="truncate text-base font-semibold text-[var(--text-primary)]">
                          {item.title}
                        </h3>
                        <div className="mt-0.5 flex flex-wrap items-center gap-x-2 gap-y-0.5">
                          {item.status ? (
                            <p
                              className={`text-[11px] font-medium ${
                                isShipped
                                  ? "text-[var(--accent-strong)]"
                                  : "text-[var(--text-muted)]"
                              }`}
                            >
                              {item.status}
                            </p>
                          ) : null}
                          {primaryMetric ? (
                            <p className="text-[11px] text-[var(--text-muted)]">
                              <span className="font-semibold text-[var(--text-secondary)]">
                                {primaryMetric.value}
                              </span>{" "}
                              {primaryMetric.label}
                            </p>
                          ) : null}
                        </div>
                      </div>
                    </div>

                    <p className="mt-4 line-clamp-3 flex-1 text-sm leading-relaxed text-[var(--text-secondary)]">
                      {item.problem}
                    </p>
                    <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-[var(--text-muted)]">
                      <span className="font-medium text-[var(--text-secondary)]">
                        {t("outcomeLabel")}
                      </span>{" "}
                      {outcome}
                    </p>

                    <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2">
                      <Link
                        href={caseStudyHref}
                        className={`inline-flex min-h-10 items-center text-xs font-semibold transition ${
                          isDeep
                            ? "text-[var(--text-primary)] hover:opacity-70"
                            : "font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                        }`}
                      >
                        {caseCta}
                        {isDeep ? (
                          <ArrowUpRight className="ml-1 h-3 w-3" aria-hidden />
                        ) : null}
                      </Link>
                      {liveHref ? (
                        <a
                          href={liveHref}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`${liveLabel} (${opensInNewTab})`}
                          className="inline-flex min-h-10 items-center gap-1 text-xs font-medium text-[var(--text-secondary)] transition hover:text-[var(--text-primary)]"
                        >
                          {liveLabel}
                          <ArrowUpRight className="h-3 w-3" aria-hidden />
                        </a>
                      ) : null}
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
