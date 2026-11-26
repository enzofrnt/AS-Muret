
# AS-Muret

Site vitrine du club AS Muret Cycliste.

## Prérequis

- Node.js (18.18+ recommandé)
- pnpm

## Installation

pnpm install

## Développement

pnpm dev

## Build (production)

pnpm build

## Lancer en production (après build)

pnpm start

## Formulaire de contact

Configurer les variables serveur `RESEND_API_KEY`, `CONTACT_FROM_EMAIL` (adresse d'un domaine d'envoi vérifié par Resend) et `CONTACT_TO_EMAIL` (boîte du club vérifiée) dans Vercel pour chaque environnement. Ne jamais publier la clé. Le formulaire ne stocke pas les messages. L'accusé de réception est envoyé après le message au club ; un échec de l'accusé est signalé séparément pour éviter de renvoyer la demande.

Le formulaire utilise Cloudflare Turnstile : configurer `NEXT_PUBLIC_TURNSTILE_SITE_KEY`, `TURNSTILE_SECRET` et `TURNSTILE_HOSTNAMES` (liste de noms d’hôtes autorisés, séparés par des virgules) dans Vercel pour chaque environnement. La clé secrète reste côté serveur. Le contrôle Turnstile et le champ piège limitent les abus ; ils ne constituent pas une limite de débit distribuée.
