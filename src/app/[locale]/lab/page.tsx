import type { Locale } from "next-intl";
import {
  getMessages,
  getTranslations,
  setRequestLocale,
} from "next-intl/server";
import type { Metadata } from "next";
import { ContactBridgeStrip } from "@/components/portfolio/ContactBridgeStrip";
import { Footer } from "@/components/portfolio/Footer";
import { LabCatalog } from "@/components/portfolio/LabCatalog";
import { Navbar } from "@/components/portfolio/Navbar";
import { Link } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { buildPageMetadata } from "@/seo";

type Props = {
  params: Promise<{ locale: string }>;
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
    namespace: "labPage",
  });
  return buildPageMetadata({
    locale,
    path: "/lab",
    title: t("metaTitle"),
    description: t("metaDescription"),
  });
}

export default async function LabPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale as Locale);
  const t = await getTranslations("labPage");
  const tDirection = await getTranslations("architectureLab");
  const tCommon = await getTranslations("common");
  const messages = await getMessages();

  return (
    <div className="flex min-h-full flex-col">
      <Navbar />
      <main
        id="main-content"
        className="flex-1 pb-28 outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus-ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-bg-base xl:pb-0"
        tabIndex={-1}
      >
        <section className="py-12 sm:py-16 lg:py-24">
          <div className="page-container">
            <Link href="/" className="link-more min-h-11">
              ← {t("backToHome")}
            </Link>
            <p className="site-kicker mb-3.5 mt-5">{t("label")}</p>
            <h1 className="mb-4 max-w-[20ch] text-pretty font-display text-[clamp(1.85rem,4.2vw,3.25rem)] font-semibold leading-[1.08] tracking-tight text-[var(--text-primary)]">
              {t("title")}
            </h1>
            <p className="mb-3 max-w-[62ch] text-lg text-[var(--text-muted)]">
              {t("subtitle")}
            </p>
            <p className="mb-8 max-w-[62ch] text-sm leading-relaxed text-[var(--text-secondary)]">
              {tDirection("direction")}
            </p>
            <LabCatalog
              allLabel={t("all")}
              filterLabel={t("filterLabel")}
              emptyLabel={t("emptyFilter")}
              cats={messages.labPage.cats}
              items={messages.labPage.items}
              opensInNewTab={tCommon("opensInNewTab")}
            />
          </div>
        </section>
        <div className="page-container pb-16">
          <ContactBridgeStrip ns="labPage" />
        </div>
      </main>
      <Footer />
    </div>
  );
}
