"use client"

import { motion, useAnimation } from "framer-motion"
import Image from "next/image"
import { useOnborda } from "onborda"
import { useEffect } from "react"

import { Icons } from "@/components/icons"
import { Button } from "@/components/ui/button"
import { User } from "@/types"

import { CONTAINER_VARIANTS, ITEM_VARIANTS } from "@/constants/onboarding"

export function Onboarding({ user }: { user: User }) {
  const { startOnborda } = useOnborda()
  const controls = useAnimation()

  useEffect(() => {
    controls.start(() => ({
      opacity: 1,
      filter: "blur(0px)",
      transition: { duration: 0.5, ease: "easeInOut" },
      y: 0,
    }))
  }, [controls])

  return (
    <motion.div
      variants={CONTAINER_VARIANTS}
      initial="hidden"
      animate="visible"
      className="flex flex-col items-center gap-y-8 sm:gap-y-12"
    >
      <motion.div
        variants={ITEM_VARIANTS}
        className="flex flex-col items-center gap-4 sm:gap-6 lg:flex-row"
      >
        <h1 className="order-1 mt-2 text-balance text-center text-5xl font-bold !leading-tight tracking-tight md:text-6xl">
          Welcome on{" "}
          <span className="relative py-2">
            board
            <Icons.underline className="pointer-events-none absolute inset-x-0 -bottom-0 hidden text-primary sm:block" />
          </span>
          , {user.displayName}!
        </h1>
        <Image
          src="/assets/party-popper.gif"
          alt="party popper"
          width={100}
          height={100}
          className="order-0 lg:order-2"
        />
      </motion.div>

      <motion.div
        variants={ITEM_VARIANTS}
        className="order-2 space-y-2 text-center text-lg"
      >
        <p>
          I see you&apos;re new here. Let&apos;s get you started with your first
          board! But first, let&apos;s you need to create a team.
        </p>
        <p className="text-muted-foreground">
          Don&apos;t worry, it&apos;s super easy! Just click the button below to
          get started.
        </p>
      </motion.div>

      <motion.div variants={ITEM_VARIANTS} className="order-3">
        <Button
          id="step-1-start-tour"
          onClick={() => startOnborda("kanban-onboarding")}
          size="lg"
          className="text-xl"
        >
          Let&apos;s go!
        </Button>
      </motion.div>
    </motion.div>
  )
}
