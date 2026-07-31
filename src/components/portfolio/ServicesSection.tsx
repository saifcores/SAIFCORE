"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  ClipboardCheck,
  FileSearch,
  Landmark,
  Layers,
  Rocket,
  Smartphone,
} from "lucide-react";
import { Link } from "@/i18n/navigation";
import { MotionReveal } from "@/components/portfolio/motion/MotionReveal";

const ICONS = [
  Smartphone,
  Layers,
  Rocket,
  ClipboardCheck,
  Landmark,
  FileSearch,
];

type ServiceItem = { title: string; description: string };

type Props = {
  title: string;
  audience: string;
  subtitle: string;
  cta: string;
  items: ServiceItem[];
};

export function ServicesSection({
  title,
  audience,
  subtitle,
  cta,
  items,
}: Props) {
  const reduce = useReducedMotion();

  return (
    <section
      id="services"
      className="border-b border-[var(--border-subtle)] bg-[var(--bg-elevated)]/10 px-4 py-12 sm:px-6 sm:py-14 lg:px-8 lg:py-20"
    >
      <div className="mx-auto max-w-[1280px]">
        <MotionReveal>
          <p className="mb-4 text-xs font-medium uppercase tracking-[0.18em] text-[var(--text-muted)]">
            {title}
          </p>
          <span className="inline-flex max-w-full rounded-full border border-blue-500/25 bg-blue-500/10 px-3 py-1 text-[11px] font-medium text-accent sm:px-3.5 sm:text-xs">
            {audience}
          </span>
          <h2 className="mt-3 max-w-2xl text-pretty text-2xl font-bold tracking-tight text-[var(--text-primary)] sm:mt-4 sm:text-3xl md:text-4xl">
            {subtitle}
          </h2>
        </MotionReveal>

        <div className="mt-8 grid gap-3 sm:mt-10 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item, i) => {
            const Icon = ICONS[i % ICONS.length];
            return (
              <MotionReveal key={item.title} delay={i * 40}>
                <motion.article
                  whileHover={reduce ? undefined : { y: -2 }}
                  className="flex h-full gap-3 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-elevated)]/25 p-4 transition hover:border-[var(--border-hover)]"
                >
                  <div className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-blue-500/20 bg-gradient-to-br from-blue-500/12 to-emerald-500/8 text-accent">
                    <Icon className="h-4 w-4" strokeWidth={1.6} aria-hidden />
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-sm font-semibold text-[var(--text-primary)]">
                      {item.title}
                    </h3>
                    <p className="mt-1 text-xs leading-relaxed text-[var(--text-secondary)]">
                      {item.description}
                    </p>
                  </div>
                </motion.article>
              </MotionReveal>
            );
          })}
        </div>

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
