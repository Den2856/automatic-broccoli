import { ReviewModel } from "../models/review.model.js";
import type { CustomerReviewDto } from "../types/review.types.js";

export async function getVisibleReviewsService(): Promise<CustomerReviewDto[]> {
  const reviews = await ReviewModel.find({
    isVisible: true,
  })
    .sort({
      sortOrder: 1,
      createdAt: -1,
    })
    .lean();

  return reviews.map((review) => ({
    _id: String(review._id),
    name: review.name,
    location: review.location || "",
    quote: review.quote,
    avatar: review.avatar,
    rating: review.rating || 5,
    sortOrder: review.sortOrder || 0,
  }));
}
