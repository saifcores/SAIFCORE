import type { Locale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import { Footer } from "@/components/portfolio/Footer";
import { Navbar } from "@/components/portfolio/Navbar";
import { PageHeader } from "@/components/portfolio/PageHeader";
import { Reveal } from "@/components/portfolio/Reveal";
import { routing } from "@/i18n/routing";
import { buildPageMetadata, buildWebPageGraph } from "@/seo";

const MIT_LICENSE_TEXT = `MIT License

Copyright (c) 2026 SAIFCORE

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.`;

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateStaticParams() {
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
    namespace: "licensePage",
  });
  return buildPageMetadata({
    locale,
    path: "/license",
    title: t("metaTitle"),
    description: t("metaDescription"),
  });
}

export default async function LicensePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale as Locale);
  const t = await getTranslations("licensePage");
  const tCommon = await getTranslations("common");

  const pageJsonLd = buildWebPageGraph({
    locale,
    path: "/license",
    pageName: t("metaTitle"),
    pageDescription: t("metaDescription"),
    breadcrumb: [
      { name: tCommon("home"), path: "/" },
      { name: t("title"), path: "/license" },
    ],
  });

  return (
    <div className="flex min-h-full flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pageJsonLd) }}
      />
      <Navbar />
      <main
        id="main-content"
        className="flex-1 pb-28 outline-none focus-visible:ring-2 focus-visible:ring-blue-500/40 focus-visible:ring-offset-2 focus-visible:ring-offset-bg-base xl:pb-0"
        tabIndex={-1}
      >
        <PageHeader
          title={t("title")}
          subtitle={t("intro")}
          backLabel={t("backToHome")}
        />

        <section className="px-4 py-10 sm:px-6 sm:py-12 lg:px-8">
          <div className="mx-auto max-w-[1280px]">
            <Reveal>
              <h2 className="text-base font-semibold text-[var(--text-primary)] sm:text-lg">
                {t("mitHeading")}
              </h2>
              <pre className="mt-4 overflow-x-auto rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-elevated)] p-4 text-[11px] leading-relaxed text-[var(--text-secondary)] sm:mt-6 sm:p-6 sm:text-xs md:text-sm">
                {MIT_LICENSE_TEXT}
              </pre>
              <p className="mt-4 text-pretty text-sm text-[var(--text-muted)] sm:mt-6">
                {t("contentNote")}
              </p>
            </Reveal>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
