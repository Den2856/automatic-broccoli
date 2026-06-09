import { BlogCardSkeleton } from "../ui/BlogCard"

export default function BlogGridSectionSkeleton() {
  return (
    <section className="bg-paper px-4 py-[72px] md:px-6 md:py-[90px] xl:px-10 xl:py-[110px]">
      <div className="mx-auto max-w-[1800px]">
        <div className="h-4 w-28 rounded-full bg-cloud" />
        <div className="mt-4 h-12 w-full max-w-[560px] rounded-[16px] bg-cloud" />

        <div className="mt-10 grid gap-x-5 gap-y-8 md:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 6 }, (_, index) => (
            <BlogCardSkeleton key={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
