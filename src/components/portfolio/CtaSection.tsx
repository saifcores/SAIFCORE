import { getLocale, getTranslations } from "next-intl/server";
import { ContactForm } from "@/components/portfolio/ContactForm";
import {
  getResumeUrl,
  getResumeDownloadFilename,
  isLocalResume,
} from "@/server/resume";
import { MotionReveal } from "@/components/portfolio/motion/MotionReveal";

export async function CtaSection() {
  const t = await getTranslations("cta");
  const tFooter = await getTranslations("footer");
  const locale = await getLocale();
  const resumeUrl = getResumeUrl(locale);
  const resumeDownload = getResumeDownloadFilename(locale);

  return (
    <section
      id="contact"
      className="px-4 py-10 sm:px-6 sm:py-12 lg:px-8 lg:py-16"
    >
      <div className="mx-auto max-w-[1280px]">
        <MotionReveal>
          <div className="relative overflow-hidden rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-elevated)]/30 px-4 py-8 sm:px-8 sm:py-12 lg:px-14 lg:py-16">
            <div className="bg-grid pointer-events-none absolute inset-0 opacity-60" />
            <div
              className="pointer-events-none absolute -left-24 top-1/2 h-64 w-64 -translate-y-1/2 rounded-full bg-blue-600/20 blur-3xl"
              aria-hidden
            />
            <div
              className="pointer-events-none absolute -right-24 top-1/2 h-64 w-64 -translate-y-1/2 rounded-full bg-emerald-500/12 blur-3xl"
              aria-hidden
            />

            <div className="relative">
              <div className="mx-auto max-w-2xl text-center">
                <p className="mb-4 text-xs font-medium uppercase tracking-[0.2em] text-[var(--text-muted)]">
                  {t("label")}
                </p>
                <h2 className="text-pretty text-xl font-bold tracking-tight text-[var(--text-primary)] sm:text-2xl md:text-3xl lg:text-[2.5rem]">
                  {t("title")}
                </h2>
                <p className="mx-auto mt-3 max-w-xl text-pretty text-sm text-[var(--text-secondary)] sm:mt-4 sm:text-base">
                  {t("subtitle")}
                </p>
              </div>

              <div className="mt-8 sm:mt-12">
                <ContactForm
                  subject={t("emailSubject")}
                  formName={t("formName")}
                  formEmail={t("formEmail")}
                  formCompany={t("formCompany")}
                  formMessage={t("formMessage")}
                  formMessagePlaceholder={t("formMessagePlaceholder")}
                  formSubmit={t("formSubmit")}
                  formNote={t("formNote")}
                  formUnavailable={t("formUnavailable")}
                  bookCall={t("bookCall")}
                  calendlyHint={t("calendlyHint")}
                  calendlyFallbackHint={t("calendlyFallbackHint")}
                  socialTitle={t("socialTitle")}
                  linkedinLabel={tFooter("linkedin")}
                  githubLabel={tFooter("github")}
                  emailLabel={t("startProject")}
                />
              </div>

              {resumeUrl ? (
                <p className="mt-8 text-center sm:mt-10">
                  <a
                    href={resumeUrl}
                    className="inline-flex min-h-11 items-center justify-center text-sm font-semibold text-[var(--text-muted)] underline decoration-white/15 underline-offset-4 transition hover:text-[var(--text-primary)]"
                    {...(isLocalResume(resumeUrl)
                      ? { download: resumeDownload }
                      : { target: "_blank", rel: "noopener noreferrer" })}
                  >
                    {t("downloadResume")}
                  </a>
                </p>
              ) : null}
            </div>
          </div>
        </MotionReveal>
      </div>
    </section>
  );
}
