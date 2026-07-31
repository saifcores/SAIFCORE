import { getMessages, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import type { ExperienceEntry } from "@/types/messages";
import { Reveal } from "./Reveal";

const TEASER_COUNT = 3;

function firstBullet(entry: ExperienceEntry): string {
  return entry.bullet0.trim();
}

export async function ExperienceTeaser() {
  const messages = await getMessages();
  const { experience } = messages;
  const t = await getTranslations("experience");
  const items = experience.items.slice(0, TEASER_COUNT);

  return (
    <section
      id="experience"
      className="border-b border-[var(--border-subtle)] px-4 py-10 sm:px-6 sm:py-12 lg:px-8 lg:py-16"
    >
      <div className="mx-auto max-w-[1280px]">
        <Reveal>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div className="min-w-0">
              <p className="mb-2 text-xs font-medium uppercase tracking-[0.18em] text-[var(--text-muted)]">
                {t("title")}
              </p>
              <h2 className="max-w-2xl text-pretty text-2xl font-bold tracking-tight text-[var(--text-primary)] sm:text-3xl">
                {t("subtitle")}
              </h2>
            </div>
            <Link
              href="/experience"
              className="inline-flex min-h-10 shrink-0 items-center gap-1.5 text-sm font-semibold text-accent transition hover:text-[var(--accent-blue-light)]"
            >
              {t("viewAll")}
              <span aria-hidden>→</span>
            </Link>
          </div>
        </Reveal>

        <ul className="mt-6 list-none space-y-0 divide-y divide-[var(--border-subtle)] p-0 sm:mt-8">
          {items.map((item, i) => {
            const isFirst = i === 0;
            const bullet = firstBullet(item);
            return (
              <li key={`${item.role}|${item.company}`}>
                <Reveal delay={i * 50}>
                  <div className="flex flex-col gap-1.5 py-3.5 sm:flex-row sm:items-start sm:gap-5 sm:py-4">
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
                        <div className="min-w-0">
                          <span
                            className={`text-sm font-semibold ${isFirst ? "text-accent" : "text-[var(--text-secondary)]"}`}
                          >
                            {item.company}
                          </span>
                          <p className="mt-0.5 text-sm font-medium text-[var(--text-primary)]">
                            {item.role}
                          </p>
                        </div>
                        <span className="shrink-0 font-mono text-[11px] tabular-nums text-[var(--text-muted)]">
                          {item.period}
                        </span>
                      </div>
                      {bullet ? (
                        <p className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-[var(--text-secondary)]">
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
      </div>
    </section>
  );
}
