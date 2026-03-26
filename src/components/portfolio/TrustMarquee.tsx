"use client";

import Image from "next/image";
import type { TrustBrand } from "@/data/trust-brands";

type Props = {
  brands: TrustBrand[];
};

export function TrustMarquee({ brands }: Props) {
  const loop = [...brands, ...brands];

  return (
    <div className="relative py-1">
      <p className="sr-only">
        Partner brands: {brands.map((b) => b.name).join(", ")}.
      </p>
      <div
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-[var(--bg-base)] to-transparent sm:w-20"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-[var(--bg-base)] to-transparent sm:w-20"
        aria-hidden
      />

      <div className="overflow-hidden" aria-hidden>
        <div className="trust-marquee-track flex w-max items-stretch gap-10 pr-10 sm:gap-14 md:gap-16">
          {loop.map((b, i) => (
            <div
              key={`${b.name}-${i}`}
              className="flex w-[140px] shrink-0 flex-col items-center justify-center gap-2 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-elevated)]/25 px-4 py-4 shadow-[0_0_0_1px_rgba(255,255,255,0.02)] sm:w-[160px]"
            >
              <div className="relative flex h-10 w-full items-center justify-center sm:h-11">
                <Image
                  src={`/trust/${b.logo}`}
                  alt=""
                  width={200}
                  height={80}
                  className="h-8 w-auto max-w-full object-contain object-center opacity-90 sm:h-9"
                  sizes="160px"
                  unoptimized
                />
              </div>
              <p className="line-clamp-2 text-center text-[11px] font-medium leading-tight text-[var(--text-muted)] sm:text-xs">
                {b.name}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
