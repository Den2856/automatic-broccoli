import cors from "cors";
import express, { type Request, type Response } from "express";
import { env } from "./config/env.js";
import blogRoutes from "./routes/blog.routes.js";
import categoryRoutes from "./routes/category.routes.js";
import healthRoutes from "./routes/health.routes.js";
import reviewRoutes from "./routes/review.routes.js";
import vehicleRoutes from "./routes/vehicle.routes.js";
import { errorHandler, notFoundHandler } from "./middleware/error.middleware.js";

export function createApp() {
  const app = express();

  const allowedOrigins = [
    env.clientUrl,
    "https://automatic-broccoli-8517.onrender.com"
  ];

  app.use(
    cors({
      origin: allowedOrigins
    })
  );
  app.use(express.json());

  app.get("/", (request: Request, response: Response) => {
    response.json({
      message: "Driver Hub server is running"
    });
  });

  app.use("/api/health", healthRoutes);
  app.use("/api/blog", blogRoutes);
  app.use("/api/categories", categoryRoutes);
  app.use("/api/reviews", reviewRoutes);
  app.use("/api/vehicles", vehicleRoutes);

  app.use(notFoundHandler);
  app.use(errorHandler);

  return app;
}
