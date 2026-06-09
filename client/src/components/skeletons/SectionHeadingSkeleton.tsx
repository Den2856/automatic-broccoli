type SectionHeadingSkeletonProps = {
  align?: "left" | "center"
  className?: string
}

function cx(...values: Array<string | false | null | undefined>) {
  return values.filter(Boolean).join(" ")
}

export default function SectionHeadingSkeleton({
  align = "left",
  className,
}: SectionHeadingSkeletonProps) {
  return (
    <div
      className={cx(
        "flex flex-col gap-3",
        align === "center" && "items-center text-center",
        className
      )}
    >
      <div className="h-3.5 w-24 animate-pulse rounded-full bg-cloud" />

      <div className={cx("space-y-3", align === "center" && "flex flex-col items-center")}>
        <div className="h-10 w-[260px] animate-pulse rounded-full bg-cloud md:h-12 md:w-[420px]" />
        <div className="h-10 w-[220px] animate-pulse rounded-full bg-cloud md:h-12 md:w-[320px]" />
      </div>
    </div>
  )
}
