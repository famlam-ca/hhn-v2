"use client"

import { Dialog, DialogContent } from "@/components/ui/dialog"

import { useModal } from "@/store/useModal"

import { ShareBoard } from "./_components/modal"

export const ShareBoardModal = () => {
  const { data, isOpen, onClose, type } = useModal()

  const isModalOpen = isOpen && type === "share-board"
  const { boardId, currentMember, showTabs } = data
  if (!boardId || !currentMember) return null

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-xl">
        <ShareBoard
          boardId={boardId}
          currentMember={currentMember}
          showTabs={showTabs}
        />
      </DialogContent>
    </Dialog>
  )
}
