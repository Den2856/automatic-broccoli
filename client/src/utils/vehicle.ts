export function formatVehiclePrice(price: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(price)
}

export function formatVehicleMileage(mileage: number) {
  return new Intl.NumberFormat("en-US").format(mileage)
}

export function getVehicleDisplayName(name: string) {
  return name.replace(/^\d{4}\s+/, "").trim()
}
