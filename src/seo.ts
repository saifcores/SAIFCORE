import type { Metadata } from "next";
import { routing } from "@/i18n/routing";
import { getProfileDisplayName, getSiteUrl } from "@/site";

/** Site path without locale prefix, e.g. `/about` or `/articles/my-slug`. */
export type SitePath = `/${string}` | "/";

function localePath(locale: string, path: SitePath): string {
  if (path === "/") {
    return locale === routing.defaultLocale ? "/" : `/${locale}`;
  }
  return locale === routing.defaultLocale ? path : `/${locale}${path}`;
}

function languageAlternates(path: SitePath): Record<string, string> {
  const locales = Object.fromEntries(
    routing.locales.map((loc) => [loc, localePath(loc, path)]),
  );
  return {
    ...locales,
    "x-default": localePath(routing.defaultLocale, path),
  };
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
      alternateLocale: locale === "fr" ? ["en_US"] : ["fr_FR"],
      type: openGraphType,
      ...(publishedTime ? { publishedTime } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

type BreadcrumbItem = {
  name: string;
  path: SitePath;
};

function pageLanguage(locale: string): string {
  return locale === "fr" ? "fr-FR" : "en-US";
}

function personIdForLocale(locale: string): string {
  return `${getLocalePageUrl(locale, "/")}#person`;
}

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

type ArticleJsonLdInput = {
  title: string;
  description: string;
  slug: string;
  publishedAt: string;
};

/** BlogPosting JSON-LD for on-site article pages. */
export function buildArticleJsonLd(
  locale: string,
  { title, description, slug, publishedAt }: ArticleJsonLdInput,
): Record<string, unknown> {
  const path = `/articles/${slug}` as SitePath;
  const url = new URL(localePath(locale, path), `${getSiteUrl()}/`).toString();

  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: title,
    description,
    datePublished: `${publishedAt}T12:00:00.000Z`,
    author: {
      "@type": "Organization",
      name: "SAIFCORE",
      url: getSiteUrl(),
    },
    publisher: {
      "@type": "Organization",
      name: "SAIFCORE",
      url: getSiteUrl(),
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
    url,
    inLanguage: locale === "fr" ? "fr-FR" : "en-US",
  };
}

type CollectionPageJsonLdInput = {
  name: string;
  description: string;
  path: SitePath;
  items?: { name: string; slug: string }[];
};

/** CollectionPage JSON-LD for article index and similar listing pages. */
export function buildCollectionPageJsonLd(
  locale: string,
  { name, description, path, items }: CollectionPageJsonLdInput,
): Record<string, unknown> {
  const base = getSiteUrl();
  const url = new URL(localePath(locale, path), `${base}/`).toString();

  const jsonLd: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name,
    description,
    url,
    inLanguage: locale === "fr" ? "fr-FR" : "en-US",
  };

  if (items?.length) {
    jsonLd.mainEntity = {
      "@type": "ItemList",
      itemListElement: items.map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: item.name,
        url: new URL(
          localePath(locale, `/articles/${item.slug}`),
          `${base}/`,
        ).toString(),
      })),
    };
  }

  return jsonLd;
}

type ArticleItemListInput = {
  name: string;
  items: { name: string; slug: string }[];
};

/** Standalone ItemList JSON-LD (e.g. homepage insights teaser). */
export function buildArticleItemListJsonLd(
  locale: string,
  { name, items }: ArticleItemListInput,
): Record<string, unknown> {
  const base = getSiteUrl();

  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name,
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      url: new URL(
        localePath(locale, `/articles/${item.slug}`),
        `${base}/`,
      ).toString(),
    })),
  };
}

type ExternalItemListInput = {
  name: string;
  items: { name: string; url: string }[];
};

/** ItemList JSON-LD with absolute URLs (e.g. external blog articles). */
export function buildExternalItemListJsonLd({
  name,
  items,
}: ExternalItemListInput): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name,
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      url: item.url,
    })),
  };
}

type WebSiteJsonLdInput = {
  name: string;
  description: string;
  blogUrl?: string | null;
};

/** Site-wide WebSite JSON-LD for rich results and entity linking. */
export function buildWebSiteJsonLd(
  locale: string,
  { name, description, blogUrl }: WebSiteJsonLdInput,
): Record<string, unknown> {
  const url = new URL(localePath(locale, "/"), `${getSiteUrl()}/`).toString();

  const jsonLd: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name,
    alternateName: "SAIFCORE",
    description,
    url,
    inLanguage: locale === "fr" ? "fr-FR" : "en-US",
    publisher: {
      "@type": "Organization",
      name: "SAIFCORE",
      url: getSiteUrl(),
    },
  };

  if (blogUrl) {
    jsonLd.relatedLink = blogUrl;
  }

  return jsonLd;
}

/** Absolute URL for a locale-aware site path. */
export function getLocalePageUrl(locale: string, path: SitePath): string {
  return new URL(localePath(locale, path), `${getSiteUrl()}/`).toString();
}

/** Absolute homepage URL for a locale. */
export function getLocaleHomeUrl(locale: string): string {
  return getLocalePageUrl(locale, "/");
}

/** Stable slug for case study titles (anchors + JSON-LD `@id`). */
export function caseStudySlug(title: string): string {
  return title
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

type ProfilePageGraphInput = {
  locale: string;
  path: SitePath;
  pageName: string;
  pageDescription: string;
  jobTitle: string;
  personDescription: string;
  breadcrumb: BreadcrumbItem[];
  personExtras?: Record<string, unknown>;
};

/** BreadcrumbList + Person + ProfilePage + WebPage in one `@graph`. */
export function buildProfilePageGraph({
  locale,
  path,
  pageName,
  pageDescription,
  jobTitle,
  personDescription,
  breadcrumb,
  personExtras = {},
}: ProfilePageGraphInput): Record<string, unknown> {
  const pageUrl = getLocalePageUrl(locale, path);
  const siteUrl = getSiteUrl();
  const personId = personIdForLocale(locale);

  const personNode: Record<string, unknown> = {
    "@type": "Person",
    "@id": personId,
    name: getProfileDisplayName(),
    alternateName: "SAIFCORE",
    jobTitle,
    description: personDescription,
    url: siteUrl,
    image: new URL("/profile.png", `${siteUrl}/`).toString(),
    ...personExtras,
  };

  const profilePageNode = {
    "@type": "ProfilePage",
    "@id": `${pageUrl}#profilepage`,
    name: pageName,
    description: pageDescription,
    url: pageUrl,
    inLanguage: pageLanguage(locale),
    mainEntity: { "@id": personId },
  };

  const webPageNode = {
    "@type": "WebPage",
    "@id": `${pageUrl}#webpage`,
    url: pageUrl,
    name: pageName,
    description: pageDescription,
    inLanguage: pageLanguage(locale),
    isPartOf: { "@type": "WebSite", name: "SAIFCORE", url: siteUrl },
    about: { "@id": personId },
    mainEntity: { "@id": personId },
  };

  return buildJsonLdGraph(
    buildBreadcrumbJsonLd(locale, breadcrumb),
    personNode,
    profilePageNode,
    webPageNode,
  );
}

type WebPageGraphInput = {
  locale: string;
  path: SitePath;
  pageName: string;
  pageDescription: string;
  breadcrumb: BreadcrumbItem[];
  extraNodes?: Record<string, unknown>[];
};

/** BreadcrumbList + WebPage (+ optional nodes) in one `@graph`. */
export function buildWebPageGraph({
  locale,
  path,
  pageName,
  pageDescription,
  breadcrumb,
  extraNodes = [],
}: WebPageGraphInput): Record<string, unknown> {
  const pageUrl = getLocalePageUrl(locale, path);
  const siteUrl = getSiteUrl();

  const webPageNode = {
    "@type": "WebPage",
    "@id": `${pageUrl}#webpage`,
    url: pageUrl,
    name: pageName,
    description: pageDescription,
    inLanguage: pageLanguage(locale),
    isPartOf: { "@type": "WebSite", name: "SAIFCORE", url: siteUrl },
  };

  return buildJsonLdGraph(
    buildBreadcrumbJsonLd(locale, breadcrumb),
    webPageNode,
    ...extraNodes,
  );
}

type ArticlePageGraphInput = {
  locale: string;
  slug: string;
  breadcrumb: BreadcrumbItem[];
  title: string;
  description: string;
  publishedAt: string;
};

/** BreadcrumbList + BlogPosting + WebPage in one `@graph`. */
export function buildArticlePageGraph({
  locale,
  slug,
  breadcrumb,
  title,
  description,
  publishedAt,
}: ArticlePageGraphInput): Record<string, unknown> {
  const pageUrl = getLocalePageUrl(locale, `/articles/${slug}`);
  const { "@context": _articleContext, ...blogPosting } = buildArticleJsonLd(
    locale,
    { title, description, slug, publishedAt },
  );

  const webPageNode = {
    "@type": "WebPage",
    "@id": `${pageUrl}#webpage`,
    url: pageUrl,
    name: title,
    description,
    inLanguage: pageLanguage(locale),
    mainEntity: blogPosting,
  };

  return buildJsonLdGraph(
    buildBreadcrumbJsonLd(locale, breadcrumb),
    blogPosting,
    webPageNode,
  );
}

/** Merge nodes into a single JSON-LD `@graph` document. */
export function buildJsonLdGraph(
  ...nodes: Record<string, unknown>[]
): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@graph": nodes.map(({ "@context": _context, ...node }) => node),
  };
}

export type OfferPackageInput = {
  name: string;
  description: string;
  category?: string;
};

type OfferCatalogInput = {
  locale: string;
  catalogName: string;
  catalogDescription: string;
  packages: OfferPackageInput[];
  areaServed: string;
  availability: string;
};

/** OfferCatalog + Offer nodes for engagement packages on the home page. */
export function buildOfferCatalogNodes({
  locale,
  catalogName,
  catalogDescription,
  packages,
  areaServed,
  availability,
}: OfferCatalogInput): {
  catalog: Record<string, unknown>;
  offers: Record<string, unknown>[];
} {
  const homeUrl = getLocaleHomeUrl(locale);
  const personId = personIdForLocale(locale);
  const catalogId = `${homeUrl}#offer-catalog`;
  const offersUrl = `${homeUrl}#offers`;

  const offers = packages.map((pkg, index) => {
    const slug = caseStudySlug(pkg.name);
    return {
      "@type": "Offer",
      "@id": `${homeUrl}#offer-${slug || index}`,
      name: pkg.name,
      description: pkg.description,
      url: offersUrl,
      category: pkg.category,
      areaServed,
      availableAtOrFrom: {
        "@type": "Place",
        name: availability,
      },
      itemOffered: {
        "@type": "Service",
        name: pkg.name,
        description: pkg.description,
        provider: { "@id": personId },
        serviceType: pkg.category,
        areaServed,
      },
    };
  });

  return {
    catalog: {
      "@type": "OfferCatalog",
      "@id": catalogId,
      name: catalogName,
      description: catalogDescription,
      url: offersUrl,
      numberOfItems: packages.length,
      itemListElement: offers.map((offer, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: { "@id": offer["@id"] },
      })),
    },
    offers,
  };
}

export type FaqItemInput = {
  question: string;
  answer: string;
};

/** FAQPage JSON-LD for common buying / hiring questions. */
export function buildFaqPageJsonLd(
  locale: string,
  items: FaqItemInput[],
): Record<string, unknown> {
  const homeUrl = getLocaleHomeUrl(locale);

  return {
    "@type": "FAQPage",
    "@id": `${homeUrl}#faq`,
    url: `${homeUrl}#faq`,
    inLanguage: pageLanguage(locale),
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

export type CaseStudyJsonLdInput = {
  name: string;
  description: string;
  url: string;
  externalUrl?: string;
  keywords?: string[];
};

type SystemsPageGraphInput = {
  locale: string;
  pageName: string;
  pageDescription: string;
  breadcrumb: BreadcrumbItem[];
  caseStudies: CaseStudyJsonLdInput[];
};

/** BreadcrumbList + WebPage + CollectionPage + CreativeWork ItemList for `/systems`. */
export function buildSystemsPageGraph({
  locale,
  pageName,
  pageDescription,
  breadcrumb,
  caseStudies,
}: SystemsPageGraphInput): Record<string, unknown> {
  const pageUrl = getLocalePageUrl(locale, "/systems");
  const siteUrl = getSiteUrl();
  const personId = personIdForLocale(locale);

  const creativeWorks = caseStudies.map((study) => {
    const slug = caseStudySlug(study.name);
    const workUrl = study.externalUrl?.trim() || study.url;

    return {
      "@type": "CreativeWork",
      "@id": `${pageUrl}#case-${slug}`,
      name: study.name,
      description: study.description,
      url: workUrl,
      inLanguage: pageLanguage(locale),
      author: { "@id": personId },
      ...(study.keywords?.length
        ? { keywords: study.keywords.join(", ") }
        : {}),
    };
  });

  const itemList = {
    "@type": "ItemList",
    "@id": `${pageUrl}#case-studies`,
    name: pageName,
    numberOfItems: caseStudies.length,
    itemListElement: caseStudies.map((study, index) => {
      const slug = caseStudySlug(study.name);
      const workUrl = study.externalUrl?.trim() || study.url;

      return {
        "@type": "ListItem",
        position: index + 1,
        name: study.name,
        url: workUrl,
        item: { "@id": `${pageUrl}#case-${slug}` },
      };
    }),
  };

  const collectionPage = {
    "@type": "CollectionPage",
    "@id": `${pageUrl}#collection`,
    name: pageName,
    description: pageDescription,
    url: pageUrl,
    inLanguage: pageLanguage(locale),
    mainEntity: { "@id": `${pageUrl}#case-studies` },
  };

  const webPageNode = {
    "@type": "WebPage",
    "@id": `${pageUrl}#webpage`,
    url: pageUrl,
    name: pageName,
    description: pageDescription,
    inLanguage: pageLanguage(locale),
    isPartOf: { "@type": "WebSite", name: "SAIFCORE", url: siteUrl },
    mainEntity: { "@id": `${pageUrl}#collection` },
  };

  return buildJsonLdGraph(
    buildBreadcrumbJsonLd(locale, breadcrumb),
    webPageNode,
    collectionPage,
    itemList,
    ...creativeWorks,
  );
}
