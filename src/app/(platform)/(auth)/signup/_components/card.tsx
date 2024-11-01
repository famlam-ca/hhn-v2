import Link from "next/link"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { SignUpForm } from "./form"

export function SignUpCard() {
  return (
    <div className="relative mx-auto w-full max-w-lg px-4">
      <Card className="shadow-xl">
        <CardHeader>
          <CardTitle>Sign Up</CardTitle>
          <CardDescription>
            Sign up to your account to continue.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex min-h-[350px] flex-col justify-between">
          <SignUpForm />
          <div className="mt-10 text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link
              href="/signin"
              className="font-semibold text-primary underline-offset-2 hover:underline"
            >
              Sign In
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
