import { VehicleCardSkeleton } from "../ui/VehicleCard"

export default function VehicleCatalogSectionSkeleton() {
  return (
    <section
      id="vehicles"
      className="bg-paper px-4 pb-[88px] pt-10 md:px-6 md:pb-[100px] md:pt-12 xl:px-10 xl:pb-[120px]"
    >
      <div className="mx-auto max-w-[1800px]">
        <div className="mb-8 inline-flex h-[38px] items-center gap-[10px] rounded-[6px] bg-obsidian px-[14px] text-[15px] font-medium leading-none tracking-[-0.02em] text-paper min-[769px]:hidden">
          <div className="h-4 w-4 animate-pulse rounded-full bg-white/20" />
          <div className="h-4 w-28 animate-pulse rounded-full bg-white/20" />
        </div>

        <div className="grid items-start gap-6 min-[769px]:grid-cols-[240px_minmax(0,1fr)] min-[769px]:gap-5">
          <div className="hidden rounded-[12px] border border-border-soft bg-paper p-6 min-[769px]:block">
            <div className="space-y-[22px]">
              {Array.from({ length: 5 }, (_, index) => (
                <div key={index} className="space-y-3">
                  <div className="h-5 w-24 animate-pulse rounded-full bg-cloud" />
                  <div className="space-y-3">
                    {Array.from({ length: 3 }, (_, optionIndex) => (
                      <div key={optionIndex} className="flex items-center gap-3">
                        <div className="h-4 w-4 animate-pulse rounded-[4px] bg-cloud" />
                        <div className="h-4 w-20 animate-pulse rounded-full bg-cloud" />
                      </div>
                    ))}
                  </div>
                </div>
              ))}

              <div className="space-y-[10px]">
                <div className="h-5 w-20 animate-pulse rounded-full bg-cloud" />
                <div className="h-4 w-28 animate-pulse rounded-full bg-cloud" />
                <div className="h-5 animate-pulse rounded-full bg-cloud" />
              </div>
            </div>
          </div>

          <div className="grid gap-5 xl:grid-cols-2 2xl:grid-cols-3">
            {Array.from({ length: 6 }, (_, index) => (
              <VehicleCardSkeleton key={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
