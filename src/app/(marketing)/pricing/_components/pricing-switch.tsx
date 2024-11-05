"use client"

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function PricingSwitch({
  isYearly,
  setIsYearly,
}: {
  isYearly: boolean
  setIsYearly: (isYearly: boolean) => void
}) {
  return (
    <Tabs
      value={isYearly.toString()}
      onValueChange={(value) => {
        setIsYearly(value === "true")
      }}
      className="mx-auto w-40"
    >
      <TabsList className="px-2 py-6">
        <TabsTrigger value="false" className="text-base">
          Monthly
        </TabsTrigger>
        <TabsTrigger value="true" className="text-base">
          Yearly
        </TabsTrigger>
      </TabsList>
    </Tabs>
  )
}
