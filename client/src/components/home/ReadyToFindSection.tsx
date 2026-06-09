import CtaButton from "../ui/CtaButton"


const bottomGradient = "linear-gradient(to top, rgba(7, 7, 7, 1) 0%, rgba(7, 7, 7, 0.95) 3%, rgba(7, 7, 7, 0.88) 6%, rgba(7, 7, 7, 0.79) 9%, rgba(7, 7, 7, 0.69) 12%, rgba(7, 7, 7, 0.59) 15%, rgba(7, 7, 7, 0.49) 18%, rgba(7, 7, 7, 0.39) 21%, rgba(7, 7, 7, 0.31) 24%, rgba(7, 7, 7, 0.24) 27%, rgba(7, 7, 7, 0.18) 30%, rgba(7, 7, 7, 0.13) 34%, rgba(7, 7, 7, 0.09) 38%, rgba(7, 7, 7, 0.06) 43%, rgba(7, 7, 7, 0.04) 48%, rgba(7, 7, 7, 0.02) 54%, rgba(7, 7, 7, 0.01) 60%, rgba(7, 7, 7, 0.005) 70%, rgba(7, 7, 7, 0.002) 80%, rgba(7, 7, 7, 0.001) 90%, rgba(7, 7, 7, 0) 100%)"


export default function ReadyToFindSection() {
  return (
    <section className="bg-paper px-0">
      <div className="flex w-full justify-center">

        <div className="relative min-h-[600px] w-full overflow-hidden bg-obsidian min-[810px]:min-h-[700px]">

          <div className="relative z-[4] flex w-full max-w-[1800px] flex-col items-start gap-[25px] px-5 pb-0 pt-5 min-[810px]:gap-[30px] min-[810px]:p-[30px] min-[1200px]:p-[40px]">

            <div className="flex w-full max-w-[350px] flex-col items-start gap-2 min-[810px]:max-w-[500px] min-[1200px]:max-w-[700px]">
            
              <h2 className="text-[40px] font-medium leading-[1.3] tracking-[-0.05em] text-paper min-[810px]:text-[50px]">
                Ready to Find Your Next Vehicle?
              </h2>
            </div>

            <CtaButton
              href="/vehcles"
            >
              View Vehcles
            </CtaButton>
          </div>

          <img
            src="/cta.png"
            sizes="(min-width: 1200px) 1200px, (min-width: 810px) 810px, 100vw"
            alt=""
            className="absolute inset-0 z-[1] h-full w-full object-cover [object-position:49.3%_28%]"
            loading="lazy"
          />

          <div
            aria-hidden="true"
            className="absolute inset-x-0 bottom-0 top-0 z-[2] min-[810px]:-top-[207px]"
            style={{ background: bottomGradient }}
          />
        </div>
      </div>
    </section>
  )
}
