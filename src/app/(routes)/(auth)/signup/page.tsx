import { type Metadata } from "next"
import { redirect } from "next/navigation"

import { validateSession } from "@/server/auth"

import { SignUpForm } from "./_components/sign-up-form"

export const metadata: Metadata = {
  title: {
    absolute: "We are glad you are here! - HHN Team",
  },
  description: "Join Humble Home Network. Welcome!",
}

const SignUpPage = async () => {
  const { user } = await validateSession()
  if (user) return redirect("/")

  return <SignUpForm />
}

export default SignUpPage
