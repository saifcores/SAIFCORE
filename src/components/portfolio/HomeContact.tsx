import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Reveal } from "./Reveal";

export async function HomeContact() {
  const t = await getTranslations("homeContact");

  return (
    <section
      id="contact"
      aria-labelledby="home-contact-heading"
      className="section-home scroll-mt-24 pb-14 sm:pb-16 lg:pb-20 xl:scroll-mt-28"
    >
      <div className="page-container">
        <Reveal>
          <div className="relative overflow-hidden rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-elevated)] p-7 shadow-[var(--shadow-card)] sm:p-10 lg:p-14">
            <div
              className="absolute inset-y-0 left-0 w-[3px] bg-[var(--accent)]"
              aria-hidden
            />
            <div className="grid items-center gap-8 lg:grid-cols-[minmax(0,1fr)_auto]">
              <div className="flex flex-col gap-3">
                <h2
                  id="home-contact-heading"
                  className="section-heading"
                >
                  {t("title")}
                </h2>
                <p className="max-w-[46ch] text-[var(--text-muted)]">
                  {t("subtitle")}
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap lg:justify-end">
                <Link
                  href="/contact"
                  className="btn-primary inline-flex min-h-12 items-center justify-center px-5 text-[15px]"
                >
                  {t("sendBrief")}
                </Link>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
