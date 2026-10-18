import { getLocale, getTranslations } from "next-intl/server";
import Image from "next/image";
import { getGithubUrl, getLinkedinUrl, getProfileDisplayName } from "@/site";
import {
  getResumeDownloadFilename,
  getResumeUrl,
  isLocalResume,
} from "@/server/resume";

export async function About() {
  const t = await getTranslations("about");
  const tSpec = await getTranslations("aboutSpec");
  const tCommon = await getTranslations("common");
  const locale = await getLocale();
  const displayName = getProfileDisplayName();
  const linkedinUrl = getLinkedinUrl();
  const githubUrl = getGithubUrl();
  const resumeUrl = getResumeUrl(locale);
  const resumeDownload = getResumeDownloadFilename(locale);
  const opensInNewTab = tCommon("opensInNewTab");

  const spec = [
    { k: tSpec("role"), v: tSpec("roleValue") },
    { k: tSpec("focus"), v: tSpec("focusValue") },
    { k: tSpec("stack"), v: tSpec("stackValue") },
    { k: tSpec("location"), v: tSpec("locationValue") },
    { k: tSpec("languages"), v: tSpec("languagesValue") },
  ];

  return (
    <section className="py-12 sm:py-16 lg:py-24">
      <div className="page-container grid gap-10 lg:grid-cols-[minmax(0,380px)_minmax(0,1fr)] lg:gap-20">
        <div className="flex max-w-[380px] flex-col gap-4">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[14px] border border-[var(--border-subtle)]">
            <Image
              src="/profile.png"
              alt={displayName}
              fill
              sizes="380px"
              className="object-cover"
              priority
            />
          </div>
          <dl className="grid grid-cols-[auto_minmax(0,1fr)] gap-x-4 gap-y-1.5 text-sm">
            {spec.map((row) => (
              <div key={row.k} className="contents">
                <dt className="font-mono text-xs text-[var(--text-muted)]">
                  {row.k}
                </dt>
                <dd className="m-0 text-[var(--text-primary)]">{row.v}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="flex max-w-[720px] flex-col gap-6">
          <p className="site-kicker">{t("title")}</p>
          <h1 className="text-pretty font-display text-[clamp(2rem,4.4vw,3.25rem)] font-semibold leading-[1.06] tracking-tight text-[var(--text-primary)]">
            {t("p1")}
          </h1>
          <p className="text-pretty text-lg text-[var(--text-muted)]">
            {t("p2a")}{" "}
            <strong className="font-semibold text-[var(--text-primary)]">
              {t("p2b")}
            </strong>
            {t("p2c")}
          </p>
          <p className="text-pretty text-lg text-[var(--text-muted)]">
            {t("p3")}
          </p>
          <div className="grid gap-4 rounded-xl border border-[var(--border-subtle)] p-5 sm:grid-cols-2">
            <div>
              <div className="mb-1 font-semibold text-[var(--text-primary)]">
                {tSpec("saifcoreTitle")}
              </div>
              <div className="text-sm text-[var(--text-muted)]">
                {tSpec("saifcoreBody")}
              </div>
            </div>
            <div>
              <div className="mb-1 font-semibold text-[var(--text-primary)]">
                {tSpec("manarixTitle")}
              </div>
              <div className="text-sm text-[var(--text-muted)]">
                {tSpec("manarixBody")}
              </div>
            </div>
          </div>
          <div className="flex flex-wrap gap-3">
            {linkedinUrl ? (
              <a
                href={linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`LinkedIn (${opensInNewTab})`}
                className="btn-outline inline-flex min-h-11 items-center px-4 text-sm"
              >
                LinkedIn ↗
              </a>
            ) : null}
            {githubUrl ? (
              <a
                href={githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`GitHub (${opensInNewTab})`}
                className="btn-outline inline-flex min-h-11 items-center px-4 text-sm"
              >
                GitHub ↗
              </a>
            ) : null}
            {resumeUrl ? (
              <a
                href={resumeUrl}
                className="btn-outline inline-flex min-h-11 items-center px-4 text-sm"
                {...(isLocalResume(resumeUrl)
                  ? { download: resumeDownload }
                  : { target: "_blank", rel: "noopener noreferrer" })}
              >
                CV (PDF) ↓
              </a>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
