import { neon } from "@neondatabase/serverless";

/**
 * Lazy singleton — Neon client dibuat hanya saat pertama kali query() dipanggil,
 * bukan saat module di-import. Ini penting agar Next.js build tidak gagal
 * ketika DATABASE_URL belum tersedia di build-time Docker.
 */
let _sql: ReturnType<typeof neon> | null = null;

function getSql(): ReturnType<typeof neon> {
  if (_sql) return _sql;
  if (!process.env.DATABASE_URL) {
    throw new Error(
      "DATABASE_URL is not set. Add it to .env.local or as a runtime environment variable."
    );
  }
  _sql = neon(process.env.DATABASE_URL);
  return _sql;
}

/**
 * Execute a parameterized SQL query against the Neon database.
 *
 * @example
 * const rows = await query<UserRow>("SELECT * FROM users WHERE email = $1", [email]);
 */
export async function query<T = Record<string, unknown>>(
  text: string,
  params: unknown[] = []
): Promise<T[]> {
  const result = await getSql().query(text, params);
  return result as unknown as T[];
}
