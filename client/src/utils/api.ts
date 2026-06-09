const apiBaseUrl = import.meta.env.VITE_API_BASE_URL

export function apiUrl(path: string) {
  if (!apiBaseUrl) {
    return path
  }

  return `${apiBaseUrl}${path.startsWith("/") ? path : `/${path}`}`
}