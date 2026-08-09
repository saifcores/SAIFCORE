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
    slug: "centralized-baas-multi-subsidiary-branches",
    kind: "writing",
    publishedAt: "2026-08-09",
    title: {
      en: "Centralized BaaS for banking groups: one platform, many subsidiaries, many branches",
      fr: "BaaS centralisé pour groupes bancaires : une plateforme, plusieurs filiales, des milliers d’agences",
    },
    excerpt: {
      en: "Why “one core per subsidiary” does not scale — and what a group BaaS platform must isolate versus share when each entity runs its own network of branches.",
      fr: "Pourquoi « un core par filiale » ne scale pas — et ce qu’une plateforme BaaS de groupe doit isoler versus partager quand chaque entité opère son propre réseau d’agences.",
    },
    blocks: [
      {
        type: "paragraph",
        en: "A banking group wants one platform for deposits, payments, and agency operations — not eleven separate cores to keep alive. Each subsidiary still has its own legal entity, currency, product catalogue, and regulator. Each branch is an operating point with cash, limits, and staff — not a bank of its own. Centralized Banking-as-a-Service only works when that hierarchy is modeled on purpose: one shared platform contract, many subsidiary realities, thousands of branch contexts that never leak into each other.",
        fr: "Un groupe bancaire veut une seule plateforme pour les dépôts, les paiements et les opérations d’agence — pas onze cores distincts à maintenir en vie. Chaque filiale reste une entité légale avec sa devise, son catalogue produits et son régulateur. Chaque agence est un point d’opération — caisse, plafonds, équipes — pas une banque à part. Le Banking-as-a-Service centralisé ne tient que si cette hiérarchie est modélisée volontairement : un contrat de plateforme commun, plusieurs réalités de filiale, des milliers de contextes d’agence qui ne doivent jamais fuiter les uns dans les autres.",
      },
      {
        type: "heading",
        level: 2,
        en: "What “centralize” actually means",
        fr: "Ce que « centraliser » veut vraiment dire",
      },
      {
        type: "paragraph",
        en: "Centralize the platform: APIs, ledgers engines, identity, orchestration, observability, release trains. Do not centralize risk, compliance, or balances into a single undifferentiated blob. A shared codebase with first-class entity boundaries is not the same as a shared database where every subsidiary’s money sits behind the same WHERE clause. The group buys speed and consistency; each subsidiary keeps its legal and operational perimeter.",
        fr: "Centralisez la plateforme : APIs, moteurs de ledger, identité, orchestration, observabilité, trains de release. Ne centralisez pas le risque, la conformité ni les soldes dans un blob indifférencié. Un code partagé avec des frontières d’entité de premier ordre n’est pas une base partagée où l’argent de chaque filiale se cache derrière le même WHERE. Le groupe gagne en vitesse et en cohérence ; chaque filiale garde son périmètre légal et opérationnel.",
      },
      {
        type: "heading",
        level: 2,
        en: "The hierarchy you must model",
        fr: "La hiérarchie à modéliser",
      },
      {
        type: "list",
        ordered: false,
        items: {
          en: [
            "Group — shared platform ownership, standards, cross-entity reporting, partner contracts at scale",
            "Subsidiary — legal entity: chart of accounts, currency, local products, regulatory reporting, settlement calendars",
            "Branch / agency — service point: cash vault, teller roles, local limits, opening hours, inventory of devices",
            "Channels — mobile, agency banking, partner APIs: same domain commands, different auth and risk envelopes",
          ],
          fr: [
            "Groupe — propriété de la plateforme, standards, reporting transversal, contrats partenaires à l’échelle",
            "Filiale — entité légale : plan comptable, devise, produits locaux, reporting réglementaire, calendriers de settlement",
            "Agence — point de service : caisse, rôles guichet, plafonds locaux, horaires, parc de terminaux",
            "Canaux — mobile, agency banking, APIs partenaires : mêmes commandes métier, enveloppes d’auth et de risque différentes",
          ],
        },
      },
      {
        type: "heading",
        level: 2,
        en: "Architecture pillars of multi-subsidiary BaaS",
        fr: "Piliers d’architecture d’un BaaS multi-filiales",
      },
      {
        type: "list",
        ordered: false,
        items: {
          en: [
            "Tenancy first — every command, event, and row carries an explicit entityId; isolation is a product feature, not an afterthought filter",
            "Ledger per subsidiary — balances and double-entry books never cross legal entities; group views are aggregations, not a mega-ledger",
            "Parametric product catalogue — shared primitives (account, transfer, fee) with local rules, limits, and fees instead of forked services",
            "Identity and branch scope — a teller sees one agency; a subsidiary ops role sees one entity; group roles are rare and audited",
            "Dual reporting — regulatory and financial close per subsidiary, plus group consolidations that never weaken entity controls",
          ],
          fr: [
            "Tenancy d’abord — chaque commande, événement et ligne porte un entityId explicite ; l’isolation est une fonction produit, pas un filtre après coup",
            "Ledger par filiale — soldes et écritures en partie double ne traversent jamais les entités légales ; les vues groupe sont des agrégations, pas un méga-ledger",
            "Catalogue produits paramétrique — primitives partagées (compte, transfert, frais) avec règles, plafonds et tarifs locaux plutôt que des services forkés",
            "Identité et périmètre agence — un caissier voit une agence ; un ops filiale voit une entité ; les rôles groupe sont rares et audités",
            "Double reporting — clôture réglementaire et financière par filiale, plus consolidations groupe qui n’affaiblissent jamais les contrôles d’entité",
          ],
        },
      },
      {
        type: "callout",
        variant: "warning",
        en: "The expensive failure mode is a “shared database without boundaries,” or eleven forks of the same core “just for this market.” Both look faster in month one. Both become unreleasable by year two — especially across West African multi-country groups where each subsidiary already runs a different operating reality.",
        fr: "Le mode de panne coûteux, c’est la « base partagée sans frontières », ou onze forks du même core « juste pour ce marché ». Les deux semblent plus rapides le premier mois. Les deux deviennent impossibles à releaser dès la deuxième année — surtout dans les groupes multi-pays d’Afrique de l’Ouest où chaque filiale vit déjà une réalité opérationnelle différente.",
      },
      {
        type: "heading",
        level: 2,
        en: "Branches inside a centralized platform",
        fr: "Les agences dans une solution centralisée",
      },
      {
        type: "paragraph",
        en: "Branches are configuration and authorization, not separate deployments. Cash limits, vault hierarchies, teller workflows, cut-off times, and device inventories belong in subsidiary-scoped policy layers. The platform ships one release train; each agency inherits the subsidiary’s rules and adds local constraints. When a teller posts a deposit, the command is the same everywhere — entity, branch, and channel travel with it so audit, reconciliation, and support never guess which perimeter they are in.",
        fr: "Les agences sont de la configuration et de l’autorisation, pas des déploiements séparés. Plafonds de caisse, hiérarchies de coffre, workflows guichet, heures de cut-off et inventaire des terminaux appartiennent à des couches de politiques scopées par filiale. La plateforme livre un seul train de release ; chaque agence hérite des règles de sa filiale et y ajoute des contraintes locales. Quand un caissier enregistre un dépôt, la commande est la même partout — entité, agence et canal voyagent avec elle pour que l’audit, le rapprochement et le support ne devinent jamais le périmètre.",
      },
      {
        type: "paragraph",
        en: "Multi-subsidiary BaaS is not “the same core eleven times.” It is one platform contract and N operating realities — the same design stance as multi-entity integrations, applied to the banking model itself: design for variance from entity two and branch one, or you will pay for it in forks, incidents, and regulatory gaps later.",
        fr: "Le BaaS multi-filiales n’est pas « le même core onze fois ». C’est un contrat de plateforme et N réalités opérationnelles — la même posture que pour les intégrations multi-entités, appliquée au modèle bancaire lui-même : concevez pour la variance dès la deuxième filiale et la première agence, ou vous le paierez plus tard en forks, incidents et trous réglementaires.",
      },
    ],
  },
  {
    slug: "eleven-subsidiaries-eleven-ways-to-break-a-webhook",
    kind: "writing",
    publishedAt: "2026-03-05",
    title: {
      en: "11 bank subsidiaries, 11 ways to break the same webhook",
      fr: "11 filiales bancaires, 11 façons de casser le même webhook",
    },
    excerpt: {
      en: "Multiply one integration by eleven entities and “works in staging” stops meaning anything. Notes on the failure modes that only show up at that scale.",
      fr: "Multipliez une intégration par onze entités et « ça marche en staging » ne veut plus rien dire. Notes sur les modes de panne qui n'apparaissent qu'à cette échelle.",
    },
    blocks: [
      {
        type: "paragraph",
        en: "One subsidiary, one webhook endpoint, one happy path — it works first try, and it is tempting to ship the same contract everywhere. Multiply that endpoint by eleven banking entities with their own infrastructure, their own security policy, and their own idea of “timely,” and the contract that looked airtight in staging starts leaking in ways no single-tenant test would ever catch.",
        fr: "Une filiale, un endpoint webhook, un chemin nominal — ça marche du premier coup, et on est tenté de livrer le même contrat partout. Multipliez cet endpoint par onze entités bancaires avec chacune sa propre infrastructure, sa propre politique de sécurité et sa propre idée de ce qu'est « à temps », et le contrat qui semblait béton en staging se met à fuir de façons qu'aucun test mono-tenant ne détecterait.",
      },
      {
        type: "heading",
        level: 2,
        en: "The failure modes that only appear at N entities",
        fr: "Les modes de panne qui n'apparaissent qu'à N entités",
      },
      {
        type: "list",
        ordered: false,
        items: {
          en: [
            "Timeout budgets that differ per subsidiary firewall — the same call is fast in one entity and hangs in another",
            "TLS and certificate rotation policies that are not synchronized, so “it broke last night” means a different night for each entity",
            "Clock skew across on-prem servers large enough to fail signature verification windows",
            "Duplicate webhook delivery under load, in entities where the upstream queue retries more aggressively than others",
            "Subtly different interpretations of an “optional” field, because one integration team filled a gap in the spec with its own default",
          ],
          fr: [
            "Des budgets de timeout qui diffèrent selon le pare-feu de chaque filiale — le même appel est rapide chez l'une, bloqué chez l'autre",
            "Des politiques de rotation TLS/certificats non synchronisées, si bien que « ça a cassé cette nuit » ne désigne pas la même nuit selon l'entité",
            "Un décalage d'horloge entre serveurs on-prem suffisant pour faire échouer la fenêtre de vérification de signature",
            "Une livraison en double du webhook sous charge, chez les entités où la queue amont retry plus agressivement que les autres",
            "Une interprétation subtilement différente d'un champ « optionnel », parce qu'une équipe d'intégration a comblé un vide de spec avec son propre défaut",
          ],
        },
      },
      {
        type: "callout",
        variant: "warning",
        en: "None of these are exotic bugs. Each one is boring in isolation — and invisible until entity number seven or eight surfaces it in production, usually during a settlement window.",
        fr: "Aucun de ces cas n'est un bug exotique. Chacun est banal pris isolément — et invisible jusqu'à ce que la filiale numéro sept ou huit le révèle en production, en général pendant une fenêtre de règlement.",
      },
      {
        type: "heading",
        level: 2,
        en: "Design for variance, not for a single golden entity",
        fr: "Concevoir pour la variance, pas pour une filiale témoin",
      },
      {
        type: "paragraph",
        en: "The fix is not a smarter retry library. It is treating “per-entity configuration” as a first-class part of the architecture from entity two onward: explicit timeout budgets per subsidiary, idempotency keys that survive duplicate delivery by design, signature verification with a tolerant clock window, and a correlation ID that ties a webhook back to the entity, the attempt number, and the exact contract version it was signed against. Multi-subsidiary integration work is not “the same webhook eleven times.” It is one contract and eleven operating realities that all have to fit inside it without elevens forks of the code.",
        fr: "La solution n'est pas une librairie de retry plus maligne. C'est de traiter la « configuration par filiale » comme un pilier de l'architecture dès la deuxième entité : budgets de timeout explicites par filiale, clés d'idempotence conçues pour survivre à une livraison en double, vérification de signature avec une fenêtre d'horloge tolérante, et un correlation ID qui relie un webhook à l'entité, au numéro de tentative et à la version exacte du contrat sur laquelle il a été signé. Le travail d'intégration multi-filiales n'est pas « le même webhook onze fois ». C'est un seul contrat et onze réalités opérationnelles qui doivent toutes y tenir sans onze forks du code.",
      },
    ],
  },
  {
    slug: "retry-storm-double-payout",
    kind: "writing",
    publishedAt: "2025-09-30",
    title: {
      en: "The retry storm that almost paid a merchant twice",
      fr: "La tempête de retries qui a failli payer un marchand deux fois",
    },
    excerpt: {
      en: "A provider timeout, a naive client retry loop, and the one idempotency check that stood between a clean settlement and an awkward call with finance.",
      fr: "Un timeout fournisseur, une boucle de retry côté client trop naïve, et le seul contrôle d'idempotence qui a évité un règlement en double — et un appel gênant avec la finance.",
    },
    blocks: [
      {
        type: "paragraph",
        en: "A mobile money provider went slow, not down — the worst kind of failure. Requests were taking four, five, sometimes eight seconds instead of the usual few hundred milliseconds. A client integration with an eager retry policy started firing the same payout request again after a three-second timeout, still believing the first attempt had failed. It hadn't. It was just late.",
        fr: "Un provider mobile money est devenu lent, pas indisponible — le pire type de panne. Les requêtes prenaient quatre, cinq, parfois huit secondes au lieu des quelques centaines de millisecondes habituelles. Une intégration cliente avec une politique de retry trop gourmande s'est mise à renvoyer la même demande de payout après un timeout de trois secondes, persuadée que la première tentative avait échoué. Elle n'avait pas échoué. Elle était juste en retard.",
      },
      {
        type: "heading",
        level: 2,
        en: "What actually happened",
        fr: "Ce qui s'est réellement passé",
      },
      {
        type: "paragraph",
        en: "Within about ninety seconds, the same payout command had been submitted three times for the same merchant. On the provider side, all three eventually succeeded — three separate transfers, same amount, same recipient. If the payments service had treated each inbound request as a new command, the merchant account would have been credited three times for one sale, and someone in finance would have discovered it during end-of-day reconciliation, days later, with no obvious trail back to the cause.",
        fr: "En environ quatre-vingt-dix secondes, la même commande de payout avait été soumise trois fois pour le même marchand. Côté fournisseur, les trois ont fini par réussir — trois virements distincts, même montant, même bénéficiaire. Si le service de paiement avait traité chaque requête entrante comme une nouvelle commande, le compte du marchand aurait été crédité trois fois pour une seule vente, et quelqu'un en finance l'aurait découvert lors du rapprochement de fin de journée, plusieurs jours plus tard, sans piste évidente vers la cause.",
      },
      {
        type: "callout",
        variant: "warning",
        en: "That is the trap with retries under latency, not downtime: every signal a naive client looks at (timeout, no response, connection reset) is indistinguishable from “the request never arrived.” It usually did arrive. It just hadn't answered yet.",
        fr: "C'est le piège des retries sous latence, pas sous panne franche : tout signal qu'un client naïf observe (timeout, absence de réponse, connexion coupée) est indiscernable de « la requête n'est jamais arrivée ». En général, elle est bien arrivée. Elle n'avait juste pas encore répondu.",
      },
      {
        type: "heading",
        level: 2,
        en: "The one check that held the line",
        fr: "Le seul contrôle qui a tenu la ligne",
      },
      {
        type: "paragraph",
        en: "The payout endpoint required a client-generated idempotency key, hashed from the merchant ID, the order ID, and the amount — not a random UUID the retry loop could regenerate on every attempt. All three retries carried the same key. The server recognized the second and third calls as duplicates of an in-flight command, returned the original response, and never issued a second transfer. No incident, no reconciliation surprise, no call to the merchant to explain a refund. Just a slightly noisy log line, three requests wide, that a bored engineer noticed the next morning.",
        fr: "L'endpoint de payout exigeait une clé d'idempotence générée côté client, dérivée de l'ID marchand, de l'ID commande et du montant — pas un UUID aléatoire que la boucle de retry aurait pu régénérer à chaque tentative. Les trois retries portaient la même clé. Le serveur a reconnu les deuxième et troisième appels comme des doublons d'une commande en cours, renvoyé la réponse d'origine, et n'a jamais émis de second virement. Pas d'incident, pas de surprise en rapprochement, pas d'appel au marchand pour expliquer un remboursement. Juste une ligne de log un peu bruyante, trois requêtes de large, qu'un ingénieur a remarquée le lendemain matin par curiosité.",
      },
      {
        type: "paragraph",
        en: "The lesson wasn't “add retries carefully.” It was that idempotency has to be derived from the business intent of a command, not from a client-side identifier that a retry can accidentally reset. If the key can change between attempts, the safety net was never actually there.",
        fr: "La leçon n'était pas « ajoutez des retries avec précaution ». C'était que l'idempotence doit se dériver de l'intention métier d'une commande, pas d'un identifiant côté client qu'un retry peut réinitialiser par accident. Si la clé peut changer entre deux tentatives, le filet de sécurité n'a jamais vraiment existé.",
      },
    ],
  },
  {
    slug: "stop-microservices-first-west-africa",
    kind: "writing",
    publishedAt: "2025-06-18",
    title: {
      en: "Stop defaulting to microservices in West African fintech",
      fr: "Arrêtez de partir en microservices par défaut en fintech ouest-africaine",
    },
    excerpt: {
      en: "Twelve services and three Kafka topics don't fix a two-person ops team. A case for a well-modularized monolith until traffic and headcount actually justify the split.",
      fr: "Douze services et trois topics Kafka ne réparent pas une équipe ops de deux personnes. Plaidoyer pour un monolithe bien modularisé, jusqu'à ce que trafic et effectif justifient vraiment la scission.",
    },
    blocks: [
      {
        type: "paragraph",
        en: "Every second architecture pitch for a new fintech MVP in the region starts with a service diagram: auth service, payments service, notifications service, a message bus between them, each with its own database and its own deploy pipeline. The team behind it usually has three engineers and no dedicated ops person. That diagram is not an architecture — it is a wish list for a company that doesn't exist yet.",
        fr: "Un pitch d'architecture sur deux pour une nouvelle MVP fintech dans la région commence par un diagramme de services : service auth, service paiement, service notifications, un bus de messages entre les trois, chacun avec sa propre base et son propre pipeline de déploiement. L'équipe derrière compte en général trois ingénieurs et personne dédié aux ops. Ce diagramme n'est pas une architecture — c'est une liste de souhaits pour une entreprise qui n'existe pas encore.",
      },
      {
        type: "heading",
        level: 2,
        en: "Where the pattern comes from",
        fr: "D'où vient ce réflexe",
      },
      {
        type: "paragraph",
        en: "Microservices-first is a reasonable answer to a problem most early fintechs in the region don't have yet: hundreds of engineers who need to deploy independently without stepping on each other. Copying that structure at three engineers imports its costs — network calls where a function call would do, distributed transactions where a database transaction would do, and an on-call rotation that doesn't exist to answer three services paging at 2am instead of one.",
        fr: "Le microservices-first est une réponse raisonnable à un problème que la plupart des jeunes fintechs de la région n'ont pas encore : des centaines d'ingénieurs qui doivent déployer indépendamment sans se marcher dessus. Copier cette structure à trois ingénieurs en importe les coûts — des appels réseau là où un simple appel de fonction suffirait, des transactions distribuées là où une transaction base de données suffirait, et une astreinte qui n'existe pas pour répondre à trois services qui sonnent à 2h du matin au lieu d'un seul.",
      },
      {
        type: "callout",
        variant: "info",
        en: "The question is never “monolith or microservices” in the abstract. It is: who is on call tonight, and how many independent failure domains can that person actually reason about at 2am?",
        fr: "La question n'est jamais « monolithe ou microservices » dans l'abstrait. C'est : qui est d'astreinte ce soir, et combien de domaines de panne indépendants cette personne peut-elle vraiment gérer à 2h du matin ?",
      },
      {
        type: "heading",
        level: 2,
        en: "What actually justifies the split",
        fr: "Ce qui justifie vraiment la scission",
      },
      {
        type: "list",
        ordered: false,
        items: {
          en: [
            "A module has a genuinely different scaling profile — e.g. webhook ingestion needs to scale independently of the admin dashboard",
            "Two teams need to ship and deploy that module on separate schedules without coordinating a release",
            "A component has different compliance or data-residency requirements from the rest of the system",
            "The module's failure blast radius must be contained — a reporting job crashing should never take payments down with it",
          ],
          fr: [
            "Un module a un profil de montée en charge réellement différent — par ex. l'ingestion de webhooks doit scaler indépendamment du dashboard admin",
            "Deux équipes doivent livrer et déployer ce module sur des calendriers séparés sans coordonner une release",
            "Un composant a des exigences de conformité ou de résidence des données différentes du reste du système",
            "Le rayon d'impact d'une panne du module doit être contenu — un job de reporting qui plante ne doit jamais entraîner les paiements avec lui",
          ],
        },
      },
      {
        type: "paragraph",
        en: "None of those are “we read a blog post about Netflix.” Start with a modular monolith — clear module boundaries, one deployable, one database, internal interfaces strict enough that pulling a module out later is a refactor, not a rewrite. Split when a concrete constraint forces it, not before. The team that resists the diagram now is usually the one still shipping in eighteen months.",
        fr: "Aucun de ces cas n'est « on a lu un article de blog sur Netflix ». Commencez par un monolithe modulaire — des frontières de modules claires, un seul déployable, une seule base, des interfaces internes assez strictes pour qu'extraire un module plus tard soit un refactor, pas une réécriture. Scindez quand une contrainte concrète l'impose, pas avant. L'équipe qui résiste au diagramme aujourd'hui est en général celle qui livre encore dans dix-huit mois.",
      },
    ],
  },
  {
    slug: "banking-middleware-multi-subsidiary",
    kind: "writing",
    publishedAt: "2025-04-28",
    title: {
      en: "Designing a banking middleware for multi-subsidiary organizations",
      fr: "Concevoir un middleware bancaire multi-filiales",
    },
    excerpt: {
      en: "How to protect core banking systems while exposing governed APIs, partner integrations, and observable money flows across multiple entities.",
      fr: "Comment protéger les systèmes core banking tout en exposant des APIs gouvernées, des intégrations partenaires et des flux financiers observables sur plusieurs entités.",
    },
    blocks: [
      {
        type: "paragraph",
        en: "A multi-subsidiary bank does not need another thin API layer. It needs a controlled boundary between fragile core systems, fast-moving product teams, and external partners. The middleware has to normalize identity, contracts, rate limits, audit trails, and operational visibility without becoming a dumping ground for every exception.",
        fr: "Une banque multi-filiales n'a pas besoin d'une simple couche API de plus. Elle a besoin d'une frontière contrôlée entre des systèmes core fragiles, des équipes produit qui avancent vite et des partenaires externes. Le middleware doit normaliser identité, contrats, rate limits, audit et visibilité opérationnelle sans devenir le réceptacle de toutes les exceptions.",
      },
      {
        type: "heading",
        level: 2,
        en: "Start from governance, not endpoints",
        fr: "Commencer par la gouvernance, pas par les endpoints",
      },
      {
        type: "paragraph",
        en: "The first design decision is ownership: who can publish an API, who approves a breaking change, and where the canonical OpenAPI contract lives. Once this is explicit, the gateway can enforce versioning, authentication, input validation, and request correlation before traffic reaches domain services or the core banking adapter.",
        fr: "La première décision de conception concerne la responsabilité : qui peut publier une API, qui valide un breaking change et où vit le contrat OpenAPI canonique. Une fois cela explicite, la passerelle peut appliquer versioning, authentification, validation des entrées et corrélation des requêtes avant que le trafic n'atteigne les services domaine ou l'adaptateur core banking.",
      },
      {
        type: "callout",
        variant: "info",
        en: "A banking middleware is successful when incidents become traceable: partner request, gateway decision, domain event, core response, and audit record all share the same correlation story.",
        fr: "Un middleware bancaire réussit quand les incidents deviennent traçables : requête partenaire, décision gateway, événement domaine, réponse core et trace d'audit racontent la même histoire de corrélation.",
      },
      {
        type: "heading",
        level: 2,
        en: "Design for subsidiary variance",
        fr: "Concevoir pour la variance entre filiales",
      },
      {
        type: "paragraph",
        en: "Subsidiaries rarely run with identical rules: limits, compliance checks, partner SLAs, and settlement windows vary. Keep those differences in policy and configuration layers, not in forked services. The architecture should make local rules explicit while preserving a shared platform core.",
        fr: "Les filiales fonctionnent rarement avec les mêmes règles : plafonds, contrôles conformité, SLA partenaires et fenêtres de settlement varient. Gardez ces différences dans des couches de politiques et de configuration, pas dans des services forkés. L'architecture doit rendre les règles locales explicites tout en conservant un socle plateforme commun.",
      },
    ],
  },
  {
    slug: "adr-double-entry-ledger-payments",
    kind: "adr",
    publishedAt: "2025-04-12",
    title: {
      en: "ADR: Why a double-entry ledger for payment systems",
      fr: "ADR : pourquoi un grand livre en partie double pour les paiements",
    },
    excerpt: {
      en: "A short architecture decision record for choosing accounting correctness, auditability, and reconciliation over a simple mutable balance table.",
      fr: "Une courte ADR pour choisir l'exactitude comptable, l'auditabilité et le rapprochement plutôt qu'une simple table de soldes mutables.",
    },
    blocks: [
      {
        type: "paragraph",
        en: "Mutable balances are attractive because they are simple to query. They are also dangerous when money moves through retries, reversals, provider callbacks, and delayed settlement. The moment finance asks why a balance changed, a single current-value table stops being enough.",
        fr: "Les soldes mutables sont séduisants parce qu'ils sont simples à lire. Ils deviennent dangereux quand l'argent passe par des retries, annulations, callbacks fournisseur et settlements différés. Dès que la finance demande pourquoi un solde a changé, une table de valeur courante ne suffit plus.",
      },
      {
        type: "adr",
        status: {
          en: "Accepted · 2025-04-12",
          fr: "Accepté · 2025-04-12",
        },
        context: {
          en: "The payment platform must support wallet integrations, provider callbacks, refunds, partner settlement, and finance reconciliation. Auditors need an immutable trail for every posted movement.",
          fr: "La plateforme de paiement doit supporter intégrations wallet, callbacks fournisseur, remboursements, settlement partenaire et rapprochement finance. Les auditeurs ont besoin d'une trace immuable pour chaque mouvement posté.",
        },
        decision: {
          en: "Use a double-entry ledger with append-only postings. Every movement creates balanced debit and credit entries inside a transaction; derived balances can be cached, but the journal remains the source of truth.",
          fr: "Utiliser un grand livre en partie double avec écritures append-only. Chaque mouvement crée des écritures débit et crédit équilibrées dans une transaction ; les soldes dérivés peuvent être cachés, mais le journal reste la source de vérité.",
        },
        consequences: {
          en: "**Positive:** reconciliation and audit become explainable from data. **Negative:** engineers must model accounting events explicitly, and write paths need stronger transactional discipline.",
          fr: "**Positif :** rapprochement et audit deviennent explicables depuis les données. **Négatif :** les ingénieurs doivent modéliser les événements comptables explicitement, et les écritures exigent une discipline transactionnelle plus forte.",
        },
      },
      {
        type: "callout",
        variant: "warning",
        en: "A ledger is not a reporting feature. It is the contract that lets product, finance, support, and compliance agree on what happened to money.",
        fr: "Un grand livre n'est pas une fonctionnalité de reporting. C'est le contrat qui permet au produit, à la finance, au support et à la conformité de s'accorder sur ce qui est arrivé à l'argent.",
      },
    ],
  },
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
    slug: "mobile-money-integration-patterns",
    kind: "code",
    publishedAt: "2025-03-18",
    title: {
      en: "Mobile money integration patterns for African fintech",
      fr: "Patterns d'intégration Mobile Money pour la fintech africaine",
    },
    excerpt: {
      en: "Wave, Orange Money, Free Money: the API gaps, callback traps, and idempotency pitfalls that production systems expose — and how to architect around them.",
      fr: "Wave, Orange Money, Free Money : les lacunes d'API, pièges de callback et problèmes d'idempotence que la production expose — et comment architecturer autour.",
    },
    blocks: [
      {
        type: "paragraph",
        en: "Mobile money rails in West Africa are not uniform. Wave, Orange Money, and Free Money each expose different callback semantics, settlement windows, and retry behaviours. A payment marked `SUCCESS` by the provider SDK is not always a settled transaction — and building as though it is will surface as a reconciliation nightmare six months into production.",
        fr: "Les rails mobile money en Afrique de l'Ouest ne sont pas uniformes. Wave, Orange Money et Free Money exposent chacun une sémantique de callback, des fenêtres de règlement et des comportements de retry différents. Un paiement marqué `SUCCESS` par le SDK du fournisseur n'est pas toujours une transaction réglée — et construire comme si c'était le cas se manifestera comme un cauchemar de rapprochement six mois en production.",
      },
      {
        type: "heading",
        level: 2,
        en: "The callback problem",
        fr: "Le problème du callback",
      },
      {
        type: "paragraph",
        en: "Most providers deliver a webhook callback asynchronously — sometimes seconds after the payment, sometimes minutes later, occasionally not at all if the endpoint was unavailable. Your architecture must decouple payment initiation from payment confirmation: store the intent immediately, update state only when a verified callback arrives, and run a reconciliation job that polls the provider status endpoint for any intents still pending after a configurable timeout.",
        fr: "La plupart des fournisseurs livrent un webhook de callback de façon asynchrone — parfois quelques secondes après le paiement, parfois plusieurs minutes plus tard, et parfois jamais si l'endpoint était indisponible. Votre architecture doit découpler l'initiation du paiement de la confirmation : stocker l'intention immédiatement, mettre à jour l'état uniquement quand un callback vérifié arrive, et exécuter un job de rapprochement qui interroge l'endpoint de statut du fournisseur pour toute intention encore en attente après un timeout configurable.",
      },
      {
        type: "code",
        language: "java",
        title: {
          en: "Payment intent state machine — Spring state transitions",
          fr: "Machine d'état de l'intention de paiement — transitions Spring",
        },
        code: `public enum PaymentStatus {
  INITIATED,      // intent saved, provider call pending
  PROVIDER_SENT,  // request dispatched to provider API
  PENDING,        // provider acknowledged, awaiting callback
  SUCCESS,        // verified callback received
  FAILED,         // provider failure or timeout reconciliation
  REFUNDED        // post-settlement reversal
}

@Transactional
public PaymentIntent handleCallback(CallbackPayload payload) {
  PaymentIntent intent = repository
    .findByProviderRef(payload.getReference())
    .orElseThrow(() -> new UnknownReferenceException(payload.getReference()));

  // Reject replays: idempotency on callback
  if (intent.getStatus() == PaymentStatus.SUCCESS
      || intent.getStatus() == PaymentStatus.FAILED) {
    return intent; // already terminal — discard duplicate
  }

  intent.setStatus(payload.isSuccessful()
    ? PaymentStatus.SUCCESS : PaymentStatus.FAILED);
  intent.setSettledAt(Instant.now());
  auditLog.record(intent, "callback", payload.getRawBody());
  return repository.save(intent);
}`,
      },
      {
        type: "callout",
        variant: "info",
        en: "Always verify the callback signature against the provider's HMAC key before updating state. Spoofed callbacks that mark a payment as `SUCCESS` without actual settlement are a real attack vector in the wild.",
        fr: "Vérifiez toujours la signature du callback contre la clé HMAC du fournisseur avant de mettre à jour l'état. Les callbacks falsifiés qui marquent un paiement comme `SUCCESS` sans règlement réel sont un vecteur d'attaque concret dans la pratique.",
      },
      {
        type: "heading",
        level: 2,
        en: "Reconciliation as a first-class job",
        fr: "Le rapprochement comme job de première classe",
      },
      {
        type: "paragraph",
        en: "Run a scheduled reconciliation job — every 5 minutes for active intents, every hour for the prior-day batch. For each intent in `PENDING` status beyond the provider's typical settlement window, query the provider status API directly. Treat divergence as an alert: if your ledger says `PENDING` but the provider says `SUCCESS`, apply the state transition and page on-call; if the provider says `FAILED`, trigger the refund workflow and notify the user before they notice.",
        fr: "Exécutez un job de rapprochement planifié — toutes les 5 minutes pour les intentions actives, toutes les heures pour le lot du jour précédent. Pour chaque intention en statut `PENDING` au-delà de la fenêtre de règlement typique du fournisseur, interrogez directement l'API de statut du fournisseur. Traitez toute divergence comme une alerte : si votre grand livre dit `PENDING` mais que le fournisseur dit `SUCCESS`, appliquez la transition d'état et pagez l'astreinte ; si le fournisseur dit `FAILED`, déclenchez le workflow de remboursement et notifiez l'utilisateur avant qu'il ne s'en aperçoive.",
      },
      {
        type: "paragraph",
        en: "The systems that scale to millions of transactions without breaking finance operations are not the ones with the fastest provider integrations — they are the ones where every money state is explicit, observable, and recoverable without manual intervention.",
        fr: "Les systèmes qui passent à des millions de transactions sans briser les opérations financières ne sont pas ceux qui ont les intégrations fournisseur les plus rapides — ce sont ceux où chaque état monétaire est explicite, observable et récupérable sans intervention manuelle.",
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

export function getLatestArticles(limit?: number): Article[] {
  const sorted = [...articles].sort((a, b) =>
    b.publishedAt.localeCompare(a.publishedAt),
  );
  return limit ? sorted.slice(0, limit) : sorted;
}

/** Same-kind articles first, then newest — excludes the current slug. */
export function getRelatedArticles(slug: string, limit = 3): Article[] {
  const current = getArticleBySlug(slug);
  if (!current) return [];

  const byDate = (a: Article, b: Article) =>
    b.publishedAt.localeCompare(a.publishedAt);

  const others = articles.filter((a) => a.slug !== slug);
  const sameKind = others.filter((a) => a.kind === current.kind).sort(byDate);
  const rest = others.filter((a) => a.kind !== current.kind).sort(byDate);

  return [...sameKind, ...rest].slice(0, limit);
}

export function getArticleBlocks(article: Article): ContentBlock[] {
  if (article.blocks?.length) return article.blocks;
  if (article.body) return bodyToBlocks(article.body);
  return [];
}
