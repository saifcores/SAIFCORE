import { getLocale, getTranslations } from "next-intl/server";
import { articles } from "@/data/articles";
import { Link } from "@/i18n/navigation";
import { ArticleKindBadge } from "./ArticleKindBadge";
import { Reveal } from "./Reveal";

export async function Insights() {
  const t = await getTranslations("insights");
  const tArticles = await getTranslations("articlesPage");
  const locale = await getLocale();
  const loc = locale === "fr" ? "fr" : "en";
  const preview = articles.slice(0, 3);

  return (
    <section
      id="insights"
      className="border-t border-[var(--border-subtle)] bg-[var(--bg-elevated)]/20 px-4 py-24 sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-[1280px]">
        <Reveal>
          <h2 className="text-3xl font-bold tracking-tight text-[var(--text-primary)] sm:text-4xl">
            {t("title")}
          </h2>
          <p className="mt-4 max-w-2xl text-[var(--text-secondary)]">
            {t("subtitle")}
          </p>
        </Reveal>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {preview.map((article, i) => {
            const href = article.externalUrl ?? `/articles/${article.slug}`;
            const external = !!article.externalUrl;
            return (
              <Reveal key={article.slug} delay={i * 80}>
                {external ? (
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group block h-full rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-base)]/60 p-6 transition hover:-translate-y-1 hover:border-indigo-500/25 hover:shadow-lg hover:shadow-indigo-500/10"
                  >
                    <ArticleKindBadge
                      kind={article.kind}
                      label={tArticles(`kinds.${article.kind}`)}
                    />
                    <h3 className="mt-3 text-lg font-semibold text-[var(--text-primary)] transition group-hover:text-[var(--accent-indigo)]">
                      {article.title[loc]}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-[var(--text-secondary)]">
                      {article.excerpt[loc]}
                    </p>
                    <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-[var(--accent-cyan)]">
                      {tArticles("readExternal")}
                      <span
                        aria-hidden
                        className="transition group-hover:translate-x-0.5"
                      >
                        →
                      </span>
                    </span>
                  </a>
                ) : (
                  <Link
                    href={href}
                    className="group block h-full rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-base)]/60 p-6 transition hover:-translate-y-1 hover:border-indigo-500/25 hover:shadow-lg hover:shadow-indigo-500/10"
                  >
                    <ArticleKindBadge
                      kind={article.kind}
                      label={tArticles(`kinds.${article.kind}`)}
                    />
                    <h3 className="mt-3 text-lg font-semibold text-[var(--text-primary)] transition group-hover:text-[var(--accent-indigo)]">
                      {article.title[loc]}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-[var(--text-secondary)]">
                      {article.excerpt[loc]}
                    </p>
                    <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-[var(--accent-cyan)]">
                      {tArticles("readArticle")}
                      <span
                        aria-hidden
                        className="transition group-hover:translate-x-0.5"
                      >
                        →
                      </span>
                    </span>
                  </Link>
                )}
              </Reveal>
            );
          })}
        </div>

        <Reveal delay={200}>
          <div className="mt-12 text-center">
            <Link
              href="/articles"
              className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--accent-cyan)] transition hover:text-[var(--text-primary)]"
            >
              {t("viewAll")}
              <span aria-hidden>→</span>
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
