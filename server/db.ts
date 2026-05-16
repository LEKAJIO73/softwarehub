import "dotenv/config";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "../shared/schema";

const url = process.env.DATABASE_URL;
if (!url) {
  throw new Error("DATABASE_URL is required. Set it in .env or your hosting platform.");
}

const isProd = process.env.NODE_ENV === "production";
const client = postgres(url, {
  max: 10,
  prepare: false,
  ssl: isProd || url.includes("sslmode=require") ? "require" : false,
});

export const db = drizzle(client, { schema });
export { schema };
