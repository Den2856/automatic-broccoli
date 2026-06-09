import type { Request, Response, NextFunction } from "express";
import {
  getVehicleCategoryPageService,
  getVisibleVehicleCategoriesService,
} from "../services/category.service.js";

export async function getVisibleVehicleCategories(
  _req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const categories = await getVisibleVehicleCategoriesService();

    res.status(200).json({
      success: true,
      data: categories,
    });
  } catch (error) {
    next(error);
  }
}

export async function getVehicleCategoryPage(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const slug = String(req.params.slug || "").trim().toLowerCase();
    const result = await getVehicleCategoryPageService(slug);

    if (!result) {
      res.status(404).json({
        success: false,
        message: "Vehicle category not found",
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    next(error);
  }
}
