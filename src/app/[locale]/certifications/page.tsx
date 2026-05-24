import type { Locale } from "next-intl";
import {
  getMessages,
  getTranslations,
  setRequestLocale,
} from "next-intl/server";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CertificationsSection } from "@/components/portfolio/CertificationsSection";
import { Footer } from "@/components/portfolio/Footer";
import { Navbar } from "@/components/portfolio/Navbar";
import { Reveal } from "@/components/portfolio/Reveal";
import {
  certificationIds,
  getCertificationMeta,
  hasObtainedCertifications,
} from "@/data/certifications";
import { Link } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { buildBreadcrumbJsonLd, buildPageMetadata } from "@/seo";
import { getProfileDisplayName } from "@/site";

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
  const messages = await getMessages();
  const displayName = getProfileDisplayName();

  const credentials = certificationIds.map((id) => {
    const copy = messages.certifications.items[id];
    const meta = getCertificationMeta(id);
    return { ...copy, ...meta, id };
  });

  const jsonLd: Record<string, unknown>[] = [
    buildBreadcrumbJsonLd(locale, [
      { name: tCommon("home"), path: "/" },
      { name: t("title"), path: "/certifications" },
    ]),
    {
      "@context": "https://schema.org",
      "@type": "ProfilePage",
      name: t("metaTitle"),
      description: t("metaDescription"),
      mainEntity: {
        "@type": "Person",
        name: displayName,
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
    },
  ];

  return (
    <div className="flex min-h-full flex-col">
      {jsonLd.map((data, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
        />
      ))}
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
                {t("subtitle")}
              </p>
            </Reveal>
          </div>
        </section>

        <CertificationsSection compact />
      </main>
      <Footer />
    </div>
  );
}
