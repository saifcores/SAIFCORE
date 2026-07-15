# CV sources (LaTeX → PDF)

Bilingual CVs for the portfolio download buttons (Hero, Contact, Footer).

| Source      | Output served to visitors |
| ----------- | ------------------------- |
| `cv-en.tex` | `../public/resume-en.pdf` |
| `cv-fr.tex` | `../public/resume-fr.pdf` |

Locale resolution lives in [`src/server/resume.ts`](../src/server/resume.ts).

## Rebuild

Requires [tectonic](https://tectonic-typesetting.github.io/):

```bash
brew install tectonic   # once
```

**One-shot** (compile both locales and copy into `public/`):

```bash
npm run cv:build
```

**Watch** (rebuild automatically when any `cv/*.tex` file changes):

```bash
npm run cv:watch
```

Commit the updated `public/resume-*.pdf` after a rebuild so Vercel serves them.
Do not compile LaTeX on Vercel — ship the PDFs in git.

Do not commit intermediate `.aux` / `.log` / `.out` files.

## Content guidelines

- Align experience, education, and projects with `messages/en.json` and
  `messages/fr.json`.
- Contact: `NEXT_PUBLIC_CONTACT_EMAIL`, phone, LinkedIn, and
  `https://saifcore.tech`.
- Target **1–2 A4 pages**; avoid duplicating skills tables.
