import { defineConfig } from "prisma/config";

// Explicit opt-in: never read .env.local or fall back to the SQLite database.
export default defineConfig({
  schema: "prisma/postgresql/schema.prisma",
  migrations: { path: "prisma/postgresql/migrations" },
  datasource: { url: process.env.POSTGRES_DIRECT_URL },
});
