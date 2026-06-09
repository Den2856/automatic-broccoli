import SectionHeading from "../ui/SectionHeading"
import CarouselShell from "../ui/CarouselShell"

function getDesktopPartnerCellClass(index: number) {
  const desktopGridBorders = [
    "border-b border-r",
    "border-b",
    "border-b border-r",
    "border-b",
    "border-r",
    "",
  ]

  return desktopGridBorders[index] || ""
}

export default function TrustedPartnersSection() {
  const trustedPartners = [
    {
      name: "Partner 01",
      logo: "https://framerusercontent.com/images/r460TShC3vPmDSlt33D6qGyfw.svg?width=151",
    },
    {
      name: "Partner 02",
      logo: "https://framerusercontent.com/images/HiGAuMpQ2cZIqZAoeisAZ0Wf0k.svg?width=99",
    },
    {
      name: "Partner 03",
      logo: "https://framerusercontent.com/images/Qwup2aFsHBvFPna2irxUJcwMo.svg?width=154",
    },
    {
      name: "Partner 04",
      logo: "https://framerusercontent.com/images/1l9i5n4v2OoLhJTtl2wevJbn2DM.svg?width=100",
    },
    {
      name: "Partner 05",
      logo: "https://framerusercontent.com/images/vNWaR5nx51nsA2XoOA1k7tzVS4.svg?width=157",
    },
    {
      name: "Partner 06",
      logo: "https://framerusercontent.com/images/DSbo74GOzmDkI2lPs0sk6E4eZM.svg?width=100",
    },
  ]

  return (
    <section className="bg-paper px-4 md:px-6 xl:px-8">
      <div className="mx-auto max-w-[1440px]">
        <SectionHeading
          eyebrow="Trusted Brands"
          title="Our Trusted Partners"
          align="center"
          titleSize="lg"
          maxWidth="md"
          className="mx-auto"
        />

        <CarouselShell
          heading={null}
          prevLabel="Previous partner"
          nextLabel="Next partner"
          options={{
            align: "start",
            loop: trustedPartners.length > 1,
            dragFree: false,
            slidesToScroll: 1,
          }}
          sectionClassName="mt-10 min-[769px]:hidden"
          containerClassName="flex flex-col-reverse items-center gap-12"
          headerClassName="mb-5 flex justify-center"
          buttonClassName="!size-12"
          viewportClassName="overflow-hidden"
          trackClassName="flex"
        >
          {trustedPartners.map((partner) => (
            <article
              key={`mobile-${partner.logo}`}
              className="min-w-0 flex-[0_0_100%]"
            >
              <div className="flex min-h-[116px] items-center justify-center rounded-[18px] bg-paper">
                <img
                  src={partner.logo}
                  alt={partner.name}
                  className="max-h-9 w-auto object-contain opacity-90"
                  loading="lazy"
                />
              </div>
            </article>
          ))}
        </CarouselShell>

        <div className="mt-12 hidden grid-cols-2 grid-rows-3 overflow-hidden rounded-[18px] min-[769px]:grid">
          {trustedPartners.map((partner, index) => (
            <div
              key={partner.logo}
              className={`flex min-h-[116px] items-center justify-center border-border-soft bg-paper ${getDesktopPartnerCellClass(index)}`}
            >
              <img
                src={partner.logo}
                alt={partner.name}
                className="w-auto object-contain opacity-90"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
