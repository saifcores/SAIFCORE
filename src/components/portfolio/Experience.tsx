import { getMessages, getTranslations } from "next-intl/server";
import type { ExperienceEntry } from "@/types/messages";
import { Reveal } from "./Reveal";

function experienceHighlights(entry: ExperienceEntry): string[] {
  return [entry.bullet0, entry.bullet1].filter((b) => b.trim());
}

function experienceStack(entry: ExperienceEntry): string | null {
  const s = entry.bullet2.trim();
  return s.length > 0 ? s : null;
}

export async function Experience() {
  const messages = await getMessages();
  const { experience } = messages;
  const t = await getTranslations("experience");
  const stackLabel = t("stackLabel");

  return (
    <section
      id="experience"
      aria-labelledby="experience-heading"
      className="border-t border-[var(--border-subtle)] bg-[var(--bg-elevated)]/20 px-4 py-24 sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-[1280px]">
        <Reveal>
          <h2
            id="experience-heading"
            className="text-3xl font-bold tracking-tight text-[var(--text-primary)] sm:text-4xl"
          >
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

        <ul className="mt-14 grid list-none grid-cols-1 items-stretch gap-8 p-0 lg:grid-cols-2 lg:gap-x-10 lg:gap-y-10">
          {experience.items.map((item, i) => {
            const highlights = experienceHighlights(item);
            const stack = experienceStack(item);
            const cardId = `experience-card-${i}`;
            const titleId = `${cardId}-title`;

            return (
              <li
                key={`${item.role}|${item.company}|${item.period}`}
                className="flex min-h-0"
              >
                <Reveal delay={i * 90} className="flex w-full min-h-0">
                  <article
                    className="flex w-full min-h-0 flex-col rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-base)]/50 p-6 sm:p-8"
                    aria-labelledby={titleId}
                  >
                    <header className="flex flex-col gap-4 border-b border-[var(--border-subtle)]/80 pb-4 sm:flex-row sm:items-start sm:justify-between sm:gap-6">
                      <div className="flex min-w-0 flex-1 gap-3">
                        <span
                          className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-gradient-to-r from-indigo-500 to-cyan-400 shadow-[0_0_12px_rgba(99,102,241,0.5)]"
                          aria-hidden
                        />
                        <div className="min-w-0">
                          <h3
                            id={titleId}
                            className="text-base font-semibold leading-snug text-[var(--text-primary)]"
                          >
                            {item.role}
                          </h3>
                          <p className="mt-1 text-sm font-medium leading-snug text-[var(--accent-cyan)]">
                            {item.company}
                          </p>
                        </div>
                      </div>
                      <div className="shrink-0 border-t border-[var(--border-subtle)]/60 pt-3 sm:border-t-0 sm:pt-0 sm:text-right">
                        <p className="font-mono text-xs tabular-nums text-[var(--text-muted)] sm:text-sm">
                          {item.period}
                        </p>
                        <p className="mt-1 text-xs leading-snug text-[var(--text-muted)] sm:text-sm">
                          {item.location}
                        </p>
                      </div>
                    </header>

                    <ul className="mt-5 flex min-h-0 flex-1 flex-col gap-2.5 text-sm leading-relaxed text-[var(--text-secondary)]">
                      {highlights.map((text, bi) => (
                        <li key={`${cardId}-h-${bi}`} className="flex gap-3">
                          <span
                            className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gradient-to-r from-blue-400 to-indigo-400"
                            aria-hidden
                          />
                          <span className="min-w-0">{text}</span>
                        </li>
                      ))}
                    </ul>

                    {stack ? (
                      <footer className="mt-auto border-t border-[var(--border-subtle)]/50 pt-3">
                        <p className="flex gap-3 text-xs leading-relaxed text-[var(--text-muted)] sm:text-[13px]">
                          <span
                            className="mt-0.5 shrink-0 font-mono text-[10px] text-[var(--accent-cyan)] opacity-80"
                            aria-hidden
                          >
                            ▸
                          </span>
                          <span className="min-w-0">
                            <span className="font-medium text-[var(--text-muted)]">
                              {stackLabel}
                              <span aria-hidden>:</span>
                            </span>{" "}
                            {stack}
                          </span>
                        </p>
                      </footer>
                    ) : null}
                  </article>
                </Reveal>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
