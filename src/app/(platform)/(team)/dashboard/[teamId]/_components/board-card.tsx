"use client"

import { Board } from "@prisma/client"
import { motion, useAnimation } from "framer-motion"
import Link from "next/link"
import { useEffect, useState } from "react"

import { cn } from "@/lib/utils"

import "./styles.css"

interface BoardCardProps {
  index: number
  board: Board
}

export function BoardCard({ index, board }: BoardCardProps) {
  const controls = useAnimation()

  useEffect(() => {
    controls.start((i) => ({
      opacity: 1,
      filter: "blur(0px)",
      transition: { delay: i * 0.1, duration: 0.2, ease: "easeInOut" },
    }))
  }, [controls])

  return (
    <motion.div
      layout
      custom={index}
      initial={{ opacity: 0, filter: "blur(10px)" }}
      animate={controls}
    >
      <Card board={board} />
    </motion.div>
  )
}

interface CardProps {
  board: Board
}

export function Card({ board }: CardProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      tabIndex={0}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onFocus={() => setIsHovered(true)}
      onBlur={() => setIsHovered(false)}
      style={{ backgroundImage: `url(${board.imageThumbUrl})` }}
      className={cn(
        "box group relative aspect-video h-full w-full rounded-sm bg-primary bg-cover bg-center bg-no-repeat p-2",
        {
          "box-hover": isHovered && !board.closed,
          "opacity-50": board.closed,
        },
      )}
      animate={{ y: isHovered ? -5 : 0 }}
      transition={{ duration: 0.125, ease: "easeInOut" }}
    >
      <Link key={board.id} href={`/board/${board.id}`}>
        <div className="absolute inset-0 bg-black/30 transition group-hover:bg-black/40" />
        <p className="relative truncate font-semibold text-white">
          {board.title}
        </p>
      </Link>
    </motion.div>
  )
}
