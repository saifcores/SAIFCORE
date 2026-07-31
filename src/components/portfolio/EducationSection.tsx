import { getMessages, getTranslations } from "next-intl/server";
import { Reveal } from "./Reveal";

export async function EducationSection() {
  const messages = await getMessages();
  const { education } = messages;
  const t = await getTranslations("education");

  return (
    <section
      id="education"
      aria-labelledby="education-heading"
      className="border-t border-[var(--border-subtle)] px-4 py-10 sm:px-6 sm:py-12 lg:px-8 lg:py-16"
    >
      <div className="mx-auto max-w-[1280px]">
        <Reveal>
          <p className="mb-4 text-xs font-medium uppercase tracking-[0.18em] text-[var(--text-muted)]">
            {t("title")}
          </p>
          <h2
            id="education-heading"
            className="max-w-2xl text-pretty text-2xl font-bold tracking-tight text-[var(--text-primary)] sm:text-3xl md:text-4xl"
          >
            {t("subtitle")}
          </h2>
        </Reveal>

        <ul className="mt-6 list-none space-y-0 divide-y divide-[var(--border-subtle)] p-0 sm:mt-8">
          {education.items.map((item, i) => (
            <li key={`${item.degree}|${item.institution}`}>
              <Reveal delay={i * 60}>
                <div className="flex flex-col gap-2 py-5 sm:flex-row sm:items-start sm:justify-between sm:gap-6">
                  <div className="min-w-0">
                    <h3 className="text-base font-semibold text-[var(--text-primary)] sm:text-lg">
                      {item.degree}
                    </h3>
                    <p className="mt-1 text-sm text-[var(--text-secondary)]">
                      {item.institution}
                    </p>
                  </div>
                  <p className="shrink-0 font-mono text-xs tabular-nums text-[var(--text-muted)]">
                    {item.period}
                  </p>
                </div>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
