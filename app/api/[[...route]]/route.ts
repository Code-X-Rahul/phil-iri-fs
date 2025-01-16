import { handle } from "hono/vercel";

import { type HttpBindings } from "@hono/node-server";
import { PrismaClient } from "@prisma/client";

import { Hono } from "hono";
import { cors } from "hono/cors";
import type { JwtVariables } from "hono/jwt";
import { jwt } from "hono/jwt";
import { logger } from "hono/logger";
import { prettyJSON } from "hono/pretty-json";


import auth from "@/backend/routers/auth.router";
import { HTTPException } from 'hono/http-exception';
import { ResponseUtil } from "@/backend/core/ResponseUtil";

export const runtime = "nodejs";

const prisma = new PrismaClient();

type Variables = JwtVariables;

type Bindings = HttpBindings & {
  JWT_SECRET: string;
};

const app = new Hono<{ Variables: Variables; Bindings: Bindings }>({
  strict: true,
}).basePath("/api");

// Middleware
app.use(prettyJSON());
app.use(logger());
app.use(cors());

// Middleware to close Prisma connections gracefully
app.use("*", async (ctx, next) => {
  try {
    await next();
  } finally {
    await prisma.$disconnect();
  }
});

// JWT Middleware for versioned routes
app.use("/v1/*", (c, next) => {
  const jwtMiddleware = jwt({
    secret: process.env.JWT_SECRET || "",
  });
  return jwtMiddleware(c, next);
});



// Error handler middleware
app.onError((err, c) => {
  console.error("=== Caught Error ===", err);

  const response = ResponseUtil.error(err.message || 'An unexpected error occurred', {
    message: err.message,
    stack: err.stack // Optional: include stack trace for debugging
  });

  return c.json(response, err instanceof HTTPException ? err.status : 500);
});


// Routes
app.get("/hello", (c) => {
  const responseData = {
    message: "Hello Next.js!",
  };
  return c.json(ResponseUtil.success(responseData, "Greeting sent successfully"));
});


app.route("/auth", auth);

app.get("/v1/users", (c) => {
  return c.json(ResponseUtil.success(null, "You are authorized"));
});

// Example of an error-prone route
app.get("/v1/error-prone", async () => {
  throw new Error("This is a simulated error.");
});


// Export handlers for Vercel
export const GET = handle(app);
export const POST = handle(app);
