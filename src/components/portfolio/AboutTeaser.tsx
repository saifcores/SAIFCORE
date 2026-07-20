import { getTranslations } from "next-intl/server";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { getProfileDisplayName } from "@/site";
import { MotionReveal } from "@/components/portfolio/motion/MotionReveal";
import { ProfileExploreLinks } from "./ProfileExploreLinks";

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
    <section className="border-b border-[var(--border-subtle)] bg-[var(--bg-elevated)]/10 px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
      <div className="mx-auto max-w-[1280px]">
        <div className="grid items-center gap-10 md:grid-cols-2 md:gap-10 lg:grid-cols-[1fr_320px] lg:gap-16">
          <MotionReveal>
            <p className="mb-4 text-xs font-medium uppercase tracking-[0.18em] text-[var(--text-muted)]">
              {t("title")}
            </p>
            <h2 className="max-w-xl text-pretty text-2xl font-bold tracking-tight text-[var(--text-primary)] sm:text-3xl md:text-4xl">
              {t("heading")}
            </h2>
            <p className="mt-4 max-w-lg text-pretty text-sm leading-relaxed text-[var(--text-secondary)] sm:mt-5 sm:text-base">
              {t("excerpt")}
            </p>
            <p className="mt-3 text-pretty text-sm text-[var(--text-muted)] sm:mt-4">
              {about("p4")}
            </p>

            <div className="mt-8 grid grid-cols-3 gap-3 sm:mt-10 sm:flex sm:flex-wrap sm:gap-8">
              {stats.map((stat) => (
                <div key={stat.label} className="min-w-0">
                  <p className="text-gradient text-xl font-bold sm:text-2xl">
                    {stat.value}
                  </p>
                  <p className="mt-1 text-[10px] leading-snug text-[var(--text-muted)] sm:text-xs">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>

            <Link
              href="/about"
              className="mt-8 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-elevated)]/30 px-4 text-sm font-semibold text-accent transition hover:border-[var(--border-hover)] hover:text-[var(--accent-blue-light)] sm:mt-10 sm:w-auto sm:border-0 sm:bg-transparent sm:px-0"
            >
              {t("readMore")}
              <span aria-hidden>→</span>
            </Link>

            <ProfileExploreLinks compact className="mt-6 sm:mt-8" />
          </MotionReveal>

          <MotionReveal delay={120}>
            <div className="relative mx-auto max-w-xs lg:mx-0 lg:ml-auto">
              <div
                className="absolute -inset-3 rounded-3xl bg-gradient-to-br from-blue-600/15 to-emerald-500/10 blur-xl"
                aria-hidden
              />
              <div className="glass relative overflow-hidden rounded-2xl p-6 text-center sm:p-8">
                <div className="mx-auto h-24 w-24 overflow-hidden rounded-xl bg-gradient-to-br from-[var(--accent-blue)] to-[var(--accent-emerald)] shadow-lg">
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
