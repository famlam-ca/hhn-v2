"use client"

import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { useCountdown } from "usehooks-ts"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { isEmailVerified, resendVerificationEmail } from "@/actions/email"

export const VerifyEmail = ({ email }: { email: string }) => {
  const router = useRouter()
  const [count, { startCountdown, stopCountdown, resetCountdown }] =
    useCountdown({
      countStart: 60,
      intervalMs: 1000,
    })

  useEffect(() => {
    const verifyEmail = async () => {
      const res = await isEmailVerified(email)
      if (res.success === false && res.key !== "email_not_verified") {
        toast("Oops!", {
          description: res.message,
        })
      }

      if (res.key === "email_already_verified") {
        toast.info(res.message)
        router.replace("/")
      }

      if (res.success) {
        router.push("/")
      }
    }

    verifyEmail()
  }, [email, router])

  useEffect(() => {
    startCountdown()
    if (count === 0) {
      stopCountdown()
    }
  }, [count, startCountdown, stopCountdown])

  async function onRsendVerificationEmail() {
    const res = await resendVerificationEmail(email)
    if (!res.success) {
      toast("Oops!", {
        description: res.message,
      })
    } else {
      toast.success(res.message)
    }
    resetCountdown()
  }

  if (!email) {
    router.replace("/")
    return null
  }

  return (
    <div>
      <p className="mr-1 text-sm">Didn&apos;t recieve an email?</p>
      <Button
        disabled={count > 0 && count < 60}
        onClick={onRsendVerificationEmail}
        variant="link"
      >
        Resend verification email. {count > 0 && count < 60 && `in ${count}s`}
      </Button>
    </div>
  )
}
