"use client"

import { PLAN } from "@prisma/client"
import { Menu } from "lucide-react"
import { usePathname } from "next/navigation"
import { useEffect } from "react"

import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
} from "@/components/ui/sheet"
import { useMobileSidebar } from "@/hooks/use-mobile-sidebar"
import { useMounted } from "@/hooks/use-mounted"

import { Sidebar } from "./sidebar"

export function MobileSidebar({
  sessionId,
  plan,
  availableCount,
}: {
  sessionId: string
  plan: PLAN
  availableCount: number
}) {
  const pathname = usePathname()
  const { mounted } = useMounted()

  const onOpen = useMobileSidebar((state) => state.onOpen)
  const onClose = useMobileSidebar((state) => state.onClose)
  const isOpen = useMobileSidebar((state) => state.isOpen)

  useEffect(() => {
    onClose()
  }, [pathname, onClose])

  if (!mounted) {
    return null
  }

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
        <SheetTitle hidden />
        <SheetDescription hidden />
        <SheetContent side="left" className="p-2 pt-10">
          <Sidebar
            storageKey="t-sidebar-mobile-state"
            sessionId={sessionId}
            plan={plan}
            availableCount={availableCount}
          />
        </SheetContent>
      </Sheet>
    </>
  )
}
