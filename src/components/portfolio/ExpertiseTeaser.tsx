import { getMessages, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Reveal } from "./Reveal";
import { SectionHeader } from "./SectionHeader";

export async function ExpertiseTeaser() {
  const t = await getTranslations("expertise");
  const messages = await getMessages();

  return (
    <section
      id="expertise"
      aria-labelledby="expertise-heading"
      className="section-home scroll-mt-24 xl:scroll-mt-28"
    >
      <div className="page-container">
        <Reveal>
          <SectionHeader
            kicker={t("label")}
            title={t("title")}
            titleId="expertise-heading"
            action={
              <Link href="/expertise" className="link-more" data-arrow>
                {t("viewAll")}
              </Link>
            }
          />
        </Reveal>
        <div className="grid border-t border-[var(--border-subtle)] sm:grid-cols-2 lg:grid-cols-4">
          {messages.expertise.items.map((item, index) => (
            <Reveal key={item.num} delay={index * 50} className="h-full">
              <Link
                href={`/expertise#expertise-${item.num}` as "/expertise"}
                className={`flex h-full flex-col gap-2.5 border-b border-[var(--border-subtle)] py-6 transition-colors hover:text-[var(--text-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus-ring)] sm:px-6 lg:border-r ${
                  index % 2 === 0 ? "sm:border-r sm:pl-0" : "sm:pr-0"
                } ${index === 0 ? "lg:pl-0" : "lg:pl-6"} ${
                  index === 3 ? "lg:border-r-0 lg:pr-0" : "lg:pr-6"
                }`}
              >
                <div className="font-mono text-xs text-[var(--accent)]">
                  {item.num}
                </div>
                <div className="text-lg font-semibold text-[var(--text-primary)]">
                  {item.title}
                </div>
                <div className="text-pretty text-sm text-[var(--text-muted)]">
                  {item.short}
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
