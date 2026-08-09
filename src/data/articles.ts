import type { ArticleKind, ContentBlock } from "./article-content";
import { bodyToBlocks } from "./article-content";

export type { ArticleKind, ContentBlock } from "./article-content";

/**
 * Local article catalog — intentionally empty.
 * Full articles live on SAIFCORE Blog (`NEXT_PUBLIC_BLOG_URL`).
 * Portfolio Insights fetch the latest posts from the blog API.
 */
export type Article = {
  slug: string;
  /** ISO date (YYYY-MM-DD) */
  publishedAt: string;
  /** writing · code · design · adr · document */
  kind: ArticleKind;
  title: { en: string; fr: string };
  excerpt: { en: string; fr: string };
  /** Full article hosted elsewhere (opens in a new tab from the list/detail). */
  externalUrl?: string;
  blocks?: ContentBlock[];
  /** @deprecated Prefer `blocks`; still supported for simple prose-only pieces. */
  body?: { en: string[]; fr: string[] };
};

export const articles: Article[] = [];

export function getArticleBySlug(slug: string): Article | undefined {
  return articles.find((a) => a.slug === slug);
}

export function getLatestArticles(limit?: number): Article[] {
  const sorted = [...articles].sort((a, b) =>
    b.publishedAt.localeCompare(a.publishedAt),
  );
  return limit ? sorted.slice(0, limit) : sorted;
}

/** Same-kind articles first, then newest — excludes the current slug. */
export function getRelatedArticles(slug: string, limit = 3): Article[] {
  const current = getArticleBySlug(slug);
  if (!current) return [];

  const byDate = (a: Article, b: Article) =>
    b.publishedAt.localeCompare(a.publishedAt);

  const others = articles.filter((a) => a.slug !== slug);
  const sameKind = others.filter((a) => a.kind === current.kind).sort(byDate);
  const rest = others.filter((a) => a.kind !== current.kind).sort(byDate);

  return [...sameKind, ...rest].slice(0, limit);
}

export function getArticleBlocks(article: Article): ContentBlock[] {
  if (article.blocks?.length) return article.blocks;
  if (article.body) return bodyToBlocks(article.body);
  return [];
}
