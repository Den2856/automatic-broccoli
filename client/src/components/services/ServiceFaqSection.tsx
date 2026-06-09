import { useEffect, useState } from "react"
import { ChevronDown } from "lucide-react"
import SectionHeading from "../ui/SectionHeading"
import type { ServiceFaqItem } from "./serviceContent"

type ServiceFaqSectionProps = {
  eyebrow: string
  title: string
  items: ServiceFaqItem[]
  defaultOpenIndex?: number | null
}

export default function ServiceFaqSection({
  eyebrow,
  title,
  items,
  defaultOpenIndex = null,
}: ServiceFaqSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(defaultOpenIndex)

  useEffect(() => {
    setOpenIndex(defaultOpenIndex)
  }, [defaultOpenIndex, items])

  return (
    <section className="bg-paper px-4 py-[72px] md:px-6 md:py-[92px] xl:px-10 xl:py-[110px]">
      <div className="mx-auto max-w-[1800px]">
        <SectionHeading eyebrow={eyebrow} title={title} titleSize="lg" maxWidth="md" />

        <div className="mt-12">
          {items.map((item, index) => {
            const isOpen = openIndex === index

            return (
              <div
                key={item.question}
                className="border-b border-border-soft first:border-t"
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex((prev) => (prev === index ? null : index))}
                  className="flex w-full items-center justify-between gap-6 py-6 text-left"
                >
                  <span className="text-[28px] font-medium leading-[1.08] tracking-[-0.05em] text-obsidian">
                    {item.question}
                  </span>
                  <ChevronDown
                    className={`h-5 w-5 shrink-0 text-graphite transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                    strokeWidth={1.9}
                  />
                </button>

                {isOpen ? (
                  <p className="max-w-[760px] pb-6 text-[16px] leading-[1.7] tracking-[-0.01em] text-graphite">
                    {item.answer}
                  </p>
                ) : null}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
