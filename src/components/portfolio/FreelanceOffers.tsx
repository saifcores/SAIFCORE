"use client";

import { ArrowUpRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { MotionReveal } from "@/components/portfolio/motion/MotionReveal";

type Package = {
  title: string;
  duration: string;
  investment?: string;
  fit: string;
  description: string;
  includes: readonly string[];
};

type Track = {
  label: string;
  audience: string;
  promise: string;
  packages: readonly Package[];
  proofLabel?: string;
  proofHref?: `/systems/${string}`;
};

type Props = {
  title: string;
  subtitle: string;
  note: string;
  pricingNote: string;
  investmentLabel: string;
  closer: string;
  cta: string;
  ctaSecondary: string;
  fitLabel: string;
  startHereLabel: string;
  tracks: readonly Track[];
};

export function FreelanceOffers({
  title,
  subtitle,
  note,
  pricingNote,
  investmentLabel,
  closer,
  cta,
  ctaSecondary,
  fitLabel,
  startHereLabel,
  tracks,
}: Props) {
  return (
    <section
      id="offers"
      className="scroll-mt-24 border-b border-[var(--border-subtle)] px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-24 xl:scroll-mt-28"
    >
      <div className="mx-auto max-w-7xl">
        <MotionReveal>
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.18em] text-[var(--text-muted)]">
            {title}
          </p>
          <h2 className="max-w-3xl font-display text-pretty text-2xl font-medium tracking-tight text-[var(--text-primary)] sm:text-3xl md:text-4xl">
            {subtitle}
          </h2>
          <p className="mt-4 max-w-2xl text-pretty text-sm leading-relaxed text-[var(--text-secondary)] sm:text-base">
            {note}
          </p>
          <p className="mt-3 max-w-2xl text-pretty text-xs leading-relaxed text-[var(--text-muted)] sm:text-sm">
            {pricingNote}
          </p>
        </MotionReveal>

        <div className="mt-10 grid gap-10 md:mt-12 md:grid-cols-2 md:gap-10 lg:mt-16 lg:gap-16">
          {tracks.map((track, trackIndex) => (
            <MotionReveal key={track.label} delay={trackIndex * 80}>
              <div className="flex h-full flex-col">
                <div className="border-b border-[var(--border-subtle)] pb-6">
                  <p className="font-display text-sm font-medium text-[var(--text-muted)]">
                    {String(trackIndex + 1).padStart(2, "0")}
                  </p>
                  <h3 className="mt-2 text-xl font-semibold tracking-tight text-[var(--text-primary)]">
                    {track.label}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-[var(--text-secondary)]">
                    {track.audience}
                  </p>
                  <p className="mt-4 text-sm font-medium leading-relaxed text-[var(--text-primary)]">
                    {track.promise}
                  </p>
                  {track.proofLabel && track.proofHref ? (
                    <Link
                      href={track.proofHref}
                      className="mt-4 inline-flex min-h-10 items-center gap-1 text-xs font-semibold text-[var(--text-secondary)] transition hover:text-[var(--text-primary)]"
                    >
                      {track.proofLabel}
                      <ArrowUpRight className="h-3 w-3" aria-hidden />
                    </Link>
                  ) : null}
                </div>

                <ol className="mt-2 flex flex-1 list-none flex-col divide-y divide-[var(--border-subtle)] p-0">
                  {track.packages.map((pkg, pkgIndex) => {
                    const isStartHere = trackIndex === 0 && pkgIndex === 0;
                    return (
                      <li
                        key={pkg.title}
                        id={isStartHere ? "architecture-sprint" : undefined}
                        className={`scroll-mt-28 py-5 sm:py-6 ${
                          isStartHere
                            ? "border-l-2 border-[var(--accent-strong)] pl-4"
                            : ""
                        }`}
                      >
                        {isStartHere ? (
                          <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--accent-strong)]">
                            {startHereLabel}
                          </p>
                        ) : null}
                      <div className="flex flex-col gap-1 sm:flex-row sm:flex-wrap sm:items-baseline sm:justify-between sm:gap-x-3">
                        <div className="flex min-w-0 items-baseline gap-3">
                          <span className="font-mono text-[11px] tabular-nums text-[var(--text-muted)]">
                            {String(pkgIndex + 1).padStart(2, "0")}
                          </span>
                          <h4 className="text-base font-semibold text-[var(--text-primary)]">
                            {pkg.title}
                          </h4>
                        </div>
                        <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 pl-7 sm:pl-0 sm:justify-end">
                          <span className="text-[11px] font-medium uppercase tracking-[0.12em] text-[var(--text-muted)]">
                            {pkg.duration}
                          </span>
                          {pkg.investment ? (
                            <span className="text-sm font-semibold tabular-nums text-[var(--text-primary)]">
                              <span className="sr-only">
                                {investmentLabel}
                                {": "}
                              </span>
                              {pkg.investment}
                            </span>
                          ) : null}
                        </div>
                      </div>

                      <p className="mt-3 text-sm leading-relaxed text-[var(--text-secondary)]">
                        <span className="font-medium text-[var(--text-primary)]">
                          {fitLabel}
                          {": "}
                        </span>
                        {pkg.fit}
                      </p>
                      <p className="mt-2 text-sm leading-relaxed text-[var(--text-muted)]">
                        {pkg.description}
                      </p>

                      <ul className="mt-3 space-y-1.5">
                        {pkg.includes.map((item) => (
                          <li
                            key={item}
                            className="flex gap-2 text-xs leading-relaxed text-[var(--text-muted)]"
                          >
                            <span
                              className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-[var(--accent-strong)]"
                              aria-hidden
                            />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                      </li>
                    );
                  })}
                </ol>
              </div>
            </MotionReveal>
          ))}
        </div>

        <MotionReveal delay={200}>
          <div className="mt-10 flex flex-col gap-4 border-t border-[var(--border-subtle)] pt-8 sm:mt-12 sm:flex-row sm:items-center sm:justify-between">
            <p className="max-w-xl text-sm leading-relaxed text-[var(--text-muted)]">
              {closer}
            </p>
            <div className="flex w-full flex-col gap-2 min-[420px]:flex-row min-[420px]:flex-wrap sm:w-auto">
              <Link
                href="/#architecture-sprint"
                className="btn-primary inline-flex min-h-12 w-full items-center justify-center gap-2 px-6 text-sm min-[420px]:w-auto"
              >
                {cta}
                <ArrowUpRight className="h-4 w-4" aria-hidden />
              </Link>
              <Link
                href="/#contact"
                className="btn-outline inline-flex min-h-12 w-full items-center justify-center px-6 text-sm font-medium min-[420px]:w-auto"
              >
                {ctaSecondary}
              </Link>
            </div>
          </div>
        </MotionReveal>
      </div>
    </section>
  );
}
