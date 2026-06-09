export default function ReadyToFindSectionSkeleton() {
  return (
    <section className="bg-paper px-0">
      <div className="flex w-full justify-center">
        <div className="relative min-h-[600px] w-full overflow-hidden bg-obsidian min-[810px]:min-h-[700px]">
          <div className="relative z-[4] flex w-full max-w-[1800px] flex-col items-start gap-[25px] px-5 pb-0 pt-5 min-[810px]:gap-[30px] min-[810px]:p-[30px] min-[1200px]:p-[40px]">
            <div className="flex w-full max-w-[350px] flex-col items-start gap-3 min-[810px]:max-w-[500px] min-[1200px]:max-w-[700px]">
              <div className="h-12 w-[260px] animate-pulse rounded-[18px] bg-white/10 min-[810px]:h-16 min-[810px]:w-[420px]" />
              <div className="h-12 w-[220px] animate-pulse rounded-[18px] bg-white/10 min-[810px]:h-16 min-[810px]:w-[360px]" />
            </div>

            <div className="h-[46px] w-[150px] animate-pulse rounded-[6px] bg-white/10" />
          </div>

          <div className="absolute inset-0 animate-pulse bg-white/5" />
        </div>
      </div>
    </section>
  )
}
