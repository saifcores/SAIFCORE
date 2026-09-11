import { getTranslations } from "next-intl/server";
import { ArrowUpRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { MotionReveal } from "@/components/portfolio/motion/MotionReveal";

type Props = {
  /** Set home `#expertise` anchor (omit on other pages). */
  withAnchor?: boolean;
};

/**
 * Bridge to profile depth (stack, capabilities, principles)
 * without repeating full expertise cards.
 */
export async function DepthTeaser({ withAnchor = false }: Props) {
  const t = await getTranslations("depthTeaser");

  return (
    <section
      id={withAnchor ? "expertise" : undefined}
      className="border-b border-[var(--border-subtle)] px-4 py-10 sm:px-6 sm:py-12 lg:px-8"
    >
      <div className="mx-auto max-w-7xl">
        <MotionReveal>
          <div className="flex flex-col gap-4 rounded-[16px] border border-[var(--border-subtle)] bg-[var(--bg-elevated)]/25 px-5 py-6 sm:flex-row sm:items-center sm:justify-between sm:px-8 sm:py-7">
            <div className="min-w-0">
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-[var(--text-muted)]">
                {t("title")}
              </p>
              <h2 className="mt-2 max-w-xl font-display text-pretty text-lg font-medium tracking-tight text-[var(--text-primary)] sm:text-xl">
                {t("heading")}
              </h2>
              <p className="mt-1.5 max-w-lg text-sm leading-relaxed text-[var(--text-secondary)]">
                {t("body")}
              </p>
            </div>
            <Link
              href="/about#expertise"
              className="btn-outline inline-flex min-h-11 shrink-0 items-center justify-center gap-2 px-5 text-sm font-medium"
            >
              {t("cta")}
              <ArrowUpRight className="h-4 w-4" aria-hidden />
            </Link>
          </div>
        </MotionReveal>
      </div>
    </section>
  );
}
