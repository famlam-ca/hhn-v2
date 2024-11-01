import { checkSubscription } from "@/lib/subscription"

import { SubscriptionButton } from "./_components/subscription-button"

export default async function BillingPage() {
  const { plan } = await checkSubscription()

  return <SubscriptionButton plan={plan} />
}
