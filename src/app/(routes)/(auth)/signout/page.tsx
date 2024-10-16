"use client"

import { Loader2 } from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"
import { useEffect } from "react"

import { signOut } from "@/actions/auth"
import { useSession } from "@/providers/session-provider"
import { trpc } from "@/trpc/react"

const SignOutPage = () => {
  const router = useRouter()
  const utils = trpc.useUtils()
  const next = useSearchParams().get("next")
  const { session } = useSession()
  if (!session) router.push(next ? next : "/")

  useEffect(() => {
    signOut().then(async () => {
      await utils.invalidate()
      router.push(next ? next : "/")
    })
  }, [router, next])

  return (
    <div className="flex h-full flex-col items-center justify-center space-y-4 text-lg">
      <Loader2 className="size-10 animate-spin" />
      <div className="text-center">
        <p>Please wait!</p>
        <p>We are trying to sign you out...</p>
      </div>
    </div>
  )
}

export default SignOutPage
