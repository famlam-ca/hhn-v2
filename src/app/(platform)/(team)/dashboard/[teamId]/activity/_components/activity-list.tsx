import { Ghost } from "lucide-react"
import { redirect } from "next/navigation"

import { ActivityItem } from "@/components/activity-item"
import { Skeleton } from "@/components/ui/skeleton"
import { db } from "@/server/db"

interface ActivityListProps {
  teamId: string
}

export async function ActivityList({ teamId }: ActivityListProps) {
  if (!teamId) {
    redirect("/dashboard")
  }

  const auditLog = await db.auditLog.findMany({
    where: { teamId },
    orderBy: { createdAt: "desc" },
  })

  return (
    <ol className="mt-4 space-y-4">
      <div className="hidden h-full flex-col items-center justify-center gap-y-6 last:flex">
        <Ghost className="size-12 text-muted-foreground" />
        <p className="text-xs text-muted-foreground">
          Create a board to get started
        </p>
      </div>
      {auditLog.map((log) => (
        <ActivityItem key={log.id} log={log} />
      ))}
    </ol>
  )
}

ActivityList.Skeleton = function ActivityListSkeleton() {
  return (
    <ol className="mt4 space-y-4">
      {Array.from({ length: 5 }).map((_, i) => {
        const randomWidth = Math.floor(Math.random() * 31) + 50
        return (
          <Skeleton
            key={i}
            style={{ width: `${randomWidth}%` }}
            className="h-14"
          />
        )
      })}
    </ol>
  )
}
