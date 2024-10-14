"use client"

import { ThemeProvider as ThemeContext } from "next-themes"
import { PropsWithChildren } from "react"

import { useMounted } from "@/hooks/use-mounted"

type Theme = "light" | "dark" | "system"

export const themeMapping: Record<Theme, Theme> = {
  light: "light",
  dark: "dark",
  system: "system",
}

export const ThemeProvider = ({ children }: PropsWithChildren) => {
  const { mounted } = useMounted()

  if (!mounted) return null

  return (
    <ThemeContext
      defaultTheme="system"
      attribute="class"
      disableTransitionOnChange
      themes={Object.values(themeMapping)}
    >
      {children}
    </ThemeContext>
  )
}
