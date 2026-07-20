import { getMessages, getTranslations } from "next-intl/server";
import { ARCHITECTURE_TAG_HIGHLIGHT_COUNT } from "@/types/messages";
import { Reveal } from "./Reveal";

export async function ArchitectureExpertise() {
  const messages = await getMessages();
  const tags = messages.architectureExpertise.tags;
  const t = await getTranslations("architectureExpertise");

  return (
    <section className="border-b border-[var(--border-subtle)] px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
      <div className="mx-auto max-w-[1280px]">
        <Reveal>
          <p className="mb-4 text-xs font-medium uppercase tracking-[0.18em] text-[var(--text-muted)]">
            {t("title")}
          </p>
          <h2 className="max-w-2xl text-pretty text-2xl font-bold tracking-tight text-[var(--text-primary)] sm:text-3xl md:text-4xl">
            {t("subtitle")}
          </h2>
        </Reveal>

        <Reveal delay={100}>
          <div className="mt-8 flex flex-wrap gap-2 sm:mt-10 sm:gap-3">
            {tags.map((tag, i) => {
              const highlight = i < ARCHITECTURE_TAG_HIGHLIGHT_COUNT;
              return (
                <span
                  key={`${tag.label}-${i}`}
                  className={`rounded-full border px-3 py-1.5 text-xs font-medium transition hover:border-[var(--border-hover)] hover:text-[var(--text-primary)] sm:px-4 sm:py-2 sm:text-sm ${
                    highlight
                      ? "border-blue-500/30 bg-gradient-to-r from-blue-500/12 to-emerald-500/8 text-[var(--text-primary)]"
                      : "border-[var(--border-subtle)] text-[var(--text-secondary)]"
                  }`}
                >
                  {tag.label}
                </span>
              );
            })}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
