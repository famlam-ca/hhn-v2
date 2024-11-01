import { type Metadata } from "next"
import { Onborda, OnbordaProvider } from "onborda"
import { PropsWithChildren } from "react"

import { TourCard } from "@/components/tour-card"

import { ONBOARDING_STEPS } from "@/constants/onboarding"

export const metadata: Metadata = {
  title: {
    default: "Get started with HHN Kanban",
    template: "%s | HHN Kanban Onboarding",
  },
  description:
    "Welcome to HHN Kanban! Let me guide you through creating your first board.",
}

export default function OnboardingLayout({ children }: PropsWithChildren) {
  return (
    <OnbordaProvider>
      <Onborda
        steps={ONBOARDING_STEPS}
        shadowOpacity="0.8"
        cardComponent={TourCard}
        cardTransition={{ type: "spring", stiffness: 100, damping: 10 }}
      >
        <div className="h-screen bg-[url('/assets/platform/bg.jpg')] bg-cover dark:bg-[url('/assets/platform/bg.dark.jpg')]">
          {children}
        </div>
      </Onborda>
    </OnbordaProvider>
  )
}
