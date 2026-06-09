import SectionHeading from "../ui/SectionHeading"
import VehicleCard from "../ui/VehicleCard"
import type { VehicleCard as VehicleCardData } from "../../types/vehicle"

type AboutLatestVehiclesSectionProps = {
  eyebrow: string
  title: string
  vehicles: VehicleCardData[]
}

export default function AboutLatestVehiclesSection({
  eyebrow,
  title,
  vehicles,
}: AboutLatestVehiclesSectionProps) {
  return (
    <section className="bg-paper px-4 py-[72px] md:px-6 md:py-[92px] xl:px-10 xl:py-[110px]">
      <div className="mx-auto max-w-[1800px]">
        <SectionHeading
          eyebrow={eyebrow}
          title={title}
          align="center"
          titleSize="lg"
          maxWidth="md"
          className="mx-auto"
        />

        <div className="mt-10 grid gap-5 xl:grid-cols-3">
          {vehicles.map((vehicle) => (
            <VehicleCard
              key={vehicle._id}
              vehicle={vehicle}
              sizes="(min-width: 1200px) calc((100vw - 120px) / 3), (min-width: 810px) calc((100vw - 88px) / 2), calc(100vw - 32px)"
            />
          ))}
        </div>
      </div>
    </section>
  )
}
