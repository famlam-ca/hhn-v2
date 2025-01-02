"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import { SidebarMenuSubButton } from "@/components/ui/sidebar"

interface ActiveLinkProps {
  href: string
  children: React.ReactNode
}

export function ActiveLink({ href, children }: ActiveLinkProps) {
  const pathname = usePathname()
  const isActive = pathname === href

  return (
    <SidebarMenuSubButton asChild isActive={isActive}>
      <Link href={href}>{children}</Link>
    </SidebarMenuSubButton>
  )
}
