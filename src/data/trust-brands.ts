/**
 * Experience logos live under `public/trust/`.
 * Do not use LinkedIn CDN URLs — hotlinking is blocked.
 */

/** Local filename → `/trust/...`; pass-through for absolute URLs. */
export function resolveTrustLogoSrc(logo: string): string {
  const trimmed = logo.trim();
  if (trimmed.startsWith("http://") || trimmed.startsWith("https://")) {
    return trimmed;
  }
  return `/trust/${trimmed}`;
}
