import { getMessages, getTranslations } from "next-intl/server";
import { ARCHITECTURE_TAG_HIGHLIGHT_COUNT } from "@/types/messages";
import { Reveal } from "./Reveal";

export async function ArchitectureExpertise() {
  const messages = await getMessages();
  const tags = messages.architectureExpertise.tags;
  const t = await getTranslations("architectureExpertise");

  return (
    <section className="border-b border-[var(--border-subtle)] px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-[1280px]">
        <Reveal>
          <p className="mb-4 text-xs font-medium uppercase tracking-[0.18em] text-[var(--text-muted)]">
            {t("title")}
          </p>
          <h2 className="max-w-2xl text-3xl font-bold tracking-tight text-[var(--text-primary)] sm:text-4xl">
            {t("subtitle")}
          </h2>
        </Reveal>

        <Reveal delay={100}>
          <div className="mt-10 flex flex-wrap gap-3">
            {tags.map((tag, i) => {
              const highlight = i < ARCHITECTURE_TAG_HIGHLIGHT_COUNT;
              return (
                <span
                  key={`${tag.label}-${i}`}
                  className={`rounded-full border px-4 py-2 text-sm font-medium transition hover:border-white/15 hover:text-[var(--text-primary)] ${
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
