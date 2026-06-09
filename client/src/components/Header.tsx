import { useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { Mail, MapPin, Menu, Phone, Search, X } from "lucide-react"
import { Link } from "react-router-dom"
import CtaButton from "./ui/CtaButton"

type HeaderProps = {
  theme?: "overlay" | "light"
  containerClassName?: string
}

const navItems = [
  { label: "Home", href: "/" },
  { label: "Vehicles", href: "/vehicles#vehicles" },
  { label: "Blog", href: "/blog" },
  { label: "About", href: "/about" },
]

function cx(...values: Array<string | false | null | undefined>) {
  return values.filter(Boolean).join(" ")
}

export default function Header({
  theme = "overlay",
  containerClassName = "max-w-[1280px] px-4 sm:px-6 lg:px-8",
}: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const isLight = theme === "light"

  function toggleMenu() {
    setIsMenuOpen((prev) => !prev)
  }

  function closeMenu() {
    setIsMenuOpen(false)
  }

  return (
    <header
      className={cx(
        "inset-x-0 top-0 z-50",
        isLight ? "relative bg-paper text-obsidian" : "absolute text-paper"
      )}
    >
      <div className={cx("mx-auto", containerClassName)}>
        <div
          className={cx(
            "hidden h-[26px] items-center gap-4 overflow-hidden border-b text-[11px] font-medium lg:flex",
            isLight
              ? "border-border-soft bg-cloud text-obsidian/85"
              : "border-paper/15 text-paper/85"
          )}
        >
          <div className="flex min-w-0 items-center gap-2">
            <Mail className="h-[12px] w-[12px] shrink-0" strokeWidth={1.8} />
            <span className="truncate">hello@drivehub.com</span>
          </div>

          <span
            className={cx(
              "h-3 w-px shrink-0",
              isLight ? "bg-obsidian/20" : "bg-paper/20"
            )}
          />

          <div className="flex min-w-0 items-center gap-2">
            <Phone className="h-[12px] w-[12px] shrink-0" strokeWidth={1.8} />
            <span className="truncate">+1 (555) 246-8100</span>
          </div>

          <span
            className={cx(
              "h-3 w-px shrink-0",
              isLight ? "bg-obsidian/20" : "bg-paper/20"
            )}
          />

          <div className="flex min-w-0 items-center gap-2">
            <MapPin className="h-[12px] w-[12px] shrink-0" strokeWidth={1.8} />
            <span className="truncate">2450 W Pico Blvd, Los Angeles</span>
          </div>
        </div>

        <div
          className={cx(
            "relative flex h-[72px] items-center justify-between lg:h-[64px]",
            isLight && "bg-paper"
          )}
        >
          <Link
            to="/"
            className={cx(
              "text-[17px] font-semibold tracking-[-0.02em]",
              isLight ? "text-obsidian" : "text-paper"
            )}
          >
            Drivehub
          </Link>

          <nav className="hidden lg:block">
            <ul className="flex items-center gap-12">
              {navItems.map((item) => (
                <li key={item.label}>
                  <Link
                    to={item.href}
                    className={cx(
                      "text-[16px] font-medium transition-opacity duration-200 hover:opacity-75",
                      isLight ? "text-obsidian" : "text-paper"
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-1.5 sm:gap-3 lg:gap-5">
            <button
              type="button"
              aria-label="Search"
              className={cx(
                "inline-flex h-10 w-10 items-center justify-center transition-opacity duration-200 hover:opacity-75",
                isLight ? "text-obsidian" : "text-paper"
              )}
            >
              <Search className="h-[18px] w-[18px]" strokeWidth={1.9} />
            </button>

            <div className="hidden sm:block lg:block">
              {isLight ? (
                <Link
                  to="/contact"
                  className="inline-flex h-[44px] items-center justify-center rounded-[5px] bg-obsidian px-5 text-[14px] font-medium text-paper transition-opacity duration-200 hover:opacity-90"
                >
                  Contact Us
                </Link>
              ) : (
                <CtaButton href="/contact" variant="solid" size="md">
                  Contact Us
                </CtaButton>
              )}
            </div>

            <button
              type="button"
              onClick={toggleMenu}
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMenuOpen}
              className={cx(
                "inline-flex h-10 w-10 items-center justify-center transition-opacity duration-200 hover:opacity-75 lg:hidden",
                isLight ? "text-obsidian" : "text-paper"
              )}
            >
              {isMenuOpen ? (
                <X className="h-5 w-5" strokeWidth={1.9} />
              ) : (
                <Menu className="h-5 w-5" strokeWidth={1.9} />
              )}
            </button>
          </div>

          <AnimatePresence>
            {isMenuOpen ? (
              <motion.div
                initial={{ opacity: 0, y: -12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.22 }}
                className={cx(
                  "absolute left-0 right-0 top-full mt-2 overflow-hidden rounded-2xl p-4 shadow-[0_20px_60px_rgba(0,0,0,0.18)] backdrop-blur-xl lg:hidden",
                  isLight
                    ? "border border-border-soft bg-paper"
                    : "border border-paper/10 bg-obsidian/95"
                )}
              >
                <nav>
                  <ul className="flex flex-col">
                    {navItems.map((item) => (
                      <li key={item.label}>
                        <Link
                          to={item.href}
                          onClick={closeMenu}
                          className={cx(
                            "flex min-h-12 items-center rounded-xl px-3 text-[15px] font-medium transition-colors duration-200",
                            isLight
                              ? "text-obsidian/92 hover:bg-cloud"
                              : "text-paper/92 hover:bg-paper/8"
                          )}
                        >
                          {item.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </nav>

                <div
                  className={cx(
                    "mt-4 pt-4",
                    isLight ? "border-t border-border-soft" : "border-t border-paper/10"
                  )}
                >
                  <div
                    className={cx(
                      "space-y-3 text-[13px]",
                      isLight ? "text-graphite" : "text-paper/72"
                    )}
                  >
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 shrink-0" />
                      <span className="truncate">hello@drivehub.com</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 shrink-0" />
                      <span>+1 (555) 246-8100</span>
                    </div>

                    <div className="flex items-start gap-2">
                      <MapPin className="mt-0.5 h-4 w-4 shrink-0" />
                      <span>2450 W Pico Blvd, Los Angeles</span>
                    </div>
                  </div>

                  <div className="mt-4 grid gap-3">
                    {isLight ? (
                      <>
                        <Link
                          to="/contact"
                          onClick={closeMenu}
                          className="inline-flex h-[44px] w-full items-center justify-center rounded-[5px] bg-obsidian px-5 text-[14px] font-medium text-paper"
                        >
                          Contact Us
                        </Link>

                        <Link
                          to="/vehicles#vehicles"
                          onClick={closeMenu}
                          className="inline-flex h-[44px] w-full items-center justify-center rounded-[5px] border border-border-soft bg-paper px-5 text-[14px] font-medium text-obsidian"
                        >
                          Browse Vehicles
                        </Link>
                      </>
                    ) : (
                      <>
                        <CtaButton href="/contact" fullWidth>
                          Contact Us
                        </CtaButton>

                        <CtaButton
                          href="/vehicles/search"
                          variant="outline"
                          fullWidth
                        >
                          Search Vehicles
                        </CtaButton>
                      </>
                    )}
                  </div>
                </div>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>
      </div>
    </header>
  )
}
