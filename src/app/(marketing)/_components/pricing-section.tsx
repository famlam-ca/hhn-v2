"use client"

import { motion } from "framer-motion"
import { useTheme } from "next-themes"
import { Poppins } from "next/font/google"
import { useEffect, useState } from "react"

import { MaxWidthWrapper } from "@/components/max-width-wrapper"
import Particles from "@/components/ui/particles"

import { FAQ } from "./faq"
import { fadeIn } from "./cta-section"

const textFont = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
})

export function FAQSection() {
  const { theme } = useTheme()
  const [color, setColor] = useState("#ffffff")

  useEffect(() => {
    setColor(theme === "light" ? "#000000" : "#ffffff")
  }, [theme])

  return (
    <section id="faq">
      <MaxWidthWrapper className="relative flex min-h-screen flex-col justify-center">
        <motion.h2
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
          transition={{ duration: 0.5 }}
          className="mb-8 text-center text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl"
        >
          Frequently Asked Questions
        </motion.h2>
        <div className={textFont.className}>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <FAQ />
          </motion.div>
        </div>

        <Particles
          className="absolute inset-0"
          quantity={100}
          ease={80}
          color={color}
          refresh
        />
      </MaxWidthWrapper>
    </section>
  )
}
