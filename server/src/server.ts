import { createApp } from "./app.js";
import { connectDatabase } from "./config/db.js";
import { env } from "./config/env.js";

const app = createApp();

function startServer(): void {
  app.listen(env.port, () => {
    console.log(`Server running on http://localhost:${env.port}`);
  });

  void connectDatabase(env.mongoUri);
}

startServer();
