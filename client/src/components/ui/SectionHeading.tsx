import type { ElementType, ReactNode } from "react"

type SectionHeadingProps = {
  title: ReactNode
  eyebrow?: ReactNode
  description?: ReactNode
  as?: ElementType
  align?: "left" | "center" | "right"
  titleSize?: "sm" | "md" | "lg" | "xl"
  spacing?: "sm" | "md" | "lg"
  maxWidth?: "sm" | "md" | "lg" | "full"
  showDot?: boolean
  className?: string
  eyebrowClassName?: string
  titleClassName?: string
  descriptionClassName?: string
}

const alignmentClasses = {
  left: "items-start text-left",
  center: "items-center text-center",
  right: "items-end text-right",
} as const

const titleSizeClasses = {
  sm: "text-[28px] leading-[1.02] tracking-[-0.04em] sm:text-[34px] lg:text-[40px]",
  md: "text-[32px] leading-[0.99] tracking-[-0.05em] sm:text-[40px] lg:text-[48px] xl:text-[54px]",
  lg: "text-[36px] leading-[0.97] tracking-[-0.055em] sm:text-[44px] lg:text-[52px] xl:text-[58px]",
  xl: "text-[40px] leading-[0.94] tracking-[-0.06em] sm:text-[52px] lg:text-[64px] xl:text-[72px]",
} as const

const spacingClasses = {
  sm: {
    title: "mt-3",
    description: "mt-3",
  },
  md: {
    title: "mt-4",
    description: "mt-4",
  },
  lg: {
    title: "mt-5",
    description: "mt-5",
  },
} as const

const maxWidthClasses = {
  sm: "max-w-[420px]",
  md: "max-w-[560px]",
  lg: "max-w-[720px]",
  full: "max-w-none",
} as const

export default function SectionHeading({
  title,
  eyebrow,
  description,
  as: HeadingTag = "h2",
  align = "left",
  titleSize = "lg",
  spacing = "md",
  maxWidth = "full",
  showDot = true,
  className,
  eyebrowClassName,
  titleClassName,
  descriptionClassName,
}: SectionHeadingProps) {
  const spacingPreset = spacingClasses[spacing]
  const wrapperClassName =
    `flex flex-col ${alignmentClasses[align]} ${maxWidthClasses[maxWidth]} ${className || ""}`.trim()
  const eyebrowClasses =
    `inline-flex items-center gap-[10px] text-[13px] font-medium tracking-[-0.02em] text-graphite ${eyebrowClassName || ""}`.trim()
  const titleClasses =
    `font-medium text-obsidian ${eyebrow ? spacingPreset.title : ""} ${titleSizeClasses[titleSize]} ${titleClassName || ""}`.trim()
  const descriptionClasses =
    `text-[15px] leading-[1.7] text-graphite ${spacingPreset.description} ${descriptionClassName || ""}`.trim()

  return (
    <div className={wrapperClassName}>
      {eyebrow ? (
        <p className={eyebrowClasses}>
          {showDot ? <span className="h-1 w-1 rounded-full bg-current" /> : null}
          {eyebrow}
        </p>
      ) : null}

      <HeadingTag className={titleClasses}>
        {title}
      </HeadingTag>

      {description ? (
        <p className={descriptionClasses}>
          {description}
        </p>
      ) : null}
    </div>
  )
}
