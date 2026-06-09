import { MapPin, Star } from "lucide-react"
import type { VehicleDetail } from "../../types/vehicle"
import { formatVehiclePrice } from "../../utils/vehicle"

type VehicleDealerCardProps = {
  vehicle: VehicleDetail
  className?: string
}

function cx(...values: Array<string | false | null | undefined>) {
  return values.filter(Boolean).join(" ")
}

export default function VehicleDealerCard({
  vehicle,
  className,
}: VehicleDealerCardProps) {
  return (
    <aside className={cx("w-full shrink-0 xl:sticky xl:top-5 xl:max-w-[400px]", className)}>
      <div className="rounded-[10px] border border-border-soft bg-paper p-5">
        <div className="flex flex-wrap items-end gap-[10px]">
          <p className="text-[24px] font-medium leading-[1.5] tracking-[-0.03em] text-obsidian">
            {formatVehiclePrice(vehicle.price)}
          </p>

          {vehicle.monthlyPayment ? (
            <p className="pb-[3px] text-[15px] leading-[1.6] tracking-[-0.01em] text-graphite">
              {vehicle.monthlyPayment}
            </p>
          ) : null}
        </div>

        <a
          href="mailto:hello@drivehub.com"
          className="mt-5 inline-flex h-[44px] w-full items-center justify-center rounded-[5px] bg-obsidian px-5 text-[14px] font-medium text-paper transition-opacity duration-200 hover:opacity-90"
        >
          Contact Sales
        </a>

        <div className="mt-5 flex flex-col gap-[10px]">
          <p className="text-[15px] font-medium leading-[1.6] tracking-[-0.01em] text-obsidian">
            {vehicle.dealerName}
          </p>

          <a
            href={vehicle.dealerMapUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-start gap-2 text-[15px] leading-[1.6] tracking-[-0.01em] text-graphite transition-opacity duration-200 hover:opacity-75"
          >
            <MapPin size={16} strokeWidth={1.9} className="mt-[3px] shrink-0" />
            <span>{vehicle.dealerAddress}</span>
          </a>
        </div>

        <div className="mt-5 border-t border-border-soft pt-4">
          <div className="flex items-center gap-3">
            <p className="text-[15px] font-medium leading-[1.6] tracking-[-0.01em] text-obsidian">
              {vehicle.dealerRating.toFixed(1)}
            </p>

            <div className="flex items-center gap-1 text-[#F0B640]">
              {Array.from({ length: 5 }, (_, index) => (
                <Star
                  key={index}
                  size={15}
                  strokeWidth={1.7}
                  fill="currentColor"
                  className="shrink-0"
                />
              ))}
            </div>
          </div>

          <p className="mt-1 text-[14px] leading-[1.6] tracking-[-0.01em] text-graphite">
            Average customer rating
          </p>
        </div>
      </div>
    </aside>
  )
}
