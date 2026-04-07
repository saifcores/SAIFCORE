import { getMessages, getTranslations } from "next-intl/server";
import { Reveal } from "./Reveal";

export async function HowIThink() {
  const messages = await getMessages();
  const { steps, bullets } = messages.howIThink;
  const t = await getTranslations("howIThink");

  return (
    <section
      id="process"
      className="border-y border-[var(--border-subtle)] bg-[var(--bg-elevated)]/30 px-4 py-24 sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-[1280px]">
        <Reveal>
          <h2 className="text-3xl font-bold tracking-tight text-[var(--text-primary)] sm:text-4xl">
            {t("title")}
          </h2>
          <p className="mt-4 max-w-2xl text-[var(--text-secondary)]">
            {t("subtitle")}
          </p>
        </Reveal>

        <div className="mt-16 grid gap-8 lg:grid-cols-2 lg:gap-20">
          <Reveal>
            <div className="relative rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-base)]/50 p-8 sm:p-10">
              <div className="bg-grid pointer-events-none absolute inset-0 rounded-2xl opacity-40" />
              <ol className="relative space-y-0">
                {steps.map((step, i) => {
                  const stepId = String(i + 1).padStart(2, "0");
                  return (
                    <li key={stepId} className="flex gap-5 sm:gap-6">
                      <div className="flex flex-col items-center">
                        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[var(--border-subtle)] bg-[var(--bg-elevated)] text-sm font-mono font-semibold text-[var(--accent-cyan)]">
                          {stepId}
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
                          {step.title}
                        </h3>
                        <p className="mt-2 text-sm leading-relaxed text-[var(--text-secondary)]">
                          {step.body}
                        </p>
                      </div>
                    </li>
                  );
                })}
              </ol>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <div className="flex h-full flex-col justify-center">
              <div className="glass rounded-2xl p-8 sm:p-10">
                <p className="text-sm font-medium uppercase tracking-widest text-[var(--text-muted)]">
                  {t("operatingModel")}
                </p>
                <p className="mt-4 text-lg font-medium leading-relaxed text-[var(--text-primary)]">
                  {t("operatingBody")}
                </p>
                <ul className="mt-8 space-y-3 text-sm text-[var(--text-secondary)]">
                  {bullets.map((line, bi) => (
                    <li key={bi} className="flex gap-3">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gradient-to-r from-blue-400 to-indigo-400" />
                      {line}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
