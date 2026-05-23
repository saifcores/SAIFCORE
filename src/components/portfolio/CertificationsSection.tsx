import { getMessages, getTranslations } from "next-intl/server";
import {
  certificationIds,
  getCertificationMeta,
  type CertificationId,
} from "@/data/certifications";
import type { AppMessages } from "@/types/messages";
import { CertificationIcon } from "./CertificationIcon";
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

  return (
    <section
      id="certifications"
      className={
        compact
          ? ""
          : "border-b border-[var(--border-subtle)] px-4 py-24 sm:px-6 lg:px-8"
      }
    >
      <div className={compact ? "" : "mx-auto max-w-[1280px]"}>
        {!compact ? (
          <Reveal>
            <p className="mb-4 text-xs font-medium uppercase tracking-[0.18em] text-[var(--text-muted)]">
              {t("title")}
            </p>
            <h2 className="max-w-2xl text-3xl font-bold tracking-tight text-[var(--text-primary)] sm:text-4xl">
              {t("subtitle")}
            </h2>
            <p className="mt-4 max-w-2xl text-[var(--text-secondary)]">
              {t("intro")}
            </p>
          </Reveal>
        ) : null}

        <div className={compact ? "space-y-10" : "mt-14 space-y-14"}>
          <CertGroup
            label={t("formalLabel")}
            items={formal}
            verifyLabel={t("verify")}
            delay={compact ? 0 : 80}
          />
          <CertGroup
            label={t("expertiseLabel")}
            items={expertise}
            verifyLabel={t("verify")}
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
  delay,
}: {
  label: string;
  items: Array<
    ItemCopy & {
      id: CertificationId;
      kind: ReturnType<typeof getCertificationMeta>["kind"];
      verifyUrl?: string;
    }
  >;
  verifyLabel: string;
  delay: number;
}) {
  if (items.length === 0) return null;

  return (
    <Reveal delay={delay}>
      <p className="mb-5 text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--text-muted)]">
        {label}
      </p>
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <li key={item.id}>
            <article className="card-interactive flex h-full gap-4 rounded-2xl bg-[var(--bg-elevated)]/20 p-5">
              <CertificationIcon kind={item.kind} />
              <div className="min-w-0 flex-1">
                <h3 className="font-semibold leading-snug text-[var(--text-primary)]">
                  {item.name}
                </h3>
                <p className="mt-0.5 text-xs font-medium text-[var(--text-muted)]">
                  {item.issuer}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-[var(--text-secondary)]">
                  {item.description}
                </p>
                {item.verifyUrl ? (
                  <a
                    href={item.verifyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-accent mt-3 inline-flex items-center gap-1 text-xs font-semibold"
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
