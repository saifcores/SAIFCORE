import { getLocale, getMessages, getTranslations } from "next-intl/server";
import { getPathname } from "@/i18n/navigation";
import { Reveal } from "./Reveal";

export async function OffersHome() {
  const t = await getTranslations("offersHome");
  const messages = await getMessages();
  const locale = await getLocale();
  const offerHref = `${getPathname({
    href: "/contact",
    locale: locale === "fr" ? "fr" : "en",
  })}?intent=freelance`;

  return (
    <section
      id="offers"
      aria-labelledby="offers-heading"
      className="section-home scroll-mt-24 xl:scroll-mt-28"
    >
      <div className="page-container">
        <Reveal>
          <p className="site-kicker mb-3">{t("label")}</p>
          <h2
            id="offers-heading"
            className="section-heading mb-3 max-w-[22ch]"
          >
            {t("title")}
          </h2>
          <p className="mb-6 max-w-[62ch] text-[15px] text-[var(--text-muted)]">
            {t("subtitle")}
          </p>
        </Reveal>
        <div className="grid overflow-hidden rounded-xl border border-[var(--border-subtle)] bg-[var(--border-subtle)] sm:grid-cols-2 lg:grid-cols-4">
          {messages.offersHome.items.map((item, index) => (
            <Reveal key={item.title} delay={index * 40} className="h-full">
              <a
                href={offerHref}
                className={`flex h-full flex-col gap-2 bg-[var(--bg-base)] p-5 transition-colors hover:bg-[var(--bg-elevated)] hover:text-[var(--text-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[var(--focus-ring)] ${
                  index === 0
                    ? "bg-[color-mix(in_srgb,var(--accent)_6%,var(--bg-base))]"
                    : ""
                }`}
              >
                <div className="font-mono text-xs text-[var(--text-muted)]">
                  {item.duration}
                </div>
                <div className="text-lg font-semibold text-[var(--text-primary)]">
                  {item.title}
                </div>
                <div className="text-pretty text-sm text-[var(--text-muted)]">
                  {item.description}
                </div>
                <div className="mt-auto flex items-end justify-between gap-3 pt-3">
                  <span className="font-mono text-sm text-[var(--text-primary)]">
                    {item.price}
                  </span>
                  <span className="text-[13px] font-medium text-[var(--text-primary)]">
                    {t("cta")} →
                  </span>
                </div>
              </a>
            </Reveal>
          ))}
        </div>
        <p className="mt-4 text-[13px] text-[var(--text-muted)]">{t("note")}</p>
      </div>
    </section>
  );
}
