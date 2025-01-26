import { drizzle } from "drizzle-orm/postgres-js"
import postgres from "postgres"

const connectionSting = "postgresql://postgres.tynhdwelwydxpadnzatf:SupaBase192@aws-0-ap-south-1.pooler.supabase.com:6543/postgres"
export const connection = postgres(connectionSting)
export const db = drizzle(connection)