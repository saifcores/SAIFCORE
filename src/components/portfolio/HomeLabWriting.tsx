import { getLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import {
  fetchRecentArticles,
  formatPublishedDate,
} from "@/blog/recent-articles";
import { getBlogIndexUrl } from "@/site";
import { Reveal } from "./Reveal";

export async function HomeLabWriting() {
  const tLab = await getTranslations("labPage");
  const tInsights = await getTranslations("insights");
  const tCommon = await getTranslations("common");
  const locale = await getLocale();
  const loc = locale === "fr" ? "fr" : "en";
  const articles = await fetchRecentArticles(loc, 2);
  const blogIndexUrl = getBlogIndexUrl(loc);
  const opensInNewTab = tCommon("opensInNewTab");

  return (
    <section id="lab" className="section-home scroll-mt-24 xl:scroll-mt-28">
      <div className="page-container grid gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16">
        <Reveal>
          <div className="flex flex-col gap-3">
            <p className="site-kicker">{tLab("label")}</p>
            <h2 className="section-heading">{tLab("title")}</h2>
            <p className="max-w-[46ch] text-[15px] text-[var(--text-muted)]">
              {tLab("subtitle")}
            </p>
            <Link href="/lab" className="link-more pt-1">
              {tLab("viewAll")}
            </Link>
          </div>
        </Reveal>

        <Reveal delay={60}>
          <div className="flex flex-col">
            <div className="flex justify-between border-b border-[var(--border-subtle)] pb-3 font-mono text-xs uppercase tracking-[0.08em] text-[var(--text-muted)]">
              <span>{tInsights("title")}</span>
              {blogIndexUrl ? (
                <a
                  href={blogIndexUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${tInsights("viewAll")} (${opensInNewTab})`}
                  className="link-more"
                  data-arrow
                >
                  {tInsights("viewAll")}
                </a>
              ) : (
                <Link href="/articles" className="link-more" data-arrow>
                  {tInsights("viewAll")}
                </Link>
              )}
            </div>
            {articles.map((article) => (
              <a
                key={article.href}
                href={article.href}
                target={article.external ? "_blank" : undefined}
                rel={article.external ? "noopener noreferrer" : undefined}
                aria-label={
                  article.external
                    ? `${formatPublishedDate(article.publishedAt, loc)}, ${
                        article.title
                      } (${opensInNewTab})`
                    : undefined
                }
                className="flex flex-col gap-1 border-b border-[var(--border-subtle)] py-4 transition-colors hover:text-[var(--text-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus-ring)]"
              >
                <span className="font-mono text-xs text-[var(--text-muted)]">
                  {formatPublishedDate(article.publishedAt, loc)}
                </span>
                <span className="text-[17px] font-semibold text-[var(--text-primary)]">
                  {article.title}
                </span>
              </a>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
