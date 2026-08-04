/**
 * Strategic reply drafts for inbound SAIFCORE leads.
 * Copy into your mail client when you reply (match the lead’s language).
 *
 * Usage:
 *   import { buildReply } from "@/server/contact-replies";
 *   const { subject, body } = buildReply("qualify", { name: "Alex", locale: "fr" });
 */

import { getCalendlyUrl, getLinkedinUrl, getSiteUrl } from "@/site";

export type ReplyLocale = "en" | "fr";
export type ReplyKind =
  "qualify" | "bookCall" | "package" | "recruiter" | "decline";

export type ReplyInput = {
  name: string;
  locale: ReplyLocale;
  /** Optional company for personalization */
  company?: string;
};

export type ReplyDraft = {
  subject: string;
  body: string;
};

function signoff(locale: ReplyLocale): string {
  const site = getSiteUrl();
  const linkedin = getLinkedinUrl();
  if (locale === "fr") {
    return `Bien cordialement,
Saïfoulaye Diallo
SAIFCORE
${site}${linkedin ? `\n${linkedin}` : ""}`;
  }
  return `Best regards,
Saïfoulaye Diallo
SAIFCORE
${site}${linkedin ? `\n${linkedin}` : ""}`;
}

function calendlyLine(locale: ReplyLocale): string {
  const url = getCalendlyUrl();
  if (!url) return "";
  return locale === "fr"
    ? `\nCréneau discovery (30 min) : ${url}\n`
    : `\nDiscovery slot (30 min): ${url}\n`;
}

function firstName(name: string): string {
  const part = name.trim().split(/\s+/)[0];
  return part || name.trim();
}

function qualify(input: ReplyInput): ReplyDraft {
  const n = firstName(input.name);
  const cal = calendlyLine(input.locale);

  if (input.locale === "fr") {
    return {
      subject: `SAIFCORE — cadrage de votre brief, ${n}`,
      body: `Bonjour ${n},

Merci pour votre brief. Pour le cadrer rapidement et vous proposer le bon prochain pas :

1) Objectif business prioritaire (paiement, API, modernisation, MVP, audit…) ?
2) Deadline / go-live souhaité ?
3) Stack actuelle et contraintes (sécu, compliance, volumes) ?
4) Cadre : forfait, TJM, ou embed dans l’équipe ?

Sur cette base, je vous propose soit un appel de 30 min, soit un package d’engagement adapté.
${cal}
${signoff("fr")}`,
    };
  }

  return {
    subject: `SAIFCORE — scoping your brief, ${n}`,
    body: `Hi ${n},

Thanks for the brief. To scope this quickly and suggest the right next step:

1) Primary business outcome (payments, API, modernization, MVP, audit…)?
2) Target timeline / go-live?
3) Current stack and constraints (security, compliance, scale)?
4) Engagement model: fixed scope, day rate, or team embed?

From there I can recommend either a 30-min discovery call or the right engagement package.
${cal}
${signoff("en")}`,
  };
}

function bookCall(input: ReplyInput): ReplyDraft {
  const n = firstName(input.name);
  const url = getCalendlyUrl();
  const cal =
    url ??
    (input.locale === "fr"
      ? "(lien Calendly à ajouter)"
      : "(add Calendly link)");

  if (input.locale === "fr") {
    return {
      subject: `SAIFCORE — proposons un appel discovery, ${n}`,
      body: `Bonjour ${n},

Merci — le brief est clair et le fit semble bon pour une collaboration SAIFCORE.

Proposons un appel discovery de 30 min pour aligner objectifs, contraintes et prochain livrable :
${cal}

En amont, si utile : stack, environnement (prod / réglementé), et fenêtre de démarrage souhaitée.

${signoff("fr")}`,
    };
  }

  return {
    subject: `SAIFCORE — let’s book a discovery call, ${n}`,
    body: `Hi ${n},

Thanks — the brief is clear and this looks like a strong fit for a SAIFCORE engagement.

Let’s book a 30-min discovery call to align on outcomes, constraints, and the first deliverable:
${cal}

Beforehand, if helpful: stack, environment (prod / regulated), and preferred start window.

${signoff("en")}`,
  };
}

function packageReply(input: ReplyInput): ReplyDraft {
  const n = firstName(input.name);
  const site = getSiteUrl();
  const cal = calendlyLine(input.locale);

  if (input.locale === "fr") {
    return {
      subject: `SAIFCORE — package d’engagement adapté, ${n}`,
      body: `Bonjour ${n},

Merci pour le contexte. Au vu de votre besoin, je recommande de partir d’un package d’engagement (plutôt qu’un échange ouvert sans cadrage) — pour un scope, un délai et un livrable explicites.

Packages : ${site}/#offers
${cal}
Dites-moi lequel se rapproche le plus de votre contexte (discovery, build, MVP, embed, modernisation, advisory), ou on en choisit un ensemble en appel.

${signoff("fr")}`,
    };
  }

  return {
    subject: `SAIFCORE — recommended engagement package, ${n}`,
    body: `Hi ${n},

Thanks for the context. Given your need, I’d start from a scoped engagement package (rather than an open-ended chat) — clear outcome, timeline, and deliverable.

Packages: ${site}/#offers
${cal}
Tell me which track is closest (discovery, build, MVP, embed, modernization, advisory), or we can pick one together on a call.

${signoff("en")}`,
  };
}

function recruiter(input: ReplyInput): ReplyDraft {
  const n = firstName(input.name);
  const company = input.company?.trim();
  const companyBit =
    company && (input.locale === "fr" ? ` chez ${company}` : ` at ${company}`);
  const site = getSiteUrl();

  if (input.locale === "fr") {
    return {
      subject: `SAIFCORE — votre opportunité${companyBit ?? ""}, ${n}`,
      body: `Bonjour ${n},

Merci pour votre message${companyBit ?? ""}.

Pour évaluer le fit rapidement, pouvez-vous partager :
• intitulé / niveau du rôle et type de contrat (CDI, freelance, contrat) ;
• stack & responsabilité (backend, paiements, plateforme…) ;
• remote / localisation et fourchette de rémunération ;
• timeline de recrutement.

CV / parcours : ${site}

${signoff("fr")}`,
    };
  }

  return {
    subject: `SAIFCORE — your opportunity${companyBit ?? ""}, ${n}`,
    body: `Hi ${n},

Thanks for reaching out${companyBit ?? ""}.

To assess fit quickly, could you share:
• role title / level and contract type (full-time, freelance, contract);
• stack & ownership (backend, payments, platform…);
• remote / location and compensation band;
• hiring timeline.

CV / background: ${site}

${signoff("en")}`,
  };
}

function decline(input: ReplyInput): ReplyDraft {
  const n = firstName(input.name);
  const linkedin = getLinkedinUrl();

  if (input.locale === "fr") {
    return {
      subject: `SAIFCORE — suite à votre brief, ${n}`,
      body: `Bonjour ${n},

Merci pour votre message et le temps consacré au brief.

Après revue, ce besoin n’est pas le meilleur fit pour SAIFCORE en l’état (périmètre / timing / positionnement). Je préfère être transparent plutôt que de forcer une collaboration.

Si le besoin évolue vers du backend enterprise, paiements ou modernisation de plateforme, je serai ravi d’en reparler.${linkedin ? `\n\nRestons en lien : ${linkedin}` : ""}

${signoff("fr")}`,
    };
  }

  return {
    subject: `SAIFCORE — following up on your brief, ${n}`,
    body: `Hi ${n},

Thanks for your note and for sharing the brief.

After review, this isn’t the strongest fit for SAIFCORE right now (scope / timing / positioning). I’d rather be clear than force an engagement.

If the need shifts toward enterprise backend, payments, or platform modernization, I’d be glad to revisit.${linkedin ? `\n\nStay in touch: ${linkedin}` : ""}

${signoff("en")}`,
  };
}

const builders: Record<ReplyKind, (input: ReplyInput) => ReplyDraft> = {
  qualify,
  bookCall,
  package: packageReply,
  recruiter,
  decline,
};

/** Build a copy-paste reply draft for Gmail / Apple Mail / etc. */
export function buildReply(kind: ReplyKind, input: ReplyInput): ReplyDraft {
  return builders[kind]({
    ...input,
    locale: input.locale === "fr" ? "fr" : "en",
  });
}

export const REPLY_KINDS: {
  kind: ReplyKind;
  labelFr: string;
  labelEn: string;
}[] = [
  {
    kind: "qualify",
    labelFr: "Cadrage — questions de qualification",
    labelEn: "Qualify — scoping questions",
  },
  {
    kind: "bookCall",
    labelFr: "Fit clair — proposer un appel",
    labelEn: "Clear fit — propose a call",
  },
  {
    kind: "package",
    labelFr: "Orienter vers un package d’engagement",
    labelEn: "Point to an engagement package",
  },
  {
    kind: "recruiter",
    labelFr: "Recruteur — demander les détails du rôle",
    labelEn: "Recruiter — ask for role details",
  },
  {
    kind: "decline",
    labelFr: "Pas le bon fit — décliner proprement",
    labelEn: "Not a fit — decline politely",
  },
];
