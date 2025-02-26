import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from "postgres";
import * as schema from '@/db/schema/_index';
import env from "@/env";

export const connection = postgres(env.DATABASE_URL, {
  max: undefined,
  onnotice: undefined,
});

export const db = drizzle(connection, {
  schema,
  logger: true,
});

export type db = typeof db;

export default db;
