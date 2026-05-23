import { getMessages, getTranslations } from "next-intl/server";
import { Reveal } from "./Reveal";

const LAYER_ICONS = [
  /* Client Layer */
  <svg
    key="client"
    viewBox="0 0 20 20"
    fill="none"
    className="h-4 w-4"
    stroke="currentColor"
    strokeWidth="1.5"
  >
    <rect x="2" y="3" width="16" height="11" rx="2" strokeLinecap="round" />
    <path d="M6 17h8M10 14v3" strokeLinecap="round" />
  </svg>,
  /* API Gateway */
  <svg
    key="gateway"
    viewBox="0 0 20 20"
    fill="none"
    className="h-4 w-4"
    stroke="currentColor"
    strokeWidth="1.5"
  >
    <path
      d="M10 2L2 7v6l8 5 8-5V7l-8-5z"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>,
  /* Microservices */
  <svg
    key="micro"
    viewBox="0 0 20 20"
    fill="none"
    className="h-4 w-4"
    stroke="currentColor"
    strokeWidth="1.5"
  >
    <rect x="2" y="2" width="6" height="6" rx="1" />
    <rect x="12" y="2" width="6" height="6" rx="1" />
    <rect x="2" y="12" width="6" height="6" rx="1" />
    <rect x="12" y="12" width="6" height="6" rx="1" />
  </svg>,
  /* Event Streaming */
  <svg
    key="kafka"
    viewBox="0 0 20 20"
    fill="none"
    className="h-4 w-4"
    stroke="currentColor"
    strokeWidth="1.5"
  >
    <path
      d="M3 10h14M3 6l14 4-14 4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>,
  /* Data Layer */
  <svg
    key="db"
    viewBox="0 0 20 20"
    fill="none"
    className="h-4 w-4"
    stroke="currentColor"
    strokeWidth="1.5"
  >
    <ellipse cx="10" cy="5" rx="8" ry="3" />
    <path d="M2 5v4c0 1.657 3.582 3 8 3s8-1.343 8-3V5" strokeLinecap="round" />
    <path d="M2 9v4c0 1.657 3.582 3 8 3s8-1.343 8-3V9" strokeLinecap="round" />
  </svg>,
];

const LAYER_GRADIENTS = [
  "from-blue-500/20 to-blue-500/5",
  "from-indigo-500/20 to-indigo-500/5",
  "from-violet-500/20 to-violet-500/5",
  "from-amber-500/20 to-amber-500/5",
  "from-emerald-500/20 to-emerald-500/5",
];

const LAYER_BORDER_COLORS = [
  "border-blue-500/25",
  "border-indigo-500/25",
  "border-violet-500/25",
  "border-amber-500/25",
  "border-emerald-500/25",
];

const LAYER_TEXT_COLORS = [
  "text-blue-400",
  "text-indigo-400",
  "text-violet-400",
  "text-amber-400",
  "text-emerald-400",
];

export async function ArchitectureSection() {
  const messages = await getMessages();
  const { layers, technologies, principles } = messages.architectureSection;
  const t = await getTranslations("architectureSection");

  return (
    <section
      id="architecture"
      className="border-y border-[var(--border-subtle)] bg-[var(--bg-elevated)]/15 px-4 py-24 sm:px-6 lg:px-8"
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

        <div className="mt-16 grid gap-12 lg:grid-cols-[1fr_400px] lg:gap-16">
          {/* Architecture diagram */}
          <Reveal>
            <div className="relative">
              {/* Stack layers */}
              <div className="space-y-2">
                {layers.map((layer, i) => (
                  <div key={layer.label} className="flex items-stretch gap-3">
                    {/* Connector line */}
                    <div className="flex flex-col items-center">
                      <div
                        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border bg-gradient-to-br ${LAYER_GRADIENTS[i]} ${LAYER_BORDER_COLORS[i]} ${LAYER_TEXT_COLORS[i]}`}
                      >
                        {LAYER_ICONS[i] ?? null}
                      </div>
                      {i < layers.length - 1 ? (
                        <div className="relative flex w-10 flex-1 flex-col items-center py-1">
                          <div className="h-full w-px bg-gradient-to-b from-[var(--border-subtle)] to-transparent" />
                          {/* Animated flow arrow */}
                          <div
                            className="absolute top-1/2 -translate-y-1/2"
                            aria-hidden
                          >
                            <svg
                              width="8"
                              height="8"
                              viewBox="0 0 8 8"
                              fill="none"
                            >
                              <path
                                d="M4 1L7 4L4 7"
                                stroke="var(--text-muted)"
                                strokeWidth="1.2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </div>
                        </div>
                      ) : null}
                    </div>

                    {/* Layer card */}
                    <div className="flex-1 pb-4">
                      <div
                        className={`rounded-xl border bg-gradient-to-r ${LAYER_GRADIENTS[i]} ${LAYER_BORDER_COLORS[i]} p-4 transition hover:brightness-110`}
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <span
                              className={`text-xs font-semibold uppercase tracking-[0.15em] ${LAYER_TEXT_COLORS[i]}`}
                            >
                              {layer.label}
                            </span>
                            <p className="mt-0.5 text-[11px] text-[var(--text-muted)]">
                              {layer.sublabel}
                            </p>
                          </div>
                        </div>
                        <div className="mt-3 flex flex-wrap gap-2">
                          {layer.nodes.map((node) => (
                            <span
                              key={node}
                              className="rounded-md border border-[var(--border-subtle)] bg-[var(--bg-base)]/60 px-2.5 py-1 text-xs text-[var(--text-secondary)]"
                            >
                              {node}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          {/* Technology stack + explanation */}
          <Reveal delay={120}>
            <div className="flex h-full flex-col gap-6">
              {/* Core tech */}
              <div className="glass rounded-2xl p-6">
                <p className="mb-5 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--text-muted)]">
                  {t("techTitle")}
                </p>
                <div className="flex flex-wrap gap-2.5">
                  {technologies.map((tech, i) => {
                    const isPrimary = i < 4;
                    return (
                      <span
                        key={tech}
                        className={`rounded-full border px-3.5 py-1.5 text-xs font-medium transition hover:border-[var(--border-hover)] ${
                          isPrimary
                            ? "border-blue-500/30 bg-gradient-to-r from-blue-500/12 to-emerald-500/8 text-[var(--text-primary)]"
                            : "border-[var(--border-subtle)] text-[var(--text-secondary)]"
                        }`}
                      >
                        {tech}
                      </span>
                    );
                  })}
                </div>
              </div>

              {/* Fintech principles */}
              <div className="glass rounded-2xl p-6">
                <p className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--text-muted)]">
                  {t("principlesTitle")}
                </p>
                <ul className="space-y-3">
                  {principles.map((principle, i) => (
                    <li key={i} className="flex gap-3 text-sm leading-relaxed">
                      <span
                        className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gradient-to-r from-blue-400 to-emerald-400"
                        aria-hidden
                      />
                      <span className="text-[var(--text-secondary)]">
                        {principle}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
