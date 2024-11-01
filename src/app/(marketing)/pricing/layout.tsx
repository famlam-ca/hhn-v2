"use client"

import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

import Particles from "@/components/ui/particles"

export default function PricingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { theme } = useTheme()
  const [color, setColor] = useState("#ffffff")

  useEffect(() => {
    setColor(theme === "light" ? "#000000" : "#ffffff")
  }, [theme])

  return (
    <div className="relative">
      {children}
      <Particles
        className="absolute inset-0"
        quantity={100}
        ease={80}
        color={color}
        refresh
      />
    </div>
  )
}
