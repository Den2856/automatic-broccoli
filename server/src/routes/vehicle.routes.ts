import { Router } from "express";
import {
  getVehicleCategoryBySlug,
  getVehicles,
  getFeaturedVehicles,
  getVehicleDetailBySlug,
} from "../controllers/vehicle.controller.js";

const router = Router();

router.get("/", getVehicles);
router.get("/featured", getFeaturedVehicles);
router.get("/category/:slug", getVehicleCategoryBySlug);
router.get("/:slug", getVehicleDetailBySlug);

export default router;
