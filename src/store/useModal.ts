import { create } from "zustand"

import { Board, BoardMember } from "@/types/board"

export type ModalType =
  | "share-board"
  | "close-board"
  | "create-board"
  | "create-team"
  | "about-board"
  | "change-board-cover"
  | "delete-board"
  | "move-board"
  | "reopen-board"

interface ModalData {
  boardId?: string
  board?: Board
  fromCreateBoard?: boolean
  currentMember?: BoardMember
  showTabs?: boolean
  initDescription?: string | null
  initCoverUrl?: string | null
}

interface ModalStore {
  type: ModalType | null
  data: ModalData
  isOpen: boolean
  onOpen: (type: ModalType, data?: ModalData) => void
  onClose: () => void
}

export const useModal = create<ModalStore>((set) => ({
  type: null,
  data: {},
  isOpen: false,
  onOpen: (type, data = {}) => set({ isOpen: true, type, data }),
  onClose: () => set({ isOpen: false, type: null }),
}))
