import type { Article } from "@/data/articles";
import { getBlogArticleUrl } from "@/site";

export type ArticleLink = {
  href: string;
  external: boolean;
};

/** Portfolio article card / list link — blog when configured, else internal route. */
export function getArticleLink(
  article: Article,
  locale: "en" | "fr",
): ArticleLink {
  if (article.externalUrl) {
    return { href: article.externalUrl, external: true };
  }

  const blogUrl = getBlogArticleUrl(article.slug, locale);
  if (blogUrl) {
    return { href: blogUrl, external: true };
  }

  return { href: `/articles/${article.slug}`, external: false };
}
