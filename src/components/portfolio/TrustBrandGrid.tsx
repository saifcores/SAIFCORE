import Image from "next/image";
import type { TrustBrand } from "@/data/trust-brands";
import { Reveal } from "./Reveal";

type Props = {
  brands: TrustBrand[];
};

export function TrustBrandGrid({ brands }: Props) {
  return (
    <ul className="trust-grid grid grid-cols-2 gap-5 sm:grid-cols-4 sm:gap-6">
      {brands.map(({ name, logo }, i) => (
        <li key={name}>
          <Reveal delay={i * 95}>
            <figure className="group relative flex h-full flex-col items-center gap-3 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-elevated)]/35 px-3 py-5 text-center shadow-[0_0_0_1px_rgba(255,255,255,0.02)] backdrop-blur-sm transition duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 hover:border-indigo-500/25 hover:bg-[var(--bg-elevated)]/55 hover:shadow-[0_20px_48px_-16px_rgba(79,70,229,0.28)]">
              <div className="trust-logo-drift relative flex min-h-[44px] w-full max-w-[200px] items-center justify-center sm:min-h-[52px]">
                <div
                  className="pointer-events-none absolute inset-0 rounded-xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  style={{
                    background:
                      "radial-gradient(ellipse at 50% 0%, rgba(99,102,241,0.2), transparent 65%)",
                  }}
                  aria-hidden
                />
                <div className="relative flex h-11 w-full items-center justify-center overflow-hidden rounded-xl sm:h-12">
                  <Image
                    src={`/trust/${logo}`}
                    alt=""
                    width={200}
                    height={80}
                    className="h-8 w-auto max-w-full object-contain object-center opacity-90 transition duration-500 ease-out group-hover:scale-[1.06] group-hover:opacity-100 sm:h-9"
                    sizes="(max-width: 640px) 42vw, 160px"
                    unoptimized
                  />
                </div>
              </div>
              <figcaption className="text-xs font-medium leading-snug text-[var(--text-muted)] transition duration-300 group-hover:text-[var(--text-secondary)] sm:text-sm">
                {name}
              </figcaption>
            </figure>
          </Reveal>
        </li>
      ))}
    </ul>
  );
}
