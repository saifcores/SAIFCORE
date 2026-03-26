"use client";

import type { TrustBrand } from "@/data/trust-brands";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { TrustBrandGrid } from "./TrustBrandGrid";
import { TrustMarquee } from "./TrustMarquee";

type Props = {
  brands: TrustBrand[];
};

export function TrustMotion({ brands }: Props) {
  const reduced = usePrefersReducedMotion();

  if (reduced) {
    return <TrustBrandGrid brands={brands} />;
  }

  return <TrustMarquee brands={brands} />;
}
