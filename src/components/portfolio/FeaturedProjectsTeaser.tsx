import { getMessages, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { caseStudySlug } from "@/seo";
import type { FeaturedProjectItem } from "@/types/messages";
import { Reveal } from "./Reveal";

type TeaserCardProps = {
  item: FeaturedProjectItem;
  indexStr: string;
  metrics: FeaturedProjectItem["metrics"];
  screenshotLabel: string;
  readCaseStudyLabel: string;
  statusTone?: "shipped" | "wip";
};

function ProjectTeaserCard({
  item,
  indexStr,
  metrics,
  screenshotLabel,
  readCaseStudyLabel,
  statusTone = "wip",
}: TeaserCardProps) {
  const statusClass =
    statusTone === "shipped" ? "text-emerald-400" : "text-amber-400";
  const statusDotClass =
    statusTone === "shipped" ? "bg-emerald-400" : "bg-amber-400";

  return (
    <>
      <div
        className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-[var(--accent-blue)] to-[var(--accent-emerald)] opacity-0 transition duration-300 group-hover:opacity-100"
        aria-hidden
      />

      <div className="relative flex aspect-[16/9] items-center justify-center border-b border-[var(--border-subtle)] bg-gradient-to-br from-blue-500/8 via-[var(--bg-base)]/80 to-emerald-500/8">
        <div className="bg-grid absolute inset-0 opacity-40" />
        <div className="relative w-[92%] max-w-xs rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-elevated)]/80 p-4 shadow-lg backdrop-blur-sm transition group-hover:border-[var(--border-hover)] sm:w-[88%] sm:max-w-sm">
          <div className="flex gap-1.5">
            <span className="h-2 w-2 rounded-full bg-red-400/70" />
            <span className="h-2 w-2 rounded-full bg-amber-400/70" />
            <span className="h-2 w-2 rounded-full bg-emerald-400/70" />
          </div>
          <div className="mt-3 space-y-2">
            <div className="h-2 w-3/4 rounded bg-[var(--border-subtle)]" />
            <div className="h-2 w-1/2 rounded bg-[var(--border-subtle)]" />
            <div className="mt-3 flex gap-2">
              <div className="h-8 flex-1 rounded bg-blue-500/15" />
              <div className="h-8 flex-1 rounded bg-emerald-500/15" />
            </div>
          </div>
        </div>
        <span className="absolute bottom-3 right-3 font-mono text-[10px] uppercase tracking-wider text-[var(--text-muted)]">
          {screenshotLabel}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-4 sm:p-6">
        <div className="flex items-start justify-between gap-2 sm:gap-3">
          <span className="font-mono text-[11px] font-semibold tracking-[0.15em] text-[var(--text-muted)]">
            {indexStr}
          </span>
          {item.status ? (
            <span
              className={`inline-flex items-center gap-1 text-[11px] font-medium ${statusClass}`}
            >
              <span
                className={`h-1.5 w-1.5 rounded-full ${statusDotClass}`}
                aria-hidden
              />
              {item.status}
            </span>
          ) : null}
        </div>

        <h3 className="mt-3 text-base font-semibold leading-snug text-[var(--text-primary)] transition group-hover:text-accent sm:text-lg">
          {item.title}
        </h3>

        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-[var(--text-secondary)]">
          {item.solution}
        </p>

        {Array.isArray(metrics) && metrics.length > 0 ? (
          <div className="mt-5 grid grid-cols-1 gap-2.5 xs:grid-cols-2 sm:gap-3">
            {metrics.map((m) => (
              <div
                key={m.label}
                className="rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-base)]/50 px-3 py-2"
              >
                <p className="font-mono text-sm font-semibold text-emerald-400">
                  {m.value}
                </p>
                <p className="text-[10px] text-[var(--text-muted)]">
                  {m.label}
                </p>
              </div>
            ))}
          </div>
        ) : null}

        <div className="mt-5 flex flex-col gap-3 border-t border-[var(--border-subtle)] pt-4 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between sm:gap-2">
          <div className="flex min-w-0 flex-wrap gap-1.5">
            {item.stacks.slice(0, 5).map((tech) => (
              <span
                key={tech}
                className="rounded-md border border-[var(--border-subtle)] bg-[var(--bg-base)]/60 px-2 py-0.5 text-[11px] font-medium text-[var(--text-muted)]"
              >
                {tech}
              </span>
            ))}
          </div>
          <span className="text-xs font-semibold text-[var(--accent-blue)]">
            {readCaseStudyLabel}
            <span aria-hidden> →</span>
          </span>
        </div>
      </div>
    </>
  );
}

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
    .slice(0, 4);
  const t = await getTranslations("featuredProjects");

  return (
    <section
      id="work"
      className="border-b border-[var(--border-subtle)] px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-24"
    >
      <div className="mx-auto max-w-[1280px]">
        <Reveal>
          <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-end sm:justify-between">
            <div className="min-w-0 flex-1">
              <p className="mb-3 text-xs font-medium uppercase tracking-[0.18em] text-[var(--text-muted)] sm:mb-4">
                {t("title")}
              </p>
              <h2 className="max-w-2xl text-2xl font-bold tracking-tight text-[var(--text-primary)] sm:text-3xl md:text-4xl">
                {t("heading")}
              </h2>
              <p className="mt-3 max-w-xl text-pretty text-sm text-[var(--text-secondary)] sm:mt-4 sm:text-base">
                {t("subtitle")}
              </p>
            </div>
            <Link
              href="/systems"
              className="inline-flex w-full shrink-0 items-center justify-center gap-1.5 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-elevated)]/30 px-4 py-3 text-sm font-semibold text-accent transition hover:border-[var(--border-hover)] hover:text-[var(--accent-blue-light)] sm:w-auto sm:border-transparent sm:bg-transparent sm:px-0 sm:py-0"
            >
              {t("viewAll")}
              <span aria-hidden>→</span>
            </Link>
          </div>
        </Reveal>

        <div className="mt-10 grid gap-5 sm:mt-12 sm:grid-cols-2 sm:gap-6">
          {items.map((item, i) => {
            const indexStr = String(i + 1).padStart(2, "0");
            const metrics = item.metrics;
            const external = item.href.trim();
            const caseStudyHref =
              `/systems#case-${caseStudySlug(item.title)}` as const;
            const cardClassName =
              "group relative flex h-full flex-col overflow-hidden rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-elevated)]/20 transition duration-300 hover:-translate-y-1 hover:border-[var(--border-hover)] hover:bg-[var(--bg-elevated)]/40";
            const isShipped = projectStatusRank(item.status) === 0;

            return (
              <Reveal key={item.title} delay={i * 80}>
                <div className={cardClassName}>
                  <Link href={caseStudyHref} className="flex flex-1 flex-col">
                    <ProjectTeaserCard
                      item={item}
                      indexStr={indexStr}
                      metrics={metrics}
                      screenshotLabel={t("screenshotLabel")}
                      readCaseStudyLabel={t("readCaseStudy")}
                      statusTone={isShipped ? "shipped" : "wip"}
                    />
                  </Link>
                  {external ? (
                    <div className="border-t border-[var(--border-subtle)] px-4 pb-4 pt-3 sm:px-6 sm:pb-5">
                      <a
                        href={external}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex min-h-11 items-center gap-1.5 text-sm font-semibold text-[var(--accent-blue)] transition hover:text-[var(--accent-blue-light)]"
                      >
                        {item.linkLabel || t("viewProduct")}
                        <span aria-hidden>↗</span>
                      </a>
                    </div>
                  ) : null}
                </div>
              </Reveal>
            );
          })}
        </div>

        <Reveal delay={320}>
          <div className="mt-8 flex justify-center sm:mt-10">
            <Link
              href="/systems"
              className="inline-flex min-h-12 w-full max-w-sm items-center justify-center gap-2 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-elevated)]/30 px-6 py-3 text-sm font-semibold text-[var(--text-secondary)] transition hover:border-[var(--border-hover)] hover:text-[var(--text-primary)] sm:w-auto"
            >
              {t("viewAll")}
              <span aria-hidden>→</span>
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
