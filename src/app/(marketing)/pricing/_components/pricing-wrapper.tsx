"use client"

import { Session } from "@prisma/client"
import { useEffect, useState } from "react"

import { PLANS } from "@/constants/plans"

import { PricingCard } from "./pricing-card"
import { PricingSwitch } from "./pricing-switch"

export type Interval = "month" | "year"

export function PricingWrapper({ session }: { session: Session | null }) {
  const [interval, setInterval] = useState<Interval>(
    (localStorage.getItem("interval") as Interval) || "month",
  )

  useEffect(() => {
    localStorage.setItem("interval", interval)
  }, [interval])

  return (
    <>
      <PricingSwitch interval={interval} setInterval={setInterval} />
      <section className="my-16 mt-8 flex flex-col items-center justify-center gap-8 pb-16 sm:flex-row sm:flex-wrap">
        {PLANS.map((plan) => (
          <PricingCard
            key={plan.title}
            {...plan}
            interval={interval}
            session={session}
          />
        ))}
      </section>
    </>
  )
}
