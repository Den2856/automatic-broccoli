import type { VehicleCardDto } from "../../types/vehicle.types.js";
import { getRelatedVehicleRecords } from "./vehicle.queries.js";
import {
  buildVehicleCardDto,
  isDefined,
  resolveVehicleSource,
  type ResolvedVehicleSource,
} from "./vehicle.shared.js";

const RELATED_QUERY_LIMIT = 36;

function calculatePriceScore(currentPrice: number, candidatePrice: number): number {
  if (currentPrice <= 0 || candidatePrice <= 0) {
    return 0;
  }

  const difference = Math.abs(currentPrice - candidatePrice);

  if (difference <= 10000) {
    return 3;
  }

  if (difference <= 20000) {
    return 2;
  }

  if (difference <= 30000) {
    return 1;
  }

  return 0;
}

function calculateYearScore(
  currentYear: number | null,
  candidateYear: number | null
): number {
  if (!currentYear || !candidateYear) {
    return 0;
  }

  const difference = Math.abs(currentYear - candidateYear);

  if (difference === 0) {
    return 2;
  }

  if (difference <= 2) {
    return 1;
  }

  return 0;
}

function calculateRelatedScore(
  currentVehicle: ResolvedVehicleSource,
  candidate: ResolvedVehicleSource
): number {
  let score = 0;

  if (candidate.category && candidate.category === currentVehicle.category) {
    score += 6;
  }

  if (candidate.make && candidate.make === currentVehicle.make) {
    score += 8;
  }

  if (candidate.bodyType === currentVehicle.bodyType) {
    score += 4;
  }

  if (candidate.condition === currentVehicle.condition) {
    score += 2;
  }

  if (candidate.transmission === currentVehicle.transmission) {
    score += 2;
  }

  if (candidate.fuelType && candidate.fuelType === currentVehicle.fuelType) {
    score += 1;
  }

  score += calculatePriceScore(currentVehicle.price, candidate.price);
  score += calculateYearScore(currentVehicle.year, candidate.year);

  return score;
}

export async function getRelatedVehiclesForVehicle(
  currentVehicle: ResolvedVehicleSource,
  limit: number
): Promise<VehicleCardDto[]> {
  const records = await getRelatedVehicleRecords(
    currentVehicle.slug,
    RELATED_QUERY_LIMIT
  );

  const candidates = records
    .map((vehicle) => resolveVehicleSource(vehicle))
    .filter(isDefined)
    .filter((vehicle) => vehicle.slug !== currentVehicle.slug);

  return candidates
    .sort((left, right) => {
      const leftScore = calculateRelatedScore(currentVehicle, left);
      const rightScore = calculateRelatedScore(currentVehicle, right);

      if (rightScore !== leftScore) {
        return rightScore - leftScore;
      }

      if ((right.year || 0) !== (left.year || 0)) {
        return (right.year || 0) - (left.year || 0);
      }

      return left.price - right.price;
    })
    .slice(0, limit)
    .map(buildVehicleCardDto);
}
