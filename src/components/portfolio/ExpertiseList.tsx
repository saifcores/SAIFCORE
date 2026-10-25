import { getMessages, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { getCaseStudyHref } from "@/data/case-studies";
import { Reveal } from "./Reveal";

export async function ExpertiseList() {
  const t = await getTranslations("expertise");
  const tPage = await getTranslations("expertisePage");
  const messages = await getMessages();

  return (
    <section className="py-12 sm:py-16 lg:py-24">
      <div className="page-container">
        <Link href="/" className="link-more min-h-11">
          ← {tPage("backToHome")}
        </Link>
        <p className="site-kicker mb-3.5 mt-5">{t("label")}</p>
        <h1 className="mb-4 max-w-[18ch] text-pretty font-display text-[clamp(1.85rem,4.2vw,3.25rem)] font-semibold leading-[1.08] tracking-tight text-[var(--text-primary)]">
          {tPage("title")}
        </h1>
        <p className="mb-14 max-w-[60ch] text-lg text-[var(--text-muted)]">
          {tPage("subtitle")}
        </p>
        <div className="flex flex-col gap-4">
          {messages.expertise.items.map((item, index) => (
            <Reveal key={item.num} delay={index * 40}>
              <article
                id={`expertise-${item.num}`}
                className="grid scroll-mt-24 gap-6 rounded-[14px] border border-[var(--border-subtle)] bg-[var(--bg-elevated)] p-8 md:grid-cols-2 md:gap-12"
              >
                <div className="flex flex-col gap-2.5">
                  <div className="font-mono text-xs text-[var(--accent)]">
                    {item.num}
                  </div>
                  <h2 className="text-2xl font-semibold tracking-tight text-[var(--text-primary)]">
                    {item.title}
                  </h2>
                  <p className="text-pretty text-[15px] text-[var(--text-muted)]">
                    {item.long}
                  </p>
                </div>
                <div className="flex flex-col gap-4">
                  <div>
                    <div className="mb-1.5 font-mono text-[11px] uppercase tracking-[0.06em] text-[var(--text-muted)]">
                      {t("problemsLabel")}
                    </div>
                    <ul className="flex list-disc flex-col gap-1 pl-[18px] text-sm text-[var(--text-primary)]">
                      {item.problems.map((problem) => (
                        <li key={problem}>{problem}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <div className="mb-1.5 font-mono text-[11px] uppercase tracking-[0.06em] text-[var(--text-muted)]">
                      {t("stackLabel")}
                    </div>
                    <div className="font-mono text-[13px] text-[var(--text-primary)]">
                      {item.stack}
                    </div>
                  </div>
                  <div>
                    <div className="mb-1.5 font-mono text-[11px] uppercase tracking-[0.06em] text-[var(--text-muted)]">
                      {t("evidenceLabel")}
                    </div>
                    <Link
                      href={
                        "evidenceHref" in item && item.evidenceHref
                          ? item.evidenceHref
                          : getCaseStudyHref(item.caseId)
                      }
                      className="link-more text-[var(--accent)]"
                      data-arrow
                    >
                      {item.evidence}
                    </Link>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
