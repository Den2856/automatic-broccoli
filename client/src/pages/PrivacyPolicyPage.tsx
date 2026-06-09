import { useEffect } from "react"
import Footer from "../components/Footer"
import Header from "../components/Header"
import LegalDocumentSection from "../components/services/LegalDocumentSection"
import { privacyPolicyContent } from "../components/services/serviceContent"

export default function PrivacyPolicyPage() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" })
  }, [])

  return (
    <main className="min-h-screen bg-paper text-obsidian">
      <Header
        theme="light"
        containerClassName="max-w-none px-4 md:px-6 xl:px-6"
      />

      <LegalDocumentSection {...privacyPolicyContent} />

      <Footer />
    </main>
  )
}
