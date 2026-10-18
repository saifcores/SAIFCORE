import { getMessages, getTranslations } from "next-intl/server";
import { TrustLogo } from "@/components/portfolio/TrustLogo";
import type { ExperienceEntry } from "@/types/messages";
import { SectionHeader } from "./SectionHeader";
import { Reveal } from "./Reveal";

type Translator = Awaited<ReturnType<typeof getTranslations>>;

function experienceHighlights(entry: ExperienceEntry): string[] {
  return (entry.highlights ?? []).map((b) => b.trim()).filter(Boolean);
}

function experienceStack(entry: ExperienceEntry): string[] {
  return (entry.stack ?? []).map((tag) => tag.trim()).filter(Boolean);
}

function isCurrentRole(period: string): boolean {
  return /\b(present|présent|actuel|current)\b/i.test(period);
}

function splitPeriod(period: string): { range: string; note: string } {
  const [range, ...rest] = period.split("·").map((part) => part.trim());
  return {
    range: range || period,
    note: rest.filter(Boolean).join(" · "),
  };
}

const MONTH_INDEX: Record<string, number> = {
  jan: 0,
  january: 0,
  janv: 0,
  janvier: 0,
  feb: 1,
  february: 1,
  fev: 1,
  fév: 1,
  février: 1,
  mar: 2,
  march: 2,
  mars: 2,
  apr: 3,
  april: 3,
  avr: 3,
  avril: 3,
  may: 4,
  mai: 4,
  jun: 5,
  june: 5,
  juin: 5,
  jul: 6,
  july: 6,
  juil: 6,
  juillet: 6,
  aug: 7,
  august: 7,
  aou: 7,
  aoû: 7,
  août: 7,
  sep: 8,
  sept: 8,
  september: 8,
  septembre: 8,
  oct: 9,
  october: 9,
  octobre: 9,
  nov: 10,
  november: 10,
  novembre: 10,
  dec: 11,
  december: 11,
  déc: 11,
  décembre: 11,
};

function normalizeMonthToken(token: string): string {
  return token
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\./g, "");
}

function parseMonthYear(token: string): { year: number; month: number } | null {
  const match = token.trim().match(/^([A-Za-zÀ-ÿ.]+)\s+(\d{4})$/u);
  if (!match) return null;
  const month = MONTH_INDEX[normalizeMonthToken(match[1] ?? "")];
  const year = Number(match[2]);
  if (month == null || !Number.isFinite(year)) return null;
  return { year, month };
}

function isPresentToken(token: string): boolean {
  return /^(present|présent|actuel|current|now)$/i.test(token.trim());
}

function monthIso(year: number, month: number): string {
  return `${year}-${String(month + 1).padStart(2, "0")}`;
}

function parsePeriodRange(period: string): {
  start: Date;
  end: Date;
  startIso: string;
  endIso: string;
} | null {
  const { range } = splitPeriod(period);
  const parts = range.split(/\s[—–-]\s/).map((part) => part.trim());
  if (parts.length < 2) return null;

  const start = parseMonthYear(parts[0] ?? "");
  if (!start) return null;

  const endToken = parts[1] ?? "";
  const current = isPresentToken(endToken);
  const end = current ? null : parseMonthYear(endToken);
  if (!current && !end) return null;

  const now = new Date();
  const endYear = current
    ? now.getFullYear()
    : (end?.year ?? now.getFullYear());
  const endMonth = current ? now.getMonth() : (end?.month ?? now.getMonth());

  return {
    start: new Date(start.year, start.month, 1),
    end: new Date(endYear, endMonth, 1),
    startIso: monthIso(start.year, start.month),
    endIso: monthIso(endYear, endMonth),
  };
}

function inclusiveMonthCount(start: Date, end: Date): number {
  const months =
    (end.getFullYear() - start.getFullYear()) * 12 +
    (end.getMonth() - start.getMonth()) +
    1;
  return Math.max(1, months);
}

function formatDuration(monthsTotal: number, t: Translator): string {
  const years = Math.floor(monthsTotal / 12);
  const months = monthsTotal % 12;
  const parts: string[] = [];
  if (years > 0) {
    parts.push(t(years === 1 ? "durationYr" : "durationYrs", { count: years }));
  }
  if (months > 0 || years === 0) {
    parts.push(
      t(months === 1 ? "durationMo" : "durationMos", { count: months }),
    );
  }
  return parts.join(" ");
}

function companyInitials(company: string): string {
  const words = company
    .split(/[\s—–\-|]+/)
    .map((w) => w.trim())
    .filter((w) => w.length > 0);
  if (words.length >= 2) {
    return `${words[0]![0] ?? ""}${words[1]![0] ?? ""}`.toUpperCase();
  }
  return company.slice(0, 2).toUpperCase();
}

function shortCompany(company: string): string {
  return company.split(/\s[—–-]\s/)[0]?.trim() || company;
}

function CurrentBadge({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-[color-mix(in_srgb,var(--accent-strong)_35%,var(--border-subtle))] bg-[color-mix(in_srgb,var(--accent-strong)_10%,transparent)] px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-[var(--accent-strong)]">
      <span
        className="h-1.5 w-1.5 rounded-full bg-[var(--accent-strong)] motion-safe:animate-pulse"
        aria-hidden
      />
      {label}
    </span>
  );
}

function RoleLogo({
  logo,
  company,
  featured = false,
}: {
  logo: ExperienceEntry["logo"];
  company: string;
  featured?: boolean;
}) {
  const hasLogo = Boolean(logo?.trim());

  return (
    <div
      className={`relative z-[1] flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-[12px] border bg-[var(--bg-base)] sm:h-12 sm:w-12 ${
        featured
          ? "border-[var(--accent-strong)] shadow-[0_0_0_3px_color-mix(in_srgb,var(--accent-strong)_20%,transparent)]"
          : "border-[var(--border-subtle)]"
      }`}
    >
      <span
        className={`text-[11px] font-semibold tracking-tight sm:text-xs ${
          featured
            ? "text-[var(--text-primary)]"
            : "text-[var(--text-secondary)]"
        }`}
        aria-hidden
      >
        {companyInitials(company)}
      </span>
      {hasLogo ? (
        <TrustLogo
          logo={logo.trim()}
          width={48}
          height={48}
          sizes="48px"
          className="absolute inset-0 h-full w-full object-contain object-center p-1.5"
        />
      ) : null}
    </div>
  );
}

function RoleRow({
  item,
  index,
  stackLabel,
  clientLabel,
  contributionsLabel,
  currentRoleLabel,
  durationLabel,
}: {
  item: ExperienceEntry;
  index: number;
  stackLabel: string;
  clientLabel: string;
  contributionsLabel: string;
  currentRoleLabel: string;
  durationLabel: string;
}) {
  const highlights = experienceHighlights(item);
  const stack = experienceStack(item);
  const isCurrent = isCurrentRole(item.period);
  const titleId = `experience-role-${index}-title`;
  const location = item.location?.trim() ?? "";
  const client = item.client?.trim() ?? "";
  const employment = item.employment?.trim() ?? "";
  const workplace = item.workplace?.trim() ?? "";
  const summary = item.summary?.trim() ?? "";
  const { range, note } = splitPeriod(item.period);
  const parsed = parsePeriodRange(item.period);

  return (
    <Reveal delay={Math.min(index * 70, 280)}>
      <article
        id={`experience-role-${index}`}
        aria-labelledby={titleId}
        aria-current={isCurrent ? "true" : undefined}
        className="group relative scroll-mt-28 py-7 sm:py-8 xl:scroll-mt-24"
      >
        <div
          className={`pointer-events-none absolute inset-y-1.5 -inset-x-3 rounded-[16px] transition duration-300 sm:inset-y-2 sm:-inset-x-4 ${
            isCurrent
              ? "bg-[var(--bg-elevated)]/35"
              : "group-hover:bg-[var(--bg-elevated)]/20"
          }`}
          aria-hidden
        />

        <div className="relative z-[1] flex gap-4 sm:gap-5 lg:gap-8">
          <div className="flex shrink-0 flex-col items-center pt-0.5">
            <RoleLogo
              logo={item.logo}
              company={item.company}
              featured={isCurrent}
            />
          </div>

          <div className="min-w-0 flex-1">
            <header className="min-w-0">
              <h3
                id={titleId}
                className="font-display text-pretty text-lg font-medium tracking-tight text-[var(--text-primary)] sm:text-xl"
              >
                {item.role}
              </h3>

              <p className="mt-1.5 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm leading-snug">
                <span className="font-semibold text-[var(--text-primary)]">
                  {item.company}
                </span>
                {isCurrent ? <CurrentBadge label={currentRoleLabel} /> : null}
                {employment ? (
                  <span className="text-[var(--text-muted)]">
                    · {employment}
                  </span>
                ) : null}
              </p>

              {client ? (
                <p className="mt-1 text-sm leading-snug text-[var(--text-secondary)]">
                  <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[var(--text-muted)]">
                    {clientLabel}
                  </span>{" "}
                  {client}
                </p>
              ) : null}

              <p className="mt-2.5 flex flex-wrap items-center gap-x-2 gap-y-1 text-[12px] leading-snug text-[var(--text-muted)] sm:text-[13px]">
                <time
                  className="font-mono tabular-nums"
                  dateTime={
                    parsed ? `${parsed.startIso}/${parsed.endIso}` : undefined
                  }
                >
                  {range}
                </time>
                {durationLabel ? (
                  <>
                    <span aria-hidden>·</span>
                    <span className="font-mono tabular-nums">
                      {durationLabel}
                    </span>
                  </>
                ) : null}
                {note ? (
                  <>
                    <span aria-hidden>·</span>
                    <span>{note}</span>
                  </>
                ) : null}
                {location ? (
                  <>
                    <span aria-hidden>·</span>
                    <span>{location}</span>
                  </>
                ) : null}
                {workplace ? (
                  <>
                    <span aria-hidden>·</span>
                    <span>{workplace}</span>
                  </>
                ) : null}
              </p>
            </header>

            {summary ? (
              <p className="mt-4 text-pretty text-sm leading-relaxed text-[var(--text-primary)] sm:mt-5 sm:text-[15px] sm:leading-7">
                {summary}
              </p>
            ) : null}

            {highlights.length > 0 ? (
              <div className="mt-4 sm:mt-5">
                <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[var(--text-muted)]">
                  {contributionsLabel}
                </p>
                <ul className="mt-2.5 space-y-2.5">
                  {highlights.map((text) => (
                    <li
                      key={text}
                      className="grid grid-cols-[auto_1fr] gap-3 text-sm leading-relaxed text-[var(--text-secondary)] sm:text-[15px] sm:leading-7"
                    >
                      <span
                        className={`mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full ${
                          isCurrent
                            ? "bg-[var(--accent-strong)]"
                            : "bg-[var(--text-muted)]"
                        }`}
                        aria-hidden
                      />
                      <span className="min-w-0 text-pretty">{text}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}

            {stack.length > 0 ? (
              <ul
                className="mt-5 flex list-none flex-wrap gap-1.5 p-0 sm:mt-6"
                aria-label={stackLabel}
              >
                {stack.map((tech) => (
                  <li key={tech}>
                    <span className="inline-flex rounded-full border border-[var(--border-subtle)] bg-[var(--bg-base)]/70 px-2.5 py-1 text-[11px] font-medium text-[var(--text-secondary)] sm:text-xs">
                      {tech}
                    </span>
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
        </div>
      </article>
    </Reveal>
  );
}

type ExperienceProps = {
  /** Hide the section heading when a page header already covers it. */
  showHeading?: boolean;
};

/**
 * Career timeline — logo rail on the left, role narrative on the right.
 * Current role is marked with a live pill and a quiet content highlight.
 */
export async function Experience({ showHeading = true }: ExperienceProps) {
  const [messages, t] = await Promise.all([
    getMessages(),
    getTranslations("experience"),
  ]);
  const { experience } = messages;
  const items = experience.items;
  const headingId = "experience-heading";
  const oldest = items[items.length - 1];
  const oldestRange = oldest ? parsePeriodRange(oldest.period) : null;
  const spanStart = oldestRange?.start.getFullYear();
  const spanEnd = t("presentLabel");
  const rolesMeta = (
    <p className="shrink-0 font-mono text-sm tabular-nums text-[var(--text-muted)] sm:text-right">
      <span className="font-semibold text-[var(--text-primary)]">
        {t("rolesMeta", { count: items.length })}
      </span>
      {spanStart ? (
        <>
          <span aria-hidden> · </span>
          <span>
            {spanStart} — {spanEnd}
          </span>
        </>
      ) : null}
    </p>
  );

  return (
    <section
      id="experience"
      aria-labelledby={headingId}
      className="relative border-b border-[var(--border-subtle)] py-12 sm:py-14 lg:py-16"
    >
      <div className="page-container">
        {showHeading ? (
          <SectionHeader
            kicker={t("title")}
            title={t("subtitle")}
            titleId={headingId}
            subtitle={t("valueBody")}
            action={rolesMeta}
          />
        ) : (
          <Reveal>
            <h2 id={headingId} className="sr-only">
              {t("subtitle")}
            </h2>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between sm:gap-8">
              {rolesMeta}
            </div>
          </Reveal>
        )}

        {items.length > 1 ? (
          <nav
            className={showHeading ? "mt-6 sm:mt-8" : "mt-5 sm:mt-6"}
            aria-label={t("rolesNav")}
          >
            <ul className="flex list-none flex-wrap gap-2 p-0">
              {items.map((item, index) => {
                const current = isCurrentRole(item.period);
                const label = shortCompany(item.company);
                const year = parsePeriodRange(item.period)?.start.getFullYear();
                return (
                  <li key={`${item.company}-${index}`}>
                    <a
                      href={`#experience-role-${index}`}
                      aria-current={current ? "true" : undefined}
                      className={`inline-flex min-h-9 items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium transition duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus-ring)] ${
                        current
                          ? "border-[color-mix(in_srgb,var(--accent-strong)_40%,var(--border-subtle))] bg-[color-mix(in_srgb,var(--accent-strong)_10%,transparent)] text-[var(--text-primary)]"
                          : "border-[var(--border-subtle)] text-[var(--text-secondary)] hover:border-[var(--border-hover)] hover:text-[var(--text-primary)]"
                      }`}
                    >
                      {current ? (
                        <span
                          className="h-1.5 w-1.5 rounded-full bg-[var(--accent-strong)]"
                          aria-hidden
                        />
                      ) : null}
                      {year ? (
                        <span className="font-mono tabular-nums text-[10px] text-[var(--text-muted)]">
                          {year}
                        </span>
                      ) : null}
                      {label}
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>
        ) : null}

        <div className="relative mt-7 sm:mt-8">
          {items.length > 1 ? (
            <span
              className="pointer-events-none absolute top-12 bottom-12 left-[21px] w-px bg-[var(--border-subtle)] sm:left-[23px] sm:top-14 sm:bottom-14"
              aria-hidden
            />
          ) : null}
          <ol
            className="relative list-none space-y-0 p-0"
            aria-label={t("title")}
          >
            {items.map((item, index) => {
              const parsed = parsePeriodRange(item.period);
              const durationLabel = parsed
                ? formatDuration(
                    inclusiveMonthCount(parsed.start, parsed.end),
                    t,
                  )
                : "";

              return (
                <li key={`${item.role}|${item.company}|${item.period}`}>
                  <RoleRow
                    item={item}
                    index={index}
                    stackLabel={t("stackLabel")}
                    clientLabel={t("clientLabel")}
                    contributionsLabel={t("contributionsLabel")}
                    currentRoleLabel={t("currentRole")}
                    durationLabel={durationLabel}
                  />
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
