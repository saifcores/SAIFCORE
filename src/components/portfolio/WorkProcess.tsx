"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { BookCallLink } from "./BookCallLink";
import { MotionReveal } from "@/components/portfolio/motion/MotionReveal";

type Step = { title: string; body: string };

type Props = {
  title: string;
  subtitle: string;
  cta: string;
  steps: Step[];
};

export function WorkProcess({ title, subtitle, cta, steps }: Props) {
  const reduce = useReducedMotion();

  return (
    <section
      id="process"
      className="border-b border-[var(--border-subtle)] px-4 py-14 sm:px-6 sm:py-16 lg:px-8 lg:py-20"
    >
      <div className="mx-auto max-w-7xl">
        <MotionReveal>
          <h2 className="max-w-2xl font-display text-pretty text-2xl font-medium tracking-tight text-[var(--text-primary)] sm:text-3xl">
            {title}
          </h2>
          <p className="mt-3 max-w-2xl text-pretty text-base leading-relaxed text-[var(--text-secondary)] sm:text-lg">
            {subtitle}
          </p>
        </MotionReveal>

        <ol className="mt-10 grid list-none gap-0 border-t border-[var(--border-subtle)] p-0 sm:grid-cols-2 lg:grid-cols-3">
          {steps.map((step, i) => {
            const stepId = String(i + 1).padStart(2, "0");
            return (
              <MotionReveal key={step.title} delay={i * 40}>
                <motion.li
                  whileHover={reduce ? undefined : { y: -2 }}
                  className="flex h-full gap-4 border-b border-[var(--border-subtle)] py-6 sm:pr-6 lg:border-r lg:[&:nth-child(3n)]:border-r-0"
                >
                  <span className="font-display text-sm font-medium text-[var(--text-muted)]">
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

        <MotionReveal delay={280}>
          <div className="mt-10 flex justify-center">
            <BookCallLink className="inline-flex min-h-11 items-center justify-center gap-2 text-sm font-medium text-[var(--text-primary)] underline decoration-[var(--border-subtle)] underline-offset-4 transition hover:decoration-[var(--border-hover)]">
              {cta}
              <ArrowUpRight className="h-4 w-4" aria-hidden />
            </BookCallLink>
          </div>
        </MotionReveal>
      </div>
    </section>
  );
}
