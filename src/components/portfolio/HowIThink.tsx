import { getMessages, getTranslations } from "next-intl/server";
import { Reveal } from "./Reveal";

export async function HowIThink() {
  const messages = await getMessages();
  const { steps, bullets } = messages.howIThink;
  const t = await getTranslations("howIThink");

  return (
    <section
      id="how-i-think"
      className="border-b border-[var(--border-subtle)] px-4 py-10 sm:px-6 sm:py-12 lg:px-8 lg:py-16"
    >
      <div className="mx-auto max-w-[1280px]">
        <Reveal>
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.18em] text-[var(--text-muted)]">
            {t("title")}
          </p>
          <h2 className="max-w-2xl text-pretty text-2xl font-bold tracking-tight text-[var(--text-primary)] sm:text-3xl">
            {t("subtitle")}
          </h2>
        </Reveal>

        <div className="mt-8 grid gap-4 md:mt-10 md:grid-cols-2 md:gap-6">
          <Reveal>
            <ol className="space-y-4 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-elevated)]/20 p-5 sm:p-6">
              {steps.map((step, i) => {
                const stepId = String(i + 1).padStart(2, "0");
                return (
                  <li key={stepId} className="flex gap-3">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-[var(--border-subtle)] font-mono text-[10px] font-semibold text-accent">
                      {stepId}
                    </span>
                    <div className="min-w-0">
                      <h3 className="text-sm font-semibold text-[var(--text-primary)]">
                        {step.title}
                      </h3>
                      <p className="mt-1 text-sm leading-relaxed text-[var(--text-secondary)]">
                        {step.body}
                      </p>
                    </div>
                  </li>
                );
              })}
            </ol>
          </Reveal>

          <Reveal delay={80}>
            <div className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-elevated)]/20 p-5 sm:p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--text-muted)]">
                {t("operatingModel")}
              </p>
              <p className="mt-3 text-sm font-medium leading-relaxed text-[var(--text-primary)]">
                {t("operatingBody")}
              </p>
              <ul className="mt-5 space-y-2.5 text-sm text-[var(--text-secondary)]">
                {bullets.map((line, bi) => (
                  <li key={bi} className="flex gap-2.5">
                    <span
                      className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gradient-to-r from-blue-400 to-emerald-400"
                      aria-hidden
                    />
                    {line}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
