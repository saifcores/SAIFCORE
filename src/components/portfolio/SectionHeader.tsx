import type { ReactNode } from "react";

type Props = {
  kicker: string;
  title: string;
  titleId?: string;
  subtitle?: string;
  action?: ReactNode;
};

export function SectionHeader({
  kicker,
  title,
  titleId,
  subtitle,
  action,
}: Props) {
  return (
    <div className="mb-9 flex flex-wrap items-end justify-between gap-5 sm:gap-6">
      <div className="flex max-w-xl flex-col gap-3">
        <p className="site-kicker">{kicker}</p>
        <h2 id={titleId} className="section-heading">
          {title}
        </h2>
        {subtitle ? (
          <p className="max-w-[52ch] text-pretty text-[15px] leading-relaxed text-[var(--text-muted)]">
            {subtitle}
          </p>
        ) : null}
      </div>
      {action}
    </div>
  );
}
