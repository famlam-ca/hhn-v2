import Link from "next/link"

import { Logo } from "@/components/logo"
import { MaxWidthWrapper } from "@/components/max-width-wrapper"
import { Separator } from "@/components/ui/separator"
import {
  COMPANY_ROUTES,
  HELP_ROUTES,
  SOCIAL_ROUTES,
} from "@/constants/main-footer"

import { FooterForm } from "./form"

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="relative bottom-0 w-full border-t py-10 sm:pt-16 lg:pt-24">
      <MaxWidthWrapper className="max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-x-12 gap-y-16 md:col-span-3 lg:grid-cols-6">
          <div className="col-span-2 md:col-span-3 lg:col-span-2 lg:pr-8">
            <Logo hide={false} />

            <p className="mt-7 text-base leading-relaxed text-muted-foreground">
              The digital home for friends and family, make yourself
              confortable. Get ready to start managing your tasks and projects
              like a pro.
            </p>

            <ul className="mt-9 flex items-center space-x-3">
              {SOCIAL_ROUTES.map((route) => (
                <li key={route.href}>
                  <Link
                    href={route.href}
                    target={route.target}
                    className="flex h-7 w-7 items-center justify-center rounded-full bg-secondary transition-all hover:bg-primary focus:bg-primary"
                  >
                    <route.icon className="size-4" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-muted-foreground/50">
              Company
            </p>

            <ul className="mt-6 space-y-4">
              {COMPANY_ROUTES.map((route) => (
                <li key={route.href}>
                  <Link
                    href={route.href}
                    target={route.target}
                    className="flex items-center gap-x-1.5 text-base text-muted-foreground transition-all hover:text-foreground focus:text-foreground"
                  >
                    <route.icon className="size-4" />
                    {route.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-muted-foreground/50">
              Help
            </p>

            <ul className="mt-6 space-y-4">
              {HELP_ROUTES.map((route) => (
                <li key={route.href}>
                  <Link
                    href={route.href}
                    target={route.target}
                    className="flex items-center gap-x-1.5 text-base text-muted-foreground transition-all hover:text-foreground focus:text-foreground"
                  >
                    <route.icon className="size-4" />
                    {route.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-span-2 md:col-span-1 lg:col-span-2 lg:pl-8">
            <p className="text-sm font-semibold uppercase tracking-widest text-muted-foreground/50">
              Subscribe to newsletter
            </p>

            <FooterForm />
          </div>
        </div>

        <Separator className="my-10 mt-16" />

        <p className="text-center text-sm text-muted-foreground">
          &copy; Copyright {year}, All Rights Reserved by Humble Home Network
        </p>
      </MaxWidthWrapper>
    </footer>
  )
}
