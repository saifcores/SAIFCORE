import type { ReactNode } from "react";
import Image from "next/image";
import type { AppMessages } from "@/types/messages";

type FlowStep = AppMessages["hero"]["flow"][number];

type Props = {
  identityName: string;
  identityRole: string;
  badge: string;
  title: string;
  subtitle: string;
  proofLine: string;
  availability: string;
  flowLabel: string;
  flowCaption: string;
  portraitAlt: string;
  flow: readonly FlowStep[];
  ctas: ReactNode;
};

export function HeroContent({
  identityName,
  identityRole,
  badge,
  title,
  subtitle,
  proofLine,
  availability,
  flowLabel,
  flowCaption,
  portraitAlt,
  flow,
  ctas,
}: Props) {
  return (
    <div className="relative">
      <div className="hero-ambient" aria-hidden />
      <div className="relative grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(300px,380px)] lg:gap-16">
        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-3.5">
            <Image
              src="/profile.png"
              alt={portraitAlt}
              width={56}
              height={56}
              priority
              className="h-14 w-14 shrink-0 rounded-full border border-[var(--border-subtle)] object-cover object-[center_18%] ring-2 ring-[color-mix(in_srgb,var(--accent)_28%,transparent)]"
            />
            <div className="min-w-0">
              <p className="font-medium tracking-tight text-[var(--text-primary)]">
                {identityName}
              </p>
              <p className="text-[13px] leading-snug text-[var(--text-muted)]">
                {identityRole}
                {" · "}
                {badge}
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-3.5">
            <h1
              id="hero-heading"
              className="text-pretty font-display text-display-md text-[var(--text-primary)]"
            >
              {title}
            </h1>
            <p className="max-w-[52ch] text-pretty text-[1.0625rem] leading-relaxed text-[var(--text-secondary)] sm:text-lg">
              {subtitle}
            </p>
            <p className="max-w-[54ch] text-pretty text-sm leading-relaxed text-[var(--text-muted)]">
              {proofLine}
            </p>
          </div>

          <div className="flex flex-col gap-3.5">
            <p className="inline-flex w-fit items-center gap-2 rounded-full border border-[var(--border-subtle)] bg-[var(--bg-elevated)]/70 px-3 py-1 font-mono text-xs text-[var(--text-muted)]">
              <span
                aria-hidden
                className="status-live h-1.5 w-1.5 rounded-full bg-[var(--ok)]"
              />
              {availability}
            </p>
            <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              {ctas}
            </div>
          </div>
        </div>

        <aside
          aria-label={flowLabel}
          className="overflow-hidden rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-elevated)] shadow-[var(--shadow-card)]"
        >
          <p className="flex items-center justify-between border-b border-[var(--border-subtle)] px-5 py-3 font-mono text-[11px] uppercase tracking-[0.06em] text-[var(--text-muted)] sm:px-6">
            <span>{flowLabel}</span>
            <span
              className="h-1.5 w-1.5 rounded-full bg-[var(--ok)]"
              aria-hidden
            />
          </p>
          <ol className="m-0 flex list-none flex-col px-5 py-3.5 sm:px-6">
            {flow.map((step, index) => {
              const isLast = index === flow.length - 1;
              return (
                <li key={step.name} className="flex gap-3">
                  <div className="flex w-7 shrink-0 flex-col items-center">
                    <span
                      aria-hidden
                      className={`font-mono text-[11px] leading-6 tabular-nums ${
                        isLast
                          ? "text-[var(--accent)]"
                          : "text-[var(--text-muted)]"
                      }`}
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    {isLast ? null : (
                      <span
                        aria-hidden
                        className="my-1 w-px flex-1 bg-[var(--border-subtle)]"
                      />
                    )}
                  </div>
                  <div className={`min-w-0 flex-1 ${isLast ? "" : "pb-3"}`}>
                    <div className="text-[13px] font-semibold leading-6 text-[var(--text-primary)]">
                      {step.name}
                    </div>
                    <div
                      className={`font-mono text-[11px] leading-5 ${
                        isLast
                          ? "text-[var(--accent)]"
                          : "text-[var(--text-muted)]"
                      }`}
                    >
                      {step.spec}
                    </div>
                  </div>
                </li>
              );
            })}
          </ol>
          <p className="border-t border-[var(--border-subtle)] px-5 py-3 text-[11px] text-[var(--text-muted)] sm:px-6">
            {flowCaption}
          </p>
        </aside>
      </div>
    </div>
  );
}
