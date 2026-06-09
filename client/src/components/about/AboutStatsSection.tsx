import SectionHeading from "../ui/SectionHeading"

type AboutStat = {
  value: string
  label: string
}

type AboutStatsSectionProps = {
  eyebrow: string
  title: string
  stats: AboutStat[]
}

export default function AboutStatsSection({
  eyebrow,
  title,
  stats,
}: AboutStatsSectionProps) {
  return (
    <section className="bg-paper px-4 py-[24px] md:px-6 md:py-[34px] xl:px-10 xl:py-[40px]">
      <div className="mx-auto max-w-[1800px]">
        <SectionHeading eyebrow={eyebrow} title={title} titleSize="lg" maxWidth="md" />

        <div className="mt-12 grid overflow-hidden border-t border-border-soft md:grid-cols-3">
          {stats.map((stat, index) => (
            <article
              key={stat.label}
              className={`border-b border-border-soft px-4 py-10 md:min-h-[160px] md:border-b-0 md:px-6 md:py-12 xl:px-10 ${index > 0 ? "md:border-l" : ""}`}
            >
              <p className="text-[64px] font-medium leading-[0.9] tracking-[-0.08em] text-obsidian md:text-[72px]">
                {stat.value}
              </p>
              <p className="mt-2 text-[17px] leading-[1.6] tracking-[-0.02em] text-graphite">
                {stat.label}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
