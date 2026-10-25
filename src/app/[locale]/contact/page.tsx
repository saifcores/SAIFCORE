import type { Locale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import { isContactIntent } from "@/contact-intent";
import { ContactPage } from "@/components/portfolio/ContactPage";
import { FaqSection } from "@/components/portfolio/FaqSection";
import { Footer } from "@/components/portfolio/Footer";
import { Navbar } from "@/components/portfolio/Navbar";
import { routing } from "@/i18n/routing";
import { buildPageMetadata } from "@/seo";

type Props = {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ intent?: string | string[] }>;
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
    namespace: "contactPage",
  });
  return buildPageMetadata({
    locale,
    path: "/contact",
    title: t("metaTitle"),
    description: t("metaDescription"),
  });
}

export default async function ContactRoute({ params, searchParams }: Props) {
  const { locale } = await params;
  const query = await searchParams;
  const rawIntent = Array.isArray(query.intent)
    ? query.intent[0]
    : query.intent;
  const initialIntent =
    rawIntent && isContactIntent(rawIntent) ? rawIntent : "";
  setRequestLocale(locale as Locale);

  return (
    <div className="flex min-h-full flex-col">
      <Navbar />
      <main
        id="main-content"
        className="flex-1 pb-28 outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus-ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-bg-base xl:pb-0"
        tabIndex={-1}
      >
        <ContactPage initialIntent={initialIntent} />
        <FaqSection />
      </main>
      <Footer />
    </div>
  );
}
