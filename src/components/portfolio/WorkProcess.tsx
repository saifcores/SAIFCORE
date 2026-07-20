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
      className="border-b border-[var(--border-subtle)] px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-24"
    >
      <div className="mx-auto max-w-[1280px]">
        <MotionReveal>
          <p className="mb-4 text-xs font-medium uppercase tracking-[0.18em] text-[var(--text-muted)]">
            {title}
          </p>
          <h2 className="max-w-2xl text-pretty text-2xl font-bold tracking-tight text-[var(--text-primary)] sm:text-3xl md:text-4xl">
            {subtitle}
          </h2>
        </MotionReveal>

        <div className="mt-10 sm:mt-16">
          <ol className="relative grid gap-0 md:grid-cols-2 lg:grid-cols-3">
            {steps.map((step, i) => {
              const stepId = String(i + 1).padStart(2, "0");
              return (
                <MotionReveal key={step.title} delay={i * 60}>
                  <motion.li
                    whileHover={reduce ? undefined : { y: -2 }}
                    className="relative flex gap-4 border-l border-[var(--border-subtle)] py-6 pl-6 sm:gap-5 sm:py-8 sm:pl-8 md:border-l-0 md:border-t md:pl-0 md:pt-10 md:first:pl-0"
                  >
                    <span className="absolute -left-3 top-6 flex h-6 w-6 items-center justify-center rounded-full border border-blue-500/30 bg-[var(--bg-base)] font-mono text-[10px] font-semibold text-accent sm:top-8 md:-top-3 md:left-0">
                      {stepId}
                    </span>
                    <div className="md:mt-4">
                      <h3 className="font-semibold text-[var(--text-primary)]">
                        {step.title}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-[var(--text-secondary)]">
                        {step.body}
                      </p>
                    </div>
                  </motion.li>
                </MotionReveal>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
