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
      className="border-t border-[var(--border-subtle)] py-14 sm:py-16 lg:py-20"
    >
      <div className="page-container">
        <Reveal>
          <p className="site-kicker mb-3">{t("title")}</p>
          <h2 id="education-heading" className="section-heading max-w-2xl">
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
