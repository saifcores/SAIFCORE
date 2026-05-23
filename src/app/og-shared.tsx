import { ImageResponse } from "next/og";

export const OG_SIZE = { width: 1200, height: 630 } as const;

export type OgLocale = "en" | "fr";

const OG_COPY: Record<
  OgLocale,
  { alt: string; badge: string; line1: string; line2: string; line3: string }
> = {
  en: {
    alt: "SAIFCORE — Freelance Fintech Engineer | Payment & Backend Systems",
    badge: "Freelance Fintech Engineer · Remote Worldwide",
    line1: "Scalable payment",
    line2: "infrastructure &",
    line3: "enterprise backends",
  },
  fr: {
    alt: "SAIFCORE — Ingénieur Fintech Freelance | Paiements & Backend",
    badge: "Ingénieur Fintech Freelance · Remote International",
    line1: "Infrastructure de",
    line2: "paiement scalable &",
    line3: "backends enterprise",
  },
};

/** @deprecated Use getOgAlt(locale) */
export const ogAlt = OG_COPY.en.alt;

export function getOgAlt(locale: OgLocale): string {
  return OG_COPY[locale].alt;
}

export function createOgImageResponse(locale: OgLocale = "en") {
  const copy = OG_COPY[locale];

  return new ImageResponse(
    <div
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: 72,
        background: "#0A0A0A",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
        }}
      />
      <div
        style={{
          position: "absolute",
          left: -160,
          top: -120,
          width: 520,
          height: 520,
          background:
            "radial-gradient(circle at center, rgba(37,99,235,0.35) 0%, transparent 65%)",
          borderRadius: "50%",
        }}
      />
      <div
        style={{
          position: "absolute",
          right: -100,
          bottom: -100,
          width: 400,
          height: 400,
          background:
            "radial-gradient(circle at center, rgba(16,185,129,0.25) 0%, transparent 65%)",
          borderRadius: "50%",
        }}
      />

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          zIndex: 1,
          position: "relative",
        }}
      >
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 10,
            fontSize: 14,
            fontWeight: 500,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "#52525B",
            marginBottom: 28,
          }}
        >
          <div
            style={{
              width: 6,
              height: 6,
              borderRadius: "50%",
              background: "linear-gradient(135deg, #2563EB, #10B981)",
            }}
          />
          {copy.badge}
        </div>

        <div
          style={{
            fontSize: 60,
            fontWeight: 700,
            letterSpacing: "-0.04em",
            color: "#FAFAFA",
            lineHeight: 1.08,
            marginBottom: 8,
          }}
        >
          {copy.line1}
        </div>
        <div
          style={{
            fontSize: 60,
            fontWeight: 700,
            letterSpacing: "-0.04em",
            color: "#FAFAFA",
            lineHeight: 1.08,
            marginBottom: 8,
          }}
        >
          {copy.line2}
        </div>
        <div
          style={{
            fontSize: 60,
            fontWeight: 700,
            letterSpacing: "-0.04em",
            background: "linear-gradient(135deg, #2563EB 0%, #10B981 100%)",
            backgroundClip: "text",
            color: "transparent",
            lineHeight: 1.08,
          }}
        >
          {copy.line3}
        </div>

        <div
          style={{
            marginTop: 36,
            height: 4,
            width: 160,
            borderRadius: 4,
            background: "linear-gradient(90deg, #2563EB, #10B981)",
          }}
        />
      </div>

      <div
        style={{
          position: "absolute",
          bottom: 56,
          left: 72,
          fontSize: 18,
          color: "#52525B",
          letterSpacing: "0.04em",
        }}
      >
        saifcore.com
      </div>

      <div
        style={{
          position: "absolute",
          bottom: 56,
          right: 72,
          fontSize: 18,
          fontWeight: 700,
          letterSpacing: "-0.01em",
          color: "#71717A",
        }}
      >
        SAIFCORE
      </div>
    </div>,
    { ...OG_SIZE },
  );
}
