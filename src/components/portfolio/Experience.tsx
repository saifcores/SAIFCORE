import { getMessages, getTranslations } from "next-intl/server";
import { ExperienceTimeline } from "./ExperienceTimeline";
import { Reveal } from "./Reveal";

export async function Experience() {
  const messages = await getMessages();
  const { experience } = messages;
  const t = await getTranslations("experience");

  const hiddenCount = Math.max(0, experience.items.length - 4);

  return (
    <section
      id="experience"
      aria-labelledby="experience-heading"
      className="relative overflow-hidden border-y border-[var(--border-subtle)] px-4 py-24 sm:px-6 lg:px-8"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(37,99,235,0.08),transparent)]"
        aria-hidden
      />

      <div className="relative mx-auto max-w-[1280px]">
        <Reveal>
          <p className="mb-4 text-xs font-medium uppercase tracking-[0.18em] text-[var(--text-muted)]">
            {t("title")}
          </p>
          <h2
            id="experience-heading"
            className="max-w-2xl text-3xl font-bold tracking-tight text-[var(--text-primary)] sm:text-4xl"
          >
            {t("subtitle")}
          </h2>
        </Reveal>

        <div className="mt-16">
          <ExperienceTimeline
            items={experience.items}
            stackLabel={t("stackLabel")}
            currentRoleLabel={t("currentRole")}
            showMoreLabel={t("showMore", { count: hiddenCount })}
            showLessLabel={t("showLess")}
          />
        </div>
      </div>
    </section>
  );
}
