import type { BlogPostCard, BlogPostDetail } from "../../types/blog"
import BlogGridSection from "./BlogGridSection"
import { resolveAssetPath } from "../../utils/assets"

type BlogArticleContentProps = {
  post: BlogPostDetail
  relatedPosts: BlogPostCard[]
}

export default function BlogArticleContent({
  post,
  relatedPosts,
}: BlogArticleContentProps) {
  return (
    <>
      <section className="bg-paper px-4 pb-[92px] pt-10 md:px-6 md:pb-[108px] md:pt-12 xl:px-10 xl:pb-[122px] xl:pt-16">
        <div className="mx-auto max-w-[1800px]">
          <div className="mx-auto max-w-[1210px] xl:grid xl:grid-cols-[minmax(220px,280px)_minmax(0,1fr)] xl:items-start xl:gap-[88px]">
            <div className="xl:pt-[70px]">
              <h1 className="max-w-[260px] text-[34px] font-medium leading-[0.95] tracking-[-0.07em] text-obsidian md:max-w-[360px] md:text-[48px] xl:max-w-[290px] xl:text-[52px]">
                {post.title}
              </h1>

              <p className="mt-5 text-[13px] leading-[1.5] tracking-[-0.01em] text-graphite md:text-[14px]">
                {post.publishedAtLabel}
              </p>
            </div>

            <div className="mt-8 overflow-hidden rounded-[4px] bg-cloud xl:mt-0">
              <img
                src={resolveAssetPath(post.coverImage)}
                alt={post.title}
                className="aspect-[1.12/0.75] w-full object-cover"
                style={{ objectPosition: post.coverImageObjectPosition || "center" }}
              />
            </div>
          </div>

          <div className="mx-auto mt-[58px] max-w-[1210px] xl:mt-[74px]">
            <div className="max-w-[760px] xl:ml-[368px]">
              {post.content.map((section) => (
                <section key={section.heading} className="mb-10 last:mb-0">
                  <h2 className="text-[18px] font-medium leading-[1.25] tracking-[-0.04em] text-obsidian md:text-[20px]">
                    {section.heading}
                  </h2>

                  <p className="mt-3 text-[15px] leading-[1.78] tracking-[-0.01em] text-graphite md:text-[16px]">
                    {section.body}
                  </p>
                </section>
              ))}
            </div>
          </div>
        </div>
      </section>

      <BlogGridSection
        posts={relatedPosts}
        eyebrow="More Articles"
        title="You Might Like"
        className="pt-0 md:pt-0 xl:pt-0"
        containerClassName="mx-auto max-w-[1800px]"
        cardSize="compact"
        emptyMessage="No related articles found."
      />
    </>
  )
}
