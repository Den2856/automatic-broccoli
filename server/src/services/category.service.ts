import type { VehicleCategoryDocument } from "../models/category.model.js";
import { VehicleCategoryModel } from "../models/category.model.js";
import { VehicleModel } from "../models/vehicle.model.js";
import type {
  VehicleCategoryDto,
  VehicleCategoryPageDto,
} from "../types/vehicle.category.types.js";
import {
  getPublishedVehicleRecordsByCategory,
} from "./vehicle/vehicle.queries.js";
import {
  buildVehicleCardDto,
  formatVehicleCategoryName,
  isDefined,
  resolveVehicleSource,
} from "./vehicle/vehicle.shared.js";

type CategoryRecord = Partial<VehicleCategoryDocument> & {
  _id?: { toString(): string } | string;
};

type CategoryCountRecord = {
  _id: string;
  vehiclesCount: number;
};

function normalizeCategorySlug(value: string | undefined | null): string {
  const normalizedValue = value?.trim().toLowerCase() || "";

  if (!normalizedValue) {
    return "";
  }

  const withoutSlashes = normalizedValue.replace(/^\/+|\/+$/g, "");

  if (withoutSlashes.startsWith("vehicles/")) {
    return withoutSlashes.slice("vehicles/".length);
  }

  return withoutSlashes;
}

function mapVehicleCategoryDto(
  category: CategoryRecord | null,
  vehiclesCount: number
): VehicleCategoryDto | null {
  const categoryId =
    typeof category?._id === "string"
      ? category._id
      : category?._id?.toString() || "";
  const slug = normalizeCategorySlug(category?.slug);
  const name = category?.name?.trim() || "";

  if (!category || !categoryId || !slug || !name) {
    return null;
  }

  const coverImage = category.coverImage?.trim() || "";
  const heroImage = category.heroImage?.trim() || coverImage;

  return {
    _id: categoryId,
    name,
    slug,
    description: category.description?.trim() || "",
    coverImage,
    heroImage,
    heroImageObjectPosition: category.heroImageObjectPosition?.trim() || "center",
    sortOrder: typeof category.sortOrder === "number" ? category.sortOrder : 0,
    isVisible: category.isVisible !== false,
    vehiclesCount,
  };
}

async function getVehicleCountsByCategory() {
  const counts = await VehicleModel.aggregate<CategoryCountRecord>([
    {
      $match: {
        isPublished: true,
        category: {
          $type: "string",
          $ne: "",
        },
      },
    },
    {
      $project: {
        categorySlug: {
          $toLower: {
            $trim: {
              input: "$category",
            },
          },
        },
      },
    },
    {
      $group: {
        _id: "$categorySlug",
        vehiclesCount: {
          $sum: 1,
        },
      },
    },
  ]);

  return new Map(counts.map((item) => [item._id, item.vehiclesCount]));
}

export async function getVisibleVehicleCategoriesService(): Promise<
  VehicleCategoryDto[]
> {
  const [categories, vehicleCountsByCategory] = await Promise.all([
    VehicleCategoryModel.find({
      isVisible: true,
    })
      .sort({
        sortOrder: 1,
        createdAt: -1,
      })
      .lean(),
    getVehicleCountsByCategory(),
  ]);

  return categories
    .map((category) =>
      mapVehicleCategoryDto(
        category,
        vehicleCountsByCategory.get(normalizeCategorySlug(category.slug)) || 0
      )
    )
    .filter(isDefined);
}

export async function getVehicleCategoryPageService(
  slug: string
): Promise<VehicleCategoryPageDto | null> {
  const normalizedSlug = normalizeCategorySlug(slug);

  if (!normalizedSlug) {
    return null;
  }

  const vehicles = (await getPublishedVehicleRecordsByCategory(normalizedSlug))
    .map((vehicle) => resolveVehicleSource(vehicle))
    .filter(isDefined)
    .map(buildVehicleCardDto);

  if (vehicles.length === 0) {
    return null;
  }

  const category = await VehicleCategoryModel.findOne({
    slug: {
      $in: [
        normalizedSlug,
        `/vehicles/${normalizedSlug}`,
        `vehicles/${normalizedSlug}`,
      ],
    },
  }).lean();

  const firstVehicle = vehicles[0];
  const categoryDto =
    mapVehicleCategoryDto(category, vehicles.length) ||
    ({
      _id: normalizedSlug,
      name: formatVehicleCategoryName(normalizedSlug) || normalizedSlug,
      slug: normalizedSlug,
      description: "",
      coverImage: firstVehicle.featuredImage,
      heroImage: firstVehicle.featuredImage,
      heroImageObjectPosition:
        firstVehicle.featuredImageObjectPosition || "center",
      sortOrder: 0,
      isVisible: true,
      vehiclesCount: vehicles.length,
    } satisfies VehicleCategoryDto);

  return {
    category: {
      ...categoryDto,
      vehiclesCount: vehicles.length,
    },
    vehicles,
  };
}
