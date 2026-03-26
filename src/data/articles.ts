import type { ArticleKind, ContentBlock } from "./article-content";
import { bodyToBlocks } from "./article-content";

export type { ArticleKind, ContentBlock } from "./article-content";

export type Article = {
  slug: string;
  /** ISO date (YYYY-MM-DD) */
  publishedAt: string;
  /** writing · code · design · adr · document */
  kind: ArticleKind;
  title: { en: string; fr: string };
  excerpt: { en: string; fr: string };
  /** Full article hosted elsewhere (opens in a new tab from the list/detail). */
  externalUrl?: string;
  /**
   * Structured blocks (code, ADR, design notes, document outline, …).
   * If omitted, legacy `body` is converted to paragraphs.
   */
  blocks?: ContentBlock[];
  /** @deprecated Prefer `blocks`; still supported for simple prose-only pieces. */
  body?: { en: string[]; fr: string[] };
};

export const articles: Article[] = [
  {
    slug: "why-saas-fail-africa",
    kind: "writing",
    publishedAt: "2025-02-10",
    title: {
      en: "Why most SaaS fail in Africa",
      fr: "Pourquoi tant de SaaS échouent en Afrique",
    },
    excerpt: {
      en: "Beyond the landing page: payments, distribution, and trust assumptions that don’t survive first contact with the market.",
      fr: "Au-delà de la landing : paiements, distribution et hypothèses de confiance qui ne résistent pas au contact du terrain.",
    },
    blocks: [
      {
        type: "paragraph",
        en: "A playbook built for card-first economies, same-day logistics, and stable FX will mislead you the moment you optimize for a market where mobile money, agent networks, and cash still shape user behaviour. The product roadmap is rarely the first thing that breaks — it is the invisible stack around it: how money moves, how disputes get resolved, and how trust is earned without a decade of brand history.",
        fr: "Une recette pensée pour des économies où la carte domine, la logistique est prévisible et le change est stable vous induira en erreur dès que vous optimisez pour un marché où l’argent mobile, les réseaux d’agents et le liquide structurent encore le comportement. Ce n’est souvent pas la roadmap produit qui lâche en premier — c’est la stack invisible autour : comment l’argent circule, comment on tranche un litige, comment on gagne la confiance sans dix ans de notoriété.",
      },
      {
        type: "paragraph",
        en: "Teams that “copy San Francisco” often under-index on last-mile reality: KYC rules that differ by corridor, settlement windows that don’t line up with payroll cycles, or partner APIs that return success while the user’s wallet is still pending. Your architecture has to make those states visible — not paper over them with a generic spinner.",
        fr: "Les équipes qui « copient la Silicon Valley » sous-pondèrent souvent le dernier kilomètre : exigences KYC qui varient selon les corridors, fenêtres de settlement qui ne coïncident pas avec la paie, ou APIs partenaires qui renvoient un succès alors que le portefeuille de l’utilisateur est encore en attente. Votre architecture doit rendre ces états visibles — pas les masquer derrière un spinner générique.",
      },
      {
        type: "heading",
        level: 2,
        en: "What to design for instead",
        fr: "Sur quoi concevoir à la place",
      },
      {
        type: "paragraph",
        en: "Start from observable constraints: which payment rails your ICP actually uses, what “good” latency means on 3G, and which compliance artefacts auditors will ask for in year two, not demo day. Instrument adoption and failure paths the same way you instrument revenue — ambiguous funnels hide structural gaps that no feature flag will fix.",
        fr: "Partez de contraintes observables : quels rails de paiement votre ICP utilise vraiment, ce que signifie une « bonne » latence en 3G, et quels artefacts de conformité les auditeurs exigeront en année deux, pas au jour du pitch. Instrumentez l’adoption et les échecs comme vous instrumentez le revenu — les entonnoirs flous masquent des écarts structurels qu’aucun feature flag ne réparera.",
      },
      {
        type: "callout",
        variant: "info",
        en: "Rule of thumb: if your runbook for “payment stuck” is a Slack ping to a human, you don’t yet have a payments architecture — you have a script. Automate detection, idempotent retries, and customer-visible status before you scale spend.",
        fr: "Règle pratique : si votre runbook « paiement bloqué » se résume à un ping Slack vers un humain, vous n’avez pas encore une architecture de paiement — vous avez un script. Automatisez la détection, les retries idempotents et un statut lisible côté client avant de monter en dépense.",
      },
      {
        type: "paragraph",
        en: "The goal is not to romanticize local complexity — it is to build systems honest enough to degrade gracefully when the network is flaky, regulation shifts mid-quarter, or your champion leaves the account. That’s the bar for SaaS that survives contact with reality.",
        fr: "L’objectif n’est pas de romanticiser la complexité locale — c’est de bâtir des systèmes assez honnêtes pour dégrader proprement quand le réseau capricie, que la réglementation pivote en milieu de trimestre, ou que votre sponsor quitte le compte. C’est la barre pour un SaaS qui tient au contact du réel.",
      },
    ],
  },
  {
    slug: "scalable-fintech-systems",
    kind: "code",
    publishedAt: "2025-01-22",
    title: {
      en: "Designing scalable fintech systems",
      fr: "Concevoir des systèmes fintech à l’échelle",
    },
    excerpt: {
      en: "Clear money boundaries, idempotent commands, and ledgers your finance team can reason about — not just a bigger Postgres cluster.",
      fr: "Frontières claires autour de l’argent, commandes idempotentes et grands livres compréhensibles par la finance — pas seulement un Postgres plus gros.",
    },
    blocks: [
      {
        type: "paragraph",
        en: "Money systems fail expensively: duplicate charges, settlements stuck in ambiguous states, reconciliation spreadsheets that diverge from the database of record. The fix is rarely a bigger database — it is explicit boundaries between **initiation**, **authorization**, **clearing**, and **reconciliation**, each with its own invariants and audit trail.",
        fr: "Les systèmes monétaires cassent cher : doubles débits, settlements coincés dans des états ambigus, tableaux de rapprochement qui divergent de la base de référence. La solution est rarement une base plus grosse — ce sont des frontières explicites entre **initiation**, **autorisation**, **compensation** et **rapprochement**, chacune avec ses invariants et sa piste d’audit.",
      },
      {
        type: "heading",
        level: 2,
        en: "Idempotent payment intent",
        fr: "Intention de paiement idempotente",
      },
      {
        type: "paragraph",
        en: "Retries are inevitable. The client must supply a stable idempotency key; the server must treat it as a unique business key, not a nice-to-have header. The sketch below shows the happy path: return the same intent if the key was already processed.",
        fr: "Les retries sont inévitables. Le client doit fournir une clé d’idempotence stable ; le serveur doit la traiter comme une clé métier unique, pas comme un en-tête optionnel. L’esquisse ci-dessous montre le chemin nominal : renvoyer la même intention si la clé a déjà été traitée.",
      },
      {
        type: "code",
        language: "typescript",
        title: {
          en: "Idempotency key on the write command",
          fr: "Clé d’idempotence sur la commande d’écriture",
        },
        code: `import { randomUUID } from "node:crypto";

type CreatePayment = {
  amount: number;
  currency: string;
  /** Client-generated; retries MUST reuse the same key */
  idempotencyKey: string;
};

export async function createPaymentIntent(cmd: CreatePayment) {
  const existing = await store.findByIdempotencyKey(cmd.idempotencyKey);
  if (existing) return existing;

  const intent = {
    id: randomUUID(),
    ...cmd,
    status: "requires_confirmation" as const,
  };
  await store.save(intent);
  return intent;
}`,
      },
      {
        type: "callout",
        variant: "info",
        en: "At scale, idempotency belongs in your **OpenAPI contract** and your integration tests — not only in a comment. Log the key on every retry with correlation IDs so support can trace a single user action across services.",
        fr: "À grande échelle, l’idempotence doit figurer dans votre **contrat OpenAPI** et vos tests d’intégration — pas seulement dans un commentaire. Journalisez la clé à chaque retry avec des **correlation IDs** pour que le support puisse retracer une action utilisateur de bout en bout.",
      },
      {
        type: "heading",
        level: 2,
        en: "Ledger and reconciliation",
        fr: "Grand livre et rapprochement",
      },
      {
        type: "paragraph",
        en: "If finance cannot explain your ledger model in one whiteboard session, operations will pay the tax forever. Model balances as append-only events where possible; make “why is this amount here?” answerable from data, not tribal knowledge. Pair that with reconciliation jobs that match PSP statements to internal events — and alert when drift exceeds a threshold, not when someone notices a spreadsheet.",
        fr: "Si la finance ne peut pas expliquer votre grand livre en une session tableau blanc, l’opération paiera la taxe pour toujours. Modélisez les soldes en événements append-only quand c’est possible ; rendez « pourquoi ce montant est-il là ? » vérifiable depuis les données, pas le savoir tacite. Couplez cela à des jobs de rapprochement qui alignent les relevés PSP sur les événements internes — et alertez quand l’écart dépasse un seuil, pas quand quelqu’un remarque une feuille Excel.",
      },
      {
        type: "paragraph",
        en: "Throughput and debuggability go together: high QPS means nothing if every incident turns into a multi-day forensic. Invest in observability on money paths as early as you invest in caching.",
        fr: "Débit et débogage vont ensemble : un gros QPS ne sert à rien si chaque incident devient une enquête sur plusieurs jours. Investissez dans l’observabilité des flux monétaires aussi tôt que dans le cache.",
      },
    ],
  },
  {
    slug: "architecture-reviews-that-help",
    kind: "adr",
    publishedAt: "2024-12-05",
    title: {
      en: "Architecture reviews that actually help",
      fr: "Des revues d’architecture qui servent vraiment",
    },
    excerpt: {
      en: "Fewer slides, clearer decisions: ADRs as a contract between teams — not a beauty contest for diagrams.",
      fr: "Moins de slides, de décisions plus nettes : les ADR comme contrat entre équipes — pas un concours de schémas.",
    },
    blocks: [
      {
        type: "paragraph",
        en: "Reviews derail when the room optimizes for **being seen** as smart instead of **reducing** risk. The output is a calendar invite and a vague sense of unease — not a decision that survives the next hiring wave. A useful review is short, adversarial in the right way, and ends with owners and dates.",
        fr: "Les revues déraillent quand la salle optimise pour **paraître** compétent plutôt que pour **réduire** le risque. On en sort avec une invitation au calendrier et un malaise vague — pas une décision qui survivra au prochain recrutement. Une revue utile est courte, adversariale dans le bon sens, et se termine avec des responsables et des dates.",
      },
      {
        type: "adr",
        status: {
          en: "Accepted · 2024-12-05",
          fr: "Accepté · 2024-12-05",
        },
        context: {
          en: "Engineering squads were spending half-day sessions in “architecture forums” that produced no recorded decision. Product needed faster alignment on trade-offs (latency vs. cost vs. compliance) without escalating every choice to a committee.",
          fr: "Les équipes passaient des demi-journées en « forums d’architecture » sans décision tracée. Le produit avait besoin d’un alignement plus rapide sur les arbitrages (latence vs coût vs conformité) sans faire monter chaque choix en comité.",
        },
        decision: {
          en: "Adopt a **one-page ADR** per material decision: context (with links), decision, consequences (positive and negative), and a single explicit **“revisit when”** trigger (metric threshold, date, or regulatory event). Reviews longer than 45 minutes are split or cancelled.",
          fr: "Adopter une **ADR d’une page** par décision significative : contexte (avec liens), décision, conséquences (positives et négatives), et un seul **déclencheur explicite de révision** (seuil de métrique, date ou événement réglementaire). Les revues de plus de 45 minutes sont découpées ou annulées.",
        },
        consequences: {
          en: "**Positive:** decisions are searchable in Git; new hires read history instead of lore. **Negative:** requires discipline to update status when assumptions change; “accepted” is not forever without a trigger.",
          fr: "**Positif :** les décisions sont consultables dans Git ; les nouveaux lisent l’historique au lieu du folklore. **Négatif :** exige de la discipline pour mettre à jour le statut quand les hypothèses changent ; « accepté » n’est pas éternel sans déclencheur.",
        },
      },
      {
        type: "paragraph",
        en: "Good reviews have a published agenda, a designated sceptic, and follow-ups that fit into the next sprint — not a parking lot that never lands. ADRs work when they answer three questions: what did we decide, why, and what would make us reopen the discussion?",
        fr: "Les bonnes revues ont un ordre du jour publié, un sceptique désigné, et des suites qui tiennent dans le sprint suivant — pas un parking lot qui n’atterrit jamais. Les ADR fonctionnent quand elles répondent à trois questions : qu’a-t-on décidé, pourquoi, et qu’est-ce qui rouvrirait le débat ?",
      },
      {
        type: "paragraph",
        en: "This format scales from seed-stage teams to orgs with multiple business lines — because it optimizes for clarity and memory, not for slide count.",
        fr: "Ce format s’adapte aussi bien à une équipe en amorçage qu’à une organisation à plusieurs métiers — parce qu’il optimise la clarté et la mémoire, pas le nombre de slides.",
      },
    ],
  },
  {
    slug: "design-tokens-boundaries",
    kind: "design",
    publishedAt: "2024-11-18",
    title: {
      en: "Design tokens at system boundaries",
      fr: "Design tokens aux frontières du système",
    },
    excerpt: {
      en: "Semantic tokens for the design system; product layers only where marketing and UX need to diverge — without breaking engineering or accessibility.",
      fr: "Tokens sémantiques pour le design system ; couches produit seulement là où marketing et UX doivent diverger — sans casser l’ingénierie ni l’accessibilité.",
    },
    blocks: [
      {
        type: "design",
        en: "**Principle:** Keep **semantic** tokens (e.g. `--surface-elevated`, `--text-muted`, `--focus-ring`) owned by the design system. Let **product** layers compose those tokens into gradients, campaign skins, or seasonal accents only at **leaf** components — never by forking the core button or input primitives.",
        fr: "**Principe :** gardez les tokens **sémantiques** (ex. `--surface-elevated`, `--text-muted`, `--focus-ring`) sous la responsabilité du design system. Laissez les couches **produit** composer ces tokens en dégradés, skins de campagne ou accents saisonniers uniquement sur les **composants feuilles** — jamais en forkant les primitives bouton ou champ de base.",
      },
      {
        type: "paragraph",
        en: "When every squad invents a slightly different shade of “primary” for a landing page, you don’t have a design system — you have a colour zoo. The boundary is not “design vs code”; it is **semantic stability** vs **contextual expression**.",
        fr: "Quand chaque squad invente une nuance de « primaire » pour une landing, vous n’avez pas un design system — vous avez un zoo de couleurs. La frontière n’est pas « design vs code » ; c’est **stabilité sémantique** vs **expression contextuelle**.",
      },
      {
        type: "heading",
        level: 3,
        en: "Handoff checklist",
        fr: "Checklist de handoff",
      },
      {
        type: "list",
        ordered: false,
        items: {
          en: [
            "Name tokens after **role** (what they do), not after hex or Figma layer names.",
            "Document dark-mode pairs next to light in the **same** table — drift hides in separate tables.",
            "Ship a JSON (or CSS variables) export that **byte-for-byte** matches what the app consumes.",
            "Define focus, contrast, and motion rules at the system level — product skins must not weaken WCAG-critical paths.",
          ],
          fr: [
            "Nommez les tokens d’après le **rôle** (ce qu’ils font), pas d’après le hex ou le nom de calque Figma.",
            "Documentez les paires dark à côté du light dans le **même** tableau — la dérive se cache dans les tableaux séparés.",
            "Livrez un export JSON (ou variables CSS) qui correspond **à l’identique** à ce que l’app consomme.",
            "Définissez focus, contraste et mouvement au niveau système — les skins produit ne doivent pas fragiliser les parcours critiques WCAG.",
          ],
        },
      },
      {
        type: "callout",
        variant: "warning",
        en: "If “brand refresh” requires touching fifty primitives, your tokens were not semantic — they were **aliases** to a single palette.",
        fr: "Si un « refresh marque » impose de toucher cinquante primitives, vos tokens n’étaient pas sémantiques — c’étaient des **alias** vers une palette unique.",
      },
      {
        type: "paragraph",
        en: "When Figma and production diverge, the bug is usually an **implicit third theme** — dark mode, high-contrast, or “marketing only” — that nobody named in the contract between design and engineering.",
        fr: "Quand Figma et la prod divergent, le bug est souvent un **troisième thème implicite** — mode sombre, contraste élevé, ou « marketing » — que personne n’a nommé dans le contrat design ↔ ingénierie.",
      },
    ],
  },
  {
    slug: "product-brief-template",
    kind: "document",
    publishedAt: "2024-10-01",
    title: {
      en: "Product brief — one-page template",
      fr: "Brief produit — modèle d’une page",
    },
    excerpt: {
      en: "A single page to align problem, users, metrics, and explicit non-goals before anyone draws a diagram.",
      fr: "Une page pour aligner problème, utilisateurs, métriques et non-objectifs explicites avant tout schéma.",
    },
    blocks: [
      {
        type: "paragraph",
        en: "Use this outline in Confluence, Notion, or a Markdown file in the repo. The goal is a **shared vocabulary** and **testable assumptions** before architecture or sprint commitments. If two readers disagree on what “success” means, stop — clarify the brief first.",
        fr: "Utilisez cette trame dans Confluence, Notion ou un fichier Markdown dans le dépôt. L’objectif est un **vocabulaire partagé** et des **hypothèses testables** avant l’architecture ou les engagements de sprint. Si deux lecteurs ne sont pas d’accord sur ce que « succès » veut dire, arrêtez — clarifiez d’abord le brief.",
      },
      {
        type: "document",
        title: {
          en: "Outline",
          fr: "Trame",
        },
        items: {
          en: [
            "**Problem statement** — user pain + business pain in one paragraph (no solution yet).",
            "**Target users** — personas or segments + primary jobs-to-be-done.",
            "**Success metrics** — leading indicators (activation, retention) and lagging (revenue, NPS) with rough targets.",
            "**Constraints** — regulatory, SLA, budget, timeline, dependencies on other teams.",
            "**Non-goals** — what is explicitly out of scope for this phase (say “no” to scope creep early).",
            "**Risks & open questions** — what must be validated before build; who owns each discovery item.",
          ],
          fr: [
            "**Énoncé du problème** — douleur utilisateur + douleur métier en un paragraphe (sans solution encore).",
            "**Utilisateurs cibles** — personas ou segments + jobs-to-be-done principaux.",
            "**Métriques de succès** — indicateurs avancés (activation, rétention) et retardés (revenu, NPS) avec ordres de grandeur.",
            "**Contraintes** — réglementaire, SLA, budget, calendrier, dépendances inter-équipes.",
            "**Non-objectifs** — ce qui est hors périmètre explicite pour cette phase (dire « non » tôt à la dérive de scope).",
            "**Risques & questions ouvertes** — ce qu’il faut valider avant de construire ; qui pilote chaque point de découverte.",
          ],
        },
      },
      {
        type: "callout",
        variant: "warning",
        en: "If the brief is already a slide deck with diagrams, you skipped the hard part — **writing the problem in one sentence** everyone can quote.",
        fr: "Si le brief est déjà un deck avec schémas, vous avez sauté l’étape difficile — **formuler le problème en une phrase** que tout le monde peut citer.",
      },
    ],
  },
];

export function getArticleBySlug(slug: string): Article | undefined {
  return articles.find((a) => a.slug === slug);
}

export function getArticleBlocks(article: Article): ContentBlock[] {
  if (article.blocks?.length) return article.blocks;
  if (article.body) return bodyToBlocks(article.body);
  return [];
}
