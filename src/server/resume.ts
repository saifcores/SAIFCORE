import { getProfileDisplayName } from "@/site";

type ResumeLocale = "en" | "fr";

function normalizeResumeLocale(locale?: string): ResumeLocale {
  return locale === "fr" ? "fr" : "en";
}

function localResumePath(locale: ResumeLocale): string {
  return locale === "fr" ? "/resume-fr.pdf" : "/resume-en.pdf";
}

/**
 * CV download URL for recruiters: optional `NEXT_PUBLIC_RESUME_URL` (https),
 * otherwise the locale PDF shipped in `public/` (`/resume-en.pdf` /
 * `/resume-fr.pdf`).
 *
 * Do not use `fs.existsSync` on `public/` — those files are CDN static assets
 * on Vercel and are not present in the serverless runtime filesystem, which
 * made the download CTA fall back to `/#contact`.
 */
export function getResumeUrl(locale?: string): string | null {
  const external = process.env.NEXT_PUBLIC_RESUME_URL?.trim();
  if (external) {
    try {
      const u = new URL(external);
      if (u.protocol === "https:" || u.protocol === "http:") return external;
    } catch {
      return null;
    }
  }

  return localResumePath(normalizeResumeLocale(locale));
}

/** True when the resume is served from this site (enables `download` attribute). */
export function isLocalResume(url: string | null): boolean {
  return (
    url === "/resume-en.pdf" ||
    url === "/resume-fr.pdf" ||
    url === "/resume.pdf"
  );
}

/** Suggested filename when downloading the hosted CV. */
export function getResumeDownloadFilename(locale?: string): string {
  const loc = normalizeResumeLocale(locale);
  const suffix = loc === "fr" ? "CV-FR" : "CV-EN";
  const name = getProfileDisplayName();
  if (name !== "SAIFCORE") {
    const slug = name
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-zA-Z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
    return slug ? `${slug}-${suffix}.pdf` : `SAIFCORE-${suffix}.pdf`;
  }
  return `SAIFCORE-${suffix}.pdf`;
}
