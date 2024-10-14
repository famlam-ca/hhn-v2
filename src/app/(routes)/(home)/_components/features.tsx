"use client"

import { HTMLMotionProps, motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import Link from "next/link"
import type { ReactNode } from "react"

import { cn } from "@/lib/utils"

interface FeatureProps extends HTMLMotionProps<"div"> {
  large?: boolean
  centered?: boolean
  children: ReactNode
  lightOnly?: boolean
  className?: string
  href?: string
  target?: "_blank"
  index: number
}

export function Feature({
  large,
  centered,
  children,
  lightOnly,
  className,
  href,
  target,
  index,
  ...props
}: FeatureProps) {
  return (
    <motion.div
      id="#feature"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-20px" }}
      transition={{ duration: Math.min(0.25 + index * 0.2, 0.8) }}
      className={cn(
        "feature bg-background text-foreground outline-muted group relative w-full max-w-full overflow-hidden rounded-[1.78em] px-7 py-6 outline outline-1 transition-all",
        large && "col-span-1 lg:col-span-2",
        centered && "text-center",
        className,
      )}
      {...props}
    >
      {children}
      {href ? (
        <Link
          className="group/scale oultine-1 bg-background/40 hover:bg-background/75 absolute bottom-[1em] right-[1em] z-[2] flex h-10 w-10 items-center justify-center rounded-full text-white opacity-0 outline outline-2 outline-white/50 backdrop-blur-md transition-all duration-200 ease-in-out hover:scale-105 hover:outline-white/65 hover:active:scale-100 hover:active:outline-white/50 group-hover:opacity-100"
          href={href}
          target={target}
        >
          <ArrowRight className="group-hover/scale:scale-105" />
        </Link>
      ) : null}
    </motion.div>
  )
}

export function Features({ children }: { children: ReactNode }) {
  return (
    <div
      style={{
        fontFeatureSettings: "initial",
      }}
      className="grid grid-cols-1 justify-center gap-[3em] lg:grid-cols-3 lg:gap-[2em]"
    >
      {children}
    </div>
  )
}
