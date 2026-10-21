import { getLocale, getTranslations } from "next-intl/server";
import { ContactForm } from "@/components/portfolio/ContactForm";
import {
  getContactMailto,
  getGithubUrl,
  getLinkedinUrl,
} from "@/site";
import {
  getResumeDownloadFilename,
  getResumeUrl,
  isLocalResume,
} from "@/server/resume";
import { isContactFormConfigured } from "@/server/contact-mail";

type Props = {
  initialIntent?: string;
};

export async function ContactPage({ initialIntent = "" }: Props) {
  const t = await getTranslations("contactPage");
  const tHero = await getTranslations("hero");
  const tCta = await getTranslations("cta");
  const tFooter = await getTranslations("footer");
  const locale = await getLocale();
  const resumeUrl = getResumeUrl(locale);
  const resumeDownload = getResumeDownloadFilename(locale);
  const formEnabled = isContactFormConfigured();
  const mailto = getContactMailto("[SAIFCORE] Contact");
  const linkedinUrl = getLinkedinUrl();
  const githubUrl = getGithubUrl();

  const links = [
    mailto ? { href: mailto, label: t("email"), hint: t("emailHint") } : null,
    linkedinUrl ? { href: linkedinUrl, label: t("linkedin"), hint: "↗" } : null,
    githubUrl ? { href: githubUrl, label: t("github"), hint: "↗" } : null,
    resumeUrl
      ? {
          href: resumeUrl,
          label: t("resume"),
          hint: "↓",
          download: resumeDownload,
        }
      : null,
  ].filter((link): link is NonNullable<typeof link> => link != null);

  return (
    <section id="contact" className="py-12 sm:py-16 lg:py-24">
      <div className="page-container grid gap-10 lg:grid-cols-2 lg:gap-20">
        <div className="flex flex-col gap-5">
          <p className="site-kicker">{t("label")}</p>
          <h1 className="text-pretty font-display text-[clamp(2.125rem,4.6vw,3.5rem)] font-semibold leading-[1.05] tracking-tight text-[var(--text-primary)]">
            {t("title")}
          </h1>
          <p className="max-w-[44ch] text-lg text-[var(--text-muted)]">
            {t("subtitle")}
          </p>
          <p className="inline-flex w-fit items-center gap-2 rounded-full border border-[var(--border-subtle)] bg-[var(--bg-elevated)]/70 px-3 py-1.5 font-mono text-xs text-[var(--text-muted)]">
            <span
              aria-hidden
              className="status-live h-1.5 w-1.5 rounded-full bg-[var(--ok)]"
            />
            {tHero("availability")}
          </p>
          <div className="flex flex-col border-t border-[var(--border-subtle)]">
            {links.map((link) => {
              const isDownload =
                "download" in link &&
                Boolean(link.download) &&
                Boolean(resumeUrl) &&
                isLocalResume(resumeUrl);
              const isMailto = link.href.startsWith("mailto:");
              return (
                <a
                  key={link.label}
                  href={link.href}
                  className="flex justify-between border-b border-[var(--border-subtle)] py-3.5 text-[15px] text-[var(--text-primary)] transition-colors hover:text-[var(--accent)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus-ring)]"
                  {...(isDownload
                    ? { download: link.download }
                    : isMailto
                      ? {}
                      : { target: "_blank", rel: "noopener noreferrer" })}
                >
                  {link.label}
                  <span className="font-mono text-[13px] text-[var(--text-muted)]">
                    {link.hint}
                  </span>
                </a>
              );
            })}
          </div>
        </div>
        <ContactForm
          initialIntent={initialIntent}
          showAside={false}
          subject={tCta("emailSubject")}
          formEnabled={formEnabled}
          formName={tCta("formName")}
          formEmail={tCta("formEmail")}
          formCompany={tCta("formCompany")}
          formIntent={tCta("formIntent")}
          formIntentPlaceholder={tCta("formIntentPlaceholder")}
          formIntentHiring={tCta("formIntentHiring")}
          formIntentFreelance={tCta("formIntentFreelance")}
          formIntentOther={tCta("formIntentOther")}
          formMessage={tCta("formMessage")}
          formMessagePlaceholder={tCta("formMessagePlaceholder")}
          formMessagePlaceholderHiring={tCta("formMessagePlaceholderHiring")}
          formMessagePlaceholderFreelance={tCta(
            "formMessagePlaceholderFreelance",
          )}
          formSubmit={tCta("formSubmit")}
          formSending={tCta("formSending")}
          formSuccess={tCta("formSuccess")}
          formSuccessHint={tCta("formSuccessHint")}
          formSendAnother={tCta("formSendAnother")}
          formError={tCta("formError")}
          formNote={tCta("formNote")}
          formUnavailable={tCta("formUnavailable")}
          socialTitle={tCta("socialTitle")}
          linkedinLabel={tFooter("linkedin")}
          githubLabel={tFooter("github")}
          emailLabel={tCta("startProject")}
        />
      </div>
    </section>
  );
}
