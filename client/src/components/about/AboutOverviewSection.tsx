import SectionHeading from "../ui/SectionHeading"

type AboutOverviewSectionProps = {
  eyebrow: string
  title: string
  description: string
  imageSrc: string
  imageAlt: string
  imageObjectPosition?: string
}

export default function AboutOverviewSection({
  eyebrow,
  title,
  description,
  imageSrc,
  imageAlt,
  imageObjectPosition = "center",
}: AboutOverviewSectionProps) {
  return (
    <section
      id="about-section"
      className="bg-paper px-4 py-[72px] md:px-6 md:py-[92px] xl:px-10 xl:py-[110px]"
    >
      <div className="mx-auto max-w-[1800px]">
        <SectionHeading
          eyebrow={eyebrow}
          title={title}
          description={description}
          align="center"
          titleSize="lg"
          maxWidth="lg"
          className="mx-auto"
          descriptionClassName="max-w-[760px] text-[17px]"
        />

        <div className="mx-auto mt-12 max-w-[560px] overflow-hidden rounded-[10px]">
          <img
            src={imageSrc}
            alt={imageAlt}
            className="aspect-[400/300] h-full w-full object-cover"
            style={{ objectPosition: imageObjectPosition }}
            loading="lazy"
          />
        </div>
      </div>
    </section>
  )
}
