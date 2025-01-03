"use client"

import { PLAN } from "@prisma/client"
import { toast } from "sonner"

import { stripeRedirect } from "@/actions/stripe-redirect"
import { Button } from "@/components/ui/button"
import { useProModal } from "@/hooks/use-pro-modal"

interface SubscriptionButtonProps {
  plan: PLAN
}

export function SubscriptionButton({ plan }: SubscriptionButtonProps) {
  const proModal = useProModal()

  const onSubmit = async () => {
    if (plan === "PRO" || plan === "BASIC") {
      const res = await stripeRedirect()
      if (!res.success) {
        toast.error(res.message)
      } else if (res.data) {
        window.location.href = res.data
      } else {
        toast.error("Oops!", {
          description: "Something went wrong. Please try again.",
        })
      }
    } else {
      proModal.onOpen()
    }
  }

  return (
    <Button onClick={onSubmit}>
      {plan === "PRO" || plan === "BASIC" ? "Manage subscription" : "Upgrade"}
    </Button>
  )
}
