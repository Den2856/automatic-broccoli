const palette = {
  obsidian: "#070707",
  paper: "#ffffff",
  graphite: "#4a4a4a",
  "amber-drive": "#ffbf00",
  cloud: "#f2f2f2",
  frost: "#f0f0f0",
  charcoal: "#171717",
  success: "#50b800",
  danger: "#ab0000",
  stone: "#6b6b6b",
  "border-soft": "#ededed",
}

const dark = {
  ...palette,
}

export default { ...palette, dark }

export type Palette = typeof palette & { dark: typeof dark }
