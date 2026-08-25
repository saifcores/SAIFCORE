import { getMessages, getTranslations } from "next-intl/server";
import { Reveal } from "./Reveal";
import { TrustMotion } from "./TrustMotion";
import { trustBrands } from "@/data/trust-brands";

export async function Trust() {
  const t = await getTranslations("trust");
  const messages = await getMessages();
  const industries = messages.trust.industries;
  const facts = messages.trust.facts;

  return (
    <section className="border-b border-[var(--border-subtle)] px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
      <div className="mx-auto max-w-[1280px]">
        <Reveal>
          <p className="mb-4 text-pretty text-center text-xs font-medium uppercase tracking-[0.2em] text-[var(--text-muted)]">
            {t("heading")}
          </p>
        </Reveal>

        <Reveal delay={60}>
          <div className="mb-6 flex flex-wrap items-center justify-center gap-2">
            {industries.map((industry, i) => {
              const isHighlight = i === 0 || i === 1;
              return (
                <span
                  key={industry}
                  className={`rounded-full border px-2.5 py-1 text-[11px] font-medium sm:px-3 sm:text-xs ${
                    isHighlight
                      ? "border-blue-500/30 bg-gradient-to-r from-blue-500/12 to-emerald-500/8 text-[var(--text-primary)]"
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
          <p className="mx-auto mt-5 max-w-xl text-pretty text-center text-xs leading-relaxed text-[var(--text-muted)] sm:text-sm">
            {t("deliveryNote")}
          </p>
        </Reveal>

        <Reveal delay={140}>
          <ul className="mx-auto mt-8 grid max-w-4xl list-none grid-cols-2 gap-3 p-0 sm:grid-cols-4 sm:gap-4">
            {facts.map((fact) => (
              <li
                key={fact.label}
                className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-elevated)]/15 px-3 py-3 text-center sm:px-4 sm:py-4"
              >
                <p className="font-mono text-sm font-semibold text-[var(--text-primary)] sm:text-base">
                  {fact.value}
                </p>
                <p className="mt-1 text-[11px] leading-snug text-[var(--text-muted)] sm:text-xs">
                  {fact.label}
                </p>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
