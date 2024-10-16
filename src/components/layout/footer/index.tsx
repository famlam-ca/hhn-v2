"use client"

import { ArrowUpRight } from "lucide-react"
import Link from "next/link"

import { Hint } from "@/components/hint"
import { Icons } from "@/components/icons"
import { MaxWidthWrapper } from "@/components/layout/max-width-wrapper"
import { ROUTES, SOCIALS } from "@/constants/footer_routes"
import { useRouteCheck } from "@/hooks/use-route-check"
import { cn } from "@/lib/utils"

export const Footer = () => {
  const kanbanOnboardingRoute = useRouteCheck(["onboarding"])

  return (
    <footer
      className={cn("inset-x-0 h-40 border-t backdrop-blur-lg transition-all", {
        hidden: kanbanOnboardingRoute,
      })}
    >
      <MaxWidthWrapper className="h-full items-end pb-8 text-muted-foreground sm:flex">
        <div className="flex w-full flex-col items-center sm:items-start">
          <div className="flex items-center gap-2">
            <Link
              href="https://www.famlam.ca"
              target="_blank"
              title="HHN homepage"
              rel="noopener nonreferrer"
            >
              <Icons.logo noAmimation fill="current" />
            </Link>
            <span>is powered by</span>
            <Link
              href="https://nextjs.org"
              target="_blank"
              title="Nextjs homepage"
              rel="noopener nonreferrer"
            >
              <Icons.nextjs noAmimation />
            </Link>
          </div>

          <p className="mt-6 text-xs">
            &copy; {new Date().getFullYear()}{" "}
            <span className="font-semibold">Humble Home Network</span>, All
            rights reserved.
          </p>
        </div>

        <div className="mt-6">
          <div className="flex items-center justify-center gap-4 sm:justify-end">
            {SOCIALS.map(({ label, href, icon: Icon }) => (
              <Hint key={label} label={label} asChild>
                <Link href={href} target="_blank">
                  <span className="text-sm hover:text-foreground">
                    <Icon size={20} />
                  </span>
                </Link>
              </Hint>
            ))}
          </div>

          <div className="my-6 flex items-center justify-center gap-4 sm:justify-end md:mb-0 md:mt-6">
            {ROUTES.map(({ label, href, target }) => (
              <Link key={label} href={href} target={target}>
                <span
                  className={cn("text-sm hover:text-foreground", {
                    flex: target,
                  })}
                >
                  {label}
                  {target && <ArrowUpRight className="h-3 w-3" />}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </MaxWidthWrapper>
    </footer>
  )
}
