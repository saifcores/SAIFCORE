import { Reveal } from "./Reveal";
import { TrustMotion } from "./TrustMotion";
import { trustBrands } from "@/data/trust-brands";

export function Trust() {
  return (
    <section className="border-b border-[var(--border-subtle)] px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-[1280px]">
        <Reveal>
          <p className="mb-10 text-center text-xs font-medium uppercase tracking-[0.2em] text-[var(--text-muted)]">
            Trusted by companies and real-world projects
          </p>
        </Reveal>

        <Reveal delay={120}>
          <TrustMotion brands={trustBrands} />
        </Reveal>
      </div>
    </section>
  );
}
