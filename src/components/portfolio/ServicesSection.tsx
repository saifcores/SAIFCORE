"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  Cloud,
  Code2,
  Landmark,
  MessageSquare,
  Smartphone,
  Wallet,
} from "lucide-react";
import { Link } from "@/i18n/navigation";
import { MotionReveal } from "@/components/portfolio/motion/MotionReveal";

const ICONS = [Wallet, Landmark, Code2, Cloud, MessageSquare, Smartphone];

type ServiceItem = { title: string; description: string };

type Props = {
  title: string;
  subtitle: string;
  cta: string;
  items: ServiceItem[];
};

export function ServicesSection({ title, subtitle, cta, items }: Props) {
  const reduce = useReducedMotion();

  return (
    <section
      id="services"
      className="border-b border-[var(--border-subtle)] bg-[var(--bg-elevated)]/10 px-4 py-16 sm:py-20 lg:py-24 sm:px-6 lg:px-8"
    >
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
          {items.map((item, i) => {
            const Icon = ICONS[i % ICONS.length];
            return (
              <MotionReveal key={item.title} delay={i * 60}>
                <motion.article
                  whileHover={reduce ? undefined : { y: -4 }}
                  className="group flex h-full flex-col rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-elevated)]/25 p-6 transition hover:border-[var(--border-hover)] hover:bg-[var(--bg-elevated)]/45"
                >
                  <div className="mb-4 inline-flex rounded-xl border border-blue-500/20 bg-gradient-to-br from-blue-500/12 to-emerald-500/8 p-2.5 text-accent">
                    <Icon className="h-5 w-5" strokeWidth={1.6} aria-hidden />
                  </div>
                  <h3 className="text-base font-semibold text-[var(--text-primary)]">
                    {item.title}
                  </h3>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-[var(--text-secondary)]">
                    {item.description}
                  </p>
                </motion.article>
              </MotionReveal>
            );
          })}
        </div>

        <MotionReveal delay={360}>
          <div className="mt-10 flex justify-center">
            <Link
              href="/#contact"
              className="btn-primary inline-flex items-center gap-2 px-8 py-3 text-sm"
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
