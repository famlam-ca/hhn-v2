"use client"

import { create } from "zustand"

type AdminSidebarStore = {
  isOpen: boolean
  onOpen: () => void
  onClose: () => void
}

export const useAdminSidebar = create<AdminSidebarStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}))
