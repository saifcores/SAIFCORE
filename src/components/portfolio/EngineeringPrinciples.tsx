"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Gauge, Layers, Lock, RefreshCw, Shield, Wrench } from "lucide-react";
import { MotionReveal } from "@/components/portfolio/motion/MotionReveal";

const ICONS = [RefreshCw, Shield, Lock, Wrench, Gauge, Layers];

type Principle = { title: string; description: string };

type Props = {
  title: string;
  subtitle: string;
  items: Principle[];
};

export function EngineeringPrinciples({ title, subtitle, items }: Props) {
  const reduce = useReducedMotion();

  return (
    <section className="border-b border-[var(--border-subtle)] bg-[var(--bg-elevated)]/10 px-4 py-10 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
      <div className="mx-auto max-w-[1280px]">
        <MotionReveal>
          <p className="mb-4 text-xs font-medium uppercase tracking-[0.18em] text-[var(--text-muted)]">
            {title}
          </p>
          <h2 className="max-w-2xl text-pretty text-2xl font-bold tracking-tight text-[var(--text-primary)] sm:text-3xl md:text-4xl">
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
                  className="h-full rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-elevated)]/20 p-5 transition hover:border-[var(--border-hover)] sm:p-6"
                >
                  <Icon
                    className="mb-4 h-5 w-5 text-emerald-400"
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
