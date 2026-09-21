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
  referenceCta: string;
  linkedinCta: string;
  namedLabel: string;
  anonymizedLabel: string;
  emptyNamedTitle: string;
  emptyNamedBody: string;
  emptyNamedPrimary: string;
  emptyNamedSecondary: string;
  namedItems: readonly Testimonial[];
  items: readonly Testimonial[];
  linkedinUrl: string | null;
};

function QuoteCard({
  item,
  label,
  delay,
  reduce,
  emphasized,
}: {
  item: Testimonial;
  label: string;
  delay: number;
  reduce: boolean | null;
  emphasized?: boolean;
}) {
  return (
    <MotionReveal delay={delay}>
      <motion.article
        whileHover={reduce ? undefined : { y: -2 }}
        className={`flex h-full flex-col border-l-2 py-1 pl-4 transition sm:pl-5 ${
          emphasized
            ? "border-[var(--accent-strong)]"
            : "border-[var(--border-strong)]"
        }`}
      >
        <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--text-muted)]">
          {label}
        </p>
        <p className="mt-3 flex-1 text-sm leading-relaxed text-[var(--text-secondary)] sm:text-[0.9375rem]">
          “{item.quote}”
        </p>
        <p className="mt-4 text-sm font-semibold text-[var(--text-primary)]">
          {item.name}
        </p>
        <p className="mt-0.5 text-xs text-[var(--text-muted)]">
          {item.role}
          <span className="text-[var(--text-secondary)]">
            {" "}
            · {item.company}
          </span>
        </p>
      </motion.article>
    </MotionReveal>
  );
}

export function Testimonials({
  title,
  subtitle,
  cta,
  referenceCta,
  linkedinCta,
  namedLabel,
  anonymizedLabel,
  emptyNamedTitle,
  emptyNamedBody,
  emptyNamedPrimary,
  emptyNamedSecondary,
  namedItems,
  items,
  linkedinUrl,
}: Props) {
  const reduce = useReducedMotion();
  const hasNamed = namedItems.length > 0;

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

        {!hasNamed ? (
          <MotionReveal delay={40}>
            <div className="mt-8 overflow-hidden rounded-[16px] border border-[var(--border-subtle)] bg-[linear-gradient(135deg,var(--glow-primary),transparent_55%),var(--bg-elevated)]/35 p-5 sm:mt-10 sm:p-7 lg:p-8">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--text-muted)]">
                {emptyNamedTitle}
              </p>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[var(--text-secondary)] sm:text-base">
                {emptyNamedBody}
              </p>
              <div className="mt-5 flex flex-col gap-2 min-[480px]:flex-row min-[480px]:flex-wrap">
                {linkedinUrl ? (
                  <a
                    href={linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary inline-flex min-h-11 items-center justify-center gap-2 px-5 text-sm"
                  >
                    {emptyNamedPrimary}
                    <ArrowUpRight className="h-4 w-4" aria-hidden />
                  </a>
                ) : null}
                <Link
                  href="/#contact"
                  className="btn-outline inline-flex min-h-11 items-center justify-center gap-2 px-5 text-sm font-medium"
                >
                  {emptyNamedSecondary}
                  <ArrowUpRight className="h-4 w-4" aria-hidden />
                </Link>
              </div>
            </div>
          </MotionReveal>
        ) : (
          <div className="mt-8 grid gap-6 sm:mt-10 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
            {namedItems.map((item, i) => (
              <QuoteCard
                key={`named-${item.name}-${item.company}`}
                item={item}
                label={namedLabel}
                delay={i * 50}
                reduce={reduce}
                emphasized
              />
            ))}
          </div>
        )}

        <div
          className={`grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8 ${
            hasNamed ? "mt-6" : "mt-8 sm:mt-10"
          }`}
        >
          {items.map((item, i) => (
            <QuoteCard
              key={`anon-${item.name}-${item.company}`}
              item={item}
              label={anonymizedLabel}
              delay={(hasNamed ? namedItems.length : 0) * 50 + i * 50}
              reduce={reduce}
            />
          ))}
        </div>

        <MotionReveal delay={200}>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row sm:flex-wrap sm:gap-6">
            <Link
              href="/#offers"
              className="inline-flex min-h-11 items-center justify-center gap-2 text-sm font-medium text-[var(--text-primary)] underline-offset-4 transition hover:underline"
            >
              {cta}
              <ArrowUpRight className="h-4 w-4" aria-hidden />
            </Link>
            <Link
              href="/#contact"
              className="inline-flex min-h-11 items-center justify-center gap-2 text-sm font-medium text-[var(--text-secondary)] underline-offset-4 transition hover:text-[var(--text-primary)] hover:underline"
            >
              {referenceCta}
              <ArrowUpRight className="h-4 w-4" aria-hidden />
            </Link>
            {linkedinUrl && hasNamed ? (
              <a
                href={linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center justify-center gap-2 text-sm font-medium text-[var(--text-secondary)] underline-offset-4 transition hover:text-[var(--text-primary)] hover:underline"
              >
                {linkedinCta}
                <ArrowUpRight className="h-4 w-4" aria-hidden />
              </a>
            ) : null}
          </div>
        </MotionReveal>
      </div>
    </section>
  );
}
