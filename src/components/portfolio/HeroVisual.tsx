"use client";

import { motion, useReducedMotion } from "framer-motion";

type Props = {
  nodes: string[];
  hubLabel?: string;
};

/** Angles in degrees — top, then clockwise. */
const NODE_ANGLES = [-90, -18, 54, 126, 198] as const;
/** Distance from center to node center, as % of container. */
const ORBIT_RADIUS = 36;

export function HeroVisual({ nodes, hubLabel = "SAIFCORE" }: Props) {
  const reduce = useReducedMotion();
  const labels = nodes.slice(0, 5);

  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="relative mx-auto flex w-full items-center justify-center"
      aria-hidden
    >
      <div className="relative mx-auto aspect-square w-full max-w-[420px] lg:max-w-[480px]">
        <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-full">
          <div
            className="absolute inset-0 opacity-30 sm:opacity-40"
            style={{
              backgroundImage:
                "radial-gradient(circle, color-mix(in srgb, var(--text-muted) 35%, transparent) 1px, transparent 1px)",
              backgroundSize: "18px 18px",
            }}
          />
          <div className="absolute inset-[14%] rounded-full border border-dashed border-[var(--border-subtle)]" />
          <div className="absolute inset-[26%] rounded-full border border-dashed border-[var(--border-subtle)] opacity-70" />
        </div>

        <svg
          className="absolute inset-0 h-full w-full"
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {labels.map((_, i) => {
            const angle = ((NODE_ANGLES[i] ?? -90) * Math.PI) / 180;
            const x2 = 50 + Math.cos(angle) * 26;
            const y2 = 50 + Math.sin(angle) * 26;
            return (
              <motion.line
                key={`spoke-${i}`}
                x1="50"
                y1="50"
                x2={x2}
                y2={y2}
                stroke="var(--accent-strong)"
                strokeWidth="0.35"
                initial={reduce ? false : { pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 0.55 }}
                transition={{ delay: 0.35 + i * 0.05, duration: 0.45 }}
              />
            );
          })}
        </svg>

        <motion.div
          initial={reduce ? false : { opacity: 0, scale: 0.88 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.25, duration: 0.45 }}
          className="absolute left-1/2 top-1/2 z-10 flex h-[28%] w-[28%] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[var(--text-primary)] shadow-[var(--shadow-panel)] sm:h-[30%] sm:w-[30%]"
        >
          <span className="select-none px-1 text-center font-display text-[clamp(0.55rem,2.4vw,0.95rem)] font-semibold tracking-tight text-[var(--bg-base)]">
            {hubLabel}
          </span>
        </motion.div>

        {labels.map((label, i) => {
          const angleRad = ((NODE_ANGLES[i] ?? -90) * Math.PI) / 180;
          const left = 50 + Math.cos(angleRad) * ORBIT_RADIUS;
          const top = 50 + Math.sin(angleRad) * ORBIT_RADIUS;

          return (
            <motion.div
              key={label}
              initial={reduce ? false : { opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 + i * 0.06, duration: 0.35 }}
              className="absolute z-20 -translate-x-1/2 -translate-y-1/2"
              style={{ left: `${left}%`, top: `${top}%` }}
            >
              <span className="inline-flex max-w-[7.5rem] items-center gap-1 rounded-full border border-[var(--border-subtle)] bg-[var(--bg-elevated)] px-2 py-1 text-[10px] font-medium leading-tight text-[var(--text-primary)] shadow-sm sm:max-w-none sm:gap-1.5 sm:px-3 sm:py-1.5 sm:text-xs">
                <span
                  className="h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--accent-strong)]"
                  aria-hidden
                />
                <span className="truncate">{label}</span>
              </span>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}
