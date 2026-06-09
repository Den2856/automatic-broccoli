import { ImageIcon } from "lucide-react"
import type { VehicleDetail, VehicleGalleryImage } from "../../types/vehicle"
import { resolveAssetPath } from "../../utils/assets"
import { getVehicleDisplayName } from "../../utils/vehicle"

function buildGalleryImages(vehicle: VehicleDetail): VehicleGalleryImage[] {
  const gallery = vehicle.gallery.filter((image) => image.src)

  if (gallery.length > 0) {
    return gallery
  }

  return [
    {
      src: vehicle.featuredImage,
      alt: getVehicleDisplayName(vehicle.name),
      objectPosition: vehicle.featuredImageObjectPosition || "center",
    },
  ]
}

type VehicleGalleryProps = {
  vehicle: VehicleDetail
}

export default function VehicleGallery({ vehicle }: VehicleGalleryProps) {
  const gallery = buildGalleryImages(vehicle)
  const heroImage = gallery[0]

  if (!heroImage) {
    return null
  }

  const secondaryImages = Array.from(
    { length: 4 },
    (_, index) => gallery[index + 1] || heroImage
  )

  return (
    <div className="mt-5 grid gap-[10px] xl:grid-cols-[minmax(0,1.55fr)_minmax(0,1fr)]">
      <div className="relative overflow-hidden rounded-[10px] bg-cloud">
        <img
          src={resolveAssetPath(heroImage.src)}
          alt={heroImage.alt}
          className="h-[280px] w-full object-cover md:h-[420px] xl:h-[464px]"
          style={{ objectPosition: heroImage.objectPosition || "center" }}
        />

        <a
          href={resolveAssetPath(heroImage.src)}
          target="_blank"
          rel="noreferrer"
          className="absolute bottom-5 left-5 inline-flex h-[38px] items-center gap-2 rounded-[5px] bg-paper px-4 text-[13px] font-medium text-obsidian transition-opacity duration-200 hover:opacity-90"
        >
          <ImageIcon size={15} strokeWidth={1.8} />
          View Gallery
        </a>
      </div>

      <div className="grid grid-cols-2 gap-[10px]">
        {secondaryImages.map((image, index) => (
          <div
            key={`${image.src}-${index}`}
            className="overflow-hidden rounded-[10px] bg-cloud"
          >
            <img
              src={resolveAssetPath(image.src)}
              alt={image.alt}
              className="h-[135px] w-full object-cover md:h-[205px] xl:h-[227px]"
              style={{ objectPosition: image.objectPosition || "center" }}
              loading="lazy"
            />
          </div>
        ))}
      </div>
    </div>
  )
}
