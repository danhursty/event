import { OpenAPIHono } from "@hono/zod-openapi";
import { swaggerUI } from "@hono/swagger-ui";
import { logger } from "./middleware/logger";
import { errorHandler } from "./middleware/error-handler";
import { cors } from "hono/cors";
import { secureHeaders } from "hono/secure-headers";
import { healthRoutes } from "./routes/health";
import type { Env } from "./types/env";

// Initialize Hono app with OpenAPI support
const app = new OpenAPIHono<{ Bindings: Env }>();

// Basic middleware
app.use("*", secureHeaders());
app.use("*", cors());
app.use("*", logger());
app.use("*", errorHandler());

// API Documentation
if (process.env.NODE_ENV !== "production") {
  app.doc("/api-docs", {
    openapi: "3.0.0",
    info: {
      title: "RiseLoop API",
      version: "1.0.0",
      description: "API documentation for RiseLoop",
    },
  });

  app.get("/swagger", swaggerUI({ url: "/api-docs" }));
}

// Mount routes
app.route("/health", healthRoutes);

export { app };
