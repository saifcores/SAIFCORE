"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Quote } from "lucide-react";
import { MotionReveal } from "@/components/portfolio/motion/MotionReveal";

type Testimonial = {
  quote: string;
  name: string;
  role: string;
  company: string;
};

type Props = {
  title: string;
  subtitle: string;
  items: Testimonial[];
};

export function Testimonials({ title, subtitle, items }: Props) {
  const reduce = useReducedMotion();

  return (
    <section className="border-b border-[var(--border-subtle)] px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
      <div className="mx-auto max-w-[1280px]">
        <MotionReveal>
          <p className="mb-4 text-xs font-medium uppercase tracking-[0.18em] text-[var(--text-muted)]">
            {title}
          </p>
          <h2 className="max-w-2xl text-pretty text-2xl font-bold tracking-tight text-[var(--text-primary)] sm:text-3xl md:text-4xl">
            {subtitle}
          </h2>
        </MotionReveal>

        <div className="mt-10 grid gap-4 sm:mt-14 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
          {items.map((item, i) => (
            <MotionReveal key={item.company} delay={i * 90}>
              <motion.blockquote
                whileHover={reduce ? undefined : { y: -4 }}
                className="flex h-full flex-col rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-elevated)]/25 p-5 transition hover:border-[var(--border-hover)] sm:p-8"
              >
                <Quote
                  className="h-8 w-8 text-accent/40"
                  strokeWidth={1.2}
                  aria-hidden
                />
                <p className="mt-4 flex-1 text-sm leading-relaxed text-[var(--text-secondary)]">
                  &ldquo;{item.quote}&rdquo;
                </p>
                <footer className="mt-6 border-t border-[var(--border-subtle)] pt-5">
                  <p className="text-sm font-semibold text-[var(--text-primary)]">
                    {item.name}
                  </p>
                  <p className="mt-1 text-xs text-[var(--text-muted)]">
                    {item.role}
                  </p>
                  <p className="mt-0.5 text-xs font-medium text-accent/90">
                    {item.company}
                  </p>
                </footer>
              </motion.blockquote>
            </MotionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
