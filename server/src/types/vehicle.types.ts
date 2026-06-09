export interface VehicleGalleryImageDto {
  src: string;
  alt: string;
  objectPosition?: string;
}

export interface VehicleCardDto {
  _id: string;
  name: string;
  slug: string;
  category?: string;
  make: string;
  color?: string;
  featuredImage: string;
  featuredImageObjectPosition?: string;
  price: number;
  bodyType: string;
  transmission: string;
  fuelType: string;
  mileage: number;
  year: number | null;
  condition: string;
}

export interface VehicleDetailDto extends VehicleCardDto {
  description: string;
  monthlyPayment: string;
  gallery: VehicleGalleryImageDto[];
  features: string[];
  dealerName: string;
  dealerAddress: string;
  dealerMapUrl: string;
  dealerRating: number;
}

export interface VehicleDetailResponseDto {
  vehicle: VehicleDetailDto;
  relatedVehicles: VehicleCardDto[];
}
