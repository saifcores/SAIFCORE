import type { Locale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import { Experience } from "@/components/portfolio/Experience";
import { Footer } from "@/components/portfolio/Footer";
import { Navbar } from "@/components/portfolio/Navbar";
import { Reveal } from "@/components/portfolio/Reveal";
import { SkillsMatrix } from "@/components/portfolio/SkillsMatrix";
import { Link } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { buildBreadcrumbJsonLd, buildPageMetadata } from "@/seo";

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
    namespace: "experiencePage",
  });
  return buildPageMetadata({
    locale,
    path: "/experience",
    title: t("metaTitle"),
    description: t("metaDescription"),
  });
}

export default async function ExperiencePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale as Locale);
  const t = await getTranslations("experiencePage");
  const tCommon = await getTranslations("common");

  const breadcrumbJsonLd = buildBreadcrumbJsonLd(locale, [
    { name: tCommon("home"), path: "/" },
    { name: t("title"), path: "/experience" },
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
        {/* Page header */}
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
                {t("subtitle")}
              </p>
            </Reveal>
          </div>
        </section>

        {/* Full experience timeline */}
        <Experience />

        {/* Technical skills matrix */}
        <SkillsMatrix />
      </main>
      <Footer />
    </div>
  );
}
