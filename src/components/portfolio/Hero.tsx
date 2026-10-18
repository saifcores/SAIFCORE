import { getLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { HeroContent } from "@/components/portfolio/HeroContent";
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
  const flow = t.raw("flow") as AppMessages["hero"]["flow"];
  const localResume = Boolean(resumeUrl && isLocalResume(resumeUrl));

  const ctas = (
    <>
      <Link
        href="/systems"
        className="btn-primary inline-flex min-h-12 w-full items-center justify-center px-5 text-[15px] sm:w-auto"
      >
        {t("ctaPrimary")}
      </Link>
      {resumeUrl ? (
        <a
          href={resumeUrl}
          className="btn-outline inline-flex min-h-12 w-full items-center justify-center px-5 text-[15px] font-medium sm:w-auto"
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
      className="relative overflow-hidden py-8 sm:py-12 lg:py-16"
    >
      <div className="page-container">
        <HeroContent
          identityName={t("identityName")}
          identityRole={t("identityRole")}
          badge={t("badge")}
          title={t("title")}
          subtitle={t("subtitle")}
          proofLine={t("proofLine")}
          availability={t("availability")}
          flowLabel={t("flowLabel")}
          flowCaption={t("flowCaption")}
          portraitAlt={t("portraitAlt")}
          flow={flow}
          ctas={ctas}
        />
      </div>
    </section>
  );
}
