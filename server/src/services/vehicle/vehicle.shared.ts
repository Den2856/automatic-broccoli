import type { VehicleDocument } from "../../models/vehicle.model.js";
import type {
  VehicleCardDto,
  VehicleDetailDto,
  VehicleGalleryImageDto,
} from "../../types/vehicle.types.js";

export type VehicleRecord = Partial<VehicleDocument> & {
  _id?: { toString(): string } | string;
  category?: string | null;
  gallery?: Array<{
    src?: string;
    alt?: string;
    objectPosition?: string;
  }>;
  features?: string[];
};

export type ResolvedVehicleSource = {
  _id: string;
  name: string;
  slug: string;
  category: string;
  make: string;
  color: string;
  featuredImage: string;
  featuredImageObjectPosition: string;
  price: number;
  bodyType: string;
  transmission: string;
  fuelType: string;
  mileage: number;
  year: number | null;
  condition: string;
  description: string;
  monthlyPayment: string;
  gallery: VehicleGalleryImageDto[];
  features: string[];
  dealerName: string;
  dealerAddress: string;
  dealerMapUrl: string;
  dealerRating: number;
};

const defaultDealerName = "Drivehub (Car Dealership)";
const defaultDealerAddress = "2450 W Pico Blvd, Los Angeles";
const defaultDealerMapUrl = "https://www.google.com/maps";
const defaultDealerRating = 4.8;
const defaultFeatures = [
  "Comfortable interior",
  "Advanced safety features",
  "Modern infotainment system",
];

export function isDefined<T>(value: T | null): value is T {
  return value !== null;
}

function deriveMake(name: string): string {
  const normalizedName = name.replace(/^\d{4}\s+/, "").trim();

  if (!normalizedName) {
    return "";
  }

  const [firstWord] = normalizedName.split(/\s+/);
  return firstWord || "";
}

function buildFallbackGallery(
  name: string,
  featuredImage: string,
  objectPosition: string
): VehicleGalleryImageDto[] {
  if (!featuredImage) {
    return [];
  }

  return Array.from({ length: 5 }, (_, index) => ({
    src: featuredImage,
    alt: `${name} gallery image ${index + 1}`,
    objectPosition,
  }));
}

export function formatVehicleCategoryName(category: string): string {
  const normalizedCategory = category.trim().toLowerCase();

  if (!normalizedCategory) {
    return "";
  }

  return normalizedCategory
    .split(/[-_\s]+/)
    .filter(Boolean)
    .map((part) =>
      part.length <= 3
        ? part.toUpperCase()
        : `${part.charAt(0).toUpperCase()}${part.slice(1)}`
    )
    .join(" ");
}

function normalizeGallery(
  gallery: VehicleRecord["gallery"] | undefined,
  name: string
): VehicleGalleryImageDto[] {
  if (!gallery || gallery.length === 0) {
    return [];
  }

  return gallery
    .filter((image): image is NonNullable<typeof image> => Boolean(image?.src))
    .map((image, index) => ({
      src: String(image.src),
      alt: image.alt?.trim() || `${name} gallery image ${index + 1}`,
      objectPosition: image.objectPosition?.trim() || "center",
    }));
}

function normalizeTextArray(values: string[] | undefined): string[] {
  if (!values || values.length === 0) {
    return [];
  }

  return values
    .map((value) => value.trim())
    .filter(Boolean);
}

export function resolveVehicleSource(
  vehicle: VehicleRecord | null
): ResolvedVehicleSource | null {
  if (!vehicle?.slug?.trim() || !vehicle?.name?.trim()) {
    return null;
  }

  const resolvedName = vehicle.name.trim();
  const resolvedFeaturedImageObjectPosition =
    vehicle.featuredImageObjectPosition?.trim() || "center";
  const resolvedGallery = normalizeGallery(vehicle.gallery, resolvedName);
  const resolvedFeaturedImage =
    vehicle.featuredImage?.trim() || resolvedGallery[0]?.src || "";
  const gallery =
    resolvedGallery.length > 0
      ? resolvedGallery
      : buildFallbackGallery(
          resolvedName,
          resolvedFeaturedImage,
          resolvedFeaturedImageObjectPosition
        );
  const mileage = typeof vehicle.mileage === "number" ? vehicle.mileage : 0;
  const normalizedFeatures = normalizeTextArray(vehicle.features);
  const category = vehicle.category?.trim().toLowerCase() || "";

  return {
    _id:
      typeof vehicle._id === "string"
        ? vehicle._id
        : vehicle._id?.toString() || vehicle.slug.trim().toLowerCase(),
    name: resolvedName,
    slug: vehicle.slug.trim().toLowerCase(),
    category,
    make: vehicle.make?.trim() || deriveMake(resolvedName),
    color: vehicle.color?.trim() || "",
    featuredImage: resolvedFeaturedImage,
    featuredImageObjectPosition: resolvedFeaturedImageObjectPosition,
    price: typeof vehicle.price === "number" ? vehicle.price : 0,
    bodyType: vehicle.bodyType?.trim() || formatVehicleCategoryName(category) || "Vehicle",
    transmission: vehicle.transmission?.trim() || "Automatic",
    fuelType: vehicle.fuelType?.trim() || "Gasoline",
    mileage,
    year: typeof vehicle.year === "number" ? vehicle.year : null,
    condition:
      vehicle.condition?.trim() || (mileage === 0 ? "Brand new" : "Pre-owned"),
    description: vehicle.description?.trim() || `Explore the ${resolvedName}.`,
    monthlyPayment: vehicle.monthlyPayment?.trim() || "",
    gallery,
    features:
      normalizedFeatures.length > 0 ? normalizedFeatures : defaultFeatures,
    dealerName: vehicle.dealerName?.trim() || defaultDealerName,
    dealerAddress: vehicle.dealerAddress?.trim() || defaultDealerAddress,
    dealerMapUrl: vehicle.dealerMapUrl?.trim() || defaultDealerMapUrl,
    dealerRating:
      typeof vehicle.dealerRating === "number"
        ? vehicle.dealerRating
        : defaultDealerRating,
  };
}

export function buildVehicleCardDto(
  vehicle: ResolvedVehicleSource
): VehicleCardDto {
  return {
    _id: vehicle._id,
    name: vehicle.name,
    slug: vehicle.slug,
    category: vehicle.category,
    make: vehicle.make,
    color: vehicle.color,
    featuredImage: vehicle.featuredImage,
    featuredImageObjectPosition: vehicle.featuredImageObjectPosition,
    price: vehicle.price,
    bodyType: vehicle.bodyType,
    transmission: vehicle.transmission,
    fuelType: vehicle.fuelType,
    mileage: vehicle.mileage,
    year: vehicle.year,
    condition: vehicle.condition,
  };
}

export function buildVehicleDetailDto(
  vehicle: ResolvedVehicleSource
): VehicleDetailDto {
  return {
    ...buildVehicleCardDto(vehicle),
    description: vehicle.description,
    monthlyPayment: vehicle.monthlyPayment,
    gallery: vehicle.gallery,
    features: vehicle.features,
    dealerName: vehicle.dealerName,
    dealerAddress: vehicle.dealerAddress,
    dealerMapUrl: vehicle.dealerMapUrl,
    dealerRating: vehicle.dealerRating,
  };
}
