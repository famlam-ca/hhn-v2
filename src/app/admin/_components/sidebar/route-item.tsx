import { LucideIcon } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import {
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

import { ActiveLink } from "./active-link"

interface RouteItemProps {
  label: string
  href: string
  icon?: LucideIcon
  badge?: string
}

export function RouteItem({ label, href, icon: Icon, badge }: RouteItemProps) {
  return (
    <SidebarMenuItem>
      <SidebarMenuButton asChild>
        <ActiveLink href={href}>
          {Icon && <Icon />}
          <span>{label}</span>
          {badge ? (
            <SidebarMenuBadge>
              <Badge variant="warning">{badge}</Badge>
            </SidebarMenuBadge>
          ) : null}
        </ActiveLink>
      </SidebarMenuButton>
    </SidebarMenuItem>
  )
}
