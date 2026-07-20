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
