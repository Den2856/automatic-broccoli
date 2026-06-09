import { Schema, model, type InferSchemaType } from "mongoose"

const vehicleCategorySchema = new Schema(
  {
    name: {
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
    description: {
      type: String,
      default: "",
      trim: true,
    },
    coverImage: {
      type: String,
      required: true,
      trim: true,
    },
    heroImage: {
      type: String,
      default: "",
      trim: true,
    },
    heroImageObjectPosition: {
      type: String,
      default: "center",
      trim: true,
    },
    sortOrder: {
      type: Number,
      default: 0,
    },
    isVisible: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
)

export type VehicleCategoryDocument = InferSchemaType<typeof vehicleCategorySchema>

export const VehicleCategoryModel = model("VehicleCategory", vehicleCategorySchema)
