export type TrustBrand = {
  name: string;
  /**
   * Filename under `public/trust/` (same assets as experience logos).
   * Do not use LinkedIn CDN URLs here — hotlinking is blocked and components
   * serve files from `/trust/`. Download logos into `public/trust/` instead.
   */
  logo: string;
};

/** Local filename → `/trust/...`; pass-through for absolute URLs. */
export function resolveTrustLogoSrc(logo: string): string {
  const trimmed = logo.trim();
  if (trimmed.startsWith("http://") || trimmed.startsWith("https://")) {
    return trimmed;
  }
  return `/trust/${trimmed}`;
}

export const trustBrands: TrustBrand[] = [
  {
    name: "Synapse Groupe",
    logo: "synapse.jpeg",
  },
  {
    name: "ENG Technologie",
    logo: "eng.jpeg",
  },
  {
    name: "Mafalia",
    logo: "mafalia.jpeg",
  },
  {
    name: "SarayaTech Senegal",
    logo: "saraya.jpeg",
  },
];
