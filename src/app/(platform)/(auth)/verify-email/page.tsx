import { PLAN } from "@prisma/client"
import { redirect } from "next/navigation"

import { getUserEmailVerificationRequestFromRequest } from "@/server/email-verification"
import { getSession } from "@/server/session"

import { VerifyEmailCard } from "./_components/card"
import { Header } from "./_components/header"

export default async function VerifyEmailPage({
  searchParams,
}: {
  searchParams: Promise<{ plan?: PLAN; interval?: "month" | "year" }>
}) {
  const { plan, interval } = await searchParams
  const { user } = await getSession()
  if (user === null) {
    return redirect("/signin")
  }

  const verificationRequest = await getUserEmailVerificationRequestFromRequest()
  if (verificationRequest === null && user.emailVerified) {
    return redirect("/")
  }

  return (
    <div className="flex flex-1 shrink-0 flex-col items-center justify-center">
      <Header />
      <VerifyEmailCard plan={plan} interval={interval} />
    </div>
  )
}
