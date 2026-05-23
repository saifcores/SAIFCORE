import { getTranslations } from "next-intl/server";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { getProfileDisplayName } from "@/site";
import { MotionReveal } from "@/components/portfolio/motion/MotionReveal";

export async function AboutTeaser() {
  const t = await getTranslations("aboutTeaser");
  const about = await getTranslations("about");
  const displayName = getProfileDisplayName();

  const stats = [
    { value: t("stat1Value"), label: t("stat1Label") },
    { value: t("stat2Value"), label: t("stat2Label") },
    { value: t("stat3Value"), label: t("stat3Label") },
  ] as const;

  return (
    <section className="border-b border-[var(--border-subtle)] bg-[var(--bg-elevated)]/10 px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-[1280px]">
        <div className="grid items-center gap-12 lg:grid-cols-[1fr_320px] lg:gap-16">
          <MotionReveal>
            <p className="mb-4 text-xs font-medium uppercase tracking-[0.18em] text-[var(--text-muted)]">
              {t("title")}
            </p>
            <h2 className="max-w-xl text-3xl font-bold tracking-tight text-[var(--text-primary)] sm:text-4xl">
              {t("heading")}
            </h2>
            <p className="mt-5 max-w-lg leading-relaxed text-[var(--text-secondary)]">
              {t("excerpt")}
            </p>
            <p className="mt-4 text-sm text-[var(--text-muted)]">
              {about("p4")}
            </p>

            <div className="mt-10 flex flex-wrap gap-8">
              {stats.map((stat) => (
                <div key={stat.label}>
                  <p className="text-gradient text-2xl font-bold">
                    {stat.value}
                  </p>
                  <p className="mt-1 text-xs text-[var(--text-muted)]">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>

            <Link
              href="/about"
              className="mt-10 inline-flex items-center gap-2 text-sm font-semibold text-blue-400 transition hover:text-blue-300"
            >
              {t("readMore")}
              <span aria-hidden>→</span>
            </Link>
          </MotionReveal>

          <MotionReveal delay={120}>
            <div className="relative mx-auto max-w-xs lg:mx-0 lg:ml-auto">
              <div
                className="absolute -inset-3 rounded-3xl bg-gradient-to-br from-blue-600/15 to-emerald-500/10 blur-xl"
                aria-hidden
              />
              <div className="glass relative overflow-hidden rounded-2xl p-8 text-center">
                <div className="mx-auto h-24 w-24 overflow-hidden rounded-xl bg-gradient-to-br from-[#2563EB] to-[#10B981] shadow-lg">
                  <Image
                    src="/profile.png"
                    alt={displayName}
                    width={96}
                    height={96}
                    className="h-full w-full object-cover"
                  />
                </div>
                <p className="mt-5 text-xs font-medium uppercase tracking-[0.16em] text-[var(--text-muted)]">
                  {about("cardRole")}
                </p>
                <p className="mt-2 text-sm font-semibold text-[var(--text-primary)]">
                  {about("cardTagline")}
                </p>
              </div>
            </div>
          </MotionReveal>
        </div>
      </div>
    </section>
  );
}
