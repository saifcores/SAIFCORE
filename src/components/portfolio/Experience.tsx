import { getTranslations } from "next-intl/server";
import { Reveal } from "./Reveal";

const ITEM_INDICES = [0, 1, 2] as const;
const BULLET_INDICES = [0, 1, 2] as const;

export async function Experience() {
  const t = await getTranslations("experience");

  return (
    <section
      id="experience"
      className="border-t border-[var(--border-subtle)] bg-[var(--bg-elevated)]/20 px-4 py-24 sm:px-6 lg:px-8"
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

        <Reveal delay={80}>
          <div className="mt-8 max-w-3xl rounded-2xl border border-indigo-500/20 bg-gradient-to-r from-indigo-500/10 to-cyan-500/5 px-6 py-5 sm:px-8 sm:py-6">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--accent-cyan)]">
              {t("valueTitle")}
            </p>
            <p className="mt-3 text-sm leading-relaxed text-[var(--text-secondary)] sm:text-[15px]">
              {t("valueBody")}
            </p>
          </div>
        </Reveal>

        <div className="relative mt-14 sm:mt-16">
          <div
            className="pointer-events-none absolute left-[19px] top-3 bottom-3 hidden w-px bg-gradient-to-b from-indigo-500/45 via-indigo-500/20 to-transparent sm:block"
            aria-hidden
          />
          <ol className="space-y-10 sm:space-y-12">
            {ITEM_INDICES.map((i) => (
              <Reveal key={i} delay={i * 90}>
                <li className="relative sm:pl-14">
                  <span
                    className="absolute left-0 top-1 hidden h-3 w-3 rounded-full border-2 border-indigo-500/60 bg-[var(--bg-base)] shadow-[0_0_12px_rgba(99,102,241,0.45)] sm:block"
                    aria-hidden
                  />
                  <div className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-base)]/50 p-6 sm:p-8">
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                      <div>
                        <p className="text-base font-semibold text-[var(--text-primary)]">
                          {t(`items.${i}.role`)}
                        </p>
                        <p className="mt-1 text-sm font-medium text-[var(--accent-cyan)]">
                          {t(`items.${i}.company`)}
                        </p>
                      </div>
                      <div className="flex min-w-0 flex-col gap-1 text-left text-sm text-[var(--text-muted)] sm:items-end sm:text-right">
                        <span className="font-mono tabular-nums">
                          {t(`items.${i}.period`)}
                        </span>
                        <span>{t(`items.${i}.location`)}</span>
                      </div>
                    </div>
                    <ul className="mt-5 space-y-2.5 text-sm leading-relaxed text-[var(--text-secondary)]">
                      {BULLET_INDICES.map((j) => {
                        const text = t(`items.${i}.bullet${j}`);
                        if (!text.trim()) return null;
                        return (
                          <li key={j} className="flex gap-3">
                            <span
                              className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gradient-to-r from-blue-400 to-indigo-400"
                              aria-hidden
                            />
                            <span>{text}</span>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
