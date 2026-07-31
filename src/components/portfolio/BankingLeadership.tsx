import { getMessages } from "next-intl/server";
import { Reveal } from "./Reveal";

export async function BankingLeadership() {
  const messages = await getMessages();
  const content = messages.bankingLeadership;

  return (
    <section className="border-t border-[var(--border-subtle)] bg-[var(--bg-elevated)]/10 px-4 py-10 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
      <div className="mx-auto max-w-[1280px]">
        <Reveal>
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.18em] text-[var(--text-muted)]">
            {content.eyebrow}
          </p>
          <h2 className="max-w-3xl text-pretty text-2xl font-bold tracking-tight text-[var(--text-primary)] sm:text-3xl">
            {content.title}
          </h2>
          <p className="mt-2 max-w-2xl text-pretty text-sm leading-relaxed text-[var(--text-secondary)]">
            {content.subtitle}
          </p>
        </Reveal>

        <div className="mt-8 grid gap-4 lg:mt-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-5">
          <Reveal delay={60}>
            <div className="h-full rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-elevated)]/30 p-5">
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--text-muted)]">
                {content.leadershipLabel}
              </p>
              <div className="grid gap-4 sm:grid-cols-2">
                {content.items.map((item) => (
                  <article key={item.title}>
                    <h3 className="text-sm font-semibold text-[var(--text-primary)]">
                      {item.title}
                    </h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-[var(--text-secondary)]">
                      {item.body}
                    </p>
                  </article>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <div className="h-full rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-base)]/60 p-5">
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--text-muted)]">
                {content.playbookLabel}
              </p>
              <div className="space-y-3">
                {content.playbook.map((item) => (
                  <div
                    key={item.title}
                    className="border-b border-[var(--border-subtle)] pb-3 last:border-b-0 last:pb-0"
                  >
                    <p className="text-sm font-semibold text-[var(--text-primary)]">
                      {item.title}
                    </p>
                    <p className="mt-1 text-sm leading-relaxed text-[var(--text-secondary)]">
                      {item.body}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>

        <Reveal delay={140}>
          <div className="mt-4 rounded-xl border border-dashed border-[var(--border-subtle)] bg-[var(--bg-elevated)]/20 p-5">
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-emerald-400">
              {content.adrLabel}
            </p>
            <h3 className="text-base font-semibold text-[var(--text-primary)]">
              {content.adr.title}
            </h3>
            <p className="mt-1.5 max-w-4xl text-sm leading-relaxed text-[var(--text-secondary)]">
              {content.adr.body}
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
