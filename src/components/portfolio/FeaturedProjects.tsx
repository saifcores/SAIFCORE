import { getMessages, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Reveal } from "./Reveal";

type Props = {
  /** When true, renders the Security and Scale fields (used on /systems page). */
  showDetail?: boolean;
};

export async function FeaturedProjects({ showDetail = false }: Props) {
  const messages = await getMessages();
  const items = messages.featuredProjects.items;
  const t = await getTranslations("featuredProjects");

  return (
    <section id="work" className="px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-[1280px]">
        {!showDetail ? (
          <Reveal>
            <p className="mb-4 text-xs font-medium uppercase tracking-[0.18em] text-[var(--text-muted)]">
              {t("title")}
            </p>
            <h2 className="max-w-2xl text-3xl font-bold tracking-tight text-[var(--text-primary)] sm:text-4xl">
              {t("heading")}
            </h2>
            <p className="mt-4 max-w-2xl text-[var(--text-secondary)]">
              {t("subtitle")}
            </p>
          </Reveal>
        ) : null}

        {/* Case study cards */}
        <div className={`space-y-8 ${!showDetail ? "mt-16" : ""}`}>
          {items.map((item, i) => {
            const external = item.href.trim();
            const indexStr = String(i + 1).padStart(2, "0");

            return (
              <Reveal key={item.title} delay={i * 100}>
                <article className="group relative overflow-hidden rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-elevated)]/30 transition duration-300 hover:border-white/12 hover:bg-[var(--bg-elevated)]/50">
                  {/* Left accent line */}
                  <div
                    className="absolute inset-y-0 left-0 w-[3px] rounded-l-2xl bg-gradient-to-b from-[#2563EB] to-[#10B981] opacity-0 transition duration-300 group-hover:opacity-100"
                    aria-hidden
                  />

                  <div className="p-8 sm:p-10 lg:p-12">
                    {/* Header row */}
                    <div className="flex flex-wrap items-start justify-between gap-4">
                      <div className="flex items-start gap-6">
                        <span className="shrink-0 font-mono text-[11px] font-semibold tracking-[0.15em] text-[var(--text-muted)]">
                          {indexStr}
                        </span>
                        <div>
                          <h3 className="text-xl font-bold tracking-tight text-[var(--text-primary)] sm:text-2xl">
                            {item.title}
                          </h3>
                          {item.status ? (
                            <span className="mt-2 inline-flex items-center gap-1.5 text-xs font-medium text-emerald-400">
                              <span
                                className="h-1.5 w-1.5 rounded-full bg-emerald-400"
                                aria-hidden
                              />
                              {item.status}
                            </span>
                          ) : null}
                        </div>
                      </div>

                      {/* Stack badges — desktop */}
                      <div className="hidden flex-wrap gap-2 lg:flex">
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

                    {/* Core narrative — Problem / Solution / Architecture */}
                    <div className="mt-8 grid gap-6 border-t border-[var(--border-subtle)] pt-8 lg:grid-cols-3 lg:gap-8">
                      <div>
                        <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--text-muted)]">
                          {t("problemLabel")}
                        </p>
                        <p className="text-sm leading-relaxed text-[var(--text-secondary)]">
                          {item.problem}
                        </p>
                      </div>
                      <div>
                        <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--text-muted)]">
                          {t("solutionLabel")}
                        </p>
                        <p className="text-sm leading-relaxed text-[var(--text-secondary)]">
                          {item.solution}
                        </p>
                      </div>
                      <div>
                        <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--text-muted)]">
                          {t("architectureLabel")}
                        </p>
                        <p className="text-sm leading-relaxed text-[var(--text-secondary)]">
                          {item.architecture}
                        </p>
                      </div>
                    </div>

                    {/* Detail rows — Security + Scale (systems page only) */}
                    {showDetail ? (
                      <div className="mt-6 grid gap-6 border-t border-[var(--border-subtle)] pt-6 lg:grid-cols-2 lg:gap-8">
                        <div>
                          <p className="mb-3 flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-violet-400">
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
                          <p className="mb-3 flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-amber-400">
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
                    ) : null}

                    {/* Impact callout */}
                    <div className="mt-6 flex flex-col gap-4 border-t border-[var(--border-subtle)] pt-6 sm:flex-row sm:items-start sm:justify-between">
                      <div className="flex-1">
                        <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-emerald-500">
                          {t("impactLabel")}
                        </p>
                        <p className="text-sm font-medium leading-relaxed text-[var(--text-primary)]">
                          {item.impact}
                        </p>
                      </div>

                      {/* Mobile stack badges */}
                      <div className="flex flex-wrap gap-2 lg:hidden">
                        {item.stacks.map((tech) => (
                          <span
                            key={tech}
                            className="rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-base)]/80 px-2.5 py-1 text-xs font-medium text-[var(--text-muted)]"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>

                      {external ? (
                        <a
                          href={external}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold text-[#2563EB] transition hover:text-blue-400"
                        >
                          {item.linkLabel}
                          <span aria-hidden>→</span>
                        </a>
                      ) : null}
                    </div>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>

        {/* Bridge CTA */}
        <Reveal delay={320}>
          <div className="mt-12 flex flex-col items-center justify-center gap-5 rounded-2xl border border-dashed border-[var(--border-subtle)] bg-[var(--bg-elevated)]/20 px-6 py-10 text-center sm:flex-row sm:gap-10 sm:px-12">
            <div className="max-w-md">
              <p className="text-base font-semibold text-[var(--text-primary)]">
                {t("bridgeTitle")}
              </p>
              <p className="mt-2 text-sm text-[var(--text-secondary)]">
                {t("bridgeSubtitle")}
              </p>
            </div>
            <Link
              href="/#contact"
              className="inline-flex shrink-0 items-center justify-center rounded-xl bg-gradient-to-r from-[#2563EB] to-[#10B981] px-8 py-3 text-sm font-semibold text-white shadow-[0_0_24px_-6px_rgba(37,99,235,0.45)] transition hover:brightness-110 active:scale-[0.98]"
            >
              {t("bridgeCta")}
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
