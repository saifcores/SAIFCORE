export function SystemDiagram() {
  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden opacity-[0.55] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_40%,black,transparent)]"
      aria-hidden
    >
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 800 400"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <linearGradient id="sd-line" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#6366f1" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#22d3ee" stopOpacity="0.2" />
          </linearGradient>
          <filter id="sd-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <g stroke="url(#sd-line)" strokeWidth="1.2" strokeLinecap="round">
          <path
            d="M80 200 L200 120 L360 200 L520 100 L680 200"
            className="animate-pulse-line-slow"
          />
          <path
            d="M80 220 L220 280 L400 200 L580 300 L720 220"
            opacity="0.6"
            className="animate-pulse-line-delayed"
          />
          <path
            d="M200 120 L220 280 M360 200 L400 200 M520 100 L580 300"
            opacity="0.45"
          />
        </g>
        {[
          [80, 200],
          [200, 120],
          [360, 200],
          [520, 100],
          [680, 200],
          [220, 280],
          [580, 300],
        ].map(([cx, cy], i) => (
          <circle
            key={`${cx}-${cy}`}
            cx={cx}
            cy={cy}
            r={5}
            fill="var(--bg-base)"
            stroke="#6366f1"
            strokeWidth="1.5"
            filter="url(#sd-glow)"
            className="opacity-90"
            style={{ animationDelay: `${i * 0.15}s` }}
          />
        ))}
        <rect
          x="100"
          y="140"
          width="120"
          height="56"
          rx="12"
          stroke="rgba(99,102,241,0.35)"
          strokeWidth="1"
          fill="rgba(99,102,241,0.06)"
        />
        <rect
          x="420"
          y="160"
          width="140"
          height="56"
          rx="12"
          stroke="rgba(34,211,238,0.25)"
          strokeWidth="1"
          fill="rgba(34,211,238,0.05)"
        />
      </svg>
    </div>
  );
}
