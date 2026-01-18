import { createClient } from "@libsql/client";
import { drizzle, type LibSQLDatabase } from "drizzle-orm/libsql";

import * as schema from "./schema";

let cachedDb: LibSQLDatabase<typeof schema> | null = null;

export function getDb() {
  if (cachedDb) return cachedDb;

  const tursoUrl = process.env.TURSO_DATABASE_URL;
  if (!tursoUrl) {
    throw new Error("TURSO_DATABASE_URL manquant");
  }

  const client = createClient({
    url: tursoUrl,
    authToken: process.env.TURSO_AUTH_TOKEN,
  });

  cachedDb = drizzle(client, { schema });
  return cachedDb;
}

