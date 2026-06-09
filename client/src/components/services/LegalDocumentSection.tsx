import SectionHeading from "../ui/SectionHeading"
import type { LegalDocumentSection as LegalDocumentSectionItem } from "./serviceContent"

type LegalDocumentSectionProps = {
  title: string
  updatedAt: string
  sections: LegalDocumentSectionItem[]
}

export default function LegalDocumentSection({
  title,
  updatedAt,
  sections,
}: LegalDocumentSectionProps) {
  return (
    <section className="bg-paper px-4 pb-[72px] pt-10 md:px-6 md:pb-[92px] md:pt-14 xl:px-10 xl:pb-[110px] xl:pt-20">
      <div className="mx-auto max-w-[1800px]">
        <div className="grid gap-12 xl:grid-cols-[minmax(240px,360px)_minmax(0,820px)] xl:gap-16">
          <div>
            <h1 className="text-[40px] font-medium leading-[0.95] tracking-[-0.07em] text-obsidian sm:text-[50px] xl:text-[60px]">
              {title}
            </h1>

            <div className="mt-4 flex items-center gap-2 text-[13px] font-medium tracking-[-0.01em] text-graphite">
              <span>Last updated:</span>
              <span className="text-obsidian">{updatedAt}</span>
            </div>
          </div>

          <div className="max-w-[780px]">
            {sections.map((section, index) => (
              <div key={section.title} className={index > 0 ? "mt-10" : ""}>
                <SectionHeading
                  as="h2"
                  title={section.title}
                  titleSize="sm"
                  spacing="sm"
                  maxWidth="full"
                  showDot={false}
                  titleClassName="tracking-[-0.045em]"
                />

                <p className="mt-4 text-[15px] leading-[1.8] tracking-[-0.01em] text-graphite">
                  {section.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
