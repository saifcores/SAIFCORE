"use client";

import { useMemo, useState } from "react";

type LabItem = {
  cat: string;
  type: string;
  title: string;
  description: string;
  href: string;
  cta: string;
};

type Props = {
  allLabel: string;
  filterLabel: string;
  emptyLabel: string;
  cats: readonly string[];
  items: readonly LabItem[];
  opensInNewTab: string;
};

export function LabCatalog({
  allLabel,
  filterLabel,
  emptyLabel,
  cats,
  items,
  opensInNewTab,
}: Props) {
  const [cat, setCat] = useState("all");
  const visible = useMemo(
    () => (cat === "all" ? items : items.filter((item) => item.cat === cat)),
    [cat, items],
  );

  const tabs = [
    { id: "all", label: allLabel, count: items.length },
    ...cats.map((c) => ({
      id: c,
      label: c,
      count: items.filter((item) => item.cat === c).length,
    })),
  ];

  return (
    <>
      <div
        role="tablist"
        aria-label={filterLabel}
        className="mb-6 flex flex-wrap gap-2"
      >
        {tabs.map((tab) => {
          const selected = cat === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={selected}
              onClick={() => setCat(tab.id)}
              className={`chip gap-1.5 ${selected ? "chip-active" : ""}`}
            >
              {tab.label}{" "}
              <span className="font-mono opacity-70">{tab.count}</span>
            </button>
          );
        })}
      </div>
      {visible.length === 0 ? (
        <p className="rounded-xl border border-[var(--border-subtle)] px-5 py-8 text-sm text-[var(--text-muted)]">
          {emptyLabel}
        </p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((item) => (
            <a
              key={`${item.cat}-${item.title}`}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${item.cta}: ${item.title} (${opensInNewTab})`}
              className="card-interactive flex flex-col gap-2.5 rounded-xl bg-[var(--bg-elevated)] p-[22px] hover:text-[var(--text-primary)] focus-visible:outline-none"
            >
              <div className="flex justify-between font-mono text-[11px] text-[var(--text-muted)]">
                <span>{item.cat}</span>
                <span className="text-[var(--cyan)]">{item.type}</span>
              </div>
              <div className="text-lg font-semibold tracking-tight text-[var(--text-primary)]">
                {item.title}
              </div>
              <div className="text-pretty text-sm text-[var(--text-muted)]">
                {item.description}
              </div>
              <div className="mt-auto text-[13px] text-[var(--accent)]">
                {item.cta} ↗
              </div>
            </a>
          ))}
        </div>
      )}
    </>
  );
}
