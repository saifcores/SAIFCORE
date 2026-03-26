# SAIFCORE

Site vitrine (portfolio) — Next.js, bilingue **anglais / français**, thème clair / sombre.

## Prérequis

- [Node.js](https://nodejs.org/) (LTS recommandé)
- npm (fourni avec Node)

## Démarrage

```bash
npm install
npm run dev
```

Ouvrir [http://localhost:3000](http://localhost:3000). Les routes localisées sont `/` (locale par défaut) et `/fr`.

## Scripts

| Commande       | Description              |
|----------------|--------------------------|
| `npm run dev`  | Serveur de développement |
| `npm run build`| Build de production      |
| `npm run start`| Lancer le build en local |
| `npm run lint` | ESLint                   |

## Variables d’environnement

Copier `.env.example` vers `.env.local` et ajuster :

- **`NEXT_PUBLIC_SITE_URL`** — URL canonique (metadata, sitemap, JSON-LD). Sans slash final.
- **`NEXT_PUBLIC_CALENDLY_URL`** — Lien Calendly pour « Book a call » (optionnel).
- **`NEXT_PUBLIC_LINKEDIN_URL`** / **`NEXT_PUBLIC_GITHUB_URL`** — Liens profil pour le pied de page et le schéma Person (optionnel).

## Structure utile

- `src/app/[locale]/` — Pages App Router (accueil, articles)
- `src/components/portfolio/` — Composants UI du portfolio
- `messages/en.json`, `messages/fr.json` — Chaînes i18n
- `src/data/articles.ts` — Contenu des articles Insights

## Déploiement

Compatible [Vercel](https://vercel.com/docs) ou tout hébergeur Node exécutant `next build` / `next start`. Définir les variables d’environnement côté hébergement pour la production.

## Licence

Projet privé (`private` dans `package.json`).
