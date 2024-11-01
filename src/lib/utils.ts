import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getBaseUrl() {
  if (typeof window !== "undefined") return window.location.origin
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`
  return `http://localhost:${process.env.PORT ?? 3000}`
}

export function generateOTP(): string {
  const MIN = 100000
  const MAX = 999999
  const totp = (Math.floor(Math.random() * (MAX - MIN + 1)) + MIN).toString()
  return totp
}

export function absoluteUrl(path: string) {
  return `${process.env.NEXT_URL}${path}`
}
