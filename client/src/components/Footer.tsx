

type SocialIconProps = {
  size?: number
  strokeWidth?: number
}

function InstagramIcon({ size = 18, strokeWidth = 1.8 }: SocialIconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-[18px] w-[18px]"
      aria-hidden="true"
      style={{ width: size, height: size }}
    >
      <path
        d="M17 3H7a4 4 0 0 0-4 4v10a4 4 0 0 0 4 4h10a4 4 0 0 0 4-4V7a4 4 0 0 0-4-4Z"
        fill="none"
        stroke="currentColor"
        strokeWidth={strokeWidth}
      />
      <path
        d="M16.5 7.5h.01"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth={strokeWidth}
      />
      <circle
        cx="12"
        cy="12"
        r="3.7"
        fill="none"
        stroke="currentColor"
        strokeWidth={strokeWidth}
      />
    </svg>
  )
}

function FacebookIcon({ size = 18, strokeWidth = 1.8 }: SocialIconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-[18px] w-[18px]"
      aria-hidden="true"
      style={{ width: size, height: size }}
    >
      <path
        d="M14 8h2.5V4.5H14A4 4 0 0 0 10 8.5V11H7.5v3.5H10v5h3.5v-5H16l.5-3.5h-3V9a1 1 0 0 1 1-1Z"
        fill="none"
        stroke="currentColor"
        strokeLinejoin="round"
        strokeWidth={strokeWidth}
      />
    </svg>
  )
}

const socialLinks = [
  {
    label: "Instagram",
    href: "https://www.instagram.com",
    icon: InstagramIcon,
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com",
    icon: FacebookIcon,
  },
]

const footerNavigationLinks = [
  { label: "Home", href: "/" },
  { label: "Vehicles", href: "/vehicles#vehicles" },
  { label: "Financing", href: "/services/financing-options" },
  { label: "Trade-in", href: "/services/trade-in-options" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
]

const footerCompanyLinks = [
  { label: "About", href: "/about" },
  { label: "Privacy Policy", href: "/legal/privacy-policy" },
]

const footerContactLinks = [
  { label: "hello@drivehub.com", href: "mailto:hello@drivehub.com" },
  { label: "+1 (555) 246-8100", href: "tel:+15552468100" },
]


export default function Footer() {
  return (
    <footer className="bg-obsidian px-4 pb-6 pt-12 text-paper md:px-6 md:pb-8 md:pt-16 xl:px-8 xl:pt-20">
      <div className="mx-auto max-w-[1440px]">
        <div className="grid gap-10 border-b border-paper/12 pb-10 md:grid-cols-2 xl:grid-cols-[1.3fr_1fr_1fr_1fr] xl:gap-8 xl:pb-14">
          <div>
            <p className="text-[22px] font-medium tracking-[-0.04em] text-paper">
              Drivehub
            </p>
            <p className="mt-4 max-w-[280px] text-[14px] leading-[1.7] text-paper/62">
              ©2026 Drivehub. All rights reserved.
            </p>

            <div className="mt-6 flex items-center gap-3">
              {socialLinks.map((social) => {
                const Icon = social.icon

                return (
                  <a
                    key={social.label}
                    href={social.href}
                    aria-label={social.label}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-paper/12 text-paper transition duration-200 hover:bg-paper hover:text-obsidian"
                  >
                    <Icon size={18} strokeWidth={1.9} />
                  </a>
                )
              })}
            </div>
          </div>

          <div>
            <p className="text-[13px] font-medium tracking-[0.14em] text-paper/42">
              NAVIGATION
            </p>
            <div className="mt-5 space-y-3">
              {footerNavigationLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="block text-[15px] text-paper transition-opacity duration-200 hover:opacity-70"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          <div>
            <p className="text-[13px] font-medium tracking-[0.14em] text-paper/42">
              COMPANY
            </p>
            <div className="mt-5 space-y-3">
              {footerCompanyLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="block text-[15px] text-paper transition-opacity duration-200 hover:opacity-70"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          <div>
            <p className="text-[13px] font-medium tracking-[0.14em] text-paper/42">
              GET IN TOUCH
            </p>
            <div className="mt-5 space-y-3">
              {footerContactLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="block text-[15px] text-paper transition-opacity duration-200 hover:opacity-70"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="pt-8">
          <p className="text-[58px] font-medium leading-[0.78] tracking-[-0.1em] text-paper md:text-[88px] xl:text-[138px]">
            Drivehub
          </p>
        </div>
      </div>
    </footer>
  )
}
