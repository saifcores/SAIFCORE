import { readFileSync } from "node:fs";
import { join } from "node:path";
import { hasLocale } from "next-intl";
import { getRequestConfig } from "next-intl/server";
import en from "../../messages/en.json";
import fr from "../../messages/fr.json";
import type { AppMessages } from "@/types/messages";
import { routing } from "./routing";

const catalogs = { en, fr } as const;

function loadCatalog(locale: "en" | "fr"): AppMessages {
  if (process.env.NODE_ENV === "development") {
    return JSON.parse(
      readFileSync(join(process.cwd(), "messages", `${locale}.json`), "utf8"),
    ) as AppMessages;
  }
  return catalogs[locale];
}

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested)
    ? requested
    : routing.defaultLocale;

  return {
    locale,
    messages: loadCatalog(locale),
  };
});
