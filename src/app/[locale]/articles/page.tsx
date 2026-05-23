import type { Locale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import { ArticleKindBadge } from "@/components/portfolio/ArticleKindBadge";
import { ContactBridgeStrip } from "@/components/portfolio/ContactBridgeStrip";
import { Footer } from "@/components/portfolio/Footer";
import { Navbar } from "@/components/portfolio/Navbar";
import { Reveal } from "@/components/portfolio/Reveal";
import { articles } from "@/data/articles";
import { Link } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";

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
  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    alternates: {
      canonical:
        locale === routing.defaultLocale ? "/articles" : `/${locale}/articles`,
    },
  };
}

export default async function ArticlesPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale as Locale);
  const t = await getTranslations("articlesPage");
  const loc = locale === "fr" ? "fr" : "en";

  const formatDate = (iso: string) =>
    new Intl.DateTimeFormat(loc === "fr" ? "fr-FR" : "en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(new Date(iso));

  return (
    <div className="flex min-h-full flex-col">
      <Navbar />
      <main
        id="main-content"
        className="flex-1 pb-24 outline-none focus-visible:ring-2 focus-visible:ring-blue-500/40 focus-visible:ring-offset-2 focus-visible:ring-offset-bg-base md:pb-0"
        tabIndex={-1}
      >
        {/* Header */}
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
              <p className="mt-4 max-w-2xl text-lg text-[var(--text-secondary)]">
                {t("subtitle")}
              </p>
            </Reveal>
          </div>
        </section>

        {/* Article grid */}
        <section className="px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-[1280px]">
            <div className="grid gap-6 lg:grid-cols-2">
              {articles.map((article, i) => {
                const href = article.externalUrl ?? `/articles/${article.slug}`;
                const external = !!article.externalUrl;
                return (
                  <Reveal key={article.slug} delay={i * 60}>
                    <article className="group flex h-full flex-col rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-elevated)]/20 p-8 transition hover:-translate-y-1 hover:border-white/12 hover:bg-[var(--bg-elevated)]/40">
                      <div className="flex flex-wrap items-center gap-2">
                        <ArticleKindBadge
                          kind={article.kind}
                          label={t(`kinds.${article.kind}`)}
                        />
                        <time
                          dateTime={article.publishedAt}
                          className="font-mono text-xs text-[var(--text-muted)]"
                        >
                          {formatDate(article.publishedAt)}
                        </time>
                      </div>
                      <h2 className="mt-4 text-xl font-semibold tracking-tight text-[var(--text-primary)] transition group-hover:text-blue-400">
                        {article.title[loc]}
                      </h2>
                      <p className="mt-3 flex-1 text-sm leading-relaxed text-[var(--text-secondary)]">
                        {article.excerpt[loc]}
                      </p>
                      <div className="mt-6 flex items-center justify-between border-t border-[var(--border-subtle)] pt-4">
                        {external ? (
                          <a
                            href={href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue-400 transition group-hover:gap-2.5"
                          >
                            {t("readExternal")}
                            <span aria-hidden>→</span>
                          </a>
                        ) : (
                          <Link
                            href={href}
                            className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue-400 transition group-hover:gap-2.5"
                          >
                            {t("readArticle")}
                            <span aria-hidden>→</span>
                          </Link>
                        )}
                      </div>
                    </article>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>

        {/* CTA */}
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
