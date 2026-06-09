import SectionHeading from "../ui/SectionHeading"
import CtaButton from "../ui/CtaButton"

export default function AboutDrivehubSection() {

  const aboutDrivehub = {
    image: "https://framerusercontent.com/images/sq7d6hkZyKS9CyP7Aro9dKYym7M.webp?width=2464",
    eyebrow: "About us",
    title: "Get to know Drivehub",
    description:
      "Discover the people, process, and standards behind every vehicle on our lot. We focus on curated inventory, transparent guidance, and a buying experience that feels calm from start to finish.",
    href: "/about",
  }


  return (
    <section className="bg-paper px-4 md:px-6 xl:px-8 py-[100px]">
      <div className="mx-auto max-w-[1440px] overflow-hidden bg-obsidian">
        <div className="relative min-h-[480px] md:min-h-[560px]">
          <img
            src="/about/hero.png"
            alt={aboutDrivehub.title}
            className="absolute inset-0 h-full w-full object-cover"
          />


          <div className="relative flex min-h-[480px] items-end px-5 py-6 md:min-h-[560px] md:px-8 md:py-8 xl:px-10 xl:py-10">
            <div className="flex flex-row justify-between w-full max-md:flex-col max-md:items-start max-md:gap-[25px]">
              <SectionHeading
                eyebrow={aboutDrivehub.eyebrow}
                title={aboutDrivehub.title}
                titleSize="xl"
                maxWidth="full"
                eyebrowClassName="text-paper"
                titleClassName="text-paper"
              />

              <div className="items-end flex max-md:w-full">
                <CtaButton href={aboutDrivehub.href} fullWidth>
                  Learn More
                </CtaButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
