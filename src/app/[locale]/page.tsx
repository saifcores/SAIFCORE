import {
  getMessages,
  getTranslations,
  setRequestLocale,
} from "next-intl/server";
import type { Locale } from "next-intl";
import { AudiencePaths } from "@/components/portfolio/AudiencePaths";
import { ExperienceTeaser } from "@/components/portfolio/ExperienceTeaser";
import { Insights } from "@/components/portfolio/Insights";
import { CtaSection } from "@/components/portfolio/CtaSection";
import { FeaturedProjectsTeaser } from "@/components/portfolio/FeaturedProjectsTeaser";
import { Footer } from "@/components/portfolio/Footer";
import { FaqSection } from "@/components/portfolio/FaqSection";
import { Hero } from "@/components/portfolio/Hero";
import { Navbar } from "@/components/portfolio/Navbar";
import { FreelanceOffers } from "@/components/portfolio/FreelanceOffers";
import { Testimonials } from "@/components/portfolio/Testimonials";
import { Trust } from "@/components/portfolio/Trust";
import { fetchRecentArticles } from "@/blog/recent-articles";
import {
  buildArticleItemListJsonLd,
  buildExternalItemListJsonLd,
  buildFaqPageJsonLd,
  buildJsonLdGraph,
  buildOfferCatalogNodes,
  getLocaleHomeUrl,
  getLocalePageUrl,
} from "@/seo";
import {
  getCaseStudyHref,
  ECOM_360_CASE_STUDY_PATH,
} from "@/data/case-studies";
import {
  getContactEmail,
  getLinkedinUrl,
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
  const tFaq = await getTranslations("faq");
  const contentLoc = locale === "fr" ? "fr" : "en";

  const messages = await getMessages();
  const fo = messages.freelanceOffers;
  const faqItems = tFaq.raw("items") as readonly {
    question: string;
    answer: string;
  }[];

  const siteUrl = getSiteUrl();
  const sameAs = getSocialLinks();
  const loc = getProfileLocation();
  const contactEmail = getContactEmail();
  const homeUrl = getLocaleHomeUrl(locale);
  const personId = `${homeUrl}#person`;
  const catalogId = `${homeUrl}#offer-catalog`;

  const packageInputs = fo.tracks.flatMap((track) =>
    track.packages.map((pkg) => ({
      name: pkg.title,
      description: pkg.description,
      category: track.label,
    })),
  );

  const { catalog: offerCatalogNode, offers: catalogOffers } =
    buildOfferCatalogNodes({
      locale,
      catalogName: fo.title,
      catalogDescription: fo.subtitle,
      packages: packageInputs,
      areaServed: t("jsonLdAreaServed"),
      availability: t("jsonLdAvailability"),
    });

  const jsonLdPerson: Record<string, unknown> = {
    "@type": "Person",
    "@id": personId,
    name: getProfileDisplayName(),
    alternateName: "SAIFCORE",
    jobTitle: t("jsonLdJobTitle"),
    description: t("jsonLdDescription"),
    url: siteUrl,
    image: new URL("/profile.png", `${siteUrl}/`).toString(),
    knowsLanguage: [
      { "@type": "Language", name: t("langFrench"), alternateName: "fr" },
      { "@type": "Language", name: t("langEnglish"), alternateName: "en" },
    ],
    knowsAbout: [...messages.meta.knowsAbout],
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
    hasOfferCatalog: { "@id": catalogId },
    makesOffer: catalogOffers.map((offer) => ({
      "@id": offer["@id"] as string,
    })),
  };

  if (sameAs.length > 0) {
    jsonLdPerson.sameAs = sameAs;
  }

  if (contactEmail) {
    jsonLdPerson.email = contactEmail;
  }

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
    hasPart: [{ "@id": catalogId }, { "@id": `${homeUrl}#faq` }],
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

  const graphNodes: Record<string, unknown>[] = [
    jsonLdPerson,
    jsonLdWebPage,
    offerCatalogNode,
    ...catalogOffers,
    buildFaqPageJsonLd(locale, [...faqItems]),
  ];

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
    items: messages.featuredProjects.items.map((item) => {
      const href = getCaseStudyHref(item);
      const url = href.includes("#")
        ? `${systemsUrl}${href.slice(href.indexOf("#"))}`
        : getLocalePageUrl(locale, href as `/systems/${string}`);
      return {
        name: item.title,
        url,
      };
    }),
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
        className="flex-1 pb-28 outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus-ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-bg-base xl:pb-0"
        tabIndex={-1}
      >
        {/*
          Home: Trust → Path → Proof → History → Outcomes → Ways to work →
          Insights → FAQ → Contact. Depth on /about & /systems.
        */}
        <Hero />
        <Trust />
        <AudiencePaths />
        <FeaturedProjectsTeaser />
        <ExperienceTeaser />
        <Testimonials
          title={messages.testimonials.title}
          subtitle={messages.testimonials.subtitle}
          cta={messages.testimonials.cta}
          referenceCta={messages.testimonials.referenceCta}
          linkedinCta={messages.testimonials.linkedinCta}
          namedLabel={messages.testimonials.namedLabel}
          anonymizedLabel={messages.testimonials.anonymizedLabel}
          namedItems={[...messages.testimonials.namedItems]}
          items={[...messages.testimonials.items]}
          linkedinUrl={getLinkedinUrl()}
        />
        <FreelanceOffers
          title={fo.title}
          subtitle={fo.subtitle}
          note={fo.note}
          pricingNote={fo.pricingNote}
          investmentLabel={fo.investmentLabel}
          closer={fo.closer}
          cta={fo.cta}
          ctaSecondary={fo.ctaSecondary}
          fitLabel={fo.fitLabel}
          tracks={fo.tracks.map((track, index) =>
            index === 0
              ? {
                  ...track,
                  proofLabel: fo.productProofLabel,
                  proofHref: ECOM_360_CASE_STUDY_PATH,
                }
              : track,
          )}
        />
        <Insights teaser />
        <FaqSection />
        <CtaSection />
      </main>
      <Footer />
    </div>
  );
}
