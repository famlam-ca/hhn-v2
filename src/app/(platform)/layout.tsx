import { PropsWithChildren } from "react"

import { ModalProvider } from "@/providers"
import { TRPCReactProvider } from "@/trpc/react"

export default function PlatformLayout({ children }: PropsWithChildren) {
  return (
    <TRPCReactProvider>
      <ModalProvider />
      {children}
    </TRPCReactProvider>
  )
}
