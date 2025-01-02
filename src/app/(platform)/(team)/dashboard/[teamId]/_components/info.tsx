"use client"

import { CreditCard } from "lucide-react"
import Image from "next/image"

import { Skeleton } from "@/components/ui/skeleton"
import { trpc } from "@/trpc/react"
import { PLAN } from "@/types"

interface InfoProps {
  teamId: string
  plan: PLAN
}

export function Info({ teamId, plan }: InfoProps) {
  const { data: team, isLoading } = trpc.team.getActiveTeam.useQuery({ teamId })

  if (!team || isLoading) {
    return <Info.Skeleton />
  }

  return (
    <div className="flex items-center gap-x-4">
      <div className="relative size-[60px]">
        {team.imageThumbUrl ? (
          <Image
            fill
            src={team.imageThumbUrl}
            alt="Team"
            className="rounded-md object-cover"
          />
        ) : (
          <div className="flex size-full items-center justify-center rounded-md bg-muted text-lg">
            {team.title.charAt(0).toUpperCase()}
          </div>
        )}
      </div>
      <div className="space-y-1">
        <p className="text-xl font-semibold">{team.title}</p>
        <div className="flex items-center text-xs text-muted-foreground">
          <CreditCard className="mr-1 size-3" />
          {plan === "PRO" ? "Pro" : plan === "BASIC" ? "Basic" : "Free"}
        </div>
      </div>
    </div>
  )
}

Info.Skeleton = function InfoSkeleton() {
  return (
    <div className="items-cetner flex gap-x-4">
      <div className="relative size-[60px]">
        <Skeleton className="absolute size-full" />
      </div>
      <div className="space-y-1">
        <Skeleton className="h-10 w-[200px]" />
        <div className="flex items-center">
          <Skeleton className="mr-2 size-4" />
          <Skeleton className="h-4 w-[100px]" />
        </div>
      </div>
    </div>
  )
}
