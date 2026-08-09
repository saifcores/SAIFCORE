import type { Locale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import { permanentRedirect } from "next/navigation";
import { buildPageMetadata } from "@/seo";
import { getBlogIndexLanguageAlternates, getBlogIndexUrl } from "@/site";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({
    locale: locale as Locale,
    namespace: "articlesPage",
  });
  const loc = locale === "fr" ? "fr" : "en";
  const blogUrl = getBlogIndexUrl(loc);
  const blogAlternates = getBlogIndexLanguageAlternates();

  const meta = buildPageMetadata({
    locale,
    path: "/articles",
    title: t("metaTitle"),
    description: t("metaDescription"),
  });

  if (blogUrl) {
    return {
      ...meta,
      alternates: {
        ...meta.alternates,
        canonical: blogUrl,
        languages: blogAlternates ?? meta.alternates?.languages,
      },
      openGraph: {
        ...meta.openGraph,
        url: blogUrl,
      },
    };
  }

  return meta;
}

/** Articles index redirects to SAIFCORE Blog when configured. */
export default async function ArticlesPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale as Locale);
  const loc = locale === "fr" ? "fr" : "en";
  const blogUrl = getBlogIndexUrl(loc);

  if (blogUrl) {
    permanentRedirect(blogUrl);
  }

  // Blog URL required — no local article catalog.
  permanentRedirect("/");
}
