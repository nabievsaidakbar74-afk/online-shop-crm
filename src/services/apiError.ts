import axios from "axios"

export function apiErrorMessage(error: unknown, fallback: string) {
  if (!axios.isAxiosError(error)) return fallback
  const data = error.response?.data
  if (data && typeof data === "object" && "message" in data && typeof data.message === "string") {
    return data.message
  }
  return fallback
}
