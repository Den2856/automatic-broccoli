import type { ReactNode } from "react"
import { Link } from "react-router"

type CtaButtonProps = {
  href: string
  children: ReactNode
  variant?: "solid" | "outline" | "dark"
  size?: "sm" | "md"
  fullWidth?: boolean
  className?: string
}

const baseClasses =
  "inline-flex items-center justify-center rounded-[6px] font-medium whitespace-nowrap transition-all duration-200"

const variantClasses = {
  solid: "bg-paper text-charcoal hover:bg-frost",
  outline: "border border-paper/22 bg-transparent text-paper hover:bg-paper hover:text-charcoal transition-colors duration-300",
  dark: "bg-obsidian text-paper hover:opacity-90",
}

const sizeClasses = {
  sm: "h-10 px-4 text-[13px]",
  md: "h-[44px] px-5 text-[14px]",
}

export default function CtaButton({href, children, variant = "solid", size = "md", fullWidth = false, className = "", }: CtaButtonProps) {
  const widthClass = fullWidth ? "w-full" : ""
  const buttonClasses = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${widthClass} ${className}`.trim()

  return (
    <Link
      to={href}
      className={buttonClasses}
    >
      {children}
    </Link>
  )
}
