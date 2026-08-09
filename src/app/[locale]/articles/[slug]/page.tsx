import { setRequestLocale } from "next-intl/server";
import type { Locale } from "next-intl";
import type { Metadata } from "next";
import { notFound, permanentRedirect } from "next/navigation";
import { buildPageMetadata } from "@/seo";
import { getBlogArticleLanguageAlternates, getBlogArticleUrl } from "@/site";

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

/** No local article pages — content lives on SAIFCORE Blog. */
export function generateStaticParams() {
  return [];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const loc = locale === "fr" ? "fr" : "en";
  const blogUrl = getBlogArticleUrl(slug, loc);

  if (blogUrl) {
    const languages = getBlogArticleLanguageAlternates(slug);
    const meta = buildPageMetadata({
      locale,
      path: `/articles/${slug}`,
      title: "SAIFCORE",
      description: "",
      openGraphType: "article",
    });
    return {
      ...meta,
      alternates: {
        ...meta.alternates,
        canonical: blogUrl,
        languages: languages ?? meta.alternates?.languages,
      },
      openGraph: {
        ...meta.openGraph,
        url: blogUrl,
      },
    };
  }

  return {};
}

export default async function ArticlePage({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale as Locale);
  const loc = locale === "fr" ? "fr" : "en";

  const blogUrl = getBlogArticleUrl(slug, loc);
  if (blogUrl) {
    permanentRedirect(blogUrl);
  }

  notFound();
}
