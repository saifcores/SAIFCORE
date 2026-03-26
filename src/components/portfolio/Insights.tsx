import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Reveal } from "./Reveal";

export async function Insights() {
  const t = await getTranslations("insights");
  const tCommon = await getTranslations("common");

  return (
    <section
      id="insights"
      className="border-t border-[var(--border-subtle)] bg-[var(--bg-elevated)]/20 px-4 py-24 sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-[1280px]">
        <Reveal>
          <h2 className="text-3xl font-bold tracking-tight text-[var(--text-primary)] sm:text-4xl">
            {t("title")}
          </h2>
          <p className="mt-4 max-w-2xl text-[var(--text-secondary)]">
            {t("subtitle")}
          </p>
        </Reveal>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {[0, 1, 2].map((i) => (
            <Reveal key={i} delay={i * 80}>
              <Link
                href="#"
                className="group block h-full rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-base)]/60 p-6 transition hover:-translate-y-1 hover:border-indigo-500/25 hover:shadow-lg hover:shadow-indigo-500/10"
              >
                <h3 className="text-lg font-semibold text-[var(--text-primary)] transition group-hover:text-[var(--accent-indigo)]">
                  {t(`posts.${i}.title`)}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-[var(--text-secondary)]">
                  {t(`posts.${i}.excerpt`)}
                </p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-[var(--accent-cyan)]">
                  {tCommon("readMore")}
                  <span
                    aria-hidden
                    className="transition group-hover:translate-x-0.5"
                  >
                    →
                  </span>
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
