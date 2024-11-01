"use client"

import { useTheme } from "next-themes"

import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { MagicCard } from "@/components/ui/magic-card"
import { FEATURES } from "@/constants/about"

export function KanbanFeatures() {
  const { theme } = useTheme()

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="mb-12 text-center text-3xl font-bold">Why Choose Us?</h2>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((feature, index) => (
            <MagicCard
              key={index}
              gradientColor={theme === "light" ? "#D9D9D955" : "#262626"}
              className="shadow-xl"
            >
              <CardHeader>
                <feature.icon className="mb-2 h-10 w-10 text-primary" />
                <CardTitle>{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>{feature.description}</CardDescription>
              </CardContent>
            </MagicCard>
          ))}
        </div>
      </div>
    </section>
  )
}
