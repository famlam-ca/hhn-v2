import Stripe from "stripe"

import { env } from "@/env"

export const stripe = new Stripe(env.STRIPE_API_KEY, {
  // @ts-ignore
  apiVersion: "2024-10-28.acacia",
  typescript: true,
})
