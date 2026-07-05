import { existsSync } from "node:fs";
import { join } from "node:path";
import { getProfileDisplayName } from "@/site";

/**
 * CV download URL for recruiters: optional `NEXT_PUBLIC_RESUME_URL` (https),
 * otherwise `/resume.pdf` if `public/resume.pdf` exists.
 * Server-only (uses `fs`) — do not import from client components.
 */
export function getResumeUrl(): string | null {
  const external = process.env.NEXT_PUBLIC_RESUME_URL?.trim();
  if (external) {
    try {
      const u = new URL(external);
      if (u.protocol === "https:" || u.protocol === "http:") return external;
    } catch {
      return null;
    }
  }
  const localPath = join(process.cwd(), "public", "resume.pdf");
  if (existsSync(localPath)) return "/resume.pdf";
  return null;
}

/** True when the resume is served from this site (enables `download` attribute). */
export function isLocalResume(url: string | null): boolean {
  return url === "/resume.pdf";
}

/** Suggested filename when downloading the hosted CV. */
export function getResumeDownloadFilename(): string {
  const name = getProfileDisplayName();
  if (name !== "SAIFCORE") {
    const slug = name
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-zA-Z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
    return slug ? `${slug}-resume.pdf` : "SAIFCORE-resume.pdf";
  }
  return "SAIFCORE-resume.pdf";
}
