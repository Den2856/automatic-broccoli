import { Router } from "express"
import {
  getVehicleCategoryPage,
  getVisibleVehicleCategories,
} from "../controllers/category.controller.js"

const router = Router()

router.get("/", getVisibleVehicleCategories)
router.get("/:slug", getVehicleCategoryPage)

export default router
