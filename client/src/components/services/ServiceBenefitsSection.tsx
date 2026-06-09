import SectionHeading from "../ui/SectionHeading"
import type { ServiceBenefit } from "./serviceContent"

type ServiceBenefitsSectionProps = {
  eyebrow: string
  title: string
  items: ServiceBenefit[]
  imageSrc: string
  imageAlt: string
  imageObjectPosition?: string
}

export default function ServiceBenefitsSection({
  eyebrow,
  title,
  items,
  imageSrc,
  imageAlt,
  imageObjectPosition = "center",
}: ServiceBenefitsSectionProps) {
  return (
    <section className="bg-paper px-4 py-[72px] md:px-6 md:py-[92px] xl:px-10 xl:py-[110px]">
      <div className="mx-auto grid max-w-[1800px] gap-12 xl:grid-cols-[minmax(0,1fr)_236px] xl:items-start xl:gap-[110px]">
        <div>
          <SectionHeading eyebrow={eyebrow} title={title} titleSize="lg" maxWidth="md" />

          <div className="mt-12 grid gap-x-10 gap-y-10 md:grid-cols-2">
            {items.map((item) => (
              <article key={item.title}>
                <h3 className="text-[28px] font-medium leading-[1.05] tracking-[-0.05em] text-obsidian">
                  {item.title}
                </h3>
                <p className="mt-4 max-w-[290px] text-[17px] leading-[1.7] tracking-[-0.02em] text-graphite">
                  {item.description}
                </p>
              </article>
            ))}
          </div>
        </div>

        <div className="mx-auto w-full max-w-[320px] overflow-hidden rounded-[10px] xl:max-w-none">
          <img
            src={imageSrc}
            alt={imageAlt}
            className="aspect-[236/316] h-full w-full object-cover"
            style={{ objectPosition: imageObjectPosition }}
            loading="lazy"
          />
        </div>
      </div>
    </section>
  )
}
