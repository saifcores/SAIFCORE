import type { ReactNode } from "react";
import { HeroVisual } from "@/components/portfolio/HeroVisual";

type Props = {
  year: string;
  badge: string;
  title: string;
  titleAccent: string;
  titleRest: string;
  subtitle: string;
  proofLine: string;
  availability: string;
  hub: string;
  orbit: readonly string[];
  scroll: string;
  ctas: ReactNode;
};

export function HeroContent({
  year,
  badge,
  title,
  titleAccent,
  titleRest,
  subtitle,
  proofLine,
  availability,
  hub,
  orbit,
  scroll,
  ctas,
}: Props) {
  return (
    <div>
      <p className="mb-8 font-mono text-xs tracking-[0.14em] text-[var(--text-muted)] sm:mb-10">
        {year}
      </p>

      <div className="grid items-start gap-10 md:grid-cols-[minmax(0,1.15fr)_minmax(240px,320px)] md:items-center md:gap-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(300px,0.92fr)] lg:items-start lg:gap-14">
        <div className="flex max-w-[38rem] flex-col">
          <p className="mb-6 inline-flex w-fit items-center gap-2 rounded-full border border-[var(--border-subtle)] bg-[var(--bg-elevated)] px-3 py-1 text-[13px] text-[var(--text-secondary)]">
            <span
              className="h-1.5 w-1.5 rounded-full bg-[var(--ok)]"
              aria-hidden
            />
            {badge}
          </p>

          <h1
            id="hero-heading"
            className="text-balance font-display text-[clamp(1.8rem,4.8vw,4.15rem)] font-semibold leading-[1.05] tracking-[-0.035em] text-[var(--text-primary)]"
          >
            {title} <span className="hero-accent">{titleAccent}</span>{" "}
            {titleRest}
          </h1>

          <p className="mt-6 max-w-[46ch] text-pretty text-base leading-relaxed text-[var(--text-secondary)] sm:text-[1.0625rem]">
            {subtitle}
          </p>
          <p className="mt-3 max-w-[50ch] text-pretty text-sm leading-relaxed text-[var(--text-muted)]">
            {proofLine}
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
            {ctas}
          </div>
          <p className="mt-4 max-w-[52ch] text-pretty text-sm leading-relaxed text-[var(--text-secondary)]">
            {availability}
          </p>
        </div>

        <div className="mx-auto w-full max-w-[18.75rem] md:mx-0 md:max-w-none md:pt-0 lg:pt-8">
          <HeroVisual nodes={[...orbit]} hubLabel={hub} />
        </div>
      </div>

      <a
        href="#expertise"
        className="mt-10 inline-flex items-center gap-2 text-sm text-[var(--text-muted)] transition-colors hover:text-[var(--text-primary)]"
      >
        {scroll}
        <span aria-hidden>↓</span>
      </a>
    </div>
  );
}
