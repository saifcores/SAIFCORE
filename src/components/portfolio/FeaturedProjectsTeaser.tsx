import { getMessages, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Reveal } from "./Reveal";

export async function FeaturedProjectsTeaser() {
  const messages = await getMessages();
  const items = messages.featuredProjects.items;
  const t = await getTranslations("featuredProjects");

  return (
    <section
      id="work"
      className="border-b border-[var(--border-subtle)] px-4 py-16 sm:py-20 lg:py-24 sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-[1280px]">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="mb-4 text-xs font-medium uppercase tracking-[0.18em] text-[var(--text-muted)]">
                {t("title")}
              </p>
              <h2 className="max-w-2xl text-3xl font-bold tracking-tight text-[var(--text-primary)] sm:text-4xl">
                {t("heading")}
              </h2>
              <p className="mt-4 max-w-xl text-[var(--text-secondary)]">
                {t("subtitle")}
              </p>
            </div>
            <Link
              href="/systems"
              className="inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold text-accent transition hover:text-[var(--accent-blue-light)]"
            >
              {t("viewAll")}
              <span aria-hidden>→</span>
            </Link>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {items.map((item, i) => {
            const indexStr = String(i + 1).padStart(2, "0");
            const metrics = "metrics" in item ? item.metrics : [];
            return (
              <Reveal key={item.title} delay={i * 80}>
                <Link
                  href="/systems"
                  className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-elevated)]/20 transition duration-300 hover:-translate-y-1 hover:border-[var(--border-hover)] hover:bg-[var(--bg-elevated)]/40"
                >
                  <div
                    className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-[var(--accent-blue)] to-[var(--accent-emerald)] opacity-0 transition duration-300 group-hover:opacity-100"
                    aria-hidden
                  />

                  <div className="relative flex aspect-[16/9] items-center justify-center border-b border-[var(--border-subtle)] bg-gradient-to-br from-blue-500/8 via-[var(--bg-base)]/80 to-emerald-500/8">
                    <div className="bg-grid absolute inset-0 opacity-40" />
                    <div className="relative w-[92%] max-w-xs rounded-lg border sm:w-[88%] sm:max-w-sm border-[var(--border-subtle)] bg-[var(--bg-elevated)]/80 p-4 shadow-lg backdrop-blur-sm transition group-hover:border-[var(--border-hover)]">
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
                      {t("screenshotLabel")}
                    </span>
                  </div>

                  <div className="flex flex-1 flex-col p-5 sm:p-6">
                    <div className="flex items-start justify-between gap-3">
                      <span className="font-mono text-[11px] font-semibold tracking-[0.15em] text-[var(--text-muted)]">
                        {indexStr}
                      </span>
                      {item.status ? (
                        <span className="inline-flex items-center gap-1 text-[11px] font-medium text-emerald-400">
                          <span
                            className="h-1.5 w-1.5 rounded-full bg-emerald-400"
                            aria-hidden
                          />
                          {item.status}
                        </span>
                      ) : null}
                    </div>

                    <h3 className="mt-3 text-lg font-semibold leading-snug text-[var(--text-primary)] transition group-hover:text-accent">
                      {item.title}
                    </h3>

                    <p className="mt-2 text-sm leading-relaxed text-[var(--text-secondary)] line-clamp-2">
                      {item.solution}
                    </p>

                    {Array.isArray(metrics) && metrics.length > 0 ? (
                      <div className="mt-5 grid grid-cols-2 gap-3">
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

                    <div className="mt-5 flex flex-wrap gap-1.5 border-t border-[var(--border-subtle)] pt-4">
                      {item.stacks.slice(0, 4).map((tech) => (
                        <span
                          key={tech}
                          className="rounded-md border border-[var(--border-subtle)] bg-[var(--bg-base)]/60 px-2 py-0.5 text-[11px] font-medium text-[var(--text-muted)]"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </Link>
              </Reveal>
            );
          })}
        </div>

        <Reveal delay={320}>
          <div className="mt-10 flex justify-center">
            <Link
              href="/systems"
              className="inline-flex items-center gap-2 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-elevated)]/30 px-6 py-3 text-sm font-semibold text-[var(--text-secondary)] transition hover:border-[var(--border-hover)] hover:text-[var(--text-primary)]"
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
