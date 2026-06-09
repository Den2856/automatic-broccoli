import { ArrowRight, BadgeDollarSign, RefreshCcw } from "lucide-react"
import SectionHeading from "../ui/SectionHeading"

const serviceIcons = [RefreshCcw, BadgeDollarSign]

export default function TradeFinancingSection() {

  const tradeFinancingOptions = [
    {
      title: "Trade-In",
      description:
        "Use your current vehicle as part of the purchase and streamline the upgrade process.",
      href: "/services/trade-in-options",
    },
    {
      title: "Financing",
      description:
        "Explore flexible financing solutions designed to fit your budget and buying goals.",
      href: "/services/financing-options",
    },
  ]

  return (
    <section className="bg-paper px-4 md:px-6 xl:px-8 py-[100px]">
      <div className="mx-auto grid max-w-[1440px] gap-8 xl:items-stretch">
          
          <SectionHeading
            eyebrow="Services"
            title="Trade-in & Financing Options"
            titleSize="lg"
            maxWidth="md"
            className="pl-5"
          />

        <div className="overflow-hidden border border-border-soft bg-paper">
          <div className="grid md:grid-cols-2">
            {tradeFinancingOptions.map((option, index) => {
              const Icon = serviceIcons[index] || BadgeDollarSign

              return (
                <article
                  key={option.title}
                  className="border-b border-frost px-5 py-6 last:border-b-0 md:min-h-[260px] md:border-b-0 md:border-r md:last:border-r-0 md:px-8"
                >
                  <div className="flex h-full flex-col justify-between">
                    <div>
                      <div className="inline-flex h-11 w-11 items-center justify-center rounded-[10px] bg-obsidian text-paper">
                        <Icon size={18} strokeWidth={1.9} />
                      </div>

                      <h3 className="mt-5 text-[24px] font-medium tracking-[-0.04em] text-obsidian">
                        {option.title}
                      </h3>

                      <p className="mt-3 max-w-[320px] text-[15px] leading-[1.7] text-graphite">
                        {option.description}
                      </p>
                    </div>

                    <a
                      href={option.href}
                      className="mt-8 inline-flex items-center gap-2 text-[14px] font-medium text-obsidian"
                    >
                      <span>Explore More</span>
                      <ArrowRight size={16} strokeWidth={2} />
                    </a>
                  </div>
                </article>
              )
            })}
          </div>

          <div className="relative min-h-[632px] overflow-hidden bg-obsidian">
            <img
              src="/tradeIn/hero.png"
              alt="Trade-in and financing consultation"
              className="absolute inset-0 size-full object-cover"
            />

          </div>
        </div>


      </div>
    </section>
  )
}
