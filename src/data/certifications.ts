/** Stable ids — copy keys must exist in `messages/*.json` → `certifications.items`. */
export const certificationIds = [
  "awsSolutionsArchitect",
  "awsDeveloper",
  "comptiaSecurityPlus",
  "azureAiEngineer",
  "confluentKafkaDeveloper",
  "kubernetes",
  "docker",
  "springProfessional",
  "aiIntegration",
  "paymentSystems",
] as const;

export type CertificationId = (typeof certificationIds)[number];

export type CertificationKind =
  | "aws"
  | "security"
  | "azure"
  | "kafka"
  | "kubernetes"
  | "docker"
  | "spring"
  | "ai"
  | "domain";

/** Credential progress — edit per cert in `certificationsMeta`. */
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
    id: "azureAiEngineer",
    kind: "azure",
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
    id: "aiIntegration",
    kind: "ai",
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

/** Homepage teaser — certified + actively pursuing (excludes planned only). */
export function getTeaserCertifications(): CertificationMeta[] {
  return certificationsMeta.filter((cert) => cert.status !== "notStarted");
}
