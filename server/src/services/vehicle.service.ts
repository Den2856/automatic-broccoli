import type {
  VehicleCardDto,
  VehicleDetailResponseDto,
} from "../types/vehicle.types.js";
import type { VehicleCategoryPageDto } from "../types/vehicle.category.types.js";
import { getVehicleCategoryPageService } from "./category.service.js";
import { getRelatedVehiclesForVehicle } from "./vehicle/vehicle.related.js";
import {
  findPublishedVehicleBySlug,
  getFeaturedVehicleRecords,
  getPublishedVehicleRecords,
} from "./vehicle/vehicle.queries.js";
import {
  buildVehicleCardDto,
  buildVehicleDetailDto,
  isDefined,
  resolveVehicleSource,
  type VehicleRecord,
} from "./vehicle/vehicle.shared.js";

const FEATURED_VEHICLES_LIMIT = 3;
const RELATED_VEHICLES_LIMIT = 3;

export function resolveVehicleRecords(records: VehicleRecord[]) {
  return records
    .map((vehicle) => resolveVehicleSource(vehicle))
    .filter(isDefined);
}

export async function getPublishedVehiclesService(): Promise<VehicleCardDto[]> {
  const records = await getPublishedVehicleRecords();

  return resolveVehicleRecords(records).map(buildVehicleCardDto);
}

export async function getFeaturedVehiclesService(): Promise<VehicleCardDto[]> {
  const records = await getFeaturedVehicleRecords(FEATURED_VEHICLES_LIMIT);

  return resolveVehicleRecords(records).map(buildVehicleCardDto);
}

export async function getVehicleCategoryBySlugService(
  slug: string
): Promise<VehicleCategoryPageDto | null> {
  return getVehicleCategoryPageService(slug);
}

export async function getVehicleDetailBySlugService(
  slug: string
): Promise<VehicleDetailResponseDto | null> {
  const normalizedSlug = slug.trim().toLowerCase();

  if (!normalizedSlug) {
    return null;
  }

  const record = await findPublishedVehicleBySlug(normalizedSlug);
  const resolvedVehicle = resolveVehicleSource(record);

  if (!resolvedVehicle) {
    return null;
  }

  return {
    vehicle: buildVehicleDetailDto(resolvedVehicle),
    relatedVehicles: await getRelatedVehiclesForVehicle(
      resolvedVehicle,
      RELATED_VEHICLES_LIMIT
    ),
  };
}
