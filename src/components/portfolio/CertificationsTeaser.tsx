import { getMessages, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import {
  getTeaserCertifications,
  hasObtainedCertifications,
} from "@/data/certifications";
import { CertificationIcon, getStatusLabelKey } from "./CertificationIcon";
import { MotionReveal } from "@/components/portfolio/motion/MotionReveal";

export async function CertificationsTeaser() {
  const t = await getTranslations("certifications");
  const messages = await getMessages();
  const teaserItems = getTeaserCertifications();

  if (teaserItems.length === 0) {
    return null;
  }

  const statusLabel = (status: (typeof teaserItems)[number]["status"]) =>
    t(getStatusLabelKey(status));

  return (
    <section
      id="certifications"
      className="border-b border-[var(--border-subtle)] px-4 py-10 sm:px-6 sm:py-12 lg:px-8 lg:py-16"
    >
      <div className="mx-auto max-w-[1280px]">
        <MotionReveal>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div className="min-w-0 flex-1">
              <p className="mb-2 text-xs font-medium uppercase tracking-[0.18em] text-[var(--text-muted)]">
                {t("title")}
              </p>
              <h2 className="max-w-2xl text-pretty text-xl font-bold tracking-tight text-[var(--text-primary)] sm:text-2xl">
                {t("teaserHeading")}
              </h2>
            </div>
            {hasObtainedCertifications() ? (
              <Link
                href="/certifications"
                className="inline-flex min-h-10 shrink-0 items-center gap-1.5 text-sm font-semibold text-accent transition hover:text-[var(--accent-blue-light)]"
              >
                {t("viewAll")}
                <span aria-hidden>→</span>
              </Link>
            ) : null}
          </div>
        </MotionReveal>

        <ul className="mt-6 flex flex-col gap-2 sm:mt-8 sm:flex-row sm:flex-wrap">
          {teaserItems.map((cert, i) => {
            const copy = messages.certifications.items[cert.id];
            return (
              <li key={cert.id} className="min-w-0 sm:max-w-xs sm:flex-1">
                <MotionReveal delay={i * 40}>
                  <div className="flex items-center gap-3 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-elevated)]/20 px-3 py-3">
                    <CertificationIcon
                      kind={cert.kind}
                      status={cert.status}
                      statusLabel={statusLabel(cert.status)}
                    />
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold text-[var(--text-primary)]">
                        {copy.name}
                      </p>
                      <p className="truncate text-[11px] text-[var(--text-muted)]">
                        {copy.issuer}
                      </p>
                    </div>
                  </div>
                </MotionReveal>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
