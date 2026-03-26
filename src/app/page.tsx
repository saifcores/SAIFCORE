import { About } from "@/components/portfolio/About";
import { ArchitectureExpertise } from "@/components/portfolio/ArchitectureExpertise";
import { CtaSection } from "@/components/portfolio/CtaSection";
import { FeaturedProjects } from "@/components/portfolio/FeaturedProjects";
import { Footer } from "@/components/portfolio/Footer";
import { Hero } from "@/components/portfolio/Hero";
import { HowIThink } from "@/components/portfolio/HowIThink";
import { Insights } from "@/components/portfolio/Insights";
import { Navbar } from "@/components/portfolio/Navbar";
import { Trust } from "@/components/portfolio/Trust";
import { WhatISolve } from "@/components/portfolio/WhatISolve";
import { getSiteUrl, getSocialLinks } from "@/lib/site";

export default function Home() {
  const siteUrl = getSiteUrl();
  const sameAs = getSocialLinks();

  const jsonLd: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Manarix",
    jobTitle: "Software Architect & Full-Stack Engineer",
    description:
      "I design scalable systems that solve real business problems — from fintech to SaaS platforms.",
    url: siteUrl,
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
        className="flex-1 outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/40 focus-visible:ring-offset-2 focus-visible:ring-offset-bg-base"
        tabIndex={-1}
      >
        <Hero />
        <Trust />
        <WhatISolve />
        <HowIThink />
        <FeaturedProjects />
        <ArchitectureExpertise />
        <About />
        <Insights />
        <CtaSection />
      </main>
      <Footer />
    </div>
  );
}
