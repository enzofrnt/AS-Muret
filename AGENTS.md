# AGENTS.md

## Cursor Cloud specific instructions

This is a **Next.js 16** static showcase website for the French cycling club "AS Muret Cycliste VTT". There is no backend, no database, and no external services.

### Running the app

- `pnpm dev` starts the dev server on `http://localhost:3000` (3 pages: `/`, `/activites`, `/rejoindre`).
- See `package.json` for all available scripts (`dev`, `build`, `start`, `lint`).

### Lint

- `pnpm lint` runs ESLint. There are **pre-existing lint errors** in `types/routes.d.ts` and `types/validator.ts` (mostly `@typescript-eslint/no-explicit-any`). These are not regressions — they exist in the upstream repo.

### Notes

- The contact form on `/rejoindre` is a **non-functional mockup** — it logs to `console.log` and shows a success message, but does not send data anywhere.
- No `.env` files or secrets are required.
- Package manager is **pnpm** (version pinned in `package.json` via `packageManager` field).
