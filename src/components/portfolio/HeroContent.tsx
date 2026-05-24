"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Link } from "@/i18n/navigation";
import type { ReactNode } from "react";

type Props = {
  badge: string;
  titleLine1: string;
  titleLine2: string;
  titleLine3: string;
  subtitle: string;
  specializations: string[];
  availability: string;
  locationLine: string;
  jumpToContact: string;
  ctas: ReactNode;
};

export function HeroContent({
  badge,
  titleLine1,
  titleLine2,
  titleLine3,
  subtitle,
  specializations,
  availability,
  locationLine,
  jumpToContact,
  ctas,
}: Props) {
  const reduce = useReducedMotion();
  const ease = [0.22, 1, 0.36, 1] as const;

  return (
    <div>
      <motion.div
        initial={reduce ? false : { opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease }}
        className="mb-8 flex flex-wrap items-center gap-2 sm:mb-10 sm:gap-3"
      >
        <span className="inline-flex items-center gap-2.5 rounded-full border border-[var(--border-subtle)] bg-[var(--bg-elevated)]/60 px-3 py-1.5 text-[10px] font-medium tracking-[0.14em] uppercase text-[var(--text-muted)] backdrop-blur-sm sm:px-4 sm:py-2 sm:text-xs">
          <span
            className="h-1.5 w-1.5 rounded-full bg-gradient-to-r from-[var(--accent-blue)] to-[var(--accent-emerald)]"
            aria-hidden
          />
          {badge}
        </span>
        <span className="inline-flex items-center gap-2 rounded-full border border-emerald-500/25 bg-emerald-500/10 px-3 py-1.5 text-xs font-medium text-emerald-400">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
          {availability}
        </span>
      </motion.div>

      <motion.h1
        initial={reduce ? false : { opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.08, ease }}
        className="max-w-3xl font-bold tracking-tight text-[var(--text-primary)]"
      >
        <span className="block text-[1.75rem] leading-[1.08] min-[480px]:text-4xl sm:text-5xl md:text-[2.75rem] lg:text-[3.5rem] xl:text-[4rem]">
          {titleLine1}
        </span>
        <span className="block text-[1.75rem] leading-[1.08] min-[480px]:text-4xl sm:text-5xl md:text-[2.75rem] lg:text-[3.5rem] xl:text-[4rem]">
          {titleLine2}
        </span>
        <span className="text-gradient block text-[1.75rem] leading-[1.08] min-[480px]:text-4xl sm:text-5xl md:text-[2.75rem] lg:text-[3.5rem] xl:text-[4rem]">
          {titleLine3}
        </span>
      </motion.h1>

      <motion.p
        initial={reduce ? false : { opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, delay: 0.16, ease }}
        className="mt-6 max-w-xl text-base leading-relaxed text-[var(--text-secondary)] sm:mt-8 sm:text-lg md:text-xl"
      >
        {subtitle}
      </motion.p>

      <motion.div
        initial={reduce ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.22 }}
        className="mt-5 flex flex-wrap gap-2"
      >
        {specializations.map((spec) => (
          <span
            key={spec}
            className="rounded-full border border-[var(--border-subtle)] bg-[var(--bg-elevated)]/40 px-3.5 py-1.5 text-xs font-medium text-[var(--text-secondary)]"
          >
            {spec}
          </span>
        ))}
      </motion.div>

      <motion.div
        initial={reduce ? false : { opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.28, ease }}
        className="mt-8 flex flex-col gap-3 sm:mt-12 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4"
      >
        {ctas}
      </motion.div>

      <motion.p
        initial={reduce ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.34 }}
        className="mt-8 text-sm text-[var(--text-muted)]"
      >
        {locationLine}
        {" · "}
        <Link
          href="/#contact"
          className="font-medium text-[var(--text-secondary)] underline decoration-white/20 underline-offset-4 transition hover:text-[var(--text-primary)] hover:decoration-white/40"
        >
          {jumpToContact}
        </Link>
      </motion.p>
    </div>
  );
}
