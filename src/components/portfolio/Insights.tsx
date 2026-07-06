import { getLocale, getTranslations } from "next-intl/server";
import { articles } from "@/data/articles";
import { getArticleLink } from "@/blog/article-links";
import { Link } from "@/i18n/navigation";
import { getBlogIndexUrl } from "@/site";
import { ArticlePostCard } from "./ArticlePostCard";
import { ContactBridgeStrip } from "./ContactBridgeStrip";
import { Reveal } from "./Reveal";

type Props = {
  /** Homepage teaser: no contact bridge strip */
  teaser?: boolean;
};

export async function Insights({ teaser = false }: Props) {
  const t = await getTranslations("insights");
  const tArticles = await getTranslations("articlesPage");
  const tCommon = await getTranslations("common");
  const locale = await getLocale();
  const loc = locale === "fr" ? "fr" : "en";
  const preview = articles.slice(0, 3);
  const blogIndexUrl = getBlogIndexUrl(loc);
  const viewAllHref = blogIndexUrl ?? "/articles";
  const viewAllExternal = !!blogIndexUrl;
  const opensInNewTab = tCommon("opensInNewTab");

  return (
    <section
      id="insights"
      className="border-b border-[var(--border-subtle)] px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24"
    >
      <div className="mx-auto max-w-[1280px]">
        <Reveal>
          <div
            className={
              teaser ? "flex flex-wrap items-end justify-between gap-4" : ""
            }
          >
            <div>
              <p className="mb-4 text-xs font-medium uppercase tracking-[0.18em] text-[var(--text-muted)]">
                {t("title")}
              </p>
              <h2 className="max-w-2xl text-3xl font-bold tracking-tight text-[var(--text-primary)] sm:text-4xl">
                {t("subtitle")}
              </h2>
            </div>
            {teaser ? (
              viewAllExternal ? (
                <a
                  href={viewAllHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${t("viewAll")} (${opensInNewTab})`}
                  className="inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold text-accent transition hover:text-[var(--accent-blue-light)]"
                >
                  {t("viewAll")}
                  <span aria-hidden>↗</span>
                </a>
              ) : (
                <Link
                  href={viewAllHref}
                  className="inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold text-accent transition hover:text-[var(--accent-blue-light)]"
                >
                  {t("viewAll")}
                  <span aria-hidden>→</span>
                </Link>
              )
            ) : null}
          </div>
        </Reveal>

        <div className="mt-14 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          {preview.map((article, i) => {
            const link = getArticleLink(article, loc);
            return (
              <Reveal key={article.slug} delay={i * 80}>
                <ArticlePostCard
                  article={article}
                  locale={loc}
                  href={link.href}
                  external={link.external}
                  tagLabel={tArticles(`kinds.${article.kind}`)}
                  authorLabel={tArticles("author")}
                  readMoreLabel={tArticles("readMore")}
                  opensInNewTabLabel={opensInNewTab}
                />
              </Reveal>
            );
          })}
        </div>

        {!teaser ? (
          <Reveal delay={200}>
            <div className="mt-10 flex items-center justify-between border-t border-[var(--border-subtle)] pt-8">
              {viewAllExternal ? (
                <a
                  href={viewAllHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${t("viewAll")} (${opensInNewTab})`}
                  className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--text-secondary)] transition hover:text-[var(--text-primary)]"
                >
                  {t("viewAll")}
                  <span aria-hidden>↗</span>
                </a>
              ) : (
                <Link
                  href={viewAllHref}
                  className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--text-secondary)] transition hover:text-[var(--text-primary)]"
                >
                  {t("viewAll")}
                  <span aria-hidden>→</span>
                </Link>
              )}
            </div>
          </Reveal>
        ) : (
          <Reveal delay={240}>
            <div className="mt-8 flex justify-center">
              {viewAllExternal ? (
                <a
                  href={viewAllHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${t("viewAll")} (${opensInNewTab})`}
                  className="inline-flex items-center gap-2 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-elevated)]/30 px-6 py-3 text-sm font-semibold text-[var(--text-secondary)] transition hover:border-[var(--border-hover)] hover:text-[var(--text-primary)]"
                >
                  {t("viewAll")}
                  <span aria-hidden>↗</span>
                </a>
              ) : (
                <Link
                  href={viewAllHref}
                  className="inline-flex items-center gap-2 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-elevated)]/30 px-6 py-3 text-sm font-semibold text-[var(--text-secondary)] transition hover:border-[var(--border-hover)] hover:text-[var(--text-primary)]"
                >
                  {t("viewAll")}
                  <span aria-hidden>→</span>
                </Link>
              )}
            </div>
          </Reveal>
        )}

        {!teaser ? (
          <div className="mt-16">
            <ContactBridgeStrip ns="insights" />
          </div>
        ) : null}
      </div>
    </section>
  );
}
