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

        <ul className="mt-6 space-y-3 sm:mt-8">
          {items.map((item, i) => {
            const indexStr = String(i + 1).padStart(2, "0");
            const caseStudyHref =
              `/systems#case-${caseStudySlug(item.title)}` as const;
            const isShipped = projectStatusRank(item.status) === 0;
            const primaryMetric = item.metrics?.[0];

            return (
              <li key={item.title}>
                <Reveal delay={i * 50}>
                  <Link
                    href={caseStudyHref}
                    className="group flex flex-col gap-3 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-elevated)]/15 px-4 py-4 transition hover:border-[var(--border-hover)] hover:bg-[var(--bg-elevated)]/35 sm:flex-row sm:items-center sm:gap-5 sm:px-5"
                  >
                    <span className="font-mono text-[11px] font-semibold tracking-[0.14em] text-[var(--text-muted)]">
                      {indexStr}
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                        <h3 className="text-sm font-semibold text-[var(--text-primary)] transition group-hover:text-accent sm:text-base">
                          {item.title}
                        </h3>
                        {item.status ? (
                          <span
                            className={`text-[11px] font-medium ${isShipped ? "text-emerald-400" : "text-amber-400"}`}
                          >
                            {item.status}
                          </span>
                        ) : null}
                      </div>
                      <p className="mt-1 line-clamp-2 text-sm leading-relaxed text-[var(--text-secondary)]">
                        {item.solution}
                      </p>
                      <div className="mt-2 flex flex-wrap gap-1.5">
                        {item.stacks.slice(0, 4).map((tech) => (
                          <span
                            key={tech}
                            className="rounded-md border border-[var(--border-subtle)] bg-[var(--bg-base)]/50 px-2 py-0.5 text-[11px] text-[var(--text-muted)]"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="flex shrink-0 items-center justify-between gap-4 sm:flex-col sm:items-end sm:text-right">
                      {primaryMetric ? (
                        <div>
                          <p className="font-mono text-sm font-semibold text-emerald-400">
                            {primaryMetric.value}
                          </p>
                          <p className="text-[10px] text-[var(--text-muted)]">
                            {primaryMetric.label}
                          </p>
                        </div>
                      ) : null}
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
