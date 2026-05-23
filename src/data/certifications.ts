/** Stable ids — copy keys must exist in `messages/*.json` → `certifications.items`. */
export const certificationIds = [
  "awsSolutionsArchitect",
  "awsDeveloper",
  "kubernetes",
  "docker",
  "springProfessional",
  "aiIntegration",
  "paymentSystems",
] as const;

export type CertificationId = (typeof certificationIds)[number];

export type CertificationKind =
  | "aws"
  | "kubernetes"
  | "docker"
  | "spring"
  | "ai"
  | "domain";

export type CertificationMeta = {
  id: CertificationId;
  kind: CertificationKind;
  /** Shown on homepage teaser */
  featured: boolean;
  /** AWS Credly / issuer verify URL — add when available */
  verifyUrl?: string;
};

export const certificationsMeta: CertificationMeta[] = [
  {
    id: "awsSolutionsArchitect",
    kind: "aws",
    featured: false,
  },
  {
    id: "awsDeveloper",
    kind: "aws",
    featured: false,
  },
  {
    id: "kubernetes",
    kind: "kubernetes",
    featured: false,
  },
  {
    id: "docker",
    kind: "docker",
    featured: false,
  },
  {
    id: "springProfessional",
    kind: "spring",
    featured: false,
  },
  {
    id: "aiIntegration",
    kind: "ai",
    featured: false,
  },
  {
    id: "paymentSystems",
    kind: "domain",
    featured: false,
  },
];

export function getCertificationMeta(id: CertificationId): CertificationMeta {
  const meta = certificationsMeta.find((c) => c.id === id);
  if (!meta) throw new Error(`Unknown certification id: ${id}`);
  return meta;
}
