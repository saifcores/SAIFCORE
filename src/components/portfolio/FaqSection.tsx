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
      className="border-b border-[var(--border-subtle)] px-4 py-12 sm:px-6 sm:py-14 lg:px-8 lg:py-20"
    >
      <div className="mx-auto max-w-[1280px]">
        <MotionReveal>
          <h2
            id="faq-heading"
            className="max-w-2xl text-pretty text-2xl font-bold tracking-tight text-[var(--text-primary)] sm:text-3xl md:text-4xl"
          >
            {t("title")}
          </h2>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-[var(--text-secondary)]">
            {t("subtitle")}
          </p>
        </MotionReveal>

        <div className="mx-auto mt-8 max-w-3xl space-y-3 sm:mt-10">
          {items.map((item, index) => (
            <MotionReveal key={item.question} delay={index * 40}>
              <details className="group rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-elevated)]/20 px-4 py-3 open:border-[var(--border-hover)] sm:px-5 sm:py-4">
                <summary className="cursor-pointer list-none text-sm font-semibold text-[var(--text-primary)] marker:content-none [&::-webkit-details-marker]:hidden">
                  <span className="flex items-start justify-between gap-3">
                    <span>{item.question}</span>
                    <span
                      aria-hidden
                      className="mt-0.5 shrink-0 text-[var(--text-muted)] transition group-open:rotate-45"
                    >
                      +
                    </span>
                  </span>
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-[var(--text-secondary)]">
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
