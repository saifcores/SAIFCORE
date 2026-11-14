import {
  isContactFormConfigured,
  parseContactPayload,
  sendContactEmails,
} from "@/server/contact-mail";

export const runtime = "nodejs";

const RATE_LIMIT = 5;
const RATE_WINDOW_MS = 60_000;

type Bucket = { count: number; resetAt: number };

const rateBuckets = new Map<string, Bucket>();

function clientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    const first = forwarded.split(",")[0]?.trim();
    if (first) return first;
  }
  return request.headers.get("x-real-ip")?.trim() || "unknown";
}

function allowRequest(ip: string): boolean {
  const now = Date.now();
  const bucket = rateBuckets.get(ip);
  if (!bucket || now >= bucket.resetAt) {
    rateBuckets.set(ip, { count: 1, resetAt: now + RATE_WINDOW_MS });
    return true;
  }
  if (bucket.count >= RATE_LIMIT) return false;
  bucket.count += 1;
  return true;
}

export async function POST(request: Request) {
  if (!isContactFormConfigured()) {
    return Response.json(
      { error: "Contact form is temporarily unavailable." },
      { status: 503 },
    );
  }

  if (!allowRequest(clientIp(request))) {
    return Response.json(
      { error: "Too many requests. Please try again shortly." },
      { status: 429 },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid request body." }, { status: 400 });
  }

  // Honeypot — bots fill hidden fields; humans leave blank.
  if (
    body &&
    typeof body === "object" &&
    "website" in body &&
    typeof (body as { website?: unknown }).website === "string" &&
    (body as { website: string }).website.trim() !== ""
  ) {
    return Response.json({ ok: true });
  }

  const payload = parseContactPayload(body);
  if (!payload) {
    return Response.json({ error: "Invalid form data." }, { status: 400 });
  }

  const error = await sendContactEmails(payload);
  if (error) {
    return Response.json({ error }, { status: 502 });
  }

  return Response.json({ ok: true });
}
