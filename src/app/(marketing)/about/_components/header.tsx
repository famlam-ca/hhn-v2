import { ArrowRightIcon } from "lucide-react"
import Link from "next/link"

import { RainbowButton } from "@/components/ui/rainbow-button"

export function AboutHeader() {
  return (
    <section className="bg-gradient-to-br from-primary via-primary-foreground to-purple-500 py-20 text-white">
      <div className="container mx-auto px-4">
        <h1 className="mb-4 text-4xl font-bold md:text-5xl">
          Humble Home Network
        </h1>
        <p className="mb-8 text-xl">
          Manage your projects and tasks like a pro, with HHN Kanban.
        </p>
        <RainbowButton variant="light" asChild>
          <Link href="/pricing">
            Get Started <ArrowRightIcon className="ml-2 size-4" />
          </Link>
        </RainbowButton>
      </div>
    </section>
  )
}
