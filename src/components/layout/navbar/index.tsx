"use client"

import { User } from "@prisma/client"
import { ArrowUpRight } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

import { Icons } from "@/components/icons"
import { MaxWidthWrapper } from "@/components/layout/max-width-wrapper"
import { ThemeSwitch } from "@/components/theme-switch"
import { buttonVariants } from "@/components/ui/button"
import { UserMenu } from "@/components/user/user-menu"
import { NAVBAR_ROUTES } from "@/constants/nav_routes"
import { useRouteCheck } from "@/hooks/use-route-check"
import { cn } from "@/lib/utils"
import { useSession } from "@/providers/session-provider"

export const Navbar = () => {
  const { user } = useSession()
  const pathname = usePathname()

  const boardRoute = useRouteCheck(["kanban"], true)
  const onBoardingRoute = useRouteCheck(["onboarding"])
  const authRoutes = useRouteCheck(["signin", "signup", "signout"])

  return (
    <nav
      className={cn(
        "fixed inset-x-0 top-0 z-50 h-16 w-full backdrop-blur-lg transition-all",
        {
          "border-none": onBoardingRoute || boardRoute,
        },
      )}
    >
      <MaxWidthWrapper>
        <div className="flex h-16 items-center justify-between">
          <Link href="/">
            <Icons.logo size={{ width: 125 }} />
          </Link>

          <div
            className={cn("flex items-center gap-x-4 text-muted-foreground", {
              "text-foreground": onBoardingRoute,
            })}
          >
            {!authRoutes ? (
              <ul className="flex items-center space-x-4 text-xs font-semibold">
                {NAVBAR_ROUTES.map((route) => (
                  <NavItem
                    key={route.href}
                    {...route}
                    onboardingRoute={onBoardingRoute}
                  />
                ))}

                {user ? (
                  <li>
                    <UserMenu user={user as User} pathname={pathname} />
                  </li>
                ) : (
                  <>
                    <li>
                      <Link
                        href={`/signin?next=${pathname}`}
                        className={cn(
                          buttonVariants({
                            variant: "outline",
                          }),
                          "bg-transparent hover:bg-transparent",
                        )}
                      >
                        Sign In
                      </Link>
                    </li>

                    <li>
                      <Link
                        href="/signup"
                        className={cn(
                          buttonVariants({
                            variant: "primary",
                          }),
                        )}
                      >
                        Sign Up
                      </Link>
                    </li>
                  </>
                )}
              </ul>
            ) : null}

            <ThemeSwitch lite />
          </div>
        </div>
      </MaxWidthWrapper>
    </nav>
  )
}

type Route = (typeof NAVBAR_ROUTES)[0]
interface NavItemProps extends Route {
  onboardingRoute?: boolean
}

const NavItem = ({ label, href, target, onboardingRoute }: NavItemProps) => {
  return (
    <li>
      <Link
        href={href}
        target={target}
        className={cn(
          "text-sm font-medium transition-colors hover:text-foreground",
          {
            flex: target,
            "hover:text-muted-foreground": onboardingRoute,
          },
        )}
      >
        <span>{label}</span>
        {target && <ArrowUpRight className="h-3 w-3" />}
      </Link>
    </li>
  )
}
