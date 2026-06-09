import type { ReactNode } from "react"
import { Link } from "react-router-dom"
import type { VehicleCard as VehicleCardData } from "../../types/vehicle"
import { resolveAssetPath } from "../../utils/assets"
import {
  formatVehicleMileage,
  formatVehiclePrice,
  getVehicleDisplayName,
} from "../../utils/vehicle"

type VehicleCardProps = {
  vehicle: VehicleCardData
  className?: string
  sizes?: string
}

function cx(...values: Array<string | false | null | undefined>) {
  return values.filter(Boolean).join(" ")
}

function MetaItem({
  icon,
  alt,
  children,
}: {
  icon: string
  alt: string
  children: ReactNode
}) {
  return (
    <span className="flex items-center gap-2 whitespace-nowrap">
      <img src={icon} className="h-4 w-4" alt={alt} />
      {children}
    </span>
  )
}

export function VehicleCardSkeleton({ className }: { className?: string }) {
  return (
    <div
      className={cx(
        "overflow-hidden rounded-[10px] bg-paper",
        className
      )}
    >
      <div className="aspect-[360/260] animate-pulse rounded-t-[10px] bg-cloud" />

      <div className="space-y-[5px] rounded-b-[10px] border-b border-l border-r border-border-soft p-5">
        <div className="flex items-start justify-between gap-5">
          <div className="h-8 w-1/2 rounded-full bg-cloud" />
          <div className="h-5 w-20 rounded-full bg-cloud" />
        </div>

        <div className="flex gap-[15px]">
          <div className="h-5 w-20 rounded-full bg-cloud" />
          <div className="h-5 w-24 rounded-full bg-cloud" />
          <div className="h-5 w-14 rounded-full bg-cloud" />
        </div>
      </div>
    </div>
  )
}

export default function VehicleCard({
  vehicle,
  className,
  sizes,
}: VehicleCardProps) {
  return (
    <article className={cx("group overflow-hidden rounded-[10px] bg-paper", className)}>
      <Link to={`/vehicles/${vehicle.slug}`} className="block h-full">
        <div className="relative overflow-hidden rounded-t-[10px] bg-cloud">
          <img
            src={resolveAssetPath(vehicle.featuredImage)}
            alt={getVehicleDisplayName(vehicle.name)}
            className="aspect-[360/260] h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
            style={{ objectPosition: vehicle.featuredImageObjectPosition || "center" }}
            loading="lazy"
            sizes={sizes}
          />
        </div>

        <div className="flex flex-col gap-[5px] rounded-b-[10px] border-b border-l border-r border-border-soft p-5">
          <div className="flex items-start justify-between gap-5">
            <h3 className="text-[18px] font-medium leading-[1.8] tracking-[-0.02em] text-obsidian">
              {getVehicleDisplayName(vehicle.name)}
            </h3>

            <p className="shrink-0 whitespace-nowrap pt-[2px] text-[16px] font-normal leading-[1.7] tracking-[-0.01em] text-obsidian">
              {formatVehiclePrice(vehicle.price)}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-x-[15px] gap-y-1 text-[15px] font-normal leading-[1.6] tracking-[-0.01em] text-graphite">
            <MetaItem icon="/cars/mileage.svg" alt="Mileage">
              {formatVehicleMileage(vehicle.mileage)} mi
            </MetaItem>
            <MetaItem icon="/cars/transmission.svg" alt="Transmission">
              {vehicle.transmission || "Automatic"}
            </MetaItem>
            <MetaItem icon="/cars/calendar.svg" alt="Year">
              {vehicle.year || "Latest"}
            </MetaItem>
          </div>
        </div>
      </Link>
    </article>
  )
}
