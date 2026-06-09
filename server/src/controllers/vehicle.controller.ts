import type { NextFunction, Request, Response } from "express";
import {
  getVehicleCategoryBySlugService,
  getPublishedVehiclesService,
  getFeaturedVehiclesService,
  getVehicleDetailBySlugService,
} from "../services/vehicle.service.js";

export async function getVehicles(
  _req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const vehicles = await getPublishedVehiclesService();

    res.status(200).json({
      success: true,
      data: vehicles,
    });
  } catch (error) {
    next(error);
  }
}

export async function getFeaturedVehicles(
  _req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const vehicles = await getFeaturedVehiclesService();

    res.status(200).json({
      success: true,
      data: vehicles,
    });
  } catch (error) {
    next(error);
  }
}

export async function getVehicleCategoryBySlug(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const slug = String(req.params.slug || "").trim().toLowerCase();
    const result = await getVehicleCategoryBySlugService(slug);

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

export async function getVehicleDetailBySlug(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const slug = String(req.params.slug || "").trim().toLowerCase();
    const result = await getVehicleDetailBySlugService(slug);

    if (!result) {
      res.status(404).json({
        success: false,
        message: "Vehicle not found",
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
