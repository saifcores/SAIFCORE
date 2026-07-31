import type { Locale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import { permanentRedirect } from "next/navigation";
import { ArticlePostCard } from "@/components/portfolio/ArticlePostCard";
import { ContactBridgeStrip } from "@/components/portfolio/ContactBridgeStrip";
import { Footer } from "@/components/portfolio/Footer";
import { Navbar } from "@/components/portfolio/Navbar";
import { PageHeader } from "@/components/portfolio/PageHeader";
import { Reveal } from "@/components/portfolio/Reveal";
import { articleToCardData } from "@/blog/recent-articles";
import { getLatestArticles } from "@/data/articles";
import {
  buildCollectionPageJsonLd,
  buildPageMetadata,
  buildWebPageGraph,
} from "@/seo";
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

export default async function ArticlesPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale as Locale);
  const loc = locale === "fr" ? "fr" : "en";
  const blogUrl = getBlogIndexUrl(loc);

  if (blogUrl) {
    permanentRedirect(blogUrl);
  }

  const t = await getTranslations("articlesPage");
  const tCommon = await getTranslations("common");

  const collectionNode = buildCollectionPageJsonLd(locale, {
    name: t("metaTitle"),
    description: t("metaDescription"),
    path: "/articles",
    items: getLatestArticles().map((article) => ({
      name: article.title[loc],
      slug: article.slug,
    })),
  });
  const { "@context": _collectionContext, ...collectionPage } = collectionNode;

  const pageJsonLd = buildWebPageGraph({
    locale,
    path: "/articles",
    pageName: t("metaTitle"),
    pageDescription: t("metaDescription"),
    breadcrumb: [
      { name: tCommon("home"), path: "/" },
      { name: t("title"), path: "/articles" },
    ],
    extraNodes: [collectionPage],
  });

  return (
    <div className="flex min-h-full flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pageJsonLd) }}
      />
      <Navbar />
      <main
        id="main-content"
        className="flex-1 pb-28 outline-none focus-visible:ring-2 focus-visible:ring-blue-500/40 focus-visible:ring-offset-2 focus-visible:ring-offset-bg-base xl:pb-0"
        tabIndex={-1}
      >
        <PageHeader
          title={t("title")}
          subtitle={t("subtitle")}
          backLabel={t("backToHome")}
          actionVariant="balanced"
        />

        <section className="px-4 py-10 sm:px-6 sm:py-12 lg:px-8">
          <div className="mx-auto max-w-[1280px]">
            <div className="grid gap-x-8 gap-y-10 sm:grid-cols-2 sm:gap-y-14 lg:grid-cols-3">
              {getLatestArticles().map((article, i) => {
                const card = articleToCardData(article, loc);
                return (
                  <Reveal key={article.slug} delay={i * 60}>
                    <ArticlePostCard
                      article={card}
                      locale={loc}
                      tagLabel={t(`kinds.${card.kind}`)}
                      authorLabel={t("author")}
                      readMoreLabel={t("readMore")}
                      opensInNewTabLabel={tCommon("opensInNewTab")}
                    />
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>

        <div className="px-4 pb-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-[1280px]">
            <ContactBridgeStrip ns="articlesPage" showPackages />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
