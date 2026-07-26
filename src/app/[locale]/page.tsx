import {
  getMessages,
  getTranslations,
  setRequestLocale,
} from "next-intl/server";
import type { Locale } from "next-intl";
import { AboutTeaser } from "@/components/portfolio/AboutTeaser";
import { ExperienceTeaser } from "@/components/portfolio/ExperienceTeaser";
import { Insights } from "@/components/portfolio/Insights";
import { CtaSection } from "@/components/portfolio/CtaSection";
import { EngineeringPrinciples } from "@/components/portfolio/EngineeringPrinciples";
import { FeaturedProjectsTeaser } from "@/components/portfolio/FeaturedProjectsTeaser";
import { Footer } from "@/components/portfolio/Footer";
import { Hero } from "@/components/portfolio/Hero";
import { MetricsSection } from "@/components/portfolio/MetricsSection";
import { Navbar } from "@/components/portfolio/Navbar";
import { ServicesSection } from "@/components/portfolio/ServicesSection";
import { CertificationsTeaser } from "@/components/portfolio/CertificationsTeaser";
import { TechStackSection } from "@/components/portfolio/TechStackSection";
import { Testimonials } from "@/components/portfolio/Testimonials";
import { TrustedExpertise } from "@/components/portfolio/TrustedExpertise";
import { Trust } from "@/components/portfolio/Trust";
import { WorkProcess } from "@/components/portfolio/WorkProcess";
import { fetchRecentArticles } from "@/blog/recent-articles";
import {
  buildArticleItemListJsonLd,
  buildExternalItemListJsonLd,
  buildJsonLdGraph,
  caseStudySlug,
  getLocaleHomeUrl,
  getLocalePageUrl,
} from "@/seo";
import {
  getContactEmail,
  getProfileDisplayName,
  getProfileLocation,
  getSiteUrl,
  getSocialLinks,
} from "@/site";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function Home({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale as Locale);

  const t = await getTranslations({
    locale: locale as Locale,
    namespace: "meta",
  });
  const tInsights = await getTranslations("insights");
  const tFeatured = await getTranslations("featuredProjects");
  const contentLoc = locale === "fr" ? "fr" : "en";

  const messages = await getMessages();
  const te = messages.trustedExpertise;
  const sv = messages.services;
  const ts = messages.techStack;
  const ep = messages.engineeringPrinciples;
  const wp = messages.workProcess;
  const tm = messages.testimonials;

  const siteUrl = getSiteUrl();
  const sameAs = getSocialLinks();
  const loc = getProfileLocation();
  const contactEmail = getContactEmail();

  const jsonLdPerson: Record<string, unknown> = {
    "@type": "Person",
    "@id": `${getLocaleHomeUrl(locale)}#person`,
    name: getProfileDisplayName(),
    alternateName: "SAIFCORE",
    jobTitle: t("jsonLdJobTitle"),
    description: t("jsonLdDescription"),
    url: siteUrl,
    image: new URL("/profile.png", `${siteUrl}/`).toString(),
    knowsLanguage: [
      { "@type": "Language", name: "French", alternateName: "fr" },
      { "@type": "Language", name: "English", alternateName: "en" },
    ],
    knowsAbout: [
      "Java",
      "Spring Boot",
      "Enterprise platforms",
      "Banking systems",
      "Payment infrastructure",
      "FinTech",
      "Distributed systems",
      "Apache Kafka",
      "API architecture",
      "Microservices",
      "AWS",
      "Mobile money",
    ],
    alumniOf: {
      "@type": "CollegeOrUniversity",
      name: "Université numérique Cheikh Hamidou KANE (UN-CHK)",
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: loc.city,
      addressCountry: loc.countryCode,
    },
    jobLocation: {
      "@type": "Place",
      address: {
        "@type": "PostalAddress",
        addressLocality: loc.city,
        addressCountry: loc.countryCode,
      },
    },
    worksFor: {
      "@type": "Organization",
      name: "SAIFCORE",
      url: siteUrl,
    },
    makesOffer: {
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: t("jsonLdServiceName"),
        description: t("jsonLdServiceDescription"),
      },
      availableAtOrFrom: {
        "@type": "Place",
        name: t("jsonLdAvailability"),
      },
      areaServed: t("jsonLdAreaServed"),
    },
  };

  if (sameAs.length > 0) {
    jsonLdPerson.sameAs = sameAs;
  }

  if (contactEmail) {
    jsonLdPerson.email = contactEmail;
  }

  const homeUrl = getLocaleHomeUrl(locale);
  const personId = `${homeUrl}#person`;

  const jsonLdWebPage = {
    "@type": "WebPage",
    "@id": `${homeUrl}#webpage`,
    url: homeUrl,
    name: t("ogTitle"),
    description: t("description"),
    inLanguage: locale === "fr" ? "fr-FR" : "en-US",
    isPartOf: {
      "@type": "WebSite",
      name: "SAIFCORE",
      url: siteUrl,
    },
    about: { "@id": personId },
    mainEntity: { "@id": personId },
  };

  const latestArticles = await fetchRecentArticles(contentLoc, 3);
  const insightsItemListJsonLd = latestArticles.some(
    (article) => article.external,
  )
    ? buildExternalItemListJsonLd({
        name: tInsights("title"),
        items: latestArticles.map((article) => ({
          name: article.title,
          url: article.href,
        })),
      })
    : buildArticleItemListJsonLd(locale, {
        name: tInsights("title"),
        items: latestArticles.map((article) => ({
          name: article.title,
          slug: article.slug,
        })),
      });

  const graphNodes: Record<string, unknown>[] = [jsonLdPerson, jsonLdWebPage];
  if (
    insightsItemListJsonLd.itemListElement &&
    Array.isArray(insightsItemListJsonLd.itemListElement) &&
    insightsItemListJsonLd.itemListElement.length > 0
  ) {
    const { "@context": _context, ...itemListNode } = insightsItemListJsonLd;
    graphNodes.push(itemListNode);
  }

  const systemsUrl = getLocalePageUrl(locale, "/systems");
  const caseStudiesItemListJsonLd = buildExternalItemListJsonLd({
    name: tFeatured("heading"),
    items: messages.featuredProjects.items.map((item) => ({
      name: item.title,
      url: `${systemsUrl}#case-${caseStudySlug(item.title)}`,
    })),
  });
  if (
    caseStudiesItemListJsonLd.itemListElement &&
    Array.isArray(caseStudiesItemListJsonLd.itemListElement) &&
    caseStudiesItemListJsonLd.itemListElement.length > 0
  ) {
    const { "@context": _caseContext, ...caseListNode } =
      caseStudiesItemListJsonLd;
    graphNodes.push(caseListNode);
  }

  const homeJsonLd = buildJsonLdGraph(...graphNodes);

  return (
    <div className="flex min-h-full flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homeJsonLd) }}
      />
      <Navbar />
      <main
        id="main-content"
        className="flex-1 pb-28 outline-none focus-visible:ring-2 focus-visible:ring-blue-500/40 focus-visible:ring-offset-2 focus-visible:ring-offset-bg-base xl:pb-0"
        tabIndex={-1}
      >
        <Hero />
        <Trust />
        <ExperienceTeaser />
        <TrustedExpertise
          title={te.title}
          subtitle={te.subtitle}
          techLabel={te.techLabel}
          conceptsLabel={te.conceptsLabel}
          items={[...te.items]}
        />
        <MetricsSection />
        <FeaturedProjectsTeaser />
        <ServicesSection
          title={sv.title}
          audience={sv.audience}
          subtitle={sv.subtitle}
          cta={sv.cta}
          items={[...sv.items]}
        />
        <TechStackSection
          title={ts.title}
          subtitle={ts.subtitle}
          categories={[...ts.categories]}
        />
        <CertificationsTeaser />
        <EngineeringPrinciples
          title={ep.title}
          subtitle={ep.subtitle}
          items={[...ep.items]}
        />
        <WorkProcess
          title={wp.title}
          subtitle={wp.subtitle}
          steps={[...wp.steps]}
        />
        <Testimonials
          title={tm.title}
          subtitle={tm.subtitle}
          items={[...tm.items]}
        />
        <Insights teaser />
        <AboutTeaser />
        <CtaSection />
      </main>
      <Footer />
    </div>
  );
}
