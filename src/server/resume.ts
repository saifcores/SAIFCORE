import { existsSync } from "node:fs";
import { join } from "node:path";

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
