import { getLocale, getTranslations } from "next-intl/server";
import { ContactForm } from "@/components/portfolio/ContactForm";
import {
  getResumeUrl,
  getResumeDownloadFilename,
  isLocalResume,
} from "@/server/resume";
import { isContactFormConfigured } from "@/server/contact-mail";
import { MotionReveal } from "@/components/portfolio/motion/MotionReveal";

export async function CtaSection() {
  const t = await getTranslations("cta");
  const tFooter = await getTranslations("footer");
  const locale = await getLocale();
  const resumeUrl = getResumeUrl(locale);
  const resumeDownload = getResumeDownloadFilename(locale);
  const formEnabled = isContactFormConfigured();

  return (
    <section
      id="contact"
      className="px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24"
    >
      <div className="mx-auto max-w-7xl">
        <MotionReveal>
          <div className="relative overflow-hidden rounded-[16px] border border-[var(--border-subtle)] bg-[var(--bg-elevated)]/30 px-5 py-10 sm:px-10 sm:py-14 lg:px-14 lg:py-16">
            <div className="relative">
              <div className="mx-auto max-w-2xl text-center">
                <p className="mb-4 text-xs font-medium uppercase tracking-[0.2em] text-[var(--text-muted)]">
                  {t("label")}
                </p>
                <h2 className="font-display text-pretty text-2xl font-medium tracking-tight text-[var(--text-primary)] sm:text-3xl md:text-4xl">
                  {t("title")}
                </h2>
                <p className="mx-auto mt-4 max-w-xl text-pretty text-sm text-[var(--text-secondary)] sm:text-base">
                  {t("subtitle")}
                </p>
                <p className="mx-auto mt-3 text-pretty text-xs text-[var(--text-muted)] sm:text-sm">
                  {t("responseHint")}
                </p>
              </div>

              <ol className="mx-auto mt-10 grid max-w-3xl gap-6 text-left sm:grid-cols-3">
                {(
                  [
                    t("processStep1"),
                    t("processStep2"),
                    t("processStep3"),
                  ] as const
                ).map((step, index) => (
                  <li key={step} className="min-w-0">
                    <p className="font-display text-sm font-medium text-[var(--text-muted)]">
                      {String(index + 1).padStart(2, "0")}
                    </p>
                    <p className="mt-2 text-pretty text-sm leading-relaxed text-[var(--text-secondary)]">
                      {step}
                    </p>
                  </li>
                ))}
              </ol>

              <div className="mt-8 sm:mt-12">
                <ContactForm
                  subject={t("emailSubject")}
                  formEnabled={formEnabled}
                  formName={t("formName")}
                  formEmail={t("formEmail")}
                  formCompany={t("formCompany")}
                  formIntent={t("formIntent")}
                  formIntentPlaceholder={t("formIntentPlaceholder")}
                  formIntentHiring={t("formIntentHiring")}
                  formIntentFreelance={t("formIntentFreelance")}
                  formIntentOther={t("formIntentOther")}
                  formMessage={t("formMessage")}
                  formMessagePlaceholder={t("formMessagePlaceholder")}
                  formMessagePlaceholderHiring={t(
                    "formMessagePlaceholderHiring",
                  )}
                  formMessagePlaceholderFreelance={t(
                    "formMessagePlaceholderFreelance",
                  )}
                  formSubmit={t("formSubmit")}
                  formSending={t("formSending")}
                  formSuccess={t("formSuccess")}
                  formSuccessHint={t("formSuccessHint")}
                  formSendAnother={t("formSendAnother")}
                  formError={t("formError")}
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
                <p className="mt-8 flex flex-col items-center justify-center gap-3 text-center sm:mt-10 sm:flex-row sm:gap-6">
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
