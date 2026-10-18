import { getMessages, getTranslations } from "next-intl/server";
import { ArrowUpRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { getCaseStudyHref } from "@/data/case-studies";
import { MotionReveal } from "@/components/portfolio/motion/MotionReveal";

const LAB_IDS = [
  "payment-platform-disaster-lab",
  "double-entry-ledger-platform",
] as const;

export async function ArchitectureLab() {
  const messages = await getMessages();
  const t = await getTranslations("architectureLab");
  const tCommon = await getTranslations("common");
  const opensInNewTab = tCommon("opensInNewTab");
  const byId = new Map(
    messages.featuredProjects.items.map((item) => [item.id, item] as const),
  );
  const projects = LAB_IDS.map((id) => byId.get(id)).filter(
    (item) => item != null,
  );

  if (projects.length === 0) return null;

  return (
    <section
      id="lab"
      aria-labelledby="architecture-lab-heading"
      className="scroll-mt-24 border-b border-[var(--border-subtle)] px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20 xl:scroll-mt-28"
    >
      <div className="mx-auto max-w-7xl">
        <MotionReveal>
          <p className="mb-2 text-xs font-medium uppercase tracking-[0.18em] text-[var(--text-muted)]">
            {t("label")}
          </p>
          <h2
            id="architecture-lab-heading"
            className="max-w-2xl font-display text-pretty text-2xl font-medium tracking-tight text-[var(--text-primary)] sm:text-3xl md:text-4xl"
          >
            {t("title")}
          </h2>
          <p className="mt-3 max-w-2xl text-pretty text-sm leading-relaxed text-[var(--text-secondary)] sm:text-base">
            {t("subtitle")}
          </p>
        </MotionReveal>

        <div className="mt-8 grid gap-4 sm:mt-10 lg:grid-cols-5 lg:gap-5">
          {projects.map((item, index) => {
            const href = item.href?.trim() ?? "";
            const caseHref = getCaseStudyHref(item);
            const isPrimary = index === 0;

            return (
              <MotionReveal
                key={item.id}
                delay={index * 60}
                className={isPrimary ? "lg:col-span-3" : "lg:col-span-2"}
              >
                <article className="flex h-full flex-col rounded-[16px] border border-[var(--border-subtle)] bg-[var(--bg-elevated)]/20 p-5 sm:p-7">
                  <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-[var(--text-muted)]">
                    {isPrimary ? t("primaryLabel") : t("secondaryLabel")}
                  </p>
                  <h3 className="mt-2 text-lg font-semibold text-[var(--text-primary)]">
                    {item.title}
                  </h3>
                  {item.status ? (
                    <p className="mt-1 text-xs font-medium text-[var(--accent-strong)]">
                      {item.status}
                    </p>
                  ) : null}
                  <p className="mt-4 flex-1 text-sm leading-relaxed text-[var(--text-secondary)]">
                    {item.problem}
                  </p>
                  <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2">
                    <Link
                      href={caseHref}
                      className="inline-flex min-h-10 items-center text-sm font-semibold text-[var(--text-primary)] transition hover:opacity-70"
                    >
                      {t("caseCta")}
                      <ArrowUpRight className="ml-1 h-3.5 w-3.5" aria-hidden />
                    </Link>
                    {href ? (
                      <a
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${t("repoCta")} (${opensInNewTab})`}
                        className="inline-flex min-h-10 items-center text-sm font-medium text-[var(--text-secondary)] transition hover:text-[var(--text-primary)]"
                      >
                        {t("repoCta")}
                        <ArrowUpRight className="ml-1 h-3.5 w-3.5" aria-hidden />
                      </a>
                    ) : null}
                  </div>
                </article>
              </MotionReveal>
            );
          })}
        </div>

        <p className="mt-6 max-w-3xl text-pretty text-sm leading-relaxed text-[var(--text-muted)]">
          {t("direction")}
        </p>
      </div>
    </section>
  );
}
