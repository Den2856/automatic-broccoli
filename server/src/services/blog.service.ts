import { BlogPostModel, type BlogPostDocument } from "../models/blog-post.model.js";
import type {
  BlogContentSectionDto,
  BlogPostCardDto,
  BlogPostDetailDto,
  BlogPostDetailResponseDto,
} from "../types/blog.types.js";

type BlogPostRecord = BlogPostDocument & {
  _id: { toString(): string };
  createdAt?: Date;
};

const RELATED_POSTS_LIMIT = 3;

function normalizeSlug(slug: string) {
  return slug.trim().toLowerCase();
}

function formatBlogDate(dateValue: Date | string | null | undefined) {
  if (!dateValue) {
    return "";
  }

  const date = dateValue instanceof Date ? dateValue : new Date(dateValue);

  if (Number.isNaN(date.getTime())) {
    return "";
  }

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  }).format(date);
}

function normalizeContentSections(
  sections: BlogPostDocument["content"]
): BlogContentSectionDto[] {
  return Array.isArray(sections)
    ? sections
        .map((section) => ({
          heading: String(section?.heading || "").trim(),
          body: String(section?.body || "").trim(),
        }))
        .filter((section) => section.heading && section.body)
    : [];
}

function buildBlogPostCardDto(post: BlogPostRecord): BlogPostCardDto {
  return {
    _id: post._id.toString(),
    title: String(post.title || "").trim(),
    slug: String(post.slug || "").trim().toLowerCase(),
    category: String(post.category || "").trim(),
    excerpt: String(post.excerpt || "").trim(),
    coverImage: String(post.coverImage || "").trim(),
    coverImageObjectPosition:
      String(post.coverImageObjectPosition || "").trim() || "center",
    publishedAt: post.publishedAt
      ? new Date(post.publishedAt).toISOString()
      : "",
    publishedAtLabel: formatBlogDate(post.publishedAt),
  };
}

function buildBlogPostDetailDto(post: BlogPostRecord): BlogPostDetailDto {
  return {
    ...buildBlogPostCardDto(post),
    content: normalizeContentSections(post.content),
  };
}

function getPublishedPostsQuery() {
  return { isPublished: true };
}

function getBlogSortOrder() {
  return {
    publishedAt: -1 as const,
    sortOrder: 1 as const,
    createdAt: -1 as const,
  };
}

export async function getPublishedBlogPostsService(): Promise<BlogPostCardDto[]> {
  const posts = await BlogPostModel.find(getPublishedPostsQuery())
    .sort(getBlogSortOrder())
    .lean<BlogPostRecord[]>();

  return posts.map(buildBlogPostCardDto);
}

export async function getBlogPostDetailBySlugService(
  slug: string
): Promise<BlogPostDetailResponseDto | null> {
  const normalizedSlug = normalizeSlug(slug);

  if (!normalizedSlug) {
    return null;
  }

  const post = await BlogPostModel.findOne({
    ...getPublishedPostsQuery(),
    slug: normalizedSlug,
  }).lean<BlogPostRecord | null>();

  if (!post) {
    return null;
  }

  const relatedPosts = await BlogPostModel.find({
    ...getPublishedPostsQuery(),
    slug: { $ne: normalizedSlug },
  })
    .sort(getBlogSortOrder())
    .limit(RELATED_POSTS_LIMIT)
    .lean<BlogPostRecord[]>();

  return {
    post: buildBlogPostDetailDto(post),
    relatedPosts: relatedPosts.map(buildBlogPostCardDto),
  };
}
