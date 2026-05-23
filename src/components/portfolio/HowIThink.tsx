import { getMessages, getTranslations } from "next-intl/server";
import { Reveal } from "./Reveal";

export async function HowIThink() {
  const messages = await getMessages();
  const { steps, bullets } = messages.howIThink;
  const t = await getTranslations("howIThink");

  return (
    <section
      id="process"
      className="border-b border-[var(--border-subtle)] px-4 py-24 sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-[1280px]">
        <Reveal>
          <p className="mb-4 text-xs font-medium uppercase tracking-[0.18em] text-[var(--text-muted)]">
            {t("title")}
          </p>
          <h2 className="max-w-2xl text-3xl font-bold tracking-tight text-[var(--text-primary)] sm:text-4xl">
            {t("subtitle")}
          </h2>
        </Reveal>

        <div className="mt-16 grid gap-8 lg:grid-cols-2 lg:gap-14">
          {/* Steps */}
          <Reveal>
            <div className="relative rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-elevated)]/20 p-8 sm:p-10">
              <ol className="relative space-y-0">
                {steps.map((step, i) => {
                  const stepId = String(i + 1).padStart(2, "0");
                  return (
                    <li key={stepId} className="flex gap-5 sm:gap-6">
                      <div className="flex flex-col items-center">
                        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[var(--border-subtle)] bg-[var(--bg-elevated)]/60 font-mono text-xs font-semibold text-[var(--text-secondary)]">
                          {stepId}
                        </span>
                        {i < steps.length - 1 ? (
                          <span
                            className="my-2 min-h-[40px] w-px flex-1 bg-gradient-to-b from-[var(--border-subtle)] to-transparent sm:min-h-[52px]"
                            aria-hidden
                          />
                        ) : null}
                      </div>
                      <div
                        className={`pb-10 pt-1 ${i === steps.length - 1 ? "pb-0" : ""}`}
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

          {/* Philosophy */}
          <Reveal delay={120}>
            <div className="flex h-full flex-col justify-center">
              <div className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-elevated)]/20 p-8 sm:p-10">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--text-muted)]">
                  {t("operatingModel")}
                </p>
                <p className="mt-4 text-base font-medium leading-relaxed text-[var(--text-primary)]">
                  {t("operatingBody")}
                </p>
                <ul className="mt-8 space-y-3 text-sm text-[var(--text-secondary)]">
                  {bullets.map((line, bi) => (
                    <li key={bi} className="flex gap-3">
                      <span
                        className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gradient-to-r from-blue-400 to-emerald-400"
                        aria-hidden
                      />
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
