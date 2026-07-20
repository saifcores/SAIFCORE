import { getMessages, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import type { ExperienceEntry } from "@/types/messages";
import { Reveal } from "./Reveal";

function firstBullet(entry: ExperienceEntry): string {
  return entry.bullet0.trim();
}

export async function ExperienceTeaser() {
  const messages = await getMessages();
  const { experience } = messages;
  const t = await getTranslations("experience");

  return (
    <section
      id="experience"
      className="border-b border-[var(--border-subtle)] px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-24"
    >
      <div className="mx-auto max-w-[1280px]">
        <Reveal>
          <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-end sm:justify-between">
            <div className="min-w-0">
              <p className="mb-3 text-xs font-medium uppercase tracking-[0.18em] text-[var(--text-muted)] sm:mb-4">
                {t("title")}
              </p>
              <h2 className="max-w-2xl text-pretty text-2xl font-bold tracking-tight text-[var(--text-primary)] sm:text-3xl md:text-4xl">
                {t("subtitle")}
              </h2>
            </div>
            <Link
              href="/experience"
              className="inline-flex min-h-11 w-full shrink-0 items-center justify-center gap-1.5 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-elevated)]/30 px-4 text-sm font-semibold text-accent transition hover:border-[var(--border-hover)] hover:text-[var(--accent-blue-light)] sm:w-auto sm:border-0 sm:bg-transparent sm:px-0"
            >
              {t("viewAll")}
              <span aria-hidden>→</span>
            </Link>
          </div>
        </Reveal>

        {/* Compact experience list */}
        <ul className="mt-8 list-none space-y-0 divide-y divide-[var(--border-subtle)] p-0 sm:mt-10">
          {experience.items.map((item, i) => {
            const isFirst = i === 0;
            const bullet = firstBullet(item);
            return (
              <li key={`${item.role}|${item.company}`}>
                <Reveal delay={i * 60}>
                  <div className="group flex flex-col gap-2 py-4 transition hover:bg-[var(--bg-elevated)]/10 sm:flex-row sm:items-start sm:gap-6 sm:py-5">
                    {/* Timeline dot */}
                    <div className="hidden shrink-0 pt-1.5 sm:flex sm:w-8 sm:justify-center">
                      <span
                        className={`h-2 w-2 rounded-full ${isFirst ? "bg-gradient-to-r from-blue-400 to-emerald-400" : "bg-[var(--text-muted)]/40"}`}
                        aria-hidden
                      />
                    </div>

                    {/* Content */}
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                        <div className="min-w-0 flex-1">
                          <span
                            className={`text-sm font-semibold ${isFirst ? "text-accent" : "text-[var(--text-secondary)]"}`}
                          >
                            {item.company}
                          </span>
                          <p className="mt-0.5 text-sm font-medium text-[var(--text-primary)]">
                            {item.role}
                          </p>
                        </div>
                        <span className="inline-flex shrink-0 rounded-md border border-[var(--border-subtle)] bg-[var(--bg-base)]/40 px-2 py-0.5 font-mono text-[10px] tabular-nums text-[var(--text-muted)] sm:text-[11px]">
                          {item.period}
                        </span>
                      </div>
                      {bullet ? (
                        <p className="mt-2 text-sm leading-relaxed text-[var(--text-secondary)] line-clamp-2">
                          {bullet}
                        </p>
                      ) : null}
                    </div>
                  </div>
                </Reveal>
              </li>
            );
          })}
        </ul>

        {/* Footer link */}
        <Reveal delay={280}>
          <div className="mt-6 flex justify-center border-t border-[var(--border-subtle)] pt-6 sm:mt-8 sm:pt-8">
            <Link
              href="/experience"
              className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-elevated)]/30 px-6 py-3 text-sm font-semibold text-[var(--text-secondary)] transition hover:border-[var(--border-hover)] hover:text-[var(--text-primary)] sm:w-auto"
            >
              {t("viewAll")}
              <span aria-hidden>→</span>
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
