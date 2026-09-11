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
  proofLine: string;
  availability: string;
  locationLine: string;
  jumpToContact: string;
  seePackages: string;
  ctas: ReactNode;
};

export function HeroContent({
  badge,
  titleLine1,
  titleLine2,
  titleLine3,
  subtitle,
  proofLine,
  availability,
  locationLine,
  jumpToContact,
  seePackages,
  ctas,
}: Props) {
  const reduce = useReducedMotion();
  const ease = [0.22, 1, 0.36, 1] as const;

  return (
    <div className="relative z-10">
      <motion.div
        initial={reduce ? false : { opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease }}
        className="mb-6 inline-flex items-center gap-2 rounded-full border border-[var(--border-strong)] bg-[var(--bg-elevated)] px-3 py-1.5"
      >
        <span className="relative flex h-2 w-2" aria-hidden>
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--accent-strong)] opacity-60" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--accent-strong)]" />
        </span>
        <span className="text-xs font-medium text-[var(--text-primary)]">
          {availability}
        </span>
      </motion.div>

      <motion.p
        initial={reduce ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.05 }}
        className="mb-4 text-xs font-medium uppercase tracking-[0.16em] text-[var(--text-muted)]"
      >
        {badge}
      </motion.p>

      <motion.h1
        initial={reduce ? false : { opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, delay: 0.08, ease }}
        className="max-w-2xl font-display text-display-md text-[var(--text-primary)]"
      >
        <span className="block">{titleLine1}</span>
        <span className="block">{titleLine2}</span>
        <span className="block text-accent-strong">{titleLine3}</span>
      </motion.h1>

      <motion.p
        initial={reduce ? false : { opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.16, ease }}
        className="mt-6 max-w-xl text-pretty text-base leading-relaxed text-[var(--text-secondary)] sm:text-lg"
      >
        {subtitle}
      </motion.p>

      <motion.p
        initial={reduce ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.45, delay: 0.22 }}
        className="mt-4 max-w-xl text-pretty text-sm leading-relaxed text-[var(--text-muted)]"
      >
        {proofLine}
      </motion.p>

      <motion.div
        initial={reduce ? false : { opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: 0.28, ease }}
        className="mt-8 flex w-full flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center"
      >
        {ctas}
      </motion.div>

      <motion.div
        initial={reduce ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.45, delay: 0.34 }}
        className="mt-6 flex flex-col gap-3 text-sm text-[var(--text-muted)]"
      >
        <p className="text-pretty leading-relaxed">{locationLine}</p>
        <p className="flex flex-wrap items-center gap-x-4 gap-y-2">
          <Link
            href="/#paths"
            className="inline-flex min-h-11 items-center font-medium text-[var(--text-secondary)] underline decoration-[var(--border-subtle)] underline-offset-4 transition hover:text-[var(--text-primary)] hover:decoration-[var(--border-hover)] sm:min-h-0"
          >
            {jumpToContact}
          </Link>
          <span className="hidden text-[var(--border-strong)] sm:inline" aria-hidden>
            ·
          </span>
          <Link
            href="/#offers"
            className="inline-flex min-h-11 items-center font-medium text-[var(--text-secondary)] underline decoration-[var(--border-subtle)] underline-offset-4 transition hover:text-[var(--text-primary)] hover:decoration-[var(--border-hover)] sm:min-h-0"
          >
            {seePackages}
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
