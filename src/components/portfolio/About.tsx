import { Reveal } from "./Reveal";

export function About() {
  return (
    <section id="about" className="px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-[1280px] gap-12 lg:grid-cols-2 lg:gap-20 lg:items-center">
        <Reveal>
          <h2 className="text-3xl font-bold tracking-tight text-[var(--text-primary)] sm:text-4xl">
            About
          </h2>
          <p className="mt-6 text-[var(--text-secondary)] leading-relaxed">
            I&apos;m a software architect and full-stack engineer focused on
            systems that survive contact with reality — regulation, flaky
            networks, and teams that grow faster than documentation.
          </p>
          <p className="mt-4 text-[var(--text-secondary)] leading-relaxed">
            My mindset is simple:{" "}
            <strong className="font-semibold text-[var(--text-primary)]">
              clarity over cleverness
            </strong>
            , explicit trade-offs, and architectures your future self will thank
            you for.
          </p>
          <p className="mt-4 text-[var(--text-secondary)] leading-relaxed">
            I&apos;ve shipped across fintech and SaaS, partnering with founders
            and enterprise teams to turn ambitious roadmaps into dependable
            platforms.
          </p>
        </Reveal>

        <Reveal delay={120}>
          <div className="relative mx-auto max-w-md lg:max-w-none">
            <div
              className="absolute -inset-4 rounded-[28px] bg-gradient-to-br from-indigo-600/30 via-blue-500/15 to-cyan-500/20 blur-2xl"
              aria-hidden
            />
            <div className="relative overflow-hidden rounded-[24px] border border-[var(--border-subtle)] bg-[var(--bg-elevated)]/80 p-10 text-center backdrop-blur-sm">
              <div
                className="mx-auto flex h-28 w-28 items-center justify-center rounded-2xl bg-gradient-to-br from-[#3b82f6] to-[#6366f1] text-3xl font-bold text-white shadow-lg shadow-indigo-500/30"
                aria-hidden
              >
                SA
              </div>
              <p className="mt-6 text-sm font-medium uppercase tracking-widest text-[var(--text-muted)]">
                Software Architect
              </p>
              <p className="mt-2 text-lg font-semibold text-[var(--text-primary)]">
                Building for longevity
              </p>
              <div className="mt-8 grid grid-cols-3 gap-4 border-t border-[var(--border-subtle)] pt-8 text-center">
                <div>
                  <p className="text-2xl font-bold text-gradient">10+</p>
                  <p className="mt-1 text-xs text-[var(--text-muted)]">Years</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-gradient">50+</p>
                  <p className="mt-1 text-xs text-[var(--text-muted)]">
                    Systems
                  </p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-gradient">∞</p>
                  <p className="mt-1 text-xs text-[var(--text-muted)]">
                    Curiosity
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
