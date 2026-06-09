export type BlogContentSection = {
  heading: string
  body: string
}

export type BlogPostCard = {
  _id: string
  title: string
  slug: string
  category: string
  excerpt: string
  coverImage: string
  coverImageObjectPosition?: string
  publishedAt: string
  publishedAtLabel: string
}

export type BlogPostDetail = BlogPostCard & {
  content: BlogContentSection[]
}

export type BlogListResponse = {
  success: boolean
  data: BlogPostCard[]
  message?: string
}

export type BlogPostDetailPayload = {
  post: BlogPostDetail
  relatedPosts: BlogPostCard[]
}

export type BlogPostDetailResponse = {
  success: boolean
  data: BlogPostDetailPayload
  message?: string
}
