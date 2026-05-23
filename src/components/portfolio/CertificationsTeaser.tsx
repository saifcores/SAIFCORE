import { getMessages, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { certificationsMeta } from "@/data/certifications";
import { CertificationIcon } from "./CertificationIcon";
import { MotionReveal } from "@/components/portfolio/motion/MotionReveal";

export async function CertificationsTeaser() {
  const t = await getTranslations("certifications");
  const messages = await getMessages();
  const featured = certificationsMeta.filter((c) => c.featured);

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
            <Link
              href="/about#certifications"
              className="inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold text-accent transition hover:text-[var(--accent-blue-light)]"
            >
              {t("viewAll")}
              <span aria-hidden>→</span>
            </Link>
          </div>
        </MotionReveal>

        <ul className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((cert, i) => {
            const copy = messages.certifications.items[cert.id];
            return (
              <li key={cert.id}>
                <MotionReveal delay={i * 50}>
                  <div className="card-interactive flex h-full items-center gap-3 rounded-2xl bg-[var(--bg-elevated)]/20 p-4">
                    <CertificationIcon kind={cert.kind} />
                    <div className="min-w-0">
                      <p className="text-sm font-semibold leading-snug text-[var(--text-primary)]">
                        {copy.name}
                      </p>
                      <p className="mt-0.5 truncate text-[11px] text-[var(--text-muted)]">
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
