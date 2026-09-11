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
      <BookCallLink className="btn-primary btn-primary-lg inline-flex min-h-12 w-full items-center justify-center gap-2 px-5 text-base min-[400px]:px-6 sm:w-auto sm:px-8">
        {t("ctaBookCall")}
        <ArrowUpRight className="h-4 w-4 shrink-0" aria-hidden />
      </BookCallLink>
      <Link
        href="/experience"
        className="btn-outline inline-flex min-h-12 w-full items-center justify-center px-5 text-sm font-medium min-[400px]:px-6 sm:w-auto sm:px-8"
      >
        {t("ctaPrimary")}
      </Link>
    </>
  );

  return (
    <section className="relative overflow-x-clip border-b border-[var(--border-subtle)] px-4 py-12 sm:px-6 sm:py-16 md:py-20 lg:px-8 lg:py-28">
      <div
        className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden"
        aria-hidden
      >
        <span className="select-none font-display text-[22vw] font-medium leading-none tracking-tight text-[var(--text-primary)] opacity-[0.025] sm:text-[15vw] sm:opacity-[0.03]">
          SAIFCORE
        </span>
      </div>

      <div className="relative mx-auto max-w-7xl">
        <div className="grid items-center gap-8 md:gap-12 lg:grid-cols-2 lg:gap-16">
          <HeroContent
            badge={t("badge")}
            titleLine1={t("titleLine1")}
            titleLine2={t("titleLine2")}
            titleLine3={t("titleLine3")}
            subtitle={t("subtitle")}
            proofLine={t("proofLine")}
            availability={t("availability")}
            jumpToContact={t("jumpToContact")}
            waysToWork={t("ctaExperience")}
            ctas={ctas}
          />
          {/* Content-first on phones; orbit from tablet up */}
          <div className="mx-auto hidden w-full max-w-[340px] md:block md:max-w-[380px] lg:max-w-none">
            <HeroVisual
              nodes={[...messages.hero.hubNodes]}
              hubLabel="SAIFCORE"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
