import type { MetadataRoute } from "next";
import { articles } from "@/data/articles";
import { routing } from "@/i18n/routing";
import { getSiteUrl } from "@/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = getSiteUrl();
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of routing.locales) {
    const prefix = locale === routing.defaultLocale ? "" : `/${locale}`;

    const homeUrl = `${base}${prefix || "/"}`;
    entries.push({
      url: homeUrl,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: locale === routing.defaultLocale ? 1 : 0.9,
      alternates: {
        languages: Object.fromEntries(
          routing.locales.map((loc) => {
            const p = loc === routing.defaultLocale ? "" : `/${loc}`;
            return [loc, `${base}${p || "/"}`] as const;
          }),
        ),
      },
    });

    const articlesIndexUrl = `${base}${prefix}/articles`;
    entries.push({
      url: articlesIndexUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.85,
      alternates: {
        languages: Object.fromEntries(
          routing.locales.map((loc) => {
            const p = loc === routing.defaultLocale ? "" : `/${loc}`;
            return [loc, `${base}${p}/articles`] as const;
          }),
        ),
      },
    });

    const systemsUrl = `${base}${prefix}/systems`;
    entries.push({
      url: systemsUrl,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
      alternates: {
        languages: Object.fromEntries(
          routing.locales.map((loc) => {
            const p = loc === routing.defaultLocale ? "" : `/${loc}`;
            return [loc, `${base}${p}/systems`] as const;
          }),
        ),
      },
    });

    const experienceUrl = `${base}${prefix}/experience`;
    entries.push({
      url: experienceUrl,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.85,
      alternates: {
        languages: Object.fromEntries(
          routing.locales.map((loc) => {
            const p = loc === routing.defaultLocale ? "" : `/${loc}`;
            return [loc, `${base}${p}/experience`] as const;
          }),
        ),
      },
    });

    const aboutUrl = `${base}${prefix}/about`;
    entries.push({
      url: aboutUrl,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
      alternates: {
        languages: Object.fromEntries(
          routing.locales.map((loc) => {
            const p = loc === routing.defaultLocale ? "" : `/${loc}`;
            return [loc, `${base}${p}/about`] as const;
          }),
        ),
      },
    });

    const certificationsUrl = `${base}${prefix}/certifications`;
    entries.push({
      url: certificationsUrl,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.82,
      alternates: {
        languages: Object.fromEntries(
          routing.locales.map((loc) => {
            const p = loc === routing.defaultLocale ? "" : `/${loc}`;
            return [loc, `${base}${p}/certifications`] as const;
          }),
        ),
      },
    });

    for (const article of articles) {
      const articleUrl = `${base}${prefix}/articles/${article.slug}`;
      entries.push({
        url: articleUrl,
        lastModified: new Date(article.publishedAt),
        changeFrequency: "monthly",
        priority: 0.75,
        alternates: {
          languages: Object.fromEntries(
            routing.locales.map((loc) => {
              const p = loc === routing.defaultLocale ? "" : `/${loc}`;
              return [loc, `${base}${p}/articles/${article.slug}`] as const;
            }),
          ),
        },
      });
    }
  }

  return entries;
}
