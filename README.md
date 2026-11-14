# SAIFCORE

Bilingual portfolio and lead-generation site for **SAIFCORE** — payment correctness, APIs, and West Africa rails (Wave, Orange Money, Free Money, multi-entity banking APIs). Built with **Next.js 16**, **React 19**, and **next-intl** (English / French).

**Positioning:** Senior backend / payments / tech-lead seats and freelance briefs where money flows must stay correct under failure — not generic Java CV output.

**Copy guardrails:** [`saifcore-alignment-prompt.md`](saifcore-alignment-prompt.md) · LinkedIn paste kit: [`linkedin-copy.md`](linkedin-copy.md) (owner only).

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

| Area          | Details                                                                                       |
| ------------- | --------------------------------------------------------------------------------------------- |
| **Locales**   | English (default) and French; locale prefix `as-needed` (`/` vs `/fr`)                        |
| **Theme**     | Light / dark / system; persisted in `localStorage`; no flash on load                          |
| **Home**      | Hero → expertise teaser → audience paths (recruiter / depth / client) → offers → contact      |
| **Sub-pages** | About, Experience, Expertise, Systems (+ case studies), Lab, Contact, Certifications, License |
| **Writing**   | Full articles on [SAIFCORE Blog](https://blog.saifcore.tech); `/articles` redirects there     |
| **Contact**   | Intent-aware form via Resend (lead + auto-reply); honeypot + light rate limit                 |
| **Mobile**    | Responsive layouts; sticky bottom CTA bar on small screens                                    |
| **SEO**       | Per-page metadata, hreflang, sitemap, robots, JSON-LD                                         |
| **Analytics** | Vercel Analytics (`@vercel/analytics`)                                                        |

No database and no CMS — UI copy lives in `messages/*.json`; structured content in TypeScript modules under `src/data/`.

---

## Tech stack

| Layer     | Choice                                                              |
| --------- | ------------------------------------------------------------------- |
| Framework | [Next.js 16](https://nextjs.org/) (App Router)                      |
| UI        | React 19, [Tailwind CSS v4](https://tailwindcss.com/)               |
| i18n      | [next-intl 4](https://next-intl.dev/)                               |
| Motion    | [Framer Motion](https://www.framer.com/motion/) + CSS keyframes     |
| Email     | [Resend](https://resend.com/) + [React Email](https://react.email/) |
| Icons     | [Lucide React](https://lucide.dev/)                                 |
| Fonts     | Geist Sans / Geist Mono (`next/font`)                               |
| Analytics | Vercel Analytics                                                    |
| Language  | TypeScript (strict)                                                 |

---

## Getting started

### Prerequisites

- [Node.js](https://nodejs.org/) LTS (20+ recommended)
- npm

### Install & run

```bash
npm install
cp .env.example .env.local   # then edit values
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

| Locale            | Examples                                         |
| ----------------- | ------------------------------------------------ |
| English (default) | `/`, `/about`, `/systems`, `/contact`            |
| French            | `/fr`, `/fr/about`, `/fr/systems`, `/fr/contact` |

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
| `npm run build`      | Production build                                                  |
| `npm run start`      | Serve production build                                            |
| `npm run lint`       | ESLint (Next.js config)                                           |
| `npm run sync:icons` | Copy `public/profile.png` → app icons                             |
| `npm run cv:build`   | Compile `cv/*.tex` → `public/resume-{en,fr}.pdf` (needs tectonic) |
| `npm run cv:watch`   | Rebuild CV PDFs on `cv/*.tex` changes                             |

---

## Environment variables

Copy [`.env.example`](.env.example) to `.env.local`.

| Variable                    | Required            | Purpose                                         |
| --------------------------- | ------------------- | ----------------------------------------------- |
| `NEXT_PUBLIC_SITE_URL`      | Recommended         | Canonical origin (no trailing slash)            |
| `NEXT_PUBLIC_CONTACT_EMAIL` | For contact         | Form recipient + mailto CTAs                    |
| `NEXT_PUBLIC_LINKEDIN_URL`  | Optional            | Footer + Person `sameAs`                        |
| `NEXT_PUBLIC_GITHUB_URL`    | Optional            | Footer + Person `sameAs`                        |
| `NEXT_PUBLIC_X_URL`         | Optional            | Footer / social                                 |
| `NEXT_PUBLIC_RESUME_URL`    | Optional            | External CV override                            |
| `NEXT_PUBLIC_PROFILE_*`     | Optional            | Name / city / country for schema                |
| `NEXT_PUBLIC_BLOG_URL`      | For writing teasers | Blog origin (e.g. `https://blog.saifcore.tech`) |
| `RESEND_API_KEY`            | For form            | Server-only Resend key                          |
| `RESEND_FROM_EMAIL`         | For form            | Verified sender (`Name <email@domain>`)         |

Helpers: [`src/site.ts`](src/site.ts) (client-safe env) and [`src/server/resume.ts`](src/server/resume.ts) / [`src/server/contact-mail.ts`](src/server/contact-mail.ts).

---

## Project structure

```
manarix/
├── messages/                 # en.json + fr.json (UI copy)
├── cv/                       # LaTeX CV sources
├── public/                   # profile, resumes, trust logos
├── linkedin-copy.md          # Owner LinkedIn paste kit
├── saifcore-alignment-prompt.md
└── src/
    ├── app/
    │   ├── api/contact/      # Resend lead + auto-reply
    │   ├── [locale]/         # All user-facing routes
    │   ├── sitemap.ts
    │   └── robots.ts
    ├── blog/                 # Recent articles from blog API
    ├── components/portfolio/
    ├── data/                 # case studies, certifications, …
    ├── emails/               # React Email templates
    ├── i18n/
    ├── server/               # contact + resume helpers
    ├── seo.ts
    ├── site.ts
    └── proxy.ts              # next-intl middleware
```

---

## Routing & pages

Middleware: [`src/proxy.ts`](src/proxy.ts) (next-intl).

| Route                           | Description                                                  |
| ------------------------------- | ------------------------------------------------------------ |
| `/`                             | Home (paths → offers → contact)                              |
| `/about`                        | Identity + stack; experience timeline links to `/experience` |
| `/experience`                   | Full timeline, education, skills                             |
| `/expertise`                    | Capability pillars                                           |
| `/systems`                      | Case-study index                                             |
| `/systems/[slug]`               | Case-study detail                                            |
| `/lab`                          | Open labs / experiments                                      |
| `/contact`                      | Intent-aware contact form + FAQ                              |
| `/certifications`               | Credentials (gated until obtained)                           |
| `/license`                      | MIT license (EN / FR)                                        |
| `/articles`, `/articles/[slug]` | Permanent redirect → SAIFCORE Blog                           |
| `/collaborate`                  | Permanent redirect → home (legacy)                           |

**Home anchors:** `#paths`, `#offers`, `#experience`, `#work`, `#lab`, `#contact`.

---

## Internationalization

- **Config:** [`src/i18n/routing.ts`](src/i18n/routing.ts) — `en` \| `fr`, default `en`, prefix `as-needed`
- **Messages:** [`messages/en.json`](messages/en.json), [`messages/fr.json`](messages/fr.json) — same keys
- **Types:** [`src/types/messages.ts`](src/types/messages.ts) — `AppMessages` from `en.json`
- **Navigation:** [`src/i18n/navigation.ts`](src/i18n/navigation.ts)

**Add a string:** update both JSON files, then `getTranslations("namespace")`.

---

## Content & copy

### Positioning

Do **not** invent metrics or lead H1 / `<title>` / OG as generic “Senior Backend Engineer”. Prefer payment-correctness claims. See [`saifcore-alignment-prompt.md`](saifcore-alignment-prompt.md).

### LinkedIn (owner paste)

[`linkedin-copy.md`](linkedin-copy.md) — headline, About, experience bullets, posts, reply templates. Agents do not edit LinkedIn.

### Case studies

[`src/data/case-studies.ts`](src/data/case-studies.ts) — `HOME_TEASER_IDS` order + honesty kinds. Copy in `featuredProjects` / case-study namespaces.

### Certifications

[`src/data/certifications.ts`](src/data/certifications.ts) + `certifications.items.*` in messages. Status: `obtained` \| `inProgress` \| `notStarted`.

### Blog

Set `NEXT_PUBLIC_BLOG_URL`. Home lab/writing teasers fetch `GET {blog}/api/articles?locale=&limit=`.

---

## SEO & metadata

| Mechanism                  | Location                                       |
| -------------------------- | ---------------------------------------------- |
| Page titles & descriptions | [`buildPageMetadata()`](src/seo.ts)            |
| Layout defaults            | `[locale]/layout.tsx`                          |
| Sitemap                    | [`src/app/sitemap.ts`](src/app/sitemap.ts)     |
| Robots                     | [`src/app/robots.ts`](src/app/robots.ts)       |
| Open Graph / Twitter       | Image routes under `app/` and `[locale]/`      |
| JSON-LD                    | Inline scripts on home, about, and other pages |

Set `NEXT_PUBLIC_SITE_URL` in production.

---

## Theming & UI

- **Tokens:** [`src/app/globals.css`](src/app/globals.css) — `data-theme="light"` \| `"dark"`
- **Provider:** [`ThemeProvider.tsx`](src/components/portfolio/ThemeProvider.tsx)
- **Primitives:** `.btn-primary`, `.btn-outline`, `.surface-panel`, `.input-field`, …
- **Motion:** Framer Motion where needed; `prefers-reduced-motion` honored

---

## Deployment

Optimized for [Vercel](https://vercel.com/).

1. Set `NEXT_PUBLIC_SITE_URL` to the production domain
2. Set contact email, Resend keys, blog URL, and optional social URLs
3. Add `public/resume-en.pdf` + `public/resume-fr.pdf` (see [`cv/README.md`](cv/README.md)) or `NEXT_PUBLIC_RESUME_URL`
4. Run `npm run build` in CI before deploy
5. Mark certifications as `obtained` when ready
6. Run `npm run sync:icons` after updating `public/profile.png`
7. Owner: paste LinkedIn from [`linkedin-copy.md`](linkedin-copy.md)

---

## License

- **Source code:** [MIT](LICENSE) — public [`/license`](src/app/[locale]/license/page.tsx) page.
- **Site content:** Written copy, case studies, and branding remain © SAIFCORE unless stated otherwise.
