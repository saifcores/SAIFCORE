"use client";

import { useEffect, useState, type ReactNode } from "react";

type Props = {
  summary: string;
  children: ReactNode;
};

export function FeaturedProjectDetails({ summary, children }: Props) {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(min-width: 1024px)");
    const sync = () => setIsDesktop(media.matches);
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);

  if (isDesktop) {
    return <div>{children}</div>;
  }

  return (
    <details className="group mt-6 border-t border-[var(--border-subtle)] pt-4">
      <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-3 text-sm font-semibold text-[var(--text-primary)] [&::-webkit-details-marker]:hidden">
        <span>{summary}</span>
        <span
          className="shrink-0 text-[var(--text-muted)] transition-transform duration-200 group-open:rotate-180"
          aria-hidden
        >
          ▼
        </span>
      </summary>
      <div className="pt-4">{children}</div>
    </details>
  );
}
