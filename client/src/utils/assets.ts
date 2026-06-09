export function resolveAssetPath(path: string) {
  if (!path) {
    return ""
  }

  if (/^(https?:)?\/\//i.test(path) || path.startsWith("/")) {
    return path
  }

  return `/${path}`
}
