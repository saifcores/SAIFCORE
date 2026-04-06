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

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Public contact email (mailto, footer). Set `NEXT_PUBLIC_CONTACT_EMAIL`. */
export function getContactEmail(): string | null {
  const e = process.env.NEXT_PUBLIC_CONTACT_EMAIL?.trim();
  return e && EMAIL_RE.test(e) ? e : null;
}

/** Display name for JSON-LD, photo alt, and visible copy. Falls back to brand. */
export function getProfileDisplayName(): string {
  const n = process.env.NEXT_PUBLIC_PROFILE_NAME?.trim();
  return n || "SAIFCORE";
}

/** Primary work location — used in schema.org and defaults for copy. */
export function getProfileLocation(): {
  city: string;
  country: string;
  countryCode: string;
} {
  return {
    city: process.env.NEXT_PUBLIC_PROFILE_CITY?.trim() || "Dakar",
    country: process.env.NEXT_PUBLIC_PROFILE_COUNTRY?.trim() || "Senegal",
    countryCode: (
      process.env.NEXT_PUBLIC_PROFILE_COUNTRY_CODE?.trim() || "SN"
    ).toUpperCase(),
  };
}

/** `mailto:` URL with optional subject, or `null` if no verified email. */
export function getContactMailto(subject: string): string | null {
  const email = getContactEmail();
  if (!email) return null;
  const q = subject ? `?subject=${encodeURIComponent(subject)}` : "";
  return `mailto:${email}${q}`;
}
