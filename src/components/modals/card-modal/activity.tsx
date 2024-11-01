"use client"

import { AuditLog } from "@prisma/client"
import { ActivityIcon } from "lucide-react"

import { ActivityItem } from "@/components/activity-item"
import { Skeleton } from "@/components/ui/skeleton"

interface ActivityProps {
  auditLogs: AuditLog[]
}

export default function Activity({ auditLogs }: ActivityProps) {
  return (
    <div className="flex w-full items-start gap-x-3">
      <ActivityIcon className="mt-0.5 size-4 text-muted-foreground" />
      <div className="w-full">
        <p className="mb-2 font-semibold text-muted-foreground">Activity</p>
        <ol className="mt-2 space-y-4">
          {auditLogs.map((log, i) => (
            <ActivityItem key={i} log={log} />
          ))}
        </ol>
      </div>
    </div>
  )
}

Activity.Skeleton = function ActivitySkeleton() {
  return (
    <div className="flex w-full items-start gap-x-3">
      <Skeleton className="h-6 w-6" />
      <div className="w-full">
        <Skeleton className="mb-2 h-6 w-24" />
        <Skeleton className="h-10 w-full" />
      </div>
    </div>
  )
}
