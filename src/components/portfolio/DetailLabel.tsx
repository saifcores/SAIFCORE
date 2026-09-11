import type { ReactNode } from "react";

/** Uppercase micro-label used across case studies and featured project details. */
export function DetailLabel({ children }: { children: ReactNode }) {
  return (
    <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--text-muted)]">
      {children}
    </p>
  );
}
