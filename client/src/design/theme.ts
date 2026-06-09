import palette from "./palette"

type Mode = "light" | "dark"

function hexToRgbChannels(hex: string) {
  const normalized = hex.replace("#", "")
  const value =
    normalized.length === 3
      ? normalized
          .split("")
          .map((char) => char + char)
          .join("")
      : normalized

  const red = Number.parseInt(value.slice(0, 2), 16)
  const green = Number.parseInt(value.slice(2, 4), 16)
  const blue = Number.parseInt(value.slice(4, 6), 16)

  return `${red} ${green} ${blue}`
}

function setColorVar(
  root: HTMLElement,
  token: string,
  hexColor: string
) {
  root.style.setProperty(`--hex-${token}`, hexColor)
  root.style.setProperty(`--c-${token}`, hexToRgbChannels(hexColor))
}

function setVars(p: Omit<typeof palette, "dark">) {
  const root = document.documentElement

  setColorVar(root, "obsidian", p.obsidian)
  setColorVar(root, "paper", p.paper)
  setColorVar(root, "graphite", p.graphite)
  setColorVar(root, "amber-drive", p["amber-drive"])
  setColorVar(root, "cloud", p.cloud)
  setColorVar(root, "frost", p.frost)
  setColorVar(root, "charcoal", p.charcoal)
  setColorVar(root, "success", p.success)
  setColorVar(root, "danger", p.danger)
  setColorVar(root, "stone", p.stone)
  setColorVar(root, "border-soft", p["border-soft"])
}

export function applyTheme(mode: Mode) {
  const root = document.documentElement

  if (mode === "dark") {
    root.classList.add("dark")
  } else {
    root.classList.remove("dark")
  }

  const currentPalette = mode === "dark" ? palette.dark : palette
  setVars(currentPalette)
}

export function initAutoTheme() {
  const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)")

  applyTheme(mediaQuery.matches ? "dark" : "light")
  mediaQuery.addEventListener?.("change", (event) =>
    applyTheme(event.matches ? "dark" : "light")
  )
}

export function toggleTheme() {
  const root = document.documentElement
  applyTheme(root.classList.contains("dark") ? "light" : "dark")
}

export { palette }
