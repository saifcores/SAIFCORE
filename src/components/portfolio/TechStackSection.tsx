"use client";

import { motion, useReducedMotion } from "framer-motion";
import { MotionReveal } from "@/components/portfolio/motion/MotionReveal";

type Category = { label: string; items: string[] };

type Props = {
  title: string;
  subtitle: string;
  categories: Category[];
};

export function TechStackSection({ title, subtitle, categories }: Props) {
  const reduce = useReducedMotion();

  return (
    <section className="border-b border-[var(--border-subtle)] px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-[1280px]">
        <MotionReveal>
          <p className="mb-4 text-xs font-medium uppercase tracking-[0.18em] text-[var(--text-muted)]">
            {title}
          </p>
          <h2 className="max-w-2xl text-3xl font-bold tracking-tight text-[var(--text-primary)] sm:text-4xl">
            {subtitle}
          </h2>
        </MotionReveal>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((cat, ci) => (
            <MotionReveal key={cat.label} delay={ci * 80}>
              <motion.div
                initial={reduce ? false : { opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="glass h-full rounded-2xl p-6"
              >
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-blue-400">
                  {cat.label}
                </p>
                <motion.div
                  className="mt-4 flex flex-wrap gap-2"
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true }}
                  variants={{
                    hidden: {},
                    show: { transition: { staggerChildren: 0.04 } },
                  }}
                >
                  {cat.items.map((tech) => (
                    <motion.span
                      key={tech}
                      variants={{
                        hidden: reduce ? {} : { opacity: 0, scale: 0.92 },
                        show: { opacity: 1, scale: 1 },
                      }}
                      whileHover={reduce ? undefined : { scale: 1.04 }}
                      className="rounded-full border border-[var(--border-subtle)] bg-[var(--bg-base)]/60 px-3 py-1.5 text-xs font-medium text-[var(--text-secondary)] transition hover:border-blue-500/30 hover:text-[var(--text-primary)]"
                    >
                      {tech}
                    </motion.span>
                  ))}
                </motion.div>
              </motion.div>
            </MotionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
