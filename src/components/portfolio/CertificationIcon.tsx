import type {
  CertificationKind,
  CertificationStatus,
} from "@/data/certifications";

const kindStyles: Record<
  CertificationKind,
  { label: string; className: string }
> = {
  academic: {
    label: "Cert",
    className:
      "border-[var(--border-subtle)] bg-[var(--bg-elevated)] text-[var(--text-secondary)]",
  },
  aws: {
    label: "AWS",
    className:
      "border-[var(--border-subtle)] bg-[var(--bg-elevated)] text-[var(--text-secondary)]",
  },
  security: {
    label: "Sec+",
    className:
      "border-[var(--border-subtle)] bg-[var(--bg-elevated)] text-[var(--text-secondary)]",
  },
  kafka: {
    label: "Kafka",
    className:
      "border-[var(--border-subtle)] bg-[var(--bg-elevated)] text-[var(--text-secondary)]",
  },
  kubernetes: {
    label: "K8s",
    className:
      "border-[var(--border-subtle)] bg-[var(--bg-elevated)] text-[var(--text-secondary)]",
  },
  docker: {
    label: "Docker",
    className:
      "border-[var(--border-subtle)] bg-[var(--bg-elevated)] text-[var(--text-secondary)]",
  },
  spring: {
    label: "Spring",
    className:
      "border-[var(--border-subtle)] bg-[var(--bg-elevated)] text-[var(--text-secondary)]",
  },
  domain: {
    label: "Pay",
    className:
      "border-[var(--border-strong)] bg-[var(--bg-base)] text-[var(--text-primary)]",
  },
};

const statusRing: Record<CertificationStatus, string> = {
  obtained:
    "ring-1 ring-[var(--accent-strong)]/50 ring-offset-1 ring-offset-[var(--bg-base)]",
  inProgress:
    "ring-1 ring-[var(--text-muted)]/40 ring-offset-1 ring-offset-[var(--bg-base)]",
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
      <span className="absolute -bottom-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full border border-[var(--border-subtle)] bg-[var(--accent-strong)] text-[var(--bg-base)] shadow-sm">
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
      <span className="absolute -bottom-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full border border-[var(--border-subtle)] bg-[var(--bg-elevated)] shadow-sm">
        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[var(--text-muted)]" />
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
        className="relative inline-flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-[12px] border border-dashed border-[var(--border-subtle)] bg-[var(--bg-elevated)]/20 text-[10px] font-bold uppercase tracking-wide text-[var(--text-muted)] opacity-70"
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
      className={`relative inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-[12px] border text-[10px] font-bold uppercase tracking-wide ${className} ${statusRing[status]} ${dimmed}`}
      title={statusLabel}
      aria-label={statusLabel}
    >
      {label}
      <StatusCorner status={status} />
    </span>
  );
}

const pillStyles: Record<CertificationStatus, string> = {
  obtained:
    "border-[var(--border-subtle)] bg-[var(--bg-elevated)]/40 text-[var(--accent-strong)]",
  inProgress:
    "border-[var(--border-subtle)] bg-[var(--bg-elevated)]/30 text-[var(--text-muted)]",
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
        <span
          className="h-1.5 w-1.5 rounded-full bg-[var(--accent-strong)]"
          aria-hidden
        />
      ) : null}
      {status === "inProgress" ? (
        <span
          className="h-1.5 w-1.5 animate-pulse rounded-full bg-[var(--text-muted)]"
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
      return "border-[var(--border-subtle)]";
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
