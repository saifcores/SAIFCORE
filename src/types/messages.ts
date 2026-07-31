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
  | "work"
  | "services"
  | "offers"
  | "expertise"
  | "experience"
  | "process"
  | "about"
  | "insights"
  | "blog"
  | "credentials"
  | "systems"
  | "contact"
  | "resume"
  | "more"
  | "groupPriority"
  | "groupMore"
  | "groupExplore"
  | "groupProfile"
  | "groupConnect"
>;

export type FeaturedProjectItem =
  AppMessages["featuredProjects"]["items"][number];

export type ExperienceEntry = AppMessages["experience"]["items"][number];

export type CertificationId = keyof AppMessages["certifications"]["items"];

export type CertificationItem =
  AppMessages["certifications"]["items"][CertificationId];

export type HowIThinkStep = AppMessages["howIThink"]["steps"][number];

export type ArchitectureTag =
  AppMessages["architectureExpertise"]["tags"][number];

/** First N tags use highlight styling in `ArchitectureExpertise` */
export const ARCHITECTURE_TAG_HIGHLIGHT_COUNT = 4;
