import { getTranslations } from "next-intl/server";
import { Reveal } from "./Reveal";

export async function ArchitectureExpertise() {
  const t = await getTranslations("architectureExpertise");

  return (
    <section className="border-y border-[var(--border-subtle)] px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-[1280px]">
        <Reveal>
          <h2 className="text-3xl font-bold tracking-tight text-[var(--text-primary)] sm:text-4xl">
            {t("title")}
          </h2>
          <p className="mt-4 max-w-2xl text-[var(--text-secondary)]">
            {t("subtitle")}
          </p>
        </Reveal>

        <Reveal delay={100}>
          <div className="mt-12 flex flex-wrap gap-3">
            {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => {
              const highlight = i < 4;
              const label = t(`tags.${i}.label`);
              return (
                <span
                  key={i}
                  className={`rounded-full border px-4 py-2 text-sm font-medium transition hover:border-indigo-500/40 hover:text-[var(--text-primary)] ${
                    highlight
                      ? "border-indigo-500/35 bg-gradient-to-r from-indigo-500/15 to-cyan-500/10 text-[var(--text-primary)] shadow-[0_0_24px_-4px_rgba(99,102,241,0.4)]"
                      : "border-[var(--border-subtle)] text-[var(--text-secondary)]"
                  }`}
                >
                  {label}
                </span>
              );
            })}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
