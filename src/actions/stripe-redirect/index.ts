"use server"

import { PLAN } from "@prisma/client"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

import { stripe } from "@/lib/stripe"
import { absoluteUrl } from "@/lib/utils"
import { db } from "@/server/db"
import { getSession } from "@/server/session"
import { ActionResult, PLAN_INTERVAL } from "@/types"

interface StripeRedirectResult extends ActionResult {
  data?: string
}

interface StripeRedirectProps {
  plan?: PLAN
  interval?: PLAN_INTERVAL
}

export async function stripeRedirect({
  plan = "FREE",
  interval = "month",
}: StripeRedirectProps = {}): Promise<StripeRedirectResult> {
  const { session, user } = await getSession()
  if (session === null) {
    return {
      success: false,
      message: "Unauthorized",
      key: "unauthorized",
    }
  }

  const team = await db.team.findFirst({
    where: { members: { some: { userId: user.id } } },
    select: { id: true },
  })
  if (team === null) {
    return {
      success: false,
      message: "Team not found",
      key: "team_not_found",
    }
  }

  const settingsUrl = absoluteUrl(`/dashboard/${team.id}`)

  let url = ""

  try {
    const teamSubscription = await db.userSubscription.findUnique({
      where: { userId: user.id },
    })
    if (teamSubscription && teamSubscription.stripeCustomerId) {
      const stripeSession = await stripe.billingPortal.sessions.create({
        customer: teamSubscription.stripeCustomerId,
        return_url: settingsUrl,
      })

      url = stripeSession.url
    } else {
      const lineItems = []

      if (plan === "FREE") {
        redirect(settingsUrl)
      } else if (plan === "BASIC") {
        lineItems.push({
          price_data: {
            currency: "usd",
            product_data: {
              name: "HHN Basic",
              description:
                "Essential features for small teams | Everything in Free | 5 boards",
            },
            unit_amount: interval === "month" ? 1000 : 10000,
            recurring: { interval },
          },
          quantity: 1,
        })
      } else if (plan === "PRO") {
        lineItems.push({
          price_data: {
            currency: "usd",
            product_data: {
              name: "HHN Pro",
              description:
                "Perfect for small & medium businesses | Everything in Basic | 10 teams | 100 boards",
            },
            unit_amount: interval === "month" ? 1000 : 10000,
            recurring: { interval },
          },
          quantity: 1,
        })
      }

      const stripeSession = await stripe.checkout.sessions.create({
        success_url: settingsUrl,
        cancel_url: settingsUrl,
        payment_method_types: ["card"],
        mode: "subscription",
        billing_address_collection: "auto",
        customer_email: user.email,
        line_items: lineItems,
        metadata: {
          userId: user.id,
          plan,
        },
      })

      url = stripeSession.url || ""
    }
  } catch {
    return {
      success: false,
      message: "Stripe error",
      key: "stripe_error",
    }
  }

  revalidatePath(`/dashboard/${team.id}`)
  redirect(url)
}
