import type { ContentBlock } from "@/data/article-content";
import { Reveal } from "./Reveal";

type Labels = {
  adrStatus: string;
  adrContext: string;
  adrDecision: string;
  adrConsequences: string;
};

function InlineText({ text }: { text: string }) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return (
    <>
      {parts.map((part, i) => {
        if (part.startsWith("**") && part.endsWith("**")) {
          return (
            <strong
              key={i}
              className="font-semibold text-[var(--text-primary)]"
            >
              {part.slice(2, -2)}
            </strong>
          );
        }
        return <span key={i}>{part}</span>;
      })}
    </>
  );
}

type Props = {
  blocks: ContentBlock[];
  locale: "en" | "fr";
  labels: Labels;
};

export function ArticleBody({ blocks, locale, labels }: Props) {
  const t = (b: { en: string; fr: string }) => b[locale];
  const items = (i: { en: string[]; fr: string[] }) => i[locale];

  return (
    <div className="mt-8 space-y-6 sm:mt-12 sm:space-y-8">
      {blocks.map((block, i) => (
        <Reveal key={i} delay={Math.min(i * 40, 400)}>
          <BlockRenderer block={block} labels={labels} t={t} items={items} />
        </Reveal>
      ))}
    </div>
  );
}

function BlockRenderer({
  block,
  labels,
  t,
  items,
}: {
  block: ContentBlock;
  labels: Labels;
  t: (b: { en: string; fr: string }) => string;
  items: (i: { en: string[]; fr: string[] }) => string[];
}) {
  switch (block.type) {
    case "paragraph":
      return (
        <p className="text-pretty text-sm leading-relaxed text-[var(--text-secondary)] sm:text-base">
          <InlineText text={t(block)} />
        </p>
      );
    case "heading":
      return block.level === 2 ? (
        <h2 className="text-pretty text-lg font-semibold tracking-tight text-[var(--text-primary)] sm:text-xl md:text-2xl">
          {t(block)}
        </h2>
      ) : (
        <h3 className="text-pretty text-base font-semibold text-[var(--text-primary)] sm:text-lg">
          {t(block)}
        </h3>
      );
    case "code":
      return (
        <figure className="code-block overflow-hidden rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-code)] shadow-[inset_0_1px_0_var(--border-code)]">
          {block.title ? (
            <figcaption className="border-b border-[var(--border-code)] px-4 py-2.5 text-xs font-medium text-[var(--text-muted)]">
              {t(block.title)}
            </figcaption>
          ) : null}
          <pre className="overflow-x-auto p-3 text-xs leading-relaxed sm:p-4 sm:text-[13px]">
            <code className="font-mono text-[var(--text-secondary)] [tab-size:2]">
              {block.code}
            </code>
          </pre>
        </figure>
      );
    case "callout":
      return (
        <aside
          className={`rounded-2xl border px-4 py-3.5 text-pretty text-sm leading-relaxed sm:py-4 ${
            block.variant === "warning"
              ? "border-amber-500/30 bg-amber-500/10 text-amber-100/90"
              : "border-sky-500/30 bg-sky-500/10 text-sky-100/90"
          }`}
        >
          <InlineText text={t(block)} />
        </aside>
      );
    case "adr":
      return (
        <div className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-elevated)]/50 p-4 sm:p-6 md:p-8">
          <p className="text-[10px] font-semibold uppercase tracking-widest text-[var(--accent-cyan)] sm:text-xs">
            {labels.adrStatus} · {t(block.status)}
          </p>
          <div className="mt-5 space-y-5 sm:mt-6 sm:space-y-6">
            <div>
              <h3 className="text-[10px] font-semibold uppercase tracking-wider text-[var(--text-muted)] sm:text-xs">
                {labels.adrContext}
              </h3>
              <p className="mt-2 text-pretty text-sm leading-relaxed text-[var(--text-secondary)] sm:text-base">
                {t(block.context)}
              </p>
            </div>
            <div>
              <h3 className="text-[10px] font-semibold uppercase tracking-wider text-[var(--text-muted)] sm:text-xs">
                {labels.adrDecision}
              </h3>
              <p className="mt-2 text-pretty text-sm leading-relaxed text-[var(--text-secondary)] sm:text-base">
                {t(block.decision)}
              </p>
            </div>
            <div>
              <h3 className="text-[10px] font-semibold uppercase tracking-wider text-[var(--text-muted)] sm:text-xs">
                {labels.adrConsequences}
              </h3>
              <p className="mt-2 text-pretty text-sm leading-relaxed text-[var(--text-secondary)] sm:text-base">
                {t(block.consequences)}
              </p>
            </div>
          </div>
        </div>
      );
    case "design":
      return (
        <div className="border-l-4 border-indigo-500/50 pl-4 text-pretty text-sm leading-relaxed text-[var(--text-secondary)] sm:pl-5 sm:text-base">
          <InlineText text={t(block)} />
        </div>
      );
    case "document":
      return (
        <div className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-base)]/60 p-4 sm:p-6">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)] sm:text-sm">
            {t(block.title)}
          </h3>
          <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm text-[var(--text-secondary)] marker:text-[var(--accent-indigo)] sm:mt-4 sm:text-base">
            {items(block.items).map((line, j) => (
              <li key={j} className="leading-relaxed">
                {line}
              </li>
            ))}
          </ol>
        </div>
      );
    case "list":
      return block.ordered ? (
        <ol className="list-decimal space-y-2 pl-5 text-sm text-[var(--text-secondary)] marker:text-[var(--accent-indigo)] sm:text-base">
          {items(block.items).map((line, j) => (
            <li key={j} className="leading-relaxed">
              {line}
            </li>
          ))}
        </ol>
      ) : (
        <ul className="list-disc space-y-2 pl-5 text-sm text-[var(--text-secondary)] marker:text-[var(--accent-indigo)] sm:text-base">
          {items(block.items).map((line, j) => (
            <li key={j} className="leading-relaxed">
              {line}
            </li>
          ))}
        </ul>
      );
    default:
      return null;
  }
}
