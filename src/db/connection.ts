import { env } from "@/config/env";
import "dotenv/config";
import { drizzle } from "drizzle-orm/mysql2";

export const db = drizzle(env.DATABASE_URL);
