import type { Locale } from "next-intl";
import {
  getMessages,
  getTranslations,
  setRequestLocale,
} from "next-intl/server";
import type { Metadata } from "next";
import { ContactBridgeStrip } from "@/components/portfolio/ContactBridgeStrip";
import { MidPageCta } from "@/components/portfolio/MidPageCta";
import { PageHeader } from "@/components/portfolio/PageHeader";
import { ProfileExploreLinks } from "@/components/portfolio/ProfileExploreLinks";
import { ArchitectureSection } from "@/components/portfolio/ArchitectureSection";
import { BankingLeadership } from "@/components/portfolio/BankingLeadership";
import { FeaturedProjects } from "@/components/portfolio/FeaturedProjects";
import { Footer } from "@/components/portfolio/Footer";
import { Navbar } from "@/components/portfolio/Navbar";
import { routing } from "@/i18n/routing";
import {
  buildPageMetadata,
  buildSystemsPageGraph,
  caseStudySlug,
  getLocalePageUrl,
} from "@/seo";

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
    namespace: "systemsPage",
  });
  return buildPageMetadata({
    locale,
    path: "/systems",
    title: t("metaTitle"),
    description: t("metaDescription"),
  });
}

export default async function SystemsPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale as Locale);
  const t = await getTranslations("systemsPage");
  const tCommon = await getTranslations("common");
  const messages = await getMessages();
  const pageUrl = getLocalePageUrl(locale, "/systems");
  const caseStudies = messages.featuredProjects.items.map((item) => {
    const slug = caseStudySlug(item.title);

    return {
      name: item.title,
      description: item.solution,
      url: `${pageUrl}#case-${slug}`,
      externalUrl: item.href.trim() || undefined,
      keywords: item.stacks,
    };
  });

  const pageJsonLd = buildSystemsPageGraph({
    locale,
    pageName: t("metaTitle"),
    pageDescription: t("metaDescription"),
    breadcrumb: [
      { name: tCommon("home"), path: "/" },
      { name: t("title"), path: "/systems" },
    ],
    caseStudies,
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
          actionVariant="client"
        />

        {/* Proof first, then architecture context */}
        <FeaturedProjects showDetail />
        <MidPageCta namespace="systemsPage" />
        <ArchitectureSection />
        <BankingLeadership />

        <div className="px-4 pb-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-[1280px] space-y-8">
            <ProfileExploreLinks excludePath="/systems" />
            <ContactBridgeStrip ns="systemsPage" showPackages />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
