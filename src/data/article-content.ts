/**
 * Structured article body: paragraphs, code, ADR sections, design notes, outlines, etc.
 * Code samples are typically locale-agnostic; prose fields are bilingual.
 */

export type ArticleKind = "writing" | "code" | "design" | "adr" | "document";

export type ContentBlock =
  | { type: "paragraph"; en: string; fr: string }
  | { type: "heading"; level: 2 | 3; en: string; fr: string }
  | {
      type: "code";
      language: string;
      code: string;
      title?: { en: string; fr: string };
    }
  | { type: "callout"; variant: "info" | "warning"; en: string; fr: string }
  | {
      type: "adr";
      status: { en: string; fr: string };
      context: { en: string; fr: string };
      decision: { en: string; fr: string };
      consequences: { en: string; fr: string };
    }
  | { type: "design"; en: string; fr: string }
  | {
      type: "document";
      title: { en: string; fr: string };
      items: { en: string[]; fr: string[] };
    }
  | { type: "list"; ordered: boolean; items: { en: string[]; fr: string[] } };

export function bodyToBlocks(body: {
  en: string[];
  fr: string[];
}): ContentBlock[] {
  const n = Math.max(body.en.length, body.fr.length);
  const out: ContentBlock[] = [];
  for (let i = 0; i < n; i++) {
    const en = body.en[i] ?? "";
    const fr = body.fr[i] ?? "";
    if (!en && !fr) continue;
    out.push({ type: "paragraph", en, fr });
  }
  return out;
}
