"use client";

import Link from "next/link";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="relative flex min-h-[70vh] flex-col items-center justify-center overflow-hidden px-4 py-16">
      <div className="bg-grid pointer-events-none absolute inset-0 opacity-30" />
      <div
        className="pointer-events-none absolute -top-24 left-1/2 h-72 w-[min(90vw,480px)] -translate-x-1/2 rounded-full bg-gradient-to-br from-indigo-600/25 via-red-500/10 to-transparent blur-3xl"
        aria-hidden
      />

      <div className="relative w-full max-w-md text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--text-muted)]">
          Something went wrong
        </p>
        <h1 className="mt-3 text-3xl font-bold tracking-tight text-[var(--text-primary)] sm:text-4xl">
          We couldn&apos;t load this page
        </h1>
        <p className="mt-4 text-[var(--text-secondary)] leading-relaxed">
          A runtime error occurred. You can try again or return to the homepage.
        </p>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <button
            type="button"
            onClick={reset}
            className="inline-flex h-12 items-center justify-center rounded-2xl bg-gradient-to-r from-[#2563eb] to-[#6366f1] px-8 text-base font-semibold text-white shadow-lg shadow-indigo-500/25 transition hover:brightness-110 active:scale-[0.98]"
          >
            Try again
          </button>
          <Link
            href="/"
            className="inline-flex h-12 items-center justify-center rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-elevated)]/50 px-8 text-base font-semibold text-[var(--text-primary)] backdrop-blur-sm transition hover:border-[var(--accent-indigo)]/35 active:scale-[0.98]"
          >
            Back to home
          </Link>
        </div>
      </div>
    </div>
  );
}
