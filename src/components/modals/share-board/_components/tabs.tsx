"use client"

import { cn } from "@/lib/utils"
import { BoardMember } from "@/types/board"

import { TabType } from "./modal"

interface TabsProps {
  members: BoardMember[]
  activeTab: TabType
  setActiveTab: (tab: TabType) => void
}

export const Tabs = ({ members, activeTab, setActiveTab }: TabsProps) => {
  return (
    <div className="flex gap-8 text-sm text-muted-foreground">
      <button
        onClick={() => setActiveTab("members")}
        className={cn(
          "relative flex items-center justify-center underline-offset-8 hover:underline",
          {
            "text-primary underline": activeTab === "members",
          },
        )}
      >
        Board members
        <span className="absolute -right-5 top-1 rounded-full bg-muted px-1 text-xs text-muted-foreground">
          {members && members.length > 0 && `${members.length}`}
        </span>
      </button>
      <button
        onClick={() => setActiveTab("requests")}
        className={cn("underline-offset-8 hover:underline", {
          "text-primary underline": activeTab === "requests",
        })}
      >
        Join Requests
      </button>
    </div>
  )
}
