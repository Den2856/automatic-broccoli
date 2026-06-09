import mongoose from "mongoose";

const connectionLabels: Record<number, string> = {
  0: "disconnected",
  1: "connected",
  2: "connecting",
  3: "disconnecting"
};

export async function connectDatabase(uri: string): Promise<void> {
  try {
    await mongoose.connect(uri);
    console.log(`MongoDB connected: ${mongoose.connection.host}`);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown MongoDB error";
    console.warn("MongoDB connection skipped:", message);
  }
}

export function getDatabaseState(): string {
  return connectionLabels[mongoose.connection.readyState] || "unknown";
}
