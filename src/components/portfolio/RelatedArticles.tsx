import { getTranslations } from "next-intl/server";
import { fetchRecentArticles } from "@/blog/recent-articles";
import { getBlogIndexUrl } from "@/site";
import { ArticlePostCard } from "./ArticlePostCard";
import { Reveal } from "./Reveal";

type Props = {
  slug: string;
  locale: "en" | "fr";
};

/** Related posts from the blog API (excludes current slug). */
export async function RelatedArticles({ slug, locale }: Props) {
  const recent = await fetchRecentArticles(locale, 4);
  const related = recent.filter((article) => article.slug !== slug).slice(0, 3);
  if (related.length === 0) return null;

  const t = await getTranslations("articlesPage");
  const tCommon = await getTranslations("common");
  const blogIndexUrl = getBlogIndexUrl(locale);
  const opensInNewTab = tCommon("opensInNewTab");

  return (
    <section
      className="border-t border-[var(--border-subtle)] pt-12 sm:pt-16"
      aria-labelledby="related-articles-heading"
    >
      <Reveal>
        <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-end sm:justify-between">
          <div className="min-w-0">
            <h2
              id="related-articles-heading"
              className="text-pretty text-xl font-bold tracking-tight text-[var(--text-primary)] sm:text-2xl"
            >
              {t("relatedTitle")}
            </h2>
            <p className="mt-2 max-w-xl text-pretty text-sm text-[var(--text-secondary)] sm:text-base">
              {t("relatedSubtitle")}
            </p>
          </div>
          {blogIndexUrl ? (
            <a
              href={blogIndexUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${t("viewAllArticles")} (${opensInNewTab})`}
              className="inline-flex min-h-11 shrink-0 items-center text-sm font-semibold text-accent transition hover:text-[var(--accent-blue-light)]"
            >
              {t("viewAllArticles")} ↗
            </a>
          ) : null}
        </div>
      </Reveal>

      <div className="mt-8 grid gap-x-8 gap-y-10 sm:mt-10 sm:grid-cols-2 sm:gap-y-14 lg:grid-cols-3">
        {related.map((article, i) => (
          <Reveal key={article.slug} delay={i * 60}>
            <ArticlePostCard
              article={article}
              locale={locale}
              tagLabel={t(`kinds.${article.kind}`)}
              authorLabel={t("author")}
              readMoreLabel={t("readMore")}
              opensInNewTabLabel={opensInNewTab}
            />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
