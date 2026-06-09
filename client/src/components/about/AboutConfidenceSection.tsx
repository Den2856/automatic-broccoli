import SectionHeading from "../ui/SectionHeading"

type AboutConfidenceItem = {
  title: string
  description: string
}

type AboutConfidenceSectionProps = {
  eyebrow: string
  title: string
  items: AboutConfidenceItem[]
}

export default function AboutConfidenceSection({
  eyebrow,
  title,
  items,
}: AboutConfidenceSectionProps) {
  return (
    <section className="bg-paper px-4 py-[72px] md:px-6 md:py-[92px] xl:px-10 xl:py-[110px]">
      <div className="mx-auto max-w-[1800px]">
        <SectionHeading eyebrow={eyebrow} title={title} titleSize="lg" maxWidth="md" />

        <div className="mt-12 border-t border-border-soft">
          {items.map((item) => (
            <article
              key={item.title}
              className="grid gap-4 border-b border-border-soft py-8 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] md:gap-8"
            >
              <h3 className="text-[28px] font-medium leading-[1.08] tracking-[-0.05em] text-obsidian">
                {item.title}
              </h3>
              <p className="text-[17px] leading-[1.7] tracking-[-0.02em] text-graphite">
                {item.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
