"use client"

import { useMounted } from "@/hooks/use-mounted"
import { useModal } from "@/store/useModal"

import { AboutBoardModal } from "@/components/modals/about-board"
import { ChangeBoardCoverModal } from "@/components/modals/change-board-cover"
import { CloseBoardModal } from "@/components/modals/close-board"
import { CreateBoardModal } from "@/components/modals/create-board"
import { CreateTeamModal } from "@/components/modals/create-team"
import { DeleteBoardModal } from "@/components/modals/delete-board"
import { MoveBoardModal } from "@/components/modals/move-board"
import { ReopenBoardModal } from "@/components/modals/reopen-board"
import { ShareBoardModal } from "@/components/modals/share-board"

export const ModalProvider = () => {
  const { type } = useModal()
  const { mounted } = useMounted()

  if (!mounted) return null

  return (
    <>
      {type === "about-board" ? <AboutBoardModal /> : null}
      {type === "change-board-cover" ? <ChangeBoardCoverModal /> : null}
      {type === "close-board" ? <CloseBoardModal /> : null}
      {type === "create-board" ? <CreateBoardModal /> : null}
      {type === "create-team" ? <CreateTeamModal /> : null}
      {type === "delete-board" ? <DeleteBoardModal /> : null}
      {type === "move-board" ? <MoveBoardModal /> : null}
      {type === "reopen-board" ? <ReopenBoardModal /> : null}
      {type === "share-board" ? <ShareBoardModal /> : null}
    </>
  )
}
