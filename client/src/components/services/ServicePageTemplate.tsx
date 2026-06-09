import { useEffect } from "react"
import Footer from "../Footer"
import Hero from "../home/Hero"
import ServiceBenefitsSection from "./ServiceBenefitsSection"
import ServiceContactSection from "./ServiceContactSection"
import ServiceFaqSection from "./ServiceFaqSection"
import ServiceProcessSection from "./ServiceProcessSection"
import type { ServicePageContent } from "./serviceContent"

type ServicePageTemplateProps = {
  content: ServicePageContent
}

export default function ServicePageTemplate({
  content,
}: ServicePageTemplateProps) {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" })
  }, [content.hero.title])

  return (
    <main className="min-h-screen bg-paper text-obsidian">
      <Hero
        variant="page"
        title={content.hero.title}
        imageSrc={content.hero.imageSrc}
        imageAlt={content.hero.imageAlt}
        imageObjectPosition={content.hero.imageObjectPosition}
      />

      <ServiceBenefitsSection {...content.benefits} />
      <ServiceProcessSection {...content.process} />
      <ServiceContactSection {...content.contact} />
      <ServiceFaqSection {...content.faq} />

      <Footer />
    </main>
  )
}
