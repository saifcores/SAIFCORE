import { getLocale, getMessages, getTranslations } from "next-intl/server";
import { getPathname } from "@/i18n/navigation";
import { Reveal } from "./Reveal";

export async function HomeContact() {
  const t = await getTranslations("homeContact");
  const messages = await getMessages();
  const locale = await getLocale();
  const contactPath = getPathname({
    href: "/contact",
    locale: locale === "fr" ? "fr" : "en",
  });

  return (
    <section
      id="contact"
      aria-labelledby="home-contact-heading"
      className="section-home scroll-mt-24 pb-14 sm:pb-16 lg:pb-20 xl:scroll-mt-28"
    >
      <div className="page-container">
        <Reveal>
          <div className="relative overflow-hidden rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-elevated)] p-7 shadow-[var(--shadow-card)] sm:p-10 lg:p-14">
            <div
              className="absolute inset-y-0 left-0 w-[3px] bg-[var(--accent)]"
              aria-hidden
            />
            <div className="grid items-center gap-8 lg:grid-cols-[minmax(0,1fr)_auto]">
              <div className="flex flex-col gap-3">
                <h2 id="home-contact-heading" className="section-heading">
                  {t("title")}
                </h2>
                <p className="max-w-[46ch] text-[var(--text-secondary)]">
                  {t("subtitle")}
                </p>
                <ul className="mt-2 flex max-w-[48ch] flex-col gap-1.5 text-sm text-[var(--text-muted)]">
                  {messages.homeContact.points.map((point) => (
                    <li key={point} className="flex gap-2">
                      <span aria-hidden className="text-[var(--accent-blue)]">
                        ·
                      </span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap lg:justify-end">
                <a
                  href={`${contactPath}?intent=freelance`}
                  className="btn-primary inline-flex min-h-12 w-full items-center justify-center px-5 text-[15px] sm:w-auto"
                >
                  {t("sendBrief")}
                </a>
                <a
                  href={`${contactPath}?intent=hiring`}
                  className="btn-outline inline-flex min-h-12 w-full items-center justify-center px-5 text-[15px] font-medium sm:w-auto"
                >
                  {t("sendRoleBrief")}
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
