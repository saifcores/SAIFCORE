import { getMessages, getTranslations } from "next-intl/server";
import { Reveal } from "./Reveal";

const LAYER_ICONS = [
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

export async function ArchitectureSection() {
  const messages = await getMessages();
  const { layers, technologies, principles } = messages.architectureSection;
  const t = await getTranslations("architectureSection");

  return (
    <section
      id="architecture"
      className="border-y border-[var(--border-subtle)] bg-[var(--bg-elevated)]/10 px-4 py-14 sm:px-6 sm:py-16 lg:px-8 lg:py-20"
    >
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <p className="mb-4 text-xs font-medium uppercase tracking-[0.18em] text-[var(--text-muted)]">
            {t("title")}
          </p>
          <h2 className="max-w-2xl font-display text-pretty text-2xl font-medium tracking-tight text-[var(--text-primary)] sm:text-3xl">
            {t("subtitle")}
          </h2>
        </Reveal>

        <div className="mt-10 grid gap-8 md:grid-cols-[1fr_minmax(260px,380px)] md:gap-10 lg:gap-14">
          <Reveal>
            <div className="space-y-2">
              {layers.map((layer, i) => (
                <div key={layer.label} className="flex items-stretch gap-3">
                  <div className="flex flex-col items-center">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[12px] border border-[var(--border-subtle)] bg-[var(--bg-elevated)] text-[var(--text-primary)]">
                      {LAYER_ICONS[i] ?? null}
                    </div>
                    {i < layers.length - 1 ? (
                      <div className="relative flex w-10 flex-1 flex-col items-center py-1">
                        <div className="h-full w-px bg-[var(--border-subtle)]" />
                      </div>
                    ) : null}
                  </div>

                  <div className="flex-1 pb-4">
                    <div className="rounded-[12px] border border-[var(--border-subtle)] bg-[var(--bg-elevated)]/30 p-4 transition hover:border-[var(--border-hover)]">
                      <span className="text-xs font-semibold uppercase tracking-[0.15em] text-[var(--text-muted)]">
                        {layer.label}
                      </span>
                      <p className="mt-0.5 text-[11px] text-[var(--text-muted)]">
                        {layer.sublabel}
                      </p>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {layer.nodes.map((node) => (
                          <span
                            key={node}
                            className="rounded-full border border-[var(--border-subtle)] bg-[var(--bg-base)]/60 px-2.5 py-1 text-xs text-[var(--text-secondary)]"
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
          </Reveal>

          <Reveal delay={120}>
            <div className="flex h-full flex-col gap-5">
              <div className="rounded-[16px] border border-[var(--border-subtle)] bg-[var(--bg-elevated)]/25 p-6">
                <p className="mb-5 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--text-muted)]">
                  {t("techTitle")}
                </p>
                <div className="flex flex-wrap gap-2">
                  {technologies.map((tech, i) => {
                    const isPrimary = i < 4;
                    return (
                      <span
                        key={tech}
                        className={`rounded-full border px-3.5 py-1.5 text-xs font-medium transition hover:border-[var(--border-hover)] ${
                          isPrimary
                            ? "border-[var(--border-strong)] bg-[var(--bg-base)] text-[var(--text-primary)]"
                            : "border-[var(--border-subtle)] text-[var(--text-secondary)]"
                        }`}
                      >
                        {tech}
                      </span>
                    );
                  })}
                </div>
              </div>

              <div className="rounded-[16px] border border-[var(--border-subtle)] bg-[var(--bg-elevated)]/25 p-6">
                <p className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--text-muted)]">
                  {t("principlesTitle")}
                </p>
                <ul className="space-y-3">
                  {principles.map((principle, i) => (
                    <li key={i} className="flex gap-3 text-sm leading-relaxed">
                      <span
                        className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--accent-strong)]"
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
