import { notFound, redirect } from "next/navigation"

import { Logo } from "@/components/logo"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import {
  MARKETING_ROUTES,
  PLATFORM_ROUTES,
  SUPPORT_ROUTES,
} from "@/constants/admin"
import { getSession } from "@/server/session"

import { CollapsibleRoute } from "./collapsible-route"
import { RouteItem } from "./route-item"
import { UserDropdown } from "./user-dropdown"

export async function AdminSidebar() {
  const { session, user } = await getSession()
  if (session === null) {
    return redirect("/signin")
  }
  if (user.role !== "ADMIN") {
    return notFound()
  }

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="group-data-[collapsible=icon]:hidden">
        <SidebarMenu>
          <SidebarMenuItem className="flex justify-center py-4">
            <Logo hide={false} size="lg" />
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Platform</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {PLATFORM_ROUTES.map((route) =>
                route.items ? (
                  <CollapsibleRoute key={route.label} route={route} />
                ) : (
                  <RouteItem key={route.label} {...route} />
                ),
              )}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>Marketing</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {MARKETING_ROUTES.map((route) => (
                <RouteItem key={route.label} {...route} />
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup className="mt-auto">
          <SidebarGroupContent>
            <SidebarMenu>
              {SUPPORT_ROUTES.map((route) => (
                <RouteItem key={route.label} {...route} />
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <UserDropdown user={user} />
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}
