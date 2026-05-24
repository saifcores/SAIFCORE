import type { Metadata } from "next";
import { routing } from "@/i18n/routing";
import { getSiteUrl } from "@/site";

/** Site path without locale prefix, e.g. `/about` or `/articles/my-slug`. */
export type SitePath = `/${string}` | "/";

function localePath(locale: string, path: SitePath): string {
  if (path === "/") {
    return locale === routing.defaultLocale ? "/" : `/${locale}`;
  }
  return locale === routing.defaultLocale ? path : `/${locale}${path}`;
}

function languageAlternates(path: SitePath): Record<string, string> {
  return Object.fromEntries(
    routing.locales.map((loc) => [loc, localePath(loc, path)]),
  );
}

type PageMetadataInput = {
  locale: string;
  path: SitePath;
  title: string;
  description: string;
  openGraphType?: "website" | "article";
  publishedTime?: string;
};

/** Canonical, hreflang, Open Graph, and Twitter metadata for locale-aware pages. */
export function buildPageMetadata({
  locale,
  path,
  title,
  description,
  openGraphType = "website",
  publishedTime,
}: PageMetadataInput): Metadata {
  const canonicalPath = localePath(locale, path);
  const url = new URL(
    canonicalPath === "/" ? "/" : canonicalPath,
    `${getSiteUrl()}/`,
  ).toString();

  return {
    title,
    description,
    alternates: {
      canonical: canonicalPath,
      languages: languageAlternates(path),
    },
    openGraph: {
      title,
      description,
      url,
      siteName: "SAIFCORE",
      locale: locale === "fr" ? "fr_FR" : "en_US",
      type: openGraphType,
      ...(publishedTime ? { publishedTime } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

type BreadcrumbItem = {
  name: string;
  path: SitePath;
};

export function buildBreadcrumbJsonLd(
  locale: string,
  items: BreadcrumbItem[],
): Record<string, unknown> {
  const base = getSiteUrl();

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: new URL(localePath(locale, item.path), `${base}/`).toString(),
    })),
  };
}
