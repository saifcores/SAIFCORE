import { getMessages, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import {
  getTeaserCertifications,
  hasObtainedCertifications,
} from "@/data/certifications";
import {
  CertificationIcon,
  CertificationStatusPill,
  getStatusLabelKey,
} from "./CertificationIcon";
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
      className="border-b border-[var(--border-subtle)] px-4 py-24 sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-[1280px]">
        <MotionReveal>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="mb-4 text-xs font-medium uppercase tracking-[0.18em] text-[var(--text-muted)]">
                {t("title")}
              </p>
              <h2 className="max-w-2xl text-3xl font-bold tracking-tight text-[var(--text-primary)] sm:text-4xl">
                {t("teaserHeading")}
              </h2>
            </div>
            {hasObtainedCertifications() ? (
              <Link
                href="/certifications"
                className="inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold text-accent transition hover:text-[var(--accent-blue-light)]"
              >
                {t("viewAll")}
                <span aria-hidden>→</span>
              </Link>
            ) : null}
          </div>
        </MotionReveal>

        <ul className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {teaserItems.map((cert, i) => {
            const copy = messages.certifications.items[cert.id];
            return (
              <li key={cert.id}>
                <MotionReveal delay={i * 50}>
                  <div className="card-interactive flex h-full flex-col gap-3 rounded-2xl bg-[var(--bg-elevated)]/20 p-4">
                    <div className="flex items-center gap-3">
                      <CertificationIcon
                        kind={cert.kind}
                        status={cert.status}
                        statusLabel={statusLabel(cert.status)}
                      />
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-semibold leading-snug text-[var(--text-primary)]">
                          {copy.name}
                        </p>
                        <p className="mt-0.5 truncate text-[11px] text-[var(--text-muted)]">
                          {copy.issuer}
                        </p>
                      </div>
                    </div>
                    <CertificationStatusPill
                      status={cert.status}
                      label={statusLabel(cert.status)}
                    />
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
