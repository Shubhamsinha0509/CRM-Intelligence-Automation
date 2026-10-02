import { afterAll, beforeAll, expect, test } from "vitest";
import type { Server } from "node:http";
import { app } from "../src/app.js";

let server: Server;
let baseUrl: string;

beforeAll(async () => {
  await new Promise<void>((resolve) => {
    server = app.listen(0, () => resolve());
  });
  const address = server.address();
  if (typeof address === "string" || address === null) throw new Error("no port");
  baseUrl = `http://localhost:${address.port}`;
});

afterAll(() => {
  server.close();
});

test("GET /health reports the app and database are up", async () => {
  const res = await fetch(`${baseUrl}/health`);
  expect(res.status).toBe(200);
  expect(await res.json()).toEqual({ status: "ok", database: "ok" });
});
