import {
  getMessages,
  getTranslations,
  setRequestLocale,
} from "next-intl/server";
import type { Locale } from "next-intl";
import { AboutTeaser } from "@/components/portfolio/AboutTeaser";
import { Insights } from "@/components/portfolio/Insights";
import { CtaSection } from "@/components/portfolio/CtaSection";
import { EngineeringPrinciples } from "@/components/portfolio/EngineeringPrinciples";
import { FeaturedProjectsTeaser } from "@/components/portfolio/FeaturedProjectsTeaser";
import { Footer } from "@/components/portfolio/Footer";
import { Hero } from "@/components/portfolio/Hero";
import { Navbar } from "@/components/portfolio/Navbar";
import { ServicesSection } from "@/components/portfolio/ServicesSection";
import { CertificationsTeaser } from "@/components/portfolio/CertificationsTeaser";
import { TechStackSection } from "@/components/portfolio/TechStackSection";
import { Testimonials } from "@/components/portfolio/Testimonials";
import { TrustedExpertise } from "@/components/portfolio/TrustedExpertise";
import { Trust } from "@/components/portfolio/Trust";
import { WorkProcess } from "@/components/portfolio/WorkProcess";
import {
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

  const jsonLd: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: getProfileDisplayName(),
    jobTitle: t("jsonLdJobTitle"),
    description: t("jsonLdDescription"),
    url: siteUrl,
    knowsAbout: [
      "Payment systems",
      "Fintech infrastructure",
      "Distributed systems",
      "API architecture",
      "Mobile money integrations",
      "Kubernetes",
    ],
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
    makesOffer: {
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: "Freelance backend & fintech engineering",
        description:
          "Payment infrastructure, API development, architecture consulting, and mobile money integrations for international clients.",
      },
      availableAtOrFrom: {
        "@type": "Place",
        name: "Remote worldwide",
      },
    },
  };

  if (sameAs.length > 0) {
    jsonLd.sameAs = sameAs;
  }

  return (
    <div className="flex min-h-full flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar />
      <main
        id="main-content"
        className="flex-1 pb-24 outline-none focus-visible:ring-2 focus-visible:ring-blue-500/40 focus-visible:ring-offset-2 focus-visible:ring-offset-bg-base md:pb-0"
        tabIndex={-1}
      >
        <Hero />
        <Trust />
        <TrustedExpertise
          title={te.title}
          subtitle={te.subtitle}
          techLabel={te.techLabel}
          conceptsLabel={te.conceptsLabel}
          items={[...te.items]}
        />
        <FeaturedProjectsTeaser />
        <ServicesSection
          title={sv.title}
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
