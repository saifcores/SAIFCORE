import { getMessages, getTranslations } from "next-intl/server";
import Image from "next/image";
import { getProfileDisplayName } from "@/site";
import { BankingLeadership } from "./BankingLeadership";
import { CertificationsSection } from "./CertificationsSection";
import { EducationSection } from "./EducationSection";
import { ProfileExploreLinks } from "./ProfileExploreLinks";
import { Reveal } from "./Reveal";
import { VisionSection } from "./VisionSection";

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
      className={`px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-24 ${extended ? "" : "border-b border-[var(--border-subtle)]"}`}
    >
      <div className="mx-auto max-w-[1280px]">
        <div className="grid gap-10 md:grid-cols-2 md:items-center md:gap-16 lg:gap-20">
          <Reveal>
            {!extended ? (
              <p className="mb-4 text-xs font-medium uppercase tracking-[0.18em] text-[var(--text-muted)]">
                {t("title")}
              </p>
            ) : null}
            {extended ? (
              <p className="mb-4 text-sm font-medium text-[var(--text-secondary)]">
                {t("legalName")}
              </p>
            ) : null}
            <p className="text-pretty text-sm leading-relaxed text-[var(--text-secondary)] sm:text-base">
              {t("p1")}
            </p>
            <p className="mt-3 text-pretty text-sm leading-relaxed text-[var(--text-secondary)] sm:mt-4 sm:text-base">
              {t("p2a")}{" "}
              <strong className="font-semibold text-[var(--text-primary)]">
                {t("p2b")}
              </strong>
              {t("p2c")}
            </p>
            <p className="mt-3 text-pretty text-sm leading-relaxed text-[var(--text-secondary)] sm:mt-4 sm:text-base">
              {t("p3")}
            </p>
            <p className="mt-3 text-pretty text-sm leading-relaxed text-[var(--text-secondary)] sm:mt-4 sm:text-base">
              {t("p4")}
            </p>
          </Reveal>

          <Reveal delay={120}>
            <div className="relative mx-auto max-w-md lg:max-w-none">
              <div
                className="absolute -inset-4 rounded-[28px] bg-gradient-to-br from-blue-600/20 via-blue-500/8 to-emerald-500/15 blur-2xl"
                aria-hidden
              />
              <div className="relative overflow-hidden rounded-[24px] border border-[var(--border-subtle)] bg-[var(--bg-elevated)]/60 p-5 text-center backdrop-blur-sm sm:p-8 md:p-10">
                <div
                  className="mx-auto flex h-24 w-24 items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-[var(--accent-blue)] to-[var(--accent-emerald)] shadow-lg shadow-blue-500/25 sm:h-28 sm:w-28"
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

                <div className="mt-8 grid grid-cols-3 gap-2 border-t border-[var(--border-subtle)] pt-8 text-center sm:gap-4">
                  <div>
                    <p className="text-gradient text-xl font-bold sm:text-2xl">
                      {t("statYearsValue")}
                    </p>
                    <p className="mt-1 text-[10px] text-[var(--text-muted)] sm:text-xs">
                      {t("statYears")}
                    </p>
                  </div>
                  <div>
                    <p className="text-gradient text-xl font-bold sm:text-2xl">
                      {t("statSystemsValue")}
                    </p>
                    <p className="mt-1 text-[10px] text-[var(--text-muted)] sm:text-xs">
                      {t("statSystems")}
                    </p>
                  </div>
                  <div>
                    <p className="text-gradient text-xl font-bold sm:text-2xl">
                      {t("statCuriosityValue")}
                    </p>
                    <p className="mt-1 text-[10px] text-[var(--text-muted)] sm:text-xs">
                      {t("statCuriosity")}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>

        {extended ? (
          <div className="mt-12 border-t border-[var(--border-subtle)] pt-10 sm:mt-16 sm:pt-14 md:mt-20 md:pt-16">
            <ProfileExploreLinks excludePath="/about" />
          </div>
        ) : null}

        {extended ? (
          <div className="mt-12 border-t border-[var(--border-subtle)] pt-10 sm:mt-16 sm:pt-14 md:mt-20 md:pt-16">
            <CertificationsSection compact />
          </div>
        ) : null}

        {extended ? (
          <div className="mt-12 border-t border-[var(--border-subtle)] pt-10 sm:mt-16 sm:pt-14 md:mt-20 md:pt-16">
            <Reveal delay={120}>
              <p className="mb-4 text-xs font-medium uppercase tracking-[0.18em] text-[var(--text-muted)]">
                {t("languagesTitle")}
              </p>
              <ul className="grid gap-3 sm:grid-cols-2">
                {messages.about.languages.map((lang) => (
                  <li
                    key={lang.name}
                    className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-elevated)]/25 px-4 py-3"
                  >
                    <p className="font-semibold text-[var(--text-primary)]">
                      {lang.name}
                    </p>
                    <p className="mt-1 text-sm text-[var(--text-secondary)]">
                      {lang.level}
                    </p>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        ) : null}

        {extended ? (
          <div className="mt-20 border-t border-[var(--border-subtle)]">
            <EducationSection />
          </div>
        ) : null}

        {extended ? (
          <div className="border-b border-[var(--border-subtle)]">
            <VisionSection />
          </div>
        ) : null}

        {extended ? (
          <div className="border-b border-[var(--border-subtle)]">
            <BankingLeadership />
          </div>
        ) : null}

        {extended && engagements ? (
          <>
            <Reveal delay={160}>
              <div className="mt-12 border-t border-[var(--border-subtle)] pt-10 sm:mt-16 sm:pt-14 md:mt-20 md:pt-16">
                <p className="mb-4 text-xs font-medium uppercase tracking-[0.18em] text-[var(--text-muted)]">
                  {t("engagementsTitle")}
                </p>
                <div className="grid gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
                  {engagements.map((item) => (
                    <article
                      key={item.title}
                      className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-elevated)]/25 p-5 transition hover:border-[var(--border-hover)] sm:p-6"
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
          </>
        ) : null}
      </div>
    </section>
  );
}
