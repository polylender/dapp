import { Hono } from "hono";
import type { Context } from "hono";

interface Env {
  // Add your environment variables here
  [key: string]: string | undefined;
}

const app = new Hono<{ Bindings: Env }>();

app.get("/api/", (c: Context) => c.json({ name: "Polylender" }));

export default app;
