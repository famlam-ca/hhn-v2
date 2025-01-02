import { db } from "@/server/db"
import { getSession } from "@/server/session"
import { PLAN } from "@/types"

const DAY_IN_MS = 86_400_000

export async function checkSubscription(): Promise<{
  isValid: boolean
  plan: PLAN
}> {
  const { session, user } = await getSession()
  if (session === null) {
    return { isValid: false, plan: "FREE" }
  }

  const orgSubscription = await db.userSubscription.findUnique({
    where: { userId: user.id },
    select: {
      plan: true,
      stripeCurrentPeriodEnd: true,
      stripeCustomerId: true,
      stripePriceId: true,
      stripeSubscriptionId: true,
    },
  })
  if (!orgSubscription) {
    return { isValid: false, plan: "FREE" }
  }

  /* eslint-disable  @typescript-eslint/no-non-null-asserted-optional-chain */
  const isValid =
    orgSubscription.stripePriceId &&
    orgSubscription.stripeCurrentPeriodEnd?.getTime()! + DAY_IN_MS > Date.now()

  return {
    isValid: !!isValid,
    plan: orgSubscription.plan as PLAN,
  }
}
