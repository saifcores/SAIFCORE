import { getMessages, getTranslations } from "next-intl/server";

export async function Proofs() {
  const t = await getTranslations("proofs");
  const messages = await getMessages();

  return (
    <div
      aria-label={t("label")}
      role="region"
      className="mt-10 grid grid-cols-2 gap-x-5 gap-y-8 border-t border-[var(--border-subtle)] pt-8 sm:mt-12 sm:gap-x-6 lg:grid-cols-4 lg:pt-10"
    >
      {messages.proofs.items.map((item) => (
        <div key={item.value} className="min-w-0">
          <div
            className={`font-display font-semibold leading-tight tracking-tight text-balance text-[var(--text-primary)] ${
              item.value.length > 8
                ? "text-[clamp(1.05rem,2.2vw,1.45rem)]"
                : "text-[clamp(1.35rem,4vw,2.15rem)]"
            }`}
          >
            {item.value}
          </div>
          <div className="mt-2 text-pretty text-[13px] leading-snug text-[var(--text-muted)]">
            {item.label}
          </div>
        </div>
      ))}
    </div>
  );
}
