/** Stable ids — copy keys must exist in `messages/*.json` → `certifications.items`. */
export const certificationIds = [
  "softwareDesign",
  "softwareEngineeringEssentials",
  "digitalBankingFundamentals",
  "awsSolutionsArchitect",
  "awsDeveloper",
  "comptiaSecurityPlus",
  "confluentKafkaDeveloper",
  "kubernetes",
  "docker",
  "springProfessional",
  "paymentSystems",
] as const;

export type CertificationId = (typeof certificationIds)[number];

export type CertificationKind =
  | "academic"
  | "aws"
  | "security"
  | "kafka"
  | "kubernetes"
  | "docker"
  | "spring"
  | "domain";

/**
 * Credential progress — edit per cert in `certificationsMeta`.
 * Set `obtained` (+ optional `verifyUrl`) to unlock nav, sitemap, and
 * `/certifications`. Until then the route 404s and teasers stay hidden —
 * do not publish a planned-only roadmap.
 * `inProgress` can surface in credential teasers once actively pursuing.
 */
export type CertificationStatus = "obtained" | "inProgress" | "notStarted";

export type CertificationMeta = {
  id: CertificationId;
  kind: CertificationKind;
  status: CertificationStatus;
  /** Credly / issuer verify URL — add when available */
  verifyUrl?: string;
};

export const certificationsMeta: CertificationMeta[] = [
  {
    id: "softwareDesign",
    kind: "academic",
    status: "notStarted",
  },
  {
    id: "softwareEngineeringEssentials",
    kind: "academic",
    status: "notStarted",
  },
  {
    id: "digitalBankingFundamentals",
    kind: "academic",
    status: "notStarted",
  },
  {
    id: "awsSolutionsArchitect",
    kind: "aws",
    status: "notStarted",
  },
  {
    id: "awsDeveloper",
    kind: "aws",
    status: "notStarted",
  },
  {
    id: "comptiaSecurityPlus",
    kind: "security",
    status: "notStarted",
  },
  {
    id: "confluentKafkaDeveloper",
    kind: "kafka",
    status: "notStarted",
  },
  {
    id: "kubernetes",
    kind: "kubernetes",
    status: "notStarted",
  },
  {
    id: "docker",
    kind: "docker",
    status: "notStarted",
  },
  {
    id: "springProfessional",
    kind: "spring",
    status: "notStarted",
  },
  {
    id: "paymentSystems",
    kind: "domain",
    status: "notStarted",
  },
];

export function getCertificationMeta(id: CertificationId): CertificationMeta {
  const meta = certificationsMeta.find((c) => c.id === id);
  if (!meta) throw new Error(`Unknown certification id: ${id}`);
  return meta;
}

/** True when at least one credential is verified — gates nav, sitemap, and /certifications. */
export function hasObtainedCertifications(): boolean {
  return certificationsMeta.some((cert) => cert.status === "obtained");
}

/** Homepage teaser — certified + actively pursuing (excludes planned only). */
export function getTeaserCertifications(): CertificationMeta[] {
  return certificationsMeta.filter((cert) => cert.status !== "notStarted");
}
