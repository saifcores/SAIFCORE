import { getMessages, getTranslations } from "next-intl/server";
import { Reveal } from "./Reveal";

const GROUP_STYLES = [
  {
    accent: "text-accent",
    bg: "from-blue-500/10 to-blue-500/4",
    border: "border-blue-500/20",
    highlight:
      "border-blue-500/30 bg-gradient-to-r from-blue-500/12 to-blue-500/6 text-[var(--text-primary)]",
  },
  {
    accent: "text-indigo-400",
    bg: "from-indigo-500/10 to-indigo-500/4",
    border: "border-indigo-500/20",
    highlight:
      "border-indigo-500/30 bg-gradient-to-r from-indigo-500/12 to-indigo-500/6 text-[var(--text-primary)]",
  },
  {
    accent: "text-emerald-400",
    bg: "from-emerald-500/10 to-emerald-500/4",
    border: "border-emerald-500/20",
    highlight:
      "border-emerald-500/30 bg-gradient-to-r from-emerald-500/12 to-emerald-500/6 text-[var(--text-primary)]",
  },
  {
    accent: "text-amber-400",
    bg: "from-amber-500/10 to-amber-500/4",
    border: "border-amber-500/20",
    highlight:
      "border-amber-500/30 bg-gradient-to-r from-amber-500/12 to-amber-500/6 text-[var(--text-primary)]",
  },
] as const;

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
    <section className="border-t border-[var(--border-subtle)] px-4 py-16 sm:py-20 lg:py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-[1280px]">
        <Reveal>
          <p className="mb-4 text-xs font-medium uppercase tracking-[0.18em] text-[var(--text-muted)]">
            {t("skillsTitle")}
          </p>
          <h2 className="max-w-xl text-3xl font-bold tracking-tight text-[var(--text-primary)] sm:text-4xl">
            {t("skillsSubtitle")}
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {groups.map((group, gi) => {
            const style = GROUP_STYLES[gi % GROUP_STYLES.length];
            return (
              <Reveal key={group.labelKey} delay={gi * 80}>
                <div
                  className={`h-full rounded-2xl border bg-gradient-to-br ${style.bg} ${style.border} p-5`}
                >
                  <p
                    className={`mb-4 text-[11px] font-semibold uppercase tracking-[0.18em] ${style.accent}`}
                  >
                    {group.labelKey}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {(group.items as readonly string[]).map((skill, si) => (
                      <span
                        key={`${group.labelKey}-${skill}-${si}`}
                        className={`rounded-full border px-3 py-1 text-xs font-medium transition hover:brightness-110 ${style.highlight}`}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
