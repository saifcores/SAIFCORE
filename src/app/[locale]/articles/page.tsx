import type { Locale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import { permanentRedirect } from "next/navigation";
import { ArticlePostCard } from "@/components/portfolio/ArticlePostCard";
import { ContactBridgeStrip } from "@/components/portfolio/ContactBridgeStrip";
import { Footer } from "@/components/portfolio/Footer";
import { Navbar } from "@/components/portfolio/Navbar";
import { Reveal } from "@/components/portfolio/Reveal";
import { articles } from "@/data/articles";
import { getArticleLink } from "@/blog/article-links";
import { Link } from "@/i18n/navigation";
import { buildBreadcrumbJsonLd, buildPageMetadata } from "@/seo";
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

  if (blogUrl && blogAlternates) {
    return {
      title: t("metaTitle"),
      description: t("metaDescription"),
      alternates: {
        canonical: blogUrl,
        languages: blogAlternates,
      },
    };
  }

  return buildPageMetadata({
    locale,
    path: "/articles",
    title: t("metaTitle"),
    description: t("metaDescription"),
  });
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

  const breadcrumbJsonLd = buildBreadcrumbJsonLd(locale, [
    { name: tCommon("home"), path: "/" },
    { name: t("title"), path: "/articles" },
  ]);

  return (
    <div className="flex min-h-full flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <Navbar />
      <main
        id="main-content"
        className="flex-1 pb-24 outline-none focus-visible:ring-2 focus-visible:ring-blue-500/40 focus-visible:ring-offset-2 focus-visible:ring-offset-bg-base md:pb-0"
        tabIndex={-1}
      >
        <section className="border-b border-[var(--border-subtle)] px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
          <div className="mx-auto max-w-[1280px]">
            <Reveal>
              <Link
                href="/"
                className="text-sm font-medium text-[var(--text-muted)] transition hover:text-[var(--text-primary)]"
              >
                ← {t("backToHome")}
              </Link>
              <h1 className="mt-8 text-3xl font-bold tracking-tight text-[var(--text-primary)] sm:text-4xl">
                {t("title")}
              </h1>
              <p className="mt-4 max-w-2xl text-base text-[var(--text-secondary)] sm:text-lg">
                {t("subtitle")}
              </p>
            </Reveal>
          </div>
        </section>

        <section className="px-4 py-16 sm:py-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-[1280px]">
            <div className="grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
              {articles.map((article, i) => {
                const link = getArticleLink(article, loc);
                return (
                  <Reveal key={article.slug} delay={i * 60}>
                    <ArticlePostCard
                      article={article}
                      locale={loc}
                      href={link.href}
                      external={link.external}
                      tagLabel={t(`kinds.${article.kind}`)}
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
            <ContactBridgeStrip ns="articlesPage" />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
