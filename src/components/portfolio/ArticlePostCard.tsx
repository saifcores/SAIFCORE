import Image from "next/image";
import type { Article } from "@/data/articles";
import { getBlogArticleCover } from "@/blog/article-covers";
import { Link } from "@/i18n/navigation";

type Props = {
  article: Article;
  locale: "en" | "fr";
  href: string;
  external: boolean;
  tagLabel: string;
  authorLabel: string;
  readMoreLabel: string;
  opensInNewTabLabel: string;
};

function CardAnchor({
  href,
  external,
  className,
  children,
  tabIndex,
  ariaHidden,
  ariaLabel,
}: {
  href: string;
  external: boolean;
  className?: string;
  children: React.ReactNode;
  tabIndex?: number;
  ariaHidden?: boolean;
  ariaLabel?: string;
}) {
  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
        tabIndex={tabIndex}
        aria-hidden={ariaHidden}
        aria-label={ariaLabel}
      >
        {children}
      </a>
    );
  }

  return (
    <Link
      href={href}
      className={className}
      tabIndex={tabIndex}
      aria-hidden={ariaHidden}
    >
      {children}
    </Link>
  );
}

export function ArticlePostCard({
  article,
  locale,
  href,
  external,
  tagLabel,
  authorLabel,
  readMoreLabel,
  opensInNewTabLabel,
}: Props) {
  const loc = locale;
  const coverSrc = getBlogArticleCover(article.slug);
  const title = article.title[loc];
  const externalTitleLabel = external
    ? `${title} (${opensInNewTabLabel})`
    : undefined;
  const externalReadMoreLabel = external
    ? `${readMoreLabel} (${opensInNewTabLabel})`
    : undefined;

  const formatDate = (iso: string) =>
    new Intl.DateTimeFormat(loc === "fr" ? "fr-FR" : "en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }).format(new Date(iso));

  return (
    <article className="post-card group flex h-full flex-col">
      {coverSrc ? (
        <CardAnchor
          href={href}
          external={external}
          className="post-card-image-link relative block aspect-[16/10] overflow-hidden rounded-xl bg-[var(--bg-code)]"
          tabIndex={-1}
          ariaHidden
        >
          <Image
            src={coverSrc}
            alt=""
            fill
            unoptimized
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="post-card-image object-cover"
          />
        </CardAnchor>
      ) : null}

      <div
        className={
          coverSrc ? "mt-5 flex flex-1 flex-col" : "flex flex-1 flex-col"
        }
      >
        <CardAnchor
          href={href}
          external={external}
          className="inline-flex w-fit text-[11px] font-bold uppercase tracking-[0.16em] text-accent transition hover:text-[var(--accent-blue-light)]"
        >
          {tagLabel}
        </CardAnchor>

        <h3 className="post-card-title mt-3 text-xl font-bold leading-snug tracking-tight text-[var(--text-primary)] sm:text-[1.35rem]">
          <CardAnchor
            href={href}
            external={external}
            className="transition group-hover:text-accent"
            ariaLabel={externalTitleLabel}
          >
            {title}
          </CardAnchor>
        </h3>

        <p className="post-card-excerpt mt-3 flex-1 text-[15px] leading-relaxed text-[var(--text-secondary)] line-clamp-3">
          {article.excerpt[loc]}
        </p>

        <footer className="post-card-meta mt-5 flex items-center justify-between gap-4 border-t border-[var(--border-subtle)] pt-4">
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-[var(--text-primary)]">
              {authorLabel}
            </p>
            <time
              dateTime={article.publishedAt}
              className="text-xs text-[var(--text-muted)]"
            >
              {formatDate(article.publishedAt)}
            </time>
          </div>
          <CardAnchor
            href={href}
            external={external}
            className="shrink-0 text-sm font-semibold text-accent transition hover:text-[var(--accent-blue-light)]"
            ariaLabel={externalReadMoreLabel}
          >
            {readMoreLabel}
          </CardAnchor>
        </footer>
      </div>
    </article>
  );
}
