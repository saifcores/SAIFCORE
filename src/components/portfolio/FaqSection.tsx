import { getTranslations } from "next-intl/server";
import { MotionReveal } from "@/components/portfolio/motion/MotionReveal";

export async function FaqSection() {
  const t = await getTranslations("faq");
  const items = t.raw("items") as readonly {
    question: string;
    answer: string;
  }[];

  return (
    <section
      id="faq"
      aria-labelledby="faq-heading"
      className="scroll-mt-24 border-b border-[var(--border-subtle)] px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20 xl:scroll-mt-28"
    >
      <div className="mx-auto max-w-7xl">
        <MotionReveal>
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.18em] text-[var(--text-muted)]">
            {t("title")}
          </p>
          <h2
            id="faq-heading"
            className="max-w-2xl font-display text-pretty text-2xl font-medium tracking-tight text-[var(--text-primary)] sm:text-3xl"
          >
            {t("subtitle")}
          </h2>
        </MotionReveal>

        <div className="mx-auto mt-8 max-w-3xl divide-y divide-[var(--border-subtle)] border-y border-[var(--border-subtle)] sm:mt-10">
          {items.map((item, index) => (
            <MotionReveal key={item.question} delay={index * 40}>
              <details className="group py-1 sm:py-1.5">
                <summary className="cursor-pointer list-none py-3 text-sm font-semibold text-[var(--text-primary)] marker:content-none sm:py-4 [&::-webkit-details-marker]:hidden">
                  <span className="flex items-start justify-between gap-3">
                    <span className="text-pretty pr-1">{item.question}</span>
                    <span
                      aria-hidden
                      className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-[var(--text-muted)] transition group-open:rotate-45"
                    >
                      +
                    </span>
                  </span>
                </summary>
                <p className="pb-3 pr-2 text-pretty text-sm leading-relaxed text-[var(--text-secondary)] sm:pb-4 sm:pr-10">
                  {item.answer}
                </p>
              </details>
            </MotionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
