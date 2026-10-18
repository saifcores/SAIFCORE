import { getMessages, getTranslations } from "next-intl/server";

export async function Proofs() {
  const t = await getTranslations("proofs");
  const messages = await getMessages();

  return (
    <section
      aria-label={t("label")}
      className="border-y border-[var(--border-subtle)] bg-[var(--bg-elevated)]"
    >
      <div className="page-container grid grid-cols-2 sm:grid-cols-4">
        {messages.proofs.items.map((item, index) => (
          <div
            key={item.value}
            className={`py-6 pr-5 sm:py-7 ${
              index > 0
                ? "sm:border-l sm:border-[var(--border-subtle)] sm:pl-6"
                : ""
            } ${
              index % 2 === 1
                ? "border-l border-[var(--border-subtle)] pl-5 sm:pl-6"
                : ""
            } ${
              index >= 2
                ? "border-t border-[var(--border-subtle)] sm:border-t-0"
                : ""
            }`}
          >
            <div className="text-[1.5rem] font-semibold tracking-tight text-[var(--text-primary)] sm:text-[1.625rem]">
              {item.value}
            </div>
            <div className="mt-1 text-[13px] leading-snug text-[var(--text-muted)]">
              {item.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
