import { getMessages, getTranslations } from "next-intl/server";
import type { ExperienceEntry } from "@/types/messages";
import { Reveal } from "./Reveal";

function experienceBullets(entry: ExperienceEntry): string[] {
  return [entry.bullet0, entry.bullet1, entry.bullet2].filter((b) => b.trim());
}

export async function Experience() {
  const messages = await getMessages();
  const { experience } = messages;
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

        <ul className="mt-14 grid list-none grid-cols-1 gap-8 p-0 lg:grid-cols-2 lg:gap-x-10 lg:gap-y-10">
          {experience.items.map((item, i) => (
            <li key={`${item.company}-${item.period}`} className="h-full">
              <Reveal delay={i * 90}>
                <article className="flex h-full flex-col rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-base)]/50 p-6 sm:p-8">
                  <div className="flex shrink-0 items-start justify-between gap-3 border-b border-[var(--border-subtle)]/80 pb-4">
                    <span
                      className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-gradient-to-r from-indigo-500 to-cyan-400 shadow-[0_0_12px_rgba(99,102,241,0.5)]"
                      aria-hidden
                    />
                    <div className="min-w-0 flex-1">
                      <p className="text-base font-semibold text-[var(--text-primary)]">
                        {item.role}
                      </p>
                      <p className="mt-1 text-sm font-medium text-[var(--accent-cyan)]">
                        {item.company}
                      </p>
                    </div>
                    <div className="flex min-w-0 shrink-0 flex-col gap-1 text-right text-xs text-[var(--text-muted)] sm:text-sm">
                      <span className="font-mono tabular-nums">
                        {item.period}
                      </span>
                      <span className="leading-snug">{item.location}</span>
                    </div>
                  </div>
                  <ul className="mt-5 flex-1 space-y-2.5 text-sm leading-relaxed text-[var(--text-secondary)]">
                    {experienceBullets(item).map((text, bi) => (
                      <li key={`${i}-${bi}`} className="flex gap-3">
                        <span
                          className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gradient-to-r from-blue-400 to-indigo-400"
                          aria-hidden
                        />
                        <span>{text}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
