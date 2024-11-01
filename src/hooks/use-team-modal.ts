"use client"

import { create } from "zustand"

type TeamModalStore = {
  isOpen: boolean
  onOpen: () => void
  onClose: () => void
}

export const useTeamModal = create<TeamModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}))
