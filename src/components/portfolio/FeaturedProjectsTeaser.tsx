import { getMessages, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import {
  getCaseStudyHref,
  projectKind,
  projectKindDot,
  sortProjectsForHomeTeaser,
} from "@/data/case-studies";
import { Reveal } from "./Reveal";
import { SectionHeader } from "./SectionHeader";

export async function FeaturedProjectsTeaser() {
  const messages = await getMessages();
  const items = sortProjectsForHomeTeaser(messages.featuredProjects.items, 3);
  const t = await getTranslations("featuredProjects");

  const kindLabel = {
    live: t("kindLive"),
    confidential: t("kindConfidential"),
    lab: t("kindLab"),
  } as const;

  return (
    <section id="work" className="section-home scroll-mt-24 xl:scroll-mt-28">
      <div className="page-container">
        <Reveal>
          <SectionHeader
            kicker={t("title")}
            title={t("heading")}
            subtitle={t("subtitle")}
            action={
              <Link href="/systems" className="link-more" data-arrow>
                {t("viewAll")}
              </Link>
            }
          />
        </Reveal>

        <ul className="grid list-none grid-cols-1 gap-4 p-0 md:grid-cols-2 xl:grid-cols-3">
          {items.map((item, i) => {
            const kind = projectKind(item);
            const proof =
              item.metrics?.[0]?.value ?? item.impact.split(/[.;]/)[0];
            const caseCta = item.disclosure.trim()
              ? t("readPatterns")
              : t("readCaseStudy");
            return (
              <li key={item.id}>
                <Reveal delay={i * 60} className="h-full">
                  <Link
                    href={getCaseStudyHref(item)}
                    className="card-interactive flex h-full flex-col gap-3.5 rounded-xl bg-[var(--bg-elevated)] p-6 hover:text-[var(--text-primary)] focus-visible:outline-none"
                  >
                    <div className="inline-flex w-fit items-center gap-2 rounded-full border border-[var(--border-subtle)] px-2.5 py-1 font-mono text-[11px] text-[var(--text-muted)]">
                      <span
                        className="h-1.5 w-1.5 rounded-full"
                        style={{ background: projectKindDot(kind) }}
                        aria-hidden
                      />
                      {kindLabel[kind]}
                    </div>
                    <div className="text-xl font-semibold tracking-tight text-[var(--text-primary)]">
                      {item.title}
                    </div>
                    <div className="text-pretty text-sm text-[var(--text-muted)]">
                      {item.problem}
                    </div>
                    <div className="mt-auto border-t border-[var(--border-subtle)] pt-3.5">
                      <div className="text-[13px] text-[var(--text-primary)]">
                        <span className="text-[var(--text-muted)]">
                          {t("proofLabel")} ·{" "}
                        </span>
                        {proof}
                      </div>
                      <div
                        className="link-more mt-2 text-[var(--text-primary)]"
                        data-arrow
                      >
                        {caseCta}
                      </div>
                    </div>
                  </Link>
                </Reveal>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
