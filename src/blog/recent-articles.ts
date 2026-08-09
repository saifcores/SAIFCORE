import type { ArticleKind } from "@/data/article-content";
import { getBlogUrl } from "@/site";

const ARTICLE_KINDS = new Set<ArticleKind>([
  "writing",
  "code",
  "design",
  "adr",
  "document",
]);

export type BlogArticle = {
  slug: string;
  title: string;
  excerpt: string;
  kind: ArticleKind;
  publishedAt: string;
  readingTime: string;
  tags: string[];
  url: string;
  coverImage: string;
};

export type BlogArticlesResponse = {
  articles: BlogArticle[];
};

/** Locale-resolved article shape for portfolio cards. */
export type ArticleCardData = {
  slug: string;
  title: string;
  excerpt: string;
  kind: ArticleKind;
  publishedAt: string;
  href: string;
  external: boolean;
  coverImage: string | null;
};

function isArticleKind(value: unknown): value is ArticleKind {
  return typeof value === "string" && ARTICLE_KINDS.has(value as ArticleKind);
}

function parseBlogArticle(raw: unknown): BlogArticle | null {
  if (!raw || typeof raw !== "object") return null;
  const item = raw as Record<string, unknown>;
  if (
    typeof item.slug !== "string" ||
    typeof item.title !== "string" ||
    typeof item.excerpt !== "string" ||
    !isArticleKind(item.kind) ||
    typeof item.publishedAt !== "string" ||
    typeof item.url !== "string"
  ) {
    return null;
  }

  return {
    slug: item.slug,
    title: item.title,
    excerpt: item.excerpt,
    kind: item.kind,
    publishedAt: item.publishedAt,
    readingTime: typeof item.readingTime === "string" ? item.readingTime : "",
    tags: Array.isArray(item.tags)
      ? item.tags.filter((tag): tag is string => typeof tag === "string")
      : [],
    url: item.url,
    coverImage: typeof item.coverImage === "string" ? item.coverImage : "",
  };
}

function blogArticleToCardData(article: BlogArticle): ArticleCardData {
  return {
    slug: article.slug,
    title: article.title,
    excerpt: article.excerpt,
    kind: article.kind,
    publishedAt: article.publishedAt,
    href: article.url,
    external: true,
    coverImage: article.coverImage || null,
  };
}

/**
 * Latest articles for Insights / JSON-LD — blog API only.
 * No local catalog fallback (articles live on SAIFCORE Blog).
 */
export async function fetchRecentArticles(
  locale: "en" | "fr",
  limit = 3,
): Promise<ArticleCardData[]> {
  const blog = getBlogUrl();
  if (!blog) {
    console.error(
      "[blog] NEXT_PUBLIC_BLOG_URL is not set — cannot load recent articles",
    );
    return [];
  }

  const capped = Math.min(Math.max(limit, 1), 10);
  const url = `${blog}/api/articles?locale=${locale}&limit=${capped}`;

  try {
    const response = await fetch(url, {
      next: { revalidate: 3600 },
      signal: AbortSignal.timeout(5000),
    });

    if (!response.ok) {
      console.error(
        `[blog] recent articles HTTP ${response.status} for ${url}`,
      );
      return [];
    }

    const data: unknown = await response.json();
    if (
      !data ||
      typeof data !== "object" ||
      !Array.isArray((data as BlogArticlesResponse).articles)
    ) {
      console.error("[blog] recent articles: unexpected response shape");
      return [];
    }

    return (data as BlogArticlesResponse).articles
      .map(parseBlogArticle)
      .filter((article): article is BlogArticle => article !== null)
      .map(blogArticleToCardData);
  } catch (error) {
    console.error("[blog] recent articles fetch failed:", error);
    return [];
  }
}
