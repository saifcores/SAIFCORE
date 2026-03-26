"use client";

import { useTranslations } from "next-intl";

export default function Loading() {
  const t = useTranslations("common");

  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center gap-6 px-4 py-24">
      <div
        className="h-11 w-11 animate-spin rounded-full border-2 border-indigo-500/25 border-t-indigo-400"
        role="status"
        aria-label={t("loading")}
      />
      <p className="text-sm text-[var(--text-muted)]">{t("loading")}</p>
    </div>
  );
}
