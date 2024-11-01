"use client"

import { motion } from "framer-motion"
import { ChevronRight } from "lucide-react"
import { Poppins } from "next/font/google"
import { useRouter } from "next/navigation"

import { MaxWidthWrapper } from "@/components/max-width-wrapper"
import DotPattern from "@/components/ui/dot-pattern"
import { RainbowButton } from "@/components/ui/rainbow-button"
import { ShimmerBadge } from "@/components/ui/shimmer-badge"
import { cn } from "@/lib/utils"

const textFont = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
})

export const fadeIn = {
  hidden: { opacity: 0, y: 20, filter: "blur(10px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)" },
}

export function CTASection() {
  const router = useRouter()

  return (
    <section className="relative">
      <MaxWidthWrapper className="flex min-h-[calc(100dvh-10rem)] flex-col justify-center">
        <div className="flex flex-col items-center space-y-4 text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mb-4"
          >
            <ShimmerBadge label="v2 Launching Soon!" />
          </motion.div>
          <motion.h1
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            transition={{ duration: 0.5 }}
            className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl lg:text-6xl/none"
          >
            Welcome to Humble Home Network
          </motion.h1>
          <motion.p
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            transition={{ duration: 0.5, delay: 0.2 }}
            className={cn(
              "mx-auto max-w-[700px] pb-8 text-muted-foreground md:text-xl",
              textFont.className,
            )}
          >
            Streamline your workflow with Humble Home Network.
          </motion.p>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <RainbowButton
              onClick={() => router.push("/signup")}
              className={textFont.className}
            >
              Get Started
              <ChevronRight className="ml-2 size-4" />
            </RainbowButton>
          </motion.div>
        </div>
      </MaxWidthWrapper>

      <DotPattern
        className={cn(
          "[mask-image:radial-gradient(400px_circle_at_center,black,transparent)] dark:[mask-image:radial-gradient(400px_circle_at_center,white,transparent)]",
        )}
      />
    </section>
  )
}
