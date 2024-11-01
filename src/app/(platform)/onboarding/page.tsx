import { redirect } from "next/navigation"

import { MaxWidthWrapper } from "@/components/max-width-wrapper"
import { getSession } from "@/server/session"
import { User } from "@/types"

import { Onboarding } from "./_components/onboarding"

export default async function OnboardingPage() {
  const { session, user } = await getSession()
  if (session === null) {
    return redirect("/signin")
  }

  return (
    <div className="flex h-full items-center justify-center">
      <MaxWidthWrapper className="flex flex-col items-center gap-8 rounded-lg py-24 shadow-2xl backdrop-blur-lg sm:gap-16">
        <Onboarding user={user as User} />
      </MaxWidthWrapper>
    </div>
  )
}
