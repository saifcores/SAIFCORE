import { getMessages, getTranslations } from "next-intl/server";
import { Reveal } from "./Reveal";
import { TrustMotion } from "./TrustMotion";
import { trustBrands } from "@/data/trust-brands";

export async function Trust() {
  const t = await getTranslations("trust");
  const messages = await getMessages();
  const industries = messages.trust.industries;

  return (
    <section className="border-b border-[var(--border-subtle)] px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-[1280px]">
        {/* Section heading */}
        <Reveal>
          <p className="mb-8 text-center text-xs font-medium uppercase tracking-[0.2em] text-[var(--text-muted)]">
            {t("heading")}
          </p>
        </Reveal>

        {/* Industry badges */}
        <Reveal delay={80}>
          <div className="mb-12 flex flex-wrap items-center justify-center gap-3">
            {industries.map((industry, i) => {
              const isHighlight = i === 0 || i === 1;
              return (
                <span
                  key={industry}
                  className={`rounded-full border px-3 py-1.5 text-xs font-medium transition sm:px-4 sm:py-2 sm:text-sm ${
                    isHighlight
                      ? "border-blue-500/30 bg-gradient-to-r from-blue-500/12 to-emerald-500/8 text-[var(--text-primary)]"
                      : "border-[var(--border-subtle)] text-[var(--text-secondary)] hover:border-[var(--border-hover)] hover:text-[var(--text-primary)]"
                  }`}
                >
                  {industry}
                </span>
              );
            })}
          </div>
        </Reveal>

        {/* Divider with companies label */}
        <Reveal delay={140}>
          <div className="mb-8 flex items-center gap-4">
            <div className="h-px flex-1 bg-[var(--border-subtle)]" />
            <span className="text-xs font-medium uppercase tracking-[0.18em] text-[var(--text-muted)]">
              {t("companiesLabel")}
            </span>
            <div className="h-px flex-1 bg-[var(--border-subtle)]" />
          </div>
        </Reveal>

        {/* Company logos */}
        <Reveal delay={180}>
          <TrustMotion brands={trustBrands} />
        </Reveal>
      </div>
    </section>
  );
}
