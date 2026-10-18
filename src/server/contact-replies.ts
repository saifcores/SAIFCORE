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

1) Objectif business prioritaire (API, modernisation, MVP, plateforme, paiement…) ?
2) Deadline / go-live souhaité ?
3) Stack actuelle et contraintes (sécu, compliance, volumes) ?
4) Équipe, localisation et date de démarrage visée ?

Sur cette base, je vous propose soit un appel de 30 min, soit une prochaine étape sur le poste.
${cal}
${signoff("fr")}`,
    };
  }

  return {
    subject: `SAIFCORE — scoping your brief, ${n}`,
    body: `Hi ${n},

Thanks for the brief. To scope this quickly and suggest the right next step:

1) Primary business outcome (API, modernization, MVP, platform, payments…)?
2) Target timeline / go-live?
3) Current stack and constraints (security, compliance, scale)?
4) Team, location, and target start date?

From there I can recommend a 30-min call or a next step on the role.
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
  const cal = calendlyLine(input.locale);

  if (input.locale === "fr") {
    return {
      subject: `SAIFCORE — votre message, ${n}`,
      body: `Bonjour ${n},

Merci pour le contexte.

Disponible à partir de février 2027. En attendant, je réponds aux discussions recrutement.
${cal}
Dites-moi le rôle, l’équipe et le calendrier, ou on en parle en appel.

${signoff("fr")}`,
    };
  }

  return {
      subject: `SAIFCORE — your message, ${n}`,
      body: `Hi ${n},

Thanks for the context.

Available from February 2027. Until then, I reply to hiring conversations.
${cal}
Tell me about the role, team, and timeline, or we can talk it through on a call.

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
    labelFr: "Orienter vers un mode de collaboration",
    labelEn: "Point to ways of working",
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
