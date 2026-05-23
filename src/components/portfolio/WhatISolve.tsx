import { getMessages, getTranslations } from "next-intl/server";
import { Reveal } from "./Reveal";

const icons = [
  /* Payments */
  <svg
    key="0"
    viewBox="0 0 24 24"
    className="h-5 w-5"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
    />
  </svg>,
  /* Credit */
  <svg
    key="1"
    viewBox="0 0 24 24"
    className="h-5 w-5"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
    />
  </svg>,
  /* Distributed */
  <svg
    key="2"
    viewBox="0 0 24 24"
    className="h-5 w-5"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
    />
  </svg>,
  /* Enterprise Architecture */
  <svg
    key="3"
    viewBox="0 0 24 24"
    className="h-5 w-5"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
    />
  </svg>,
];

const CARD_ACCENTS = [
  "from-blue-500/15 to-blue-500/5 border-blue-500/20",
  "from-indigo-500/15 to-indigo-500/5 border-indigo-500/20",
  "from-violet-500/15 to-violet-500/5 border-violet-500/20",
  "from-emerald-500/15 to-emerald-500/5 border-emerald-500/20",
];

const ICON_COLORS = [
  "text-accent",
  "text-indigo-400",
  "text-violet-400",
  "text-emerald-400",
];

export async function WhatISolve() {
  const messages = await getMessages();
  const items = messages.whatISolve.items;
  const t = await getTranslations("whatISolve");

  return (
    <section
      id="capabilities"
      className="border-b border-[var(--border-subtle)] px-4 py-24 sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-[1280px]">
        <Reveal>
          <p className="mb-4 text-xs font-medium uppercase tracking-[0.18em] text-[var(--text-muted)]">
            {t("title")}
          </p>
          <h2 className="max-w-2xl text-3xl font-bold tracking-tight text-[var(--text-primary)] sm:text-4xl">
            {t("subtitle")}
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item, i) => (
            <Reveal key={item.title} delay={i * 80}>
              <article
                className={`group h-full rounded-2xl border bg-gradient-to-br ${CARD_ACCENTS[i]} p-6 transition duration-300 hover:-translate-y-1 hover:brightness-110`}
              >
                <div className={`mb-5 inline-flex ${ICON_COLORS[i]}`}>
                  {icons[i] ?? null}
                </div>
                <h3 className="text-base font-semibold text-[var(--text-primary)]">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-[var(--text-secondary)]">
                  {item.description}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
