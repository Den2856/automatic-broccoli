import { Schema, model, type InferSchemaType } from "mongoose";

const vehicleGalleryImageSchema = new Schema(
  {
    src: {
      type: String,
      required: true,
      trim: true,
    },
    alt: {
      type: String,
      default: "",
      trim: true,
    },
    objectPosition: {
      type: String,
      default: "center",
      trim: true,
    },
  },
  {
    _id: false,
  }
);

const vehicleSchema = new Schema(
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
    category: {
      type: String,
      default: "",
      trim: true,
      lowercase: true,
    },
    featuredImage: {
      type: String,
      required: true,
      trim: true,
    },
    featuredImageObjectPosition: {
      type: String,
      default: "center",
      trim: true,
    },
    make: {
      type: String,
      default: "",
      trim: true,
    },
    color: {
      type: String,
      default: "",
      trim: true,
    },
    price: {
      type: Number,
      default: 0,
    },
    condition: {
      type: String,
      default: "Pre-owned",
      trim: true,
    },
    bodyType: {
      type: String,
      default: "",
      trim: true,
    },
    transmission: {
      type: String,
      default: "",
      trim: true,
    },
    fuelType: {
      type: String,
      default: "",
      trim: true,
    },
    mileage: {
      type: Number,
      default: 0,
    },
    year: {
      type: Number,
      default: null,
    },
    description: {
      type: String,
      default: "",
      trim: true,
    },
    monthlyPayment: {
      type: String,
      default: "",
      trim: true,
    },
    gallery: {
      type: [vehicleGalleryImageSchema],
      default: [],
    },
    features: {
      type: [String],
      default: [],
    },
    dealerName: {
      type: String,
      default: "Drivehub (Car Dealership)",
      trim: true,
    },
    dealerAddress: {
      type: String,
      default: "2450 W Pico Blvd, Los Angeles",
      trim: true,
    },
    dealerMapUrl: {
      type: String,
      default: "https://www.google.com/maps",
      trim: true,
    },
    dealerRating: {
      type: Number,
      default: 4.8,
    },
    badge: {
      type: String,
      default: "Highlighted",
      trim: true,
    },
    isFeatured: {
      type: Boolean,
      default: false,
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

export type VehicleDocument = InferSchemaType<typeof vehicleSchema>;

export const VehicleModel = model("Vehicle", vehicleSchema);
