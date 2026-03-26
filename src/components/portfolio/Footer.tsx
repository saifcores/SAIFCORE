import { getTranslations } from "next-intl/server";
import { getGithubUrl, getLinkedinUrl } from "@/lib/site";

export async function Footer() {
  const t = await getTranslations("footer");
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-[var(--border-subtle)] px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-[1280px] flex-col items-center justify-between gap-6 sm:flex-row">
        <p className="text-sm text-[var(--text-muted)]">
          {t("rights", { year })}
        </p>
        <div className="flex items-center gap-6">
          <a
            href={getLinkedinUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-[var(--text-secondary)] transition hover:text-[var(--text-primary)]"
          >
            {t("linkedin")}
          </a>
          <a
            href={getGithubUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-[var(--text-secondary)] transition hover:text-[var(--text-primary)]"
          >
            {t("github")}
          </a>
        </div>
      </div>
    </footer>
  );
}
