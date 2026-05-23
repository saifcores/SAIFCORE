"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  Cloud,
  CreditCard,
  Globe,
  Layers,
  Network,
  Smartphone,
} from "lucide-react";
import { MotionReveal } from "@/components/portfolio/motion/MotionReveal";

const ICONS = [CreditCard, Layers, Network, Globe, Cloud, Smartphone] as const;

const ACCENTS = [
  "from-blue-500/15 to-blue-500/5 border-blue-500/20 text-blue-400",
  "from-indigo-500/15 to-indigo-500/5 border-indigo-500/20 text-indigo-400",
  "from-violet-500/15 to-violet-500/5 border-violet-500/20 text-violet-400",
  "from-amber-500/15 to-amber-500/5 border-amber-500/20 text-amber-400",
  "from-cyan-500/15 to-cyan-500/5 border-cyan-500/20 text-cyan-400",
  "from-emerald-500/15 to-emerald-500/5 border-emerald-500/20 text-emerald-400",
];

export type ExpertiseItem = {
  title: string;
  description: string;
  technologies: string[];
  concepts: string[];
};

type Props = {
  title: string;
  subtitle: string;
  techLabel: string;
  conceptsLabel: string;
  items: ExpertiseItem[];
};

export function TrustedExpertise({
  title,
  subtitle,
  techLabel,
  conceptsLabel,
  items,
}: Props) {
  const reduce = useReducedMotion();

  return (
    <section
      id="expertise"
      className="border-b border-[var(--border-subtle)] px-4 py-24 sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-[1280px]">
        <MotionReveal>
          <p className="mb-4 text-xs font-medium uppercase tracking-[0.18em] text-[var(--text-muted)]">
            {title}
          </p>
          <h2 className="max-w-2xl text-3xl font-bold tracking-tight text-[var(--text-primary)] sm:text-4xl">
            {subtitle}
          </h2>
        </MotionReveal>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item, i) => {
            const Icon = ICONS[i % ICONS.length];
            const accent = ACCENTS[i % ACCENTS.length];
            return (
              <MotionReveal key={item.title} delay={i * 70}>
                <motion.article
                  whileHover={reduce ? undefined : { y: -6 }}
                  transition={{ type: "spring", stiffness: 380, damping: 28 }}
                  className={`group h-full rounded-2xl border bg-gradient-to-br ${accent} p-6`}
                >
                  <div className="mb-5 inline-flex rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-base)]/50 p-2.5">
                    <Icon className="h-5 w-5" strokeWidth={1.6} aria-hidden />
                  </div>
                  <h3 className="text-base font-semibold text-[var(--text-primary)]">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-[var(--text-secondary)]">
                    {item.description}
                  </p>
                  <div className="mt-5 border-t border-[var(--border-subtle)] pt-4">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--text-muted)]">
                      {techLabel}
                    </p>
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {item.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="rounded-md border border-[var(--border-subtle)] bg-[var(--bg-base)]/60 px-2 py-0.5 text-[11px] text-[var(--text-muted)]"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="mt-4">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--text-muted)]">
                      {conceptsLabel}
                    </p>
                    <ul className="mt-2 space-y-1 text-xs text-[var(--text-secondary)]">
                      {item.concepts.map((c) => (
                        <li key={c} className="flex gap-2">
                          <span className="text-emerald-400" aria-hidden>
                            ·
                          </span>
                          {c}
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.article>
              </MotionReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
