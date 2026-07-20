import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Locale } from "next-intl";
import type { Metadata } from "next";
import { notFound, permanentRedirect } from "next/navigation";
import { ArticleBody } from "@/components/portfolio/ArticleBody";
import { ArticleKindBadge } from "@/components/portfolio/ArticleKindBadge";
import { ContactBridgeStrip } from "@/components/portfolio/ContactBridgeStrip";
import { Footer } from "@/components/portfolio/Footer";
import { Navbar } from "@/components/portfolio/Navbar";
import { ProfileFactChips } from "@/components/portfolio/ProfileFactChips";
import { RecruiterActionBar } from "@/components/portfolio/RecruiterActionBar";
import { RelatedArticles } from "@/components/portfolio/RelatedArticles";
import { RelatedCaseStudies } from "@/components/portfolio/RelatedCaseStudies";
import { Reveal } from "@/components/portfolio/Reveal";
import { articles, getArticleBlocks, getArticleBySlug } from "@/data/articles";
import { Link } from "@/i18n/navigation";
import { buildArticlePageGraph, buildPageMetadata } from "@/seo";
import { getBlogArticleLanguageAlternates, getBlogArticleUrl } from "@/site";

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

export function generateStaticParams() {
  return articles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) return {};
  const loc = locale === "fr" ? "fr" : "en";
  const title = `${article.title[loc]} | SAIFCORE`;
  const blogUrl = getBlogArticleUrl(slug, loc);

  const meta = buildPageMetadata({
    locale,
    path: `/articles/${slug}`,
    title,
    description: article.excerpt[loc],
    openGraphType: "article",
    publishedTime: `${article.publishedAt}T12:00:00.000Z`,
  });

  if (blogUrl) {
    const languages = getBlogArticleLanguageAlternates(slug);
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

  return meta;
}

export default async function ArticlePage({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale as Locale);
  const article = getArticleBySlug(slug);
  if (!article) {
    notFound();
  }

  const loc = locale === "fr" ? "fr" : "en";

  if (article.externalUrl) {
    permanentRedirect(article.externalUrl);
  }

  const blogUrl = getBlogArticleUrl(slug, loc);
  if (blogUrl) {
    permanentRedirect(blogUrl);
  }

  const t = await getTranslations("articlesPage");
  const tCommon = await getTranslations("common");

  const formatDate = (iso: string) =>
    new Intl.DateTimeFormat(loc === "fr" ? "fr-FR" : "en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(new Date(iso));

  const blocks = getArticleBlocks(article);
  const external = article.externalUrl;

  const bodyLabels = {
    adrStatus: t("adrStatus"),
    adrContext: t("adrLabelContext"),
    adrDecision: t("adrLabelDecision"),
    adrConsequences: t("adrLabelConsequences"),
  };

  const pageJsonLd = buildArticlePageGraph({
    locale,
    slug,
    breadcrumb: [
      { name: tCommon("home"), path: "/" },
      { name: t("title"), path: "/articles" },
      { name: article.title[loc], path: `/articles/${slug}` },
    ],
    title: article.title[loc],
    description: article.excerpt[loc],
    publishedAt: article.publishedAt,
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
        <article className="border-b border-[var(--border-subtle)] px-4 py-10 sm:px-6 sm:py-12 md:py-16 lg:px-8">
          <div className="mx-auto max-w-[720px]">
            <Reveal>
              <nav aria-label={t("breadcrumbLabel")}>
                <ol className="flex flex-wrap items-center gap-x-1.5 gap-y-1 text-sm">
                  <li>
                    <Link
                      href="/"
                      className="font-medium text-[var(--text-muted)] transition hover:text-[var(--text-primary)]"
                    >
                      {tCommon("home")}
                    </Link>
                  </li>
                  <li aria-hidden="true" className="text-[var(--text-muted)]">
                    /
                  </li>
                  <li>
                    <Link
                      href="/articles"
                      className="font-medium text-[var(--text-muted)] transition hover:text-[var(--text-primary)]"
                    >
                      {t("title")}
                    </Link>
                  </li>
                </ol>
              </nav>
              <div className="mt-4 flex flex-wrap items-center gap-2 sm:mt-6 sm:gap-3">
                <ArticleKindBadge
                  kind={article.kind}
                  label={t(`kinds.${article.kind}`)}
                />
                <time
                  dateTime={article.publishedAt}
                  className="text-sm text-[var(--text-muted)]"
                >
                  {t("published")} {formatDate(article.publishedAt)}
                </time>
              </div>
              <h1 className="mt-3 text-pretty text-2xl font-bold tracking-tight text-[var(--text-primary)] sm:mt-4 sm:text-3xl md:text-4xl md:leading-tight">
                {article.title[loc]}
              </h1>
              <p className="mt-4 text-pretty text-sm leading-relaxed text-[var(--text-secondary)] sm:mt-6 sm:text-base md:text-lg">
                {article.excerpt[loc]}
              </p>
              <ProfileFactChips className="mt-5 sm:mt-6" />
              <RecruiterActionBar
                className="mt-5 border-t border-[var(--border-subtle)] pt-5 sm:mt-6 sm:pt-6"
                hideContactLink
              />
              {external ? (
                <a
                  href={external}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary btn-primary-lg mt-8 inline-flex h-12 w-full items-center justify-center px-8 text-sm sm:w-auto"
                >
                  {t("readExternal")}
                </a>
              ) : null}
            </Reveal>

            {blocks.length > 0 ? (
              <ArticleBody blocks={blocks} locale={loc} labels={bodyLabels} />
            ) : null}
          </div>
        </article>

        <div className="px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-[1280px]">
            <RelatedArticles slug={slug} locale={loc} />
            <RelatedCaseStudies slug={slug} />
          </div>
        </div>

        <div className="px-4 pb-16 pt-8 sm:px-6 sm:pt-10 lg:px-8">
          <div className="mx-auto max-w-[720px]">
            <ContactBridgeStrip ns="articlesPage" />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
