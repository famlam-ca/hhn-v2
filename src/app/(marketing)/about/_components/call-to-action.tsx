import { ArrowRightIcon } from "lucide-react"
import Link from "next/link"

import { RainbowButton } from "@/components/ui/rainbow-button"

export function CallToAction() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4 text-center">
        <h2 className="mb-4 text-3xl font-bold">
          Ready to Transform Your Workflow?
        </h2>
        <p className="mb-8 text-xl">
          Join now and start managing your projects and tasks like a pro.
        </p>
        <RainbowButton asChild>
          <Link href="/signup">
            Sign Up <ArrowRightIcon className="ml-2 size-4" />
          </Link>
        </RainbowButton>
      </div>
    </section>
  )
}
