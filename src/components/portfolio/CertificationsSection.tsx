import { getMessages, getTranslations } from "next-intl/server";
import {
  certificationIds,
  getCertificationMeta,
  type CertificationId,
  type CertificationStatus,
} from "@/data/certifications";
import type { AppMessages } from "@/types/messages";
import {
  CertificationIcon,
  CertificationStatusPill,
  certificationCardClassName,
  getStatusLabelKey,
} from "./CertificationIcon";
import { Reveal } from "./Reveal";

type ItemCopy = AppMessages["certifications"]["items"][CertificationId];

type Props = {
  /** Homepage: compact grid without section duplicate heading from parent */
  compact?: boolean;
};

export async function CertificationsSection({ compact = false }: Props) {
  const t = await getTranslations("certifications");
  const messages = await getMessages();

  const items = certificationIds.map((id) => {
    const copy = messages.certifications.items[id];
    const meta = getCertificationMeta(id);
    return { ...copy, ...meta, id };
  });

  const formal = items.filter((item) => item.group === "formal");
  const expertise = items.filter((item) => item.group === "expertise");

  const statusLabel = (status: CertificationStatus) =>
    t(getStatusLabelKey(status));

  const headingId = "certifications-heading";

  return (
    <section
      id="certifications"
      aria-labelledby={compact ? undefined : headingId}
      className={
        compact
          ? ""
          : "border-b border-[var(--border-subtle)] px-4 py-10 sm:px-6 sm:py-12 lg:px-8 lg:py-16"
      }
    >
      <div className={compact ? "" : "mx-auto max-w-[1280px]"}>
        {!compact ? (
          <Reveal>
            <p className="mb-4 text-xs font-medium uppercase tracking-[0.18em] text-[var(--text-muted)]">
              {t("title")}
            </p>
            <h2
              id={headingId}
              className="max-w-2xl text-2xl font-bold tracking-tight text-[var(--text-primary)] sm:text-3xl md:text-4xl"
            >
              {t("subtitle")}
            </h2>
            <p className="mt-3 max-w-2xl text-pretty text-sm text-[var(--text-secondary)] sm:mt-4 sm:text-base">
              {t("intro")}
            </p>
            <ul className="mt-6 flex flex-wrap gap-2">
              {(
                [
                  "obtained",
                  "inProgress",
                  "notStarted",
                ] as CertificationStatus[]
              ).map((status) => (
                <li key={status}>
                  <CertificationStatusPill
                    status={status}
                    label={statusLabel(status)}
                  />
                </li>
              ))}
            </ul>
          </Reveal>
        ) : null}

        <div className={compact ? "space-y-10" : "mt-14 space-y-14"}>
          <CertGroup
            label={t("formalLabel")}
            items={formal}
            verifyLabel={t("verify")}
            statusLabel={statusLabel}
            delay={compact ? 0 : 80}
          />
          <CertGroup
            label={t("expertiseLabel")}
            items={expertise}
            verifyLabel={t("verify")}
            statusLabel={statusLabel}
            delay={compact ? 80 : 160}
          />
        </div>
      </div>
    </section>
  );
}

function CertGroup({
  label,
  items,
  verifyLabel,
  statusLabel,
  delay,
}: {
  label: string;
  items: Array<
    ItemCopy & {
      id: CertificationId;
      kind: ReturnType<typeof getCertificationMeta>["kind"];
      status: CertificationStatus;
      verifyUrl?: string;
    }
  >;
  verifyLabel: string;
  statusLabel: (status: CertificationStatus) => string;
  delay: number;
}) {
  if (items.length === 0) return null;

  return (
    <Reveal delay={delay}>
      <p className="mb-5 text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--text-muted)]">
        {label}
      </p>
      <ul className="grid gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
        {items.map((item) => (
          <li key={item.id}>
            <article
              className={`card-interactive flex h-full flex-col gap-3 rounded-2xl bg-[var(--bg-elevated)]/20 p-4 sm:flex-row sm:gap-4 sm:p-5 ${certificationCardClassName(item.status)}`}
            >
              <CertificationIcon
                kind={item.kind}
                status={item.status}
                statusLabel={statusLabel(item.status)}
              />
              <div className="min-w-0 flex-1">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                  <h3 className="font-semibold leading-snug text-[var(--text-primary)]">
                    {item.name}
                  </h3>
                  <CertificationStatusPill
                    status={item.status}
                    label={statusLabel(item.status)}
                  />
                </div>
                <p className="mt-0.5 text-xs font-medium text-[var(--text-muted)]">
                  {item.issuer}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-[var(--text-secondary)]">
                  {item.description}
                </p>
                {item.verifyUrl && item.status === "obtained" ? (
                  <a
                    href={item.verifyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-accent mt-3 inline-flex min-h-11 items-center gap-1 text-xs font-semibold sm:min-h-0"
                  >
                    {verifyLabel}
                    <span aria-hidden>↗</span>
                  </a>
                ) : null}
              </div>
            </article>
          </li>
        ))}
      </ul>
    </Reveal>
  );
}
