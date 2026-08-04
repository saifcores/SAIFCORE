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
  const blog = getBlogUrl();
  return [linkedin, github, blog].filter(
    (u): u is string => !!u && /^https?:\/\//i.test(u),
  );
}

/** LinkedIn profile URL, or `null` when unset (hide the link). */
export function getLinkedinUrl(): string | null {
  const u = process.env.NEXT_PUBLIC_LINKEDIN_URL?.trim();
  return u && /^https?:\/\//i.test(u) ? u : null;
}

/** GitHub profile URL, or `null` when unset (hide the link). */
export function getGithubUrl(): string | null {
  const u = process.env.NEXT_PUBLIC_GITHUB_URL?.trim();
  return u && /^https?:\/\//i.test(u) ? u : null;
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

/** Public contact email (mailto, footer, Resend To). Set `NEXT_PUBLIC_CONTACT_EMAIL`. */
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

/** `mailto:` URL with optional subject and body, or `null` if no verified email. */
export function getContactMailto(
  subject: string,
  body?: string,
): string | null {
  const email = getContactEmail();
  if (!email) return null;
  const params = new URLSearchParams();
  if (subject) params.set("subject", subject);
  if (body) params.set("body", body);
  const q = params.toString();
  return `mailto:${email}${q ? `?${q}` : ""}`;
}

/**
 * SAIFCORE Blog origin (no trailing slash).
 * Set `NEXT_PUBLIC_BLOG_URL` (e.g. https://blog.saifcore.tech).
 */
export function getBlogUrl(): string | null {
  const raw = process.env.NEXT_PUBLIC_BLOG_URL?.trim();
  if (raw && /^https?:\/\//i.test(raw)) {
    return raw.replace(/\/$/, "");
  }
  return null;
}

/** Blog home for a locale (`/` or `/fr`), or `null` if blog URL is not configured. */
export function getBlogIndexUrl(locale: "en" | "fr"): string | null {
  const blog = getBlogUrl();
  if (!blog) return null;
  return locale === "fr" ? `${blog}/fr` : blog;
}

/** Full article URL on the blog, or `null` if blog URL is not configured. */
export function getBlogArticleUrl(
  slug: string,
  locale: "en" | "fr",
): string | null {
  const blog = getBlogUrl();
  if (!blog) return null;
  const prefix = locale === "fr" ? "/fr" : "";
  return `${blog}${prefix}/articles/${slug}`;
}

/** hreflang map for a blog article, or `null` when blog URL is not configured. */
export function getBlogArticleLanguageAlternates(
  slug: string,
): Record<string, string> | null {
  const en = getBlogArticleUrl(slug, "en");
  const fr = getBlogArticleUrl(slug, "fr");
  if (!en || !fr) return null;
  return { en, fr, "x-default": en };
}

/** hreflang map for the blog home, or `null` when blog URL is not configured. */
export function getBlogIndexLanguageAlternates(): Record<
  string,
  string
> | null {
  const en = getBlogIndexUrl("en");
  const fr = getBlogIndexUrl("fr");
  if (!en || !fr) return null;
  return { en, fr, "x-default": en };
}
