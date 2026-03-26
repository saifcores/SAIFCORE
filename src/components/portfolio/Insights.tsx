import Link from "next/link";
import { Reveal } from "./Reveal";

const posts = [
  {
    title: "Why most SaaS fail in Africa",
    excerpt:
      "Distribution, payments, and trust — what changes when your playbook is imported wholesale.",
    href: "#",
  },
  {
    title: "Designing scalable fintech systems",
    excerpt:
      "Idempotency, ledger design, and reconciliation patterns that keep money honest.",
    href: "#",
  },
  {
    title: "Architecture reviews that actually help",
    excerpt:
      "How to run ADRs and reviews so engineers leave energized, not defensive.",
    href: "#",
  },
];

export function Insights() {
  return (
    <section
      id="insights"
      className="border-t border-[var(--border-subtle)] bg-[var(--bg-elevated)]/20 px-4 py-24 sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-[1280px]">
        <Reveal>
          <h2 className="text-3xl font-bold tracking-tight text-[var(--text-primary)] sm:text-4xl">
            Insights & thinking
          </h2>
          <p className="mt-4 max-w-2xl text-[var(--text-secondary)]">
            Notes on building serious software in serious environments.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {posts.map((post, i) => (
            <Reveal key={post.title} delay={i * 80}>
              <Link
                href={post.href}
                className="group block h-full rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-base)]/60 p-6 transition hover:-translate-y-1 hover:border-indigo-500/25 hover:shadow-lg hover:shadow-indigo-500/10"
              >
                <h3 className="text-lg font-semibold text-[var(--text-primary)] transition group-hover:text-[var(--accent-indigo)]">
                  {post.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-[var(--text-secondary)]">
                  {post.excerpt}
                </p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-[var(--accent-cyan)]">
                  Read
                  <span
                    aria-hidden
                    className="transition group-hover:translate-x-0.5"
                  >
                    →
                  </span>
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
