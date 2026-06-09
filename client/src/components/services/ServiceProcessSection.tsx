import SectionHeading from "../ui/SectionHeading"
import type { ServiceProcessStep } from "./serviceContent"

type ServiceProcessSectionProps = {
  eyebrow: string
  title: string
  steps: ServiceProcessStep[]
}

export default function ServiceProcessSection({
  eyebrow,
  title,
  steps,
}: ServiceProcessSectionProps) {
  return (
    <section className="bg-paper px-4 py-[24px] md:px-6 md:py-[34px] xl:px-10 xl:py-[40px]">
      <div className="mx-auto max-w-[1800px]">
        <SectionHeading eyebrow={eyebrow} title={title} titleSize="lg" maxWidth="md" />

        <div className="mt-10 grid gap-5 xl:grid-cols-3">
          {steps.map((step) => (
            <article key={step.title}>
              <div className="overflow-hidden rounded-[10px] bg-cloud">
                <img
                  src={step.imageSrc}
                  alt={step.imageAlt}
                  className="aspect-[1/1] h-full w-full object-cover"
                  style={{ objectPosition: step.imageObjectPosition || "center" }}
                  loading="lazy"
                />
              </div>

              <p className="mt-5 text-[13px] font-medium leading-[1.5] tracking-[-0.02em] text-graphite">
                {step.stepLabel}
              </p>
              <h3 className="mt-3 text-[30px] font-medium leading-[1.06] tracking-[-0.055em] text-obsidian">
                {step.title}
              </h3>
              <p className="mt-3 max-w-[360px] text-[17px] leading-[1.7] tracking-[-0.02em] text-graphite">
                {step.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
