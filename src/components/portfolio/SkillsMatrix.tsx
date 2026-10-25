import { getMessages, getTranslations } from "next-intl/server";
import { Reveal } from "./Reveal";

export async function SkillsMatrix() {
  const t = await getTranslations("experiencePage");
  const messages = await getMessages();
  const groups = messages.skillsMatrix.groups;

  return (
    <section
      id="stack"
      aria-labelledby="skills-heading"
      className="scroll-mt-24 border-t border-[var(--border-subtle)] py-14 sm:py-16 lg:py-20 xl:scroll-mt-28"
    >
      <div className="page-container">
        <Reveal>
          <p className="site-kicker mb-3">{t("skillsTitle")}</p>
          <h2 id="skills-heading" className="section-heading max-w-2xl">
            {t("skillsSubtitle")}
          </h2>
        </Reveal>

        <div className="mt-8 grid gap-4 sm:mt-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
          {groups.map((group, gi) => (
            <Reveal key={group.label} delay={gi * 40}>
              <div className="h-full rounded-[16px] border border-[var(--border-subtle)] bg-[var(--bg-elevated)]/25 p-5">
                <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--text-muted)]">
                  {group.label}
                </p>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((skill, si) => (
                    <span
                      key={`${group.label}-${skill}-${si}`}
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
