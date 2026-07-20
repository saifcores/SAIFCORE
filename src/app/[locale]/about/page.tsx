import type { Locale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import { About } from "@/components/portfolio/About";
import { ContactBridgeStrip } from "@/components/portfolio/ContactBridgeStrip";
import { Footer } from "@/components/portfolio/Footer";
import { Navbar } from "@/components/portfolio/Navbar";
import { PageHeader } from "@/components/portfolio/PageHeader";
import { routing } from "@/i18n/routing";
import { buildPageMetadata, buildProfilePageGraph } from "@/seo";

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
    namespace: "aboutPage",
  });
  return buildPageMetadata({
    locale,
    path: "/about",
    title: t("metaTitle"),
    description: t("metaDescription"),
  });
}

export default async function AboutPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale as Locale);
  const t = await getTranslations("aboutPage");
  const tCommon = await getTranslations("common");
  const tMeta = await getTranslations("meta");

  const pageJsonLd = buildProfilePageGraph({
    locale,
    path: "/about",
    pageName: t("metaTitle"),
    pageDescription: t("metaDescription"),
    jobTitle: tMeta("jsonLdJobTitle"),
    personDescription: tMeta("jsonLdDescription"),
    breadcrumb: [
      { name: tCommon("home"), path: "/" },
      { name: t("title"), path: "/about" },
    ],
    personExtras: {
      alumniOf: {
        "@type": "CollegeOrUniversity",
        name: "Université numérique Cheikh Hamidou KANE (UN-CHK)",
      },
      knowsLanguage: [
        { "@type": "Language", name: "French", alternateName: "fr" },
        { "@type": "Language", name: "English", alternateName: "en" },
      ],
    },
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
          subtitle={t("subtitle")}
          backLabel={t("backToHome")}
          showFacts
        />

        <About extended />

        <div className="px-4 pb-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-[1280px]">
            <ContactBridgeStrip ns="aboutPage" />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
