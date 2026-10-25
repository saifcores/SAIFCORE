"use client";

import { useCallback, useEffect, useId, useState, type ReactNode } from "react";
import { Link } from "@/i18n/navigation";
import type { SitePath } from "@/seo";
import { SectionHeader } from "./SectionHeader";

export type HomeTrackId = "recruiter" | "depth" | "client";

export type HomeTrackItem = {
  id: HomeTrackId;
  who: string;
  title: string;
  path: string;
  cta: string;
  href: SitePath;
};

const HASHES: Record<HomeTrackId, readonly string[]> = {
  recruiter: ["experience"],
  depth: ["work", "expertise", "approach", "lab"],
  client: [],
};

type ContentTrack = Exclude<HomeTrackId, "client">;
type Filter = "both" | ContentTrack;

type Props = {
  kicker: string;
  subtitle: string;
  previewNote: string;
  showAllLabel: string;
  items: readonly HomeTrackItem[];
  panels: Record<HomeTrackId, ReactNode>;
};

function trackFromHash(hash: string): HomeTrackId | null {
  const id = hash.replace(/^#/, "");
  const match = (Object.keys(HASHES) as HomeTrackId[]).find((track) =>
    HASHES[track].includes(id),
  );
  return match ?? null;
}

function isContentTrack(id: HomeTrackId): id is ContentTrack {
  return id === "recruiter" || id === "depth";
}

export function HomeTracks({
  kicker,
  subtitle,
  previewNote,
  showAllLabel,
  items,
  panels,
}: Props) {
  const baseId = useId();
  const [filter, setFilter] = useState<Filter>("both");

  const select = useCallback((next: Filter) => {
    setFilter(next);
  }, []);

  useEffect(() => {
    const applyHash = () => {
      const match = trackFromHash(window.location.hash);
      if (match && isContentTrack(match)) setFilter(match);
    };
    applyHash();
    window.addEventListener("hashchange", applyHash);
    return () => window.removeEventListener("hashchange", applyHash);
  }, []);

  useEffect(() => {
    const hash = window.location.hash.replace(/^#/, "");
    if (!hash || filter === "both") return;
    if (!HASHES[filter].includes(hash)) return;
    document.getElementById(hash)?.scrollIntoView();
  }, [filter]);

  return (
    <section
      id="paths"
      aria-labelledby="audience-paths-heading"
      className="section-home scroll-mt-24 xl:scroll-mt-28"
    >
      <div className="page-container">
        <SectionHeader
          kicker={kicker}
          title={subtitle}
          titleId="audience-paths-heading"
          subtitle={previewNote}
        />
        <div className="grid gap-4 lg:grid-cols-3">
          {items.map((item, index) => {
            const selected = filter === item.id;
            const openPreview = () => {
              if (!isContentTrack(item.id)) {
                document
                  .getElementById("offers")
                  ?.scrollIntoView({ block: "start" });
                return;
              }
              select(item.id);
              requestAnimationFrame(() => {
                document
                  .getElementById(`${baseId}-panel-${item.id}`)
                  ?.scrollIntoView({ block: "nearest" });
              });
            };
            return (
              <div
                key={item.id}
                className="card-interactive flex h-full flex-col gap-2.5 rounded-xl p-6 data-[selected=true]:border-[var(--accent)]"
                data-selected={selected ? "true" : "false"}
              >
                <button
                  id={`${baseId}-tab-${item.id}`}
                  type="button"
                  aria-pressed={isContentTrack(item.id) ? selected : undefined}
                  aria-controls={
                    isContentTrack(item.id)
                      ? `${baseId}-panel-${item.id}`
                      : undefined
                  }
                  className="flex flex-col gap-2.5 rounded-md text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus-ring)]"
                  onClick={openPreview}
                >
                  <div className="flex items-center justify-between gap-3">
                    <div className="font-mono text-xs text-[var(--accent)]">
                      {item.who}
                    </div>
                    <div
                      className="font-mono text-[11px] tabular-nums text-[var(--text-muted)]"
                      aria-hidden
                    >
                      {String(index + 1).padStart(2, "0")}
                    </div>
                  </div>
                  <div className="text-[19px] font-semibold tracking-tight text-[var(--text-primary)]">
                    {item.title}
                  </div>
                  <div className="text-sm text-[var(--text-muted)]">
                    {item.path}
                  </div>
                </button>
                {item.id === "client" ? (
                  <a
                    href="#offers"
                    className="link-more mt-auto pt-3 text-[var(--text-primary)]"
                    data-arrow
                  >
                    {item.cta}
                  </a>
                ) : (
                  <Link
                    href={item.href}
                    className="link-more mt-auto pt-3 text-[var(--text-primary)]"
                    data-arrow
                  >
                    {item.cta}
                  </Link>
                )}
              </div>
            );
          })}
        </div>
        {filter !== "both" ? (
          <button
            type="button"
            className="link-more mt-5 text-sm"
            onClick={() => select("both")}
          >
            {showAllLabel}
          </button>
        ) : null}
      </div>

      {items.map((item) => {
        const panel = panels[item.id];
        if (!panel || !isContentTrack(item.id)) return null;
        const open = filter === "both" || filter === item.id;
        return (
          <div
            key={item.id}
            id={`${baseId}-panel-${item.id}`}
            hidden={!open}
            className="home-track-panel"
          >
            {panel}
          </div>
        );
      })}
    </section>
  );
}
