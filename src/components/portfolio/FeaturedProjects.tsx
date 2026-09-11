import { getMessages, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { projectCaseStudyId } from "@/seo";
import {
  getCaseStudyHref,
  hasDedicatedCaseStudyPage,
  projectStatusRank,
  sortProjectsLiveFirst,
} from "@/data/case-studies";
import type { FeaturedProjectItem } from "@/types/messages";
import { DetailLabel } from "./DetailLabel";
import { FeaturedProjectDetails } from "./FeaturedProjectDetails";
import { Reveal } from "./Reveal";

type Props = {
  /** When true, renders the Security and Scale fields (used on /systems page). */
  showDetail?: boolean;
};

type ProjectDecision = FeaturedProjectItem["decisions"][number];

function DetailList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2">
      {items.map((item) => (
        <li
          key={item}
          className="flex gap-2 text-sm leading-relaxed text-[var(--text-secondary)]"
        >
          <span
            className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--accent-strong)]"
            aria-hidden
          />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

function DecisionList({ decisions }: { decisions: ProjectDecision[] }) {
  return (
    <div className="space-y-3">
      {decisions.map((decision) => (
        <div key={decision.title}>
          <p className="text-sm font-semibold text-[var(--text-primary)]">
            {decision.title}
          </p>
          <p className="mt-1 text-sm leading-relaxed text-[var(--text-secondary)]">
            {decision.body}
          </p>
        </div>
      ))}
    </div>
  );
}

function ArchitectureFlow({
  label,
  steps,
}: {
  label: string;
  steps: string[];
}) {
  return (
    <div className="mt-6 border-t border-[var(--border-subtle)] pt-6">
      <DetailLabel>{label}</DetailLabel>
      <ol className="mt-1 flex list-none flex-wrap items-center gap-2 p-0">
        {steps.map((step, i) => (
          <li key={`${step}-${i}`} className="flex items-center gap-2">
            <span className="inline-flex items-center gap-2 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-base)]/70 px-3 py-1.5 text-xs font-medium text-[var(--text-secondary)]">
              <span className="font-mono text-[10px] tabular-nums text-[var(--text-muted)]">
                {String(i + 1).padStart(2, "0")}
              </span>
              {step}
            </span>
            {i < steps.length - 1 ? (
              <span className="text-xs text-[var(--text-muted)]" aria-hidden>
                →
              </span>
            ) : null}
          </li>
        ))}
      </ol>
    </div>
  );
}

export async function FeaturedProjects({ showDetail = false }: Props) {
  const messages = await getMessages();
  const items = sortProjectsLiveFirst(messages.featuredProjects.items);
  const t = await getTranslations("featuredProjects");

  return (
    <section id="work" className="px-4 py-14 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
      <div className="mx-auto max-w-7xl">
        {!showDetail ? (
          <Reveal>
            <p className="mb-4 text-xs font-medium uppercase tracking-[0.18em] text-[var(--text-muted)]">
              {t("title")}
            </p>
            <h2 className="max-w-2xl font-display text-pretty text-2xl font-medium tracking-tight text-[var(--text-primary)] sm:text-3xl md:text-4xl">
              {t("heading")}
            </h2>
            <p className="mt-3 max-w-2xl text-pretty text-sm text-[var(--text-secondary)] sm:mt-4 sm:text-base">
              {t("subtitle")}
            </p>
          </Reveal>
        ) : null}

        {/* Case study cards */}
        <div
          className={`space-y-5 sm:space-y-6 ${!showDetail ? "mt-10 sm:mt-14" : ""}`}
        >
          {items.map((item, i) => {
            const external = item.href.trim();
            const indexStr = String(i + 1).padStart(2, "0");
            const deepHref = getCaseStudyHref(item);
            const showDeepCta = hasDedicatedCaseStudyPage(item);
            const isLive = projectStatusRank(item.status) === 0;
            const metrics = item.metrics ?? [];

            return (
              <Reveal key={item.title} delay={i * 100}>
                <article
                  id={`case-${projectCaseStudyId(item)}`}
                  className={`group relative scroll-mt-28 overflow-hidden rounded-[16px] border bg-[var(--bg-elevated)]/25 transition duration-300 hover:border-[var(--border-hover)] xl:scroll-mt-24 ${
                    showDeepCta
                      ? "border-[var(--border-hover)]"
                      : "border-[var(--border-subtle)]"
                  }`}
                >
                  <div
                    className={`absolute inset-y-0 left-0 w-[2px] bg-[var(--text-primary)] transition duration-300 ${
                      showDeepCta || isLive
                        ? "opacity-100"
                        : "opacity-0 group-hover:opacity-100"
                    }`}
                    aria-hidden
                  />

                  <div className="p-5 sm:p-6 lg:p-8">
                    {/* Header row */}
                    <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-start sm:justify-between">
                      <div className="flex min-w-0 items-start gap-3 sm:gap-6">
                        <span className="shrink-0 font-display text-[11px] font-medium tracking-[0.15em] text-[var(--text-muted)]">
                          {indexStr}
                        </span>
                        <div className="min-w-0">
                          <h3 className="font-display text-lg font-medium tracking-tight text-[var(--text-primary)] sm:text-xl md:text-2xl">
                            {item.title}
                          </h3>
                          <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1.5">
                            {item.market ? (
                              <span className="text-xs font-medium tracking-wide text-[var(--text-secondary)]">
                                <span className="sr-only">
                                  {t("marketLabel")}:{" "}
                                </span>
                                {item.market}
                              </span>
                            ) : null}
                            {item.status ? (
                              <span
                                className={`inline-flex items-center gap-1.5 text-xs font-medium ${
                                  isLive
                                    ? "text-[var(--accent-strong)]"
                                    : "text-[var(--text-muted)]"
                                }`}
                              >
                                <span
                                  className={`h-1.5 w-1.5 rounded-full ${
                                    isLive
                                      ? "bg-[var(--accent-strong)]"
                                      : "bg-[var(--text-muted)]"
                                  }`}
                                  aria-hidden
                                />
                                {item.status}
                              </span>
                            ) : null}
                          </div>
                        </div>
                      </div>

                      {/* Stack badges — desktop */}
                      <div className="hidden flex-wrap gap-2 md:flex">
                        {item.stacks.slice(0, 4).map((tech) => (
                          <span
                            key={tech}
                            className="rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-base)]/80 px-2.5 py-1 text-xs font-medium text-[var(--text-muted)]"
                          >
                            {tech}
                          </span>
                        ))}
                        {item.stacks.length > 4 ? (
                          <span className="rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-base)]/80 px-2.5 py-1 text-xs font-medium text-[var(--text-muted)]">
                            +{item.stacks.length - 4}
                          </span>
                        ) : null}
                      </div>
                    </div>

                    {metrics.length > 0 ? (
                      <div className="mt-5 grid grid-cols-3 gap-3 border-t border-[var(--border-subtle)] pt-5 sm:mt-6 sm:gap-4">
                        {metrics.map((metric) => (
                          <div key={metric.label}>
                            <p className="font-display text-lg font-medium tracking-tight text-[var(--text-primary)] sm:text-xl">
                              {metric.value}
                            </p>
                            <p className="mt-0.5 text-[11px] leading-snug text-[var(--text-muted)] sm:text-xs">
                              {metric.label}
                            </p>
                          </div>
                        ))}
                      </div>
                    ) : null}

                    {/* Core narrative — Problem / Solution / Architecture */}
                    <div
                      className={`grid gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 ${
                        metrics.length > 0
                          ? "mt-5 border-t border-[var(--border-subtle)] pt-5 sm:mt-6 sm:pt-6"
                          : "mt-4 border-t border-[var(--border-subtle)] pt-4 sm:mt-6 sm:pt-6"
                      }`}
                    >
                      <div>
                        <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--text-muted)] sm:mb-3">
                          {t("problemLabel")}
                        </p>
                        <p className="text-pretty text-sm leading-relaxed text-[var(--text-secondary)]">
                          {item.problem}
                        </p>
                      </div>
                      <div>
                        <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--text-muted)] sm:mb-3">
                          {t("solutionLabel")}
                        </p>
                        <p className="text-pretty text-sm leading-relaxed text-[var(--text-secondary)]">
                          {item.solution}
                        </p>
                      </div>
                      <div>
                        <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--text-muted)] sm:mb-3">
                          {t("architectureLabel")}
                        </p>
                        <p className="text-pretty text-sm leading-relaxed text-[var(--text-secondary)]">
                          {item.architecture}
                        </p>
                      </div>
                    </div>

                    {/* Detail rows — systems page only */}
                    {showDetail ? (
                      <FeaturedProjectDetails summary={t("detailsSummary")}>
                        <div className="grid gap-6 lg:grid-cols-2 lg:gap-8">
                          <div>
                            <p className="mb-3 flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--text-muted)]">
                              <svg
                                viewBox="0 0 16 16"
                                fill="none"
                                className="h-3.5 w-3.5"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                aria-hidden
                              >
                                <path
                                  d="M8 1.5L2 4v4c0 3.3 2.5 5.8 6 6.5 3.5-.7 6-3.2 6-6.5V4L8 1.5z"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                              {t("securityLabel")}
                            </p>
                            <p className="text-sm leading-relaxed text-[var(--text-secondary)]">
                              {item.security}
                            </p>
                          </div>
                          <div>
                            <p className="mb-3 flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--text-muted)]">
                              <svg
                                viewBox="0 0 16 16"
                                fill="none"
                                className="h-3.5 w-3.5"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                aria-hidden
                              >
                                <path
                                  d="M2 12l4-4 3 3 5-6"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                              {t("scaleLabel")}
                            </p>
                            <p className="text-sm leading-relaxed text-[var(--text-secondary)]">
                              {item.scale}
                            </p>
                          </div>
                        </div>
                        <ArchitectureFlow
                          label={t("architectureFlowLabel")}
                          steps={item.architectureFlow}
                        />
                        <div className="mt-6 grid gap-6 border-t border-[var(--border-subtle)] pt-6 lg:grid-cols-2 lg:gap-8">
                          <div>
                            <DetailLabel>{t("constraintsLabel")}</DetailLabel>
                            <DetailList items={item.constraints} />
                          </div>
                          <div>
                            <DetailLabel>{t("decisionsLabel")}</DetailLabel>
                            <DecisionList decisions={item.decisions} />
                          </div>
                          <div>
                            <DetailLabel>{t("tradeoffsLabel")}</DetailLabel>
                            <p className="text-sm leading-relaxed text-[var(--text-secondary)]">
                              {item.tradeoffs}
                            </p>
                          </div>
                          <div>
                            <DetailLabel>
                              {t("bankingOutcomeLabel")}
                            </DetailLabel>
                            <p className="text-sm leading-relaxed text-[var(--text-secondary)]">
                              {item.bankingOutcome}
                            </p>
                          </div>
                        </div>
                      </FeaturedProjectDetails>
                    ) : null}

                    {/* Impact callout */}
                    <div className="mt-5 flex flex-col gap-3 border-t border-[var(--border-subtle)] pt-5 sm:flex-row sm:items-start sm:justify-between">
                      <div className="flex-1">
                        <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--accent-strong)]">
                          {t("impactLabel")}
                        </p>
                        <p className="text-sm font-medium leading-relaxed text-[var(--text-primary)]">
                          {item.impact}
                        </p>
                      </div>

                      {/* Mobile stack badges */}
                      <div className="flex flex-wrap gap-2 md:hidden">
                        {item.stacks.map((tech) => (
                          <span
                            key={tech}
                            className="rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-base)]/80 px-2.5 py-1 text-xs font-medium text-[var(--text-muted)]"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>

                      <div className="flex shrink-0 flex-col items-stretch gap-2 sm:items-end">
                        {showDeepCta ? (
                          <Link
                            href={deepHref}
                            className="btn-outline inline-flex min-h-11 items-center justify-center gap-1.5 px-4 text-sm font-medium"
                          >
                            {t("readCaseStudy")}
                            <span aria-hidden>→</span>
                          </Link>
                        ) : null}
                        {external ? (
                          <a
                            href={external}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`inline-flex min-h-11 items-center justify-center gap-1.5 text-sm underline-offset-4 transition hover:underline ${
                              showDeepCta
                                ? "font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                                : "font-medium text-[var(--text-primary)]"
                            }`}
                          >
                            {item.linkLabel}
                            <span aria-hidden>→</span>
                          </a>
                        ) : null}
                      </div>
                    </div>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>

        {/* Inline bridge only when MidPageCta is not used on the page */}
        {!showDetail ? (
          <Reveal delay={320}>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 rounded-[16px] border border-dashed border-[var(--border-subtle)] bg-[var(--bg-elevated)]/20 px-4 py-6 text-center sm:mt-10 sm:flex-row sm:gap-8 sm:px-8 sm:py-8">
              <div className="max-w-md">
                <p className="text-pretty text-sm font-medium text-[var(--text-primary)] sm:text-base">
                  {t("bridgeTitle")}
                </p>
                <p className="mt-2 text-sm text-[var(--text-secondary)]">
                  {t("bridgeSubtitle")}
                </p>
              </div>
              <Link
                href="/#contact"
                className="btn-primary inline-flex min-h-12 w-full shrink-0 items-center justify-center px-8 py-3 text-sm sm:w-auto"
              >
                {t("bridgeCta")}
              </Link>
            </div>
          </Reveal>
        ) : null}
      </div>
    </section>
  );
}
