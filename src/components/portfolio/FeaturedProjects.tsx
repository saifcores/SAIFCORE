import { Reveal } from "./Reveal";

const projects = [
  {
    title: "Multi-tenant B2B SaaS",
    context:
      "Greenfield platform with org isolation, role-based access, and usage-based billing.",
    stack: ["Next.js", "PostgreSQL", "Redis", "Stripe"],
    impact: "40% faster feature cycle via modular domains",
  },
  {
    title: "Cross-border payments hub",
    context:
      "Unified orchestration across PSPs with reconciliation and audit trails.",
    stack: ["Node.js", "Kafka", "PostgreSQL", "Temporal"],
    impact: "Sub-second auth path at peak settlement windows",
  },
  {
    title: "Realtime analytics pipeline",
    context:
      "Event ingestion, enrichment, and dashboards for product and finance teams.",
    stack: ["TypeScript", "ClickHouse", "S3", "Airflow"],
    impact: "Same-day insights vs. weekly batch exports",
  },
];

export function FeaturedProjects() {
  return (
    <section id="work" className="px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-[1280px]">
        <Reveal>
          <h2 className="text-3xl font-bold tracking-tight text-[var(--text-primary)] sm:text-4xl">
            Featured projects
          </h2>
          <p className="mt-4 max-w-2xl text-[var(--text-secondary)]">
            Selected work — anonymized where needed. Impact over vanity metrics.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-8 lg:grid-cols-3">
          {projects.map((p, i) => (
            <Reveal key={p.title} delay={i * 90}>
              <article className="group relative flex h-full flex-col overflow-hidden rounded-[20px] border border-[var(--border-subtle)] bg-[var(--bg-elevated)]/40 p-8 transition duration-300 hover:-translate-y-2 hover:border-indigo-500/25 hover:shadow-[0_24px_64px_-16px_rgba(79,70,229,0.35)]">
                <div
                  className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full bg-gradient-to-br from-indigo-600/25 to-cyan-500/10 blur-2xl transition group-hover:opacity-100 opacity-70"
                  aria-hidden
                />
                <h3 className="relative text-xl font-semibold text-[var(--text-primary)]">
                  {p.title}
                </h3>
                <p className="relative mt-3 flex-1 text-sm leading-relaxed text-[var(--text-secondary)]">
                  {p.context}
                </p>
                <div className="relative mt-6 flex flex-wrap gap-2">
                  {p.stack.map((t) => (
                    <span
                      key={t}
                      className="rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-base)]/80 px-2.5 py-1 text-xs font-medium text-[var(--text-muted)]"
                    >
                      {t}
                    </span>
                  ))}
                </div>
                <div className="relative mt-6 rounded-xl border border-indigo-500/20 bg-gradient-to-r from-indigo-500/10 to-cyan-500/5 px-4 py-3 text-sm font-medium text-[var(--text-primary)]">
                  <span className="text-xs font-semibold uppercase tracking-wider text-[var(--accent-cyan)]">
                    Impact
                  </span>
                  <p className="mt-1">{p.impact}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
