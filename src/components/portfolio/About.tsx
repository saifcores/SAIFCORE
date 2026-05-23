import { getMessages, getTranslations } from "next-intl/server";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { getProfileDisplayName } from "@/site";
import { Reveal } from "./Reveal";

type Props = {
  /** Full about page: engagements grid + contact CTA */
  extended?: boolean;
};

export async function About({ extended = false }: Props) {
  const t = await getTranslations("about");
  const messages = await getMessages();
  const displayName = getProfileDisplayName();
  const engagements = extended ? messages.about.engagements : null;

  return (
    <section
      id="about"
      className={`px-4 py-24 sm:px-6 lg:px-8 ${extended ? "" : "border-b border-[var(--border-subtle)]"}`}
    >
      <div className="mx-auto max-w-[1280px]">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-20">
          <Reveal>
            {!extended ? (
              <p className="mb-4 text-xs font-medium uppercase tracking-[0.18em] text-[var(--text-muted)]">
                {t("title")}
              </p>
            ) : null}
            <p className="leading-relaxed text-[var(--text-secondary)]">
              {t("p1")}
            </p>
            <p className="mt-4 leading-relaxed text-[var(--text-secondary)]">
              {t("p2a")}{" "}
              <strong className="font-semibold text-[var(--text-primary)]">
                {t("p2b")}
              </strong>
              {t("p2c")}
            </p>
            <p className="mt-4 leading-relaxed text-[var(--text-secondary)]">
              {t("p3")}
            </p>
            <p className="mt-4 leading-relaxed text-[var(--text-secondary)]">
              {t("p4")}
            </p>
          </Reveal>

          <Reveal delay={120}>
            <div className="relative mx-auto max-w-md lg:max-w-none">
              <div
                className="absolute -inset-4 rounded-[28px] bg-gradient-to-br from-blue-600/20 via-blue-500/8 to-emerald-500/15 blur-2xl"
                aria-hidden
              />
              <div className="relative overflow-hidden rounded-[24px] border border-[var(--border-subtle)] bg-[var(--bg-elevated)]/60 p-10 text-center backdrop-blur-sm">
                <div
                  className="mx-auto flex h-28 w-28 items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-[#2563EB] to-[#10B981] shadow-lg shadow-blue-500/25"
                  aria-hidden
                >
                  <Image
                    src="/profile.png"
                    alt={displayName}
                    className="h-full w-full object-cover"
                    loading="lazy"
                    width={112}
                    height={112}
                  />
                </div>

                <p className="mt-6 text-xs font-medium uppercase tracking-[0.18em] text-[var(--text-muted)]">
                  {t("cardRole")}
                </p>
                <p className="mt-2 text-base font-semibold text-[var(--text-primary)]">
                  {t("cardTagline")}
                </p>

                <div className="mt-8 grid grid-cols-3 gap-4 border-t border-[var(--border-subtle)] pt-8 text-center">
                  <div>
                    <p className="text-gradient text-2xl font-bold">
                      {t("statYearsValue")}
                    </p>
                    <p className="mt-1 text-xs text-[var(--text-muted)]">
                      {t("statYears")}
                    </p>
                  </div>
                  <div>
                    <p className="text-gradient text-2xl font-bold">
                      {t("statSystemsValue")}
                    </p>
                    <p className="mt-1 text-xs text-[var(--text-muted)]">
                      {t("statSystems")}
                    </p>
                  </div>
                  <div>
                    <p className="text-gradient text-2xl font-bold">
                      {t("statCuriosityValue")}
                    </p>
                    <p className="mt-1 text-xs text-[var(--text-muted)]">
                      {t("statCuriosity")}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>

        {extended && engagements ? (
          <>
            <Reveal delay={160}>
              <div className="mt-20 border-t border-[var(--border-subtle)] pt-16">
                <p className="mb-4 text-xs font-medium uppercase tracking-[0.18em] text-[var(--text-muted)]">
                  {t("engagementsTitle")}
                </p>
                <div className="grid gap-5 sm:grid-cols-3">
                  {engagements.map((item) => (
                    <article
                      key={item.title}
                      className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-elevated)]/25 p-6 transition hover:border-[var(--border-hover)]"
                    >
                      <h3 className="font-semibold text-[var(--text-primary)]">
                        {item.title}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-[var(--text-secondary)]">
                        {item.description}
                      </p>
                    </article>
                  ))}
                </div>
              </div>
            </Reveal>

            <Reveal delay={240}>
              <div className="mt-12 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-elevated)]/20 px-6 py-12 text-center sm:px-10">
                <h2 className="text-xl font-bold tracking-tight text-[var(--text-primary)] sm:text-2xl">
                  {t("endCtaTitle")}
                </h2>
                <p className="mx-auto mt-3 max-w-lg text-sm text-[var(--text-secondary)] sm:text-base">
                  {t("endCtaSubtitle")}
                </p>
                <Link
                  href="/#contact"
                  className="mt-8 inline-flex h-12 min-w-[200px] items-center justify-center rounded-xl bg-gradient-to-r from-[#2563EB] to-[#10B981] px-8 text-sm font-semibold text-white shadow-[0_0_32px_-8px_rgba(37,99,235,0.45)] transition hover:brightness-110 active:scale-[0.98]"
                >
                  {t("endCtaButton")}
                </Link>
              </div>
            </Reveal>
          </>
        ) : null}
      </div>
    </section>
  );
}
