"use client";

import { useEffect, useState } from "react";
import type { ProjectKind } from "@/data/case-studies";

export type CaseStudyFilterId = "all" | ProjectKind;

const FILTERS: CaseStudyFilterId[] = ["all", "live", "lab", "confidential"];

type Props = {
  label: string;
  labels: Record<CaseStudyFilterId, string>;
  counts: Record<CaseStudyFilterId, number>;
  children: React.ReactNode;
};

export function CaseStudyFilter({ label, labels, counts, children }: Props) {
  const [filter, setFilter] = useState<CaseStudyFilterId>("all");

  useEffect(() => {
    const applyHash = () => {
      const id = window.location.hash.slice(1);
      if (!id) return;
      const target = document.getElementById(id);
      const kind = target?.getAttribute("data-kind");
      if (kind === "live" || kind === "lab" || kind === "confidential") {
        setFilter("all");
      }
    };
    applyHash();
    window.addEventListener("hashchange", applyHash);
    return () => window.removeEventListener("hashchange", applyHash);
  }, []);

  return (
    <div>
      <div
        className="flex flex-wrap gap-2"
        role="tablist"
        aria-label={label}
      >
        {FILTERS.map((id) => {
          const selected = filter === id;
          return (
            <button
              key={id}
              type="button"
              role="tab"
              aria-selected={selected}
              onClick={() => setFilter(id)}
              className={`chip text-xs sm:min-h-9 sm:text-sm ${
                selected ? "chip-active" : ""
              }`}
            >
              {labels[id]}
              <span className="ml-1.5 tabular-nums text-[var(--text-muted)]">
                {counts[id]}
              </span>
            </button>
          );
        })}
      </div>

      <div
        data-case-filter={filter}
        className="mt-8 space-y-5 sm:mt-10 sm:space-y-6 [&[data-case-filter=live]_[data-kind]:not([data-kind=live])]:hidden [&[data-case-filter=lab]_[data-kind]:not([data-kind=lab])]:hidden [&[data-case-filter=confidential]_[data-kind]:not([data-kind=confidential])]:hidden"
      >
        {children}
      </div>
    </div>
  );
}
