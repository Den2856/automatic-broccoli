const apiBaseUrl = "https://automatic-broccoli-8517.onrender.com";

export function apiUrl(path: string) {
  if (!apiBaseUrl) {
    return path;
  }

  return `${apiBaseUrl}${path.startsWith("/") ? path : `/${path}`}`;
}