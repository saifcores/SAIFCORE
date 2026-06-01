import type { Locale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import { Footer } from "@/components/portfolio/Footer";
import { Navbar } from "@/components/portfolio/Navbar";
import { Reveal } from "@/components/portfolio/Reveal";
import { Link } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { buildBreadcrumbJsonLd, buildPageMetadata } from "@/seo";

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

  const breadcrumbJsonLd = buildBreadcrumbJsonLd(locale, [
    { name: tCommon("home"), path: "/" },
    { name: t("title"), path: "/license" },
  ]);

  return (
    <div className="flex min-h-full flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <Navbar />
      <main
        id="main-content"
        className="flex-1 pb-24 outline-none focus-visible:ring-2 focus-visible:ring-blue-500/40 focus-visible:ring-offset-2 focus-visible:ring-offset-bg-base md:pb-0"
        tabIndex={-1}
      >
        <section className="border-b border-[var(--border-subtle)] px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
          <div className="mx-auto max-w-[1280px]">
            <Reveal>
              <Link
                href="/"
                className="text-sm font-medium text-[var(--text-muted)] transition hover:text-[var(--text-primary)]"
              >
                ← {t("backToHome")}
              </Link>
              <h1 className="mt-8 text-3xl font-bold tracking-tight text-[var(--text-primary)] sm:text-4xl">
                {t("title")}
              </h1>
              <p className="mt-4 max-w-2xl text-base text-[var(--text-secondary)] sm:text-lg">
                {t("intro")}
              </p>
            </Reveal>
          </div>
        </section>

        <section className="px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
          <div className="mx-auto max-w-[1280px]">
            <Reveal>
              <h2 className="text-lg font-semibold text-[var(--text-primary)]">
                {t("mitHeading")}
              </h2>
              <pre className="mt-6 overflow-x-auto rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-elevated)] p-6 text-xs leading-relaxed text-[var(--text-secondary)] sm:text-sm">
                {MIT_LICENSE_TEXT}
              </pre>
              <p className="mt-6 text-sm text-[var(--text-muted)]">
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
