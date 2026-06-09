import VehicleFilterSidebar from "../ui/VehicleFilterSidebar"
import VehicleCard from "../ui/VehicleCard"
import VehicleCatalogSectionSkeleton from "../skeletons/VehicleCatalogSectionSkeleton"
import type { VehicleCard as VehicleCardData } from "../../types/vehicle"
import type {
  VehicleFilterGroup,
  VehicleFilters,
  VehicleFilterRange,
} from "../../utils/vehicleFilters"

type LoadState = "idle" | "loading" | "success" | "error"

type VehicleCatalogSectionProps = {
  loadState: LoadState
  errorMessage: string
  filters: VehicleFilters
  onFiltersChange: (nextFilters: VehicleFilters) => void
  filterGroups: VehicleFilterGroup[]
  mileageBounds: VehicleFilterRange
  priceBounds: VehicleFilterRange
  vehicles: VehicleCardData[]
  filteredVehicles: VehicleCardData[]
  isFilterDialogOpen: boolean
  onOpenFilterDialog: () => void
  onCloseFilterDialog: () => void
}

function cx(...values: Array<string | false | null | undefined>) {
  return values.filter(Boolean).join(" ")
}

export default function VehicleCatalogSection({
  loadState,
  errorMessage,
  filters,
  onFiltersChange,
  filterGroups,
  mileageBounds,
  priceBounds,
  vehicles,
  filteredVehicles,
  isFilterDialogOpen,
  onOpenFilterDialog,
  onCloseFilterDialog,
}: VehicleCatalogSectionProps) {
  if (loadState === "loading" || loadState === "idle") {
    return <VehicleCatalogSectionSkeleton />
  }

  const hasVehicles = vehicles.length > 0

  return (
    <>
      <section
        id="vehicles"
        className="bg-paper px-4 pb-[88px] pt-10 md:px-6 md:pb-[100px] md:pt-12 xl:px-10 xl:pb-[120px]"
      >
        <div className="mx-auto max-w-[1800px]">
          {hasVehicles ? (
            <button
              type="button"
              onClick={onOpenFilterDialog}
              className="mb-8 inline-flex h-[38px] items-center gap-[10px] rounded-[6px] bg-obsidian px-[14px] text-[15px] font-medium leading-none tracking-[-0.02em] text-paper min-[769px]:hidden"
            >
              <svg
                viewBox="0 0 20 20"
                className="h-4 w-4 shrink-0"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  d="M4 5H16M7 10H13M9 15H11"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
                <circle cx="6" cy="5" r="1.5" fill="currentColor" />
                <circle cx="12" cy="10" r="1.5" fill="currentColor" />
                <circle cx="10" cy="15" r="1.5" fill="currentColor" />
              </svg>
              <span>Filter vehicles</span>
            </button>
          ) : null}

          <div
            className={cx(
              "grid items-start gap-6",
              hasVehicles && "min-[769px]:grid-cols-[240px_minmax(0,1fr)] min-[769px]:gap-5"
            )}
          >
            {hasVehicles ? (
              <VehicleFilterSidebar
                filters={filters}
                onChange={onFiltersChange}
                groups={filterGroups}
                mileageBounds={mileageBounds}
                priceBounds={priceBounds}
                className="hidden min-[769px]:sticky min-[769px]:top-6 min-[769px]:block"
              />
            ) : null}

            <div className="grid gap-5 xl:grid-cols-2 2xl:grid-cols-3">
              {loadState === "success" &&
                filteredVehicles.map((vehicle) => (
                  <VehicleCard
                    key={vehicle._id}
                    vehicle={vehicle}
                    sizes="(min-width: 1536px) 360px, (min-width: 768px) calc((100vw - 140px) / 2), calc(100vw - 32px)"
                  />
                ))}

              {loadState === "success" && vehicles.length === 0 ? (
                <div className="col-span-full rounded-[14px] border border-border-soft bg-cloud px-6 py-8 text-[16px] text-graphite">
                  No vehicles found in the database.
                </div>
              ) : null}

              {loadState === "success" &&
              vehicles.length > 0 &&
              filteredVehicles.length === 0 ? (
                <div className="col-span-full rounded-[14px] border border-border-soft bg-cloud px-6 py-8 text-[16px] text-graphite">
                  No vehicles match the current filters.
                </div>
              ) : null}

              {loadState === "error" ? (
                <div className="col-span-full rounded-[14px] border border-border-soft bg-cloud px-6 py-8 text-[16px] text-graphite">
                  {errorMessage || "Unable to load vehicles."}
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </section>

      {isFilterDialogOpen && hasVehicles ? (
        <div
          className="fixed inset-0 z-[70] flex items-start justify-center bg-obsidian/45 px-4 py-6 min-[769px]:hidden"
          onClick={onCloseFilterDialog}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Filter vehicles"
            className="flex max-h-[calc(100vh-48px)] w-full max-w-[420px] flex-col overflow-hidden rounded-[12px] bg-paper shadow-[0_18px_60px_rgba(0,0,0,0.18)]"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-border-soft px-5 py-4">
              <p className="text-[18px] font-medium leading-[1.3] tracking-[-0.03em] text-obsidian">
                Filter vehicles
              </p>

              <button
                type="button"
                onClick={onCloseFilterDialog}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-border-soft text-obsidian transition-colors duration-200 hover:bg-cloud"
                aria-label="Close filters"
              >
                <svg
                  viewBox="0 0 20 20"
                  className="h-4 w-4"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M5 5L15 15M15 5L5 15"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
            </div>

            <div className="overflow-y-auto">
              <VehicleFilterSidebar
                filters={filters}
                onChange={onFiltersChange}
                groups={filterGroups}
                mileageBounds={mileageBounds}
                priceBounds={priceBounds}
                className="rounded-none border-0 p-5"
              />
            </div>
          </div>
        </div>
      ) : null}
    </>
  )
}
