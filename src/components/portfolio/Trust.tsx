import { getMessages, getTranslations } from "next-intl/server";
import { Reveal } from "./Reveal";
import { TrustMotion } from "./TrustMotion";
import { trustBrands } from "@/data/trust-brands";

export async function Trust() {
  const t = await getTranslations("trust");
  const messages = await getMessages();
  const industries = messages.trust.industries;
  const facts = messages.trust.facts;
  const specialtyLine = messages.trust.specialtyLine;
  const slaLine = messages.collaboration.slaLine;

  return (
    <section className="border-b border-[var(--border-subtle)] px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <p className="mb-4 text-pretty text-center text-[11px] font-medium uppercase tracking-[0.18em] text-[var(--text-muted)] sm:mb-5 sm:text-xs sm:tracking-[0.2em]">
            {t("heading")}
          </p>
          <p className="mx-auto mb-5 max-w-2xl text-pretty text-center text-sm font-medium text-[var(--text-secondary)] sm:mb-6">
            {specialtyLine}
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

        <Reveal delay={60}>
          <ul className="mx-auto mb-8 grid max-w-4xl list-none grid-cols-2 gap-3 p-0 sm:mb-10 sm:grid-cols-4 sm:gap-4">
            {facts.map((fact) => (
              <li
                key={fact.label}
                className="rounded-[12px] border border-[var(--border-subtle)] bg-[var(--bg-elevated)]/30 px-3 py-3 text-center sm:px-4 sm:py-4"
              >
                <p className="font-display text-xl font-medium tracking-tight text-[var(--text-primary)] sm:text-2xl">
                  {fact.value}
                </p>
                <p className="mt-1 text-[11px] font-medium leading-snug text-[var(--text-muted)] sm:text-xs">
                  {fact.label}
                </p>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={100}>
          <p className="mb-3 text-center text-[10px] font-medium uppercase tracking-[0.18em] text-[var(--text-muted)] sm:mb-4">
            {t("companiesLabel")}
          </p>
          <TrustMotion brands={trustBrands} />
          <p className="mx-auto mt-4 max-w-xl text-pretty text-center text-xs leading-relaxed text-[var(--text-muted)] sm:mt-5 sm:text-sm">
            {t("deliveryNote")}
          </p>
          <p className="mx-auto mt-2 max-w-xl text-pretty text-center text-xs font-medium text-[var(--text-secondary)] sm:text-sm">
            {slaLine}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
