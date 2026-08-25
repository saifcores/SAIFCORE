import { caseStudySlug } from "@/seo";
import type { FeaturedProjectItem } from "@/types/messages";

/** Stable case study anchor slugs (from `caseStudySlug(title)`). */
const articleCaseStudySlugs: Record<string, string[]> = {
  "banking-middleware-multi-subsidiary": ["unified-api-gateway"],
  "adr-double-entry-ledger-payments": ["double-entry-ledger-system"],
  "mobile-money-integration-patterns": [
    "pan-african-payment-sdk",
    "ecom-360-pme",
  ],
  "scalable-fintech-systems": [
    "double-entry-ledger-system",
    "pan-african-payment-sdk",
  ],
  "why-saas-fail-africa": ["school-management-saas", "ecom-360-pme"],
  "architecture-reviews-that-help": ["unified-api-gateway"],
};

export function getRelatedCaseStudies(
  articleSlug: string,
  items: readonly FeaturedProjectItem[],
  limit = 2,
): FeaturedProjectItem[] {
  const slugs = articleCaseStudySlugs[articleSlug];
  if (!slugs?.length) return [];

  return slugs
    .map((slug) => items.find((item) => caseStudySlug(item.title) === slug))
    .filter((item): item is FeaturedProjectItem => item != null)
    .slice(0, limit);
}

export function getCaseStudyHref(title: string): `/systems#case-${string}` {
  return `/systems#case-${caseStudySlug(title)}`;
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
    normalized.includes("livré")
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
