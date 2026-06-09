import SectionHeading from "../ui/SectionHeading"
import BlogCard from "../ui/BlogCard"
import type { BlogPostCard } from "../../types/blog"

type BlogGridSectionProps = {
  posts: BlogPostCard[]
  eyebrow: string
  title: string
  id?: string
  className?: string
  containerClassName?: string
  cardSize?: "default" | "compact"
  emptyMessage?: string
}

function cx(...values: Array<string | false | null | undefined>) {
  return values.filter(Boolean).join(" ")
}

export default function BlogGridSection({
  posts,
  eyebrow,
  title,
  id,
  className,
  containerClassName = "mx-auto max-w-[1800px]",
  cardSize = "default",
  emptyMessage = "No published blog posts found in the database.",
}: BlogGridSectionProps) {
  return (
    <section
      id={id}
      className={cx(
        "bg-paper px-4 py-[72px] md:px-6 md:py-[90px] xl:px-10 xl:py-[110px]",
        className
      )}
    >
      <div className={containerClassName}>
        <SectionHeading
          eyebrow={eyebrow}
          title={title}
          titleSize="lg"
          maxWidth="lg"
        />

        {posts.length > 0 ? (
          <div className="mt-10 grid gap-x-5 gap-y-8 md:grid-cols-2 xl:grid-cols-3">
            {posts.map((post) => (
              <BlogCard
                key={post._id}
                post={post}
                size={cardSize}
                sizes={
                  cardSize === "compact"
                    ? "(min-width: 1200px) calc((100vw - 120px) / 3), (min-width: 810px) calc((100vw - 88px) / 2), calc(100vw - 32px)"
                    : "(min-width: 1200px) calc((100vw - 120px) / 3), (min-width: 810px) calc((100vw - 88px) / 2), calc(100vw - 32px)"
                }
              />
            ))}
          </div>
        ) : (
          <div className="mt-10 rounded-[10px] border border-border-soft bg-cloud px-6 py-8 text-[16px] leading-[1.6] text-graphite">
            {emptyMessage}
          </div>
        )}
      </div>
    </section>
  )
}
