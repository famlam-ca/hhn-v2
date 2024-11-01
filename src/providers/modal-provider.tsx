"use client"

import { CardModal } from "@/components/modals/card-modal"
import { CreateTeamModal } from "@/components/modals/create-team-modal"
import { ProModal } from "@/components/modals/pro-modal"
import { useMounted } from "@/hooks/use-mounted"

export function ModalProvider() {
  const { mounted } = useMounted()
  if (!mounted) return null

  return (
    <>
      <ProModal />
      <CardModal />
      <CreateTeamModal />
    </>
  )
}
