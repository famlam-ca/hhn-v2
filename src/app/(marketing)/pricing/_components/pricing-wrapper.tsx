"use client"

import { Session } from "@prisma/client"
import { useEffect, useState } from "react"

import { PLANS } from "@/constants/plans"

import { PricingCard } from "./pricing-card"
import { PricingSwitch } from "./pricing-switch"

export function PricingWrapper({ session }: { session: Session | null }) {
  const [isYearly, setIsYearly] = useState<boolean>(
    localStorage.getItem("isYearly") === "true" || false,
  )

  useEffect(() => {
    localStorage.setItem("isYearly", isYearly.toString())
  }, [isYearly])

  return (
    <>
      <PricingSwitch isYearly={isYearly} setIsYearly={setIsYearly} />
      <section className="my-16 mt-8 flex flex-col items-center justify-center gap-8 pb-16 sm:flex-row sm:flex-wrap">
        {PLANS.map((plan) => (
          <PricingCard
            key={plan.title}
            {...plan}
            isYearly={isYearly}
            session={session}
          />
        ))}
      </section>
    </>
  )
}
