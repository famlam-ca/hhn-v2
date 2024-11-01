"use client"

import { AuditLog } from "@prisma/client"
import { format } from "date-fns"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { generateLogMessage } from "@/lib/generate-log-message"
import { User } from "lucide-react"

interface ActivityItemProps {
  log: AuditLog
}

export function ActivityItem({ log }: ActivityItemProps) {
  return (
    <li className="flex items-center gap-x-2">
      <Avatar className="h-8 w-8">
        <AvatarImage src={log.userImage} />
        <AvatarFallback>
          <User className="size-6 text-muted-foreground" />
        </AvatarFallback>
      </Avatar>
      <div className="flex flex-col space-y-0.5">
        <p className="text-sm">
          <span className="mr-1 font-semibold lowercase text-muted-foreground">
            {log.username}
          </span>
          {generateLogMessage(log)}
        </p>
        <p className="text-xs text-muted-foreground">
          {format(new Date(log.createdAt), "MMM d, yyyy 'at' h:mm a")}
        </p>
      </div>
    </li>
  )
}
