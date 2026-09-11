"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
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
    <section className="border-b border-[var(--border-subtle)] px-4 py-14 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
      <div className="mx-auto max-w-7xl">
        <MotionReveal>
          <h2 className="max-w-2xl font-display text-pretty text-2xl font-medium tracking-tight text-[var(--text-primary)] sm:text-3xl">
            {title}
          </h2>
          <p className="mt-3 max-w-2xl text-pretty text-base leading-relaxed text-[var(--text-secondary)] sm:text-lg">
            {subtitle}
          </p>
        </MotionReveal>

        <div className="mt-8 grid gap-3 sm:mt-10 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item, i) => (
            <MotionReveal key={item.company} delay={i * 50}>
              <motion.article
                whileHover={reduce ? undefined : { y: -2 }}
                className="flex h-full flex-col rounded-[16px] border border-[var(--border-subtle)] bg-[var(--bg-elevated)]/20 p-4 transition hover:border-[var(--border-hover)] sm:p-5"
              >
                <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--text-muted)]">
                  {item.name}
                </p>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-[var(--text-secondary)]">
                  {item.quote}
                </p>
                <p className="mt-4 border-t border-[var(--border-subtle)] pt-3 text-xs text-[var(--text-muted)]">
                  {item.role}
                  <span className="text-[var(--text-secondary)]">
                    {" "}
                    · {item.company}
                  </span>
                </p>
              </motion.article>
            </MotionReveal>
          ))}
        </div>

        <MotionReveal delay={200}>
          <div className="mt-8 flex justify-center">
            <Link
              href="/#offers"
              className="inline-flex min-h-11 items-center justify-center gap-2 text-sm font-medium text-[var(--text-primary)] underline-offset-4 transition hover:underline"
            >
              {cta}
              <ArrowUpRight className="h-4 w-4" aria-hidden />
            </Link>
          </div>
        </MotionReveal>
      </div>
    </section>
  );
}
