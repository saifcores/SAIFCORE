import { caseStudySlug, projectCaseStudyId, type SitePath } from "@/seo";
import type { FeaturedProjectItem } from "@/types/messages";

/** Dedicated deep case-study routes. */
export const ECOM_360_CASE_STUDY_ID = "ecom-360-pme";
export const ECOM_360_CASE_STUDY_PATH =
  "/systems/ecom-360-pme" as const satisfies SitePath;

export const PAYMENT_DISASTER_LAB_CASE_STUDY_ID =
  "payment-platform-disaster-lab";
export const PAYMENT_DISASTER_LAB_CASE_STUDY_PATH =
  "/systems/payment-platform-disaster-lab" as const satisfies SitePath;

export const DOUBLE_ENTRY_LEDGER_CASE_STUDY_ID = "double-entry-ledger-platform";
export const DOUBLE_ENTRY_LEDGER_CASE_STUDY_PATH =
  "/systems/double-entry-ledger-platform" as const satisfies SitePath;

const dedicatedCaseStudyPaths: Record<string, SitePath> = {
  [ECOM_360_CASE_STUDY_ID]: ECOM_360_CASE_STUDY_PATH,
  [PAYMENT_DISASTER_LAB_CASE_STUDY_ID]: PAYMENT_DISASTER_LAB_CASE_STUDY_PATH,
  [DOUBLE_ENTRY_LEDGER_CASE_STUDY_ID]: DOUBLE_ENTRY_LEDGER_CASE_STUDY_PATH,
};

/** Maps local article slugs → related case-study ids (dormant while blog is external). */
const articleCaseStudySlugs: Record<string, string[]> = {
  "banking-middleware-multi-subsidiary": ["unified-api-gateway"],
  "adr-double-entry-ledger-payments": [
    "double-entry-ledger-platform",
    "payment-platform-disaster-lab",
  ],
  "mobile-money-integration-patterns": [
    "pan-african-payment-sdk",
    "payment-platform-disaster-lab",
  ],
  "scalable-fintech-systems": [
    "payment-platform-disaster-lab",
    "double-entry-ledger-platform",
  ],
  "why-saas-fail-africa": ["ecom-360-pme"],
  "architecture-reviews-that-help": [
    "payment-platform-disaster-lab",
    "unified-api-gateway",
  ],
};

export function getRelatedCaseStudies(
  articleSlug: string,
  items: readonly FeaturedProjectItem[],
  limit = 2,
): FeaturedProjectItem[] {
  const slugs = articleCaseStudySlugs[articleSlug];
  if (!slugs?.length) return [];

  return slugs
    .map((slug) => items.find((item) => projectCaseStudyId(item) === slug))
    .filter((item): item is FeaturedProjectItem => item != null)
    .slice(0, limit);
}

export type CaseStudyHref = SitePath | `/systems#case-${string}`;

export function hasDedicatedCaseStudyPage(
  itemOrId: FeaturedProjectItem | string,
): boolean {
  const id =
    typeof itemOrId === "string" ? itemOrId : projectCaseStudyId(itemOrId);
  return id in dedicatedCaseStudyPaths;
}

export function getCaseStudyHref(
  itemOrTitle: FeaturedProjectItem | string,
): CaseStudyHref {
  if (typeof itemOrTitle === "string") {
    if (itemOrTitle in dedicatedCaseStudyPaths) {
      return dedicatedCaseStudyPaths[itemOrTitle]!;
    }
    const slug = caseStudySlug(itemOrTitle);
    if (slug in dedicatedCaseStudyPaths) {
      return dedicatedCaseStudyPaths[slug]!;
    }
    return `/systems#case-${slug}`;
  }
  const id = projectCaseStudyId(itemOrTitle);
  if (id in dedicatedCaseStudyPaths) {
    return dedicatedCaseStudyPaths[id]!;
  }
  return `/systems#case-${id}`;
}

/** Lower rank ships first on teasers and /systems. */
export function projectStatusRank(status: string | undefined): number {
  const normalized = (status ?? "").toLowerCase();
  // "delivered" contains "live" — match a whole word, not a substring.
  if (/\blive\b/.test(normalized) || normalized.includes("en production")) {
    return 0;
  }
  if (
    normalized.includes("from production") ||
    normalized.includes("reference") ||
    normalized.includes("référence") ||
    normalized.includes("issu") ||
    normalized.includes("delivered") ||
    normalized.includes("livré") ||
    normalized.includes("lab") ||
    normalized.includes("labo")
  ) {
    return 1;
  }
  if (
    normalized.includes("progress") ||
    normalized.includes("cours") ||
    normalized.includes("development") ||
    normalized.includes("développement")
  ) {
    return 2;
  }
  return 3;
}

export function sortProjectsLiveFirst<
  T extends { status?: string; href?: string },
>(items: readonly T[]): T[] {
  return [...items].sort((a, b) => {
    const hrefRank = (item: T) => (item.href?.trim() ? 0 : 1);
    const byHref = hrefRank(a) - hrefRank(b);
    if (byHref !== 0) return byHref;
    return projectStatusRank(a.status) - projectStatusRank(b.status);
  });
}

/**
 * Home Work teaser order: live product + banking/payment niche patterns
 * above labs — niche proof above the fold.
 */
const HOME_TEASER_IDS = [
  ECOM_360_CASE_STUDY_ID,
  "unified-api-gateway",
  "pan-african-payment-sdk",
] as const;

export function sortProjectsForHomeTeaser(
  items: readonly FeaturedProjectItem[],
  limit = 3,
): FeaturedProjectItem[] {
  const byId = new Map(
    items.map((item) => [projectCaseStudyId(item), item] as const),
  );
  const picked: FeaturedProjectItem[] = [];

  for (const id of HOME_TEASER_IDS) {
    const item = byId.get(id);
    if (item) {
      picked.push(item);
      byId.delete(id);
    }
    if (picked.length >= limit) return picked;
  }

  for (const item of sortProjectsLiveFirst([...byId.values()])) {
    picked.push(item);
    if (picked.length >= limit) break;
  }

  return picked;
}
