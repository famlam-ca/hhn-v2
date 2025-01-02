import { headers } from "next/headers"
import { NextResponse } from "next/server"
import Stripe from "stripe"

import { stripe } from "@/lib/stripe"
import { db } from "@/server/db"
import { PLAN } from "@/types"

export async function POST(req: Request) {
  const body = await req.text()
  const signature = (await headers()).get("Stripe-Signature") as string

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!,
    )
  } catch {
    return new NextResponse("Webhook error", { status: 400 })
  }

  const session = event.data.object as Stripe.Checkout.Session

  if (event.type === "checkout.session.completed") {
    const subscription = await stripe.subscriptions.retrieve(
      session.subscription as string,
    )

    if (!session?.metadata?.userId) {
      return new NextResponse("User ID is required", { status: 400 })
    }

    await db.userSubscription.create({
      data: {
        userId: session?.metadata?.userId,
        plan: session?.metadata?.plan as PLAN,
        stripeCustomerId: subscription.customer as string,
        stripeSubscriptionId: subscription.id,
        stripePriceId: subscription.items.data[0].price.id,
        stripeCurrentPeriodEnd: new Date(
          subscription.current_period_end * 1000,
        ),
      },
    })
  }

  if (event.type === "invoice.payment_succeeded") {
    const subscription = await stripe.subscriptions.retrieve(
      session.subscription as string,
    )

    await db.userSubscription.update({
      where: {
        stripeSubscriptionId: subscription.id,
      },
      data: {
        plan: session?.metadata?.plan as PLAN,
        stripePriceId: subscription.items.data[0].price.id,
        stripeCurrentPeriodEnd: new Date(
          subscription.current_period_end * 1000,
        ),
      },
    })
  }

  return new NextResponse(null, { status: 200 })
}
