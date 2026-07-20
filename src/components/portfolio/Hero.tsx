import { getLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { BookCallLink } from "@/components/portfolio/BookCallLink";
import { HeroContent } from "@/components/portfolio/HeroContent";
import { HeroVisual } from "@/components/portfolio/HeroVisual";
import {
  getResumeUrl,
  getResumeDownloadFilename,
  isLocalResume,
} from "@/server/resume";

export async function Hero() {
  const t = await getTranslations("hero");
  const locale = await getLocale();
  const resumeUrl = getResumeUrl(locale);
  const resumeDownload = getResumeDownloadFilename(locale);

  const ctas = (
    <>
      <BookCallLink className="btn-primary btn-primary-lg inline-flex min-h-12 w-full items-center justify-center px-4 text-sm sm:w-auto sm:px-8">
        {t("ctaBookCall")}
      </BookCallLink>
      <Link
        href="/#services"
        className="btn-outline inline-flex min-h-12 w-full items-center justify-center rounded-xl px-4 text-sm font-semibold sm:w-auto sm:px-8"
      >
        {t("ctaPrimary")}
      </Link>
      {resumeUrl ? (
        <a
          href={resumeUrl}
          className="btn-outline inline-flex min-h-12 w-full items-center justify-center rounded-xl px-4 text-sm font-semibold sm:w-auto sm:px-8"
          {...(isLocalResume(resumeUrl)
            ? { download: resumeDownload }
            : { target: "_blank", rel: "noopener noreferrer" })}
        >
          {t("ctaResume")}
        </a>
      ) : (
        <Link
          href="/#contact"
          className="btn-outline inline-flex min-h-12 w-full items-center justify-center rounded-xl px-4 text-sm font-semibold sm:w-auto sm:px-8"
        >
          {t("ctaResume")}
        </Link>
      )}
    </>
  );

  return (
    <section className="relative overflow-hidden border-b border-[var(--border-subtle)] px-4 pb-28 pt-12 sm:px-6 sm:pb-32 sm:pt-20 md:pb-36 md:pt-24 lg:px-8 xl:pb-36">
      <div className="bg-grid pointer-events-none absolute inset-0 opacity-100" />
      <div
        className="ambient-glow pointer-events-none absolute -left-1/3 top-0 h-[600px] w-[70%] rounded-full bg-gradient-to-br from-blue-600/20 via-blue-500/8 to-transparent blur-3xl animate-float-glow"
        aria-hidden
      />
      <div
        className="ambient-glow pointer-events-none absolute -right-1/4 bottom-0 h-[500px] w-[55%] rounded-full bg-gradient-to-tl from-emerald-500/12 via-emerald-400/5 to-transparent blur-3xl animate-float-glow"
        style={{ animationDelay: "-5s" }}
        aria-hidden
      />
      <div
        className="hero-particles pointer-events-none absolute inset-0"
        aria-hidden
      />

      <div className="relative mx-auto max-w-[1280px]">
        <div className="grid items-center gap-10 md:grid-cols-2 md:gap-12 lg:grid-cols-[1fr_minmax(280px,420px)] xl:gap-24">
          <HeroContent
            badge={t("badge")}
            titleLine1={t("titleLine1")}
            titleLine2={t("titleLine2")}
            titleLine3={t("titleLine3")}
            subtitle={t("subtitle")}
            specializations={[
              t("specializations.0"),
              t("specializations.1"),
              t("specializations.2"),
              t("specializations.3"),
            ]}
            proofLine={t("proofLine")}
            availability={t("availability")}
            locationLine={t("locationLine")}
            jumpToContact={t("jumpToContact")}
            ctas={ctas}
          />
          <HeroVisual
            terminalTitle={t("terminalTitle")}
            terminalVersion={t("terminalVersion")}
            terminalStatus={t("terminalStatus")}
            mockupLabel={t("mockupLabel")}
            mockupStatus={t("terminalStatus")}
            mockupChart={t("mockupChart")}
            metrics={[
              { value: "99.9%", label: t("metricUptime") },
              { value: "<50ms", label: t("metricLatency") },
              { value: "3+", label: t("metricPlatforms") },
              { value: "0", label: t("metricIncidents") },
            ]}
          />
        </div>
      </div>
    </section>
  );
}
