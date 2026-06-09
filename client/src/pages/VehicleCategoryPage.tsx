import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import Footer from "../components/Footer"
import Hero from "../components/home/Hero"
import VehicleCatalogSection from "../components/vehicles/VehicleCatalogSection"
import type { VehicleCategoryPagePayload } from "../types/vehicle"
import { resolveAssetPath } from "../utils/assets"
import {
  buildVehicleFilterGroups,
  createVehicleFilters,
  getVehicleRangeBounds,
  matchesVehicleFilters,
  type VehicleFilters,
} from "../utils/vehicleFilters"

type VehicleCategoryPageProps = {
  payload: VehicleCategoryPagePayload
}

export default function VehicleCategoryPage({
  payload,
}: VehicleCategoryPageProps) {
  const location = useLocation()
  const [isFilterDialogOpen, setIsFilterDialogOpen] = useState(false)
  const [filters, setFilters] = useState<VehicleFilters>(() => {
    const initialRangeBounds = getVehicleRangeBounds(payload.vehicles)

    return createVehicleFilters(
      initialRangeBounds.mileage,
      initialRangeBounds.price
    )
  })

  useEffect(() => {
    const rangeBounds = getVehicleRangeBounds(payload.vehicles)

    setFilters(createVehicleFilters(rangeBounds.mileage, rangeBounds.price))
  }, [payload.vehicles])

  useEffect(() => {
    if (location.hash) {
      const target = document.querySelector(location.hash)

      if (target instanceof HTMLElement) {
        target.scrollIntoView({ behavior: "smooth", block: "start" })
        return
      }
    }

    window.scrollTo({ top: 0, behavior: "auto" })
  }, [location.hash, payload.category.slug])

  useEffect(() => {
    if (!isFilterDialogOpen) {
      return
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsFilterDialogOpen(false)
      }
    }

    function handleResize() {
      if (window.innerWidth > 768) {
        setIsFilterDialogOpen(false)
      }
    }

    const previousOverflow = document.body.style.overflow

    document.body.style.overflow = "hidden"
    window.addEventListener("keydown", handleKeyDown)
    window.addEventListener("resize", handleResize)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener("keydown", handleKeyDown)
      window.removeEventListener("resize", handleResize)
    }
  }, [isFilterDialogOpen])

  const rangeBounds = getVehicleRangeBounds(payload.vehicles)
  const filterGroups = buildVehicleFilterGroups(payload.vehicles)
  const filteredVehicles = payload.vehicles.filter((vehicle) =>
    matchesVehicleFilters(vehicle, filters, rangeBounds.mileage, rangeBounds.price)
  )

  return (
    <main className="min-h-screen bg-paper text-obsidian">
      <Hero
        variant="page"
        title={`${payload.category.name} Vehicles`}
        imageSrc={resolveAssetPath(
          payload.category.heroImage || payload.category.coverImage
        )}
        imageAlt={`${payload.category.name} category hero`}
        imageObjectPosition={payload.category.heroImageObjectPosition || "center"}
      />

      <VehicleCatalogSection
        loadState="success"
        errorMessage=""
        filters={filters}
        onFiltersChange={setFilters}
        filterGroups={filterGroups}
        mileageBounds={rangeBounds.mileage}
        priceBounds={rangeBounds.price}
        vehicles={payload.vehicles}
        filteredVehicles={filteredVehicles}
        isFilterDialogOpen={isFilterDialogOpen}
        onOpenFilterDialog={() => setIsFilterDialogOpen(true)}
        onCloseFilterDialog={() => setIsFilterDialogOpen(false)}
      />

      <Footer />
    </main>
  )
}
