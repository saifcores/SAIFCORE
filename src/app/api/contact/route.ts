import {
  isContactFormConfigured,
  parseContactPayload,
  sendContactEmails,
} from "@/server/contact-mail";

export const runtime = "nodejs";

export async function POST(request: Request) {
  if (!isContactFormConfigured()) {
    return Response.json(
      { error: "Contact form is temporarily unavailable." },
      { status: 503 },
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
