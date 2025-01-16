import { handle } from "hono/vercel";

import { type HttpBindings } from "@hono/node-server";
import { PrismaClient } from "@prisma/client";

import { Hono } from "hono";
import { cors } from "hono/cors";
import type { JwtVariables } from "hono/jwt";
import { jwt } from "hono/jwt";
import { logger } from "hono/logger";
import { prettyJSON } from "hono/pretty-json";


import CustomError from "@/backend/response/CustomError";
import auth from "@/backend/routers/auth.router";
import { login } from "@/backend/controllers/auth.controller";


export const runtime = "nodejs";

const prisma = new PrismaClient();

type Variables = JwtVariables;

type Bindings = HttpBindings & {
  JWT_SECRET: string;
};

const app = new Hono<{ Variables: Variables; Bindings: Bindings }>({
  strict: true,
}).basePath("/api");

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

app.use("/v1/*", (c, next) => {
  const jwtMiddleware = jwt({
    secret: process.env.JWT_SECRET || "",
  });
  return jwtMiddleware(c, next);
});

// Custom error handler
app.onError((err: Error, c) => {
  if (err instanceof CustomError) {
    // Handle custom errors
    return c.json(
      {
        error: {
          name: err.name,
          message: err.message,
        },
      },
      err.statusCode
    );
  }
  // Handle generic errors
  return c.json(
    {
      data: {
        cause: err.cause,
        name: err.name || "Internal Server Error",
        message: err.message || "Something went wrong!",
      },
    },
    500
  );
});

app.get("/hello", (c) => {
  console.log(c.req.path);
  
  return c.json({
    message: "Hello Next.js!",
  });
});

// app.post("/student/login", login);
app.route("/auth", auth);


app.get("/v1/users", (c) => {
  return c.text("You are authorized");
});


export const GET = handle(app);
export const POST = handle(app);
