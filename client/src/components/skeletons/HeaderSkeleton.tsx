type HeaderSkeletonProps = {
  theme?: "overlay" | "light"
  containerClassName?: string
}

function cx(...values: Array<string | false | null | undefined>) {
  return values.filter(Boolean).join(" ")
}

export default function HeaderSkeleton({
  theme = "overlay",
  containerClassName = "max-w-[1280px] px-4 sm:px-6 lg:px-8",
}: HeaderSkeletonProps) {
  const isLight = theme === "light"

  return (
    <div
      className={cx(
        "inset-x-0 top-0 z-40",
        isLight ? "relative bg-paper" : "absolute"
      )}
      aria-hidden="true"
    >
      <div className={cx("mx-auto", containerClassName)}>
        <div
          className={cx(
            "hidden h-[26px] items-center gap-4 overflow-hidden border-b lg:flex",
            isLight ? "border-border-soft" : "border-paper/10"
          )}
        >
          <div className="h-3 w-32 animate-pulse rounded-full bg-cloud/80" />
          <div className="h-3 w-px bg-cloud/60" />
          <div className="h-3 w-28 animate-pulse rounded-full bg-cloud/80" />
          <div className="h-3 w-px bg-cloud/60" />
          <div className="h-3 w-40 animate-pulse rounded-full bg-cloud/80" />
        </div>

        <div className="flex h-[72px] items-center justify-between lg:h-[64px]">
          <div className="h-5 w-20 animate-pulse rounded-full bg-cloud/80" />

          <div className="hidden items-center gap-10 lg:flex">
            {Array.from({ length: 4 }, (_, index) => (
              <div
                key={index}
                className="h-4 w-14 animate-pulse rounded-full bg-cloud/80"
              />
            ))}
          </div>

          <div className="flex items-center gap-3">
            <div className="h-10 w-10 animate-pulse rounded-full bg-cloud/80" />
            <div className="hidden h-11 w-28 animate-pulse rounded-[6px] bg-cloud/80 sm:block" />
            <div className="h-10 w-10 animate-pulse rounded-full bg-cloud/80 lg:hidden" />
          </div>
        </div>
      </div>
    </div>
  )
}
