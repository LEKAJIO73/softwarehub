import "dotenv/config";
import { defineConfig } from "drizzle-kit";
import path from "path";

const DB_PATH = process.env.SQLITE_PATH || path.resolve("data", "softwareHub.db");

export default defineConfig({
  schema: "./shared/schema.ts",
  out: "./drizzle",
  dialect: "sqlite",
  dbCredentials: {
    url: DB_PATH,
  },
  strict: true,
  verbose: true,
});
