"use client"

import { Session } from "@prisma/client"
import { Menu } from "lucide-react"
import Link from "next/link"

import { Logo } from "@/components/logo"
import { SignOutButton } from "@/components/signout"
import { ThemeSwitch } from "@/components/theme-switch"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { ROUTES } from "@/constants/main-navbar"
import { useMobileNav } from "@/hooks/use-mobile-nav"

export function MobileSidebar({ session }: { session: Session | null }) {
  const onOpen = useMobileNav((state) => state.onOpen)
  const onClose = useMobileNav((state) => state.onClose)
  const isOpen = useMobileNav((state) => state.isOpen)

  return (
    <>
      <Button
        onClick={onOpen}
        size="inline"
        variant="ghost"
        className="md:hidden [&_svg]:size-6"
      >
        <Menu />
      </Button>

      <Sheet open={isOpen} onOpenChange={onClose}>
        <SheetContent side="top">
          <SheetHeader>
            <SheetTitle onClick={onClose} className="flex justify-center">
              <Logo hide={false} />
            </SheetTitle>
            <SheetDescription hidden />
          </SheetHeader>
          <div className="space-y-4 p-2 pt-10">
            {ROUTES.map((route) => (
              <Button
                onClick={onClose}
                key={route.href}
                size="lg"
                variant="ghost"
                className="w-full justify-start"
                asChild
              >
                <Link href={route.href}>
                  <route.icon className="mr-2 size-4" />
                  {route.label}
                </Link>
              </Button>
            ))}

            <div className="flex w-full items-center justify-between space-x-2">
              {session ? (
                <SignOutButton className="grow" />
              ) : (
                <>
                  <Button
                    onClick={onClose}
                    size="sm"
                    variant="outline"
                    className="grow"
                    asChild
                  >
                    <Link href="/signin">Sign In</Link>
                  </Button>
                  <Button onClick={onClose} size="sm" className="grow" asChild>
                    <Link href="/signup">Sign Up</Link>
                  </Button>
                </>
              )}
              <ThemeSwitch size="sm" lite />
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </>
  )
}
