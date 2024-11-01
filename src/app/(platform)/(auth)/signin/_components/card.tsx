import Link from "next/link"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { SignInForm } from "./form"

export function SignInCard() {
  return (
    <div className="mx-auto w-full max-w-lg px-4">
      <Card className="shadow-xl">
        <CardHeader>
          <CardTitle>Sign In</CardTitle>
          <CardDescription>
            Sign in to your account to continue.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <SignInForm />
          <div className="mt-10 text-center text-sm text-muted-foreground">
            Don&apos;t have an account?{" "}
            <Link
              href="/signup"
              className="font-semibold text-primary underline-offset-2 hover:underline"
            >
              Sign Up
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
