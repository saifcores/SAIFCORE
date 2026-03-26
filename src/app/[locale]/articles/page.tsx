import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import type { Locale } from "next-intl";
import { ArticleKindBadge } from "@/components/portfolio/ArticleKindBadge";
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
  setRequestLocale(locale);
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
        className="flex-1 outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/40 focus-visible:ring-offset-2 focus-visible:ring-offset-bg-base"
        tabIndex={-1}
      >
        <section className="border-b border-[var(--border-subtle)] px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
          <div className="mx-auto max-w-[1280px]">
            <Reveal>
              <Link
                href="/"
                className="text-sm font-medium text-[var(--accent-cyan)] transition hover:text-[var(--text-primary)]"
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

        <section className="px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-[1280px]">
            <div className="grid gap-8 lg:grid-cols-2">
              {articles.map((article, i) => {
                const href = article.externalUrl ?? `/articles/${article.slug}`;
                const external = !!article.externalUrl;
                return (
                  <Reveal key={article.slug} delay={i * 60}>
                    <article className="group flex h-full flex-col rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-elevated)]/40 p-8 transition hover:border-indigo-500/25 hover:shadow-[0_24px_48px_-12px_rgba(79,70,229,0.2)]">
                      <div className="flex flex-wrap items-center gap-2">
                        <ArticleKindBadge
                          kind={article.kind}
                          label={t(`kinds.${article.kind}`)}
                        />
                        <time
                          dateTime={article.publishedAt}
                          className="text-xs font-medium uppercase tracking-widest text-[var(--text-muted)]"
                        >
                          {t("published")} {formatDate(article.publishedAt)}
                        </time>
                      </div>
                      <h2 className="mt-4 text-xl font-semibold text-[var(--text-primary)]">
                        {article.title[loc]}
                      </h2>
                      <p className="mt-3 flex-1 text-[var(--text-secondary)] leading-relaxed">
                        {article.excerpt[loc]}
                      </p>
                      {external ? (
                        <a
                          href={href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-6 inline-flex items-center gap-1 text-sm font-medium text-[var(--accent-cyan)] transition group-hover:gap-2"
                        >
                          {t("readExternal")}
                          <span aria-hidden>→</span>
                        </a>
                      ) : (
                        <Link
                          href={href}
                          className="mt-6 inline-flex items-center gap-1 text-sm font-medium text-[var(--accent-cyan)] transition group-hover:gap-2"
                        >
                          {t("readArticle")}
                          <span aria-hidden>→</span>
                        </Link>
                      )}
                    </article>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
