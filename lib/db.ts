import postgres from "postgres";

// Lazy, build-safe DB access.
//
// IMPORTANT: never call postgres() at module top level — it throws when DATABASE_URL
// is unset, which would crash `next build` before the Vercel → self-hosted PostgreSQL integration
// is provisioned. We also deliberately avoid a Proxy wrapper (it breaks driver
// introspection). getSql() returns null when no connection string is present, so
// every caller can fall back gracefully (the contact form stays email-only until
// the database is configured).
function getSql() {
  const url = process.env.DATABASE_URL || process.env.POSTGRES_URL;
  if (!url) return null;
  return postgres(url) as any;
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
  // L2 closed-loop instrumentation (win/loss/margin) — additive, nullable, idempotent.
  await sql`ALTER TABLE inquiries ADD COLUMN IF NOT EXISTS outcome         TEXT`;        // won | lost | pending | null
  await sql`ALTER TABLE inquiries ADD COLUMN IF NOT EXISTS outcome_at      TIMESTAMPTZ`;
  await sql`ALTER TABLE inquiries ADD COLUMN IF NOT EXISTS realized_margin NUMERIC`;     // gross margin % on won deals
  await sql`ALTER TABLE inquiries ADD COLUMN IF NOT EXISTS loss_reason     TEXT`;        // price | lead_time | spec | trust | other | null
  await sql`ALTER TABLE inquiries ADD COLUMN IF NOT EXISTS outcome_note    TEXT`;
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
  outcome: string | null;          // won | lost | pending | null
  outcome_at: string | null;
  realized_margin: number | null;  // gross margin % on won deals
  loss_reason: string | null;      // price | lead_time | spec | trust | other | null
  outcome_note: string | null;
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
           inquiry_type, message, source, context, email_sent,
           outcome, outcome_at, realized_margin, loss_reason, outcome_note
    FROM inquiries
    WHERE id > ${sinceId}
    ORDER BY id ASC
    LIMIT ${limit}
  `;
  return rows as unknown as InquiryRow[];
}

// ---------------------------------------------------------------------------
// L2 closed-loop instrumentation: record deal outcome + aggregate win-rate.
// Lets the inquiry→quote→deal loop be MEASURED (win rate, realized margin,
// loss reasons) so the signal can feed back into pricing & product decisions.
// ---------------------------------------------------------------------------

const VALID_OUTCOME = new Set(["won", "lost", "pending"]);
const VALID_LOSS_REASON = new Set(["price", "lead_time", "spec", "trust", "other"]);

/** Set the deal outcome on one inquiry. Returns {ok:false,error} on bad input / no row. */
export async function setInquiryOutcome(
  id: number,
  o: { outcome: string; realizedMargin?: number | null; lossReason?: string | null; note?: string | null },
): Promise<{ ok: boolean; error?: string }> {
  const sql = getSql();
  if (!sql) return { ok: false, error: "DB not configured" };
  if (!VALID_OUTCOME.has(o.outcome)) return { ok: false, error: "outcome must be won | lost | pending" };
  if (o.lossReason != null && !VALID_LOSS_REASON.has(o.lossReason))
    return { ok: false, error: "loss_reason must be price | lead_time | spec | trust | other" };
  await ensureTable(sql);
  const margin =
    o.realizedMargin == null || !Number.isFinite(Number(o.realizedMargin)) ? null : Number(o.realizedMargin);
  const rows = await sql`
    UPDATE inquiries
       SET outcome         = ${o.outcome},
           outcome_at      = now(),
           realized_margin = ${margin},
           loss_reason     = ${o.lossReason ?? null},
           outcome_note    = ${o.note ?? null}
     WHERE id = ${id}
     RETURNING id
  `;
  return rows.length ? { ok: true } : { ok: false, error: "inquiry not found" };
}

export interface InquiryMetrics {
  decided: number;          // won + lost
  won: number;
  lost: number;
  pending: number;
  overall_win_rate: number | null;   // won / (won+lost), 0..1
  avg_won_margin: number | null;      // mean realized_margin over won
  weekly: { week: string; total: number; won: number; lost: number; pending: number; win_rate: number | null; avg_margin: number | null }[];
  loss_reasons: { loss_reason: string | null; n: number }[];
  by_country: { country: string | null; total: number; won: number; lost: number; win_rate: number | null }[];
  by_source: { source: string | null; total: number; won: number; lost: number; win_rate: number | null }[];
}

const winRate = (won: number, lost: number): number | null =>
  won + lost === 0 ? null : Math.round((won / (won + lost)) * 1000) / 1000;

/** Aggregate win-rate / loss-reasons / margin for the inquiry→deal loop dashboard. */
export async function inquiryMetrics(opts: { weeks?: number } = {}): Promise<InquiryMetrics | null> {
  const sql = getSql();
  if (!sql) return null;
  await ensureTable(sql);
  const weeks = Math.min(Math.max(opts.weeks ?? 26, 1), 260);

  const totals = (await sql`
    SELECT count(*) FILTER (WHERE outcome = 'won')::int  AS won,
           count(*) FILTER (WHERE outcome = 'lost')::int AS lost,
           count(*) FILTER (WHERE outcome IS NULL OR outcome = 'pending')::int AS pending,
           round(avg(realized_margin) FILTER (WHERE outcome = 'won'), 1) AS avg_won_margin
    FROM inquiries
  `)[0] as { won: number; lost: number; pending: number; avg_won_margin: number | null };

  const weeklyRows = (await sql`
    SELECT to_char(date_trunc('week', created_at), 'IYYY-"W"IW') AS week,
           count(*)::int AS total,
           count(*) FILTER (WHERE outcome = 'won')::int  AS won,
           count(*) FILTER (WHERE outcome = 'lost')::int AS lost,
           count(*) FILTER (WHERE outcome IS NULL OR outcome = 'pending')::int AS pending,
           round(avg(realized_margin) FILTER (WHERE outcome = 'won'), 1) AS avg_margin
    FROM inquiries
    WHERE created_at >= now() - make_interval(weeks => ${weeks})
    GROUP BY date_trunc('week', created_at)
    ORDER BY date_trunc('week', created_at) DESC
  `) as { week: string; total: number; won: number; lost: number; pending: number; avg_margin: number | null }[];

  const lossRows = (await sql`
    SELECT loss_reason, count(*)::int AS n
    FROM inquiries WHERE outcome = 'lost'
    GROUP BY loss_reason ORDER BY n DESC
  `) as { loss_reason: string | null; n: number }[];

  const countryRows = (await sql`
    SELECT country, count(*)::int AS total,
           count(*) FILTER (WHERE outcome = 'won')::int  AS won,
           count(*) FILTER (WHERE outcome = 'lost')::int AS lost
    FROM inquiries GROUP BY country ORDER BY total DESC LIMIT 30
  `) as { country: string | null; total: number; won: number; lost: number }[];

  // Attribution by lead source (contact / calculator / ai-chat / ai-sourcing …)
  // so the inquiry→deal value of each acquisition surface — the calculator in
  // particular — can be measured, not guessed.
  const sourceRows = (await sql`
    SELECT source, count(*)::int AS total,
           count(*) FILTER (WHERE outcome = 'won')::int  AS won,
           count(*) FILTER (WHERE outcome = 'lost')::int AS lost
    FROM inquiries GROUP BY source ORDER BY total DESC LIMIT 30
  `) as { source: string | null; total: number; won: number; lost: number }[];

  return {
    decided: totals.won + totals.lost,
    won: totals.won,
    lost: totals.lost,
    pending: totals.pending,
    overall_win_rate: winRate(totals.won, totals.lost),
    avg_won_margin: totals.avg_won_margin == null ? null : Number(totals.avg_won_margin),
    weekly: weeklyRows.map((r) => ({ ...r, win_rate: winRate(r.won, r.lost) })),
    loss_reasons: lossRows,
    by_country: countryRows.map((r) => ({ ...r, win_rate: winRate(r.won, r.lost) })),
    by_source: sourceRows.map((r) => ({ ...r, win_rate: winRate(r.won, r.lost) })),
  };
}
