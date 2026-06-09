import { useEffect } from "react"
import Footer from "../components/Footer"
import Header from "../components/Header"
import ReadyToFindSection from "../components/home/ReadyToFindSection"
import CtaButton from "../components/ui/CtaButton"

export default function NotFoundPage() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" })
  }, [])

  return (
    <main className="min-h-screen bg-paper text-obsidian">
      <Header
        theme="light"
        containerClassName="max-w-none px-4 md:px-6 xl:px-6"
      />

      <section className="bg-paper px-4 pb-[72px] pt-20 md:px-6 md:pb-[92px] md:pt-28 xl:px-10 xl:pb-[110px] xl:pt-32">
        <div className="mx-auto flex max-w-[1800px] flex-col items-center">
          <div className="max-w-[720px] text-center">
            <h1 className="text-[42px] font-medium leading-[0.95] tracking-[-0.07em] text-obsidian sm:text-[56px] xl:text-[68px]">
              This page is unavailable
            </h1>

            <p className="mx-auto mt-5 max-w-[520px] text-[16px] leading-[1.7] tracking-[-0.01em] text-graphite sm:text-[18px]">
              The link may be outdated or the page has been removed.
            </p>
          </div>

          <div className="mt-8">
            <CtaButton
              href="/"
              variant="dark"
              className="px-5"
            >
              Back to home
            </CtaButton>
          </div>
        </div>
      </section>

      <ReadyToFindSection />
      <Footer />
    </main>
  )
}
