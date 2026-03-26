export type TrustBrand = {
  name: string;
  /** File in `public/trust/` */
  logo: string;
};

export const trustBrands: TrustBrand[] = [
  { name: "BOA Group", logo: "boa.jpeg" },
  { name: "ENG Technologie", logo: "eng.jpeg" },
  { name: "Mafalia", logo: "mafalia.jpeg" },
  { name: "SarayaTech Senegal", logo: "saraya.jpeg" },
];
