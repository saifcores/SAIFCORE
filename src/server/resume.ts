import { existsSync } from "node:fs";
import { join } from "node:path";
import { getProfileDisplayName } from "@/site";

type ResumeLocale = "en" | "fr";

function normalizeResumeLocale(locale?: string): ResumeLocale {
  return locale === "fr" ? "fr" : "en";
}

function localResumePath(locale: ResumeLocale): string {
  return locale === "fr" ? "/resume-fr.pdf" : "/resume-en.pdf";
}

function localResumeFile(locale: ResumeLocale): string {
  return locale === "fr" ? "resume-fr.pdf" : "resume-en.pdf";
}

/**
 * CV download URL for recruiters: optional `NEXT_PUBLIC_RESUME_URL` (https),
 * otherwise `/resume-en.pdf` or `/resume-fr.pdf` if present in `public/`.
 * Server-only (uses `fs`) — do not import from client components.
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

  const loc = normalizeResumeLocale(locale);
  const preferred = join(process.cwd(), "public", localResumeFile(loc));
  if (existsSync(preferred)) return localResumePath(loc);

  // Fallback: other locale, then legacy single file
  const fallbackLoc: ResumeLocale = loc === "fr" ? "en" : "fr";
  const fallback = join(process.cwd(), "public", localResumeFile(fallbackLoc));
  if (existsSync(fallback)) return localResumePath(fallbackLoc);

  const legacy = join(process.cwd(), "public", "resume.pdf");
  if (existsSync(legacy)) return "/resume.pdf";

  return null;
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
