import type { MetadataRoute } from "next";
import { articles } from "@/data/articles";
import { hasObtainedCertifications } from "@/data/certifications";
import { routing } from "@/i18n/routing";
import { getBlogUrl, getSiteUrl } from "@/site";

function localeAlternates(base: string, path: string): Record<string, string> {
  const suffix = path === "/" ? "" : path;
  const languages = Object.fromEntries(
    routing.locales.map((loc) => {
      const prefix = loc === routing.defaultLocale ? "" : `/${loc}`;
      return [loc, `${base}${prefix}${suffix || "/"}`] as const;
    }),
  );
  return {
    ...languages,
    "x-default": `${base}${suffix || "/"}`,
  };
}

export default function sitemap(): MetadataRoute.Sitemap {
  const base = getSiteUrl();
  const entries: MetadataRoute.Sitemap = [];

  const blogUrl = getBlogUrl();

  for (const locale of routing.locales) {
    const prefix = locale === routing.defaultLocale ? "" : `/${locale}`;

    const homeUrl = `${base}${prefix || "/"}`;
    entries.push({
      url: homeUrl,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: locale === routing.defaultLocale ? 1 : 0.9,
      alternates: {
        languages: localeAlternates(base, "/"),
      },
    });

    const articlesIndexUrl = `${base}${prefix}/articles`;
    if (!blogUrl) {
      entries.push({
        url: articlesIndexUrl,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: 0.85,
        alternates: {
          languages: localeAlternates(base, "/articles"),
        },
      });
    }

    const systemsUrl = `${base}${prefix}/systems`;
    entries.push({
      url: systemsUrl,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
      alternates: {
        languages: localeAlternates(base, "/systems"),
      },
    });

    const experienceUrl = `${base}${prefix}/experience`;
    entries.push({
      url: experienceUrl,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.85,
      alternates: {
        languages: localeAlternates(base, "/experience"),
      },
    });

    const aboutUrl = `${base}${prefix}/about`;
    entries.push({
      url: aboutUrl,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
      alternates: {
        languages: localeAlternates(base, "/about"),
      },
    });

    const licenseUrl = `${base}${prefix}/license`;
    entries.push({
      url: licenseUrl,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
      alternates: {
        languages: localeAlternates(base, "/license"),
      },
    });

    if (hasObtainedCertifications()) {
      const certificationsUrl = `${base}${prefix}/certifications`;
      entries.push({
        url: certificationsUrl,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.82,
        alternates: {
          languages: localeAlternates(base, "/certifications"),
        },
      });
    }

    if (!blogUrl) {
      for (const article of articles) {
        const articleUrl = `${base}${prefix}/articles/${article.slug}`;
        entries.push({
          url: articleUrl,
          lastModified: new Date(article.publishedAt),
          changeFrequency: "monthly",
          priority: 0.75,
          alternates: {
            languages: localeAlternates(base, `/articles/${article.slug}`),
          },
        });
      }
    }
  }

  return entries;
}
