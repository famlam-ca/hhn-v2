"use client"

import { ArrowUpRight } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

import { Icons } from "@/components/icons"
import { ThemeSwitch } from "@/components/theme-switch"
import { buttonVariants } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { NAVBAR_ROUTES } from "@/constants/nav_routes"
import { cn } from "@/lib/utils"
import { useSession } from "@/providers/session-provider"
import { useSheet } from "@/store/useSheet"

export const MainNavSheet = () => {
  const { user } = useSession()
  const pathname = usePathname()
  const { isOpen, onClose, type } = useSheet()

  const isSheetOpen = isOpen && type === "main-nav"

  return (
    <Sheet open={isSheetOpen} onOpenChange={onClose}>
      <SheetContent side="left">
        <SheetHeader>
          <SheetTitle>
            <Link href="/">
              <Icons.logo size={{ width: 125 }} />
            </Link>
            <SheetDescription aria-hidden className="hidden" />
          </SheetTitle>
        </SheetHeader>

        <div className="my-4 h-px bg-accent" />

        <ScrollArea className="h-[calc(100dvh-6rem)] pb-6">
          <div className="flex h-full flex-col justify-between gap-2">
            <div className="flex flex-col gap-2">
              {NAVBAR_ROUTES.map((route) => (
                <NavItem
                  key={route.href}
                  {...route}
                  active={pathname.startsWith(route.href)}
                  onClose={onClose}
                />
              ))}

              <div className="my-4 h-px bg-accent" />

              {user ? (
                <Link
                  href="/signout"
                  onClick={onClose}
                  className={cn(
                    buttonVariants({
                      variant: "outline",
                    }),
                  )}
                >
                  Sign out
                </Link>
              ) : (
                <div className="flex flex-col gap-4">
                  <Link
                    href={`/signin?next=${pathname}`}
                    onClick={onClose}
                    className={cn(
                      buttonVariants({
                        variant: "outline",
                      }),
                      "bg-transparent hover:bg-transparent",
                    )}
                  >
                    Sign In
                  </Link>

                  <Link
                    href="/signup"
                    onClick={onClose}
                    className={cn(
                      buttonVariants({
                        variant: "primary",
                      }),
                    )}
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </div>

            <ThemeSwitch />
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  )
}

type Route = (typeof NAVBAR_ROUTES)[0]
interface NavItemProps extends Route {
  active?: boolean
  onClose: () => void
}

const NavItem = ({
  icon: Icon,
  label,
  href,
  target,
  active,
  onClose,
}: NavItemProps) => {
  return (
    <Link
      href={href}
      onClick={onClose}
      target={target}
      className={cn(
        "relative mx-2 flex items-center gap-2 rounded-md p-4 hover:bg-muted-foreground/10",
        {
          "bg-accent/25 before:absolute before:left-0 before:-ml-2 before:h-3/4 before:w-1 before:rounded-full before:bg-primary":
            active,
        },
      )}
    >
      <Icon
        className={cn("size-6 stroke-muted-foreground", {
          "fill-foreground stroke-foreground": active,
        })}
      />
      <span>{label}</span>
      {target && <ArrowUpRight className="size-3" />}
    </Link>
  )
}
