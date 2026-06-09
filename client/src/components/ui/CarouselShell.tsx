import { useEffect, useState, type ReactNode } from "react"
import useEmblaCarousel from "embla-carousel-react"
import { ArrowLeft, ArrowRight } from "lucide-react"

type CarouselShellProps = {
  heading: ReactNode
  children: ReactNode
  prevLabel: string
  nextLabel: string
  options?: Parameters<typeof useEmblaCarousel>[0]
  sectionClassName?: string
  containerClassName?: string
  headerClassName?: string
  controlsClassName?: string
  viewportClassName?: string
  trackClassName?: string
  buttonClassName?: string
}

function cx(...values: Array<string | false | null | undefined>) {
  return values.filter(Boolean).join(" ")
}

export default function CarouselShell({
  heading,
  children,
  prevLabel,
  nextLabel,
  options,
  sectionClassName,
  containerClassName = "mx-auto max-w-[1440px]",
  headerClassName = "flex flex-col gap-6 md:flex-row md:justify-between",
  controlsClassName,
  viewportClassName = "mt-10 overflow-hidden",
  trackClassName = "flex",
  buttonClassName,
}: CarouselShellProps) {
  const [canScrollPrev, setCanScrollPrev] = useState(false)
  const [canScrollNext, setCanScrollNext] = useState(false)
  const [emblaRef, emblaApi] = useEmblaCarousel(options)

  useEffect(() => {
    if (!emblaApi) {
      return
    }

    const api = emblaApi

    function updateControls() {
      setCanScrollPrev(api.canScrollPrev())
      setCanScrollNext(api.canScrollNext())
    }

    updateControls()
    api.on("select", updateControls)
    api.on("reInit", updateControls)

    return () => {
      api.off("select", updateControls)
      api.off("reInit", updateControls)
    }
  }, [emblaApi])

  return (
    <section className={sectionClassName}>
      <div className={containerClassName}>
        <div className={headerClassName}>
          {heading}

          <div
            className={cx("inline-flex items-center gap-[10px]", controlsClassName)}
            aria-label="Carousel controls"
          >
            <button
              type="button"
              className={cx(
                "inline-flex h-10 w-10 items-center justify-center rounded-[4px] border border-border-soft bg-paper text-obsidian transition-[border-color,color,background-color,opacity] duration-200 hover:bg-cloud disabled:cursor-default disabled:opacity-[0.42]",
                buttonClassName
              )}
              onClick={() => emblaApi?.scrollPrev()}
              aria-label={prevLabel}
              disabled={!canScrollPrev}
            >
              <ArrowLeft size={20} strokeWidth={1.8} />
            </button>

            <button
              type="button"
              className={cx(
                "inline-flex h-10 w-10 items-center justify-center rounded-[4px] border border-border-soft bg-paper text-obsidian transition-[border-color,color,background-color,opacity] duration-200 hover:bg-cloud disabled:cursor-default disabled:opacity-[0.42]",
                buttonClassName
              )}
              onClick={() => emblaApi?.scrollNext()}
              aria-label={nextLabel}
              disabled={!canScrollNext}
            >
              <ArrowRight size={20} strokeWidth={1.8} />
            </button>
          </div>
        </div>

        <div className={viewportClassName} ref={emblaRef}>
          <div className={trackClassName}>{children}</div>
        </div>
      </div>
    </section>
  )
}
