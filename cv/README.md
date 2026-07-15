# CV sources (LaTeX → PDF)

Bilingual CVs for the portfolio download buttons (Hero, Contact, Footer).

| Source      | Output served to visitors |
| ----------- | ------------------------- |
| `cv-en.tex` | `../public/resume-en.pdf` |
| `cv-fr.tex` | `../public/resume-fr.pdf` |

Locale resolution lives in [`src/server/resume.ts`](../src/server/resume.ts).

## Rebuild

Requires [tectonic](https://tectonic-typesetting.github.io/) (or another LaTeX engine):

```bash
brew install tectonic   # once

cd cv
tectonic cv-en.tex -o .
tectonic cv-fr.tex -o .
cp -f cv-en.pdf ../public/resume-en.pdf
cp -f cv-fr.pdf ../public/resume-fr.pdf
```

Do not commit intermediate `.aux` / `.log` / `.out` files; only keep the
`.tex` sources and the PDFs under `public/` (and optionally the `cv/*.pdf`
copies for local preview).

## Content guidelines

- Align experience, education, and projects with `messages/en.json` and
  `messages/fr.json`.
- Contact: `NEXT_PUBLIC_CONTACT_EMAIL`, phone, LinkedIn, and
  `https://saifcore.tech`.
- Target **1–2 A4 pages**; avoid duplicating skills tables.
