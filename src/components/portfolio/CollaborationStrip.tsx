import { getTranslations } from "next-intl/server";
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
      className="border-b border-[var(--border-subtle)] px-4 py-10 sm:px-6 sm:py-12 lg:px-8 lg:py-16"
    >
      <div className="mx-auto max-w-[1280px]">
        <Reveal>
          <p className="mb-2 text-xs font-medium uppercase tracking-[0.18em] text-[var(--text-muted)]">
            {t("title")}
          </p>
          <h2
            id="collaboration-heading"
            className="max-w-2xl text-pretty text-2xl font-bold tracking-tight text-[var(--text-primary)] sm:text-3xl"
          >
            {t("subtitle")}
          </h2>
        </Reveal>

        <ul className="mt-8 grid list-none grid-cols-1 gap-3 p-0 sm:grid-cols-2 lg:grid-cols-4 lg:gap-4">
          {facts.map((fact, index) => (
            <li key={fact.title}>
              <Reveal delay={index * 50} className="h-full">
                <article className="h-full rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-elevated)]/15 px-4 py-4 sm:px-5 sm:py-5">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-accent">
                    {String(index + 1).padStart(2, "0")}
                  </p>
                  <h3 className="mt-2 text-sm font-semibold text-[var(--text-primary)]">
                    {fact.title}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-[var(--text-secondary)]">
                    {fact.body}
                  </p>
                </article>
              </Reveal>
            </li>
          ))}
        </ul>

        <Reveal delay={200}>
          <div className="mt-8 flex flex-col gap-4 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-elevated)]/15 px-5 py-5 sm:mt-10 sm:flex-row sm:items-center sm:justify-between sm:px-6">
            <div className="min-w-0">
              <p className="text-sm font-semibold text-[var(--text-primary)]">
                {t("ctaTitle")}
              </p>
              <p className="mt-1 text-sm text-[var(--text-secondary)]">
                {t("ctaSubtitle")}
              </p>
            </div>
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
              <BookCallLink className="btn-primary inline-flex min-h-11 items-center justify-center px-5 text-sm">
                {t("ctaPrimary")}
              </BookCallLink>
              <Link
                href="/#offers"
                className="btn-outline inline-flex min-h-11 items-center justify-center rounded-xl px-5 text-sm font-semibold"
              >
                {t("ctaSecondary")}
              </Link>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
