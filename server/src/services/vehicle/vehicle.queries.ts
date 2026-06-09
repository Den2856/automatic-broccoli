import { VehicleModel } from "../../models/vehicle.model.js";
import type { VehicleRecord } from "./vehicle.shared.js";

function buildVehicleQuery(filter: Record<string, unknown> = {}) {
  return VehicleModel.find({
    isPublished: true,
    ...filter,
  })
    .sort({
      sortOrder: 1,
      createdAt: -1,
    });
}

export async function getPublishedVehicleRecords(
  limit?: number
): Promise<VehicleRecord[]> {
  const query = buildVehicleQuery();

  if (typeof limit === "number") {
    query.limit(limit);
  }

  return query.lean();
}

export async function getPublishedVehicleRecordsByCategory(
  category: string
): Promise<VehicleRecord[]> {
  return buildVehicleQuery({
    category: category.trim().toLowerCase(),
  }).lean();
}

export async function getFeaturedVehicleRecords(
  limit: number
): Promise<VehicleRecord[]> {
  return buildVehicleQuery({
    isFeatured: true,
  })
    .limit(limit)
    .lean();
}

export async function findPublishedVehicleBySlug(
  slug: string
): Promise<VehicleRecord | null> {
  return VehicleModel.findOne({
    isPublished: true,
    slug,
  })
    .lean();
}

export async function getRelatedVehicleRecords(
  excludedSlug: string,
  limit: number
): Promise<VehicleRecord[]> {
  return VehicleModel.find({
    isPublished: true,
    slug: { $ne: excludedSlug },
  })
    .sort({
      sortOrder: 1,
      createdAt: -1,
    })
    .limit(limit)
    .lean();
}
