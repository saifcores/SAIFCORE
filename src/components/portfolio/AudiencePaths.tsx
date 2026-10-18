import { getMessages, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import type { SitePath } from "@/seo";
import { Reveal } from "./Reveal";
import { SectionHeader } from "./SectionHeader";

export async function AudiencePaths() {
  const t = await getTranslations("audiencePaths");
  const messages = await getMessages();

  return (
    <section
      id="paths"
      aria-labelledby="audience-paths-heading"
      className="section-home scroll-mt-24 xl:scroll-mt-28"
    >
      <div className="page-container">
        <Reveal>
          <SectionHeader
            kicker={t("title")}
            title={t("subtitle")}
            titleId="audience-paths-heading"
          />
        </Reveal>
        <div className="grid gap-4 md:grid-cols-3">
          {messages.audiencePaths.items.map((item, index) => (
            <Reveal key={item.href} delay={index * 60} className="h-full">
              <Link
                href={item.href as SitePath}
                className="card-interactive flex h-full flex-col gap-2.5 rounded-xl p-6 hover:text-[var(--text-primary)] focus-visible:outline-none"
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="font-mono text-xs text-[var(--accent)]">
                    {item.who}
                  </div>
                  <div
                    className="font-mono text-[11px] tabular-nums text-[var(--text-muted)]"
                    aria-hidden
                  >
                    {String(index + 1).padStart(2, "0")}
                  </div>
                </div>
                <div className="text-[19px] font-semibold tracking-tight text-[var(--text-primary)]">
                  {item.title}
                </div>
                <div className="text-sm text-[var(--text-muted)]">
                  {item.path}
                </div>
                <div
                  className="link-more mt-auto pt-3 text-[var(--text-primary)]"
                  data-arrow
                >
                  {item.cta}
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
