import { getTranslations } from "next-intl/server";
import { articleToCardData } from "@/blog/recent-articles";
import { getRelatedArticles } from "@/data/articles";
import { Link } from "@/i18n/navigation";
import { ArticlePostCard } from "./ArticlePostCard";
import { Reveal } from "./Reveal";

type Props = {
  slug: string;
  locale: "en" | "fr";
};

export async function RelatedArticles({ slug, locale }: Props) {
  const related = getRelatedArticles(slug, 3);
  if (related.length === 0) return null;

  const t = await getTranslations("articlesPage");
  const tCommon = await getTranslations("common");

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
          <Link
            href="/articles"
            className="inline-flex min-h-11 shrink-0 items-center text-sm font-semibold text-accent transition hover:text-[var(--accent-blue-light)]"
          >
            {t("viewAllArticles")} →
          </Link>
        </div>
      </Reveal>

      <div className="mt-8 grid gap-x-8 gap-y-10 sm:mt-10 sm:grid-cols-2 sm:gap-y-14 lg:grid-cols-3">
        {related.map((article, i) => {
          const card = articleToCardData(article, locale);
          return (
            <Reveal key={article.slug} delay={i * 60}>
              <ArticlePostCard
                article={card}
                locale={locale}
                tagLabel={t(`kinds.${card.kind}`)}
                authorLabel={t("author")}
                readMoreLabel={t("readMore")}
                opensInNewTabLabel={tCommon("opensInNewTab")}
              />
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
