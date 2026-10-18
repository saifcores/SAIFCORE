import { getTranslations } from "next-intl/server";
import { Reveal } from "./Reveal";
import { TrustMotion } from "./TrustMotion";
import { trustBrands } from "@/data/trust-brands";

export async function Trust() {
  const t = await getTranslations("trust");

  return (
    <section className="border-b border-[var(--border-subtle)] px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <p className="mb-4 text-[10px] font-medium uppercase tracking-[0.18em] text-[var(--text-muted)] sm:mb-5">
            {t("companiesLabel")}
          </p>
          <TrustMotion brands={trustBrands} />
          <p className="mt-4 max-w-2xl text-pretty text-xs leading-relaxed text-[var(--text-muted)] sm:mt-5 sm:text-sm">
            {t("deliveryNote")}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
