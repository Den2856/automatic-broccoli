import Footer from "../components/Footer"
import AboutDrivehubSection from "../components/home/AboutDrivehubSection"
import CustomerReviewsSection from "../components/home/CustomerReviewsSection"
import FeaturedVehiclesSection from "../components/home/FeaturedVehiclesSection"
import Hero from "../components/home/Hero"
import ReadyToFindSection from "../components/home/ReadyToFindSection"
import TradeFinancingSection from "../components/home/TradeFinancingSection"
import TrustedPartnersSection from "../components/home/TrustedPartnersSection"
import VehicleCategoriesSection from "../components/home/VehicleCategoriesSection"

export default function Home() {
  return (
    <main className="bg-paper text-obsidian">
      <Hero />
      <VehicleCategoriesSection />
      <FeaturedVehiclesSection />
      <TradeFinancingSection />
      <TrustedPartnersSection />
      <AboutDrivehubSection />
      <CustomerReviewsSection />
      <ReadyToFindSection />
      <Footer />
    </main>
  )
}
