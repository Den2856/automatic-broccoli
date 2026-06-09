import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import Footer from "../components/Footer"
import Hero from "../components/home/Hero"
import VehicleCatalogSection from "../components/vehicles/VehicleCatalogSection"
import {
  createVehicleFilters,
  buildVehicleFilterGroups,
  getVehicleRangeBounds,
  matchesVehicleFilters,
  type VehicleFilters,
} from "../utils/vehicleFilters"
import { apiUrl } from "../utils/api"
import type { VehicleCard as VehicleCardData, VehicleListResponse } from "../types/vehicle"

type LoadState = "idle" | "loading" | "success" | "error"

export default function VehiclesPage() {
  const location = useLocation()
  const [vehicles, setVehicles] = useState<VehicleCardData[]>([])
  const [loadState, setLoadState] = useState<LoadState>("idle")
  const [errorMessage, setErrorMessage] = useState("")
  const [isFilterDialogOpen, setIsFilterDialogOpen] = useState(false)
  const [filters, setFilters] = useState<VehicleFilters>(() => createVehicleFilters())

  useEffect(() => {
    const abortController = new AbortController()

    async function loadVehicles() {
      try {
        setLoadState("loading")
        setErrorMessage("")

        const response = await fetch(apiUrl("/api/vehicles"), {
          signal: abortController.signal,
        })

        if (!response.ok) {
          throw new Error(`Failed to load vehicles: ${response.status}`)
        }

        const result = (await response.json()) as VehicleListResponse

        if (!result.success) {
          throw new Error(result.message || "Failed to load vehicles")
        }

        const rangeBounds = getVehicleRangeBounds(result.data)

        setVehicles(result.data)
        setFilters(
          createVehicleFilters(rangeBounds.mileage, rangeBounds.price)
        )
        setLoadState("success")
      } catch (error) {
        if (abortController.signal.aborted) {
          return
        }

        setErrorMessage(
          error instanceof Error ? error.message : "Unable to load vehicles"
        )
        setLoadState("error")
      }
    }

    loadVehicles()

    return () => {
      abortController.abort()
    }
  }, [])

  useEffect(() => {
    if (location.hash) {
      const target = document.querySelector(location.hash)

      if (target instanceof HTMLElement) {
        target.scrollIntoView({ behavior: "smooth", block: "start" })
        return
      }
    }

    window.scrollTo({ top: 0, behavior: "auto" })
  }, [location.hash])

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

  const rangeBounds = getVehicleRangeBounds(vehicles)
  const filterGroups = buildVehicleFilterGroups(vehicles)
  const filteredVehicles = vehicles.filter((vehicle) =>
    matchesVehicleFilters(vehicle, filters, rangeBounds.mileage, rangeBounds.price)
  )

  return (
    <main className="min-h-screen bg-paper text-obsidian">
      <Hero
        variant="page"
        title="Available Vehicles"
        imageSrc="/hero-vehicles.png"
        imageAlt="Available vehicles hero"
        imageObjectPosition="center"
      />

      <VehicleCatalogSection
        loadState={loadState}
        errorMessage={errorMessage}
        filters={filters}
        onFiltersChange={setFilters}
        filterGroups={filterGroups}
        mileageBounds={rangeBounds.mileage}
        priceBounds={rangeBounds.price}
        vehicles={vehicles}
        filteredVehicles={filteredVehicles}
        isFilterDialogOpen={isFilterDialogOpen}
        onOpenFilterDialog={() => setIsFilterDialogOpen(true)}
        onCloseFilterDialog={() => setIsFilterDialogOpen(false)}
      />

      <Footer />
    </main>
  )
}
