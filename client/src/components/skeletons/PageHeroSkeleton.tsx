import HeaderSkeleton from "./HeaderSkeleton"

export default function PageHeroSkeleton() {
  return (
    <section className="bg-paper px-4 pt-4 text-paper md:px-5 md:pt-5 xl:px-5 xl:pt-5">
      <div className="mx-auto max-w-[1800px]">
        <div className="relative min-h-[420px] overflow-hidden rounded-[10px] bg-obsidian sm:min-h-[500px] xl:min-h-[610px]">
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.06)_0%,rgba(255,255,255,0.02)_100%)]" />

          <HeaderSkeleton
            theme="overlay"
            containerClassName="max-w-none px-4 md:px-6 xl:px-6"
          />

          <div className="relative mx-auto flex min-h-[420px] max-w-none items-end px-4 pb-8 pt-28 sm:min-h-[500px] sm:px-6 sm:pb-10 sm:pt-32 xl:min-h-[610px] xl:px-6 xl:pb-8 xl:pt-36">
            <div className="w-full">
              <div className="h-14 w-[280px] animate-pulse rounded-[18px] bg-white/10 sm:h-16 sm:w-[420px] xl:h-20 xl:w-[540px]" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
