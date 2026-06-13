import { neon } from "@neondatabase/serverless";

// Lazy, build-safe DB access.
//
// IMPORTANT: never call neon() at module top level — it throws when DATABASE_URL
// is unset, which would crash `next build` before the Vercel → Neon integration
// is provisioned. We also deliberately avoid a Proxy wrapper (it breaks driver
// introspection). getSql() returns null when no connection string is present, so
// every caller can fall back gracefully (the contact form stays email-only until
// the database is configured).
function getSql() {
  const url = process.env.DATABASE_URL || process.env.POSTGRES_URL;
  if (!url) return null;
  return neon(url);
}

export function dbConfigured(): boolean {
  return Boolean(process.env.DATABASE_URL || process.env.POSTGRES_URL);
}

let tableReady = false;
async function ensureTable(sql: NonNullable<ReturnType<typeof getSql>>) {
  if (tableReady) return;
  await sql`
    CREATE TABLE IF NOT EXISTS inquiries (
      id           BIGSERIAL PRIMARY KEY,
      created_at   TIMESTAMPTZ NOT NULL DEFAULT now(),
      name         TEXT NOT NULL,
      email        TEXT NOT NULL,
      company      TEXT,
      phone        TEXT,
      country      TEXT,
      inquiry_type TEXT,
      message      TEXT NOT NULL,
      source       TEXT,
      context      JSONB,
      user_agent   TEXT,
      referer      TEXT,
      email_sent   BOOLEAN NOT NULL DEFAULT false
    )
  `;
  await sql`CREATE INDEX IF NOT EXISTS idx_inquiries_id ON inquiries (id)`;
  tableReady = true;
}

export interface InquiryInput {
  name: string;
  email: string;
  company?: string | null;
  phone?: string | null;
  country?: string | null;
  inquiryType?: string | null;
  message: string;
  source?: string | null;
  context?: unknown;
  userAgent?: string | null;
  referer?: string | null;
}

/** Insert one inquiry. Returns the new row id, or null when no DB is configured. */
export async function insertInquiry(input: InquiryInput): Promise<number | null> {
  const sql = getSql();
  if (!sql) return null;
  await ensureTable(sql);
  const contextJson = input.context == null ? null : JSON.stringify(input.context);
  const rows = await sql`
    INSERT INTO inquiries
      (name, email, company, phone, country, inquiry_type, message, source, context, user_agent, referer)
    VALUES
      (${input.name}, ${input.email}, ${input.company ?? null}, ${input.phone ?? null},
       ${input.country ?? null}, ${input.inquiryType ?? null}, ${input.message},
       ${input.source ?? null}, ${contextJson}::jsonb, ${input.userAgent ?? null}, ${input.referer ?? null})
    RETURNING id
  `;
  return (rows[0]?.id as number) ?? null;
}

export async function markInquiryEmailed(id: number): Promise<void> {
  const sql = getSql();
  if (!sql) return;
  await sql`UPDATE inquiries SET email_sent = true WHERE id = ${id}`;
}

export interface InquiryRow {
  id: number;
  created_at: string;
  name: string;
  email: string;
  company: string | null;
  phone: string | null;
  country: string | null;
  inquiry_type: string | null;
  message: string;
  source: string | null;
  context: unknown;
  email_sent: boolean;
}

/**
 * List inquiries with id > sinceId, oldest first. The integer id cursor is exact
 * (no timestamp-tie skips), so a poller passes back the last id it has seen.
 */
export async function listInquiries(opts: {
  sinceId?: number;
  limit?: number;
}): Promise<InquiryRow[]> {
  const sql = getSql();
  if (!sql) return [];
  await ensureTable(sql);
  const sinceId = Number.isFinite(opts.sinceId) ? Number(opts.sinceId) : 0;
  const limit = Math.min(Math.max(opts.limit ?? 200, 1), 500);
  const rows = await sql`
    SELECT id, created_at, name, email, company, phone, country,
           inquiry_type, message, source, context, email_sent
    FROM inquiries
    WHERE id > ${sinceId}
    ORDER BY id ASC
    LIMIT ${limit}
  `;
  return rows as InquiryRow[];
}
