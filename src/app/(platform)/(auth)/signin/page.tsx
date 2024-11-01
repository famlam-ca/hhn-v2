import { type Metadata } from "next"
import { redirect } from "next/navigation"

import { getSession } from "@/server/session"

import { SignInCard } from "./_components/card"
import { Header } from "./_components/header"

export const metadata: Metadata = {
  title: { absolute: "Welcome back!" },
  description: "Sign in to Humble Home Network.",
}

export default async function SignInPage() {
  const { session, user } = await getSession()
  if (session !== null) {
    if (!user.emailVerified) {
      return redirect("/verify-email")
    }
    return redirect("/")
  }

  return (
    <div className="flex flex-1 shrink-0 flex-col items-center justify-center">
      <Header />
      <SignInCard />
    </div>
  )
}
