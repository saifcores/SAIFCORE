"use client";

import Image from "next/image";
import { useState } from "react";
import type { ExperienceEntry } from "@/types/messages";
import { Reveal } from "./Reveal";

/** Show every role when count is at or below this; otherwise paginate. */
const FULL_LIST_MAX = 5;
/** How many full cards to show before "Show more". */
const INITIAL_VISIBLE = 4;

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

function revealDelay(index: number): number {
  return Math.min(index * 70, 350);
}

type CompanyLogoProps = {
  logo: ExperienceEntry["logo"];
  company: string;
  featured?: boolean;
};

function CompanyLogo({ logo, company, featured = false }: CompanyLogoProps) {
  const [imgFailed, setImgFailed] = useState(false);
  const hasLogo = Boolean(logo?.trim()) && !imgFailed;

  return (
    <div
      className={`relative flex shrink-0 items-center justify-center overflow-hidden rounded-2xl border shadow-sm transition duration-300 ${
        featured
          ? "h-[4.5rem] w-[4.5rem] border-blue-500/35 bg-[var(--bg-base)]/80 shadow-blue-500/10 sm:h-20 sm:w-20"
          : "h-16 w-16 border-[var(--border-subtle)] bg-[var(--bg-elevated)]/60 group-hover:border-[var(--border-hover)] group-hover:bg-[var(--bg-elevated)]/80 sm:h-[4.5rem] sm:w-[4.5rem]"
      }`}
    >
      {featured ? (
        <span
          className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-500/12 via-transparent to-emerald-500/10"
          aria-hidden
        />
      ) : null}
      <div className="relative flex h-full w-full items-center justify-center p-2.5 sm:p-3">
        {hasLogo ? (
          <Image
            src={`/trust/${logo}`}
            alt=""
            width={80}
            height={80}
            className={`h-auto w-full max-h-9 object-contain object-center sm:max-h-10 ${
              featured
                ? "opacity-100"
                : "opacity-85 transition group-hover:opacity-100"
            }`}
            sizes="80px"
            unoptimized
            onError={() => setImgFailed(true)}
          />
        ) : (
          <span
            className={`text-sm font-bold tracking-tight ${
              featured ? "text-blue-300" : "text-[var(--text-secondary)]"
            }`}
            aria-hidden
          >
            {companyInitials(company)}
          </span>
        )}
      </div>
      <span className="sr-only">{company}</span>
    </div>
  );
}

type ExperienceCardProps = {
  item: ExperienceEntry;
  index: number;
  isLast: boolean;
  stackLabel: string;
  currentRoleLabel: string;
};

function ExperienceCard({
  item,
  index,
  isLast,
  stackLabel,
  currentRoleLabel,
}: ExperienceCardProps) {
  const highlights = experienceHighlights(item);
  const stack = experienceStack(item);
  const cardId = `experience-card-${index}`;
  const titleId = `${cardId}-title`;
  const isCurrent = isCurrentRole(item.period);
  const indexStr = String(index + 1).padStart(2, "0");

  return (
    <li className={`relative ${isLast ? "" : "pb-10 sm:pb-12"}`}>
      <Reveal delay={revealDelay(index)}>
        <div className="group relative flex gap-5 sm:gap-8">
          <div className="relative z-10 flex shrink-0 flex-col items-center">
            <CompanyLogo
              logo={item.logo}
              company={item.company}
              featured={isCurrent}
            />
            {isCurrent ? (
              <span
                className="mt-2 hidden h-2 w-2 animate-pulse rounded-full bg-blue-400 shadow-[0_0_12px_rgba(96,165,250,0.6)] sm:block"
                aria-hidden
              />
            ) : null}
          </div>

          <article
            className={`relative min-w-0 flex-1 overflow-hidden rounded-2xl border p-6 transition duration-300 sm:p-8 ${
              isCurrent
                ? "border-blue-500/25 bg-gradient-to-br from-blue-500/[0.07] via-[var(--bg-elevated)]/25 to-[var(--bg-elevated)]/10 shadow-[0_0_0_1px_rgba(59,130,246,0.06)]"
                : "border-[var(--border-subtle)] bg-[var(--bg-elevated)]/20 hover:border-[var(--border-hover)] hover:bg-[var(--bg-elevated)]/35 hover:shadow-lg hover:shadow-[var(--shadow-card)]"
            }`}
            aria-labelledby={titleId}
          >
            <div
              className={`absolute inset-y-0 left-0 w-[3px] rounded-l-2xl bg-gradient-to-b from-blue-500 to-emerald-500 transition duration-300 ${
                isCurrent ? "opacity-100" : "opacity-0 group-hover:opacity-90"
              }`}
              aria-hidden
            />

            <header className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between sm:gap-6">
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-mono text-[10px] font-semibold tracking-[0.14em] text-[var(--text-muted)]">
                    {indexStr}
                  </span>
                  {isCurrent ? (
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-blue-500/30 bg-blue-500/10 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-blue-300">
                      <span
                        className="h-1.5 w-1.5 rounded-full bg-blue-400"
                        aria-hidden
                      />
                      {currentRoleLabel}
                    </span>
                  ) : null}
                </div>

                <h3
                  id={titleId}
                  className="mt-2 text-lg font-semibold leading-snug tracking-tight text-[var(--text-primary)] sm:text-xl"
                >
                  {item.role}
                </h3>

                <p
                  className={`mt-1.5 text-sm font-medium leading-snug sm:text-base ${
                    isCurrent ? "text-accent" : "text-[var(--text-secondary)]"
                  }`}
                >
                  {item.company}
                </p>
              </div>

              <div className="flex shrink-0 flex-col gap-1.5 sm:items-end">
                <p className="inline-flex w-fit items-center rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-base)]/50 px-3 py-1.5 font-mono text-xs tabular-nums text-[var(--text-primary)]">
                  {item.period}
                </p>
                <p className="text-xs leading-snug text-[var(--text-muted)] sm:text-right">
                  {item.location}
                </p>
              </div>
            </header>

            {highlights.length > 0 ? (
              <ul className="mt-6 flex flex-col gap-3.5 border-t border-[var(--border-subtle)]/80 pt-6 text-sm leading-relaxed text-[var(--text-secondary)]">
                {highlights.map((text, bi) => (
                  <li key={`${cardId}-h-${bi}`} className="flex gap-3">
                    <span
                      className={`mt-2 flex h-4 w-4 shrink-0 items-center justify-center rounded-full ${
                        isCurrent
                          ? "bg-blue-500/15 text-accent"
                          : "bg-[var(--bg-base)]/80 text-[var(--text-muted)]"
                      }`}
                      aria-hidden
                    >
                      <svg
                        viewBox="0 0 12 12"
                        className="h-2 w-2"
                        fill="currentColor"
                      >
                        <path d="M10.28 2.28a.75.75 0 0 1 0 1.06l-5.25 5.25a.75.75 0 0 1-1.06 0L1.72 6.34a.75.75 0 1 1 1.06-1.06l2.19 2.19 4.72-4.72a.75.75 0 0 1 1.06 0Z" />
                      </svg>
                    </span>
                    <span className="min-w-0">{text}</span>
                  </li>
                ))}
              </ul>
            ) : null}

            {stack.length > 0 ? (
              <footer className="mt-6 border-t border-[var(--border-subtle)]/80 pt-6">
                <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.14em] text-[var(--text-muted)]">
                  {stackLabel}
                </p>
                <ul className="flex list-none flex-wrap gap-2 p-0">
                  {stack.map((tech) => (
                    <li key={`${cardId}-${tech}`}>
                      <span
                        className={`inline-block rounded-full border px-3 py-1 text-xs font-medium transition duration-300 ${
                          isCurrent
                            ? "border-blue-500/20 bg-blue-500/5 text-blue-200/90"
                            : "border-[var(--border-subtle)] bg-[var(--bg-base)]/40 text-[var(--text-muted)] group-hover:border-[var(--border-hover)] group-hover:text-[var(--text-secondary)]"
                        }`}
                      >
                        {tech}
                      </span>
                    </li>
                  ))}
                </ul>
              </footer>
            ) : null}
          </article>
        </div>
      </Reveal>
    </li>
  );
}

export type ExperienceTimelineProps = {
  items: ExperienceEntry[];
  stackLabel: string;
  currentRoleLabel: string;
  showMoreLabel: string;
  showLessLabel: string;
  /** Override default visible count before "Show more". */
  initialVisible?: number;
};

export function ExperienceTimeline({
  items,
  stackLabel,
  currentRoleLabel,
  showMoreLabel,
  showLessLabel,
  initialVisible = INITIAL_VISIBLE,
}: ExperienceTimelineProps) {
  const usePagination = items.length > FULL_LIST_MAX;
  const [expanded, setExpanded] = useState(!usePagination);

  const visibleCount = expanded ? items.length : initialVisible;
  const visibleItems = items.slice(0, visibleCount);
  const hiddenCount = items.length - visibleCount;

  return (
    <>
      <ol className="relative mx-auto max-w-4xl list-none p-0">
        <div
          className="absolute left-8 top-10 bottom-10 hidden w-px bg-gradient-to-b from-blue-500/50 via-[var(--border-subtle)] to-transparent sm:left-9 sm:block"
          aria-hidden
        />

        {visibleItems.map((item, i) => (
          <ExperienceCard
            key={`${item.role}|${item.company}|${item.period}`}
            item={item}
            index={i}
            isLast={i === visibleItems.length - 1 && hiddenCount === 0}
            stackLabel={stackLabel}
            currentRoleLabel={currentRoleLabel}
          />
        ))}
      </ol>

      {usePagination && hiddenCount > 0 ? (
        <Reveal delay={revealDelay(visibleItems.length)}>
          <div className="mx-auto mt-2 flex max-w-4xl justify-center">
            <button
              type="button"
              onClick={() => setExpanded(true)}
              className="inline-flex items-center gap-2 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-elevated)]/40 px-6 py-3 text-sm font-semibold text-[var(--text-secondary)] transition hover:border-[var(--border-hover)] hover:bg-[var(--bg-elevated)]/60 hover:text-[var(--text-primary)]"
            >
              {showMoreLabel}
              <span aria-hidden>↓</span>
            </button>
          </div>
        </Reveal>
      ) : null}

      {usePagination && expanded && items.length > initialVisible ? (
        <Reveal delay={revealDelay(items.length)}>
          <div className="mx-auto mt-6 flex max-w-4xl justify-center">
            <button
              type="button"
              onClick={() => setExpanded(false)}
              className="text-sm font-semibold text-[var(--text-muted)] transition hover:text-[var(--text-primary)]"
            >
              {showLessLabel}
            </button>
          </div>
        </Reveal>
      ) : null}
    </>
  );
}
