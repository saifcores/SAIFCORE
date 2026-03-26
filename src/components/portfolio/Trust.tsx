import { getTranslations } from "next-intl/server";
import { Reveal } from "./Reveal";
import { TrustMotion } from "./TrustMotion";
import { trustBrands } from "@/data/trust-brands";

export async function Trust() {
  const t = await getTranslations("trust");

  return (
    <section className="border-b border-[var(--border-subtle)] px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-[1280px]">
        <Reveal>
          <p className="mb-10 text-center text-xs font-medium uppercase tracking-[0.2em] text-[var(--text-muted)]">
            {t("heading")}
          </p>
        </Reveal>

        <Reveal delay={120}>
          <TrustMotion brands={trustBrands} />
        </Reveal>
      </div>
    </section>
  );
}
