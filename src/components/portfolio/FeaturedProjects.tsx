import { getTranslations } from "next-intl/server";
import { Reveal } from "./Reveal";

const stacks = [
  ["Next.js", "PostgreSQL", "Redis", "Stripe"],
  ["Node.js", "Kafka", "PostgreSQL", "Temporal"],
  ["TypeScript", "ClickHouse", "S3", "Airflow"],
] as const;

export async function FeaturedProjects() {
  const t = await getTranslations("featuredProjects");

  return (
    <section id="work" className="px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-[1280px]">
        <Reveal>
          <h2 className="text-3xl font-bold tracking-tight text-[var(--text-primary)] sm:text-4xl">
            {t("title")}
          </h2>
          <p className="mt-4 max-w-2xl text-[var(--text-secondary)]">
            {t("subtitle")}
          </p>
        </Reveal>

        <div className="mt-14 grid gap-8 lg:grid-cols-3">
          {[0, 1, 2].map((i) => (
            <Reveal key={i} delay={i * 90}>
              <article className="group relative flex h-full flex-col overflow-hidden rounded-[20px] border border-[var(--border-subtle)] bg-[var(--bg-elevated)]/40 p-8 transition duration-300 hover:-translate-y-2 hover:border-indigo-500/25 hover:shadow-[0_24px_64px_-16px_rgba(79,70,229,0.35)]">
                <div
                  className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full bg-gradient-to-br from-indigo-600/25 to-cyan-500/10 blur-2xl transition group-hover:opacity-100 opacity-70"
                  aria-hidden
                />
                <h3 className="relative text-xl font-semibold text-[var(--text-primary)]">
                  {t(`items.${i}.title`)}
                </h3>
                <p className="relative mt-3 flex-1 text-sm leading-relaxed text-[var(--text-secondary)]">
                  {t(`items.${i}.context`)}
                </p>
                <div className="relative mt-6 flex flex-wrap gap-2">
                  {stacks[i].map((tech) => (
                    <span
                      key={tech}
                      className="rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-base)]/80 px-2.5 py-1 text-xs font-medium text-[var(--text-muted)]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="relative mt-6 rounded-xl border border-indigo-500/20 bg-gradient-to-r from-indigo-500/10 to-cyan-500/5 px-4 py-3 text-sm font-medium text-[var(--text-primary)]">
                  <span className="text-xs font-semibold uppercase tracking-wider text-[var(--accent-cyan)]">
                    {t("impactLabel")}
                  </span>
                  <p className="mt-1">{t(`items.${i}.impact`)}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
