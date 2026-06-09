const apiBaseUrl = __API_BASE_URL__.replace(/\/$/, "")

export function apiUrl(path: string) {
  if (!apiBaseUrl) {
    return path
  }

  return `${apiBaseUrl}${path.startsWith("/") ? path : `/${path}`}`
}