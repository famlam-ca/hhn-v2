import { MaxWidthWrapper } from "@/components/max-width-wrapper"
import { getSession } from "@/server/session"

import { PricingHeader } from "./_components/pricing-header"
import { PricingWrapper } from "./_components/pricing-wrapper"

export default async function PricingPage() {
  const { session } = await getSession()

  return (
    <MaxWidthWrapper className="min-h-[calc(100dvh-5rem)] max-w-screen-xl py-8">
      <PricingHeader
        title="Pricing"
        subtitle="Choose the plan that's right for you."
      />
      <PricingWrapper session={session} />
    </MaxWidthWrapper>
  )
}
