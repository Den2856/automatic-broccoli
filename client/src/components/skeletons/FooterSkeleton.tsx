export default function FooterSkeleton() {
  return (
    <footer className="bg-obsidian px-4 pb-6 pt-12 md:px-6 md:pb-8 md:pt-16 xl:px-8 xl:pt-20">
      <div className="mx-auto max-w-[1440px]">
        <div className="grid gap-10 border-b border-paper/12 pb-10 md:grid-cols-2 xl:grid-cols-[1.3fr_1fr_1fr_1fr] xl:gap-8 xl:pb-14">
          <div>
            <div className="h-6 w-24 animate-pulse rounded-full bg-white/10" />
            <div className="mt-4 h-4 w-40 animate-pulse rounded-full bg-white/10" />
            <div className="mt-2 h-4 w-32 animate-pulse rounded-full bg-white/10" />

            <div className="mt-6 flex items-center gap-3">
              {Array.from({ length: 2 }, (_, index) => (
                <div
                  key={index}
                  className="h-11 w-11 animate-pulse rounded-full bg-white/10"
                />
              ))}
            </div>
          </div>

          {Array.from({ length: 3 }, (_, columnIndex) => (
            <div key={columnIndex}>
              <div className="h-3.5 w-24 animate-pulse rounded-full bg-white/10" />
              <div className="mt-5 space-y-3">
                {Array.from({ length: columnIndex === 0 ? 6 : 2 }, (_, index) => (
                  <div
                    key={index}
                    className="h-4 w-28 animate-pulse rounded-full bg-white/10"
                  />
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="pt-8">
          <div className="h-14 w-40 animate-pulse rounded-full bg-white/10 md:h-20 md:w-64 xl:h-28 xl:w-96" />
        </div>
      </div>
    </footer>
  )
}
