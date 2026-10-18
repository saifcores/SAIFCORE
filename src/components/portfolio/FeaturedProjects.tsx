import { getMessages, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { projectCaseStudyId } from "@/seo";
import {
  getCaseStudyHref,
  hasDedicatedCaseStudyPage,
  projectKind,
  projectStatusRank,
  sortProjectsLiveFirst,
} from "@/data/case-studies";
import { CaseStudyFilter } from "./CaseStudyFilter";
import { Reveal } from "./Reveal";

type Props = {
  /** Systems page: filter + featured live product, compact rest. */
  showDetail?: boolean;
};

export async function FeaturedProjects({ showDetail = false }: Props) {
  const messages = await getMessages();
  const items = sortProjectsLiveFirst(messages.featuredProjects.items);
  const t = await getTranslations("featuredProjects");
  const tSystems = await getTranslations("systemsPage");
  const tCommon = await getTranslations("common");
  const opensInNewTab = tCommon("opensInNewTab");

  const counts = {
    all: items.length,
    live: items.filter((item) => projectKind(item) === "live").length,
    lab: items.filter((item) => projectKind(item) === "lab").length,
    confidential: items.filter((item) => projectKind(item) === "confidential")
      .length,
  };

  const cards = items.map((item, i) => {
    const kind = projectKind(item);
    const isFeatured = showDetail && kind === "live";
    const external = item.href.trim();
    const deepHref = getCaseStudyHref(item);
    const showDeepCta = hasDedicatedCaseStudyPage(item);
    const isLive = projectStatusRank(item.status) === 0;
    const primaryMetric = item.metrics?.[0];
    const outcome = item.impact || item.solution;
    const caseCta = item.disclosure.trim()
      ? t("readPatterns")
      : t("readCaseStudy");

    return (
      <Reveal key={item.title} delay={i * 80} className="h-full">
        <article
          id={`case-${projectCaseStudyId(item)}`}
          data-kind={kind}
          className={`group relative scroll-mt-28 overflow-hidden rounded-[16px] border bg-[var(--bg-elevated)]/25 transition duration-300 hover:border-[var(--border-hover)] xl:scroll-mt-24 ${
            isFeatured || showDeepCta
              ? "border-[var(--border-hover)]"
              : "border-[var(--border-subtle)]"
          }`}
        >
          <div
            className={`absolute inset-y-0 left-0 w-[2px] bg-[var(--text-primary)] transition duration-300 ${
              isFeatured || isLive
                ? "opacity-100"
                : "opacity-0 group-hover:opacity-100"
            }`}
            aria-hidden
          />

          <div className={`p-5 sm:p-6 ${isFeatured ? "lg:p-9" : "lg:p-8"}`}>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div className="min-w-0">
                <h3
                  className={`font-display font-medium tracking-tight text-[var(--text-primary)] ${
                    isFeatured
                      ? "text-xl sm:text-2xl md:text-3xl"
                      : "text-lg sm:text-xl"
                  }`}
                >
                  {item.title}
                </h3>
                <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1.5">
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
                  {primaryMetric ? (
                    <span className="text-xs text-[var(--text-muted)]">
                      <span className="font-semibold text-[var(--text-secondary)]">
                        {primaryMetric.value}
                      </span>{" "}
                      {primaryMetric.label}
                    </span>
                  ) : null}
                </div>
              </div>
              {item.stacks.length > 0 ? (
                <div className="hidden flex-wrap gap-2 md:flex">
                  {item.stacks.slice(0, isFeatured ? 5 : 4).map((tech) => (
                    <span
                      key={tech}
                      className="rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-base)]/80 px-2.5 py-1 text-xs font-medium text-[var(--text-muted)]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              ) : null}
            </div>

            {item.disclosure.trim() ? (
              <p className="mt-3 max-w-2xl rounded-[10px] border border-[var(--border-subtle)] bg-[var(--bg-base)]/60 px-3 py-2 text-xs leading-relaxed text-[var(--text-muted)]">
                <span className="font-semibold text-[var(--text-secondary)]">
                  {t("disclosureLabel")}
                  {": "}
                </span>
                {item.disclosure}
              </p>
            ) : null}

            <p
              className={`mt-4 text-sm leading-relaxed text-[var(--text-secondary)] ${
                isFeatured ? "max-w-3xl" : "line-clamp-3"
              }`}
            >
              {item.problem}
            </p>
            <p
              className={`mt-3 text-sm leading-relaxed text-[var(--text-muted)] ${
                isFeatured ? "max-w-3xl" : "line-clamp-2"
              }`}
            >
              <span className="font-medium text-[var(--text-secondary)]">
                {t("outcomeLabel")}
              </span>{" "}
              {outcome}
            </p>

            {isFeatured && item.architectureFlow.length > 0 ? (
              <div className="relative mt-6 overflow-hidden rounded-[16px] border border-[var(--border-subtle)] bg-[var(--bg-base)]/50 px-4 py-4 sm:px-5 sm:py-5">
                <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--text-muted)]">
                  {t("architectureFlowLabel")}
                </p>
                <ol className="mt-3 flex list-none flex-wrap items-center gap-2 p-0">
                  {item.architectureFlow.map((step, stepIndex) => (
                    <li
                      key={`${step}-${stepIndex}`}
                      className="flex items-center gap-2"
                    >
                      <span className="inline-flex items-center gap-2 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-elevated)]/80 px-3 py-1.5 text-xs font-medium text-[var(--text-primary)]">
                        <span className="font-mono text-[10px] tabular-nums text-[var(--accent-strong)]">
                          {String(stepIndex + 1).padStart(2, "0")}
                        </span>
                        {step}
                      </span>
                      {stepIndex < item.architectureFlow.length - 1 ? (
                        <span
                          className="text-xs text-[var(--text-muted)]"
                          aria-hidden
                        >
                          →
                        </span>
                      ) : null}
                    </li>
                  ))}
                </ol>
              </div>
            ) : null}

            {showDeepCta || external ? (
              <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2">
                {showDeepCta ? (
                  <Link
                    href={deepHref}
                    className="inline-flex min-h-10 items-center text-sm font-semibold text-[var(--text-primary)] transition hover:opacity-70"
                  >
                    {caseCta}
                  </Link>
                ) : null}
                {external ? (
                  <a
                    href={external}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${item.linkLabel} (${opensInNewTab})`}
                    className="inline-flex min-h-10 items-center text-sm font-medium text-[var(--text-secondary)] transition hover:text-[var(--text-primary)]"
                  >
                    {item.linkLabel}
                  </a>
                ) : null}
              </div>
            ) : null}
          </div>
        </article>
      </Reveal>
    );
  });

  return (
    <section id="work" className="py-14 sm:py-16 lg:py-20">
      <div className="page-container">
        {showDetail ? (
          <CaseStudyFilter
            label={tSystems("filterLabel")}
            labels={{
              all: tSystems("filterAll"),
              live: tSystems("filterLive"),
              lab: tSystems("filterLab"),
              confidential: tSystems("filterConfidential"),
            }}
            counts={counts}
          >
            {cards}
          </CaseStudyFilter>
        ) : (
          <div className="space-y-5 sm:space-y-6">{cards}</div>
        )}
      </div>
    </section>
  );
}
