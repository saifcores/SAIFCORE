import { getTranslations } from "next-intl/server";
import { BookCallLink } from "@/components/portfolio/BookCallLink";
import { getContactMailto } from "@/site";
import { getResumeUrl, isLocalResume } from "@/server/resume";
import { Reveal } from "./Reveal";

export async function CtaSection() {
  const t = await getTranslations("cta");
  const mailto = getContactMailto(t("emailSubject"));
  const resumeUrl = getResumeUrl();

  return (
    <section id="contact" className="px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-[1280px]">
        <Reveal>
          <div className="relative overflow-hidden rounded-[24px] border border-[var(--border-subtle)] bg-gradient-to-br from-indigo-600/20 via-[var(--bg-elevated)]/80 to-cyan-500/10 px-8 py-16 text-center sm:px-12 sm:py-20">
            <div className="bg-grid pointer-events-none absolute inset-0 opacity-30" />
            <div
              className="pointer-events-none absolute -left-20 top-1/2 h-64 w-64 -translate-y-1/2 rounded-full bg-indigo-500/25 blur-3xl"
              aria-hidden
            />
            <div
              className="pointer-events-none absolute -right-20 top-1/2 h-64 w-64 -translate-y-1/2 rounded-full bg-cyan-500/15 blur-3xl"
              aria-hidden
            />

            <h2 className="relative text-3xl font-bold tracking-tight text-[var(--text-primary)] sm:text-4xl lg:text-[2.75rem]">
              {t("title")}
            </h2>
            <p className="relative mx-auto mt-4 max-w-xl text-[var(--text-secondary)]">
              {t("subtitle")}
            </p>
            <div className="relative mx-auto mt-8 max-w-lg rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-base)]/50 px-6 py-5 text-left">
              <p className="text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)]">
                {t("processTitle")}
              </p>
              <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm leading-relaxed text-[var(--text-secondary)]">
                <li>{t("processStep1")}</li>
                <li>{t("processStep2")}</li>
                <li>{t("processStep3")}</li>
              </ol>
              <p className="mt-4 text-xs text-[var(--text-muted)]">
                {t("responseHint")}
              </p>
            </div>
            <div className="relative mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row sm:flex-wrap">
              <BookCallLink className="inline-flex h-12 min-w-[180px] items-center justify-center rounded-2xl bg-gradient-to-r from-[#2563eb] to-[#6366f1] px-8 text-base font-semibold text-white shadow-lg shadow-indigo-500/30 transition hover:brightness-110 active:scale-[0.98]">
                {t("bookCall")}
              </BookCallLink>
              {mailto ? (
                <a
                  href={mailto}
                  className="inline-flex h-12 min-w-[180px] items-center justify-center rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-base)]/60 px-8 text-base font-semibold text-[var(--text-primary)] backdrop-blur-sm transition hover:border-[var(--accent-indigo)]/35 active:scale-[0.98]"
                >
                  {t("startProject")}
                </a>
              ) : null}
              {resumeUrl ? (
                <a
                  href={resumeUrl}
                  className="inline-flex h-12 min-w-[180px] items-center justify-center rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-base)]/40 px-8 text-base font-semibold text-[var(--text-primary)] backdrop-blur-sm transition hover:border-[var(--accent-indigo)]/35 active:scale-[0.98]"
                  {...(isLocalResume(resumeUrl)
                    ? { download: "SAIFCORE-resume.pdf" }
                    : { target: "_blank", rel: "noopener noreferrer" })}
                >
                  {t("downloadResume")}
                </a>
              ) : null}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
