import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

import type { VehicleCategoryCard, VehicleCategoryResponse, } from "../../types/vehicle"
import { resolveAssetPath } from "../../utils/assets"
import VehicleCategoriesSectionSkeleton from "../skeletons/VehicleCategoriesSectionSkeleton"
import SectionHeading from "../ui/SectionHeading"
import CarouselShell from "../ui/CarouselShell"
import { apiUrl } from "../../utils/api"

type LoadState = "idle" | "loading" | "success" | "error"

export default function VehicleCategoriesSection() {
  const [categories, setCategories] = useState<VehicleCategoryCard[]>([])
  const [loadState, setLoadState] = useState<LoadState>("idle")
  const [errorMessage, setErrorMessage] = useState("")

  useEffect(() => {
    const abortController = new AbortController()

    async function loadCategories() {
      try {
        setLoadState("loading")
        setErrorMessage("")

        const response = await fetch(apiUrl("/api/categories"), {
          signal: abortController.signal,
        })

        if (!response.ok) {
          throw new Error(`Failed to load categories: ${response.status}`)
        }

        const result = (await response.json()) as VehicleCategoryResponse

        if (!result.success) {
          throw new Error(result.message || "Failed to load categories")
        }

        setCategories(result.data)
        setLoadState("success")
      } catch (error) {
        if (abortController.signal.aborted) {
          return
        }

        const message =
          error instanceof Error
            ? error.message
            : "Unable to load vehicle categories"

        setErrorMessage(message)
        setLoadState("error")
      }
    }

    loadCategories()

    return () => {
      abortController.abort()
    }
  }, [])

  if (loadState === "loading" || loadState === "idle") {
    return <VehicleCategoriesSectionSkeleton />
  }

  function getCategoryHref(slug: string) {
    return slug === "vehicles" ? "/vehicles#vehicles" : `/vehicles/${slug}#vehicles`
  }

  return (
    <CarouselShell
      heading={
        <SectionHeading
          eyebrow="Vehicle Categories"
          title="Browse by Vehicle Type"
          titleSize="lg"
          spacing="md"
          maxWidth="lg"
        />
      }
      prevLabel="Previous category"
      nextLabel="Next category"
      options={{
        align: "start",
        loop: categories.length > 4,
        dragFree: false,
      }}
      sectionClassName="bg-paper px-0 py-[100px]"
      containerClassName="mx-auto max-w-[1440px] px-4 md:px-6 xl:px-8"
      headerClassName="mb-7 flex flex-col gap-6 md:mb-[38px] md:flex-row md:items-start md:justify-between md:gap-8"
      controlsClassName="shrink-0 md:pt-[10px]"
      viewportClassName="overflow-hidden"
      trackClassName="flex items-stretch -ml-5"
    >
      {loadState === "success"
        ? categories.map((category) => (
            <Link
              to={getCategoryHref(category.slug)}
              className="min-w-0 pl-5 flex-[0_0_88%] md:flex-[0_0_50%] xl:flex-[0_0_min(31.2%,392px)]"
              key={category._id}
            >
              <div
                className="relative overflow-hidden rounded-[10px] bg-[#d9d9d9] [isolation:isolate]"
                aria-label={`${category.name} category, ${category.vehiclesCount} vehicles`}
              >
                <img
                  src={resolveAssetPath(category.coverImage)}
                  alt={category.name}
                  className="h-full w-full object-contain"
                  loading="lazy"
                />

                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0)_41%,rgba(0,0,0,0.68)_100%),linear-gradient(90deg,rgba(0,0,0,0.04)_0%,rgba(0,0,0,0)_28%)]" />

                <div className="absolute bottom-4 left-[18px] right-[18px]">
                  <h3 className="m-0 text-[18px] font-bold tracking-[-0.03em] text-white">
                    {category.name}
                  </h3>
                </div>
              </div>
            </Link>
          ))
        : null}

      {loadState === "success" && categories.length === 0 ? (
        <div className="w-full rounded-[10px] border border-[#ececec] bg-[#fafafa] p-8 text-[16px] leading-[1.6] text-[#4f4f4f]">
          No visible categories found in the database.
        </div>
      ) : null}

      {loadState === "error" ? (
        <div className="w-full rounded-[10px] border border-[#ececec] bg-[#fafafa] p-8 text-[16px] leading-[1.6] text-[#4f4f4f]">
          {errorMessage || "Unable to load vehicle categories."}
        </div>
      ) : null}
    </CarouselShell>
  )
}
