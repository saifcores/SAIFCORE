"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Gauge, Layers, Lock, Shield, Sparkles, Wrench } from "lucide-react";
import { MotionReveal } from "@/components/portfolio/motion/MotionReveal";

const ICONS = [Sparkles, Shield, Gauge, Lock, Wrench, Layers];

type Principle = { title: string; description: string };

type Props = {
  title: string;
  subtitle: string;
  items: Principle[];
};

export function EngineeringPrinciples({ title, subtitle, items }: Props) {
  const reduce = useReducedMotion();

  return (
    <section className="border-b border-[var(--border-subtle)] bg-[var(--bg-elevated)]/10 px-4 py-14 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
      <div className="mx-auto max-w-7xl">
        <MotionReveal>
          <p className="mb-4 text-xs font-medium uppercase tracking-[0.18em] text-[var(--text-muted)]">
            {title}
          </p>
          <h2 className="max-w-2xl font-display text-pretty text-2xl font-medium tracking-tight text-[var(--text-primary)] sm:text-3xl md:text-4xl">
            {subtitle}
          </h2>
        </MotionReveal>

        <div className="mt-8 grid gap-3 sm:mt-10 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
          {items.map((item, i) => {
            const Icon = ICONS[i % ICONS.length];
            return (
              <MotionReveal key={item.title} delay={i * 70}>
                <motion.article
                  whileHover={reduce ? undefined : { y: -4 }}
                  className="h-full rounded-[16px] border border-[var(--border-subtle)] bg-[var(--bg-elevated)]/20 p-5 transition hover:border-[var(--border-hover)] sm:p-6"
                >
                  <Icon
                    className="mb-4 h-5 w-5 text-[var(--text-primary)]"
                    strokeWidth={1.6}
                    aria-hidden
                  />
                  <h3 className="font-semibold text-[var(--text-primary)]">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-[var(--text-secondary)]">
                    {item.description}
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
