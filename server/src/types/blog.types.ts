export interface BlogContentSectionDto {
  heading: string;
  body: string;
}

export interface BlogPostCardDto {
  _id: string;
  title: string;
  slug: string;
  category: string;
  excerpt: string;
  coverImage: string;
  coverImageObjectPosition?: string;
  publishedAt: string;
  publishedAtLabel: string;
}

export interface BlogPostDetailDto extends BlogPostCardDto {
  content: BlogContentSectionDto[];
}

export interface BlogPostDetailResponseDto {
  post: BlogPostDetailDto;
  relatedPosts: BlogPostCardDto[];
}
