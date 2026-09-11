"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Check } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { MotionReveal } from "@/components/portfolio/motion/MotionReveal";

type Package = {
  title: string;
  duration: string;
  description: string;
  includes: readonly string[];
};

type Track = {
  label: string;
  audience: string;
  promise: string;
  packages: readonly Package[];
};

type Props = {
  title: string;
  subtitle: string;
  note: string;
  cta: string;
  tracks: readonly Track[];
};

export function FreelanceOffers({ title, subtitle, note, cta, tracks }: Props) {
  const reduce = useReducedMotion();

  return (
    <section
      id="offers"
      className="border-b border-[var(--border-subtle)] px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24"
    >
      <div className="mx-auto max-w-7xl">
        <MotionReveal>
          <h2 className="max-w-3xl font-display text-pretty text-2xl font-medium tracking-tight text-[var(--text-primary)] sm:text-3xl md:text-4xl">
            {title}
          </h2>
          <p className="mt-4 max-w-3xl text-pretty text-base leading-relaxed text-[var(--text-secondary)] sm:text-lg">
            {subtitle}
          </p>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[var(--text-muted)]">
            {note}
          </p>
        </MotionReveal>

        <div className="mt-10 grid gap-6 sm:mt-14 lg:grid-cols-2 lg:gap-8">
          {tracks.map((track, trackIndex) => (
            <MotionReveal key={track.label} delay={trackIndex * 80}>
              <div className="flex h-full flex-col rounded-[16px] border border-[var(--border-subtle)] bg-[var(--bg-elevated)]/25 p-5 sm:p-7">
                <h3 className="text-lg font-semibold text-[var(--text-primary)]">
                  {track.label}
                </h3>
                <p className="mt-1 text-sm leading-relaxed text-[var(--text-secondary)]">
                  {track.audience}
                </p>
                <p className="mt-4 border-l-2 border-[var(--text-primary)]/30 pl-3 text-sm font-medium leading-relaxed text-[var(--text-primary)]">
                  {track.promise}
                </p>

                <ul className="mt-6 flex flex-1 flex-col gap-4">
                  {track.packages.map((pkg) => (
                    <motion.li
                      key={pkg.title}
                      whileHover={reduce ? undefined : { y: -2 }}
                      className="rounded-[12px] border border-[var(--border-subtle)] bg-[var(--bg-base)]/50 p-4 transition hover:border-[var(--border-hover)]"
                    >
                      <div className="flex flex-wrap items-baseline justify-between gap-2">
                        <h4 className="text-sm font-semibold text-[var(--text-primary)]">
                          {pkg.title}
                        </h4>
                        <span className="rounded-full border border-[var(--border-strong)] px-2.5 py-0.5 text-[11px] font-medium text-[var(--text-secondary)]">
                          {pkg.duration}
                        </span>
                      </div>
                      <p className="mt-2 text-sm leading-relaxed text-[var(--text-secondary)]">
                        {pkg.description}
                      </p>
                      <ul className="mt-3 space-y-1.5">
                        {pkg.includes.map((item) => (
                          <li
                            key={item}
                            className="flex gap-2 text-xs leading-relaxed text-[var(--text-muted)]"
                          >
                            <Check
                              className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[var(--accent-strong)]"
                              strokeWidth={2}
                              aria-hidden
                            />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </MotionReveal>
          ))}
        </div>

        <MotionReveal delay={220}>
          <div className="mt-10 flex justify-center">
            <Link
              href="/#contact"
              className="btn-primary inline-flex min-h-12 w-full items-center justify-center gap-2 px-8 py-3 text-sm sm:w-auto"
            >
              {cta}
              <ArrowUpRight className="h-4 w-4" aria-hidden />
            </Link>
          </div>
        </MotionReveal>
      </div>
    </section>
  );
}
