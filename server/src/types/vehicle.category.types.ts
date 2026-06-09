export interface VehicleCategoryDto {
  _id: string
  name: string
  slug: string
  description?: string
  coverImage: string
  heroImage: string
  heroImageObjectPosition?: string
  sortOrder: number
  isVisible: boolean
  vehiclesCount: number
}

export interface VehicleCategoryPageDto {
  category: VehicleCategoryDto
  vehicles: import("./vehicle.types.js").VehicleCardDto[]
}
