import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import Footer from "../components/Footer"
import Header from "../components/Header"
import PageHeroSkeleton from "../components/skeletons/PageHeroSkeleton"
import VehicleCatalogSectionSkeleton from "../components/skeletons/VehicleCatalogSectionSkeleton"
import VehicleCategoryPage from "./VehicleCategoryPage"
import VehicleDetailPage from "./VehicleDetailPage"
import { apiUrl } from "../utils/api"
import type {
  VehicleCategoryPagePayload,
  VehicleCategoryPageResponse,
} from "../types/vehicle"

type RouteLoadState = "idle" | "loading" | "category" | "vehicle" | "error"

export default function VehicleSlugPage() {
  const { slug = "" } = useParams()
  const [categoryPayload, setCategoryPayload] =
    useState<VehicleCategoryPagePayload | null>(null)
  const [loadState, setLoadState] = useState<RouteLoadState>("idle")
  const [errorMessage, setErrorMessage] = useState("")

  useEffect(() => {
    const abortController = new AbortController()

    async function resolveSlugRoute() {
      try {
        setLoadState("loading")
        setErrorMessage("")
        setCategoryPayload(null)

        const response = await fetch(apiUrl(`/api/vehicles/category/${slug}`), {
          signal: abortController.signal,
        })

        if (response.status === 404) {
          setLoadState("vehicle")
          return
        }

        if (!response.ok) {
          throw new Error(`Failed to resolve vehicle route: ${response.status}`)
        }

        const result = (await response.json()) as VehicleCategoryPageResponse

        if (!result.success) {
          throw new Error(result.message || "Failed to load category page")
        }

        setCategoryPayload(result.data)
        setLoadState("category")
      } catch (error) {
        if (abortController.signal.aborted) {
          return
        }

        setErrorMessage(
          error instanceof Error ? error.message : "Unable to resolve vehicle route"
        )
        setLoadState("error")
      }
    }

    if (slug) {
      resolveSlugRoute()
    }

    return () => {
      abortController.abort()
    }
  }, [slug])

  if (loadState === "category" && categoryPayload) {
    return <VehicleCategoryPage payload={categoryPayload} />
  }

  if (loadState === "vehicle") {
    return <VehicleDetailPage />
  }

  if (loadState === "error") {
    return (
      <main className="min-h-screen bg-paper text-obsidian">
        <Header
          theme="light"
          containerClassName="max-w-[1800px] px-4 md:px-6 xl:px-10"
        />

        <section className="bg-paper px-4 pb-[88px] pt-10 md:px-6 md:pb-[100px] md:pt-12 xl:px-10 xl:pb-[120px]">
          <div className="mx-auto max-w-[1800px]">
            <div className="rounded-[14px] border border-border-soft bg-cloud px-6 py-8 text-[16px] text-graphite">
              <p>{errorMessage || "Unable to load this page."}</p>
              <Link
                to="/vehicles#vehicles"
                className="mt-4 inline-flex text-[15px] font-medium text-obsidian transition-opacity duration-200 hover:opacity-70"
              >
                Back to vehicles
              </Link>
            </div>
          </div>
        </section>

        <Footer />
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-paper text-obsidian">
      <PageHeroSkeleton />
      <VehicleCatalogSectionSkeleton />
      <Footer />
    </main>
  )
}
