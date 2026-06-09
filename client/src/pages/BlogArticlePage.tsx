import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import Footer from "../components/Footer"
import Header from "../components/Header"
import BlogArticleContent from "../components/blog/BlogArticleContent"
import BlogArticlePageSkeleton from "../components/skeletons/BlogArticlePageSkeleton"
import type {
  BlogPostDetailPayload,
  BlogPostDetailResponse,
} from "../types/blog"

type LoadState = "idle" | "loading" | "success" | "error"

export default function BlogArticlePage() {
  const { slug = "" } = useParams()
  const [payload, setPayload] = useState<BlogPostDetailPayload | null>(null)
  const [loadState, setLoadState] = useState<LoadState>("idle")
  const [errorMessage, setErrorMessage] = useState("")

  useEffect(() => {
    const abortController = new AbortController()

    async function loadArticle() {
      try {
        setLoadState("loading")
        setErrorMessage("")
        setPayload(null)

        const response = await fetch(`/api/blog/${slug}`, {
          signal: abortController.signal,
        })

        if (!response.ok) {
          throw new Error(
            response.status === 404
              ? "Article not found"
              : `Failed to load article: ${response.status}`
          )
        }

        const result = (await response.json()) as BlogPostDetailResponse

        if (!result.success) {
          throw new Error(result.message || "Failed to load article")
        }

        setPayload(result.data)
        setLoadState("success")
      } catch (error) {
        if (abortController.signal.aborted) {
          return
        }

        setErrorMessage(
          error instanceof Error ? error.message : "Unable to load article"
        )
        setLoadState("error")
      }
    }

    if (slug) {
      loadArticle()
    }

    return () => {
      abortController.abort()
    }
  }, [slug])

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" })
  }, [slug])

  const post = payload?.post || null
  const relatedPosts = payload?.relatedPosts || []

  return (
    <main className="min-h-screen bg-paper text-obsidian">
      <Header
        theme="light"
        containerClassName="max-w-[1800px] px-4 md:px-6 xl:px-10"
      />

      {(loadState === "loading" || loadState === "idle") && (
        <BlogArticlePageSkeleton />
      )}

      {loadState === "error" ? (
        <section className="bg-paper px-4 py-[72px] md:px-6 md:py-[90px] xl:px-10 xl:py-[110px]">
          <div className="mx-auto max-w-[1800px] rounded-[10px] border border-border-soft bg-cloud px-6 py-8 text-[16px] leading-[1.6] text-graphite">
            <p>{errorMessage || "Unable to load article."}</p>
            <Link
              to="/blog#blog-section"
              className="mt-4 inline-flex text-[15px] font-medium text-obsidian transition-opacity duration-200 hover:opacity-70"
            >
              Back to blog
            </Link>
          </div>
        </section>
      ) : null}

      {loadState === "success" && post ? (
        <BlogArticleContent post={post} relatedPosts={relatedPosts} />
      ) : null}

      <Footer />
    </main>
  )
}
