import { PLAN } from "@prisma/client"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { VerifyEmailForm } from "./form"

export function VerifyEmailCard({
  plan,
  interval,
}: {
  plan?: PLAN
  interval?: "month" | "year"
}) {
  return (
    <div className="mx-auto w-full max-w-lg px-4">
      <Card className="shadow-xl">
        <CardHeader>
          <CardTitle>Verify Email</CardTitle>
          <CardDescription>
            Enter the verification code we sent to your email address.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <VerifyEmailForm plan={plan} interval={interval} />
        </CardContent>
      </Card>
    </div>
  )
}
