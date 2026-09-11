import { getMessages, getTranslations } from "next-intl/server";
import { Reveal } from "./Reveal";
import { TrustMotion } from "./TrustMotion";
import { trustBrands } from "@/data/trust-brands";

export async function Trust() {
  const t = await getTranslations("trust");
  const messages = await getMessages();
  const industries = messages.trust.industries;

  return (
    <section className="border-b border-[var(--border-subtle)] px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <p className="mb-4 text-pretty text-center text-[11px] font-medium uppercase tracking-[0.18em] text-[var(--text-muted)] sm:mb-5 sm:text-xs sm:tracking-[0.2em]">
            {t("heading")}
          </p>
          <ul className="mx-auto mb-6 flex max-w-3xl list-none flex-wrap items-center justify-center gap-1.5 p-0 sm:mb-8 sm:gap-2">
            {industries.map((industry) => (
              <li key={industry}>
                <span className="inline-flex rounded-full border border-[var(--border-subtle)] px-2.5 py-1 text-[11px] font-medium text-[var(--text-secondary)] sm:px-3 sm:text-xs">
                  {industry}
                </span>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={80}>
          <p className="mb-3 text-center text-[10px] font-medium uppercase tracking-[0.18em] text-[var(--text-muted)] sm:mb-4">
            {t("companiesLabel")}
          </p>
          <TrustMotion brands={trustBrands} />
          <p className="mx-auto mt-4 max-w-xl text-pretty text-center text-xs leading-relaxed text-[var(--text-muted)] sm:mt-5 sm:text-sm">
            {t("deliveryNote")}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
