import SectionHeadingSkeleton from "./SectionHeadingSkeleton"

export default function VehicleCategoriesSectionSkeleton() {
  return (
    <section className="bg-paper px-0 py-[100px]">
      <div className="mx-auto max-w-[1440px] px-4 md:px-6 xl:px-8">
        <div className="mb-7 flex flex-col gap-6 md:mb-[38px] md:flex-row md:items-start md:justify-between md:gap-8">
          <SectionHeadingSkeleton />

          <div className="hidden shrink-0 gap-3 md:flex md:pt-[10px]">
            <div className="h-10 w-10 animate-pulse rounded-[4px] bg-cloud" />
            <div className="h-10 w-10 animate-pulse rounded-[4px] bg-cloud" />
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 4 }, (_, index) => (
            <div
              key={index}
              className="relative overflow-hidden rounded-[10px] bg-[linear-gradient(180deg,#f2f2f2_0%,#ebebeb_55%,#dfdfdf_100%)]"
            >
              <div className="absolute inset-0 animate-pulse bg-[linear-gradient(110deg,rgba(255,255,255,0.12)_0%,rgba(255,255,255,0.4)_45%,rgba(255,255,255,0.12)_100%)]" />
              <div className="pt-[68%]" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
