import { Router, type Request, type Response } from "express";
import { getDatabaseState } from "../config/db.js";

const router = Router();

router.get("/", (request: Request, response: Response) => {
  response.json({
    status: "ok",
    message: "Driver Hub API ready",
    database: getDatabaseState(),
    timestamp: new Date().toISOString()
  });
});

export default router;
