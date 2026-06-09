import { Router } from "express";
import { getVisibleReviews } from "../controllers/review.controller.js";

const router = Router();

router.get("/", getVisibleReviews);

export default router;
