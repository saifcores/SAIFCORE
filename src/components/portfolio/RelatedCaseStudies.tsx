import { getMessages, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { getCaseStudyHref, getRelatedCaseStudies } from "@/data/case-studies";
import { Reveal } from "./Reveal";

type Props = {
  slug: string;
};

export async function RelatedCaseStudies({ slug }: Props) {
  const messages = await getMessages();
  const related = getRelatedCaseStudies(slug, messages.featuredProjects.items);
  if (related.length === 0) return null;

  const t = await getTranslations("articlesPage");
  const tFeatured = await getTranslations("featuredProjects");

  return (
    <section
      className="mt-12 border-t border-[var(--border-subtle)] pt-12 sm:mt-16 sm:pt-16"
      aria-labelledby="related-case-studies-heading"
    >
      <Reveal>
        <h2
          id="related-case-studies-heading"
          className="text-pretty text-xl font-bold tracking-tight text-[var(--text-primary)] sm:text-2xl"
        >
          {t("relatedCaseStudiesTitle")}
        </h2>
        <p className="mt-2 max-w-xl text-pretty text-sm text-[var(--text-secondary)] sm:text-base">
          {t("relatedCaseStudiesSubtitle")}
        </p>
      </Reveal>

      <ul className="mt-8 grid gap-4 sm:mt-10 sm:grid-cols-2">
        {related.map((item, i) => (
          <li key={item.title}>
            <Reveal delay={i * 60}>
              <Link
                href={getCaseStudyHref(item.title)}
                className="group flex h-full flex-col rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-elevated)]/20 p-5 transition hover:border-[var(--border-hover)] hover:bg-[var(--bg-elevated)]/40 sm:p-6"
              >
                <p className="text-xs font-medium uppercase tracking-[0.16em] text-[var(--text-muted)]">
                  {tFeatured("title")}
                </p>
                <h3 className="mt-2 text-base font-semibold text-[var(--text-primary)] transition group-hover:text-accent sm:text-lg">
                  {item.title}
                </h3>
                <p className="mt-2 line-clamp-2 flex-1 text-sm leading-relaxed text-[var(--text-secondary)]">
                  {item.solution}
                </p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-[var(--accent-blue)]">
                  {tFeatured("readCaseStudy")}
                  <span aria-hidden>→</span>
                </span>
              </Link>
            </Reveal>
          </li>
        ))}
      </ul>
    </section>
  );
}
