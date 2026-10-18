import { getMessages } from "next-intl/server";
import { ArrowUpRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { MotionReveal } from "@/components/portfolio/motion/MotionReveal";

export async function SprintStrip() {
  const messages = await getMessages();
  const fo = messages.freelanceOffers;
  const sprint = fo.tracks[0]?.packages[0];

  if (!sprint) return null;

  return (
    <section
      id="sprint"
      aria-labelledby="sprint-heading"
      className="scroll-mt-24 border-b border-[var(--border-subtle)] px-4 py-10 sm:px-6 sm:py-12 lg:px-8 xl:scroll-mt-28"
    >
      <div className="mx-auto max-w-7xl">
        <MotionReveal>
          <div className="flex flex-col gap-6 border border-[var(--border-subtle)] bg-[var(--bg-elevated)]/20 px-5 py-6 sm:flex-row sm:items-center sm:justify-between sm:px-8 sm:py-8">
            <div className="min-w-0 max-w-2xl">
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-[var(--text-muted)]">
                {fo.title}
              </p>
              <h2
                id="sprint-heading"
                className="mt-2 font-display text-pretty text-xl font-medium tracking-tight text-[var(--text-primary)] sm:text-2xl"
              >
                {sprint.title}
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-[var(--text-secondary)]">
                {sprint.description}
              </p>
              <p className="mt-3 text-sm font-medium text-[var(--text-primary)]">
                {sprint.duration}
                {sprint.investment ? (
                  <>
                    <span className="mx-2 text-[var(--text-muted)]" aria-hidden>
                      ·
                    </span>
                    <span className="tabular-nums">{sprint.investment}</span>
                  </>
                ) : null}
              </p>
            </div>
            <div className="flex w-full shrink-0 flex-col gap-2 sm:w-auto sm:items-stretch">
              <Link
                href="/collaborate#architecture-sprint"
                className="btn-primary inline-flex min-h-12 items-center justify-center gap-2 px-6 text-sm"
              >
                {fo.cta}
                <ArrowUpRight className="h-4 w-4" aria-hidden />
              </Link>
              <Link
                href="/collaborate"
                className="btn-outline inline-flex min-h-12 items-center justify-center px-6 text-sm font-medium"
              >
                {fo.viewAll}
              </Link>
            </div>
          </div>
        </MotionReveal>
      </div>
    </section>
  );
}
