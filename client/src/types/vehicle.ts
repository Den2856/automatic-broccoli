export type VehicleCategoryCard = {
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

export type VehicleCategoryResponse = {
  success: boolean
  data: VehicleCategoryCard[]
  message?: string
}

export type VehicleCard = {
  _id: string
  name: string
  slug: string
  category?: string
  make: string
  color?: string
  featuredImage: string
  featuredImageObjectPosition?: string
  price: number
  bodyType: string
  transmission: string
  fuelType: string
  mileage: number
  year: number | null
  condition: string
}

export type VehicleGalleryImage = {
  src: string
  alt: string
  objectPosition?: string
}

export type VehicleDetail = VehicleCard & {
  description: string
  monthlyPayment: string
  gallery: VehicleGalleryImage[]
  features: string[]
  dealerName: string
  dealerAddress: string
  dealerMapUrl: string
  dealerRating: number
}

export type VehicleListResponse = {
  success: boolean
  data: VehicleCard[]
  message?: string
}

export type VehicleDetailPayload = {
  vehicle: VehicleDetail
  relatedVehicles: VehicleCard[]
}

export type VehicleDetailResponse = {
  success: boolean
  data: VehicleDetailPayload
  message?: string
}

export type VehicleCategoryPagePayload = {
  category: VehicleCategoryCard
  vehicles: VehicleCard[]
}

export type VehicleCategoryPageResponse = {
  success: boolean
  data: VehicleCategoryPagePayload
  message?: string
}

export type FeaturedVehicleCard = VehicleCard
export type FeaturedVehicleResponse = VehicleListResponse

export type CustomerReviewCard = {
  _id: string
  name: string
  location: string
  quote: string
  avatar: string
  rating: number
  sortOrder: number
}

export type CustomerReviewResponse = {
  success: boolean
  data: CustomerReviewCard[]
  message?: string
}
