import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";

const databaseUrl = process.env.DATABASE_URL ?? "file:./dev.db";
const adapterUrl = databaseUrl.startsWith("file:")
  ? databaseUrl.replace(/^file:/, "").split("?")[0]
  : databaseUrl;
const adapter = new PrismaBetterSqlite3({ url: adapterUrl });

const globalForPrisma = globalThis as typeof globalThis & {
  prisma?: PrismaClient;
};

export const prisma = globalForPrisma.prisma ?? new PrismaClient({ adapter });
