import type { Locale } from "next-intl";
import {
  getMessages,
  getTranslations,
  setRequestLocale,
} from "next-intl/server";
import type { Metadata } from "next";
import { ContactBridgeStrip } from "@/components/portfolio/ContactBridgeStrip";
import { DepthTeaser } from "@/components/portfolio/DepthTeaser";
import { MidPageCta } from "@/components/portfolio/MidPageCta";
import { PageHeader } from "@/components/portfolio/PageHeader";
import { ProfileExploreLinks } from "@/components/portfolio/ProfileExploreLinks";
import { Experience } from "@/components/portfolio/Experience";
import { EducationSection } from "@/components/portfolio/EducationSection";
import { HowIThink } from "@/components/portfolio/HowIThink";
import { Footer } from "@/components/portfolio/Footer";
import { Navbar } from "@/components/portfolio/Navbar";
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
  const tMeta = await getTranslations("meta");
  const messages = await getMessages();

  const pageJsonLd = buildProfilePageGraph({
    locale,
    path: "/experience",
    pageName: t("metaTitle"),
    pageDescription: t("metaDescription"),
    jobTitle: tMeta("jsonLdJobTitle"),
    personDescription: tMeta("jsonLdDescription"),
    breadcrumb: [
      { name: tCommon("home"), path: "/" },
      { name: t("title"), path: "/experience" },
    ],
    personExtras: {
      hasOccupation: messages.experience.items.map((item) => ({
        "@type": "Occupation",
        name: item.role,
        occupationalCategory: item.client || item.company,
        description: item.bullet0,
      })),
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
          actionVariant="recruiter"
        />

        <Experience />
        <MidPageCta namespace="experiencePage" />
        <EducationSection />
        <HowIThink />
        <DepthTeaser />

        <div className="px-4 pb-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-[1280px] space-y-8">
            <ProfileExploreLinks excludePath="/experience" />
            <ContactBridgeStrip ns="experiencePage" />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
