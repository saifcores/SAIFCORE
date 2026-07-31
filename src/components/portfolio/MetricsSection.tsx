import { getMessages, getTranslations } from "next-intl/server";
import { Reveal } from "./Reveal";

const METRIC_COLORS = [
  {
    accent: "text-emerald-400",
    bg: "from-emerald-500/10 to-emerald-500/4",
    border: "border-emerald-500/20",
  },
  {
    accent: "text-accent",
    bg: "from-blue-500/10 to-blue-500/4",
    border: "border-blue-500/20",
  },
  {
    accent: "text-violet-400",
    bg: "from-violet-500/10 to-violet-500/4",
    border: "border-violet-500/20",
  },
  {
    accent: "text-amber-400",
    bg: "from-amber-500/10 to-amber-500/4",
    border: "border-amber-500/20",
  },
] as const;

export async function MetricsSection() {
  const t = await getTranslations("metricsSection");
  const messages = await getMessages();
  const { metrics } = messages.metricsSection;

  return (
    <section
      id="metrics"
      className="border-b border-[var(--border-subtle)] px-4 py-10 sm:px-6 sm:py-12 lg:px-8 lg:py-16"
    >
      <div className="mx-auto max-w-[1280px]">
        <Reveal>
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.18em] text-[var(--text-muted)]">
            {t("label")}
          </p>
          <h2 className="max-w-2xl text-pretty text-2xl font-bold tracking-tight text-[var(--text-primary)] sm:text-3xl">
            {t("title")}
          </h2>
          <p className="mt-2 max-w-xl text-pretty text-sm text-[var(--text-secondary)]">
            {t("subtitle")}
          </p>
        </Reveal>

        <div className="mt-8 grid gap-3 sm:mt-10 sm:grid-cols-2 lg:grid-cols-4">
          {metrics.map((metric, i) => {
            const color = METRIC_COLORS[i % METRIC_COLORS.length];
            return (
              <Reveal key={metric.label} delay={i * 60}>
                <div
                  className={`rounded-xl border bg-gradient-to-br ${color.bg} ${color.border} p-4 sm:p-5`}
                >
                  <p
                    className={`text-2xl font-bold tracking-tight sm:text-3xl ${color.accent}`}
                  >
                    {metric.value}
                  </p>
                  <p className="mt-1.5 text-sm font-semibold text-[var(--text-primary)]">
                    {metric.label}
                  </p>
                  <p className="mt-1 text-xs leading-relaxed text-[var(--text-muted)]">
                    {metric.description}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
