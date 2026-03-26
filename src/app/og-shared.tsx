import { ImageResponse } from "next/og";

export const OG_SIZE = { width: 1200, height: 630 } as const;

export const ogAlt = "Manarix — Software Architect & Full-Stack Engineer";

export function createOgImageResponse() {
  return new ImageResponse(
    <div
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: 64,
        background:
          "linear-gradient(145deg, #0b0f19 0%, #111827 42%, #0c1222 100%)",
        position: "relative",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />
      <div
        style={{
          position: "absolute",
          right: -100,
          top: -100,
          width: 440,
          height: 440,
          background:
            "radial-gradient(circle at center, rgba(99,102,241,0.5) 0%, rgba(34,211,238,0.08) 45%, transparent 68%)",
        }}
      />
      <div
        style={{
          position: "absolute",
          left: -60,
          bottom: -60,
          width: 320,
          height: 320,
          background:
            "radial-gradient(circle at center, rgba(59,130,246,0.25) 0%, transparent 65%)",
        }}
      />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 18,
          zIndex: 1,
        }}
      >
        <div
          style={{
            fontSize: 78,
            fontWeight: 700,
            letterSpacing: "-0.045em",
            color: "#f8fafc",
            lineHeight: 1.02,
          }}
        >
          Manarix
        </div>
        <div
          style={{
            fontSize: 34,
            fontWeight: 500,
            color: "#94a3b8",
            maxWidth: 860,
            lineHeight: 1.35,
          }}
        >
          Software Architect & Full-Stack Engineer
        </div>
        <div
          style={{
            marginTop: 28,
            height: 5,
            width: 140,
            borderRadius: 6,
            background: "linear-gradient(90deg, #3b82f6, #6366f1, #c084fc)",
          }}
        />
      </div>
      <div
        style={{
          position: "absolute",
          bottom: 52,
          left: 64,
          fontSize: 22,
          color: "#64748b",
          letterSpacing: "0.02em",
        }}
      >
        Scalable systems · SaaS · Fintech
      </div>
    </div>,
    {
      ...OG_SIZE,
    },
  );
}
