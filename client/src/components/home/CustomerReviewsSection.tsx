import { useEffect, useState } from "react"
import { Star } from "lucide-react"
import type {
  CustomerReviewCard,
  CustomerReviewResponse,
} from "../../types/vehicle"
import { resolveAssetPath } from "../../utils/assets"
import CustomerReviewsSectionSkeleton from "../skeletons/CustomerReviewsSectionSkeleton"
import SectionHeading from "../ui/SectionHeading"
import CarouselShell from "../ui/CarouselShell"
import { apiUrl } from "../../utils/api"

type LoadState = "idle" | "loading" | "success" | "error"
const testimonialImagePositionByName: Record<string, string> = {
  "Andrew S.": "50.5% 4.9%",
  "Sarah L.": "46.2% 5.7%",
}

function getReviewImagePosition(review: CustomerReviewCard) {
  return testimonialImagePositionByName[review.name] || "50% 8%"
}

export default function CustomerReviewsSection() {
  const [reviews, setReviews] = useState<CustomerReviewCard[]>([])
  const [loadState, setLoadState] = useState<LoadState>("idle")
  const [errorMessage, setErrorMessage] = useState("")

  useEffect(() => {
    const abortController = new AbortController()

    async function loadReviews() {
      try {
        setLoadState("loading")
        setErrorMessage("")

        const response = await fetch(apiUrl("/api/reviews"), {
          signal: abortController.signal,
        })

        if (!response.ok) {
          throw new Error(`Failed to load customer reviews: ${response.status}`)
        }

        const result = (await response.json()) as CustomerReviewResponse

        if (!result.success) {
          throw new Error(result.message || "Failed to load customer reviews")
        }

        setReviews(result.data)
        setLoadState("success")
      } catch (error) {
        if (abortController.signal.aborted) {
          return
        }

        setErrorMessage(
          error instanceof Error
            ? error.message
            : "Unable to load customer reviews"
        )
        setLoadState("error")
      }
    }

    loadReviews()

    return () => {
      abortController.abort()
    }
  }, [])

  if (loadState === "loading" || loadState === "idle") {
    return <CustomerReviewsSectionSkeleton />
  }

  return (
    <CarouselShell
      heading={
        <SectionHeading
          eyebrow="Testimonials"
          title="Customer Reviews"
          titleSize="lg"
          maxWidth="md"
        />
      }
      prevLabel="Previous review"
      nextLabel="Next review"
      options={{
        align: "start",
        loop: reviews.length > 2,
        dragFree: false,
      }}
      sectionClassName="bg-paper px-4 py-[72px] md:px-6 md:py-[88px] xl:px-8 xl:py-[110px]"
      containerClassName="mx-auto max-w-[1440px]"
      headerClassName="flex flex-col gap-6 md:flex-row md:items-end md:justify-between"
      viewportClassName="mt-10 overflow-hidden"
      trackClassName="flex -ml-5"
    >
      {loadState === "success" &&
        reviews.map((review) => (
          <article
            key={review._id}
            className="min-w-0 pl-5 flex-[0_0_100%] md:flex-[0_0_50%]"
          >
            <div className="relative flex h-[420px] items-end overflow-hidden rounded-[10px] p-5 md:h-[500px] md:p-[25px]">
              <img
                src={resolveAssetPath(review.avatar)}
                alt={review.name}
                className="absolute inset-0 h-full w-full object-cover"
                style={{ objectPosition: getReviewImagePosition(review) }}
                loading="lazy"
              />

              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(to top, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0.95) 3%, rgba(0, 0, 0, 0.88) 6%, rgba(0, 0, 0, 0.79) 9%, rgba(0, 0, 0, 0.69) 12%, rgba(0, 0, 0, 0.59) 15%, rgba(0, 0, 0, 0.49) 18%, rgba(0, 0, 0, 0.39) 21%, rgba(0, 0, 0, 0.31) 24%, rgba(0, 0, 0, 0.24) 27%, rgba(0, 0, 0, 0.18) 30%, rgba(0, 0, 0, 0.13) 34%, rgba(0, 0, 0, 0.09) 38%, rgba(0, 0, 0, 0.06) 43%, rgba(0, 0, 0, 0.04) 48%, rgba(0, 0, 0, 0.02) 54%, rgba(0, 0, 0, 0.01) 60%, rgba(0, 0, 0, 0.005) 70%, rgba(0, 0, 0, 0.002) 80%, rgba(0, 0, 0, 0.001) 90%, rgba(0, 0, 0, 0) 100%)",
                }}
              />

              <div className="relative z-[1] flex w-full max-w-[470px] flex-col items-start gap-[10px]">
                <div className="flex items-center">
                  {Array.from({ length: 5 }, (_, index) => (
                    <Star
                      key={`${review._id}-${index}`}
                      size={18}
                      strokeWidth={1.7}
                      fill="currentColor"
                      className={
                        index < review.rating ? "text-paper" : "text-paper/35"
                      }
                    />
                  ))}
                </div>

                <div className="flex w-full flex-col items-start gap-[3px]">
                  <p className="text-[17px] font-normal leading-[1.7] tracking-[-0.02em] text-paper">
                    {review.quote}
                  </p>

                  <p className="text-[16px] font-normal leading-[1.7] tracking-[-0.01em] text-paper/80">
                    {review.name}
                  </p>
                </div>
              </div>
            </div>
          </article>
        ))}

      {loadState === "success" && reviews.length === 0 ? (
        <div className="w-full rounded-[18px] border border-border-soft bg-cloud px-6 py-8 text-[16px] text-graphite">
          No customer reviews found in the database.
        </div>
      ) : null}

      {loadState === "error" ? (
        <div className="w-full rounded-[18px] border border-border-soft bg-cloud px-6 py-8 text-[16px] text-graphite">
          {errorMessage || "Unable to load customer reviews."}
        </div>
      ) : null}
    </CarouselShell>
  )
}
