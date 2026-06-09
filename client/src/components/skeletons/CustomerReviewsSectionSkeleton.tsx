import SectionHeadingSkeleton from "./SectionHeadingSkeleton"

export default function CustomerReviewsSectionSkeleton() {
  return (
    <section className="bg-paper px-4 py-[72px] md:px-6 md:py-[88px] xl:px-8 xl:py-[110px]">
      <div className="mx-auto max-w-[1440px]">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeadingSkeleton />

          <div className="hidden gap-3 md:flex">
            <div className="h-10 w-10 animate-pulse rounded-[4px] bg-cloud" />
            <div className="h-10 w-10 animate-pulse rounded-[4px] bg-cloud" />
          </div>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {Array.from({ length: 2 }, (_, index) => (
            <div
              key={index}
              className="h-[420px] animate-pulse rounded-[10px] bg-cloud md:h-[500px]"
            />
          ))}
        </div>
      </div>
    </section>
  )
}
