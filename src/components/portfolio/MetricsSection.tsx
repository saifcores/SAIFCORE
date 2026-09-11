import { getMessages, getTranslations } from "next-intl/server";
import { Reveal } from "./Reveal";

export async function MetricsSection() {
  const t = await getTranslations("metricsSection");
  const messages = await getMessages();
  const { metrics } = messages.metricsSection;

  return (
    <section
      id="metrics"
      className="border-b border-[var(--border-subtle)] px-4 py-14 sm:px-6 sm:py-16 lg:px-8 lg:py-20"
    >
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.18em] text-[var(--text-muted)]">
            {t("label")}
          </p>
          <h2 className="max-w-2xl font-display text-pretty text-2xl font-medium tracking-tight text-[var(--text-primary)] sm:text-3xl">
            {t("title")}
          </h2>
          <p className="mt-2 max-w-xl text-pretty text-sm text-[var(--text-secondary)]">
            {t("subtitle")}
          </p>
        </Reveal>

        <div className="mt-8 grid gap-3 sm:mt-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-4">
          {metrics.map((metric, i) => (
            <Reveal key={metric.label} delay={i * 60}>
              <div className="rounded-[16px] border border-[var(--border-subtle)] bg-[var(--bg-elevated)]/25 p-4 sm:p-5">
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
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
