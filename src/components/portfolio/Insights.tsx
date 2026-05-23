import { getLocale, getTranslations } from "next-intl/server";
import { articles } from "@/data/articles";
import { Link } from "@/i18n/navigation";
import { ContactBridgeStrip } from "./ContactBridgeStrip";
import { ArticleKindBadge } from "./ArticleKindBadge";
import { Reveal } from "./Reveal";

type Props = {
  /** Homepage teaser: no contact bridge strip */
  teaser?: boolean;
};

export async function Insights({ teaser = false }: Props) {
  const t = await getTranslations("insights");
  const tArticles = await getTranslations("articlesPage");
  const locale = await getLocale();
  const loc = locale === "fr" ? "fr" : "en";
  const preview = articles.slice(0, 3);

  return (
    <section
      id="insights"
      className={`px-4 py-24 sm:px-6 lg:px-8 ${teaser ? "border-b border-[var(--border-subtle)]" : "border-b border-[var(--border-subtle)]"}`}
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
              <Link
                href="/articles"
                className="inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold text-blue-400 transition hover:text-blue-300"
              >
                {t("viewAll")}
                <span aria-hidden>→</span>
              </Link>
            ) : null}
          </div>
        </Reveal>

        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {preview.map((article, i) => {
            const href = article.externalUrl ?? `/articles/${article.slug}`;
            const external = !!article.externalUrl;
            const CardContent = () => (
              <>
                <ArticleKindBadge
                  kind={article.kind}
                  label={tArticles(`kinds.${article.kind}`)}
                />
                <h3 className="mt-4 text-base font-semibold leading-snug text-[var(--text-primary)] transition group-hover:text-blue-400">
                  {article.title[loc]}
                </h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-[var(--text-secondary)] line-clamp-3">
                  {article.excerpt[loc]}
                </p>
                <div className="mt-5 flex items-center justify-between border-t border-[var(--border-subtle)] pt-4">
                  <span className="font-mono text-xs text-[var(--text-muted)]">
                    {article.publishedAt}
                  </span>
                  <span className="inline-flex items-center gap-1 text-xs font-semibold text-blue-400 transition group-hover:gap-2">
                    {external
                      ? tArticles("readExternal")
                      : tArticles("readArticle")}
                    <span aria-hidden>→</span>
                  </span>
                </div>
              </>
            );

            return (
              <Reveal key={article.slug} delay={i * 80}>
                {external ? (
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex h-full flex-col rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-elevated)]/20 p-6 transition hover:-translate-y-1 hover:border-white/12 hover:bg-[var(--bg-elevated)]/40"
                  >
                    <CardContent />
                  </a>
                ) : (
                  <Link
                    href={href}
                    className="group flex h-full flex-col rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-elevated)]/20 p-6 transition hover:-translate-y-1 hover:border-white/12 hover:bg-[var(--bg-elevated)]/40"
                  >
                    <CardContent />
                  </Link>
                )}
              </Reveal>
            );
          })}
        </div>

        {!teaser ? (
          <Reveal delay={200}>
            <div className="mt-10 flex items-center justify-between border-t border-[var(--border-subtle)] pt-8">
              <Link
                href="/articles"
                className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--text-secondary)] transition hover:text-[var(--text-primary)]"
              >
                {t("viewAll")}
                <span aria-hidden>→</span>
              </Link>
            </div>
          </Reveal>
        ) : (
          <Reveal delay={240}>
            <div className="mt-8 flex justify-center">
              <Link
                href="/articles"
                className="inline-flex items-center gap-2 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-elevated)]/30 px-6 py-3 text-sm font-semibold text-[var(--text-secondary)] transition hover:border-white/15 hover:text-[var(--text-primary)]"
              >
                {t("viewAll")}
                <span aria-hidden>→</span>
              </Link>
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
