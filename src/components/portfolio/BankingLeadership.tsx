import { getMessages } from "next-intl/server";
import { Reveal } from "./Reveal";

export async function BankingLeadership() {
  const messages = await getMessages();
  const content = messages.bankingLeadership;

  return (
    <section className="border-t border-[var(--border-subtle)] bg-[var(--bg-elevated)]/10 px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
      <div className="mx-auto max-w-[1280px]">
        <Reveal>
          <p className="mb-4 text-xs font-medium uppercase tracking-[0.18em] text-[var(--text-muted)]">
            {content.eyebrow}
          </p>
          <h2 className="max-w-3xl text-3xl font-bold tracking-tight text-[var(--text-primary)] sm:text-4xl">
            {content.title}
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-[var(--text-secondary)]">
            {content.subtitle}
          </p>
        </Reveal>

        <div className="mt-14 grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <Reveal delay={80}>
            <div className="h-full rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-elevated)]/30 p-6 sm:p-8">
              <p className="mb-6 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--text-muted)]">
                {content.leadershipLabel}
              </p>
              <div className="grid gap-5 sm:grid-cols-2">
                {content.items.map((item) => (
                  <article key={item.title}>
                    <h3 className="font-semibold text-[var(--text-primary)]">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-[var(--text-secondary)]">
                      {item.body}
                    </p>
                  </article>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal delay={160}>
            <div className="h-full rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-base)]/60 p-6 sm:p-8">
              <p className="mb-6 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--text-muted)]">
                {content.playbookLabel}
              </p>
              <div className="space-y-4">
                {content.playbook.map((item) => (
                  <div
                    key={item.title}
                    className="border-b border-[var(--border-subtle)] pb-4 last:border-b-0 last:pb-0"
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

        <Reveal delay={220}>
          <div className="mt-8 rounded-2xl border border-dashed border-[var(--border-subtle)] bg-[var(--bg-elevated)]/20 p-6 sm:p-8">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-emerald-400">
              {content.adrLabel}
            </p>
            <h3 className="text-lg font-semibold text-[var(--text-primary)]">
              {content.adr.title}
            </h3>
            <p className="mt-2 max-w-4xl text-sm leading-relaxed text-[var(--text-secondary)]">
              {content.adr.body}
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
