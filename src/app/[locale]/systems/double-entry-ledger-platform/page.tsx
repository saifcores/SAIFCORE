import type { Locale } from "next-intl";
import {
  getMessages,
  getTranslations,
  setRequestLocale,
} from "next-intl/server";
import type { Metadata } from "next";
import { CaseStudyDoubleEntryLedger } from "@/components/portfolio/CaseStudyDoubleEntryLedger";
import { ContactBridgeStrip } from "@/components/portfolio/ContactBridgeStrip";
import { Footer } from "@/components/portfolio/Footer";
import { Navbar } from "@/components/portfolio/Navbar";
import { routing } from "@/i18n/routing";
import { buildCaseStudyPageGraph, buildPageMetadata } from "@/seo";
import { DOUBLE_ENTRY_LEDGER_CASE_STUDY_PATH } from "@/data/case-studies";

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
    namespace: "caseStudyDoubleEntryLedger",
  });
  return buildPageMetadata({
    locale,
    path: DOUBLE_ENTRY_LEDGER_CASE_STUDY_PATH,
    title: t("metaTitle"),
    description: t("metaDescription"),
  });
}

export default async function DoubleEntryLedgerCaseStudyPage({
  params,
}: Props) {
  const { locale } = await params;
  setRequestLocale(locale as Locale);
  const t = await getTranslations("caseStudyDoubleEntryLedger");
  const tCommon = await getTranslations("common");
  const tSystems = await getTranslations("systemsPage");
  const messages = await getMessages();
  const stacks = [...messages.caseStudyDoubleEntryLedger.stacks];

  const pageJsonLd = buildCaseStudyPageGraph({
    locale,
    path: DOUBLE_ENTRY_LEDGER_CASE_STUDY_PATH,
    pageName: t("metaTitle"),
    pageDescription: t("metaDescription"),
    workName: t("title"),
    workDescription: t("subtitle"),
    externalUrl: "https://github.com/saifcores/double-entry-ledger-platform",
    keywords: stacks,
    breadcrumb: [
      { name: tCommon("home"), path: "/" },
      { name: tSystems("title"), path: "/systems" },
      { name: t("title"), path: DOUBLE_ENTRY_LEDGER_CASE_STUDY_PATH },
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
        className="flex-1 pb-28 outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus-ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-bg-base xl:pb-0"
        tabIndex={-1}
      >
        <CaseStudyDoubleEntryLedger />
        <div className="px-4 pb-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <ContactBridgeStrip ns="caseStudyDoubleEntryLedger" showPackages />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
