import winston from "winston";

import { config } from "./app-config";

const { combine, timestamp, printf } = winston.format;

interface LogInfo {
  level: string;
  message: string;
  timestamp: string;
  [key: string]: unknown;
}

const logFormat = printf((info: unknown) => {
  const { level, message, timestamp } = info as LogInfo;
  return `[api][${timestamp}] ${level}: ${message}`;
});

export const logger = winston.createLogger({
  level: config.NODE_ENV === "development" ? "debug" : "info",
  format: combine(timestamp(), logFormat),
  transports: [
    new winston.transports.Console({
      stderrLevels: ["error"],
    }),
  ],
});
