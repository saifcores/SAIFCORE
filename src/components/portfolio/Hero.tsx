import { getMessages, getTranslations } from "next-intl/server";
import { ArrowUpRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { BookCallLink } from "@/components/portfolio/BookCallLink";
import { HeroContent } from "@/components/portfolio/HeroContent";
import { HeroVisual } from "@/components/portfolio/HeroVisual";

export async function Hero() {
  const t = await getTranslations("hero");
  const messages = await getMessages();

  const ctas = (
    <>
      <BookCallLink className="btn-primary btn-primary-lg inline-flex min-h-12 w-full items-center justify-center px-8 text-base sm:w-auto">
        {t("ctaBookCall")}
        <ArrowUpRight className="h-4 w-4" aria-hidden />
      </BookCallLink>
      <Link
        href="/experience"
        className="btn-outline inline-flex min-h-12 w-full items-center justify-center px-8 text-sm font-medium sm:w-auto"
      >
        {t("ctaPrimary")}
      </Link>
    </>
  );

  return (
    <section className="relative overflow-hidden border-b border-[var(--border-subtle)] px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
      <div
        className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden"
        aria-hidden
      >
        <span className="select-none font-display text-[15vw] font-medium leading-none tracking-tight text-[var(--text-primary)] opacity-[0.03]">
          SAIFCORE
        </span>
      </div>

      <div className="relative mx-auto max-w-7xl">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <HeroContent
            badge={t("badge")}
            titleLine1={t("titleLine1")}
            titleLine2={t("titleLine2")}
            titleLine3={t("titleLine3")}
            subtitle={t("subtitle")}
            proofLine={t("proofLine")}
            availability={t("availability")}
            locationLine={t("locationLine")}
            jumpToContact={t("jumpToContact")}
            seePackages={t("ctaExperience")}
            ctas={ctas}
          />
          <HeroVisual nodes={[...messages.hero.hubNodes]} hubLabel="SAIFCORE" />
        </div>
      </div>
    </section>
  );
}
