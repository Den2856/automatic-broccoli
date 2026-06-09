import SectionHeadingSkeleton from "./SectionHeadingSkeleton"

export default function AboutDrivehubSectionSkeleton() {
  return (
    <section className="bg-paper px-4 py-[100px] md:px-6 xl:px-8">
      <div className="mx-auto max-w-[1440px] overflow-hidden bg-obsidian">
        <div className="relative min-h-[480px] md:min-h-[560px]">
          <div className="absolute inset-0 animate-pulse bg-white/5" />

          <div className="relative flex min-h-[480px] items-end px-5 py-6 md:min-h-[560px] md:px-8 md:py-8 xl:px-10 xl:py-10">
            <div className="flex w-full flex-row justify-between max-md:flex-col max-md:items-start max-md:gap-[25px]">
              <SectionHeadingSkeleton />
              <div className="h-[46px] w-full max-w-[160px] animate-pulse rounded-[6px] bg-white/10 max-md:max-w-full md:self-end" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
