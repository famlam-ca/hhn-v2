"use client"

import { Team } from "@prisma/client"
import { Activity, CreditCard, Layout, Settings } from "lucide-react"
import Image from "next/image"
import { usePathname, useRouter } from "next/navigation"

import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { cn } from "@/lib/utils"

interface NavItemProps {
  team: Team
  isActive: boolean
  isExpanded: boolean
  onExpand: (id: string) => void
  onSelectTeam: (team: Team) => void
}

export function NavItem({
  team,
  isActive,
  isExpanded,
  onExpand,
  onSelectTeam,
}: NavItemProps) {
  const router = useRouter()
  const pathname = usePathname()

  const ROUTES = [
    {
      label: "Boards",
      icon: <Layout className="mr-2 size-4" />,
      href: `/dashboard/${team.id}`,
    },
    {
      label: "Activity",
      icon: <Activity className="mr-2 size-4" />,
      href: `/dashboard/${team.id}/activity`,
    },
    {
      label: "Settings",
      icon: <Settings className="mr-2 size-4" />,
      href: `/dashboard/${team.id}/settings`,
    },
    {
      label: "Billing",
      icon: <CreditCard className="mr-2 size-4" />,
      href: `/dashboard/${team.id}/billing`,
    },
  ]

  const onClick = (href: string) => {
    router.push(href)
    onSelectTeam(team)
  }

  return (
    <AccordionItem value={team.id} className="border-none">
      <AccordionTrigger
        onClick={() => onExpand(team.id)}
        className={cn(
          "flex items-center gap-x-2 rounded-md p-1.5 text-start text-muted-foreground no-underline transition hover:bg-muted-foreground/10 hover:no-underline",
          isActive && !isExpanded && "bg-primary-foreground/10 text-primary",
        )}
      >
        <div className="flex items-center gap-x-2">
          <div className="relative size-7">
            {team.imageThumbUrl ? (
              <Image
                fill
                src={team.imageThumbUrl}
                alt={team.title}
                className="rounded-sm object-cover"
              />
            ) : (
              <div className="flex size-full items-center justify-center rounded-sm bg-muted text-xs">
                {team.title.charAt(0).toUpperCase()}
              </div>
            )}
          </div>
          <span className="text-sm font-medium">{team.title}</span>
        </div>
      </AccordionTrigger>

      <AccordionContent className="pt-1 text-muted-foreground">
        {ROUTES.map((route) => (
          <Button
            key={route.href}
            onClick={() => onClick(route.href)}
            size="sm"
            variant="ghost"
            className={cn(
              "mb-1 w-full justify-start pl-10 font-normal",
              pathname === route.href &&
                "bg-primary-foreground/10 text-primary",
            )}
          >
            {route.icon}
            {route.label}
          </Button>
        ))}
      </AccordionContent>
    </AccordionItem>
  )
}

NavItem.Skeleton = function SkeletonNavItem() {
  return (
    <div className="flex items-center gap-x-2">
      <div className="relative size-10 shrink-0">
        <Skeleton className="absolute size-full" />
      </div>
      <Skeleton className="h-10 w-full" />
    </div>
  )
}
