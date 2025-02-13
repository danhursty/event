import express from "express";
import cors from "cors";
import helmet from "helmet";
import type { RequestHandler } from "express";
import swaggerUi from "swagger-ui-express";
import { requestLogger } from "./middleware/request-logger";
import { handleErrors } from "./middleware/handle-errors";
import { healthRouter } from "./routes/health";
import { swaggerSpec } from "./config/swagger";

// Initialize express app
const app = express();

// Basic middleware
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logging
app.use(requestLogger);

// API Documentation
if (process.env.NODE_ENV !== "production") {
  const swaggerMiddleware = [
    ...swaggerUi.serve,
    swaggerUi.setup(swaggerSpec, {
      explorer: true,
    }),
  ] as RequestHandler[];

  app.use("/api-docs", swaggerMiddleware);
}

// Routes
app.use("/health", healthRouter);

// Error handling
app.use(handleErrors);

export { app };
