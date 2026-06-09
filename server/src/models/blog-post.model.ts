import { Schema, model, type InferSchemaType } from "mongoose";

const blogContentSectionSchema = new Schema(
  {
    heading: {
      type: String,
      required: true,
      trim: true,
    },
    body: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    _id: false,
  }
);

const blogPostSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    category: {
      type: String,
      required: true,
      trim: true,
    },
    excerpt: {
      type: String,
      default: "",
      trim: true,
    },
    coverImage: {
      type: String,
      required: true,
      trim: true,
    },
    coverImageObjectPosition: {
      type: String,
      default: "center",
      trim: true,
    },
    content: {
      type: [blogContentSectionSchema],
      default: [],
    },
    publishedAt: {
      type: Date,
      required: true,
      default: Date.now,
    },
    isPublished: {
      type: Boolean,
      default: true,
    },
    sortOrder: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export type BlogPostDocument = InferSchemaType<typeof blogPostSchema>;

export const BlogPostModel = model("BlogPost", blogPostSchema);
