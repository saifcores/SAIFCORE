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
        className="mb-10 flex flex-wrap items-center gap-3"
      >
        <span className="inline-flex items-center gap-2.5 rounded-full border border-[var(--border-subtle)] bg-[var(--bg-elevated)]/60 px-4 py-2 text-xs font-medium tracking-[0.14em] uppercase text-[var(--text-muted)] backdrop-blur-sm">
          <span
            className="h-1.5 w-1.5 rounded-full bg-gradient-to-r from-[#2563EB] to-[#10B981]"
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
        <span className="block text-5xl leading-[1.06] sm:text-6xl lg:text-[3.5rem] xl:text-[4rem]">
          {titleLine1}
        </span>
        <span className="block text-5xl leading-[1.06] sm:text-6xl lg:text-[3.5rem] xl:text-[4rem]">
          {titleLine2}
        </span>
        <span className="text-gradient block text-5xl leading-[1.06] sm:text-6xl lg:text-[3.5rem] xl:text-[4rem]">
          {titleLine3}
        </span>
      </motion.h1>

      <motion.p
        initial={reduce ? false : { opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, delay: 0.16, ease }}
        className="mt-8 max-w-xl text-lg leading-relaxed text-[var(--text-secondary)] sm:text-xl"
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
        className="mt-12 flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center"
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
