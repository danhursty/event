import { app } from "./app";

const PORT = process.env.PORT || 3001;

const server = app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});

// Graceful shutdown
function cleanup() {
  console.log("Shutting down server...");

  // Add timeout to force shutdown if graceful shutdown fails
  const forceShutdown = setTimeout(() => {
    console.error(
      "Could not close connections in time, forcefully shutting down"
    );
    process.exit(1);
  }, 10000);

  server.close(() => {
    console.log("Server closed successfully");
    clearTimeout(forceShutdown);
    process.exit(0);
  });
}

process.on("SIGTERM", cleanup);
process.on("SIGINT", cleanup);
