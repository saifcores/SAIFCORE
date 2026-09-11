import { getMessages, getTranslations } from "next-intl/server";
import { Reveal } from "./Reveal";
import { TrustMotion } from "./TrustMotion";
import { trustBrands } from "@/data/trust-brands";

export async function Trust() {
  const t = await getTranslations("trust");
  const messages = await getMessages();
  const industries = messages.trust.industries;

  return (
    <section className="border-b border-[var(--border-subtle)] px-4 py-12 sm:px-6 sm:py-14 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <p className="mb-6 text-pretty text-center text-xs font-medium uppercase tracking-[0.2em] text-[var(--text-muted)]">
            {t("heading")}
          </p>
        </Reveal>

        <Reveal delay={60}>
          <div className="mb-8 flex flex-wrap items-center justify-center gap-2">
            {industries.map((industry, i) => {
              const isHighlight = i === 0 || i === 1;
              return (
                <span
                  key={industry}
                  className={`rounded-full border px-3 py-1.5 text-[11px] font-medium sm:text-xs ${
                    isHighlight
                      ? "border-[var(--border-strong)] bg-[var(--bg-elevated)] text-[var(--text-primary)]"
                      : "border-[var(--border-subtle)] text-[var(--text-secondary)]"
                  }`}
                >
                  {industry}
                </span>
              );
            })}
          </div>
        </Reveal>

        <Reveal delay={100}>
          <p className="mb-4 text-center text-[10px] font-medium uppercase tracking-[0.18em] text-[var(--text-muted)]">
            {t("companiesLabel")}
          </p>
          <TrustMotion brands={trustBrands} />
          <p className="mx-auto mt-6 max-w-xl text-pretty text-center text-xs leading-relaxed text-[var(--text-muted)] sm:text-sm">
            {t("deliveryNote")}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
