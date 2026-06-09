import { VehicleCardSkeleton } from "../ui/VehicleCard"

export default function VehicleRelatedSectionSkeleton() {
  return (
    <section className="bg-paper px-4 pb-[88px] md:px-6 md:pb-[100px] xl:px-10 xl:pb-[120px]">
      <div className="mx-auto max-w-[1800px]">
        <div className="flex flex-col gap-[10px]">
          <div className="h-3.5 w-28 animate-pulse rounded-full bg-cloud" />
          <div className="h-12 w-[320px] animate-pulse rounded-full bg-cloud md:w-[420px]" />
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 3 }, (_, index) => (
            <VehicleCardSkeleton key={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
