import { getLocale, getTranslations } from "next-intl/server";
import { getPathname, Link } from "@/i18n/navigation";
import { HeroContent } from "@/components/portfolio/HeroContent";
import { Proofs } from "@/components/portfolio/Proofs";
import type { AppMessages } from "@/types/messages";
import {
  getResumeDownloadFilename,
  getResumeUrl,
  isLocalResume,
} from "@/server/resume";

export async function Hero() {
  const [t, tCommon, locale] = await Promise.all([
    getTranslations("hero"),
    getTranslations("common"),
    getLocale(),
  ]);
  const resumeUrl = getResumeUrl(locale);
  const resumeDownload = getResumeDownloadFilename(locale);
  const orbit = t.raw("orbit") as AppMessages["hero"]["orbit"];
  const localResume = Boolean(resumeUrl && isLocalResume(resumeUrl));
  const projectBriefHref = `${getPathname({
    href: "/contact",
    locale: locale === "fr" ? "fr" : "en",
  })}?intent=freelance`;

  const ctas = (
    <>
      <a
        href={projectBriefHref}
        className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-[10px] bg-[var(--text-primary)] px-5 text-[15px] font-semibold text-[var(--bg-base)] transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus-ring)] sm:w-auto"
      >
        {t("ctaProject")}
        <span aria-hidden>↗</span>
      </a>
      <Link
        href="/systems"
        className="btn-outline inline-flex min-h-12 w-full items-center justify-center rounded-[10px] px-5 text-[15px] font-medium sm:w-auto"
      >
        {t("ctaPrimary")}
      </Link>
      {resumeUrl ? (
        <a
          href={resumeUrl}
          className="link-more px-1"
          {...(localResume
            ? { download: resumeDownload }
            : {
                target: "_blank",
                rel: "noopener noreferrer",
                "aria-label": `${t("ctaResume")} (${tCommon("opensInNewTab")})`,
              })}
        >
          {t("ctaResume")}
        </a>
      ) : null}
    </>
  );

  return (
    <section
      aria-labelledby="hero-heading"
      className="relative overflow-x-clip pb-4 pt-8 sm:pt-12 lg:pb-6 lg:pt-16"
    >
      <p className="hero-rail">{t("rail")}</p>
      <div className="page-container">
        <HeroContent
          year={String(new Date().getFullYear())}
          badge={t("badge")}
          title={t("title")}
          titleAccent={t("titleAccent")}
          titleRest={t("titleRest")}
          subtitle={t("subtitle")}
          proofLine={t("proofLine")}
          availability={t("availability")}
          hub={t("hub")}
          orbit={orbit}
          scroll={t("scroll")}
          ctas={ctas}
        />
        <Proofs />
      </div>
    </section>
  );
}
