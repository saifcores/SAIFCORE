import type { ReactNode } from "react";
import { getMessages, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Reveal } from "./Reveal";

const ICONS: Record<string, ReactNode> = {
  "01": (
    <path
      d="M8 18V6m0 0 4 4M8 6 4 10M16 6v12m0 0 4-4m-4 4-4-4"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  ),
  "02": (
    <path
      d="M5 8h14v9a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V8Zm2-3h10v3H7V5Zm3 7h4"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  ),
  "03": (
    <path
      d="M7 16V8l5-3 5 3v8M7 12h10"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  ),
  "04": (
    <path
      d="M9 8H6v8h3M15 8h3v8h-3M10 12h4"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  ),
  "05": (
    <path
      d="M12 5v3m0 8v3M5 12h3m8 0h3M7.5 7.5l2 2m5 5 2 2m0-9-2 2m-5 5-2 2"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
    />
  ),
  "06": (
    <path
      d="M12 6.5a3 3 0 0 1 3 3c0 2-3 3.2-3 5.5M12 18h.01M8.2 8.2a5.5 5.5 0 0 0 0 7.6M15.8 8.2a5.5 5.5 0 0 1 0 7.6"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
    />
  ),
};

function DomainIcon({ num }: { num: string }) {
  return (
    <span className="grid h-9 w-9 place-items-center rounded-lg bg-[var(--bg-card)] text-[var(--text-secondary)]">
      <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden>
        {ICONS[num] ?? ICONS["01"]}
      </svg>
    </span>
  );
}

export async function ExpertiseTeaser() {
  const t = await getTranslations("expertise");
  const messages = await getMessages();

  return (
    <section
      id="expertise"
      aria-labelledby="expertise-heading"
      className="section-home scroll-mt-24 border-t border-[var(--border-subtle)] xl:scroll-mt-28"
    >
      <div className="page-container grid items-start gap-10 lg:grid-cols-[minmax(0,0.82fr)_minmax(0,1.18fr)] lg:gap-16">
        <Reveal>
          <div className="lg:sticky lg:top-28">
            <p className="mb-4 inline-flex items-center gap-2 text-sm text-[var(--text-muted)]">
              <span
                className="h-1.5 w-1.5 rounded-full bg-[var(--text-primary)]"
                aria-hidden
              />
              {t("label")}
            </p>
            <h2
              id="expertise-heading"
              className="max-w-[20ch] font-display text-[clamp(1.75rem,4vw,3.25rem)] font-semibold leading-[1.08] tracking-[-0.03em] text-[var(--text-primary)] lg:max-w-[14ch]"
            >
              {t("title")}
            </h2>
            <p className="mt-5 max-w-[42ch] text-pretty text-[15px] leading-relaxed text-[var(--text-secondary)]">
              {t("lead")}
            </p>
            <Link href="/expertise" className="link-more mt-6">
              {t("viewAll")}
            </Link>
          </div>
        </Reveal>

        <div className="grid gap-4 sm:grid-cols-2">
          {messages.expertise.items.map((item, index) => {
            const isDirection = "evidenceHref" in item && item.evidenceHref;
            return (
              <Reveal key={item.num} delay={index * 40}>
                <Link
                  href={`/expertise#expertise-${item.num}` as "/expertise"}
                  className="flex h-full flex-col rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-elevated)] p-5 shadow-[var(--shadow-card)] transition-colors hover:border-[var(--border-hover)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus-ring)]"
                >
                  <div className="flex items-start justify-between gap-3">
                    <DomainIcon num={item.num} />
                    <span
                      className={
                        isDirection
                          ? "rounded-full border border-[var(--border-subtle)] px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.08em] text-[var(--text-muted)]"
                          : "rounded-full bg-[var(--text-primary)] px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.08em] text-[var(--bg-base)]"
                      }
                    >
                      {isDirection ? t("directionBadge") : t("proofBadge")}
                    </span>
                  </div>
                  <h3 className="mt-4 text-[15px] font-semibold text-[var(--text-primary)]">
                    {item.title}
                  </h3>
                  <p className="mt-1.5 text-pretty text-sm leading-relaxed text-[var(--text-muted)]">
                    {item.short}
                  </p>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
