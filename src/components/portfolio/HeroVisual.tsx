type Props = {
  nodes: string[];
  hubLabel?: string;
};

/** Degrees from the positive x-axis. Top, then clockwise. */
const NODE_ANGLES = [-90, -18, 54, 126, 198] as const;
/** Node center, as a percentage of the square. */
const ORBIT_RADIUS = 31;

export function HeroVisual({ nodes, hubLabel = "SAIFCORE" }: Props) {
  const labels = nodes.slice(0, 5);

  return (
    <div className="relative mx-auto w-full max-w-[520px]" aria-hidden>
      <div className="relative aspect-square w-full @container">
        <div
          className="absolute inset-[4%] rounded-[2rem]"
          style={{
            backgroundImage:
              "radial-gradient(circle, color-mix(in srgb, var(--text-muted) 55%, transparent) 1.15px, transparent 1.15px)",
            backgroundSize: "16px 16px",
          }}
        />

        <div className="absolute left-1/2 top-1/2 h-[78%] w-[78%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[var(--border-strong)]" />
        <div className="absolute left-1/2 top-1/2 h-[54%] w-[54%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[var(--border-subtle)]" />
        <div className="absolute left-1/2 top-1/2 h-[32%] w-[32%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[var(--border-subtle)]" />

        <svg
          className="absolute inset-0 h-full w-full"
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {labels.map((_, i) => {
            const angle = ((NODE_ANGLES[i] ?? -90) * Math.PI) / 180;
            const x2 = 50 + Math.cos(angle) * 24;
            const y2 = 50 + Math.sin(angle) * 24;
            return (
              <line
                key={`spoke-${i}`}
                x1="50"
                y1="50"
                x2={x2}
                y2={y2}
                stroke="var(--border-strong)"
                strokeWidth="0.4"
              />
            );
          })}
        </svg>

        <div className="absolute left-1/2 top-1/2 z-10 flex h-[26%] w-[26%] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[var(--text-primary)] shadow-[var(--shadow-panel)]">
          <span className="select-none px-1 text-center font-display text-[clamp(0.55rem,3.2cqi,0.95rem)] font-semibold tracking-tight text-[var(--bg-base)]">
            {hubLabel}
          </span>
        </div>

        {labels.map((label, i) => {
          const angleRad = ((NODE_ANGLES[i] ?? -90) * Math.PI) / 180;
          const left = 50 + Math.cos(angleRad) * ORBIT_RADIUS;
          const top = 50 + Math.sin(angleRad) * ORBIT_RADIUS;

          return (
            <div
              key={label}
              className="absolute z-20 -translate-x-1/2 -translate-y-1/2"
              style={{ left: `${left}%`, top: `${top}%` }}
            >
              <span className="inline-flex items-center gap-1 whitespace-nowrap rounded-full border border-[var(--border-strong)] bg-[var(--bg-elevated)] px-2 py-1 text-[10px] font-medium text-[var(--text-primary)] shadow-[var(--shadow-card)] sm:gap-1.5 sm:px-3 sm:py-1.5 sm:text-xs">
                <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--accent-blue)]" />
                {label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
