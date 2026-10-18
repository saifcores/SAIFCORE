import "@/global";
import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { hasLocale, type Locale } from "next-intl";
import {
  getMessages,
  getTranslations,
  setRequestLocale,
} from "next-intl/server";
import { notFound } from "next/navigation";
import { Analytics } from "@vercel/analytics/react";
import { BackToTop } from "@/components/portfolio/BackToTop";
import { StickyActionBar } from "@/components/portfolio/StickyActionBar";
import { ThemeProvider } from "@/components/portfolio/ThemeProvider";
import { routing } from "@/i18n/routing";
import { buildWebSiteJsonLd } from "@/seo";
import { getBlogIndexUrl, getSiteUrl } from "@/site";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = getSiteUrl();

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0B0F19" },
    { media: "(prefers-color-scheme: light)", color: "#F5F7FA" },
  ],
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({
    locale: locale as Locale,
    namespace: "meta",
  });

  const canonicalPath = locale === routing.defaultLocale ? "/" : `/${locale}`;
  const canonicalUrl = new URL(
    canonicalPath === "/" ? "/" : canonicalPath,
    `${siteUrl}/`,
  ).toString();

  return {
    metadataBase: new URL(siteUrl),
    title: t("title"),
    description: t("description"),
    applicationName: "SAIFCORE",
    alternates: {
      canonical: canonicalPath,
      languages: {
        en: routing.defaultLocale === "en" ? "/" : "/en",
        fr: "/fr",
        "x-default": routing.defaultLocale === "en" ? "/" : "/en",
      },
    },
    openGraph: {
      title: t("ogTitle"),
      description: t("ogDescription"),
      url: canonicalUrl,
      siteName: "SAIFCORE",
      locale: locale === "fr" ? "fr_FR" : "en_US",
      alternateLocale: locale === "fr" ? ["en_US"] : ["fr_FR"],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: t("ogTitle"),
      description: t("twitterDescription"),
    },
    robots: {
      index: true,
      follow: true,
    },
    keywords: t("keywords")
      .split(",")
      .map((k) => k.trim())
      .filter(Boolean),
  };
}

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  const messages = await getMessages();
  const tCommon = await getTranslations("common");
  const tMeta = await getTranslations("meta");
  const contentLoc = locale === "fr" ? "fr" : "en";
  const blogIndexUrl = getBlogIndexUrl(contentLoc);

  const websiteJsonLd = buildWebSiteJsonLd(locale, {
    name: "SAIFCORE",
    description: tMeta("description"),
    blogUrl: blogIndexUrl,
  });

  return (
    <html
      lang={locale}
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      data-scroll-behavior="smooth"
      data-theme="dark"
      data-theme-preference="dark"
      suppressHydrationWarning
    >
      <body
        className="min-h-full bg-bg-base font-sans text-text-primary"
        suppressHydrationWarning
      >
        {/*
         * FOUT prevention — runs synchronously before React hydrates.
         * Reads localStorage (or falls back to dark) and sets data-theme
         * on <html> so the correct CSS variables are active before paint.
         */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var p=localStorage.getItem("theme");if(p!=="light"&&p!=="dark"&&p!=="system")p="dark";var r=p;if(p==="system")r=matchMedia("(prefers-color-scheme:dark)").matches?"dark":"light";document.documentElement.dataset.theme=r;document.documentElement.dataset.themePreference=p;}catch(e){document.documentElement.dataset.theme="dark";document.documentElement.dataset.themePreference="dark";}})();`,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        <NextIntlClientProvider
          messages={{
            nav: messages.nav,
            common: messages.common,
            actionBar: messages.actionBar,
            theme: messages.theme,
            error: messages.error,
          }}
        >
          <ThemeProvider>
            <a
              href="#main-content"
              className="fixed left-4 top-[max(1rem,env(safe-area-inset-top))] z-[100] -translate-y-16 rounded-[12px] bg-[var(--btn-primary-bg)] px-4 py-2.5 text-sm font-medium text-[var(--btn-primary-fg)] opacity-0 transition focus:translate-y-0 focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-[var(--focus-ring)]"
            >
              {tCommon("skipToContent")}
            </a>
            {children}
            <BackToTop />
            <StickyActionBar />
          </ThemeProvider>
        </NextIntlClientProvider>
        <Analytics />
      </body>
    </html>
  );
}
