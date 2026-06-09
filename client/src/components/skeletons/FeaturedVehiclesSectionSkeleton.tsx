import { VehicleCardSkeleton } from "../ui/VehicleCard"
import SectionHeadingSkeleton from "./SectionHeadingSkeleton"

export default function FeaturedVehiclesSectionSkeleton() {
  return (
    <section className="bg-paper px-4 md:px-6 xl:px-8">
      <div className="mx-auto max-w-[1440px]">
        <SectionHeadingSkeleton align="center" className="mx-auto" />

        <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 3 }, (_, index) => (
            <VehicleCardSkeleton key={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
