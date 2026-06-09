import { useEffect, useState } from "react"
import { ArrowLeft } from "lucide-react"
import { Link, useParams } from "react-router-dom"
import Footer from "../components/Footer"
import Header from "../components/Header"
import CustomerReviewsSection from "../components/home/CustomerReviewsSection"
import ReadyToFindSection from "../components/home/ReadyToFindSection"
import TradeFinancingSection from "../components/home/TradeFinancingSection"
import VehicleDetailSectionSkeleton from "../components/skeletons/VehicleDetailSectionSkeleton"
import VehicleDetailContent from "../components/vehicles/VehicleDetailContent"
import VehicleRelatedSection from "../components/vehicles/VehicleRelatedSection"
import type { VehicleDetailPayload, VehicleDetailResponse } from "../types/vehicle"

type LoadState = "idle" | "loading" | "success" | "error"

export default function VehicleDetailPage() {
  const { slug = "" } = useParams()
  const [payload, setPayload] = useState<VehicleDetailPayload | null>(null)
  const [loadState, setLoadState] = useState<LoadState>("idle")
  const [errorMessage, setErrorMessage] = useState("")

  useEffect(() => {
    const abortController = new AbortController()

    async function loadVehicleDetail() {
      try {
        setLoadState("loading")
        setErrorMessage("")
        setPayload(null)

        const response = await fetch(`/api/vehicles/${slug}`, {
          signal: abortController.signal,
        })

        if (!response.ok) {
          throw new Error(
            response.status === 404
              ? "Vehicle not found"
              : `Failed to load vehicle: ${response.status}`
          )
        }

        const result = (await response.json()) as VehicleDetailResponse

        if (!result.success) {
          throw new Error(result.message || "Failed to load vehicle")
        }

        setPayload(result.data)
        setLoadState("success")
      } catch (error) {
        if (abortController.signal.aborted) {
          return
        }

        setErrorMessage(
          error instanceof Error ? error.message : "Unable to load vehicle"
        )
        setLoadState("error")
      }
    }

    if (slug) {
      loadVehicleDetail()
    }

    return () => {
      abortController.abort()
    }
  }, [slug])

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" })
  }, [slug])

  const vehicle = payload?.vehicle || null
  const relatedVehicles = payload?.relatedVehicles || []

  return (
    <main className="min-h-screen bg-paper text-obsidian">
      <Header
        theme="light"
        containerClassName="max-w-[1800px] px-4 md:px-6 xl:px-10"
      />

      <section className="bg-paper px-4 pb-[72px] pt-10 md:px-6 md:pb-[84px] md:pt-12 xl:px-10 xl:pb-[92px]">
        <div className="mx-auto max-w-[1800px]">
          <Link
            to="/vehicles#vehicles"
            className="inline-flex items-center gap-2 text-[15px] leading-[1.6] tracking-[-0.01em] text-graphite transition-opacity duration-200 hover:opacity-75"
          >
            <ArrowLeft size={15} strokeWidth={1.8} />
            Browse Vehicles
          </Link>

          {(loadState === "loading" || loadState === "idle") && (
            <VehicleDetailSectionSkeleton />
          )}

          {loadState === "error" ? (
            <div className="mt-6 rounded-[14px] border border-border-soft bg-cloud px-6 py-8 text-[16px] text-graphite">
              {errorMessage || "Unable to load vehicle."}
            </div>
          ) : null}

          {loadState === "success" && vehicle ? (
            <VehicleDetailContent vehicle={vehicle} />
          ) : null}
        </div>
      </section>

      {loadState === "success" && vehicle ? (
        <VehicleRelatedSection vehicles={relatedVehicles} />
      ) : null}

      <CustomerReviewsSection />
      <ReadyToFindSection />
      <TradeFinancingSection />
      <Footer />
    </main>
  )
}
