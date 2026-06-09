import HeaderSkeleton from "./HeaderSkeleton"

export default function HomeHeroSkeleton() {
  return (
    <section className="relative min-h-[680px] overflow-hidden bg-obsidian text-paper sm:min-h-[760px] lg:h-[860px] lg:min-h-0">
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.04)_0%,rgba(255,255,255,0.02)_100%)]" />

      <HeaderSkeleton theme="overlay" />

      <div className="relative mx-auto flex min-h-[680px] max-w-[1440px] items-end px-4 pb-10 pt-28 sm:min-h-[760px] sm:px-6 sm:pb-14 sm:pt-36 lg:h-full lg:min-h-0 lg:px-8 lg:pb-0 lg:pt-0">
        <div className="w-full max-w-[470px] pb-4 lg:absolute lg:left-8 lg:top-[336px] lg:pb-0">
          <div className="h-12 w-[260px] animate-pulse rounded-[18px] bg-white/10 sm:h-14 sm:w-[340px] lg:h-16 lg:w-[420px]" />
          <div className="mt-3 h-12 w-[220px] animate-pulse rounded-[18px] bg-white/10 sm:h-14 sm:w-[320px] lg:h-16 lg:w-[400px]" />
          <div className="mt-6 h-4 w-[260px] animate-pulse rounded-full bg-white/10 sm:w-[360px]" />
          <div className="mt-2 h-4 w-[220px] animate-pulse rounded-full bg-white/10 sm:w-[300px]" />

          <div className="mt-6 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:items-center">
            <div className="h-[46px] w-full animate-pulse rounded-[6px] bg-white/14 sm:w-[164px]" />
            <div className="h-[46px] w-full animate-pulse rounded-[6px] bg-white/8 sm:w-[172px]" />
          </div>
        </div>
      </div>
    </section>
  )
}
