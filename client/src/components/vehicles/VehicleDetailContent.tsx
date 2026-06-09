import { Check } from "lucide-react"
import type { VehicleDetail } from "../../types/vehicle"
import { formatVehicleMileage, getVehicleDisplayName } from "../../utils/vehicle"
import VehicleDealerCard from "./VehicleDealerCard"
import VehicleGallery from "./VehicleGallery"

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-6 border-b border-border-soft py-4 text-[15px] leading-[1.6] tracking-[-0.01em] md:text-[16px]">
      <span className="text-graphite">{label}</span>
      <span className="text-right text-obsidian">{value}</span>
    </div>
  )
}

type VehicleDetailContentProps = {
  vehicle: VehicleDetail
}

export default function VehicleDetailContent({
  vehicle,
}: VehicleDetailContentProps) {
  return (
    <>
      <VehicleGallery vehicle={vehicle} />

      <div className="mt-12 flex flex-col gap-12 xl:mt-[60px] xl:flex-row xl:items-start xl:justify-between xl:gap-10">
        <div className="min-w-0 flex-1 xl:pr-[60px]">
          <div className="flex flex-col gap-10">
            <div className="flex flex-col gap-[10px]">
              <h1 className="text-[38px] font-medium leading-[1.08] tracking-[-0.06em] text-obsidian md:text-[44px] xl:text-[46px]">
                {getVehicleDisplayName(vehicle.name)}
              </h1>

              <p className="max-w-[760px] text-[16px] leading-[1.7] tracking-[-0.02em] text-graphite md:text-[18px]">
                {vehicle.description}
              </p>
            </div>

            <section>
              <h2 className="text-[28px] font-medium leading-[1.35] tracking-[-0.05em] text-obsidian md:text-[30px]">
                Key information
              </h2>

              <div className="mt-5">
                <DetailRow
                  label="Mileage"
                  value={`${formatVehicleMileage(vehicle.mileage)} mi`}
                />
                <DetailRow label="Condition" value={vehicle.condition} />
                <DetailRow
                  label="Year"
                  value={vehicle.year ? String(vehicle.year) : "Latest"}
                />
                <DetailRow label="Vehicle Type" value={vehicle.bodyType} />
                <DetailRow
                  label="Transmission"
                  value={vehicle.transmission || "Automatic"}
                />
              </div>
            </section>

            <section>
              <h2 className="text-[28px] font-medium leading-[1.35] tracking-[-0.05em] text-obsidian md:text-[30px]">
                Features
              </h2>

              <div className="mt-5">
                {vehicle.features.map((feature) => (
                  <div
                    key={feature}
                    className="flex items-center gap-3 border-b border-border-soft py-4 text-[15px] leading-[1.6] tracking-[-0.01em] text-obsidian md:text-[16px]"
                  >
                    <Check size={16} strokeWidth={2} className="shrink-0" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>

        <VehicleDealerCard vehicle={vehicle} />
      </div>
    </>
  )
}
