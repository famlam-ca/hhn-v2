import { PLAN } from "@prisma/client"
import { type Metadata } from "next"
import { redirect } from "next/navigation"

import { getSession } from "@/server/session"
import { PLAN_INTERVAL } from "@/types"

import { SignUpCard } from "./_components/card"
import { Header } from "./_components/header"

export const metadata: Metadata = {
  title: {
    absolute: "We're glad you're here! - HHN Team",
  },
  description: "Join Humble Home Network. Welcome!",
}

export default async function SignUpPage({
  searchParams,
}: {
  searchParams: Promise<{
    plan?: PLAN
    interval?: PLAN_INTERVAL
  }>
}) {
  const { plan, interval } = await searchParams
  const { session, user } = await getSession()
  if (session !== null) {
    if (!user.emailVerified) {
      if (plan && interval) {
        return redirect(`/verify-email?plan=${plan}&interval=${interval}`)
      }
      return redirect("/verify-email")
    }
    return redirect("/dashboard")
  }

  return (
    <div className="flex flex-1 shrink-0 flex-col items-center justify-center">
      <Header />
      <SignUpCard />
    </div>
  )
}
