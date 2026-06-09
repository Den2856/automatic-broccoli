import dotenv from "dotenv";

dotenv.config();

export const env = {
  nodeEnv: process.env.NODE_ENV || "development",
  port: Number(process.env.PORT) || 4025,
  clientUrl: process.env.CLIENT_URL || "http://localhost:5173",
  mongoUri: process.env.MONGODB_URI || "mongodb://localhost:27017/driver-hub"
} as const;
