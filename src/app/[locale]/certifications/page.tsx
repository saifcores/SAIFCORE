import type { Locale } from "next-intl";
import {
  getMessages,
  getTranslations,
  setRequestLocale,
} from "next-intl/server";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CertificationsSection } from "@/components/portfolio/CertificationsSection";
import { ContactBridgeStrip } from "@/components/portfolio/ContactBridgeStrip";
import { Footer } from "@/components/portfolio/Footer";
import { Navbar } from "@/components/portfolio/Navbar";
import { PageHeader } from "@/components/portfolio/PageHeader";
import { ProfileExploreLinks } from "@/components/portfolio/ProfileExploreLinks";
import {
  certificationIds,
  getCertificationMeta,
  hasObtainedCertifications,
} from "@/data/certifications";
import { routing } from "@/i18n/routing";
import { buildPageMetadata, buildProfilePageGraph } from "@/seo";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateStaticParams() {
  if (!hasObtainedCertifications()) return [];
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  if (!hasObtainedCertifications()) return {};

  const { locale } = await params;
  const t = await getTranslations({
    locale: locale as Locale,
    namespace: "certificationsPage",
  });

  return buildPageMetadata({
    locale,
    path: "/certifications",
    title: t("metaTitle"),
    description: t("metaDescription"),
  });
}

export default async function CertificationsPage({ params }: Props) {
  if (!hasObtainedCertifications()) {
    notFound();
  }

  const { locale } = await params;
  setRequestLocale(locale as Locale);

  const t = await getTranslations("certificationsPage");
  const tCommon = await getTranslations("common");
  const tMeta = await getTranslations("meta");
  const messages = await getMessages();

  const credentials = certificationIds.map((id) => {
    const copy = messages.certifications.items[id];
    const meta = getCertificationMeta(id);
    return { ...copy, ...meta, id };
  });

  const pageJsonLd = buildProfilePageGraph({
    locale,
    path: "/certifications",
    pageName: t("metaTitle"),
    pageDescription: t("metaDescription"),
    jobTitle: tMeta("jsonLdJobTitle"),
    personDescription: tMeta("jsonLdDescription"),
    breadcrumb: [
      { name: tCommon("home"), path: "/" },
      { name: t("title"), path: "/certifications" },
    ],
    personExtras: {
      hasCredential: credentials.map((item) => ({
        "@type": "EducationalOccupationalCredential",
        name: item.name,
        description: item.description,
        credentialCategory:
          item.group === "formal" ? "certification" : "expertise",
        recognizedBy: {
          "@type": "Organization",
          name: item.issuer,
        },
        ...(item.verifyUrl && item.status === "obtained"
          ? { url: item.verifyUrl }
          : {}),
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
        />

        <div className="px-4 pb-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-[1280px]">
            <CertificationsSection compact />
          </div>
        </div>

        <div className="px-4 pb-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-[1280px] space-y-8">
            <ProfileExploreLinks excludePath="/certifications" />
            <ContactBridgeStrip ns="certificationsPage" />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
