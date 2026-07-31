import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { hasObtainedCertifications } from "@/data/certifications";
import { Reveal } from "./Reveal";

type SitePath =
  | "/about"
  | "/experience"
  | "/systems"
  | "/certifications"
  | "/#offers"
  | "/#contact";

type Props = {
  className?: string;
  excludePath?: SitePath;
  compact?: boolean;
};

export async function ProfileExploreLinks({
  className = "",
  excludePath,
  compact = false,
}: Props) {
  const t = await getTranslations("profileExplore");
  const tNav = await getTranslations("nav");

  const links = [
    { href: "/about" as const, label: tNav("about") },
    { href: "/experience" as const, label: tNav("experience") },
    { href: "/systems" as const, label: tNav("systems") },
    { href: "/#offers" as const, label: tNav("offers") },
    ...(hasObtainedCertifications()
      ? [{ href: "/certifications" as const, label: tNav("credentials") }]
      : []),
    { href: "/#contact" as const, label: tNav("contact") },
  ].filter((link) => link.href !== excludePath);

  if (links.length === 0) return null;

  return (
    <nav aria-label={t("label")} className={className}>
      <Reveal delay={compact ? 0 : 80}>
        {!compact ? (
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.18em] text-[var(--text-muted)]">
            {t("title")}
          </p>
        ) : null}
        <ul
          className={
            compact
              ? "flex flex-wrap gap-2"
              : "grid gap-2 sm:grid-cols-2 lg:grid-cols-3"
          }
        >
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={
                  compact
                    ? "inline-flex min-h-10 items-center rounded-full border border-[var(--border-subtle)] bg-[var(--bg-elevated)]/40 px-3.5 text-xs font-semibold text-[var(--text-secondary)] transition hover:border-[var(--border-hover)] hover:text-[var(--text-primary)] sm:text-sm"
                    : "flex min-h-11 items-center justify-between rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-elevated)]/25 px-4 py-3 text-sm font-semibold text-[var(--text-secondary)] transition hover:border-[var(--border-hover)] hover:bg-[var(--bg-elevated)]/40 hover:text-[var(--text-primary)]"
                }
              >
                {link.label}
                {!compact ? <span aria-hidden>→</span> : null}
              </Link>
            </li>
          ))}
        </ul>
      </Reveal>
    </nav>
  );
}
