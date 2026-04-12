import { getMessages, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Reveal } from "./Reveal";

export async function FeaturedProjects() {
  const messages = await getMessages();
  const items = messages.featuredProjects.items;
  const t = await getTranslations("featuredProjects");

  return (
    <section id="work" className="px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-[1280px]">
        <Reveal>
          <h2 className="text-3xl font-bold tracking-tight text-[var(--text-primary)] sm:text-4xl">
            {t("title")}
          </h2>
          <p className="mt-4 max-w-2xl text-[var(--text-secondary)]">
            {t("subtitle")}
          </p>
        </Reveal>

        <div className="mt-14 grid gap-8 md:grid-cols-2">
          {items.map((item, i) => {
            const external = item.href.trim();
            return (
              <Reveal key={item.title} delay={i * 90}>
                <article className="group relative flex h-full flex-col overflow-hidden rounded-[20px] border border-[var(--border-subtle)] bg-[var(--bg-elevated)]/40 p-8 transition duration-300 hover:-translate-y-2 hover:border-indigo-500/25 hover:shadow-[0_24px_64px_-16px_rgba(79,70,229,0.35)]">
                  <div
                    className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full bg-gradient-to-br from-indigo-600/25 to-cyan-500/10 blur-2xl transition group-hover:opacity-100 opacity-70"
                    aria-hidden
                  />
                  <div className="relative flex flex-wrap items-center gap-2">
                    <h3 className="text-xl font-semibold text-[var(--text-primary)]">
                      {item.title}
                    </h3>
                    {item.status ? (
                      <span
                        className="rounded-full border border-[var(--border-subtle)] bg-[var(--bg-base)]/90 px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-[var(--accent-cyan)]"
                        title={`${t("statusLabel")}: ${item.status}`}
                      >
                        {item.status}
                      </span>
                    ) : null}
                  </div>
                  <p className="relative mt-3 flex-1 text-sm leading-relaxed text-[var(--text-secondary)]">
                    {item.context}
                  </p>
                  <div className="relative mt-6 flex flex-wrap gap-2">
                    {item.stacks.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-base)]/80 px-2.5 py-1 text-xs font-medium text-[var(--text-muted)]"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="relative mt-6 rounded-xl border border-indigo-500/20 bg-gradient-to-r from-indigo-500/10 to-cyan-500/5 px-4 py-3 text-sm font-medium text-[var(--text-primary)]">
                    <span className="text-xs font-semibold uppercase tracking-wider text-[var(--accent-cyan)]">
                      {t("impactLabel")}
                    </span>
                    <p className="mt-1">{item.impact}</p>
                  </div>
                  {external ? (
                    <a
                      href={external}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="relative mt-4 inline-flex items-center gap-1 text-sm font-semibold text-[var(--accent-cyan)] transition hover:gap-2"
                    >
                      {item.linkLabel}
                      <span aria-hidden>→</span>
                    </a>
                  ) : null}
                </article>
              </Reveal>
            );
          })}
        </div>

        <Reveal delay={280}>
          <div className="mt-16 flex flex-col items-center justify-center gap-4 rounded-[20px] border border-dashed border-[var(--border-subtle)] bg-[var(--bg-elevated)]/30 px-6 py-10 text-center sm:flex-row sm:gap-8 sm:px-10">
            <div className="max-w-md">
              <p className="text-base font-semibold text-[var(--text-primary)]">
                {t("bridgeTitle")}
              </p>
              <p className="mt-2 text-sm text-[var(--text-secondary)]">
                {t("bridgeSubtitle")}
              </p>
            </div>
            <Link
              href="/#contact"
              className="inline-flex shrink-0 items-center justify-center rounded-2xl bg-gradient-to-r from-[#2563eb] to-[#6366f1] px-8 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-500/25 transition hover:brightness-110 active:scale-[0.98]"
            >
              {t("bridgeCta")}
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
