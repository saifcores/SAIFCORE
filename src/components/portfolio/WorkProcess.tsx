"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
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
      className="border-b border-[var(--border-subtle)] px-4 py-10 sm:px-6 sm:py-12 lg:px-8 lg:py-16"
    >
      <div className="mx-auto max-w-[1280px]">
        <MotionReveal>
          <h2 className="max-w-2xl text-pretty text-2xl font-bold tracking-tight text-[var(--text-primary)] sm:text-3xl">
            {title}
          </h2>
          <p className="mt-3 max-w-2xl text-pretty text-base leading-relaxed text-[var(--text-secondary)] sm:text-lg">
            {subtitle}
          </p>
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

        <MotionReveal delay={280}>
          <div className="mt-8 flex justify-center">
            <Link
              href="/#offers"
              className="inline-flex min-h-11 items-center justify-center gap-2 text-sm font-semibold text-accent transition hover:text-[var(--accent-blue-light)]"
            >
              {cta}
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </div>
        </MotionReveal>
      </div>
    </section>
  );
}
