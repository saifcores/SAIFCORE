"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Building2, Check, Users } from "lucide-react";
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

const TRACK_ICONS = [Users, Building2] as const;

export function FreelanceOffers({ title, subtitle, note, cta, tracks }: Props) {
  const reduce = useReducedMotion();

  return (
    <section
      id="offers"
      className="border-b border-[var(--border-subtle)] px-4 py-12 sm:px-6 sm:py-14 lg:px-8 lg:py-20"
    >
      <div className="mx-auto max-w-[1280px]">
        <MotionReveal>
          <p className="mb-4 text-xs font-medium uppercase tracking-[0.18em] text-[var(--text-muted)]">
            {title}
          </p>
          <h2 className="max-w-3xl text-pretty text-2xl font-bold tracking-tight text-[var(--text-primary)] sm:text-3xl md:text-4xl">
            {subtitle}
          </h2>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-[var(--text-secondary)]">
            {note}
          </p>
        </MotionReveal>

        <div className="mt-10 grid gap-6 sm:mt-14 lg:grid-cols-2 lg:gap-8">
          {tracks.map((track, trackIndex) => {
            const Icon = TRACK_ICONS[trackIndex % TRACK_ICONS.length];
            return (
              <MotionReveal key={track.label} delay={trackIndex * 80}>
                <div className="flex h-full flex-col rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-elevated)]/20 p-5 sm:p-7">
                  <div className="flex items-start gap-3">
                    <div className="inline-flex rounded-xl border border-blue-500/20 bg-gradient-to-br from-blue-500/12 to-emerald-500/8 p-2.5 text-accent">
                      <Icon className="h-5 w-5" strokeWidth={1.6} aria-hidden />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-[var(--text-primary)]">
                        {track.label}
                      </h3>
                      <p className="mt-1 text-sm leading-relaxed text-[var(--text-secondary)]">
                        {track.audience}
                      </p>
                    </div>
                  </div>
                  <p className="mt-4 border-l-2 border-accent/40 pl-3 text-sm font-medium leading-relaxed text-[var(--text-primary)]">
                    {track.promise}
                  </p>

                  <ul className="mt-6 flex flex-1 flex-col gap-4">
                    {track.packages.map((pkg) => (
                      <motion.li
                        key={pkg.title}
                        whileHover={reduce ? undefined : { y: -2 }}
                        className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-base)]/40 p-4 transition hover:border-[var(--border-hover)]"
                      >
                        <div className="flex flex-wrap items-baseline justify-between gap-2">
                          <h4 className="text-sm font-semibold text-[var(--text-primary)]">
                            {pkg.title}
                          </h4>
                          <span className="rounded-full border border-blue-500/25 bg-blue-500/10 px-2.5 py-0.5 text-[11px] font-medium text-accent">
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
                                className="mt-0.5 h-3.5 w-3.5 shrink-0 text-accent"
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
            );
          })}
        </div>

        <MotionReveal delay={220}>
          <div className="mt-10 flex justify-center">
            <Link
              href="/#contact"
              className="btn-primary inline-flex min-h-12 w-full items-center justify-center gap-2 px-6 py-3 text-sm sm:w-auto sm:px-8"
            >
              {cta}
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </div>
        </MotionReveal>
      </div>
    </section>
  );
}
