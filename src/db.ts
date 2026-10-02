import { PrismaLibSql } from "@prisma/adapter-libsql";
import { PrismaClient } from "./generated/prisma/client.js";
import { config } from "./config.js";

export const db = new PrismaClient({
  adapter: new PrismaLibSql({ url: config.databaseUrl }),
});
