import SectionHeadingSkeleton from "./SectionHeadingSkeleton"

export default function TrustedPartnersSectionSkeleton() {
  return (
    <section className="bg-paper px-4 md:px-6 xl:px-8">
      <div className="mx-auto max-w-[1440px]">
        <SectionHeadingSkeleton align="center" className="mx-auto" />

        <div className="mt-12 grid grid-cols-2 grid-rows-3 overflow-hidden rounded-[18px]">
          {Array.from({ length: 6 }, (_, index) => (
            <div
              key={index}
              className="flex min-h-[116px] items-center justify-center border border-border-soft bg-paper"
            >
              <div className="h-8 w-28 animate-pulse rounded-full bg-cloud" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
