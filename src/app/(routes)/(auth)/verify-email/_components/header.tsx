"use client"

import { Icons } from "@/components/icons"

export const VerifyEmailHeader = () => {
  return (
    <div className="mx-auto mb-10 flex flex-col items-center justify-center space-y-4">
      <Icons.logo noAmimation />

      <h1 className="text-center text-3xl font-bold leading-9 tracking-tight md:text-4xl lg:text-5xl">
        Verify Your Email
      </h1>
    </div>
  )
}
