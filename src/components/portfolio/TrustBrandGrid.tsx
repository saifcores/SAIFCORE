import Image from "next/image";
import type { TrustBrand } from "@/data/trust-brands";
import { Reveal } from "./Reveal";

type Props = {
  brands: TrustBrand[];
};

export function TrustBrandGrid({ brands }: Props) {
  return (
    <ul className="trust-grid grid grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-5">
      {brands.map(({ name, logo }, i) => (
        <li key={name}>
          <Reveal delay={i * 80}>
            <figure className="group relative flex h-full flex-col items-center gap-3 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-elevated)]/25 px-3 py-5 text-center transition duration-300 hover:-translate-y-1 hover:border-white/12 hover:bg-[var(--bg-elevated)]/50">
              <div className="trust-logo-drift relative flex min-h-[44px] w-full max-w-[180px] items-center justify-center sm:min-h-[52px]">
                <div className="relative flex h-10 w-full items-center justify-center overflow-hidden rounded-xl sm:h-12">
                  <Image
                    src={`/trust/${logo}`}
                    alt=""
                    width={180}
                    height={72}
                    className="h-8 w-auto max-w-full object-contain object-center opacity-70 transition duration-300 group-hover:opacity-100 sm:h-9"
                    sizes="(max-width: 640px) 42vw, 140px"
                    unoptimized
                  />
                </div>
              </div>
              <figcaption className="text-xs font-medium leading-snug text-[var(--text-muted)] transition duration-300 group-hover:text-[var(--text-secondary)]">
                {name}
              </figcaption>
            </figure>
          </Reveal>
        </li>
      ))}
    </ul>
  );
}
