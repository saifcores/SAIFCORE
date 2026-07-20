import type { Locale } from "next-intl";
import { getLocale } from "next-intl/server";
import { NotFoundPage } from "@/components/portfolio/NotFoundPage";

export default async function NotFound() {
  const locale = (await getLocale()) as Locale;
  return <NotFoundPage locale={locale} />;
}
