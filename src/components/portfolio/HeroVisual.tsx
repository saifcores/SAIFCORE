"use client";

import { motion, useReducedMotion } from "framer-motion";

const TERMINAL_ENTRIES = [
  {
    method: "POST",
    path: "/api/v1/payments/initiate",
    status: "202",
    time: "18ms",
    type: "request",
  },
  {
    method: "→",
    path: "auth.verify(jwt, scope='payment')",
    status: "✓",
    time: "8ms",
    type: "step-green",
  },
  {
    method: "→",
    path: "ledger.credit(amount, idempotencyKey)",
    status: "✓",
    time: "43ms",
    type: "step-green",
  },
  {
    method: "→",
    path: "kafka.publish('payment.completed')",
    status: "✓",
    time: "6ms",
    type: "step-green",
  },
  {
    method: "→",
    path: "audit.log(txnId, actor, timestamp)",
    status: "✓",
    time: "3ms",
    type: "step-violet",
  },
] as const;

type Metric = { value: string; label: string };

type Props = {
  terminalTitle: string;
  terminalVersion: string;
  terminalStatus: string;
  mockupLabel: string;
  mockupStatus: string;
  mockupChart: string;
  metrics: Metric[];
};

export function HeroVisual({
  terminalTitle,
  terminalVersion,
  terminalStatus,
  mockupLabel,
  mockupStatus,
  mockupChart,
  metrics,
}: Props) {
  const reduce = useReducedMotion();

  return (
    <div className="hidden lg:block" aria-hidden>
      <div className="relative space-y-4">
        <motion.div
          initial={reduce ? false : { opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="absolute -inset-6 rounded-3xl bg-gradient-to-br from-blue-600/12 via-indigo-500/8 to-emerald-500/8 blur-2xl"
        />

        <motion.div
          data-theme="dark"
          initial={reduce ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="glass relative overflow-hidden rounded-2xl"
        >
          <div className="flex items-center justify-between border-b border-[var(--border-subtle)] bg-[var(--bg-elevated)]/40 px-5 py-3.5">
            <div className="flex items-center gap-2.5">
              <span
                className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse"
                style={{ animationDuration: "2s" }}
              />
              <span className="font-mono text-[11px] font-semibold tracking-wider text-emerald-400">
                {terminalTitle}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <span className="font-mono text-[10px] text-[var(--text-muted)]">
                {terminalVersion}
              </span>
              <span className="inline-flex items-center gap-1 rounded-full border border-emerald-500/25 bg-emerald-500/10 px-2 py-0.5 font-mono text-[10px] text-emerald-400">
                {terminalStatus}
              </span>
            </div>
          </div>

          <div className="space-y-0 p-5">
            {TERMINAL_ENTRIES.map((entry, i) => (
              <motion.div
                key={i}
                initial={reduce ? false : { opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 + i * 0.08, duration: 0.4 }}
                className="flex items-center justify-between gap-3 py-1.5"
                style={{
                  borderBottom:
                    i < TERMINAL_ENTRIES.length - 1
                      ? "1px solid var(--border-subtle)"
                      : "none",
                }}
              >
                <div className="flex min-w-0 items-center gap-2">
                  <span
                    className={`shrink-0 font-mono text-[10px] font-semibold ${
                      entry.type === "request"
                        ? "text-blue-400"
                        : entry.type === "step-violet"
                          ? "text-violet-400"
                          : "text-emerald-400"
                    }`}
                  >
                    {entry.method}
                  </span>
                  <span className="truncate font-mono text-[11px] text-[var(--text-muted)]">
                    {entry.path}
                  </span>
                </div>
                <div className="flex shrink-0 items-center gap-2">
                  <span
                    className={`font-mono text-[10px] font-semibold ${
                      entry.type === "request"
                        ? "text-blue-400"
                        : entry.type === "step-violet"
                          ? "text-violet-400"
                          : "text-emerald-400"
                    }`}
                  >
                    {entry.status}
                  </span>
                  <span className="font-mono text-[10px] tabular-nums text-[var(--text-muted)]">
                    {entry.time}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.85 }}
          className="glass relative overflow-hidden rounded-2xl"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-emerald-500/5" />
          <div className="relative flex flex-col gap-4 p-6">
            <div className="flex items-center justify-between">
              <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--text-muted)]">
                {mockupLabel}
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/25 bg-emerald-500/10 px-2.5 py-1 font-mono text-[10px] text-emerald-400">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                {mockupStatus}
              </span>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {metrics.map((metric, i) => (
                <motion.div
                  key={metric.label}
                  initial={reduce ? false : { opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1 + i * 0.08, duration: 0.4 }}
                  className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-base)]/60 p-4"
                >
                  <p className="font-mono text-xl font-bold text-[var(--text-primary)]">
                    {metric.value}
                  </p>
                  <p className="mt-1 text-[11px] text-[var(--text-muted)]">
                    {metric.label}
                  </p>
                </motion.div>
              ))}
            </div>
            <div className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-base)]/40 p-4">
              <div className="flex items-end gap-1">
                {[40, 65, 45, 80, 55, 90, 70, 85, 60, 95].map((h, i) => (
                  <motion.div
                    key={i}
                    initial={reduce ? false : { scaleY: 0 }}
                    animate={{ scaleY: 1 }}
                    transition={{ delay: 1.15 + i * 0.04, duration: 0.35 }}
                    style={{
                      height: `${h * 0.4}px`,
                      transformOrigin: "bottom",
                    }}
                    className="flex-1 rounded-sm bg-gradient-to-t from-blue-500/40 to-emerald-500/50"
                  />
                ))}
              </div>
              <p className="mt-3 font-mono text-[10px] text-[var(--text-muted)]">
                {mockupChart}
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
