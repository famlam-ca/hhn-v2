import { ChevronRight } from "lucide-react"

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"

import {
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
} from "@/components/ui/sidebar"
import type { Route } from "@/constants/admin"

import { RouteItem } from "./route-item"

export function CollapsibleRoute({ route }: { route: Route }) {
  return (
    <Collapsible
      key={route.label}
      defaultOpen={route.isActive}
      className="group/collapsible"
      asChild
    >
      <SidebarMenuItem>
        <CollapsibleTrigger asChild>
          <SidebarMenuButton tooltip={route.label}>
            <route.icon />
            <span>{route.label}</span>
            <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
          </SidebarMenuButton>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <SidebarMenuSub>
            {route.items!.map((item) => (
              <RouteItem key={item.label} {...item} />
            ))}
          </SidebarMenuSub>
        </CollapsibleContent>
      </SidebarMenuItem>
    </Collapsible>
  )
}
