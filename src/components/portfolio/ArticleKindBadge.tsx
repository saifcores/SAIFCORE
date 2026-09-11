import type { ArticleKind } from "@/data/article-content";

const kindClass: Record<ArticleKind, string> = {
  writing:
    "border-[var(--border-subtle)] bg-[var(--bg-elevated)]/80 text-[var(--text-muted)]",
  code: "border-[var(--border-subtle)] bg-[var(--bg-elevated)]/80 text-[var(--text-secondary)]",
  design:
    "border-[var(--border-subtle)] bg-[var(--bg-elevated)]/80 text-[var(--text-secondary)]",
  adr: "border-[var(--border-strong)] bg-[var(--bg-base)] text-[var(--text-primary)]",
  document:
    "border-[var(--border-subtle)] bg-[var(--bg-elevated)]/80 text-[var(--text-muted)]",
};

export function ArticleKindBadge({
  kind,
  label,
}: {
  kind: ArticleKind;
  label: string;
}) {
  return (
    <span
      className={`inline-flex rounded-full border px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.14em] ${kindClass[kind]}`}
    >
      {label}
    </span>
  );
}
