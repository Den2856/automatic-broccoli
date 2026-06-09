export default function VehicleDetailSectionSkeleton() {
  return (
    <div className="mt-5">
      <div className="grid gap-[10px] xl:grid-cols-[minmax(0,1.55fr)_minmax(0,1fr)]">
        <div className="h-[280px] animate-pulse rounded-[10px] bg-cloud md:h-[420px] xl:h-[464px]" />

        <div className="grid grid-cols-2 gap-[10px]">
          {Array.from({ length: 4 }, (_, index) => (
            <div
              key={index}
              className="h-[135px] animate-pulse rounded-[10px] bg-cloud md:h-[205px] xl:h-[227px]"
            />
          ))}
        </div>
      </div>

      <div className="mt-12 grid gap-10 xl:grid-cols-[minmax(0,1fr)_400px] xl:gap-10">
        <div className="space-y-8">
          <div className="space-y-4">
            <div className="h-12 w-72 rounded-full bg-cloud" />
            <div className="h-5 w-full max-w-[720px] rounded-full bg-cloud" />
            <div className="h-5 w-full max-w-[620px] rounded-full bg-cloud" />
          </div>

          <div className="space-y-4">
            <div className="h-8 w-44 rounded-full bg-cloud" />
            {Array.from({ length: 5 }, (_, index) => (
              <div key={index} className="h-6 w-full rounded-full bg-cloud" />
            ))}
          </div>
        </div>

        <div className="h-[260px] animate-pulse rounded-[10px] bg-cloud" />
      </div>
    </div>
  )
}
