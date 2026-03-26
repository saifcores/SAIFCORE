import { Reveal } from "./Reveal";

const items = [
  {
    title: "Scalable Architecture",
    description:
      "Domain-driven boundaries, clear contracts, and patterns that keep teams shipping as complexity grows.",
    icon: (
      <svg
        viewBox="0 0 24 24"
        className="h-6 w-6"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
        />
      </svg>
    ),
  },
  {
    title: "SaaS Systems",
    description:
      "Multi-tenant models, billing hooks, and operational tooling built for long-term product velocity.",
    icon: (
      <svg
        viewBox="0 0 24 24"
        className="h-6 w-6"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"
        />
      </svg>
    ),
  },
  {
    title: "Payment Integration",
    description:
      "Secure money movement, reconciliation, and compliance-aware flows across regions and providers.",
    icon: (
      <svg
        viewBox="0 0 24 24"
        className="h-6 w-6"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
        />
      </svg>
    ),
  },
  {
    title: "Performance Optimization",
    description:
      "Latency budgets, caching strategy, and observability so systems stay fast under real load.",
    icon: (
      <svg
        viewBox="0 0 24 24"
        className="h-6 w-6"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M13 10V3L4 14h7v7l9-11h-7z"
        />
      </svg>
    ),
  },
];

export function WhatISolve() {
  return (
    <section id="capabilities" className="px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-[1280px]">
        <Reveal>
          <h2 className="text-3xl font-bold tracking-tight text-[var(--text-primary)] sm:text-4xl">
            What I solve
          </h2>
          <p className="mt-4 max-w-2xl text-[var(--text-secondary)]">
            From first principles to production — architecture that aligns with
            your business constraints.
          </p>
        </Reveal>
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item, i) => (
            <Reveal key={item.title} delay={i * 80}>
              <article className="group glass h-full rounded-2xl p-6 transition duration-300 hover:-translate-y-1 hover:shadow-[0_0_0_1px_rgba(99,102,241,0.2),0_24px_48px_-12px_rgba(0,0,0,0.35)]">
                <div className="mb-5 inline-flex rounded-xl bg-gradient-to-br from-indigo-500/20 to-cyan-500/10 p-3 text-[var(--accent-indigo)] transition group-hover:from-indigo-500/30 group-hover:to-cyan-500/15">
                  {item.icon}
                </div>
                <h3 className="text-lg font-semibold text-[var(--text-primary)]">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[var(--text-secondary)]">
                  {item.description}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
