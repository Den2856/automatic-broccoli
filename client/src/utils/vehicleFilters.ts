import type { VehicleCard } from "../types/vehicle"

export type VehicleFilterKey =
  | "bodyTypes"
  | "brands"
  | "conditions"
  | "colors"
  | "transmissions"

export type VehicleFilterOption = {
  label: string
  value: string
}

export type VehicleFilterGroup = {
  key: VehicleFilterKey
  title: string
  options: VehicleFilterOption[]
}

export type VehicleFilterRange = {
  min: number
  max: number
}

export type VehicleFilters = {
  bodyTypes: string[]
  brands: string[]
  conditions: string[]
  colors: string[]
  transmissions: string[]
  mileage: VehicleFilterRange
  price: VehicleFilterRange
}

const emptyRange = {
  min: 0,
  max: 0,
}

const filterGroupTitles: Record<VehicleFilterKey, string> = {
  bodyTypes: "Vehicle Type",
  brands: "Brand",
  conditions: "Condition",
  colors: "Color",
  transmissions: "Transmission",
}

function normalizeVehicleFilterValue(value?: string | null) {
  return value?.trim() || ""
}

function roundBounds(value: number, direction: "up" | "down") {
  const roundedValue =
    direction === "down"
      ? Math.floor(value / 100) * 100
      : Math.ceil(value / 100) * 100

  return Math.max(roundedValue, 0)
}

function getVehicleFilterSourceValue(
  vehicle: VehicleCard,
  key: VehicleFilterKey
) {
  switch (key) {
    case "bodyTypes":
      return vehicle.bodyType
    case "brands":
      return vehicle.make
    case "conditions":
      return vehicle.condition
    case "colors":
      return vehicle.color || ""
    case "transmissions":
      return vehicle.transmission
    default:
      return ""
  }
}

function getUniqueFilterOptions(
  vehicles: VehicleCard[],
  key: VehicleFilterKey
): VehicleFilterOption[] {
  const seenValues = new Set<string>()
  const options: VehicleFilterOption[] = []

  for (const vehicle of vehicles) {
    const rawValue = normalizeVehicleFilterValue(
      getVehicleFilterSourceValue(vehicle, key)
    )

    if (!rawValue) {
      continue
    }

    const normalizedValue = rawValue.toLowerCase()

    if (seenValues.has(normalizedValue)) {
      continue
    }

    seenValues.add(normalizedValue)
    options.push({
      label: rawValue,
      value: rawValue,
    })
  }

  return options
}

export function createVehicleFilters(
  mileageBounds: VehicleFilterRange = emptyRange,
  priceBounds: VehicleFilterRange = emptyRange
): VehicleFilters {
  return {
    bodyTypes: [],
    brands: [],
    conditions: [],
    colors: [],
    transmissions: [],
    mileage: mileageBounds,
    price: priceBounds,
  }
}

export function getVehicleRangeBounds(vehicles: VehicleCard[]) {
  if (vehicles.length === 0) {
    return {
      mileage: emptyRange,
      price: emptyRange,
    }
  }

  const mileages = vehicles.map((vehicle) => vehicle.mileage)
  const prices = vehicles.map((vehicle) => vehicle.price)

  return {
    mileage: {
      min: roundBounds(Math.min(...mileages), "down"),
      max: roundBounds(Math.max(...mileages), "up"),
    },
    price: {
      min: roundBounds(Math.min(...prices), "down"),
      max: roundBounds(Math.max(...prices), "up"),
    },
  }
}

export function buildVehicleFilterGroups(
  vehicles: VehicleCard[]
): VehicleFilterGroup[] {
  const keysInOrder: VehicleFilterKey[] = [
    "bodyTypes",
    "brands",
    "conditions",
    "colors",
    "transmissions",
  ]

  return keysInOrder
    .map((key) => ({
      key,
      title: filterGroupTitles[key],
      options: getUniqueFilterOptions(vehicles, key),
    }))
    .filter((group) => group.options.length > 0)
}

function matchesSelection(selectedValues: string[], candidateValue: string) {
  if (selectedValues.length === 0) {
    return true
  }

  const normalizedCandidateValue = candidateValue.trim().toLowerCase()

  return selectedValues.some(
    (selectedValue) =>
      selectedValue.trim().toLowerCase() === normalizedCandidateValue
  )
}

function matchesRange(
  value: number,
  range: VehicleFilterRange,
  bounds: VehicleFilterRange
) {
  if (bounds.min >= bounds.max) {
    return true
  }

  return value >= range.min && value <= range.max
}

export function matchesVehicleFilters(
  vehicle: VehicleCard,
  filters: VehicleFilters,
  mileageBounds: VehicleFilterRange,
  priceBounds: VehicleFilterRange
) {
  return (
    matchesSelection(filters.bodyTypes, normalizeVehicleFilterValue(vehicle.bodyType)) &&
    matchesSelection(filters.brands, normalizeVehicleFilterValue(vehicle.make)) &&
    matchesSelection(filters.conditions, normalizeVehicleFilterValue(vehicle.condition)) &&
    matchesSelection(filters.colors, normalizeVehicleFilterValue(vehicle.color)) &&
    matchesSelection(
      filters.transmissions,
      normalizeVehicleFilterValue(vehicle.transmission)
    ) &&
    matchesRange(vehicle.mileage, filters.mileage, mileageBounds) &&
    matchesRange(vehicle.price, filters.price, priceBounds)
  )
}
