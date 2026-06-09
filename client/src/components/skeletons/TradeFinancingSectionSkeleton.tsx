import SectionHeadingSkeleton from "./SectionHeadingSkeleton"

export default function TradeFinancingSectionSkeleton() {
  return (
    <section className="bg-paper px-4 py-[100px] md:px-6 xl:px-8">
      <div className="mx-auto grid max-w-[1440px] gap-8 xl:items-stretch">
        <SectionHeadingSkeleton className="pl-5" />

        <div className="overflow-hidden border border-border-soft bg-paper">
          <div className="grid md:grid-cols-2">
            {Array.from({ length: 2 }, (_, index) => (
              <article
                key={index}
                className="border-b border-frost px-5 py-6 last:border-b-0 md:min-h-[260px] md:border-b-0 md:border-r md:last:border-r-0 md:px-8"
              >
                <div className="flex h-full flex-col justify-between">
                  <div>
                    <div className="h-11 w-11 animate-pulse rounded-[10px] bg-cloud" />
                    <div className="mt-5 h-8 w-36 animate-pulse rounded-full bg-cloud" />
                    <div className="mt-3 h-4 w-full max-w-[320px] animate-pulse rounded-full bg-cloud" />
                    <div className="mt-2 h-4 w-[72%] animate-pulse rounded-full bg-cloud" />
                  </div>

                  <div className="mt-8 h-4 w-28 animate-pulse rounded-full bg-cloud" />
                </div>
              </article>
            ))}
          </div>

          <div className="min-h-[632px] animate-pulse bg-cloud" />
        </div>
      </div>
    </section>
  )
}
