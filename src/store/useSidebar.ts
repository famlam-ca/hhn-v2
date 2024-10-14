import { create } from "zustand"

type SidebarKeys = "dashboard"

interface SidebarStore {
  sidebar: { [key in SidebarKeys]: boolean }
  isOpen: (sidebar: SidebarKeys) => boolean
  setOpen: (sidebar: SidebarKeys, open: boolean) => void
}

export const useSidebar = create<SidebarStore>((set, get) => ({
  sidebar: {
    dashboard: false,
  },
  isOpen: (sidebar) => get().sidebar[sidebar] ?? false,
  setOpen: (sidebar, open) =>
    set((state) => ({ sidebar: { ...state.sidebar, [sidebar]: open } })),
}))
