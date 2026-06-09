import type { NextFunction, Request, Response } from "express";
import {
  getBlogPostDetailBySlugService,
  getPublishedBlogPostsService,
} from "../services/blog.service.js";

export async function getBlogPosts(
  _req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const posts = await getPublishedBlogPostsService();

    res.status(200).json({
      success: true,
      data: posts,
    });
  } catch (error) {
    next(error);
  }
}

export async function getBlogPostBySlug(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const slug = String(req.params.slug || "").trim().toLowerCase();
    const result = await getBlogPostDetailBySlugService(slug);

    if (!result) {
      res.status(404).json({
        success: false,
        message: "Blog post not found",
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    next(error);
  }
}
