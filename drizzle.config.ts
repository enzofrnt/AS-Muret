import { config as loadEnv } from "dotenv";
import { defineConfig } from "drizzle-kit";

// drizzle-kit ne charge pas automatiquement `.env.local` (contrairement à Next),
// donc on charge les deux (et `.env.local` override si présent).
loadEnv({ path: ".env", override: true });
loadEnv({ path: ".env.local", override: true });

const url = process.env.TURSO_DATABASE_URL;
const hasToken = !!process.env.TURSO_AUTH_TOKEN;

// Debug safe: ne log pas le token.
console.log("[drizzle] TURSO_DATABASE_URL set =", !!url);
console.log("[drizzle] TURSO_AUTH_TOKEN set   =", hasToken);

if (!url) {
  throw new Error("TURSO_DATABASE_URL manquant (dans .env/.env.local ou env)");
}
if (!hasToken) {
  throw new Error("TURSO_AUTH_TOKEN manquant (dans .env/.env.local ou env)");
}

export default defineConfig({
  schema: "./src/db/schema.ts",
  out: "./drizzle",
  dialect: "turso",
  dbCredentials: {
    url,
    authToken: process.env.TURSO_AUTH_TOKEN!,
  },
});

