import en from "../../messages/en.json";

/**
 * Canonical message shape — `fr.json` must stay structurally identical to `en.json`
 * (only string values differ).
 */
export type AppMessages = typeof en;

export type NavMessages = AppMessages["nav"];
/** Keys for `useTranslations("nav")` / navbar labels */
export type NavLinkKey = keyof NavMessages;

/** Primary site nav (excludes `primary`, `bookCall`, menu toggles, etc.) */
export type NavPrimaryLinkKey = Extract<
  NavLinkKey,
  "work" | "experience" | "process" | "about" | "insights" | "contact"
>;

export type FeaturedProjectItem =
  AppMessages["featuredProjects"]["items"][number];

export type ExperienceEntry = AppMessages["experience"]["items"][number];

export type HowIThinkStep = AppMessages["howIThink"]["steps"][number];

export type ArchitectureTag =
  AppMessages["architectureExpertise"]["tags"][number];

/** First N tags use highlight styling in `ArchitectureExpertise` */
export const ARCHITECTURE_TAG_HIGHLIGHT_COUNT = 4;
