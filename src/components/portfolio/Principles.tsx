import { getMessages, getTranslations } from "next-intl/server";
import { Reveal } from "./Reveal";

export async function Principles() {
  const t = await getTranslations("principles");
  const messages = await getMessages();

  return (
    <section
      id="approach"
      aria-labelledby="principles-heading"
      className="section-alt section-home scroll-mt-24 pb-10 sm:pb-12"
    >
      <div className="page-container">
        <Reveal>
          <p className="site-kicker mb-2">{t("label")}</p>
          <h2
            id="principles-heading"
            className="mb-7 max-w-[28ch] text-pretty text-lg font-semibold tracking-tight text-[var(--text-primary)] sm:text-xl"
          >
            {t("title")}
          </h2>
        </Reveal>
        <div className="grid gap-x-8 gap-y-6 sm:grid-cols-2 lg:grid-cols-4">
          {messages.principles.items.map((item, index) => (
            <Reveal key={item.code} delay={index * 40} className="h-full">
              <div className="flex h-full flex-col gap-1.5">
                <div className="font-mono text-[11px] text-[var(--cyan)]">
                  {item.code}
                </div>
                <div className="font-semibold text-[var(--text-primary)]">
                  {item.title}
                </div>
                <div className="text-pretty text-sm text-[var(--text-muted)]">
                  {item.body}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
