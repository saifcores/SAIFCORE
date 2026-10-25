import {
  getMessages,
  getTranslations,
  setRequestLocale,
} from "next-intl/server";
import type { Locale } from "next-intl";
import { AudiencePaths } from "@/components/portfolio/AudiencePaths";
import { ExperienceTeaser } from "@/components/portfolio/ExperienceTeaser";
import { ExpertiseTeaser } from "@/components/portfolio/ExpertiseTeaser";
import { FeaturedProjectsTeaser } from "@/components/portfolio/FeaturedProjectsTeaser";
import { Footer } from "@/components/portfolio/Footer";
import { Hero } from "@/components/portfolio/Hero";
import { HomeContact } from "@/components/portfolio/HomeContact";
import { HomeLabWriting } from "@/components/portfolio/HomeLabWriting";
import { Navbar } from "@/components/portfolio/Navbar";
import { OffersHome } from "@/components/portfolio/OffersHome";
import { Principles } from "@/components/portfolio/Principles";
import { fetchRecentArticles } from "@/blog/recent-articles";
import {
  buildArticleItemListJsonLd,
  buildExternalItemListJsonLd,
  buildJsonLdGraph,
  getLocaleHomeUrl,
  getLocalePageUrl,
} from "@/seo";
import { getCaseStudyHref } from "@/data/case-studies";
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

  const siteUrl = getSiteUrl();
  const sameAs = getSocialLinks();
  const loc = getProfileLocation();
  const contactEmail = getContactEmail();
  const homeUrl = getLocaleHomeUrl(locale);
  const personId = `${homeUrl}#person`;

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
      name: "Synapse Groupe",
    },
  };

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

  if (sameAs.length > 0) {
    jsonLdPerson.sameAs = sameAs;
  }

  if (contactEmail) {
    jsonLdPerson.email = contactEmail;
  }

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
        <Hero />
        <ExpertiseTeaser />
        <OffersHome />
        <AudiencePaths
          recruiter={<ExperienceTeaser />}
          depth={
            <>
              <FeaturedProjectsTeaser />
              <Principles />
              <HomeLabWriting />
            </>
          }
          client={null}
        />
        <HomeContact />
      </main>
      <Footer />
    </div>
  );
}
