import { getMessages, getTranslations } from "next-intl/server";
import { Reveal } from "./Reveal";

export async function SkillsMatrix() {
  const t = await getTranslations("experiencePage");
  const messages = await getMessages();
  const sm = messages.skillsMatrix;

  const groups = [
    { labelKey: sm.languagesLabel, items: sm.languages },
    { labelKey: sm.frameworksLabel, items: sm.frameworks },
    { labelKey: sm.infrastructureLabel, items: sm.infrastructure },
    { labelKey: sm.toolsLabel, items: sm.tools },
  ] as const;

  return (
    <section className="border-t border-[var(--border-subtle)] px-4 py-14 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <p className="mb-4 text-xs font-medium uppercase tracking-[0.18em] text-[var(--text-muted)]">
            {t("skillsTitle")}
          </p>
          <h2 className="max-w-xl font-display text-pretty text-2xl font-medium tracking-tight text-[var(--text-primary)] sm:text-3xl md:text-4xl">
            {t("skillsSubtitle")}
          </h2>
        </Reveal>

        <div className="mt-10 grid gap-4 sm:mt-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
          {groups.map((group, gi) => (
            <Reveal key={group.labelKey} delay={gi * 80}>
              <div className="h-full rounded-[16px] border border-[var(--border-subtle)] bg-[var(--bg-elevated)]/25 p-5">
                <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--text-muted)]">
                  {group.labelKey}
                </p>
                <div className="flex flex-wrap gap-2">
                  {(group.items as readonly string[]).map((skill, si) => (
                    <span
                      key={`${group.labelKey}-${skill}-${si}`}
                      className="rounded-full border border-[var(--border-subtle)] bg-[var(--bg-base)]/50 px-3 py-1 text-xs font-medium text-[var(--text-secondary)] transition hover:border-[var(--border-hover)] hover:text-[var(--text-primary)]"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
