# SAIFCORE

Bilingual portfolio and lead-generation site for **SAIFCORE** — senior backend and fintech engineering (payments, APIs, distributed systems, mobile money). Built with **Next.js 16**, **React 19**, and **next-intl** (English / French).

**Positioning:** Freelance and consulting for teams that need production-grade payment rails, partner integrations, and handoff-ready backends — not generic dev-shop output.

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
| **Sub-pages** | About, Experience (+ skills matrix), Systems (case studies), Articles, License, Certifications (gated)                                                        |
| **Articles**  | Structured content blocks (prose, code, ADR, design notes, lists); internal routes + optional external URLs                                                   |
| **Contact**   | Mailto form, Calendly “Book a call”, LinkedIn / GitHub / resume links                                                                                         |
| **Mobile**    | Responsive layouts; sticky bottom CTA bar on small screens                                                                                                    |
| **SEO**       | Per-page metadata, hreflang, sitemap, robots, JSON-LD (Person, breadcrumbs, ProfilePage)                                                                      |
| **Analytics** | Vercel Analytics (`@vercel/analytics`)                                                                                                                        |

There is **no database** and **no CMS** — UI copy lives in JSON message files; structured content lives in TypeScript data modules.

---

## Tech stack

| Layer     | Choice                                                          |
| --------- | --------------------------------------------------------------- |
| Framework | [Next.js 16](https://nextjs.org/) (App Router)                  |
| UI        | React 19, [Tailwind CSS v4](https://tailwindcss.com/)           |
| i18n      | [next-intl 4](https://next-intl.dev/)                           |
| Motion    | [Framer Motion](https://www.framer.com/motion/) + CSS keyframes |
| Icons     | [Lucide React](https://lucide.dev/)                             |
| Fonts     | Geist Sans / Geist Mono (`next/font`)                           |
| Analytics | Vercel Analytics                                                |
| Language  | TypeScript (strict)                                             |

---

## Getting started

### Prerequisites

- [Node.js](https://nodejs.org/) LTS (20+ recommended)
- npm (bundled with Node)

### Install & run

```bash
npm install
cp .env.example .env.local   # then edit values
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

| Locale            | Examples                                          |
| ----------------- | ------------------------------------------------- |
| English (default) | `/`, `/about`, `/articles`, `/license`            |
| French            | `/fr`, `/fr/about`, `/fr/articles`, `/fr/license` |

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

Copy [`.env.example`](.env.example) to `.env.local`. All public vars use the `NEXT_PUBLIC_` prefix.

| Variable                           | Required        | Purpose                                                          |
| ---------------------------------- | --------------- | ---------------------------------------------------------------- |
| `NEXT_PUBLIC_SITE_URL`             | Recommended     | Canonical origin (no trailing slash). Metadata, sitemap, JSON-LD |
| `NEXT_PUBLIC_CONTACT_EMAIL`        | For contact CTA | Enables mailto submit in contact section                         |
| `NEXT_PUBLIC_CALENDLY_URL`         | Optional        | “Book a call” links (`https://calendly.com/...` only)            |
| `NEXT_PUBLIC_LINKEDIN_URL`         | Optional        | Footer + Person schema `sameAs`                                  |
| `NEXT_PUBLIC_GITHUB_URL`           | Optional        | Footer + Person schema `sameAs`                                  |
| `NEXT_PUBLIC_RESUME_URL`           | Optional        | External CV; else `public/resume.pdf` if present                 |
| `NEXT_PUBLIC_PROFILE_NAME`         | Optional        | Display name (default: `SAIFCORE`)                               |
| `NEXT_PUBLIC_PROFILE_CITY`         | Optional        | Schema location (default: `Dakar`)                               |
| `NEXT_PUBLIC_PROFILE_COUNTRY`      | Optional        | Schema location (default: `Senegal`)                             |
| `NEXT_PUBLIC_PROFILE_COUNTRY_CODE` | Optional        | ISO country code (default: `SN`)                                 |

Helpers: [`src/site.ts`](src/site.ts) (client-safe env) and [`src/server/resume.ts`](src/server/resume.ts) (server-only resume resolution via `fs`).

---

## Project structure

```
manarix/
├── LICENSE                  # MIT (source code)
├── messages/
│   ├── en.json              # English UI (source of truth for types)
│   └── fr.json              # French UI (same keys as en.json)
├── public/
│   ├── profile.png          # Avatar / favicon source
│   ├── resume.pdf           # Optional local CV
│   └── trust/               # Company logos (experience / trust)
├── src/
│   ├── app/
│   │   ├── globals.css      # Design tokens, Tailwind, utilities
│   │   ├── layout.tsx       # Root shell
│   │   ├── sitemap.ts       # Locale-aware sitemap
│   │   ├── robots.ts
│   │   ├── manifest.ts
│   │   └── [locale]/        # All user-facing routes
│   ├── components/portfolio/
│   ├── data/
│   │   ├── articles.ts
│   │   ├── article-content.ts
│   │   ├── certifications.ts
│   │   └── trust-brands.ts
│   ├── hooks/
│   ├── i18n/                # Routing, navigation, request config
│   ├── server/resume.ts
│   ├── site.ts
│   ├── seo.ts
│   ├── types/messages.ts    # AppMessages from en.json
│   └── proxy.ts             # next-intl middleware
├── next.config.ts
├── postcss.config.mjs
└── tsconfig.json            # @/* → src/*
```

---

## Routing & pages

Middleware: [`src/proxy.ts`](src/proxy.ts) (next-intl). Matcher skips static assets, `_next`, and API routes.

| Route              | File                                | Description                          |
| ------------------ | ----------------------------------- | ------------------------------------ |
| `/`                | `[locale]/page.tsx`                 | Home (long-scroll landing)           |
| `/about`           | `[locale]/about/page.tsx`           | Extended about + engagements         |
| `/experience`      | `[locale]/experience/page.tsx`      | Timeline + skills matrix             |
| `/systems`         | `[locale]/systems/page.tsx`         | Full case studies                    |
| `/articles`        | `[locale]/articles/page.tsx`        | Insights index                       |
| `/articles/[slug]` | `[locale]/articles/[slug]/page.tsx` | Article detail                       |
| `/license`         | `[locale]/license/page.tsx`         | MIT license (EN / FR)                |
| `/certifications`  | `[locale]/certifications/page.tsx`  | Credentials (404 if none `obtained`) |

**Home anchors:** `#work`, `#services`, `#expertise`, `#certifications`, `#process`, `#contact`, `#insights`, `#about`.

**Certifications gating:** [`hasObtainedCertifications()`](src/data/certifications.ts) hides nav links, sitemap entries, and `/certifications` until at least one entry in `certificationsMeta` has `status: "obtained"`.

---

## Internationalization

- **Config:** [`src/i18n/routing.ts`](src/i18n/routing.ts) — `en` \| `fr`, default `en`, prefix `as-needed`
- **Messages:** [`messages/en.json`](messages/en.json), [`messages/fr.json`](messages/fr.json)
- **Types:** [`src/types/messages.ts`](src/types/messages.ts) — `AppMessages` from `en.json`; `fr.json` must keep the same keys
- **Navigation:** [`src/i18n/navigation.ts`](src/i18n/navigation.ts) — locale-aware `Link`, `redirect`, `usePathname`
- **Server:** `setRequestLocale(locale)` on each page; `getTranslations` / `getMessages` for copy

**Add a string:** update both JSON files under the same key path, then `getTranslations("namespace")` or pass slices into components.

---

## Content & copy

### UI strings → `messages/*.json`

Namespaces include `meta`, `nav`, `hero`, `trustedExpertise`, `services`, `techStack`, `featuredProjects`, `experience`, `about`, `certifications`, `articlesPage`, `cta`, `footer`, plus page namespaces (`aboutPage`, `experiencePage`, `licensePage`, …).

**Trusted expertise** (`trustedExpertise.items`): six capability cards on the home page — `title`, `description`, `technologies[]`, `concepts[]`. Component: [`TrustedExpertise.tsx`](src/components/portfolio/TrustedExpertise.tsx).

### Articles → `src/data/articles.ts`

| Field                 | Notes                                                                   |
| --------------------- | ----------------------------------------------------------------------- |
| `slug`, `publishedAt` | Routing and sitemap dates                                               |
| `kind`                | `writing` \| `code` \| `design` \| `adr` \| `document`                  |
| `title`, `excerpt`    | EN + FR                                                                 |
| `blocks[]`            | Preferred; types in [`article-content.ts`](src/data/article-content.ts) |
| `body[]`              | Legacy fallback                                                         |
| `externalUrl`         | Optional off-site link                                                  |

Rendering: [`ArticleBody.tsx`](src/components/portfolio/ArticleBody.tsx).

### Certifications → `src/data/certifications.ts` + `messages/*.json`

- **Meta** (status, verify URL, icon): `certificationsMeta` in TypeScript
- **Copy** (name, issuer, description): `certifications.items.<id>` in JSON
- **Status:** `obtained` \| `inProgress` \| `notStarted`

### Featured projects / experience

- **Projects:** `featuredProjects.items` in JSON — home teaser and `/systems`
- **Roles:** `experience.items` in JSON — home section and `/experience`

### Trust logos

- **Registry:** [`src/data/trust-brands.ts`](src/data/trust-brands.ts)
- **Assets:** `public/trust/<filename>` (referenced from experience entries)

---

## SEO & metadata

| Mechanism                  | Location                                                         |
| -------------------------- | ---------------------------------------------------------------- |
| Page titles & descriptions | [`buildPageMetadata()`](src/seo.ts) in `src/seo.ts`              |
| Layout defaults            | `[locale]/layout.tsx` → `generateMetadata`                       |
| Sitemap                    | [`src/app/sitemap.ts`](src/app/sitemap.ts) — hreflang alternates |
| Robots                     | [`src/app/robots.ts`](src/app/robots.ts)                         |
| Open Graph / Twitter       | Image routes under `app/` and `[locale]/`                        |
| JSON-LD                    | Inline scripts on home, about, certifications, and other pages   |

Set `NEXT_PUBLIC_SITE_URL` in production so canonical URLs and schema resolve correctly.

---

## Theming & UI

- **Tokens:** CSS variables in [`src/app/globals.css`](src/app/globals.css) — `data-theme="light"` \| `"dark"`
- **Provider:** [`ThemeProvider.tsx`](src/components/portfolio/ThemeProvider.tsx) — `localStorage` + `prefers-color-scheme`
- **Toggle:** [`ThemeToggle.tsx`](src/components/portfolio/ThemeToggle.tsx) in the navbar
- **Primitives:** `.btn-primary`, `.btn-outline`, `.surface-panel`, `.input-field`, `.bg-grid`, …
- **Motion:** Framer Motion where needed; `prefers-reduced-motion` honored in CSS and hooks
- **Layout:** `max-w-[1280px]` content rail; articles capped at `720px`

---

## Deployment

Optimized for [Vercel](https://vercel.com/). Any Node host that runs `next build` + `next start` works.

**Production checklist**

1. Set `NEXT_PUBLIC_SITE_URL` to your production domain
2. Set `NEXT_PUBLIC_CONTACT_EMAIL` and optional Calendly / social URLs
3. Add `public/resume.pdf` or `NEXT_PUBLIC_RESUME_URL`
4. Run `npm run build` in CI before deploy
5. Mark certifications as `obtained` when ready (unlocks `/certifications`)
6. Run `npm run sync:icons` after updating `public/profile.png`

---

## License

- **Source code:** [MIT](LICENSE) — see [`LICENSE`](LICENSE) and the public [`/license`](src/app/[locale]/license/page.tsx) page (linked from the footer).
- **Site content:** Written copy, case studies, and branding remain © SAIFCORE unless stated otherwise.
