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
    <section className="border-b border-[var(--border-subtle)] px-4 py-10 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
      <div className="mx-auto max-w-[1280px]">
        <MotionReveal>
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.18em] text-[var(--text-muted)]">
            {title}
          </p>
          <h2 className="max-w-2xl text-pretty text-2xl font-bold tracking-tight text-[var(--text-primary)] sm:text-3xl">
            {subtitle}
          </h2>
        </MotionReveal>

        <div className="mt-8 grid gap-3 sm:mt-10 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item, i) => (
            <MotionReveal key={item.company} delay={i * 50}>
              <motion.blockquote
                whileHover={reduce ? undefined : { y: -2 }}
                className="flex h-full flex-col rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-elevated)]/20 p-4 transition hover:border-[var(--border-hover)] sm:p-5"
              >
                <Quote
                  className="h-5 w-5 text-accent/40"
                  strokeWidth={1.2}
                  aria-hidden
                />
                <p className="mt-3 flex-1 text-sm leading-relaxed text-[var(--text-secondary)]">
                  &ldquo;{item.quote}&rdquo;
                </p>
                <footer className="mt-4 border-t border-[var(--border-subtle)] pt-3">
                  <p className="text-sm font-semibold text-[var(--text-primary)]">
                    {item.name}
                  </p>
                  <p className="mt-0.5 text-xs text-[var(--text-muted)]">
                    {item.role}
                    <span className="text-accent/90"> · {item.company}</span>
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
