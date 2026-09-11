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

const ICONS = [Layers, Network, Globe, CreditCard, Cloud, Smartphone] as const;

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
      className="border-b border-[var(--border-subtle)] px-4 py-14 sm:px-6 sm:py-16 lg:px-8 lg:py-20"
    >
      <div className="mx-auto max-w-7xl">
        <MotionReveal>
          <p className="mb-4 text-xs font-medium uppercase tracking-[0.18em] text-[var(--text-muted)]">
            {title}
          </p>
          <h2 className="max-w-2xl font-display text-pretty text-2xl font-medium tracking-tight text-[var(--text-primary)] sm:text-3xl md:text-4xl">
            {subtitle}
          </h2>
        </MotionReveal>

        <div className="mt-10 grid gap-4 sm:mt-14 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
          {items.map((item, i) => {
            const Icon = ICONS[i % ICONS.length];
            return (
              <MotionReveal key={item.title} delay={i * 70}>
                <motion.article
                  whileHover={reduce ? undefined : { y: -4 }}
                  transition={{ type: "spring", stiffness: 380, damping: 28 }}
                  className="group h-full rounded-[16px] border border-[var(--border-subtle)] bg-[var(--bg-elevated)]/25 p-5 transition-colors hover:border-[var(--border-hover)] sm:p-6"
                >
                  <div className="mb-3 inline-flex rounded-[10px] border border-[var(--border-subtle)] bg-[var(--bg-base)] p-2 text-[var(--text-primary)]">
                    <Icon className="h-5 w-5" strokeWidth={1.6} aria-hidden />
                  </div>
                  <h3 className="text-base font-semibold text-[var(--text-primary)]">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-[var(--text-secondary)]">
                    {item.description}
                  </p>
                  <div className="mt-4 border-t border-[var(--border-subtle)] pt-3">
                    <p className="sr-only">{techLabel}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {item.technologies.slice(0, 5).map((tech) => (
                        <span
                          key={tech}
                          className="rounded-full border border-[var(--border-subtle)] bg-[var(--bg-base)]/60 px-2.5 py-0.5 text-[11px] text-[var(--text-muted)]"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                  <p className="mt-3 text-xs leading-relaxed text-[var(--text-muted)]">
                    <span className="sr-only">{conceptsLabel}: </span>
                    {item.concepts.slice(0, 3).join(" · ")}
                  </p>
                </motion.article>
              </MotionReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
