"use client"

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

import { Interval } from "./pricing-wrapper"

export function PricingSwitch({
  interval,
  setInterval,
}: {
  interval: Interval
  setInterval: (interval: Interval) => void
}) {
  return (
    <Tabs
      value={interval}
      onValueChange={(value) => {
        setInterval(value as Interval)
      }}
      className="mx-auto w-40"
    >
      <TabsList className="px-2 py-6">
        <TabsTrigger value="month" className="text-base">
          Monthly
        </TabsTrigger>
        <TabsTrigger value="year" className="text-base">
          Yearly
        </TabsTrigger>
      </TabsList>
    </Tabs>
  )
}
