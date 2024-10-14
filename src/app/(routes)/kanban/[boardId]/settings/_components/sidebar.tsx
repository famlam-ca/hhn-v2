"use client"

import { ArrowLeft, Link, LucideIcon, Settings, Users } from "lucide-react"
import { usePathname, useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export const BoardSettingsSidebar = () => {
  const router = useRouter()
  const pathname = usePathname()
  const boardId = pathname.split("/")[2]

  const basePath = `/kanban/${boardId}/settings`

  const NAV_ITEMS: NavItemProps[] = [
    {
      icon: Settings,
      label: "General",
      active: pathname.endsWith("settings"),
      onClick: () => router.push(basePath),
    },
    {
      icon: Users,
      label: "Members",
      active: pathname.includes("members"),
      onClick: () => router.push(`${basePath}/members`),
    },
    {
      icon: Link,
      label: "Invites",
      active: pathname.includes("invites"),
      onClick: () => router.push(`${basePath}/invites`),
    },
  ]

  return (
    <div className="sticky top-24 my-8 hidden h-[calc(100dvh-4rem)] w-1/4 sm:block">
      <div className="flex h-full flex-col justify-between">
        <div className="flex flex-col gap-1">
          {NAV_ITEMS.slice(0, 1).map((item, i) => (
            <NavItem key={i} {...item} />
          ))}

          <div className="mb-2 h-px bg-accent" />

          {NAV_ITEMS.slice(1).map((item, i) => (
            <NavItem key={i} {...item} />
          ))}
        </div>

        <NavItem
          icon={ArrowLeft}
          label="Back to board"
          active={false}
          onClick={() => router.push(`/kanban/${boardId}`)}
        />
      </div>
    </div>
  )
}

type NavItemProps = {
  icon: LucideIcon
  label: string
  active: boolean
  onClick?: () => void
}

const NavItem = ({ icon: Icon, label, active, onClick }: NavItemProps) => {
  return (
    <Button
      onClick={onClick}
      variant="ghost"
      className={cn("relative mx-2 justify-start gap-2", {
        "bg-accent/25 before:absolute before:left-0 before:-ml-2 before:h-3/4 before:w-1 before:rounded-full before:bg-primary":
          active,
      })}
    >
      <Icon className="stroke-muted-foreground" />
      <p className="text-base font-semibold tracking-wide">{label}</p>
    </Button>
  )
}
