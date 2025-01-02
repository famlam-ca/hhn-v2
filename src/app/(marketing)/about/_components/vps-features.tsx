import Link from "next/link"

import { AiOutlineCloudServer } from "react-icons/ai"

import { Button } from "@/components/ui/button"

export function VPSFeatures() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center md:flex-row">
          <div className="mb-8 md:mb-0 md:w-1/2">
            <AiOutlineCloudServer className="mx-auto size-48 text-primary-foreground" />
          </div>
          <div className="md:w-1/2">
            <h2 className="mb-4 text-3xl font-bold">
              Coming in v3: VPS Hosting
            </h2>
            <p className="mb-6 text-xl">
              We&apos;re expanding our services! With HHN v3, you&apos;ll be
              able to host your own virtual private servers on our platform.
              Take control and enjoy the benefits of a dedicated server.
            </p>
            <Button variant="outline">
              <Link href="/pricing">Learn More</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
