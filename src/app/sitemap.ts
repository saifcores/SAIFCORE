import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { getSiteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = getSiteUrl();

  return routing.locales.map((locale) => {
    const path = locale === routing.defaultLocale ? "" : `/${locale}`;
    return {
      url: `${base}${path || "/"}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: locale === routing.defaultLocale ? 1 : 0.9,
      alternates: {
        languages: Object.fromEntries(
          routing.locales.map((loc) => {
            const p = loc === routing.defaultLocale ? "" : `/${loc}`;
            return [loc, `${base}${p || "/"}`] as const;
          }),
        ),
      },
    };
  });
}
