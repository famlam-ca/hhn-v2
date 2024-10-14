import { type Metadata } from "next"
import { redirect } from "next/navigation"

import { validateSession } from "@/server/auth"

import { SignInForm } from "./_components/sign-in-form"

export const metadata: Metadata = {
  title: { absolute: "Welcome back!" },
  description: "Sign in to Humble Home Network.",
}

interface SignInPageProps {
  searchParams: {
    next?: string
  }
}

const SignInPage = async ({ searchParams: { next } }: SignInPageProps) => {
  const { session } = await validateSession()
  if (session) redirect(next ? next : "/")

  return <SignInForm />
}

export default SignInPage
