import { getMessages, getTranslations } from "next-intl/server";
import { Reveal } from "./Reveal";

export async function VisionSection() {
  const messages = await getMessages();
  const { stats, positioning } = messages.visionSection;
  const t = await getTranslations("visionSection");

  return (
    <section className="relative overflow-hidden px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-28">
      {/* Ambient orbs */}
      <div
        className="pointer-events-none absolute left-1/4 top-0 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-blue-600/20 to-transparent blur-3xl animate-orb"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute right-1/4 bottom-0 h-[400px] w-[400px] translate-x-1/2 translate-y-1/2 rounded-full bg-gradient-to-tl from-emerald-500/15 to-transparent blur-3xl animate-orb-delay"
        aria-hidden
      />

      <div className="relative mx-auto max-w-[1280px]">
        <Reveal>
          <div className="mx-auto max-w-3xl text-center">
            {/* Label */}
            <p className="mb-6 text-xs font-medium uppercase tracking-[0.25em] text-[var(--text-muted)] sm:mb-8">
              {t("label")}
            </p>

            <h2 className="text-pretty text-2xl font-bold tracking-tight text-[var(--text-primary)] sm:text-3xl md:text-4xl lg:text-5xl lg:leading-[1.1]">
              {t("title")}
            </h2>

            <p className="mt-6 text-pretty text-base leading-relaxed text-[var(--text-secondary)] sm:mt-8 sm:text-lg md:text-xl">
              {t("body")}
            </p>
          </div>
        </Reveal>

        {/* Positioning path */}
        <Reveal delay={120}>
          <div className="mt-12 flex flex-col items-stretch justify-center gap-3 sm:mt-16 sm:flex-row sm:items-center sm:gap-0">
            {positioning.map((step, i) => (
              <div
                key={step}
                className="flex flex-col items-center sm:flex-row"
              >
                <div className="relative w-full sm:w-auto">
                  <div
                    className={`rounded-full border px-4 py-2 text-center text-sm font-semibold transition sm:px-5 sm:py-2.5 ${
                      i === 0
                        ? "border-blue-500/30 bg-gradient-to-r from-blue-500/15 to-blue-500/5 text-[var(--text-primary)]"
                        : i === 1
                          ? "border-indigo-500/30 bg-gradient-to-r from-indigo-500/12 to-indigo-500/5 text-[var(--text-primary)]"
                          : "border-emerald-500/30 bg-gradient-to-r from-emerald-500/15 to-emerald-500/5 text-[var(--text-primary)]"
                    }`}
                  >
                    {step}
                  </div>
                </div>
                {i < positioning.length - 1 ? (
                  <div
                    className="mx-3 hidden text-[var(--text-muted)] sm:block"
                    aria-hidden
                  >
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <path
                        d="M4 10h12M12 5l5 5-5 5"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                ) : null}
                {i < positioning.length - 1 ? (
                  <div
                    className="my-2 block text-[var(--text-muted)] sm:hidden"
                    aria-hidden
                  >
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <path
                        d="M10 4v12M5 12l5 5 5-5"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                ) : null}
              </div>
            ))}
          </div>
        </Reveal>

        {/* Stats */}
        <Reveal delay={200}>
          <div className="mt-12 grid grid-cols-1 gap-8 min-[480px]:grid-cols-3 sm:mt-16 sm:gap-10">
            {stats.map((stat, i) => (
              <div key={i} className="text-center">
                <p className="text-gradient text-2xl font-bold sm:text-3xl md:text-4xl">
                  {stat.value}
                </p>
                <p className="mt-2 text-sm text-[var(--text-muted)]">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </Reveal>

        {/* Divider line with tagline */}
        <Reveal delay={260}>
          <div className="mt-12 flex flex-col items-center gap-4 sm:mt-16 sm:flex-row sm:gap-6">
            <div className="hidden h-px flex-1 bg-gradient-to-r from-transparent via-[var(--border-subtle)] to-transparent sm:block" />
            <p className="text-center text-[10px] font-medium tracking-[0.18em] text-[var(--text-muted)] uppercase sm:text-xs">
              {t("dividerText")}
            </p>
            <div className="hidden h-px flex-1 bg-gradient-to-r from-transparent via-[var(--border-subtle)] to-transparent sm:block" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
