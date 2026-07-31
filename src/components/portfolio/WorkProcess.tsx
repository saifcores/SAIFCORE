"use client";

import { motion, useReducedMotion } from "framer-motion";
import { MotionReveal } from "@/components/portfolio/motion/MotionReveal";

type Step = { title: string; body: string };

type Props = {
  title: string;
  subtitle: string;
  steps: Step[];
};

export function WorkProcess({ title, subtitle, steps }: Props) {
  const reduce = useReducedMotion();

  return (
    <section
      id="process"
      className="border-b border-[var(--border-subtle)] px-4 py-10 sm:px-6 sm:py-12 lg:px-8 lg:py-16"
    >
      <div className="mx-auto max-w-[1280px]">
        <MotionReveal>
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.18em] text-[var(--text-muted)]">
            {title}
          </p>
          <h2 className="max-w-2xl text-pretty text-2xl font-bold tracking-tight text-[var(--text-primary)] sm:text-3xl">
            {subtitle}
          </h2>
        </MotionReveal>

        <ol className="mt-8 grid gap-3 sm:mt-10 sm:grid-cols-2 lg:grid-cols-3">
          {steps.map((step, i) => {
            const stepId = String(i + 1).padStart(2, "0");
            return (
              <MotionReveal key={step.title} delay={i * 40}>
                <motion.li
                  whileHover={reduce ? undefined : { y: -2 }}
                  className="flex h-full gap-3 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-elevated)]/15 p-4"
                >
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-blue-500/30 font-mono text-[10px] font-semibold text-accent">
                    {stepId}
                  </span>
                  <div className="min-w-0">
                    <h3 className="text-sm font-semibold text-[var(--text-primary)]">
                      {step.title}
                    </h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-[var(--text-secondary)]">
                      {step.body}
                    </p>
                  </div>
                </motion.li>
              </MotionReveal>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
