import { getLocale, getTranslations } from "next-intl/server";
import { fetchRecentArticles } from "@/blog/recent-articles";
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
  const preview = await fetchRecentArticles(loc, 3);
  const blogIndexUrl = getBlogIndexUrl(loc);
  const viewAllHref = blogIndexUrl ?? "/articles";
  const viewAllExternal = !!blogIndexUrl;
  const opensInNewTab = tCommon("opensInNewTab");

  return (
    <section
      id="insights"
      aria-labelledby="insights-heading"
      className={`border-b border-[var(--border-subtle)] px-4 sm:px-6 lg:px-8 ${
        teaser ? "py-10 sm:py-12 lg:py-16" : "py-12 sm:py-16 lg:py-24"
      }`}
    >
      <div className="mx-auto max-w-[1280px]">
        <Reveal>
          <div
            className={
              teaser
                ? "flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-end sm:justify-between"
                : ""
            }
          >
            <div>
              <p className="mb-4 text-xs font-medium uppercase tracking-[0.18em] text-[var(--text-muted)]">
                {t("title")}
              </p>
              <h2
                id="insights-heading"
                className="max-w-2xl text-pretty text-2xl font-bold tracking-tight text-[var(--text-primary)] sm:text-3xl md:text-4xl"
              >
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
                  className="inline-flex min-h-11 w-full shrink-0 items-center justify-center gap-1.5 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-elevated)]/30 px-4 text-sm font-semibold text-accent transition hover:border-[var(--border-hover)] hover:text-[var(--accent-blue-light)] sm:w-auto sm:border-0 sm:bg-transparent sm:px-0"
                >
                  {t("viewAll")}
                  <span aria-hidden>↗</span>
                </a>
              ) : (
                <Link
                  href={viewAllHref}
                  className="inline-flex min-h-11 w-full shrink-0 items-center justify-center gap-1.5 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-elevated)]/30 px-4 text-sm font-semibold text-accent transition hover:border-[var(--border-hover)] hover:text-[var(--accent-blue-light)] sm:w-auto sm:border-0 sm:bg-transparent sm:px-0"
                >
                  {t("viewAll")}
                  <span aria-hidden>→</span>
                </Link>
              )
            ) : null}
          </div>
        </Reveal>

        {blogIndexUrl && !teaser ? (
          <Reveal delay={60}>
            <a
              href={blogIndexUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${t("blogPromoTitle")} (${opensInNewTab})`}
              className="mt-8 flex flex-col gap-4 rounded-2xl border border-blue-500/20 bg-gradient-to-br from-blue-500/10 to-emerald-500/5 p-5 transition hover:border-blue-500/35 sm:mt-10 sm:flex-row sm:items-center sm:justify-between sm:p-6"
            >
              <div className="min-w-0">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-accent">
                  {t("blogPromoTitle")}
                </p>
                <p className="mt-2 text-pretty text-sm leading-relaxed text-[var(--text-secondary)] sm:text-base">
                  {t("blogPromoBody")}
                </p>
              </div>
              <span className="inline-flex min-h-11 shrink-0 items-center justify-center rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-elevated)]/40 px-4 text-sm font-semibold text-accent">
                {tArticles("blogCta")}
                <span aria-hidden className="ml-1.5">
                  ↗
                </span>
              </span>
            </a>
          </Reveal>
        ) : null}

        {preview.length > 0 ? (
          <div className="mt-8 grid gap-x-6 gap-y-8 sm:mt-10 sm:grid-cols-2 sm:gap-y-10 lg:grid-cols-3">
            {preview.map((article, i) => (
              <Reveal key={article.slug} delay={i * 80}>
                <ArticlePostCard
                  article={article}
                  locale={loc}
                  tagLabel={tArticles(`kinds.${article.kind}`)}
                  authorLabel={tArticles("author")}
                  readMoreLabel={tArticles("readMore")}
                  opensInNewTabLabel={opensInNewTab}
                />
              </Reveal>
            ))}
          </div>
        ) : null}

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
        ) : null}

        {!teaser ? (
          <div className="mt-16">
            <ContactBridgeStrip ns="insights" showPackages />
          </div>
        ) : null}
      </div>
    </section>
  );
}
