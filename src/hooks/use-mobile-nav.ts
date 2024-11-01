"use client"

import { create } from "zustand"

type MobileNavStore = {
  isOpen: boolean
  onOpen: () => void
  onClose: () => void
}

export const useMobileNav = create<MobileNavStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}))
