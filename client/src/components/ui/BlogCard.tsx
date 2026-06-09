import { Link } from "react-router-dom"
import type { BlogPostCard as BlogPostCardData } from "../../types/blog"
import { resolveAssetPath } from "../../utils/assets"

type BlogCardProps = {
  post: BlogPostCardData
  className?: string
  size?: "default" | "compact"
  sizes?: string
}

function cx(...values: Array<string | false | null | undefined>) {
  return values.filter(Boolean).join(" ")
}

export function BlogCardSkeleton({
  className,
  size = "default",
}: {
  className?: string
  size?: "default" | "compact"
}) {
  return (
    <div className={cx("animate-pulse", className)}>
      <div
        className={cx(
          "rounded-[10px] bg-cloud",
          size === "compact" ? "aspect-[1.16/0.88]" : "aspect-[1/1.04]"
        )}
      />
      <div className="mt-4 h-6 w-4/5 rounded-full bg-cloud" />
      <div className="mt-3 h-4 w-24 rounded-full bg-cloud" />
    </div>
  )
}

export default function BlogCard({
  post,
  className,
  size = "default",
  sizes,
}: BlogCardProps) {
  const isCompact = size === "compact"

  return (
    <article className={cx("group", className)}>
      <Link to={`/blog/${post.slug}`} className="block">
        <div className="relative overflow-hidden rounded-[10px] bg-cloud">
          <img
            src={resolveAssetPath(post.coverImage)}
            alt={post.title}
            className={cx(
              "w-full object-cover transition duration-500 group-hover:scale-[1.02]",
              isCompact ? "aspect-[1.16/0.88]" : "aspect-[1/1.04]"
            )}
            style={{ objectPosition: post.coverImageObjectPosition || "center" }}
            loading="lazy"
            sizes={sizes}
          />

          <span className="absolute left-[11px] top-[11px] inline-flex min-h-[30px] items-center rounded-[5px] bg-paper px-[10px] text-[13px] font-normal leading-none tracking-[-0.02em] text-obsidian">
            {post.category}
          </span>
        </div>

        <div className={cx(isCompact ? "mt-3" : "mt-4")}>
          <h3
            className={cx(
              "tracking-[-0.03em] text-obsidian",
              isCompact
                ? "text-[13px] font-medium leading-[1.35]"
                : "text-[18px] font-medium leading-[1.45]"
            )}
          >
            {post.title}
          </h3>

          <p
            className={cx(
              "text-graphite",
              isCompact
                ? "mt-1.5 text-[11px] leading-[1.45]"
                : "mt-2.5 text-[15px] leading-[1.55]"
            )}
          >
            {post.publishedAtLabel}
          </p>
        </div>
      </Link>
    </article>
  )
}
