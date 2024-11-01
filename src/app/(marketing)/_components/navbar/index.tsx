import Link from "next/link"

import { Logo } from "@/components/logo"
import { MaxWidthWrapper } from "@/components/max-width-wrapper"
import { SignOutButton } from "@/components/signout"
import { ThemeSwitch } from "@/components/theme-switch"
import { Button } from "@/components/ui/button"
import { ROUTES } from "@/constants/main-navbar"
import { getSession } from "@/server/session"

import { MobileSidebar } from "./mobile-sidebar"
import { NavItem } from "./nav-item"

export async function Navbar() {
  const { session } = await getSession()

  return (
    <nav className="fixed top-0 z-50 flex h-16 w-full items-center bg-white/80 backdrop-blur-lg dark:bg-black/80">
      <MaxWidthWrapper className="flex items-center justify-between">
        <Logo animate />

        <MobileSidebar session={session} />

        <div className="flex items-center gap-x-4 text-muted-foreground">
          {ROUTES.map(({ href, label, target }, i) => (
            <NavItem key={i} href={href} label={label} target={target} />
          ))}

          <div className="hidden w-full items-center justify-between gap-x-2 text-muted-foreground md:flex md:w-auto md:gap-x-4">
            {session ? (
              <SignOutButton />
            ) : (
              <span className="space-x-2 text-foreground md:space-x-4">
                <Button size="sm" variant="outline" asChild>
                  <Link href="/signin">Sign In</Link>
                </Button>
                <Button size="sm" asChild>
                  <Link href="/signup">Sign Up</Link>
                </Button>
              </span>
            )}

            <ThemeSwitch size="sm" lite />
          </div>
        </div>
      </MaxWidthWrapper>
    </nav>
  )
}
