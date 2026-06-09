import { useEffect } from "react"
import Footer from "../components/Footer"
import Hero from "../components/home/Hero"
import AboutConfidenceSection from "../components/about/AboutConfidenceSection"
import AboutOverviewSection from "../components/about/AboutOverviewSection"
import AboutStatsSection from "../components/about/AboutStatsSection"
import { aboutConfidenceItems,  aboutOverviewContent, aboutStats, } from "../components/about/aboutContent"
import ReadyToFindSection from "../components/home/ReadyToFindSection"

export default function AboutPage() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" })
  }, [])

  return (
    <main className="min-h-screen bg-paper text-obsidian">
      <Hero
        variant="page"
        title="About Drivehub"
        imageSrc="/categoriesHero/aboutHero.png"
        imageAlt="About Drivehub hero"
        imageObjectPosition="48.8% 33.3%"
      />

      <AboutOverviewSection {...aboutOverviewContent} />
      <AboutStatsSection
        eyebrow="At a Glance"
        title="Key Dealership Facts"
        stats={aboutStats}
      />
      <AboutConfidenceSection
        eyebrow="Benefits"
        title="Buying With Confidence"
        items={aboutConfidenceItems}
      />

      <ReadyToFindSection />
      <Footer />
    </main>
  )
}
