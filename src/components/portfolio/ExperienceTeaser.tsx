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
      className="border-b border-[var(--border-subtle)] px-4 py-24 sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-[1280px]">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="mb-4 text-xs font-medium uppercase tracking-[0.18em] text-[var(--text-muted)]">
                {t("title")}
              </p>
              <h2 className="max-w-2xl text-3xl font-bold tracking-tight text-[var(--text-primary)] sm:text-4xl">
                {t("subtitle")}
              </h2>
            </div>
            <Link
              href="/experience"
              className="inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold text-blue-400 transition hover:text-blue-300"
            >
              {t("viewAll")}
              <span aria-hidden>→</span>
            </Link>
          </div>
        </Reveal>

        {/* Compact experience list */}
        <ul className="mt-12 list-none space-y-0 divide-y divide-[var(--border-subtle)] p-0">
          {experience.items.map((item, i) => {
            const isFirst = i === 0;
            const bullet = firstBullet(item);
            return (
              <li key={`${item.role}|${item.company}`}>
                <Reveal delay={i * 60}>
                  <div className="group flex flex-col gap-3 py-5 transition hover:bg-[var(--bg-elevated)]/10 sm:flex-row sm:items-start sm:gap-6">
                    {/* Timeline dot */}
                    <div className="hidden shrink-0 pt-1.5 sm:flex sm:w-8 sm:justify-center">
                      <span
                        className={`h-2 w-2 rounded-full ${isFirst ? "bg-gradient-to-r from-blue-400 to-emerald-400" : "bg-[var(--text-muted)]/40"}`}
                        aria-hidden
                      />
                    </div>

                    {/* Content */}
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-start justify-between gap-x-4 gap-y-1">
                        <div>
                          <span
                            className={`text-sm font-semibold ${isFirst ? "text-blue-400" : "text-[var(--text-secondary)]"}`}
                          >
                            {item.company}
                          </span>
                          <p className="mt-0.5 text-[var(--text-primary)] font-medium text-sm">
                            {item.role}
                          </p>
                        </div>
                        <span className="shrink-0 font-mono text-xs tabular-nums text-[var(--text-muted)]">
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
          <div className="mt-8 flex justify-center border-t border-[var(--border-subtle)] pt-8">
            <Link
              href="/experience"
              className="inline-flex items-center gap-2 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-elevated)]/30 px-6 py-3 text-sm font-semibold text-[var(--text-secondary)] transition hover:border-white/15 hover:text-[var(--text-primary)]"
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
