import { getTranslations } from "next-intl/server";
import { ArrowUpRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { BookCallLink } from "./BookCallLink";
import { Reveal } from "./Reveal";

export async function CollaborationStrip() {
  const t = await getTranslations("collaboration");
  const facts = t.raw("facts") as readonly {
    title: string;
    body: string;
  }[];

  return (
    <section
      id="start"
      aria-labelledby="collaboration-heading"
      className="border-b border-[var(--border-subtle)] px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24"
    >
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <div className="rounded-[16px] border border-[var(--border-subtle)] bg-[var(--bg-elevated)]/40 px-6 py-10 sm:px-10 sm:py-12 lg:px-14 lg:py-14">
            <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-2xl">
                <h2
                  id="collaboration-heading"
                  className="font-display text-pretty text-2xl font-medium tracking-tight text-[var(--text-primary)] sm:text-3xl md:text-4xl"
                >
                  {t("title")}
                </h2>
                <p className="mt-4 max-w-xl text-pretty text-base leading-relaxed text-[var(--text-secondary)]">
                  {t("subtitle")}
                </p>
                <p className="mt-2 max-w-xl text-pretty text-sm leading-relaxed text-[var(--text-muted)]">
                  {t("ctaSubtitle")}
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <Link
                  href="/#architecture-sprint"
                  className="btn-primary btn-primary-lg inline-flex min-h-12 items-center justify-center gap-2 px-8 text-base"
                >
                  {t("ctaPrimary")}
                  <ArrowUpRight className="h-4 w-4" aria-hidden />
                </Link>
                <BookCallLink className="btn-outline inline-flex min-h-12 items-center justify-center px-6 text-sm font-medium">
                  {t("ctaSecondary")}
                </BookCallLink>
              </div>
            </div>

            <ul className="mt-10 grid list-none grid-cols-1 gap-6 border-t border-[var(--border-subtle)] p-0 pt-10 sm:grid-cols-3 lg:gap-8">
              {facts.map((fact, index) => (
                <li key={fact.title}>
                  <p className="font-display text-sm font-medium text-[var(--text-muted)]">
                    {String(index + 1).padStart(2, "0")}
                  </p>
                  <h3 className="mt-2 text-sm font-semibold text-[var(--text-primary)]">
                    {fact.title}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-[var(--text-secondary)]">
                    {fact.body}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
