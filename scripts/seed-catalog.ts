// Local runner for the shared catalog seed (lib/catalog/seed.ts).
//
// NOTE: the self-hosted PostgreSQL integration's env vars on Vercel are SENSITIVE — `vercel env
// pull` writes them as empty strings, so this local runner only works with an
// explicitly provided DATABASE_URL (e.g. copied from the self-hosted PostgreSQL console). For
// production the practical path is POST /api/admin/seed (admin login required),
// which runs the same seed on Vercel where the env vars exist.
//
// Run:  DATABASE_URL=postgres://… npx tsx scripts/seed-catalog.ts

import { readFileSync } from "node:fs";
import { join } from "node:path";
import postgres from "postgres";
import { runCatalogSeed } from "../lib/catalog/seed";

function loadDatabaseUrl(): string {
  if (process.env.DATABASE_URL) return process.env.DATABASE_URL;
  for (const file of [".env.production.local", ".env.local"]) {
    try {
      const env = readFileSync(join(process.cwd(), file), "utf8");
      const m = env.match(/^DATABASE_URL="?([^"\n]+)"?$/m);
      if (m && m[1]) return m[1];
    } catch {
      /* try next */
    }
  }
  throw new Error(
    "DATABASE_URL not set. Vercel marks the self-hosted PostgreSQL vars sensitive (pull returns them empty) — " +
      "either export DATABASE_URL from the self-hosted PostgreSQL console, or use POST /api/admin/seed in production.",
  );
}

async function main() {
  const result = await runCatalogSeed(postgres(loadDatabaseUrl()));
  console.log(
    `seed complete: ${result.categories} categories, formulation id ${result.formulationId}, ` +
      `${result.products} products, ${result.downloads} downloads`,
  );
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
