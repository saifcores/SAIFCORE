# CV sources (LaTeX → PDF)

Bilingual CVs for the portfolio download buttons (Hero, Contact, Footer).

| Source      | Output served to visitors |
| ----------- | ------------------------- |
| `cv-en.tex` | `../public/resume-en.pdf` |
| `cv-fr.tex` | `../public/resume-fr.pdf` |

Locale resolution lives in [`src/server/resume.ts`](../src/server/resume.ts).

## Positioning

- **Headline:** Backend Software Engineer | Enterprise Platforms · Payments · Banking
- **Tone:** senior through scope and impact (not a fake “Senior” title)
- **Audience:** ATS parsers, recruiters, founders/CTOs seeking payment & banking backend partners
- **Collaboration signal:** freelance delivery, contract engineering, technical & architecture review (aligned with portfolio engagements)

## Content guidelines (ATS + marketable)

- Single-column layout, standard section titles, plain-text skills/keywords
- Bullets: ownership verb + context + measurable outcome when known from the portfolio
- Keep metrics honest (11+ BoA subsidiaries via Synapse, Wave / Orange Money). No unsourced round percentages.
- Projects: Payment SDK, Unified API Gateway, Ecom 360 PME
- No decorative icons, multi-column layouts, or invented metrics
- Target **1–2 A4 pages**

## Rebuild

Requires [tectonic](https://tectonic-typesetting.github.io/):

```bash
brew install tectonic   # once
npm run cv:build        # one-shot → public/resume-*.pdf
npm run cv:watch        # rebuild when any cv/*.tex changes
```

Commit updated `public/resume-*.pdf` after a rebuild so Vercel serves them.
Do not compile LaTeX on Vercel.

Do not commit intermediate `.aux` / `.log` / `.out` files.
