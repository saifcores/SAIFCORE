"use client";

import { useTranslations } from "next-intl";

function Skeleton({ className }: { className?: string }) {
  return (
    <div
      className={`animate-pulse rounded-lg bg-[var(--bg-elevated)]/80 ${className ?? ""}`}
      aria-hidden
    />
  );
}

export default function Loading() {
  const t = useTranslations("common");

  return (
    <div
      className="relative flex min-h-[60vh] flex-col px-4 py-24 sm:px-6 lg:px-8"
      role="status"
      aria-label={t("loading")}
    >
      <div className="bg-grid pointer-events-none absolute inset-0 opacity-40" />
      <div className="relative mx-auto w-full max-w-[1280px] space-y-8">
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-12 w-full max-w-2xl" />
        <Skeleton className="h-12 w-full max-w-xl" />
        <div className="flex gap-3 pt-4">
          <Skeleton className="h-10 w-28 rounded-full" />
          <Skeleton className="h-10 w-28 rounded-full" />
          <Skeleton className="h-10 w-28 rounded-full" />
        </div>
        <div className="grid gap-4 pt-12 sm:grid-cols-2 lg:grid-cols-3">
          <Skeleton className="h-48 rounded-2xl" />
          <Skeleton className="h-48 rounded-2xl" />
          <Skeleton className="hidden h-48 rounded-2xl lg:block" />
        </div>
      </div>
      <p className="relative mt-10 text-center text-sm text-[var(--text-muted)]">
        {t("loading")}
      </p>
    </div>
  );
}
