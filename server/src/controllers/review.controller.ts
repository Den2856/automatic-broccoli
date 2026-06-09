import type { NextFunction, Request, Response } from "express";
import { getVisibleReviewsService } from "../services/review.service.js";

export async function getVisibleReviews(
  _req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const reviews = await getVisibleReviewsService();

    res.status(200).json({
      success: true,
      data: reviews,
    });
  } catch (error) {
    next(error);
  }
}
