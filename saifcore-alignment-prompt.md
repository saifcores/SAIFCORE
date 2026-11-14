# SAIFCORE — Home positioning brief (`/fr` + `/en`)

**Role:** Guardrails + verification for the home positioning alignment. Do **not** redesign the site. Do **not** rewrite the honesty system or the double-callback subtitle. Prefer copy/order fixes over component rewrites.

**Status (Nov 2026):** Core alignment is **already shipped** in `messages/*`, `HOME_TEASER_IDS`, and teaser proof rendering. Use this doc to **verify**, **avoid regressions**, and close **owner-only** leftovers — not to re-implement from scratch.

**Sources of truth**

1. Live copy: `messages/fr.json`, `messages/en.json`
2. Home teaser order: `src/data/case-studies.ts` → `HOME_TEASER_IDS` / `sortProjectsForHomeTeaser()`
3. Proof badge: `src/components/portfolio/FeaturedProjectsTeaser.tsx` (`homeProof`)
4. Expertise badges: `src/components/portfolio/ExpertiseTeaser.tsx` (pillar / foundation / direction)

**Out of scope**

- Full GTM plan, new offer packaging, new problem pages, LinkedIn cadence
- Inventing metrics, client names, or production claims
- Softening or removing honesty labels (`kindLive` / `kindConfidential` / `kindLab`)
- Replacing the hero subtitle that names double callbacks / timeouts / stuck states
- Drive-by refactors of offers, audience paths, or `/systems` cleanup

---

## 0. Non-negotiables (never regress)

### 0.1 Honesty labels

| Kind         | FR                                     | EN                                   |
| ------------ | -------------------------------------- | ------------------------------------ |
| Live         | Produit en production                  | Live product                         |
| Confidential | Patterns professionnels · confidentiel | Professional patterns · confidential |
| Lab          | Lab personnel · open source            | Personal lab · open source           |

Do not collapse into generic “case study” badges. Do not invent live client metrics for confidential Synapse / Bank of Africa patterns.

### 0.2 Double-callback subtitle (core asset)

Keep meaning: happy path vs double callback / provider timeout / stuck state. Slight rhythm edits only — never a generic backend blurb, never drop failure modes from the first viewport without a stronger named replacement.

**FR spirit:**  
`Les paiements échouent rarement sur le happy path. Ils échouent quand un callback arrive deux fois, qu’un fournisseur timeout en plein transfert, ou qu’une transaction reste bloquée entre deux états.`

**EN spirit:**  
`Payment systems rarely fail on the happy path. They fail when a callback arrives twice, a provider times out mid-transfer, or a transaction gets stuck between states.`

### 0.3 No invented proof

- Do **not** invent subsidiary counts, partner counts, uptime %, onboarding speed, or merchant counts.
- Do **not** reintroduce contradicted `/systems` figures (e.g. 500+ merchants, ~60% faster, ~40% faster onboarding, “zero reconciliation drift in production” on a lab).
- Gateway numeric badge: **owner-supplied only** (§5). Until then keep the qualitative `homeProof`.

---

## 1. Shipped vs residual

| Item                | Target                                                                | Live status                                                                                                                            |
| ------------------- | --------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| Hero H1             | Payment-correctness claim, not generic backend                        | **Shipped** — FR *Des flux d’argent **justes** quand les rails cassent.* / EN *Money flows that stay **correct** when the rails fail.* |
| Hero subtitle       | Double callback / timeout / stuck                                     | **Shipped** — spirit preserved                                                                                                         |
| Meta / OG / JSON-LD | Same positioning claim; not “Senior Backend Engineer” lead            | **Shipped** — see §3                                                                                                                   |
| Expertise IA        | 3 pillars + foundation + AI as Direction                              | **Shipped** — 5 items; API = `02`; backend = Fondation `04`; AI = Direction `05`                                                       |
| Home teaser order   | Gateway → Ecom 360 → Disaster Lab                                     | **Shipped** — `HOME_TEASER_IDS`                                                                                                        |
| Home proof badges   | Explicit labels via `homeProof` (no `Preuve · 0` / `10+` / `Gateway`) | **Shipped**                                                                                                                            |
| Gateway numeric KPI | Real figure only                                                      | **Residual** — owner TODO                                                                                                              |
| LinkedIn headline   | Match FR/EN title claim                                               | **Residual** — paste from [`linkedin-copy.md`](linkedin-copy.md)                                                                       |

---

## 2. Positioning north star (copy filter)

> SAIFCORE designs and audits money flows so that nothing is lost or charged twice — especially when PSPs timeout, callbacks replay, or reconciliation drifts — on West African rails (Wave, Orange Money, Free Money, banking multi-entity APIs), with production depth from Bank of Africa Group delivery via Synapse.

Recruiter “Senior Backend Engineer / Java” language may stay in **secondary** places (CV CTAs, experience hiring lines). It must **not** own the H1, `<title>`, or OG title.

---

## 3. Meta / identity — keep unified

**FR claim:** `Justesse des paiements · APIs & rails UEMOA · SAIFCORE`  
**EN claim:** `Payment correctness · APIs & West Africa rails · SAIFCORE`

| Key                   | Expectation                                                                             |
| --------------------- | --------------------------------------------------------------------------------------- |
| `meta.title`          | Claim + `\| SAIFCORE`                                                                   |
| `meta.ogTitle`        | Same claim (separator may be `·` or `\|`) — must not revert to vague “reliable systems” |
| `meta.jsonLdJobTitle` | Payment/API engineer framing, not generic Senior Backend alone                          |
| `hero.identityRole`   | Aligned (e.g. Ingénieur paiements & APIs / Payment & API engineer)                      |
| `nav.brandRole`       | Short payment/API label OK                                                              |

**Do not restore as leads:**

- FR: `Ingénieur Backend Senior | Java · Systèmes distribués · Architecture`
- EN: `Senior Backend Engineer | Java · Distributed Systems · Architecture`
- FR OG: `Des systèmes financiers et d'entreprise fiables`
- EN OG: `Building reliable financial and enterprise systems`

**LinkedIn (owner):** paste the same claim as headline. Agents do not edit LinkedIn — note the string in any PR that touches meta.

---

## 4. Hero H1 — shipped baseline (do not “improve” away)

Keys: `hero.title`, `hero.titleAccent`, `hero.titleRest` (assembled in `HeroContent.tsx`).

| Locale | `title`                 | `titleAccent` | `titleRest`                |
| ------ | ----------------------- | ------------- | -------------------------- |
| FR     | `Des flux d’argent`     | `justes`      | `quand les rails cassent.` |
| EN     | `Money flows that stay` | `correct`     | `when the rails fail.`     |

Keep `hero.subtitle` and `hero.proofLine` unless a tiny consistency edit is required.

**Do not ship** as H1 this pass: ultra-short “Aucun franc perdu…” — subtitle owns failure-mode storytelling.

**Fallback only if owner rejects sharpness:**  
FR `Paiements` / `fiables` / `sur les rails d’Afrique de l’Ouest.`  
EN accent on `payments` with West Africa rails rest.

---

## 5. Expertise — architecture to preserve

### 5.1 Order & roles

| Rank   | Role       | Title (FR spirit)      | Proof case                        |
| ------ | ---------- | ---------------------- | --------------------------------- |
| **01** | Pillar     | Justesse des paiements | Ledger / Disaster Lab (secondary) |
| **02** | Pillar     | Gestion d’APIs         | **Unified API Gateway**           |
| **03** | Pillar     | Fiabilité distribuée   | Disaster Lab                      |
| **04** | Foundation | Backend engineering    | Ecom 360                          |
| **05** | Direction  | IA appliquée           | Lab only — no fake product claim  |

Section copy must not sell “six equal domains”. Lead shape: *Trois piliers — paiements, APIs, fiabilité — sur une fondation backend. L’IA reste une direction, pas un produit livré.*

### 5.2 UI coupling (regression risk)

`ExpertiseTeaser.tsx` today:

- Icons keyed by `num` (`01`…`05`) — keep nums ↔ icons in sync
- Foundation badge: `item.num === "04"`
- Direction badge: presence of `evidenceHref`
- Else: pillar / Preuve badge

If you reorder or add items, update badge logic and icons — do not assume array index alone.

### 5.3 Gateway metric — `[TODO]` owner only

**Forbidden:** inventing a gateway KPI.

Impact prose may keep accurate non-confidential Synapse / BoA wording (e.g. patterns for **11+ filiales**) **only if** still true. Do **not** promote that into the home proof badge unless the owner confirms it as the official card figure.

Until a verified figure exists:

1. Keep qualitative `homeProof` (FR `Patterns gateway multi-filiales (confidentiel)` / EN `Multi-entity gateway patterns (confidential)`).
2. PR note: `TODO(owner): replace gateway homeProof with verified metric when provided.` (already mirrored in `case-studies.ts` comment).
3. Never bind the teaser to a naked `metrics[0].value` that is `Gateway`, `0`, or a TODO token.

---

## 6. Home case-study order

`src/data/case-studies.ts` — `HOME_TEASER_IDS`:

1. `unified-api-gateway`
2. `ecom-360-pme`
3. `payment-platform-disaster-lab`

Keep `featuredProjects.homeKickers.*` numbering in sync (`01` gateway, `02` Ecom, `03` Disaster Lab). Comment above `HOME_TEASER_IDS` should stay: API/platform proof first, then live product, then public lab.

---

## 7. Proof badges — keep explicit `homeProof`

### 7.1 Required behavior

`FeaturedProjectsTeaser.tsx` must prefer `item.homeProof`, then a short clause from `impact` — **never** bare `metrics[0].value`.

### 7.2 Shipped labels

| Case id                         | FR `homeProof`                                    | EN `homeProof`                                    |
| ------------------------------- | ------------------------------------------------- | ------------------------------------------------- |
| `unified-api-gateway`           | `Patterns gateway multi-filiales (confidentiel)`  | `Multi-entity gateway patterns (confidential)`    |
| `ecom-360-pme`                  | `10+ commerçants en production`                   | `10+ merchants in production`                     |
| `payment-platform-disaster-lab` | `0 paiement échoué sous scénarios de panne (lab)` | `0 failed payments under failure scenarios (lab)` |

Disaster Lab’s zero and Ecom’s 10+ stay honest because the unit/context is named. Detail pages may keep full `metrics[]`.

---

## 8. Files (touch only if verifying or fixing regressions)

| Area         | Paths                                                                          |
| ------------ | ------------------------------------------------------------------------------ |
| Copy FR/EN   | `messages/fr.json`, `messages/en.json`                                         |
| Home order   | `src/data/case-studies.ts`                                                     |
| Proof badge  | `src/components/portfolio/FeaturedProjectsTeaser.tsx` (+ types if needed)      |
| Expertise UI | `src/components/portfolio/ExpertiseTeaser.tsx`, possibly `ExpertiseList.tsx`   |
| Meta         | `src/app/[locale]/layout.tsx`, `src/app/[locale]/page.tsx` (usually keys only) |

---

## 9. Acceptance / regression checklist

Verified live on `localhost` (Nov 2026) against `/fr` and `/en` (EN serves at `/`).

- [x] `/fr` and `/en` H1 still carry payment-correctness claim (not generic “reliable backend”)
- [x] Hero subtitle still names double callback / timeout / stuck state
- [x] `meta.title` and `meta.ogTitle` share the same positioning claim (FR and EN)
- [x] JSON-LD job title / description do not lead with generic “Senior Backend Engineer” alone
- [x] Expertise: API management is pillar **#2**; AI is **Direction**, not peer Preuve
- [x] Home teaser order: **Unified API Gateway → Ecom 360 → Disaster Lab**
- [x] No card shows unexplained `Preuve · 0`, `Preuve · 10+`, or `Preuve · Gateway`
- [x] No new invented numeric claims; gateway numeric badge still owner-gated
- [x] Honesty kind labels unchanged in meaning
- [x] Typecheck clean (`tsc --noEmit`); spot-check `/fr` and `/en` home OK
- [x] Navbar / ThemeProvider React Compiler lint errors fixed (`useSyncExternalStore` + pathname-keyed menu)

---

## 10. Owner input still required

1. **Gateway figure** (optional): verified subsidiaries / partners / other non-confidential metric for home proof — or leave qualitative `homeProof`.
2. **LinkedIn:** paste from [`linkedin-copy.md`](linkedin-copy.md) (headline = unified FR/EN claim, About, Featured → `https://saifcore.tech`) so profile ↔ `<title>` ↔ OG match.

Until then: keep accurate impact prose; do not invent a different number; leave the owner TODO visible in PR notes / `case-studies.ts` comment.

---

## 11. Suggested commit message (only when asked to commit)

```
Align home positioning around payment correctness and API management.

Elevate the gateway case study and expertise pillar, unify title/OG copy,
and replace misleading Preuve · N badges with explicit proof labels.
```
