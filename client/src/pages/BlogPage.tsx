import { useEffect, useState } from "react"
import Footer from "../components/Footer"
import Hero from "../components/home/Hero"
import BlogGridSection from "../components/blog/BlogGridSection"
import PageHeroSkeleton from "../components/skeletons/PageHeroSkeleton"
import BlogGridSectionSkeleton from "../components/skeletons/BlogGridSectionSkeleton"
import type { BlogListResponse, BlogPostCard } from "../types/blog"

type LoadState = "idle" | "loading" | "success" | "error"



export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPostCard[]>([])
  const [loadState, setLoadState] = useState<LoadState>("idle")
  const [errorMessage, setErrorMessage] = useState("")

  useEffect(() => {
    const abortController = new AbortController()

    async function loadPosts() {
      try {
        setLoadState("loading")
        setErrorMessage("")

        const response = await fetch("/api/blog", {
          signal: abortController.signal,
        })

        if (!response.ok) {
          throw new Error(`Failed to load blog posts: ${response.status}`)
        }

        const result = (await response.json()) as BlogListResponse

        if (!result.success) {
          throw new Error(result.message || "Failed to load blog posts")
        }

        setPosts(result.data)
        setLoadState("success")
      } catch (error) {
        if (abortController.signal.aborted) {
          return
        }

        setErrorMessage(
          error instanceof Error ? error.message : "Unable to load blog posts"
        )
        setLoadState("error")
      }
    }

    loadPosts()

    return () => {
      abortController.abort()
    }
  }, [])

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" })
  }, [])

  return (
    <main className="min-h-screen bg-paper text-obsidian">
      {loadState === "loading" || loadState === "idle" ? (
        <PageHeroSkeleton />
      ) : (
        <Hero
          variant="page"
          title="Drivehub Blog"
          imageSrc="/categoriesHero/blogHero.png"
          imageAlt="Drivehub blog hero"
          imageObjectPosition="center"
        />
      )}

      {loadState === "loading" || loadState === "idle" ? (
        <BlogGridSectionSkeleton />
      ) : loadState === "error" ? (
        <section className="bg-paper px-4 py-[72px] md:px-6 md:py-[90px] xl:px-10 xl:py-[110px]">
          <div className="mx-auto max-w-[1800px] rounded-[10px] border border-border-soft bg-cloud px-6 py-8 text-[16px] leading-[1.6] text-graphite">
            {errorMessage || "Unable to load blog posts."}
          </div>
        </section>
      ) : (
        <BlogGridSection
          id="blog-section"
          posts={posts}
          eyebrow="Latest Updates"
          title="Drivehub news and articles"
        />
      )}

      <Footer />
    </main>
  )
}
