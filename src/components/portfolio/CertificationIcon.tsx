import type { CertificationKind } from "@/data/certifications";

const styles: Record<CertificationKind, { label: string; className: string }> =
  {
    aws: {
      label: "AWS",
      className:
        "border-orange-500/30 bg-gradient-to-br from-orange-500/20 to-amber-600/10 text-orange-300",
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

type Props = {
  kind: CertificationKind;
};

export function CertificationIcon({ kind }: Props) {
  const { label, className } = styles[kind];
  return (
    <span
      className={`inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border text-[10px] font-bold uppercase tracking-wide ${className}`}
      aria-hidden
    >
      {label}
    </span>
  );
}
