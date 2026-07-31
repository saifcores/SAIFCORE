import { getTranslations } from "next-intl/server";
import { ArrowRight } from "lucide-react";
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
      className="border-b border-[var(--border-subtle)] px-4 py-8 sm:px-6 sm:py-10 lg:px-8"
    >
      <div className="mx-auto max-w-[1280px]">
        <MotionReveal>
          <div className="flex flex-col gap-4 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-elevated)]/15 px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6 sm:py-6">
            <div className="min-w-0">
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-[var(--text-muted)]">
                {t("title")}
              </p>
              <h2 className="mt-2 max-w-xl text-pretty text-lg font-bold tracking-tight text-[var(--text-primary)] sm:text-xl">
                {t("heading")}
              </h2>
              <p className="mt-1.5 max-w-lg text-sm leading-relaxed text-[var(--text-secondary)]">
                {t("body")}
              </p>
            </div>
            <Link
              href="/about#expertise"
              className="btn-outline inline-flex min-h-11 shrink-0 items-center justify-center gap-2 rounded-xl px-5 text-sm font-semibold"
            >
              {t("cta")}
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </div>
        </MotionReveal>
      </div>
    </section>
  );
}
