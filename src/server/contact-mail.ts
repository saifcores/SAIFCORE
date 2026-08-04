import { Resend } from "resend";
import { ContactAutoReplyEmail } from "@/emails/contact-auto-reply";
import { ContactLeadEmail } from "@/emails/contact-lead";
import {
  getCalendlyUrl,
  getContactEmail,
  getLinkedinUrl,
  getSiteUrl,
} from "@/site";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_NAME = 100;
const MAX_COMPANY = 120;
const MAX_MESSAGE = 5000;
const MIN_MESSAGE = 10;

export type ContactLocale = "en" | "fr";

export type ContactPayload = {
  name: string;
  email: string;
  company: string;
  message: string;
  subject: string;
  locale: ContactLocale;
};

export function isContactFormConfigured(): boolean {
  return (
    !!process.env.RESEND_API_KEY?.trim() &&
    !!process.env.RESEND_FROM_EMAIL?.trim() &&
    getContactEmail() != null
  );
}

export function parseContactPayload(body: unknown): ContactPayload | null {
  if (!body || typeof body !== "object") return null;
  const b = body as Record<string, unknown>;

  const name = typeof b.name === "string" ? b.name.trim() : "";
  const email = typeof b.email === "string" ? b.email.trim() : "";
  const company = typeof b.company === "string" ? b.company.trim() : "";
  const message = typeof b.message === "string" ? b.message.trim() : "";
  const subject = typeof b.subject === "string" ? b.subject.trim() : "";
  const localeRaw = typeof b.locale === "string" ? b.locale.trim() : "en";
  const locale: ContactLocale = localeRaw === "fr" ? "fr" : "en";

  if (!name || name.length > MAX_NAME) return null;
  if (!email || email.length > 254 || !EMAIL_RE.test(email)) return null;
  if (company.length > MAX_COMPANY) return null;
  if (message.length < MIN_MESSAGE || message.length > MAX_MESSAGE) return null;
  if (!subject || subject.length > 200) return null;

  return { name, email, company, message, subject, locale };
}

function ownerSubject(payload: ContactPayload): string {
  const company = payload.company || "—";
  return `[SAIFCORE Lead] ${payload.name} · ${company}`;
}

function autoReplySubject(payload: ContactPayload): string {
  return payload.locale === "fr"
    ? `SAIFCORE — brief reçu, ${payload.name}`
    : `SAIFCORE — brief received, ${payload.name}`;
}

function ownerText(payload: ContactPayload): string {
  const company = payload.company || "—";
  const calendly = getCalendlyUrl();

  return `Nouveau brief — saifcore.tech
Locale: ${payload.locale}

LEAD
────
Nom      : ${payload.name}
Email    : ${payload.email}
Société  : ${company}
Objet    : ${payload.subject}

BRIEF
─────
${payload.message}

QUALIF (reply)
──────────────
• Recrutement / freelance / embed équipe ?
• Objectif : paiements, API, modernisation, MVP, audit…
• Timeline + contraintes (réglementaire, stack, scale)
• Cadre : forfait / TJM / mission

NEXT
────
1. Reply ce thread
2. Si fit clair → discovery${calendly ? `\n   ${calendly}` : ""}
3. Sinon → 3–5 questions ciblées + package adapté

—
SAIFCORE · Backend · Payments · Platforms
${getSiteUrl()}`;
}

function autoReplyText(payload: ContactPayload): string {
  const calendly = getCalendlyUrl();
  const linkedin = getLinkedinUrl();
  const site = getSiteUrl();

  if (payload.locale === "fr") {
    return `Bonjour ${payload.name},

Merci pour votre message via SAIFCORE.

Votre brief est bien reçu. Je le lis avec attention et vous réponds sous deux jours ouvrables — avec des questions précises et, si le besoin est clair, un prochain pas concret (appel discovery, atelier, ou package d’engagement).

Pour avancer plus vite, vous pouvez :
• préciser objectifs, contraintes, timeline et stack ;
${calendly ? `• ou réserver 30 min :\n  ${calendly}` : "• ou me répondre directement à ce message."}

Je collabore principalement sur les backends enterprise, les paiements et les plateformes régulées (Java / Spring Boot, systèmes distribués, cloud) — en remote, EN/FR.

Bien cordialement,
Saïfoulaye Diallo
SAIFCORE
${site}${linkedin ? `\n${linkedin}` : ""}`;
  }

  return `Hi ${payload.name},

Thanks for reaching out via SAIFCORE.

I’ve received your brief and will reply within two business days — with focused questions and, when the fit is clear, a concrete next step (discovery call, workshop, or engagement package).

To move faster, you can:
• share goals, constraints, timeline, and stack;
${calendly ? `• or book 30 minutes:\n  ${calendly}` : "• or reply directly to this message."}

I partner on enterprise backends, payments, and regulated platforms (Java / Spring Boot, distributed systems, cloud) — remote, EN/FR.

Best regards,
Saïfoulaye Diallo
SAIFCORE
${site}${linkedin ? `\n${linkedin}` : ""}`;
}

/** Sends owner notification + locale-aware auto-reply. Returns error message or null. */
export async function sendContactEmails(
  payload: ContactPayload,
): Promise<string | null> {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  const from = process.env.RESEND_FROM_EMAIL?.trim();
  const to = getContactEmail();

  if (!apiKey || !from || !to) {
    return "Contact form is not configured.";
  }

  const resend = new Resend(apiKey);
  const calendlyUrl = getCalendlyUrl();
  const linkedinUrl = getLinkedinUrl();
  const siteUrl = getSiteUrl();

  const { error: ownerError } = await resend.emails.send({
    from,
    to: [to],
    replyTo: payload.email,
    subject: ownerSubject(payload),
    text: ownerText(payload),
    react: ContactLeadEmail({
      name: payload.name,
      email: payload.email,
      company: payload.company,
      subject: payload.subject,
      message: payload.message,
      locale: payload.locale,
      calendlyUrl,
      siteUrl,
    }),
    tags: [
      { name: "type", value: "contact_lead" },
      { name: "locale", value: payload.locale },
    ],
  });

  if (ownerError) {
    return ownerError.message || "Failed to send message.";
  }

  // Auto-reply is best-effort; lead already landed in inbox.
  const { error: replyError } = await resend.emails.send({
    from,
    to: [payload.email],
    replyTo: to,
    subject: autoReplySubject(payload),
    text: autoReplyText(payload),
    react: ContactAutoReplyEmail({
      name: payload.name,
      locale: payload.locale,
      calendlyUrl,
      linkedinUrl,
      siteUrl,
    }),
    tags: [
      { name: "type", value: "contact_autoreply" },
      { name: "locale", value: payload.locale },
    ],
  });

  if (replyError) {
    console.error("Contact auto-reply failed:", replyError.message);
  }

  return null;
}
