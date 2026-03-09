import { Pool } from "pg"

declare global {
  // eslint-disable-next-line no-var
  var __runashPool: Pool | undefined
}

export const db =
  global.__runashPool ??
  new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: process.env.NODE_ENV === "production" ? { rejectUnauthorized: false } : undefined,
  })

if (process.env.NODE_ENV !== "production") {
  global.__runashPool = db
}
