import { getMessages, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { caseStudySlug } from "@/seo";
import { Reveal } from "./Reveal";

function projectStatusRank(status: string | undefined): number {
  const normalized = (status ?? "").toLowerCase();
  if (
    normalized.includes("live") ||
    normalized.includes("delivered") ||
    normalized.includes("livré") ||
    normalized.includes("en production")
  ) {
    return 0;
  }
  if (
    normalized.includes("progress") ||
    normalized.includes("cours") ||
    normalized.includes("development") ||
    normalized.includes("développement")
  ) {
    return 1;
  }
  return 2;
}

export async function FeaturedProjectsTeaser() {
  const messages = await getMessages();
  const items = [...messages.featuredProjects.items]
    .sort((a, b) => projectStatusRank(a.status) - projectStatusRank(b.status))
    .slice(0, 3);
  const t = await getTranslations("featuredProjects");

  return (
    <section
      id="work"
      className="border-b border-[var(--border-subtle)] px-4 py-10 sm:px-6 sm:py-12 lg:px-8 lg:py-16"
    >
      <div className="mx-auto max-w-[1280px]">
        <Reveal>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div className="min-w-0 flex-1">
              <p className="mb-2 text-xs font-medium uppercase tracking-[0.18em] text-[var(--text-muted)]">
                {t("title")}
              </p>
              <h2 className="max-w-2xl text-pretty text-2xl font-bold tracking-tight text-[var(--text-primary)] sm:text-3xl">
                {t("heading")}
              </h2>
              <p className="mt-2 max-w-xl text-pretty text-sm text-[var(--text-secondary)]">
                {t("subtitle")}
              </p>
            </div>
            <Link
              href="/systems"
              className="inline-flex min-h-10 shrink-0 items-center gap-1.5 text-sm font-semibold text-accent transition hover:text-[var(--accent-blue-light)]"
            >
              {t("viewAll")}
              <span aria-hidden>→</span>
            </Link>
          </div>
        </Reveal>

        <ul className="mt-8 grid gap-4 sm:mt-10 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
          {items.map((item, i) => {
            const caseStudyHref =
              `/systems#case-${caseStudySlug(item.title)}` as const;
            const isShipped = projectStatusRank(item.status) === 0;
            const primaryMetric = item.metrics?.[0];

            return (
              <li key={item.title} className="min-h-0">
                <Reveal delay={i * 60} className="h-full">
                  <Link
                    href={caseStudyHref}
                    className="group flex h-full flex-col border-b border-[var(--border-subtle)] pb-5 transition hover:border-[var(--border-hover)] sm:border sm:border-[var(--border-subtle)] sm:bg-[var(--bg-elevated)]/10 sm:p-5 sm:pb-5 sm:hover:border-[var(--border-hover)] sm:hover:bg-[var(--bg-elevated)]/25"
                  >
                    <div className="flex flex-wrap items-center gap-2">
                      {item.market ? (
                        <span className="text-[11px] font-medium tracking-wide text-accent">
                          {item.market}
                        </span>
                      ) : null}
                      {item.status ? (
                        <span
                          className={`text-[11px] font-medium ${isShipped ? "text-emerald-400" : "text-amber-400"}`}
                        >
                          {item.status}
                        </span>
                      ) : null}
                    </div>

                    <h3 className="mt-3 text-base font-semibold text-[var(--text-primary)] transition group-hover:text-accent sm:text-lg">
                      {item.title}
                    </h3>
                    <p className="mt-2 line-clamp-2 flex-1 text-sm leading-relaxed text-[var(--text-secondary)]">
                      {item.solution}
                    </p>

                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {item.stacks.slice(0, 4).map((tech) => (
                        <span
                          key={tech}
                          className="border border-[var(--border-subtle)] bg-[var(--bg-base)]/40 px-2 py-0.5 text-[11px] text-[var(--text-muted)]"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    <div className="mt-5 flex items-end justify-between gap-3 border-t border-[var(--border-subtle)] pt-4">
                      {primaryMetric ? (
                        <div>
                          <p className="font-mono text-sm font-semibold text-emerald-400">
                            {primaryMetric.value}
                          </p>
                          <p className="text-[10px] text-[var(--text-muted)]">
                            {primaryMetric.label}
                          </p>
                        </div>
                      ) : (
                        <span />
                      )}
                      <span className="text-xs font-semibold text-accent">
                        {t("readCaseStudy")}
                        <span aria-hidden> →</span>
                      </span>
                    </div>
                  </Link>
                </Reveal>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
