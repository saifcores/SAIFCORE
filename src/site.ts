/**
 * Public site origin for metadata, sitemap, and JSON-LD.
 * Set `NEXT_PUBLIC_SITE_URL` in production (e.g. https://yourdomain.com).
 *
 * Kept as `src/site.ts` (not `src/lib/`) so the file is not ignored by common
 * global gitignore patterns for `lib/` directories.
 */
export function getSiteUrl(): string {
  const raw = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (raw && /^https?:\/\//i.test(raw)) {
    return raw.replace(/\/$/, "");
  }
  return "http://localhost:3000";
}

export function getSocialLinks(): string[] {
  const linkedin = process.env.NEXT_PUBLIC_LINKEDIN_URL?.trim();
  const github = process.env.NEXT_PUBLIC_GITHUB_URL?.trim();
  return [linkedin, github].filter(
    (u): u is string => !!u && /^https?:\/\//i.test(u),
  );
}

/** Footer / nav — falls back to generic roots if env not set. */
export function getLinkedinUrl(): string {
  const u = process.env.NEXT_PUBLIC_LINKEDIN_URL?.trim();
  return u && /^https?:\/\//i.test(u) ? u : "https://www.linkedin.com";
}

export function getGithubUrl(): string {
  const u = process.env.NEXT_PUBLIC_GITHUB_URL?.trim();
  return u && /^https?:\/\//i.test(u) ? u : "https://github.com";
}

/**
 * Calendly scheduling URL (event or user page).
 * Set `NEXT_PUBLIC_CALENDLY_URL` (e.g. https://calendly.com/your-handle/30min).
 */
export function getCalendlyUrl(): string | null {
  const u = process.env.NEXT_PUBLIC_CALENDLY_URL?.trim();
  if (!u) return null;
  try {
    const parsed = new URL(u);
    if (parsed.protocol !== "https:") return null;
    const host = parsed.hostname.replace(/^www\./, "");
    if (host !== "calendly.com") return null;
    return u.replace(/\/$/, "");
  } catch {
    return null;
  }
}
