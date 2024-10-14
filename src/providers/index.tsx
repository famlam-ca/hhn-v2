import { validateSession } from "@/server/auth"
import { TRPCReactProvider } from "@/trpc/react"

import { ModalProvider } from "./modal-provider"
import { SessionProvider } from "./session-provider"
import { SheetProvider } from "./sheet-provider"
import { ThemeProvider } from "./theme-provider"
import { Toaster } from "./toast-provider"

export const Providers = async ({ children }: React.PropsWithChildren) => {
  const sessionData = await validateSession()

  return (
    <SessionProvider sessionData={sessionData}>
      <ThemeProvider>
        <TRPCReactProvider>
          <ModalProvider />
          <SheetProvider />
          {children}
          <Toaster richColors />
        </TRPCReactProvider>
      </ThemeProvider>
    </SessionProvider>
  )
}
