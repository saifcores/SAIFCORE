# SAIFCORE

Bilingual portfolio and lead-generation site for **SAIFCORE** — senior backend and fintech engineering (payments, APIs, distributed systems, mobile money). Built with **Next.js 16**, **React 19**, and **next-intl** (English / French).

**Live positioning:** freelance and consulting engagements for teams that need production-grade payment rails, partner integrations, and handoff-ready backends — not generic dev-shop output.

---

## Table of contents

- [Features](#features)
- [Tech stack](#tech-stack)
- [Getting started](#getting-started)
- [Scripts](#scripts)
- [Environment variables](#environment-variables)
- [Project structure](#project-structure)
- [Routing & pages](#routing--pages)
- [Internationalization](#internationalization)
- [Content & copy](#content--copy)
- [SEO & metadata](#seo--metadata)
- [Theming & UI](#theming--ui)
- [Deployment](#deployment)
- [License](#license)

---

## Features

| Area          | Details                                                                                                                                                       |
| ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Locales**   | English (default) and French; locale prefix `as-needed` (`/` vs `/fr`)                                                                                        |
| **Theme**     | Light / dark / system; persisted in `localStorage`; no flash on load                                                                                          |
| **Home**      | Long-scroll landing: hero, trust, expertise, work teaser, services, stack, certifications, principles, process, testimonials, insights, about teaser, contact |
| **Sub-pages** | About, Experience (+ skills matrix), Systems (case studies), Articles, Certifications (gated)                                                                 |
| **Articles**  | Structured content blocks (prose, code, ADR, design notes, lists); internal routes + optional external URLs                                                   |
| **Contact**   | Mailto form, Calendly “Book a call”, LinkedIn / GitHub / resume links                                                                                         |
| **Mobile**    | Responsive layouts (phone / tablet / desktop), sticky bottom CTA bar on small screens                                                                         |
| **SEO**       | Per-page metadata, hreflang, sitemap, robots, JSON-LD (Person, breadcrumbs, ProfilePage)                                                                      |
| **Analytics** | Vercel Analytics (`@vercel/analytics`)                                                                                                                        |

---

## Tech stack

| Layer     | Choice                                                          |
| --------- | --------------------------------------------------------------- |
| Framework | [Next.js 16](https://nextjs.org/) (App Router)                  |
| UI        | React 19, [Tailwind CSS v4](https://tailwindcss.com/)           |
| i18n      | [next-intl 4](https://next-intl.dev/)                           |
| Motion    | [Framer Motion](https://www.framer.com/motion/) + CSS keyframes |
| Icons     | [Lucide React](https://lucide.dev/)                             |
| Fonts     | Geist Sans / Geist Mono (next/font)                             |
| Analytics | Vercel Analytics                                                |
| Language  | TypeScript (strict)                                             |

There is **no database** and **no CMS** — copy lives in JSON message files; structured content lives in TypeScript data modules.

---

## Getting started

### Prerequisites

- [Node.js](https://nodejs.org/) LTS (Node 20+ recommended)
- npm (bundled with Node)

### Install & run

```bash
npm install
cp .env.example .env.local   # then edit values
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

- English (default): `/`, `/about`, `/articles`, …
- French: `/fr`, `/fr/about`, `/fr/articles`, …

### Production build locally

```bash
npm run build
npm run start
```

---

## Scripts

| Command              | Description                                                       |
| -------------------- | ----------------------------------------------------------------- |
| `npm run dev`        | Development server (Turbopack)                                    |
| `npm run build`      | Production build + static generation                              |
| `npm run start`      | Serve production build                                            |
| `npm run lint`       | ESLint (Next.js config)                                           |
| `npm run sync:icons` | Copy `public/profile.png` → `src/app/icon.png` & `apple-icon.png` |

---

## Environment variables

Copy `.env.example` to `.env.local`. All public vars use the `NEXT_PUBLIC_` prefix.

| Variable                           | Required         | Purpose                                                          |
| ---------------------------------- | ---------------- | ---------------------------------------------------------------- |
| `NEXT_PUBLIC_SITE_URL`             | Recommended      | Canonical origin (no trailing slash). Metadata, sitemap, JSON-LD |
| `NEXT_PUBLIC_CONTACT_EMAIL`        | For contact form | Enables mailto submit in CTA section                             |
| `NEXT_PUBLIC_CALENDLY_URL`         | Optional         | “Book a call” links (must be `https://calendly.com/...`)         |
| `NEXT_PUBLIC_LINKEDIN_URL`         | Optional         | Footer + `sameAs` in Person schema                               |
| `NEXT_PUBLIC_GITHUB_URL`           | Optional         | Footer + `sameAs` in Person schema                               |
| `NEXT_PUBLIC_RESUME_URL`           | Optional         | External CV URL; else `public/resume.pdf` if present             |
| `NEXT_PUBLIC_PROFILE_NAME`         | Optional         | Display name (default: `SAIFCORE`)                               |
| `NEXT_PUBLIC_PROFILE_CITY`         | Optional         | Schema location (default: `Dakar`)                               |
| `NEXT_PUBLIC_PROFILE_COUNTRY`      | Optional         | Schema location (default: `Senegal`)                             |
| `NEXT_PUBLIC_PROFILE_COUNTRY_CODE` | Optional         | ISO country code (default: `SN`)                                 |

Helpers live in [`src/site.ts`](src/site.ts) (client-safe) and [`src/server/resume.ts`](src/server/resume.ts) (server-only, uses `fs`).

---

## Project structure

```
manarix/
├── messages/
│   ├── en.json              # English UI copy (source of truth for types)
│   └── fr.json              # French UI copy (same keys as en.json)
├── public/
│   ├── profile.png          # Avatar / favicon source
│   ├── resume.pdf           # Optional local CV
│   └── trust/               # Company logos for experience / trust sections
├── src/
│   ├── app/
│   │   ├── layout.tsx       # Root shell (pass-through)
│   │   ├── globals.css      # Design tokens, Tailwind, shared utilities
│   │   ├── sitemap.ts       # Locale-aware sitemap
│   │   ├── robots.ts
│   │   ├── manifest.ts
│   │   └── [locale]/        # All user-facing routes
│   ├── components/portfolio/  # Section components (Hero, Navbar, …)
│   ├── data/
│   │   ├── articles.ts      # Insights articles + slugs
│   │   ├── article-content.ts
│   │   ├── certifications.ts
│   │   └── trust-brands.ts
│   ├── hooks/
│   ├── i18n/                # next-intl routing, navigation, request config
│   ├── server/resume.ts     # Server-only resume URL resolution
│   ├── site.ts              # Public env helpers
│   ├── seo.ts               # buildPageMetadata, breadcrumbs JSON-LD
│   ├── types/messages.ts    # Types derived from en.json
│   └── proxy.ts             # next-intl middleware (matcher for all routes)
├── next.config.ts
├── postcss.config.mjs
└── tsconfig.json              # Path alias: @/* → src/*
```

---

## Routing & pages

Middleware: [`src/proxy.ts`](src/proxy.ts) (next-intl). Matcher excludes static files, `_next`, and API routes.

| Route              | File                                | Description                          |
| ------------------ | ----------------------------------- | ------------------------------------ |
| `/`                | `[locale]/page.tsx`                 | Home (long-scroll landing)           |
| `/about`           | `[locale]/about/page.tsx`           | Extended about + engagements         |
| `/experience`      | `[locale]/experience/page.tsx`      | Timeline + skills matrix             |
| `/systems`         | `[locale]/systems/page.tsx`         | Full case studies                    |
| `/articles`        | `[locale]/articles/page.tsx`        | Insights index                       |
| `/articles/[slug]` | `[locale]/articles/[slug]/page.tsx` | Article detail                       |
| `/certifications`  | `[locale]/certifications/page.tsx`  | Credentials (404 if none `obtained`) |

Home sections use in-page anchors: `#work`, `#services`, `#expertise`, `#certifications`, `#process`, `#contact`, `#insights`, `#about`.

**Certifications gating:** [`hasObtainedCertifications()`](src/data/certifications.ts) hides nav links, sitemap entries, and the `/certifications` page until at least one credential has `status: "obtained"` in `certificationsMeta`.

---

## Internationalization

- **Config:** [`src/i18n/routing.ts`](src/i18n/routing.ts) — locales `en` | `fr`, default `en`, prefix `as-needed`
- **Messages:** [`messages/en.json`](messages/en.json), [`messages/fr.json`](messages/fr.json)
- **Types:** [`src/types/messages.ts`](src/types/messages.ts) — `AppMessages` inferred from `en.json`; `fr.json` must stay structurally identical
- **Navigation:** [`src/i18n/navigation.ts`](src/i18n/navigation.ts) — locale-aware `Link`, `redirect`, `usePathname`
- **Server:** `setRequestLocale(locale)` on each page; `getTranslations` / `getMessages` for copy

To add a string: edit both JSON files under the same key path, then use `getTranslations("namespace")` or pass message slices into components.

---

## Content & copy

### UI strings → `messages/*.json`

Namespaces include: `meta`, `nav`, `hero`, `trustedExpertise`, `services`, `techStack`, `featuredProjects`, `experience`, `about`, `certifications`, `articlesPage`, `cta`, `footer`, and page-specific keys (`aboutPage`, `experiencePage`, …).

**Trusted expertise cards** (`trustedExpertise.items`): six capability pillars shown on the home page — each item has `title`, `description`, `technologies[]`, and `concepts[]`. Rendered by [`TrustedExpertise.tsx`](src/components/portfolio/TrustedExpertise.tsx).

### Articles → `src/data/articles.ts`

Each article has:

- `slug`, `publishedAt`, `kind` (`writing` | `code` | `design` | `adr` | `document`)
- `title` / `excerpt` (en + fr)
- `blocks[]` (preferred) or legacy `body[]`
- Optional `externalUrl` for off-site pieces

Block types are defined in [`src/data/article-content.ts`](src/data/article-content.ts). Rendering: [`ArticleBody.tsx`](src/components/portfolio/ArticleBody.tsx).

### Certifications → `src/data/certifications.ts` + `messages/*.json`

- **Meta** (status, verify URL, icon kind): `certificationsMeta` in `certifications.ts`
- **Copy** (name, issuer, description): `certifications.items.<id>` in JSON

Statuses: `obtained` | `inProgress` | `notStarted`.

### Featured projects / experience

- Project narratives: `featuredProjects.items` in JSON (used on home teaser and `/systems`)
- Experience roles: `experience.items` in JSON (timeline on home section and `/experience`)

### Trust logos

- Brand list: [`src/data/trust-brands.ts`](src/data/trust-brands.ts)
- Logo files: `public/trust/<filename>` (referenced from experience entries)

---

## SEO & metadata

| Mechanism                  | Location                                                                    |
| -------------------------- | --------------------------------------------------------------------------- |
| Page titles & descriptions | `buildPageMetadata()` in [`src/seo.ts`](src/seo.ts)                         |
| Home / layout defaults     | `[locale]/layout.tsx` → `generateMetadata`                                  |
| Sitemap                    | [`src/app/sitemap.ts`](src/app/sitemap.ts) — hreflang alternates per URL    |
| Robots                     | [`src/app/robots.ts`](src/app/robots.ts)                                    |
| Open Graph / Twitter       | Shared image routes under `app/` and `[locale]/`                            |
| JSON-LD                    | Inline `<script type="application/ld+json">` on home, about, certifications |

Set `NEXT_PUBLIC_SITE_URL` in production so canonical URLs and schema are correct.

---

## Theming & UI

- **Design system:** CSS variables in [`src/app/globals.css`](src/app/globals.css) — `data-theme="light"` | `"dark"`
- **Provider:** [`ThemeProvider.tsx`](src/components/portfolio/ThemeProvider.tsx) — syncs preference with `localStorage` and `prefers-color-scheme`
- **Toggle:** [`ThemeToggle.tsx`](src/components/portfolio/ThemeToggle.tsx) in navbar
- **Primitives:** `.btn-primary`, `.btn-outline`, `.surface-panel`, `.input-field`, `.bg-grid`, etc.
- **Motion:** Framer Motion in interactive sections; `prefers-reduced-motion` respected in CSS and hooks
- **Layout width:** `max-w-[1280px]` content rail; articles capped at `720px`
- **Responsive breakpoints:** Tailwind defaults — `sm` 640px, `md` 768px, `lg` 1024px, `xl` 1280px

---

## Deployment

Optimized for [Vercel](https://vercel.com/) (zero config for Next.js). Any Node host running `next build` + `next start` works.

**Production checklist:**

1. Set `NEXT_PUBLIC_SITE_URL` to your domain
2. Set contact, Calendly, and social URLs as needed
3. Add `public/resume.pdf` or `NEXT_PUBLIC_RESUME_URL`
4. Run `npm run build` in CI before deploy
5. Update certification statuses when credentials are obtained (unlocks `/certifications`)

---

## License

Private project (`"private": true` in `package.json`).
