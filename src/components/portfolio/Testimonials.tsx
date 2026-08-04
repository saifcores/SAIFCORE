"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Quote } from "lucide-react";
import { Link } from "@/i18n/navigation";
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
  cta: string;
  items: Testimonial[];
};

export function Testimonials({ title, subtitle, cta, items }: Props) {
  const reduce = useReducedMotion();

  return (
    <section className="border-b border-[var(--border-subtle)] px-4 py-10 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
      <div className="mx-auto max-w-[1280px]">
        <MotionReveal>
          <h2 className="max-w-2xl text-pretty text-2xl font-bold tracking-tight text-[var(--text-primary)] sm:text-3xl">
            {title}
          </h2>
          <p className="mt-3 max-w-2xl text-pretty text-base leading-relaxed text-[var(--text-secondary)] sm:text-lg">
            {subtitle}
          </p>
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

        <MotionReveal delay={200}>
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
