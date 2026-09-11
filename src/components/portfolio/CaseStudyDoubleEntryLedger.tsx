import { ArrowUpRight } from "lucide-react";
import { getMessages, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { DetailLabel } from "./DetailLabel";
import { Reveal } from "./Reveal";

const REPO_URL = "https://github.com/saifcores/double-entry-ledger-platform";

export async function CaseStudyDoubleEntryLedger() {
  const t = await getTranslations("caseStudyDoubleEntryLedger");
  const tCommon = await getTranslations("common");
  const messages = await getMessages();
  const content = messages.caseStudyDoubleEntryLedger;
  const opensInNewTab = tCommon("opensInNewTab");

  return (
    <>
      <section className="border-b border-[var(--border-subtle)] px-4 py-10 sm:px-6 sm:py-12 md:py-16 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <Link
              href="/systems"
              className="inline-flex min-h-11 items-center text-sm font-medium text-[var(--text-muted)] transition hover:text-[var(--text-primary)]"
            >
              ← {t("backToSystems")}
            </Link>

            <div className="mt-6 grid gap-10 lg:mt-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:items-end lg:gap-14">
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.18em] text-[var(--text-muted)]">
                  {t("eyebrow")}
                </p>
                <h1 className="mt-3 font-display text-pretty text-3xl font-medium tracking-tight text-[var(--text-primary)] sm:text-4xl md:text-5xl">
                  {t("title")}
                </h1>
                <p className="mt-4 max-w-xl text-pretty text-base leading-relaxed text-[var(--text-secondary)] sm:text-lg">
                  {t("subtitle")}
                </p>
                <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1.5">
                  <span className="text-xs font-medium tracking-wide text-[var(--text-secondary)]">
                    {t("market")}
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-xs font-medium text-[var(--text-muted)]">
                    <span
                      className="h-1.5 w-1.5 rounded-full bg-[var(--text-muted)]"
                      aria-hidden
                    />
                    {t("status")}
                  </span>
                </div>
                <div className="mt-6 flex w-full flex-col gap-2 min-[420px]:flex-row min-[420px]:flex-wrap">
                  <a
                    href={REPO_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${t("repoCta")} (${opensInNewTab})`}
                    className="btn-primary inline-flex min-h-12 w-full items-center justify-center gap-2 px-6 text-sm min-[420px]:w-auto"
                  >
                    {t("repoCta")}
                    <ArrowUpRight className="h-4 w-4" aria-hidden />
                  </a>
                  <Link
                    href="/#offers"
                    className="btn-outline inline-flex min-h-12 w-full items-center justify-center px-6 text-sm font-medium min-[420px]:w-auto"
                  >
                    {t("offersCta")}
                  </Link>
                </div>
              </div>

              <div className="border-l-2 border-[var(--accent-strong)] pl-5 sm:pl-6">
                <p className="text-pretty text-sm font-medium leading-relaxed text-[var(--text-primary)] sm:text-base">
                  {t("proofLine")}
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="border-b border-[var(--border-subtle)] px-4 py-12 sm:px-6 sm:py-14 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <DetailLabel>{t("metricsLabel")}</DetailLabel>
            <div className="mt-4 grid gap-3 sm:grid-cols-3 sm:gap-4">
              {content.metrics.map((metric) => (
                <div
                  key={metric.label}
                  className="rounded-[16px] border border-[var(--border-subtle)] bg-[var(--bg-elevated)]/25 p-4 sm:p-5"
                >
                  <p className="font-display text-2xl font-medium tracking-tight text-[var(--text-primary)] sm:text-3xl">
                    {metric.value}
                  </p>
                  <p className="mt-1.5 text-sm font-semibold text-[var(--text-primary)]">
                    {metric.label}
                  </p>
                  <p className="mt-1 text-xs leading-relaxed text-[var(--text-muted)]">
                    {metric.description}
                  </p>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={60}>
            <div className="mt-12 border-t border-[var(--border-subtle)] pt-10">
              <DetailLabel>{t("routingRuleLabel")}</DetailLabel>
              <p className="max-w-3xl text-pretty text-sm font-medium leading-relaxed text-[var(--text-primary)] sm:text-base">
                {t("routingRule")}
              </p>
            </div>
          </Reveal>

          <Reveal delay={80}>
            <div className="mt-12 grid gap-8 border-t border-[var(--border-subtle)] pt-10 lg:grid-cols-2 lg:gap-14">
              <div>
                <DetailLabel>{t("problemLabel")}</DetailLabel>
                <p className="text-pretty text-sm leading-relaxed text-[var(--text-secondary)] sm:text-base">
                  {t("problem")}
                </p>
              </div>
              <div>
                <DetailLabel>{t("solutionLabel")}</DetailLabel>
                <p className="text-pretty text-sm leading-relaxed text-[var(--text-secondary)] sm:text-base">
                  {t("solution")}
                </p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <div className="mt-12 border-t border-[var(--border-subtle)] pt-10">
              <DetailLabel>{t("constraintsLabel")}</DetailLabel>
              <ul className="mt-1 grid gap-3 sm:grid-cols-2">
                {content.constraints.map((item) => (
                  <li
                    key={item}
                    className="flex gap-2.5 text-sm leading-relaxed text-[var(--text-secondary)]"
                  >
                    <span
                      className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--accent-strong)]"
                      aria-hidden
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="border-b border-[var(--border-subtle)] px-4 py-12 sm:px-6 sm:py-14 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <DetailLabel>{t("architectureFlowLabel")}</DetailLabel>
            <ol className="mt-4 grid list-none grid-cols-2 gap-2 p-0 sm:grid-cols-5 sm:gap-0">
              {content.architectureFlow.map((step, i) => (
                <li
                  key={`${step}-${i}`}
                  className="relative flex min-w-0 flex-col border border-[var(--border-subtle)] bg-[var(--bg-elevated)]/25 px-3 py-3 sm:border-r-0 sm:px-4 sm:py-4 sm:last:border-r"
                >
                  <span className="font-mono text-[10px] tabular-nums text-[var(--text-muted)]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="mt-1.5 text-xs font-medium text-[var(--text-primary)] sm:text-sm">
                    {step}
                  </span>
                </li>
              ))}
            </ol>
            <div className="mt-6 max-w-3xl">
              <DetailLabel>{t("architectureLabel")}</DetailLabel>
              <p className="text-pretty text-sm leading-relaxed text-[var(--text-secondary)] sm:text-base">
                {t("architecture")}
              </p>
            </div>
          </Reveal>

          <Reveal delay={80}>
            <div className="mt-12 grid gap-10 border-t border-[var(--border-subtle)] pt-10 lg:grid-cols-2 lg:gap-14">
              <div>
                <DetailLabel>{t("decisionsLabel")}</DetailLabel>
                <ol className="mt-1 space-y-5">
                  {content.decisions.map((decision, i) => (
                    <li key={decision.title} className="flex gap-3">
                      <span className="mt-0.5 font-mono text-[11px] tabular-nums text-[var(--text-muted)]">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <div>
                        <p className="text-sm font-semibold text-[var(--text-primary)]">
                          {decision.title}
                        </p>
                        <p className="mt-1 text-sm leading-relaxed text-[var(--text-secondary)]">
                          {decision.body}
                        </p>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
              <div>
                <DetailLabel>{t("tradeoffsLabel")}</DetailLabel>
                <p className="text-sm leading-relaxed text-[var(--text-secondary)] sm:text-base">
                  {t("tradeoffs")}
                </p>
                <div className="mt-8">
                  <DetailLabel>{t("stacksLabel")}</DetailLabel>
                  <div className="flex flex-wrap gap-2">
                    {content.stacks.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-elevated)]/40 px-2.5 py-1 text-xs font-medium text-[var(--text-muted)]"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="mt-8">
                  <DetailLabel>{t("nextLabel")}</DetailLabel>
                  <ol className="mt-1 space-y-3">
                    {content.next.map((item, i) => (
                      <li key={item} className="flex gap-3">
                        <span className="mt-0.5 font-mono text-[11px] tabular-nums text-[var(--text-muted)]">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <p className="text-sm leading-relaxed text-[var(--text-secondary)]">
                          {item}
                        </p>
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
