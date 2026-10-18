import { getTranslations } from "next-intl/server";
import { Reveal } from "./Reveal";

export async function IdentityLevels() {
  const t = await getTranslations("identity");
  const levels = t.raw("levels") as readonly {
    kicker: string;
    title: string;
    body: string;
  }[];

  return (
    <section
      aria-labelledby="identity-heading"
      className="scroll-mt-24 pt-14 sm:pt-20 lg:pt-24"
    >
      <div className="page-container">
        <Reveal>
          <p className="site-kicker mb-3">{t("label")}</p>
          <h2
            id="identity-heading"
            className="section-heading mb-9 max-w-[20ch]"
          >
            {t("title")}
          </h2>
        </Reveal>
        <ol className="m-0 grid list-none gap-4 p-0 md:grid-cols-3">
          {levels.map((level, index) => (
            <li key={level.kicker}>
              <Reveal delay={index * 50} className="h-full">
                <article className="flex h-full flex-col gap-2 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-elevated)]/35 p-[22px]">
                  <p className="font-mono text-xs text-[var(--accent)]">
                    {String(index + 1).padStart(2, "0")}
                    <span className="mx-2 text-[var(--text-muted)]" aria-hidden>
                      ·
                    </span>
                    {level.kicker}
                  </p>
                  <h3 className="font-semibold text-[var(--text-primary)]">
                    {level.title}
                  </h3>
                  <p className="text-pretty text-sm text-[var(--text-muted)]">
                    {level.body}
                  </p>
                </article>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
