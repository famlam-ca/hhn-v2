"use client"

import { InvitePermission, MemberRole } from "@prisma/client"
import { Loader2 } from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"

import {
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { trpc } from "@/trpc/react"
import { BoardMember } from "@/types/board"

import { ShareForm } from "./form"
import { LinkForm } from "./link-form"
import { ManageMembers } from "./manage-members"
import { Tabs } from "./tabs"

interface ShareBoardProps {
  boardId: string
  currentMember: BoardMember
  showTabs?: boolean
}

export type TabType = "members" | "requests"

export const ShareBoard = ({
  boardId,
  currentMember,
  showTabs,
}: ShareBoardProps) => {
  const utils = trpc.useUtils()
  const [members, queryMembers] =
    trpc.kanban.getBoardMembers.useSuspenseQuery(boardId)
  const updateMemberRole = trpc.kanban.updateMemberRole.useMutation()
  const createInvite = trpc.kanban.createInvite.useMutation()
  const deleteInvite = trpc.kanban.deleteInvite.useMutation()

  const [activeTab, setActiveTab] = useState<TabType>("members")
  const [shareLink, setShareLink] = useState<string>("")

  function handleUpdateMemberRole(
    memberId: string,
    role: MemberRole | "remove",
  ) {
    updateMemberRole.mutate(
      { boardId, memberId, role },
      {
        onSuccess: () => {
          if (role !== "remove") {
            toast.success("Member role updated!")
          }
        },
        onError: (error) => {
          toast.error("Oops!", {
            description: error.message,
          })
        },
        onSettled: () => {
          queryMembers.refetch()
        },
      },
    )
  }

  function handleCopyInvite() {
    navigator.clipboard.writeText(shareLink)
    if (shareLink === "") {
      toast.warning("No link to copy!", {
        description: "Please create a link first.",
      })
    } else {
      toast.success("Link copied!")
    }
  }

  function handleCreateInvite(permission: InvitePermission) {
    createInvite.mutate(
      { boardId, permission },
      {
        onSuccess: (data) => {
          setShareLink(data.url)
        },
        onError: (error) => {
          toast.error("Oops!", {
            description: error.message,
          })
        },
        onSettled: () => {
          utils.kanban.invalidate()
        },
      },
    )
  }

  function handleDeleteInvite() {
    deleteInvite.mutate(boardId, {
      onSuccess: () => {
        setShareLink("")
        toast.success("Link deleted!")
      },
      onError: (error) => {
        toast.error("Oops!", {
          description: error.message,
        })
      },
      onSettled: () => {
        utils.kanban.invalidate()
      },
    })
  }

  return (
    <>
      <DialogHeader>
        <DialogTitle>Share board</DialogTitle>
        <DialogDescription>
          Share this board with others by inviting them to collaborate.
        </DialogDescription>
      </DialogHeader>

      <div className="space-y-6">
        <ShareForm />

        <LinkForm
          copyInvite={handleCopyInvite}
          createInvite={handleCreateInvite}
          deleteInvite={handleDeleteInvite}
        />

        {showTabs ? (
          (currentMember && currentMember.role === "owner") ||
          currentMember.role === "admin" ? (
            <div>
              <Tabs
                members={members}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
              />

              <div className="mt-1 h-px bg-muted" />

              <ScrollArea>
                <div className="mb-4 mt-6 max-h-[8.5rem] px-1">
                  {activeTab === "members" ? (
                    <div className="flex h-full flex-col gap-3">
                      {queryMembers.isLoading ? (
                        <div className="flex h-full flex-col items-center justify-center gap-3">
                          <div className="rounded-full bg-accent p-2">
                            <Loader2 className="animate-spin stroke-muted-foreground" />
                          </div>
                          <p className="text-muted-foreground">
                            Loading members...
                          </p>
                        </div>
                      ) : (
                        members.map((member) => (
                          <ManageMembers
                            key={member.id}
                            member={member}
                            currentMember={currentMember}
                            updateMemberRole={handleUpdateMemberRole}
                            isLoading={updateMemberRole.isPending}
                          />
                        ))
                      )}
                    </div>
                  ) : (
                    <div></div>
                  )}
                </div>
              </ScrollArea>
            </div>
          ) : null
        ) : null}
      </div>
    </>
  )
}
