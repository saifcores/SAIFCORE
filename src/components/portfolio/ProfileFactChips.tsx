import { getTranslations } from "next-intl/server";

type Props = {
  className?: string;
};

export async function ProfileFactChips({ className = "" }: Props) {
  const t = await getTranslations("pageHeader");

  const facts = [
    t("factYears"),
    t("factBanking"),
    t("factRemote"),
    t("factBilingual"),
  ];

  return (
    <ul
      className={`flex flex-wrap gap-1.5 sm:gap-2 ${className}`}
      aria-label={t("factsLabel")}
    >
      {facts.map((fact) => (
        <li key={fact} className="max-w-full">
          <span className="inline-flex max-w-full rounded-full border border-[var(--border-subtle)] bg-[var(--bg-elevated)]/50 px-2.5 py-1 text-[11px] font-medium leading-snug text-[var(--text-secondary)] sm:px-3 sm:py-1.5 sm:text-xs">
            {fact}
          </span>
        </li>
      ))}
    </ul>
  );
}
