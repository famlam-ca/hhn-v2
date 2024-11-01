"use client"

import { motion } from "framer-motion"
import { useTheme } from "next-themes"
import { Poppins } from "next/font/google"

import { MaxWidthWrapper } from "@/components/max-width-wrapper"
import GridPattern from "@/components/ui/animated-grid-pattern"
import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { MagicCard } from "@/components/ui/magic-card"
import { PRODUCTS } from "@/constants/marketing"
import { cn } from "@/lib/utils"

import { fadeIn } from "./cta-section"

const textFont = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
})

export function ProductSection() {
  const { theme } = useTheme()

  return (
    <section id="products" className="relative">
      <MaxWidthWrapper className="flex min-h-screen flex-col justify-center">
        <motion.h2
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-8 text-center text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl"
        >
          Our Products
        </motion.h2>
        <div
          className={cn(
            "grid gap-6 lg:grid-cols-2 lg:gap-12",
            textFont.className,
          )}
        >
          {PRODUCTS.map((product, index) => (
            <motion.div
              key={product.title}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              transition={{ duration: 0.5, delay: 0.4 + index * 0.2 }}
            >
              <MagicCard
                gradientColor={theme === "light" ? "#D9D9D955" : "#262626"}
                className="shadow-xl"
              >
                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeIn}
                  transition={{ duration: 0.5, delay: 0.6 + index * 0.2 }}
                >
                  <CardHeader>
                    <CardTitle>{product.title}</CardTitle>
                    <CardDescription>{product.description}</CardDescription>
                  </CardHeader>
                </motion.div>
                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeIn}
                  transition={{ duration: 0.5, delay: 0.8 + index * 0.2 }}
                >
                  <CardContent>
                    <ul className="list-inside list-disc space-y-2">
                      {product.content.map((content, index) => (
                        <motion.li
                          initial="hidden"
                          whileInView="visible"
                          viewport={{ once: true }}
                          variants={fadeIn}
                          transition={{
                            duration: 0.5,
                            delay: 0.2 + index * 0.2,
                          }}
                          key={content}
                        >
                          {content}
                        </motion.li>
                      ))}
                    </ul>
                  </CardContent>
                </motion.div>
              </MagicCard>
            </motion.div>
          ))}
        </div>
      </MaxWidthWrapper>

      <GridPattern
        numSquares={30}
        maxOpacity={0.1}
        duration={3}
        className={cn(
          "[mask-image:radial-gradient(500px_circle_at_center,white,transparent)]",
          "inset-x-0 inset-y-[-30%] h-[170%] skew-y-12",
        )}
      />
    </section>
  )
}
