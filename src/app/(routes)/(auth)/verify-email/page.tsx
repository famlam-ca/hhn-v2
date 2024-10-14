import { type Metadata } from "next"

import { MaxWidthWrapper } from "@/components/layout/max-width-wrapper"

import { VerifyEmailHeader } from "./_components/header"
import { VerifyEmail } from "./_components/verify-email"

export const metadata: Metadata = {
  title: "Verify Your Email",
  description: "Verify your email address.",
}

const VerifyEmailPage = ({
  searchParams,
}: {
  searchParams: { email: string }
}) => {
  return (
    <div className="-mt-16 flex h-[calc(100%+4rem+10rem)] items-center justify-center bg-[url('/assets/kanban/bg.jpg')] bg-cover dark:bg-[url('/assets/kanban/bg.dark.jpg')]">
      <MaxWidthWrapper className="-mt-16">
        <div className="rounded-lg py-24 shadow-2xl backdrop-blur-lg">
          <VerifyEmailHeader />

          <div className="space-y-6 text-center">
            <div>
              <p>Check your email for a verification link.</p>
              <p>After verifing your may safely close this window.</p>
            </div>

            <VerifyEmail email={searchParams.email} />
          </div>
        </div>
      </MaxWidthWrapper>
    </div>
  )
}

export default VerifyEmailPage
