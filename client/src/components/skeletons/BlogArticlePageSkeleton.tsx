import { BlogCardSkeleton } from "../ui/BlogCard"

export default function BlogArticlePageSkeleton() {
  return (
    <div className="bg-paper">
      <section className="px-4 pb-[92px] pt-10 md:px-6 md:pb-[108px] md:pt-12 xl:px-10 xl:pb-[122px] xl:pt-16">
        <div className="mx-auto max-w-[1800px]">
          <div className="mx-auto max-w-[1210px] xl:grid xl:grid-cols-[minmax(220px,280px)_minmax(0,1fr)] xl:items-start xl:gap-[88px]">
            <div className="xl:pt-[70px]">
              <div className="h-24 w-full max-w-[260px] rounded-[16px] bg-cloud md:h-32 md:max-w-[360px]" />
              <div className="mt-5 h-4 w-24 rounded-full bg-cloud" />
            </div>

            <div className="mt-8 aspect-[1.12/0.75] rounded-[4px] bg-cloud xl:mt-0" />
          </div>

          <div className="mx-auto mt-[58px] max-w-[1210px] xl:mt-[74px]">
            <div className="max-w-[760px] xl:ml-[368px]">
              {Array.from({ length: 5 }, (_, index) => (
                <div key={index} className="mb-10 last:mb-0">
                  <div className="h-6 w-44 rounded-full bg-cloud" />
                  <div className="mt-3 h-24 w-full rounded-[16px] bg-cloud" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-paper px-4 pb-[72px] md:px-6 md:pb-[90px] xl:px-10 xl:pb-[110px]">
        <div className="mx-auto max-w-[1800px]">
          <div className="h-4 w-28 rounded-full bg-cloud" />
          <div className="mt-4 h-12 w-64 rounded-[16px] bg-cloud" />

          <div className="mt-10 grid gap-x-5 gap-y-8 md:grid-cols-2 xl:grid-cols-3">
            {Array.from({ length: 3 }, (_, index) => (
              <BlogCardSkeleton key={index} size="compact" />
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
