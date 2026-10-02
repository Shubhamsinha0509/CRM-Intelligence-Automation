import express from "express";
import { db } from "./db.js";

export const app = express();

app.get("/health", async (_req, res) => {
  try {
    await db.$queryRaw`SELECT 1`;
    res.json({ status: "ok", database: "ok" });
  } catch {
    res.status(503).json({ status: "error", database: "unreachable" });
  }
});
