import { create } from "zustand"

type Team = {
  id: string
  title: string
  imageThumbUrl: string
}

type SelectTeamStore = {
  selectedTeam: Team | null
  setSelectedTeam: (team: Team) => void
}

export const useSelectTeam = create<SelectTeamStore>((set) => ({
  selectedTeam: null,
  setSelectedTeam: (team) => set({ selectedTeam: team }),
}))
