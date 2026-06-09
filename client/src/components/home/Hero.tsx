import { motion } from "framer-motion"
import Header from "../Header"
import CtaButton from "../ui/CtaButton"

type HomeHeroProps = {
  variant?: "home"
}

type PageHeroProps = {
  variant: "page"
  title: string
  imageSrc: string
  imageAlt: string
  imageObjectPosition?: string
}

type HeroProps = HomeHeroProps | PageHeroProps

const textContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
    },
  },
}

const textItem = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
}

function HomeHero() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-obsidian text-paper">
      <img
        src="/hero.png"
        alt="Luxury vehicle"
        className="absolute inset-0 h-full w-full object-cover object-[72%_center] sm:object-[68%_center] lg:object-center"
      />

      <Header />

      <div className="relative mx-auto flex min-h-[680px] max-w-[1440px] items-end px-4 pb-10 pt-28 sm:min-h-[760px] sm:px-6 sm:pb-14 sm:pt-36 lg:h-full lg:min-h-0 lg:px-8 lg:pb-0 lg:pt-0">
        <motion.div
          variants={textContainer}
          initial="hidden"
          animate="show"
          className="w-full max-w-[470px] pb-4 lg:absolute lg:left-8 lg:top-[420px] lg:pb-0"
        >
          <motion.h1
            variants={textItem}
            className="max-w-[290px] text-[36px] font-semibold leading-[0.95] tracking-[-0.055em] text-paper sm:max-w-[380px] sm:text-[48px] lg:max-w-[470px] lg:text-[64px]"
          >
            Find New and Pre-Owned Cars for Sale Today
          </motion.h1>

          <motion.p
            variants={textItem}
            className="mt-4 max-w-[290px] text-[14px] leading-[1.65] text-paper/76 sm:mt-6 sm:max-w-[420px] sm:text-[17px] sm:leading-[1.7]"
          >
            Browse a wide selection of new and used vehicles, ready for
            immediate purchase or inquiry.
          </motion.p>

          <motion.div
            variants={textItem}
            className="mt-6 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:items-center"
          >
            <CtaButton href="/vehicles#vehicles" fullWidth className="sm:w-auto">
              Explore Vehicles
            </CtaButton>

            <CtaButton
              href="/vehicles/search"
              variant="outline"
              fullWidth
              className="sm:w-auto"
            >
              Search Vehicles
            </CtaButton>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

function PageHero({
  title,
  imageSrc,
  imageAlt,
  imageObjectPosition = "center",
}: PageHeroProps) {
  return (
    <section className="relative min-h-[420px] overflow-hidden bg-obsidian text-paper sm:min-h-[500px] xl:min-h-[610px]">
      <img
        src={imageSrc}
        alt={imageAlt}
        className="absolute inset-0 h-full w-full object-cover"
        style={{ objectPosition: imageObjectPosition }}
      />

      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.72)_0%,rgba(0,0,0,0.38)_24%,rgba(0,0,0,0.3)_52%,rgba(0,0,0,0.58)_100%)]" />

      <Header containerClassName="max-w-none px-4 md:px-6 xl:px-6" />

      <div className="relative mx-auto flex min-h-[420px] max-w-[1800px] items-end px-4 pb-8 pt-32 sm:min-h-[500px] sm:px-6 sm:pb-10 sm:pt-36 xl:min-h-[610px] xl:px-8 xl:pb-8 xl:pt-40">
        <motion.div
          variants={textContainer}
          initial="hidden"
          animate="show"
          className="w-full"
        >
          <motion.h1
            variants={textItem}
            className="max-w-[780px] text-[44px] font-medium leading-[0.95] tracking-[-0.08em] text-paper sm:text-[56px] xl:text-[68px]"
          >
            {title}
          </motion.h1>
        </motion.div>
      </div>
    </section>
  )
}

export default function Hero(props: HeroProps = { variant: "home" }) {
  if (props.variant === "page") {
    return <PageHero {...props} />
  }

  return <HomeHero />
}
