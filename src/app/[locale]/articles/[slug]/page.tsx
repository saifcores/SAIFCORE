import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Locale } from "next-intl";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArticleBody } from "@/components/portfolio/ArticleBody";
import { ArticleKindBadge } from "@/components/portfolio/ArticleKindBadge";
import { ContactBridgeStrip } from "@/components/portfolio/ContactBridgeStrip";
import { Footer } from "@/components/portfolio/Footer";
import { Navbar } from "@/components/portfolio/Navbar";
import { Reveal } from "@/components/portfolio/Reveal";
import { articles, getArticleBlocks, getArticleBySlug } from "@/data/articles";
import { Link } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { getSiteUrl } from "@/site";

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
  const base = getSiteUrl();
  const path =
    locale === routing.defaultLocale
      ? `/articles/${slug}`
      : `/${locale}/articles/${slug}`;
  return {
    title: `${article.title[loc]} | SAIFCORE`,
    description: article.excerpt[loc],
    alternates: { canonical: path },
    openGraph: {
      title: `${article.title[loc]} | SAIFCORE`,
      description: article.excerpt[loc],
      url: new URL(path, `${base}/`).toString(),
      type: "article",
      publishedTime: `${article.publishedAt}T12:00:00.000Z`,
    },
  };
}

export default async function ArticlePage({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale as Locale);
  const article = getArticleBySlug(slug);
  if (!article) {
    notFound();
  }

  const t = await getTranslations("articlesPage");
  const loc = locale === "fr" ? "fr" : "en";

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

  return (
    <div className="flex min-h-full flex-col">
      <Navbar />
      <main
        id="main-content"
        className="flex-1 pb-24 outline-none focus-visible:ring-2 focus-visible:ring-blue-500/40 focus-visible:ring-offset-2 focus-visible:ring-offset-bg-base md:pb-0"
        tabIndex={-1}
      >
        <article className="border-b border-[var(--border-subtle)] px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
          <div className="mx-auto max-w-[720px]">
            <Reveal>
              <nav aria-label="Breadcrumb">
                <Link
                  href="/articles"
                  className="text-sm font-medium text-[var(--text-muted)] transition hover:text-[var(--text-primary)]"
                >
                  ← {t("title")}
                </Link>
              </nav>
              <div className="mt-6 flex flex-wrap items-center gap-3">
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
              <h1 className="mt-4 text-3xl font-bold tracking-tight text-[var(--text-primary)] sm:text-4xl sm:leading-tight">
                {article.title[loc]}
              </h1>
              <p className="mt-6 text-lg leading-relaxed text-[var(--text-secondary)]">
                {article.excerpt[loc]}
              </p>
              {external ? (
                <a
                  href={external}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary btn-primary-lg inline-flex h-12 items-center justify-center px-8 text-sm"
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

        <div className="px-4 pb-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-[720px]">
            <ContactBridgeStrip ns="articlesPage" />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
