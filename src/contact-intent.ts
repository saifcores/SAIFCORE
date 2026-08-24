export const CONTACT_INTENTS = ["hiring", "freelance", "other"] as const;

export type ContactIntent = (typeof CONTACT_INTENTS)[number];

export function isContactIntent(value: string): value is ContactIntent {
  return (CONTACT_INTENTS as readonly string[]).includes(value);
}

export function contactIntentLabel(
  intent: ContactIntent,
  locale: "en" | "fr",
): string {
  if (locale === "fr") {
    if (intent === "hiring") return "Recrutement";
    if (intent === "freelance") return "Freelance";
    return "Autre";
  }
  if (intent === "hiring") return "Hiring";
  if (intent === "freelance") return "Freelance";
  return "Other";
}
