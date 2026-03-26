import { Reveal } from "./Reveal";

const steps = [
  {
    n: "01",
    title: "Understand business problem",
    body: "Stakeholders, constraints, and success metrics before touching tech.",
  },
  {
    n: "02",
    title: "Design architecture",
    body: "Clear boundaries, interfaces, and evolution paths your team can own.",
  },
  {
    n: "03",
    title: "Build scalable systems",
    body: "Pragmatic delivery with testing, CI, and operational guardrails.",
  },
  {
    n: "04",
    title: "Optimize for real-world usage",
    body: "Measure, tune, and harden where it matters for users and revenue.",
  },
];

export function HowIThink() {
  return (
    <section
      id="process"
      className="border-y border-[var(--border-subtle)] bg-[var(--bg-elevated)]/30 px-4 py-24 sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-[1280px]">
        <Reveal>
          <h2 className="text-3xl font-bold tracking-tight text-[var(--text-primary)] sm:text-4xl">
            How I think
          </h2>
          <p className="mt-4 max-w-2xl text-[var(--text-secondary)]">
            A disciplined loop from problem to resilient systems — no
            unnecessary ceremony.
          </p>
        </Reveal>

        <div className="mt-16 grid gap-8 lg:grid-cols-2 lg:gap-20">
          <Reveal>
            <div className="relative rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-base)]/50 p-8 sm:p-10">
              <div className="bg-grid pointer-events-none absolute inset-0 rounded-2xl opacity-40" />
              <ol className="relative space-y-0">
                {steps.map((s, i) => (
                  <li key={s.n} className="flex gap-5 sm:gap-6">
                    <div className="flex flex-col items-center">
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[var(--border-subtle)] bg-[var(--bg-elevated)] text-sm font-mono font-semibold text-[var(--accent-cyan)]">
                        {s.n}
                      </span>
                      {i < steps.length - 1 ? (
                        <span
                          className="my-2 min-h-[40px] w-px flex-1 bg-gradient-to-b from-indigo-500/45 to-transparent sm:min-h-[52px]"
                          aria-hidden
                        />
                      ) : null}
                    </div>
                    <div
                      className={`pb-10 pt-0.5 ${i === steps.length - 1 ? "pb-0" : ""}`}
                    >
                      <h3 className="font-semibold text-[var(--text-primary)]">
                        {s.title}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-[var(--text-secondary)]">
                        {s.body}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <div className="flex h-full flex-col justify-center">
              <div className="glass rounded-2xl p-8 sm:p-10">
                <p className="text-sm font-medium uppercase tracking-widest text-[var(--text-muted)]">
                  Operating model
                </p>
                <p className="mt-4 text-lg font-medium leading-relaxed text-[var(--text-primary)]">
                  Architecture is a product: documented decisions, measurable
                  outcomes, and room for your team to evolve the system without
                  heroics.
                </p>
                <ul className="mt-8 space-y-3 text-sm text-[var(--text-secondary)]">
                  <li className="flex gap-3">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gradient-to-r from-blue-400 to-indigo-400" />
                    Clear ADRs and diagrams where they reduce risk
                  </li>
                  <li className="flex gap-3">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gradient-to-r from-blue-400 to-indigo-400" />
                    SLOs, tracing, and alerts that match user journeys
                  </li>
                  <li className="flex gap-3">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gradient-to-r from-blue-400 to-indigo-400" />
                    Security and compliance baked in, not bolted on
                  </li>
                </ul>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
