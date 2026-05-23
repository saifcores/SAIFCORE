import type {
  CertificationKind,
  CertificationStatus,
} from "@/data/certifications";

const kindStyles: Record<
  CertificationKind,
  { label: string; className: string }
> = {
  aws: {
    label: "AWS",
    className:
      "border-orange-500/30 bg-gradient-to-br from-orange-500/20 to-amber-600/10 text-orange-300",
  },
  security: {
    label: "Sec+",
    className:
      "border-red-500/30 bg-gradient-to-br from-red-500/15 to-rose-600/10 text-red-300",
  },
  azure: {
    label: "Azure",
    className:
      "border-sky-500/30 bg-gradient-to-br from-sky-500/20 to-blue-600/10 text-sky-300",
  },
  kafka: {
    label: "Kafka",
    className:
      "border-amber-500/30 bg-gradient-to-br from-amber-500/15 to-orange-500/10 text-amber-300",
  },
  kubernetes: {
    label: "K8s",
    className:
      "border-blue-500/30 bg-gradient-to-br from-blue-500/15 to-indigo-500/10 text-accent",
  },
  docker: {
    label: "Docker",
    className:
      "border-sky-500/30 bg-gradient-to-br from-sky-500/15 to-blue-500/10 text-sky-300",
  },
  spring: {
    label: "Spring",
    className:
      "border-emerald-500/30 bg-gradient-to-br from-emerald-500/15 to-green-600/10 text-emerald-400",
  },
  ai: {
    label: "AI",
    className:
      "border-violet-500/30 bg-gradient-to-br from-violet-500/15 to-fuchsia-500/10 text-violet-300",
  },
  domain: {
    label: "Pay",
    className:
      "border-[var(--border-hover)] bg-gradient-to-br from-blue-500/12 to-emerald-500/10 text-accent",
  },
};

const statusRing: Record<CertificationStatus, string> = {
  obtained:
    "ring-2 ring-emerald-500/40 ring-offset-1 ring-offset-[var(--bg-base)]",
  inProgress:
    "ring-2 ring-amber-500/35 ring-offset-1 ring-offset-[var(--bg-base)] cert-status-pulse",
  notStarted: "",
};

type IconProps = {
  kind: CertificationKind;
  status: CertificationStatus;
  statusLabel: string;
};

function StatusCorner({ status }: { status: CertificationStatus }) {
  if (status === "obtained") {
    return (
      <span className="absolute -bottom-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full border border-emerald-500/40 bg-emerald-500/90 text-white shadow-sm">
        <svg
          className="h-2.5 w-2.5"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden
        >
          <path
            fillRule="evenodd"
            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
            clipRule="evenodd"
          />
        </svg>
      </span>
    );
  }

  if (status === "inProgress") {
    return (
      <span className="absolute -bottom-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full border border-amber-500/40 bg-amber-500/90 shadow-sm">
        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-white" />
      </span>
    );
  }

  return (
    <span className="absolute -bottom-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full border border-[var(--border-subtle)] bg-[var(--bg-elevated)] text-[var(--text-muted)] shadow-sm">
      <svg
        className="h-2.5 w-2.5"
        viewBox="0 0 20 20"
        fill="currentColor"
        aria-hidden
      >
        <path
          fillRule="evenodd"
          d="M4 10a6 6 0 1112 0 6 6 0 01-12 0zm6-3a1 1 0 100-2 1 1 0 000 2z"
          clipRule="evenodd"
        />
      </svg>
    </span>
  );
}

export function CertificationIcon({ kind, status, statusLabel }: IconProps) {
  const { label, className } = kindStyles[kind];

  if (status === "notStarted") {
    return (
      <span
        className="relative inline-flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-dashed border-[var(--border-subtle)] bg-[var(--bg-elevated)]/20 text-[10px] font-bold uppercase tracking-wide text-[var(--text-muted)] opacity-70"
        title={statusLabel}
        aria-label={statusLabel}
      >
        <span className="opacity-40">{label}</span>
        <StatusCorner status={status} />
      </span>
    );
  }

  const dimmed = status === "inProgress" ? "opacity-90" : "";

  return (
    <span
      className={`relative inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border text-[10px] font-bold uppercase tracking-wide ${className} ${statusRing[status]} ${dimmed}`}
      title={statusLabel}
      aria-label={statusLabel}
    >
      {label}
      <StatusCorner status={status} />
    </span>
  );
}

const pillStyles: Record<CertificationStatus, string> = {
  obtained: "border-emerald-500/25 bg-emerald-500/10 text-emerald-400",
  inProgress: "border-amber-500/25 bg-amber-500/10 text-amber-400",
  notStarted:
    "border-[var(--border-subtle)] bg-[var(--bg-elevated)]/30 text-[var(--text-muted)]",
};

export function CertificationStatusPill({
  status,
  label,
}: {
  status: CertificationStatus;
  label: string;
}) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide ${pillStyles[status]}`}
    >
      {status === "obtained" ? (
        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" aria-hidden />
      ) : null}
      {status === "inProgress" ? (
        <span
          className="h-1.5 w-1.5 animate-pulse rounded-full bg-amber-400"
          aria-hidden
        />
      ) : null}
      {status === "notStarted" ? (
        <span
          className="h-1.5 w-1.5 rounded-full bg-[var(--text-muted)]"
          aria-hidden
        />
      ) : null}
      {label}
    </span>
  );
}

export function certificationCardClassName(
  status: CertificationStatus,
): string {
  switch (status) {
    case "obtained":
      return "";
    case "inProgress":
      return "border-amber-500/10";
    case "notStarted":
      return "opacity-50 saturate-50 [&_h3]:text-[var(--text-muted)] [&_p]:text-[var(--text-muted)]";
  }
}

export function getStatusLabelKey(
  status: CertificationStatus,
): "statusObtained" | "statusInProgress" | "statusNotStarted" {
  switch (status) {
    case "obtained":
      return "statusObtained";
    case "inProgress":
      return "statusInProgress";
    case "notStarted":
      return "statusNotStarted";
  }
}
