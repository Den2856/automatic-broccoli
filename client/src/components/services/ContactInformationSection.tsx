import SectionHeading from "../ui/SectionHeading"
import type { ContactInfoGroup } from "./serviceContent"

type ContactInformationSectionProps = {
  eyebrow: string
  title: string
  groups: ContactInfoGroup[]
}

function cx(...values: Array<string | false | null | undefined>) {
  return values.filter(Boolean).join(" ")
}

export default function ContactInformationSection({
  eyebrow,
  title,
  groups,
}: ContactInformationSectionProps) {
  return (
    <section className="bg-paper px-4 py-[72px] md:px-6 md:py-[92px] xl:px-10 xl:py-[110px]">
      <div className="mx-auto max-w-[1800px]">
        <SectionHeading eyebrow={eyebrow} title={title} titleSize="lg" maxWidth="md" />

        <div className="mt-12 grid gap-10 md:grid-cols-3 md:gap-0">
          {groups.map((group, index) => (
            <div
              key={group.title}
              className={cx(
                index > 0 && "border-t border-border-soft pt-10 md:border-t-0 md:pt-0",
                index > 0 && "md:border-l md:pl-8 xl:pl-10",
                index === 0 && "md:pr-8 xl:pr-10",
                index === 1 && "md:px-8 xl:px-10",
                index === 2 && "md:pl-8 xl:pl-10"
              )}
            >
              <h3 className="text-[30px] font-medium leading-[1.02] tracking-[-0.06em] text-obsidian sm:text-[34px]">
                {group.title}
              </h3>

              <div className="mt-6 space-y-3">
                {group.items.map((item) =>
                  item.href ? (
                    <a
                      key={item.label}
                      href={item.href}
                      target={item.href.startsWith("http") ? "_blank" : undefined}
                      rel={item.href.startsWith("http") ? "noreferrer" : undefined}
                      className="block text-[16px] leading-[1.7] tracking-[-0.01em] text-obsidian transition-opacity duration-200 hover:opacity-70"
                    >
                      {item.label}
                    </a>
                  ) : (
                    <p
                      key={item.label}
                      className="text-[16px] leading-[1.7] tracking-[-0.01em] text-graphite"
                    >
                      {item.label}
                    </p>
                  )
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
