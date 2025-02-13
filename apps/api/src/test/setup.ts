import { beforeAll, afterAll, afterEach } from "vitest";
import { app } from "../app";
import type { Server } from "http";

let server: Server;

beforeAll(() => {
  const PORT = process.env.TEST_PORT || 3002;
  server = app.listen(PORT);
});

afterAll(() => {
  return new Promise<void>((resolve) => {
    server.close(() => resolve());
  });
});

afterEach(() => {
  // Clean up any test data here
});
