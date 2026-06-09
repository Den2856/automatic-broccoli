import VehicleCard from "../ui/VehicleCard"
import type { VehicleCard as VehicleCardData } from "../../types/vehicle"

type VehicleRelatedSectionProps = {
  vehicles: VehicleCardData[]
}

export default function VehicleRelatedSection({
  vehicles,
}: VehicleRelatedSectionProps) {
  if (vehicles.length === 0) {
    return null
  }

  return (
    <section className="bg-paper px-4 pb-[88px] md:px-6 md:pb-[100px] xl:px-10 xl:pb-[120px]">
      <div className="mx-auto max-w-[1800px]">
        <div className="flex flex-col gap-[10px]">
          <p className="inline-flex items-center gap-[10px] text-[13px] font-medium tracking-[-0.02em] text-graphite">
            <span className="h-1 w-1 rounded-full bg-current" />
            Suggested vehicles
          </p>

          <h2 className="text-[38px] font-medium leading-[1.08] tracking-[-0.06em] text-obsidian md:text-[44px] xl:text-[46px]">
            Vehicles you might like
          </h2>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {vehicles.map((vehicle) => (
            <VehicleCard
              key={vehicle._id}
              vehicle={vehicle}
              sizes="(min-width: 1280px) 360px, (min-width: 768px) calc((100vw - 92px) / 2), calc(100vw - 32px)"
            />
          ))}
        </div>
      </div>
    </section>
  )
}
