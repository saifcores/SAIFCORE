import { getMessages, getTranslations } from "next-intl/server";
import { Reveal } from "./Reveal";

/** 30 representative uptime data points (percentage 0–100) */
const UPTIME_BARS = [
  100, 100, 100, 98, 100, 100, 99, 100, 100, 100, 100, 99, 100, 100, 100, 100,
  98, 100, 100, 100, 100, 100, 99, 100, 100, 100, 100, 100, 100, 100,
] as const;

const METRIC_COLORS = [
  {
    accent: "text-emerald-400",
    bg: "from-emerald-500/10 to-emerald-500/4",
    border: "border-emerald-500/20",
    glow: "rgba(16,185,129,0.15)",
  },
  {
    accent: "text-accent",
    bg: "from-blue-500/10 to-blue-500/4",
    border: "border-blue-500/20",
    glow: "rgba(37,99,235,0.15)",
  },
  {
    accent: "text-violet-400",
    bg: "from-violet-500/10 to-violet-500/4",
    border: "border-violet-500/20",
    glow: "rgba(124,58,237,0.15)",
  },
  {
    accent: "text-amber-400",
    bg: "from-amber-500/10 to-amber-500/4",
    border: "border-amber-500/20",
    glow: "rgba(245,158,11,0.15)",
  },
] as const;

export async function MetricsSection() {
  const t = await getTranslations("metricsSection");
  const messages = await getMessages();
  const { metrics, principles } = messages.metricsSection;

  return (
    <section className="border-b border-[var(--border-subtle)] px-4 py-16 sm:py-20 lg:py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-[1280px]">
        <Reveal>
          <p className="mb-4 text-xs font-medium uppercase tracking-[0.18em] text-[var(--text-muted)]">
            {t("label")}
          </p>
          <h2 className="max-w-2xl text-3xl font-bold tracking-tight text-[var(--text-primary)] sm:text-4xl">
            {t("title")}
          </h2>
          <p className="mt-4 max-w-xl text-[var(--text-secondary)]">
            {t("subtitle")}
          </p>
        </Reveal>

        {/* Metrics grid */}
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {metrics.map((metric, i) => {
            const color = METRIC_COLORS[i % METRIC_COLORS.length];
            return (
              <Reveal key={metric.label} delay={i * 80}>
                <div
                  className={`group relative overflow-hidden rounded-2xl border bg-gradient-to-br ${color.bg} ${color.border} p-6 transition duration-300 hover:brightness-110`}
                >
                  {/* Subtle glow on hover */}
                  <div
                    className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition duration-300 group-hover:opacity-100"
                    style={{
                      boxShadow: `inset 0 0 40px -20px ${color.glow}`,
                    }}
                    aria-hidden
                  />
                  <p
                    className={`relative text-3xl font-bold tracking-tight sm:text-4xl md:text-[2.75rem] ${color.accent}`}
                  >
                    {metric.value}
                  </p>
                  <p className="relative mt-2 text-sm font-semibold text-[var(--text-primary)]">
                    {metric.label}
                  </p>
                  <p className="relative mt-1 text-xs leading-relaxed text-[var(--text-muted)]">
                    {metric.description}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>

        {/* System health + Infrastructure principles */}
        <div className="mt-8 grid gap-6 md:grid-cols-[1fr_minmax(260px,400px)]">
          {/* Uptime chart */}
          <Reveal>
            <div className="glass rounded-2xl p-6">
              <div className="flex items-center justify-between">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--text-muted)]">
                  {t("uptimeChartLabel")}
                </p>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/25 bg-emerald-500/10 px-2.5 py-1 text-[11px] font-semibold text-emerald-400">
                  <span
                    className="h-1.5 w-1.5 rounded-full bg-emerald-400"
                    style={{ animation: "pulse 2s ease-in-out infinite" }}
                    aria-hidden
                  />
                  {t("uptimeStatus")}
                </span>
              </div>

              {/* Bar chart */}
              <div
                className="mt-5 flex items-end gap-[3px]"
                role="img"
                aria-label={t("uptimeSummary")}
              >
                {UPTIME_BARS.map((h, i) => (
                  <div
                    key={i}
                    className="flex-1 rounded-sm transition duration-200 hover:brightness-125"
                    style={{
                      height: `${Math.max(h * 0.36, 4)}px`,
                      background:
                        h >= 99
                          ? "rgba(16, 185, 129, 0.55)"
                          : "rgba(245, 158, 11, 0.5)",
                    }}
                  />
                ))}
              </div>

              {/* Chart footer */}
              <div className="mt-3 flex items-center justify-between">
                <p className="text-xs text-[var(--text-muted)]">
                  {t("uptimeSummary")}
                </p>
                <div className="flex items-center gap-4 text-[11px] text-[var(--text-muted)]">
                  <span className="flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-sm bg-emerald-500/55" />
                    100%
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-sm bg-amber-500/50" />
                    Degraded
                  </span>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Infrastructure principles */}
          <Reveal delay={100}>
            <div className="glass rounded-2xl p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--text-muted)]">
                {t("principlesTitle")}
              </p>
              <ul className="mt-5 space-y-3.5">
                {principles.map((principle, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-3 text-sm leading-relaxed"
                  >
                    <span
                      className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gradient-to-r from-blue-400 to-emerald-400"
                      aria-hidden
                    />
                    <span className="text-[var(--text-secondary)]">
                      {principle}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
