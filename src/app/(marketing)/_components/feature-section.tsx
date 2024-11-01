"use client"

import { motion } from "framer-motion"
import { Poppins } from "next/font/google"

import { MaxWidthWrapper } from "@/components/max-width-wrapper"
import RetroGrid from "@/components/ui/retro-grid"
import { FEATURES } from "@/constants/marketing"
import { cn } from "@/lib/utils"

import { fadeIn } from "./cta-section"

const textFont = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
})

export function FeatureSection() {
  return (
    <section id="features" className="relative">
      <MaxWidthWrapper className="flex min-h-screen flex-col justify-center">
        <motion.h2
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-8 text-center text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl"
        >
          Features
        </motion.h2>
        <div
          className={cn(
            "grid gap-6 lg:grid-cols-3 lg:gap-12",
            textFont.className,
          )}
        >
          {FEATURES.map((feature, index) => (
            <div
              key={feature.title}
              className="flex flex-col items-center space-y-4"
            >
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeIn}
                transition={{ duration: 0.5, delay: 0.4 + index * 0.2 }}
                className="rounded-full bg-secondary p-2 text-foreground"
              >
                <feature.icon className="size-6" />
              </motion.div>
              <motion.h3
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeIn}
                transition={{ duration: 0.5, delay: 0.6 + index * 0.2 }}
                className="text-xl font-bold"
              >
                {feature.title}
              </motion.h3>
              <motion.p
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeIn}
                transition={{ duration: 0.5, delay: 0.8 + index * 0.2 }}
                className="text-center text-muted-foreground"
              >
                {feature.description}
              </motion.p>
            </div>
          ))}
        </div>
      </MaxWidthWrapper>

      <RetroGrid className="absolute inset-0" />
    </section>
  )
}
