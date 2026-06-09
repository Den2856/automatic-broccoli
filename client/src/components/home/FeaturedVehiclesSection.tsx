import { useEffect, useState } from "react"
import type {
  FeaturedVehicleCard,
  FeaturedVehicleResponse,
} from "../../types/vehicle"
import FeaturedVehiclesSectionSkeleton from "../skeletons/FeaturedVehiclesSectionSkeleton"
import SectionHeading from "../ui/SectionHeading"
import VehicleCard from "../ui/VehicleCard"

type LoadState = "idle" | "loading" | "success" | "error"

export default function FeaturedVehiclesSection() {
  const [vehicles, setVehicles] = useState<FeaturedVehicleCard[]>([])
  const [loadState, setLoadState] = useState<LoadState>("idle")
  const [errorMessage, setErrorMessage] = useState("")

  useEffect(() => {
    const abortController = new AbortController()

    async function loadVehicles() {
      try {
        setLoadState("loading")
        setErrorMessage("")

        const response = await fetch("/api/vehicles/featured", {
          signal: abortController.signal,
        })

        if (!response.ok) {
          throw new Error(`Failed to load featured vehicles: ${response.status}`)
        }

        const result = (await response.json()) as FeaturedVehicleResponse

        if (!result.success) {
          throw new Error(result.message || "Failed to load featured vehicles")
        }

        setVehicles(result.data)
        setLoadState("success")
      } catch (error) {
        if (abortController.signal.aborted) {
          return
        }

        setErrorMessage(
          error instanceof Error
            ? error.message
            : "Unable to load featured vehicles"
        )
        setLoadState("error")
      }
    }

    loadVehicles()

    return () => {
      abortController.abort()
    }
  }, [])

  if (loadState === "loading" || loadState === "idle") {
    return <FeaturedVehiclesSectionSkeleton />
  }

  return (
    <section id="featured-vehicles" className="bg-paper px-4 md:px-6 xl:px-8">
      <div className="mx-auto max-w-[1440px]">
        <SectionHeading
          eyebrow="Highlighted"
          title="Featured Vehicles"
          align="center"
          titleSize="lg"
          maxWidth="md"
          className="mx-auto"
        />

        <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {loadState === "success" &&
            vehicles.map((vehicle) => (
              <VehicleCard
                key={vehicle._id}
                vehicle={vehicle}
                sizes="(min-width: 1280px) 360px, (min-width: 768px) calc((100vw - 88px) / 2), calc(100vw - 32px)"
              />
            ))}

          {loadState === "success" && vehicles.length === 0 ? (
            <div className="col-span-full rounded-[14px] border border-border-soft bg-cloud px-6 py-8 text-[16px] text-graphite">
              No featured vehicles found in the database.
            </div>
          ) : null}

          {loadState === "error" ? (
            <div className="col-span-full rounded-[14px] border border-border-soft bg-cloud px-6 py-8 text-[16px] text-graphite">
              {errorMessage || "Unable to load featured vehicles."}
            </div>
          ) : null}
        </div>
      </div>
    </section>
  )
}
