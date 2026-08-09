import Image from "next/image";
import { getMessages, getTranslations } from "next-intl/server";
import { resolveTrustLogoSrc } from "@/data/trust-brands";
import type { ExperienceEntry } from "@/types/messages";
import { Reveal } from "./Reveal";

const STACK_PREVIEW = 7;

function experienceHighlights(entry: ExperienceEntry): string[] {
  return [entry.bullet0, entry.bullet1].filter((b) => b.trim());
}

function experienceStack(entry: ExperienceEntry): string[] {
  const s = entry.bullet2.trim();
  if (!s.length) return [];
  return s
    .split(",")
    .map((tag) => tag.trim())
    .filter(Boolean);
}

function isCurrentRole(period: string): boolean {
  return /\b(present|présent|actuel|current)\b/i.test(period);
}

function companyInitials(company: string): string {
  const words = company
    .split(/[\s—–\-|]+/)
    .map((w) => w.trim())
    .filter((w) => w.length > 0);
  if (words.length >= 2) {
    return `${words[0]![0] ?? ""}${words[1]![0] ?? ""}`.toUpperCase();
  }
  return company.slice(0, 2).toUpperCase();
}

function RoleLogo({
  logo,
  company,
  featured = false,
}: {
  logo: ExperienceEntry["logo"];
  company: string;
  featured?: boolean;
}) {
  const src = logo?.trim() ? resolveTrustLogoSrc(logo) : null;

  return (
    <div
      className={`relative flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-xl border transition duration-300 sm:h-14 sm:w-14 ${
        featured
          ? "border-[var(--accent-blue)]/30 bg-[var(--bg-base)]/80 shadow-[0_0_0_1px_color-mix(in_srgb,var(--accent-blue)_12%,transparent)]"
          : "border-[var(--border-subtle)] bg-[var(--bg-elevated)]/60 group-hover:border-[var(--border-hover)]"
      }`}
    >
      {src ? (
        <Image
          src={src}
          alt=""
          width={56}
          height={56}
          className="h-auto w-full max-h-8 object-contain object-center p-2 opacity-90 transition group-hover:opacity-100 sm:max-h-9"
          sizes="56px"
          unoptimized
        />
      ) : (
        <span
          className={`text-xs font-bold tracking-tight sm:text-sm ${
            featured ? "text-accent" : "text-[var(--text-secondary)]"
          }`}
          aria-hidden
        >
          {companyInitials(company)}
        </span>
      )}
      <span className="sr-only">{company}</span>
    </div>
  );
}

function RoleRow({
  item,
  index,
  stackLabel,
  clientLabel,
  currentRoleLabel,
}: {
  item: ExperienceEntry;
  index: number;
  stackLabel: string;
  clientLabel: string;
  currentRoleLabel: string;
}) {
  const highlights = experienceHighlights(item);
  const stack = experienceStack(item);
  const isCurrent = isCurrentRole(item.period);
  const titleId = `experience-role-${index}-title`;
  const indexStr = String(index + 1).padStart(2, "0");
  const visibleStack = stack.slice(0, STACK_PREVIEW);
  const hiddenStack = Math.max(0, stack.length - visibleStack.length);

  return (
    <Reveal delay={Math.min(index * 70, 280)}>
      <article
        aria-labelledby={titleId}
        className={`group relative scroll-mt-28 xl:scroll-mt-24 ${
          isCurrent
            ? "rounded-2xl border border-[var(--accent-blue)]/20 bg-gradient-to-br from-[color-mix(in_srgb,var(--accent-blue)_7%,transparent)] via-[var(--bg-elevated)]/20 to-transparent px-4 py-7 sm:px-6 sm:py-9 lg:px-8"
            : "py-8 sm:py-10"
        }`}
      >
        {isCurrent ? (
          <div
            className="absolute inset-y-3 left-0 w-[3px] rounded-full bg-gradient-to-b from-[var(--accent-blue)] to-[var(--accent-emerald)] sm:inset-y-4"
            aria-hidden
          />
        ) : null}

        <div className="grid gap-6 lg:grid-cols-[minmax(0,15rem)_minmax(0,1fr)] lg:gap-12 xl:grid-cols-[minmax(0,17rem)_minmax(0,1fr)]">
          {/* Meta */}
          <aside className="min-w-0 lg:sticky lg:top-24 lg:self-start">
            <div className="flex items-start gap-3.5 lg:flex-col lg:gap-5">
              <div className="flex items-center gap-3 lg:w-full lg:justify-between">
                <RoleLogo
                  logo={item.logo}
                  company={item.company}
                  featured={isCurrent}
                />
                <span
                  className="hidden font-mono text-[11px] font-semibold tracking-[0.16em] text-[var(--text-muted)] lg:inline"
                  aria-hidden
                >
                  {indexStr}
                </span>
              </div>

              <div className="min-w-0 flex-1 lg:w-full">
                <div className="flex flex-wrap items-center gap-x-2 gap-y-1 lg:block">
                  <span className="font-mono text-[11px] font-semibold tracking-[0.16em] text-[var(--text-muted)] lg:hidden">
                    {indexStr}
                  </span>
                  {isCurrent ? (
                    <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-accent lg:mt-0">
                      <span
                        className="h-1.5 w-1.5 animate-pulse rounded-full bg-[var(--accent-blue)]"
                        aria-hidden
                      />
                      {currentRoleLabel}
                    </span>
                  ) : null}
                </div>

                <p
                  className={`mt-1.5 text-sm font-semibold leading-snug sm:text-base ${
                    isCurrent ? "text-accent" : "text-[var(--text-primary)]"
                  }`}
                >
                  {item.company}
                </p>

                <p className="mt-2 font-mono text-xs tabular-nums tracking-tight text-[var(--text-secondary)] sm:text-[13px]">
                  {item.period}
                </p>

                {item.location?.trim() ? (
                  <p className="mt-1.5 text-xs leading-snug text-[var(--text-muted)]">
                    {item.location}
                  </p>
                ) : null}
              </div>
            </div>
          </aside>

          {/* Narrative */}
          <div className="min-w-0">
            <h3
              id={titleId}
              className="text-pretty text-xl font-bold tracking-tight text-[var(--text-primary)] sm:text-2xl"
            >
              {item.role}
            </h3>

            {item.client?.trim() ? (
              <p className="mt-2.5 flex flex-wrap items-baseline gap-x-2 gap-y-1 text-sm">
                <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[var(--text-muted)]">
                  {clientLabel}
                </span>
                <span className="font-medium text-[var(--text-secondary)]">
                  {item.client}
                </span>
              </p>
            ) : null}

            {highlights.length > 0 ? (
              <ul className="mt-6 space-y-3.5 sm:mt-7">
                {highlights.map((text) => (
                  <li
                    key={text}
                    className="grid grid-cols-[auto_1fr] gap-3 text-sm leading-relaxed text-[var(--text-secondary)] sm:gap-3.5 sm:text-[15px] sm:leading-7"
                  >
                    <span
                      className={`mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full ${
                        isCurrent
                          ? "bg-[var(--accent-blue)]"
                          : "bg-[var(--text-muted)]"
                      }`}
                      aria-hidden
                    />
                    <span className="min-w-0 text-pretty">{text}</span>
                  </li>
                ))}
              </ul>
            ) : null}

            {stack.length > 0 ? (
              <div className="mt-6 border-t border-[var(--border-subtle)] pt-5 sm:mt-7">
                <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--text-muted)]">
                  {stackLabel}
                </p>
                <ul className="flex list-none flex-wrap gap-2 p-0">
                  {visibleStack.map((tech) => (
                    <li key={tech}>
                      <span
                        className={`inline-block rounded-lg border px-2.5 py-1 text-xs font-medium transition duration-300 ${
                          isCurrent
                            ? "border-[var(--accent-blue)]/20 bg-[color-mix(in_srgb,var(--accent-blue)_6%,transparent)] text-[var(--text-secondary)]"
                            : "border-[var(--border-subtle)] bg-[var(--bg-elevated)]/40 text-[var(--text-muted)] group-hover:border-[var(--border-hover)] group-hover:text-[var(--text-secondary)]"
                        }`}
                      >
                        {tech}
                      </span>
                    </li>
                  ))}
                  {hiddenStack > 0 ? (
                    <li>
                      <span className="inline-block rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-elevated)]/40 px-2.5 py-1 text-xs font-medium text-[var(--text-muted)]">
                        +{hiddenStack}
                      </span>
                    </li>
                  ) : null}
                </ul>
              </div>
            ) : null}
          </div>
        </div>
      </article>
    </Reveal>
  );
}

/**
 * Full experience ledger — company/period meta on the left,
 * role narrative on the right. Current role is visually elevated.
 */
export async function Experience() {
  const messages = await getMessages();
  const { experience } = messages;
  const t = await getTranslations("experience");
  const roleCount = String(experience.items.length).padStart(2, "0");

  return (
    <section
      id="experience"
      aria-label={t("title")}
      className="relative overflow-hidden border-b border-[var(--border-subtle)] px-4 py-10 sm:px-6 sm:py-12 lg:px-8 lg:py-16"
    >
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-56 bg-[radial-gradient(ellipse_70%_80%_at_0%_0%,color-mix(in_srgb,var(--accent-blue)_10%,transparent),transparent)]"
        aria-hidden
      />

      <div className="relative mx-auto max-w-[1280px]">
        <Reveal>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between sm:gap-8">
            <div className="max-w-2xl">
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-[var(--text-muted)]">
                {t("valueTitle")}
              </p>
              <p className="mt-2 text-pretty text-sm leading-relaxed text-[var(--text-secondary)] sm:mt-3 sm:text-base sm:leading-7">
                {t("valueBody")}
              </p>
            </div>
            <p
              className="shrink-0 font-mono text-3xl font-semibold tracking-tight text-[var(--text-muted)]/50 sm:text-4xl"
              aria-hidden
            >
              {roleCount}
            </p>
          </div>
        </Reveal>

        <div className="mt-8 space-y-1 border-t border-[var(--border-subtle)] pt-2 sm:mt-10 sm:pt-3">
          {experience.items.map((item, index) => (
            <div
              key={`${item.role}|${item.company}|${item.period}`}
              className={
                index < experience.items.length - 1 &&
                !isCurrentRole(item.period)
                  ? "border-b border-[var(--border-subtle)]"
                  : undefined
              }
            >
              <RoleRow
                item={item}
                index={index}
                stackLabel={t("stackLabel")}
                clientLabel={t("clientLabel")}
                currentRoleLabel={t("currentRole")}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
