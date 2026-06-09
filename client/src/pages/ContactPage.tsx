import { useEffect } from "react"
import Footer from "../components/Footer"
import Hero from "../components/home/Hero"
import ContactInformationSection from "../components/services/ContactInformationSection"
import ServiceContactSection from "../components/services/ServiceContactSection"
import ServiceFaqSection from "../components/services/ServiceFaqSection"
import { contactPageContent } from "../components/services/serviceContent"
import TradeFinancingSection from "../components/home/TradeFinancingSection"

export default function ContactPage() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" })
  }, [])

  return (
    <main className="min-h-screen bg-paper text-obsidian">
      <Hero
        variant="page"
        title={contactPageContent.hero.title}
        imageSrc={contactPageContent.hero.imageSrc}
        imageAlt={contactPageContent.hero.imageAlt}
        imageObjectPosition={contactPageContent.hero.imageObjectPosition}
      />

      <ServiceContactSection {...contactPageContent.contact} />
      <ContactInformationSection {...contactPageContent.info} />
      <TradeFinancingSection />
      <ServiceFaqSection {...contactPageContent.faq} />

      <Footer />
    </main>
  )
}
